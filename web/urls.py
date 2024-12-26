from django.conf.urls.static import static
from django.urls import path, include

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

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
                      path('__debug__/', include(debug_toolbar.urls)),
                  ] + urlpatterns
