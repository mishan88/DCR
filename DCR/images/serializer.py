"""serializer."""
from rest_framework import serializers
from .models import Images


class ImagesSerializer(serializers.ModelSerializer):
    """for ImagesModel serializer."""

    class Meta:
        """meta class."""
        model = Images
        fields = ('id', 'image', 'room', 'imagetype')
