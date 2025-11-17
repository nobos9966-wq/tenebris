import { Link, useNavigate } from 'react-router-dom';
import { Home, MessageCircle, User, LogOut, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              TENEBRIS
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              <Home size={20} />
            </Link>
            <Link to="/chat" className="text-gray-300 hover:text-white transition">
              <MessageCircle size={20} />
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-300 hover:text-white transition">
                <Shield size={20} />
              </Link>
            )}
            <Link to={`/profile/${user?.id}`} className="text-gray-300 hover:text-white transition">
              <User size={20} />
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-red-400 transition"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
