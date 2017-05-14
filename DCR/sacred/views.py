"""Sacred Views."""
from django.shortcuts import render

from .forms import ChatForm

def index(request):
    """Index View."""
    return render(request, 'sacred/index.html')


def room(request):
    """Room View."""
    form = ChatForm()
    return render(request, 'sacred/room.html', {'form': form})
