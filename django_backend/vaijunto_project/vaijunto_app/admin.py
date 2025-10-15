from django.contrib import admin
from .models import Carona, Viagem, Cadastrar_usuario

# Registra os modelos para aparecerem no painel de administração do Django
admin.site.register(Carona)
admin.site.register(Viagem)
admin.site.register(Cadastrar_usuario)
