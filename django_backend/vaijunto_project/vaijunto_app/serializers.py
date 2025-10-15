from rest_framework import serializers
from .models import Carona, Viagem, Cadastrar_usuario

class CaronaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carona
        fields = '__all__'
        
class ViagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viagem
        fields = '__all__'

class CadastrarUsuarioSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Cadastrar_usuario
        fields = ['nome_completo', 'cpf', 'email', 'telefone', 'matricula', 'curso', 'senha'] 
