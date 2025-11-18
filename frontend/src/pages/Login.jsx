import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    
    setLoading(true);

    try {
      console.log('Intentando login con:', { username });
      const { data } = await api.post('/auth/login', { 
        username: username.trim(), 
        password 
      });
      
      console.log('Login exitoso:', data);
      setAuth(data.token, data.user);
      toast.success(`¡Bienvenido a Tenebris, ${data.user.username}!`);
      navigate('/');
    } catch (error) {
      console.error('Error en login:', error);
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Error al iniciar sesión. Verifica tu conexión.';
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
          <p className="text-gray-400">Entra a la oscuridad</p>
        </div>

        <div className="bg-dark-card p-8 rounded-2xl border border-dark-border">
          <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
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
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-neon-purple hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
