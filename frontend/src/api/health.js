/**
 * Health-check API calls.
 */
import api from './client'

export const fetchHealth = () => api.get('/health/')

