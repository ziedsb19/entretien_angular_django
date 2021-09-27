from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("json", views.render_json, name="render_json"),
]
