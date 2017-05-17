from rest_framework import viewsets
from .models import Images
from .serializer import ImagesSerializer

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer
