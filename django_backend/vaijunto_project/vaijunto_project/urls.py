from django.urls import include, path
from rest_framework import routers
from vaijunto_app import views
from vaijunto_app.views import CaronaViewSet,ViagemViewSet, cadastrar_usuario
from django.shortcuts import redirect

router = routers.DefaultRouter()
router.register(r'carona', views.CaronaViewSet)
router.register(r'viagem', views.ViagemViewSet)

def redirect_to_api(request):
    return redirect('api/')

urlpatterns = [
    path('',redirect_to_api),
    path('api/', include(router.urls)),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('cadastrar_usuario/', cadastrar_usuario, name='cadastrar_usuario'),
]
