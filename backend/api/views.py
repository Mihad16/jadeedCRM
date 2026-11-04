"""
API views — Day 1.

health_check: unauthenticated endpoint used by the frontend to verify
the backend is reachable and to surface server-side metadata.
"""

import datetime
import django
from django.conf import settings
from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    """
    GET /api/v1/health/

    Returns HTTP 200 with system metadata when everything is healthy.
    Returns HTTP 503 if the database cannot be reached.
    """
    db_ok = False
    db_error = None
    try:
        # Execute a trivially cheap query to verify DB connectivity.
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        db_ok = True
    except Exception as exc:  # pragma: no cover
        db_error = str(exc)

    now_utc = datetime.datetime.now(tz=datetime.timezone.utc)

    payload = {
        "status": "ok" if db_ok else "degraded",
        "application": "Jadeed Al Jazeera CRM",          # required field per spec
        "project": "Jadeed Al Jazeera Egg Trading LLC — CRM",
        "timestamp_utc": now_utc.isoformat(),
        "django_version": django.__version__,
        "debug": settings.DEBUG,
        "timezone": settings.TIME_ZONE,
        "database": {
            "engine": settings.DATABASES["default"]["ENGINE"],
            "connected": db_ok,
            "error": db_error,
        },
    }

    http_status = status.HTTP_200_OK if db_ok else status.HTTP_503_SERVICE_UNAVAILABLE
    return Response(payload, status=http_status)
