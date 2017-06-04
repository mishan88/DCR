from django.db import models
import uuid

class Images(models.Model):
    image = models.ImageField(upload_to='upload_images', max_length=100)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
