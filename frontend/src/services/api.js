import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import config from '../config';

console.log('🌐 API Base URL configurada:', config.apiUrl);

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    
    // Error de red o timeout
    if (!error.response) {
      console.error('🔴 Network error or timeout');
      return Promise.reject({
        response: {
          data: {
            error: 'Error de conexión. El servidor puede estar iniciando (espera 30-60 segundos) o verifica tu internet.'
          }
        }
      });
    }
    
    console.error('🔴 Status:', error.response.status);
    console.error('🔴 Data:', error.response.data);
    
    // Token inválido o expirado (solo si no estamos en login/register)
    if (error.response?.status === 401 && !error.config.url.includes('/auth/')) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
