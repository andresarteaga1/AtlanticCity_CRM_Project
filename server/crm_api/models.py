from django.db import models

# 1. Tabla de Clientes
class Cliente(models.Model):
    idcliente = models.AutoField(primary_key=True, db_column='idCliente')
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    dni = models.CharField(max_length=15, unique=True)
    email = models.EmailField(max_length=150, null=True, blank=True)
    celular = models.CharField(max_length=20, null=True, blank=True)
    
    # Lista de Niveles
    OPCIONES_NIVEL = [
        ('Nuevo', 'Nuevo'),
        ('Bronce', 'Bronce'),
        ('Silver', 'Silver'),
        ('Gold', 'Gold'),
        ('Platinum', 'Platinum'),
    ]
    
    nivel = models.CharField(max_length=50, choices=OPCIONES_NIVEL, default='Nuevo')
    
    # CAMPO VETADO (Ya existe en tu BD)
    es_vetado = models.BooleanField(default=False) 

    class Meta:
        managed = False 
        db_table = 'tb_cliente'

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"
    
    @property
    def inicial(self):
        return self.nombres[0].upper() if self.nombres else "?"

# 2. Tabla de Juegos (Tragamonedas, Mesas, etc.)
class Juego(models.Model):
    idjuego = models.AutoField(db_column='idJuego', primary_key=True)
    nombrejuego = models.CharField(db_column='nombreJuego', max_length=100)
    categoria = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'tb_juegos'
        verbose_name = 'Juego'
        verbose_name_plural = 'Juegos'

    def __str__(self):
        return self.nombrejuego


# 3. Tabla de Promociones
class Promocion(models.Model):
    idpromocion = models.AutoField(db_column='idPromocion', primary_key=True)
    nombrepromocion = models.CharField(db_column='nombrePromocion', max_length=150)
    descripcion = models.TextField(blank=True, null=True)
    fechainicio = models.DateField(db_column='fechaInicio')
    fechafin = models.DateField(db_column='fechaFin')

    class Meta:
        managed = False
        db_table = 'tb_promociones'
        verbose_name = 'Promoción'
        verbose_name_plural = 'Promociones'

    def __str__(self):
        return self.nombrepromocion


# 4. Tabla de Visitas (Entradas al casino)
class Visita(models.Model):
    idvisita = models.AutoField(db_column='idVisita', primary_key=True)
    # Django detectó la relación con Cliente, ¡excelente!
    idcliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='idCliente')
    fechavisita = models.DateField(db_column='fechaVisita')
    horavisita = models.TimeField(db_column='horaVisita')

    class Meta:
        managed = False
        db_table = 'tb_visitas'
        verbose_name = 'Visita'
        verbose_name_plural = 'Visitas'

    def __str__(self):
        return f"Visita de {self.idcliente} el {self.fechavisita}"


# 5. Interacciones (Gastos en juegos)
class Interaccion(models.Model):
    idinteraccion = models.AutoField(db_column='idInteraccion', primary_key=True)
    idvisita = models.ForeignKey(Visita, models.DO_NOTHING, db_column='idVisita')
    idjuego = models.ForeignKey(Juego, models.DO_NOTHING, db_column='idJuego', blank=True, null=True)
    idpromocion = models.ForeignKey(Promocion, models.DO_NOTHING, db_column='idPromocion', blank=True, null=True)
    montogasto = models.DecimalField(db_column='montoGasto', max_digits=10, decimal_places=2, blank=True, null=True)
    fechahoraregistro = models.DateTimeField(db_column='fechaHoraRegistro')

    class Meta:
        managed = False
        db_table = 'tb_interacciones'
        verbose_name = 'Interacción'
        verbose_name_plural = 'Interacciones'


# 6. Atención al Cliente
class AtencionCliente(models.Model):
    idatencion = models.AutoField(db_column='idAtencion', primary_key=True)
    idcliente = models.ForeignKey(Cliente, models.DO_NOTHING, db_column='idCliente')
    fechaatencion = models.DateTimeField(db_column='fechaAtencion')
    tiposolicitud = models.CharField(db_column='tipoSolicitud', max_length=50)
    descripcion = models.TextField()
    estado = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'tb_atencion_cliente'
        verbose_name = 'Atención'
        verbose_name_plural = 'Atenciones'
        
# 7. NUEVA TABLA: Transacciones (Para el módulo de Caja)
class Transaccion(models.Model):
    TIPOS = [
        ('RECARGA_TARJETA', 'Recarga Tarjeta (Tragamonedas)'),
        ('COMPRA_FICHAS', 'Compra de Fichas (Mesas)'),
        ('CONSUMO', 'Consumo Bar/Restaurante'),
    ]

    # Relación: Una transacción pertenece a un Cliente
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='transacciones', db_column='idCliente')
    monto = models.DecimalField(max_digits=10, decimal_places=2) # Ej: 150.00
    tipo = models.CharField(max_length=20, choices=TIPOS, default='RECARGA_TARJETA')
    fecha = models.DateTimeField(auto_now_add=True) # Se guarda la fecha automática

    class Meta:
        # IMPORTANTE: Aquí NO ponemos 'managed = False' porque esta tabla 
        # SÍ queremos que Django la cree en la base de datos.
        db_table = 'tb_transacciones' 
        verbose_name = 'Transacción'
        verbose_name_plural = 'Transacciones'

    def __str__(self):
        return f"S/ {self.monto} - {self.tipo}"