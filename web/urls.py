from django.conf.urls.static import static
from django.urls import path

from config import settings
from .views import *


urlpatterns = [
    path('', index, name="index"),
    path('int_tir', int_tir, name='int_tir'),
    path('lasertir', laser_tir, name='laser_tir'),
    path('panoroma', panorama, name='panorama'),
    path('btr', btr, name='btr'),
    path('desant', desant, name='desant'),
    path('dpm', dpm, name='dpm'),
    path('mobil', mobil, name='mobil'),
    path('pzrk', pzrk, name='pzrk'),
    path('vr', vr, name='vr'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)