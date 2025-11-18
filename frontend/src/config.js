// Configuración de la aplicación
const config = {
  // URL del backend
  apiUrl: import.meta.env.VITE_API_URL || 
          (import.meta.env.MODE === 'production' 
            ? 'https://tenebris-4.onrender.com/api'
            : 'http://localhost:5000/api'),
  
  // Timeout para peticiones
  apiTimeout: 30000,
  
  // Configuración de uploads
  maxImageSize: 10 * 1024 * 1024, // 10MB
  maxVideoSize: 500 * 1024 * 1024, // 500MB
};

// Log de configuración
console.log('⚙️ Configuración de la app:', {
  apiUrl: config.apiUrl,
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
});

export default config;
