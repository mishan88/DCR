"""Sacred URL Pattern."""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^room[0-9]+', views.room, name='room'),
]
