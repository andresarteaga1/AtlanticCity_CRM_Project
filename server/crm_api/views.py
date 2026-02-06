from django.shortcuts import render
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum, Count, Q
from django.db.models.functions import TruncMonth
from django.db import IntegrityError
from django.contrib.auth import authenticate  
from rest_framework.authtoken.models import Token 
from .serializers import PromocionSerializer
import openpyxl
from django.http import HttpResponse

from .models import Cliente, Transaccion, Promocion, AtencionCliente, Visita
from .serializers import ClienteSerializer, TransaccionSerializer

# ======================================================
# 1. LOGIN
# ======================================================
@api_view(['POST'])
def login_api(request):
    # 1. Recibir datos del Frontend
    username = request.data.get('username')
    password = request.data.get('password')

    # 2. Validar que no vengan vacíos
    if not username or not password:
        return Response({'error': 'Falta usuario o contraseña'}, status=status.HTTP_400_BAD_REQUEST)

    # 3. Preguntar a Django si las credenciales son correctas
    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({
            'token': 'token-falso-pero-seguro-123',  
            'user': user.username,
            'message': 'Login exitoso'
        }, status=status.HTTP_200_OK)
    else:
        # ERROR: Usuario no existe o contraseña mal
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
# ======================================================
# 2. GESTIÓN DE CLIENTES (LISTAR, BUSCAR, CREAR)
# ======================================================
@api_view(['GET', 'POST'])
def listar_clientes(request):
    if request.method == 'GET':
        query = request.query_params.get('search', '').strip()
        
        # Búsqueda por Nombre, Apellido o DNI
        if query:
            clientes = Cliente.objects.filter(
                Q(nombres__istartswith=query) | 
                Q(dni__istartswith=query)
            ).order_by('-idcliente')
        else:
            clientes = Cliente.objects.all().order_by('-idcliente')
            
        serializer = ClienteSerializer(clientes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        dni_nuevo = request.data.get('dni')
        
        # VERIFICAR SI ESTÁ VETADO ANTES DE CREAR
        if Cliente.objects.filter(dni=dni_nuevo, es_vetado=True).exists():
            return Response(
                {'error': 'ESTE CLIENTE ESTÁ VETADO. No se permite su reingreso.'}, 
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ======================================================
# 3. GESTIONAR UN CLIENTE ESPECÍFICO (ELIMINAR / VETAR)
# ======================================================
@api_view(['DELETE', 'PATCH'])
def gestionar_cliente(request, pk):
    try:
        cliente = Cliente.objects.get(pk=pk)
    except Cliente.DoesNotExist:
        return Response({'error': 'Cliente no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    # A. ELIMINAR (CON PROTECCIÓN DE HISTORIAL)
    if request.method == 'DELETE':
        try:
            cliente.delete()
            return Response({'message': 'Cliente eliminado correctamente'}, status=status.HTTP_200_OK)
        except IntegrityError:
            # Esto ocurre si el cliente tiene ventas o visitas asociadas
            return Response(
                {'error': 'NO SE PUEDE ELIMINAR: Este cliente tiene historial de ventas o visitas. Se recomienda VETARLO en su lugar.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # B. VETAR (PATCH)
    elif request.method == 'PATCH':
        accion = request.data.get('accion')
        if accion == 'vetar':
            cliente.es_vetado = True
            cliente.nivel = 'VETADO' 
            cliente.save()
            return Response({'message': 'Cliente VETADO correctamente'}, status=status.HTTP_200_OK)

# ======================================================
# 4. TRANSACCIONES (CAJA)
# ======================================================
@api_view(['POST'])
def crear_transaccion(request):
    serializer = TransaccionSerializer(data=request.data)
    if serializer.is_valid():
        transaccion = serializer.save()
        cliente = transaccion.cliente
        
        # --- 1. LÓGICA DE AUTO-VISITA  ---
        # Si el cliente hace una transacción hoy, cuenta como visita.
        # Verificamos si ya tiene visita registrada HOY para no duplicar.
        hoy = timezone.now().date()
        hora_actual = timezone.now().time()
        
        existe_visita = Visita.objects.filter(
            idcliente=cliente, 
            fechavisita=hoy
        ).exists()
        
        if not existe_visita:
            Visita.objects.create(
                idcliente=cliente,
                fechavisita=hoy,
                horavisita=hora_actual
            )

        # --- 2. LÓGICA DE NIVELES (VIP) ---
        total_gastado = Transaccion.objects.filter(cliente=cliente).aggregate(Sum('monto'))['monto__sum'] or 0
        
        nuevo_nivel = 'Nuevo'
        if total_gastado >= 15000: nuevo_nivel = 'Platinum'
        elif total_gastado >= 10000: nuevo_nivel = 'Gold'
        elif total_gastado >= 8000: nuevo_nivel = 'Silver'
        elif total_gastado >= 5000:  nuevo_nivel = 'Bronce'
        
        if not cliente.es_vetado:
            cliente.nivel = nuevo_nivel
            cliente.save()
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ======================================================
# 5. DASHBOARD STATS
# ======================================================
@api_view(['GET'])
def dashboard_stats(request):
    try:
        # A. Contadores Generales
        total_clientes = Cliente.objects.count()
        
        # --- CAMBIO: FILTRAR INGRESOS SOLO DEL MES ACTUAL ---
        hoy = timezone.now()
        ingresos = Transaccion.objects.filter(
            fecha__year=hoy.year,   # Solo este año
            fecha__month=hoy.month  # Solo este mes
        ).aggregate(Sum('monto'))['monto__sum'] or 0.00
        
        total_promos = Promocion.objects.count()
        tickets_abiertos = AtencionCliente.objects.count()

        # B. Top Clientes
        top_clientes_qs = Transaccion.objects.values(
            'cliente__nombres', 'cliente__apellidos', 'cliente__nivel'
        ).annotate(total_gasto=Sum('monto')).order_by('-total_gasto')[:5]
        
        top_clientes_data = []
        for i, t in enumerate(top_clientes_qs):
            top_clientes_data.append({
                'id': i,
                'nombre': f"{t['cliente__nombres']} {t['cliente__apellidos']}",
                'nivel': t['cliente__nivel'] or 'Nuevo',
                'gasto': t['total_gasto']
            })

        # C. Gráfico Lineal (Visitas)
        visitas_qs = Visita.objects.annotate(
            mes=TruncMonth('fechavisita')
        ).values('mes').annotate(total=Count('idvisita')).order_by('mes')

        visitas_data = []
        months_es = {
            1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
            7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'
        }
        
        for v in visitas_qs:
            if v['mes']:
                mes_nombre = months_es.get(v['mes'].month, v['mes'].strftime('%b'))
                visitas_data.append({'mes': mes_nombre, 'visitas': v['total']})
        
        # D. Gráfico Circular (Niveles)
        niveles_qs = Cliente.objects.values('nivel').annotate(total=Count('idcliente'))
        distribucion_data = []
        for item in niveles_qs:
            distribucion_data.append({
                'name': item['nivel'], 
                'value': item['total']
            })
        
        data = {
            'total_clientes': total_clientes,
            'ingresos_totales': ingresos, #  esto envía solo lo del mes
            'total_promos': total_promos,
            'tickets_abiertos': tickets_abiertos,
            'top_clientes': top_clientes_data,
            'visitas_grafica': visitas_data,
            'distribucion_vip': distribucion_data
        }
        return Response(data)

    except Exception as e:
        print(f"Error Dashboard: {e}")
        return Response({'error': str(e)}, status=500)
# ======================================================
# 6. DATOS DE SEGMENTACIÓN (PARA EL GRÁFICO)
# ======================================================
@api_view(['GET'])
def segmentacion_data(request):
    try:
        vetados_count = Cliente.objects.filter(
            Q(es_vetado=True) | Q(nivel__iexact='VETADO')
        ).count()
        
        no_vetados = Cliente.objects.filter(
            Q(es_vetado=False) & ~Q(nivel__iexact='VETADO')
        )

        platinum = no_vetados.filter(nivel__iexact='Platinum').count()
        gold     = no_vetados.filter(nivel__iexact='Gold').count()
        silver   = no_vetados.filter(nivel__iexact='Silver').count()
        bronce   = no_vetados.filter(nivel__iexact='Bronce').count()
        nuevos   = no_vetados.filter(nivel__iexact='Nuevo').count()

        # 3. Datos para el Gráfico
        chart_data = [
            {'name': 'Platinum', 'value': platinum, 'color': '#e0f7fa'},
            {'name': 'Gold',     'value': gold,     'color': '#d4af37'},
            {'name': 'Silver',   'value': silver,   'color': '#6c757d'},
            {'name': 'Bronce',   'value': bronce,   'color': '#cd7f32'},
            {'name': 'Nuevos',   'value': nuevos,   'color': '#0d6efd'},
            {'name': 'Vetados',  'value': vetados_count,  'color': '#dc3545'}, 
        ]

        # 4. KPIs
        kpis = {
            'vip_total': platinum + gold,
            'nuevos_qty': nuevos,
            'regulares': silver + bronce,
            'riesgo': vetados_count  
        }

        return Response({'chart': chart_data, 'kpis': kpis})

    except Exception as e:
        print(f"Error Segmentacion: {e}")
        return Response({'error': str(e)}, status=500)
    
# ======================================================
# 7. GESTIÓN DE PROMOCIONES
# ======================================================
@api_view(['GET', 'POST'])
def gestionar_promociones(request):
    if request.method == 'GET':
        promos = Promocion.objects.all().order_by('-fechainicio')
        serializer = PromocionSerializer(promos, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PromocionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def eliminar_promocion(request, pk):
    try:
        promo = Promocion.objects.get(pk=pk)
        promo.delete()
        return Response({'message': 'Promoción eliminada'}, status=status.HTTP_200_OK)
    except Promocion.DoesNotExist:
        return Response({'error': 'No encontrada'}, status=status.HTTP_404_NOT_FOUND)
# ======================================================
# 8. REPORTES Y EXPORTACIÓN 
# ======================================================

@api_view(['GET'])
def reporte_transacciones(request):
    start_date = request.query_params.get('inicio')
    end_date = request.query_params.get('fin')

    transacciones = Transaccion.objects.all().order_by('-fecha')
    if start_date and end_date:
        transacciones = transacciones.filter(fecha__range=[start_date, end_date])

    data = []
    for t in transacciones:
        data.append({
            'id': t.id,  
            'fecha': t.fecha.strftime("%Y-%m-%d %H:%M"),
            'cliente': f"{t.cliente.nombres} {t.cliente.apellidos}",
            'dni': t.cliente.dni,
            'tipo': t.tipo,
            'monto': float(t.monto)
        })
    
    return Response(data)

@api_view(['GET'])
def exportar_excel(request):
    start_date = request.query_params.get('inicio')
    end_date = request.query_params.get('fin')

    transacciones = Transaccion.objects.all().order_by('-fecha')
    if start_date and end_date:
        transacciones = transacciones.filter(fecha__range=[start_date, end_date])

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Reporte de Caja"

    headers = ['ID', 'Fecha/Hora', 'Cliente', 'DNI', 'Tipo Operación', 'Monto (S/)']
    ws.append(headers)

    for t in transacciones:
        ws.append([
            t.id,  
            t.fecha.strftime("%Y-%m-%d %H:%M"),
            f"{t.cliente.nombres} {t.cliente.apellidos}",
            t.cliente.dni,
            t.tipo,
            float(t.monto)
        ])

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=Reporte_Caja.xlsx'
    
    wb.save(response)
    return response

# ======================================================
# 9. ATENCIÓN AL CLIENTE (Tickets)
# ======================================================
@api_view(['GET', 'POST'])
def gestion_atencion(request):
    if request.method == 'GET':
        tickets = AtencionCliente.objects.select_related('idcliente').all().order_by('-fechaatencion')
        
        # KPI Real
        total_tickets = tickets.count()
        tickets_cerrados = tickets.filter(estado='Cerrado').count()
        eficacia = int((tickets_cerrados / total_tickets) * 100) if total_tickets > 0 else 100

        data_tickets = []
        for t in tickets:
            # Lógica visual de prioridades
            prioridad_simulada = 'Media'
            # Nota: Usamos t.tiposolicitud (minúsculas)
            if 'Queja' in t.tiposolicitud or 'Reclamo' in t.tiposolicitud:
                prioridad_simulada = 'Alta'
            elif 'VIP' in t.tiposolicitud:
                prioridad_simulada = 'Baja'

            data_tickets.append({
                'id': t.idatencion,
                'cliente': f"{t.idcliente.nombres} {t.idcliente.apellidos}",
                'asunto': t.tiposolicitud,  
                'descripcion': t.descripcion,
                'estado': t.estado,
                'prioridad': prioridad_simulada,
                'fecha': t.fechaatencion.strftime("%d/%m/%Y")
            })
            
        return Response({
            'tickets': data_tickets,
            'kpi_eficacia': eficacia
        })

    elif request.method == 'POST':
        data = request.data
        try:
            cliente = Cliente.objects.get(dni=data['dni'])
            
            AtencionCliente.objects.create(
                idcliente=cliente,
                fechaatencion=timezone.now(),
                tiposolicitud=data['tipo'], 
                descripcion=data['descripcion'],
                estado='Abierto'
            )
            return Response({'mensaje': 'Ticket creado exitosamente'}, status=201)
        
        except Cliente.DoesNotExist:
            return Response({'error': 'No existe un cliente con ese DNI'}, status=404)
        except Exception as e:
            # Imprimir error en consola para depuración
            print(f"Error creando ticket: {str(e)}")
            return Response({'error': str(e)}, status=500)
        
# ======================================================
# 10. ACTUALIZAR ESTADO DEL TICKET
# ======================================================
@api_view(['PATCH'])
def actualizar_estado_ticket(request, pk):
    try:
        ticket = AtencionCliente.objects.get(pk=pk)
        nuevo_estado = request.data.get('estado')
        
        if nuevo_estado in ['Abierto', 'En Proceso', 'Cerrado']:
            ticket.estado = nuevo_estado
            ticket.save()
            return Response({'mensaje': 'Estado actualizado'})
        else:
            return Response({'error': 'Estado no válido'}, status=400)

    except AtencionCliente.DoesNotExist:
        return Response({'error': 'Ticket no encontrado'}, status=404)
    
# ======================================================
# 11. ELIMINAR TICKET (Limpieza Manual)
# ======================================================
@api_view(['DELETE'])
def eliminar_ticket(request, pk):
    try:
        ticket = AtencionCliente.objects.get(pk=pk)
        ticket.delete()
        return Response({'mensaje': 'Ticket eliminado correctamente'})
    except AtencionCliente.DoesNotExist:
        return Response({'error': 'Ticket no encontrado'}, status=404)