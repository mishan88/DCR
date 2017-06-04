"""model."""

from django.db import models
import uuid


class Images(models.Model):
    """For Image model(Map and koma use this model)."""

    IMAGE_TYPE_CHOICES = (
        ('KOMA', 'Koma'),
        ('MAP', 'Map'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(upload_to='upload_images', max_length=100)
    room = models.CharField(max_length=4, default=None)
    imagetype = models.CharField(max_length=10, choices=IMAGE_TYPE_CHOICES,
                                 default='KOMA')
