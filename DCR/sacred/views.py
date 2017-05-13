"""Sacred Views."""
from django.shortcuts import render


def index(request):
    """Index View."""
    return render(request, template_name='sacred/index.html')


def room(request):
    """Room View."""
    return render(request, template_name='sacred/room.html')
