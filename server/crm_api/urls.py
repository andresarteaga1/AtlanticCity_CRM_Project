from django.urls import path
from crm_api import views

urlpatterns = [
    # 1. Ruta de LOGIN
    path('login/', views.login_api),

    # 2. Rutas del SISTEMA
    path('clientes/', views.listar_clientes),
    
    # Permite acceder a un cliente específico por su ID (para eliminar o vetar)
    path('clientes/<int:pk>/', views.gestionar_cliente),

    path('transacciones/', views.crear_transaccion),
    path('dashboard-stats/', views.dashboard_stats),
    path('segmentacion/', views.segmentacion_data),
    path('promociones/', views.gestionar_promociones),
    path('promociones/<int:pk>/', views.eliminar_promocion),
    path('reportes/data/', views.reporte_transacciones),
    path('reportes/excel/', views.exportar_excel),
    path('atencion/', views.gestion_atencion),
    path('atencion/<int:pk>/actualizar/', views.actualizar_estado_ticket),
    path('atencion/<int:pk>/eliminar/', views.eliminar_ticket),
]