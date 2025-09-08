import axios from 'axios';

/**
 * Base URL = same origin (Render backend). Works on /admin and avoids CORS.
 * If you ever host admin elsewhere, set VITE_API_BASE in that env and use it here.
 */
const baseURL = (import.meta as any).env?.VITE_API_BASE || window.location.origin;

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

// Attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('evohome_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Basic error logging
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API ERROR]', err?.response?.status, err?.response?.data || err?.message);
    throw err;
  }
);
