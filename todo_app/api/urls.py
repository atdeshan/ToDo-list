from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)  # Register the TodoViewSet with the router

urlpatterns = [
    path('', include(router.urls)),  # Include the router URLs
]