"""
API app URL patterns.

Day 1: health-check endpoint only.
Additional routes will be registered here as modules are developed.
"""

from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health_check, name="health-check"),
]

