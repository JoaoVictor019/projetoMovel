from django.db import models
from django.contrib.auth.models import User

class Carona(models.Model):
    motorista = models.ForeignKey(User, on_delete=models.CASCADE)
    rota = models.CharField(max_length=255)
    capacidade = models.IntegerField()
    hora = models.TimeField()

class Viagem(models.Model):
    aluno = models.ForeignKey(User, on_delete=models.CASCADE)
    Carona = models.ForeignKey(Carona, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=(('pendente', 'Pendente'), ('aceita', 'Aceita')))

class Cadastrar_usuario(models.Model):
    nome_completo = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)  # CPF deve ser único
    email = models.EmailField(unique=True)  # Email deve ser único
    telefone = models.CharField(max_length=15, blank=True)
    matricula = models.CharField(max_length=20, unique=True)  # RA ou matrícula única
    curso = models.CharField(max_length=50)
    senha = models.CharField(max_length=128)  # Armazene senhas de forma segura

    def __str__(self):
        return self.nome_completo
