/**
 * Axios instance pre-configured for the Jadeed Al Jazeera CRM backend.
 *
 * Base URL is read from VITE_API_BASE_URL env var, or falls back to the
 * Vite dev-server proxy path so the frontend works out-of-the-box locally.
 */
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // send session cookies (required for Django SessionAuth)
})

// ---------------------------------------------------------------------------
// Request interceptor — attach CSRF token when available (Django sessions)
// ---------------------------------------------------------------------------
api.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken')
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken
  }
  return config
})

// ---------------------------------------------------------------------------
// Response interceptor — global error normalisation
// ---------------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Will be replaced by proper auth redirect once auth module is built
      console.warn('[API] Unauthenticated — redirect to login')
    }
    return Promise.reject(error)
  }
)

/** Read a browser cookie by name. */
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export default api

