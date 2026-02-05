from django.contrib import admin
from .models import Cliente, Visita, Juego, Promocion, Interaccion, AtencionCliente, Transaccion

# Registros simples
admin.site.register(Cliente)
admin.site.register(Visita)
admin.site.register(Juego)
admin.site.register(Promocion)
admin.site.register(Interaccion)
admin.site.register(AtencionCliente)


@admin.register(Transaccion)
class TransaccionAdmin(admin.ModelAdmin):
    # Cambiamos 'idtransaccion' por 'id' (el default de Django)
    list_display = ('id', 'fecha', 'tipo', 'monto', 'cliente')
    list_filter = ('tipo', 'fecha')
    search_fields = ('cliente__dni', 'cliente__nombres')