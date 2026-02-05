from rest_framework import serializers
from .models import Cliente, Transaccion 
from .models import Promocion

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = '__all__'
        
class PromocionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promocion
        fields = '__all__'
        
class TransaccionSerializer(serializers.ModelSerializer):
    cliente_nivel_actual = serializers.CharField(source='cliente.nivel', read_only=True)

    class Meta:
        model = Transaccion
        fields = '__all__'