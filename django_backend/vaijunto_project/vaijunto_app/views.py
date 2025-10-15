from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Carona, Viagem, Cadastrar_usuario
from .serializers import CaronaSerializer, ViagemSerializer,Cadastrar_usuario

class CaronaViewSet(viewsets.ModelViewSet):
    queryset = Carona.objects.all()
    serializer_class = CaronaSerializer
    
class ViagemViewSet(viewsets.ModelViewSet):
    queryset = Viagem.objects.all()
    serializer_class = ViagemSerializer

@api_view(['POST'])
def cadastrar_usuario(request):
    if request.method == 'POST':
        data = request.data
        try:
            usuario = Cadastrar_usuario.objects.create(
                nome_completo=data['nome_completo'],
                cpf=data['cpf'],
                email=data['email'],
                telefone=data.get('telefone', ''),  # Use uma string vazia se não fornecido
                matricula=data['matricula'],
                curso=data['curso'],
                senha=data['senha'],
            )
            usuario.save()
            
            return Response({'status': 'Usuário cadastrado com sucesso!'}, status=201) 
        
        except Exception as e:
            return Response({'error': str(e)}, status=400)
        
    return Response({'error': 'Método não permitido'}, status=405)  
