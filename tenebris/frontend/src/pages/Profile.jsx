import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get(`/users/${id}`);
      setProfile(data.user);
    } catch (error) {
      toast.error('Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async () => {
    try {
      await api.post(`/users/${id}/friend`);
      toast.success('Amigo agregado');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al agregar amigo');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-card rounded-2xl p-8 border border-dark-border"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
            <p className="text-gray-400">
              Miembro desde {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>

          {currentUser?.id !== id && (
            <div className="flex space-x-3">
              <button
                onClick={handleAddFriend}
                className="flex items-center space-x-2 px-4 py-2 bg-neon-purple rounded-lg hover:opacity-90 transition"
              >
                <UserPlus size={18} />
                <span>Agregar</span>
              </button>
              <button
                onClick={() => window.location.href = `/chat/${id}`}
                className="flex items-center space-x-2 px-4 py-2 bg-neon-blue rounded-lg hover:opacity-90 transition"
              >
                <MessageCircle size={18} />
                <span>Mensaje</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
