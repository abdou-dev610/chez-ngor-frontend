import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Injecte automatiquement le token JWT si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('chezngor_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirige vers /admin/login si le token expire (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('chezngor_token');
      localStorage.removeItem('chezngor_admin');
      if (
        window.location.pathname.startsWith('/admin') &&
        window.location.pathname !== '/admin/login'
      ) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Retourne l'URL complète d'une image de plat.
 * - Si vide → image placeholder
 * - Si URL complète (http/https) → utilisée telle quelle
 * - Si chemin local (/images/...) → servi par Vite depuis /public
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return imagePath; // chemin local servi depuis /public
}

export default api;
