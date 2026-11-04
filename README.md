# Jadeed Al Jazeera Egg Trading LLC — CRM

> **Business CRM and Inventory Management System**  
> Built with Django REST Framework + React (Vite) + Tailwind CSS

---

## Project Structure

```
jadeed_soft/
├── backend/          # Django REST API
│   ├── core/         # Django project settings, root URLs, WSGI/ASGI
│   ├── api/          # Day 1: health-check endpoint + tests
│   ├── venv/         # Python virtual environment (not committed)
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example  # Copy to .env and fill in secrets
│   └── .gitignore
│
└── frontend/         # React + Vite SPA
    ├── src/
    │   ├── api/              # Axios client + per-module API helpers
    │   ├── components/
    │   │   └── layout/       # AppShell, Sidebar, Topbar
    │   ├── pages/            # Dashboard, PlaceholderPage, …
    │   └── main.jsx          # Entry point
    ├── index.html
    ├── vite.config.js        # Vite config + dev-proxy to backend
    ├── .env.example          # Copy to .env.local
    └── .gitignore
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS v4, React Router v7, Axios, Lucide React |
| Backend | Python 3.14, Django 6.1, Django REST Framework 3.18 |
| Database (dev) | SQLite (zero-config) |
| Database (prod) | PostgreSQL |
| Auth (planned) | Django sessions + JWT (Day 2) |

---

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Node.js | v18+ (tested on v26.3.1) |
| Python | 3.11+ (tested on 3.14.5) |
| pip | 22+ |
| npm | 9+ |

---

## Local Development Setup

### 1 — Clone / enter the project

```bash
cd /path/to/jadeed_soft
```

### 2 — Backend

```bash
cd backend

# Create and activate the virtual environment
python3 -m venv venv
source venv/bin/activate          # macOS / Linux
# venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Open .env and set a secure SECRET_KEY (see note below)

# Apply database migrations (creates db.sqlite3 locally)
python manage.py migrate

# Optional: create a superuser for the Django admin
python manage.py createsuperuser

# Run the development server (port 8000)
python manage.py runserver
```

> **Generating a SECRET_KEY:**
> ```bash
> python -c "import secrets; print(secrets.token_urlsafe(50))"
> ```
> Paste the output into `.env` as `SECRET_KEY=<value>`.

### 3 — Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite dev server (port 5173)
npm run dev
```

The Vite dev server proxies all `/api/*` requests to `http://127.0.0.1:8000`,
so **no extra CORS config is needed during development**.

### 4 — Open in browser

| URL | Description |
|-----|-------------|
| http://localhost:5173 | React frontend (CRM dashboard) |
| http://localhost:8000/api/v1/health/ | Backend health-check JSON |
| http://localhost:8000/admin/ | Django admin panel |

---

## Running Tests

### Backend

```bash
cd backend
source venv/bin/activate
python manage.py test api.tests --verbosity=2
```

Expected output: **7 tests, 0 failures, 0 errors.**

### Frontend (Day 2+)

```bash
cd frontend
npm test
```

---

## Environment Variables Reference

### `backend/.env`

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | *(required)* | Django secret key — keep this secret |
| `DEBUG` | `True` | Set to `False` in production |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1` | Comma-separated hostnames |
| `DB_ENGINE` | *(blank = SQLite)* | Set to `django.db.backends.postgresql` for Postgres |
| `DB_NAME` | — | PostgreSQL database name |
| `DB_USER` | — | PostgreSQL user |
| `DB_PASSWORD` | — | PostgreSQL password |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | Frontend origins for CORS |
| `TIME_ZONE` | `Asia/Dubai` | Server timezone (UTC+4 GST) |

### `frontend/.env.local`

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | *(blank)* | Leave blank to use the Vite dev proxy; set to full URL for production |

---

## Production Deployment Notes

1. Set `DEBUG=False` in backend `.env`.
2. Set `DB_ENGINE=django.db.backends.postgresql` and configure DB credentials.
3. Install `psycopg2-binary` (uncomment in `requirements.txt`).
4. Run `python manage.py collectstatic`.
5. Serve the backend with **Gunicorn** behind Nginx.
6. Build the frontend with `npm run build` and serve `dist/` as static files from Nginx.
7. Set `VITE_API_BASE_URL` to the production API base URL.

---

## Development Roadmap

| Day | Focus |
|-----|-------|
| **Day 1 ✅** | Project setup, folder structure, Django + React scaffold, health-check API, dashboard shell |
| Day 2 | Authentication, JWT tokens, role-based access, login page |
| Day 3 | Customer & supplier module |
| Day 4 | Egg products & packaging units |
| Day 5 | Warehouse inventory + stock movements |
| Day 6 | Salesman stock allocation |
| Day 7 | Sales orders |
| Day 8 | Direct sales |
| Day 9 | Deliveries |
| Day 10 | Invoices |
| Day 11 | Payments & customer balances |
| Day 12 | Expenses & cash handovers |
| Day 13 | Daily closing reports |
| Day 14 | Polish, audit logs, production deployment |

---

## Business Rules (Key)

- Salesmen can access **only their assigned customers** and permitted records.
- **Every stock change** creates a `StockMovement` record — no silent overwrites.
- Payments support **cash, card, bank transfer, credit, and partial** payment.
- All monetary values use `DecimalField` — never `FloatField`.
- Database **transactions** are used for sales, payment, and stock operations.
- Timestamps are stored as **UTC** in the database; displayed as **GST (UTC+4)** in the UI.
- Completed invoices and payment history are **immutable** (soft-deletes only).
- VAT is **not hardcoded** — rates are configurable.

---

*© 2026 Jadeed Al Jazeera Egg Trading LLC. Internal use only.*

