import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }
    
    if (username.length < 3 || username.length > 20) {
      toast.error('El usuario debe tener entre 3 y 20 caracteres');
      return;
    }
    
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setLoading(true);

    try {
      console.log('📝 Intentando registro con:', { username: username.trim() });
      console.log('📡 URL de API:', import.meta.env.VITE_API_URL);
      
      const response = await api.post('/auth/register', { 
        username: username.trim(), 
        password,
        email: email.trim() || undefined
      });
      
      console.log('✅ Registro exitoso:', response.data);
      
      if (response.data.success && response.data.token && response.data.user) {
        setAuth(response.data.token, response.data.user);
        toast.success(`¡Bienvenido a Tenebris, ${response.data.user.username}!`);
        
        // Pequeño delay para asegurar que el estado se actualice
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      } else {
        toast.error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('❌ Error en registro:', error);
      console.error('Error completo:', error.response || error);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.errors?.[0]?.msg ||
                          error.response?.data?.message ||
                          error.message || 
                          'Error al registrarse. Verifica tu conexión.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
            TENEBRIS
          </h1>
          <p className="text-gray-400">Únete a la comunidad</p>
        </div>

        <div className="bg-dark-card p-8 rounded-2xl border border-dark-border">
          <h2 className="text-2xl font-bold mb-6">Registro Rápido</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
                minLength={3}
                maxLength={20}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
                minLength={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email (opcional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-neon-purple hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
