from django.db import models


class Images(models.Model):
    image = models.ImageField(upload_to='upload_images', max_length=100)
    id = models.CharField(max_length=100, primary_key=True)
