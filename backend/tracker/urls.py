from django.urls import include, path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"habits", views.HabitViewSet)
router.register(r"track", views.TrackerViewSet, basename="track")
urlpatterns = [
    path("", include(router.urls)),
]