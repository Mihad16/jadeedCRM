"""
Root URL configuration for Jadeed Al Jazeera CRM backend.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    # Versioned routes — primary path for all API calls
    path("api/v1/", include("api.urls")),
    # Convenience alias: /api/health/ (no version prefix) for quick reachability checks
    path("api/", include("api.urls")),
]
