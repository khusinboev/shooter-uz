from django.shortcuts import render


def home(request):
    return render(request, "base.html")


def index(request):
    return render(request, "index.html")


def int_tir(request):
    return render(request, "int_tir.html")


def laser_tir(request):
    return render(request, "laser_tir.html")


def panorama(request):
    return render(request, "panorama.html")


def btr(request):
    return render(request, "btr.html")


def desant(request):
    return render(request, "desant.html")


def dpm(request):
    return render(request, "dpm.html")


def mobil(request):
    return render(request, "mobil.html")


def pzrk(request):
    return render(request, "pzrk.html")


def vr(request):
    return render(request, "vr.html")
