"""
Day 1, Step 2 — Health check endpoint tests.

Covers:
  - /api/v1/health/   (versioned — primary endpoint)
  - /api/health/      (convenience alias — no version prefix)

Run with:
    cd backend && venv/bin/python manage.py test api.tests --verbosity=2
"""

from django.test import TestCase, Client
import json


class HealthCheckV1TestCase(TestCase):
    """Tests for GET /api/v1/health/ — versioned primary endpoint."""

    def setUp(self):
        self.client = Client()
        self.url = "/api/v1/health/"

    def test_health_returns_200(self):
        """Health endpoint should return HTTP 200 when database is reachable."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_health_response_is_json(self):
        """Response content-type should be application/json."""
        response = self.client.get(self.url)
        self.assertIn("application/json", response["Content-Type"])

    def test_health_response_structure(self):
        """Response body must contain all required top-level keys."""
        response = self.client.get(self.url)
        data = json.loads(response.content)
        required_keys = [
            "status", "application", "timestamp_utc",
            "django_version", "database", "project",
        ]
        for key in required_keys:
            self.assertIn(key, data, msg=f"Missing key: {key}")

    def test_health_status_is_ok(self):
        """status field should be 'ok' when database is connected."""
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data["status"], "ok")

    def test_health_application_field(self):
        """application field must equal the required string."""
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data["application"], "Jadeed Al Jazeera CRM")

    def test_health_database_connected(self):
        """database.connected should be True in test environment."""
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertTrue(data["database"]["connected"])

    def test_health_method_not_allowed(self):
        """POST must not be allowed on the health endpoint."""
        response = self.client.post(self.url, data={})
        self.assertEqual(response.status_code, 405)

    def test_health_no_auth_required(self):
        """Health endpoint must be accessible without any credentials."""
        fresh_client = Client()
        response = fresh_client.get(self.url)
        self.assertNotEqual(response.status_code, 401)
        self.assertNotEqual(response.status_code, 403)


class HealthCheckAliasTestCase(TestCase):
    """Tests for GET /api/health/ — convenience alias (no version prefix)."""

    def setUp(self):
        self.client = Client()
        self.url = "/api/health/"

    def test_alias_returns_200(self):
        """Alias endpoint should also return HTTP 200."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_alias_has_application_field(self):
        """Alias response must include application: 'Jadeed Al Jazeera CRM'."""
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data["application"], "Jadeed Al Jazeera CRM")

    def test_alias_status_ok(self):
        """Alias status field should be 'ok'."""
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(data["status"], "ok")
