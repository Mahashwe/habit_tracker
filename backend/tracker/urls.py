from django.urls import path
from . import views
urlpatterns = [
    path('', views.Habit.as_view(), name='index'),
]