import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, FileText, AlertTriangle, Ban } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchReports();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data.stats);
    } catch (error) {
      toast.error('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    try {
      const { data } = await api.get('/admin/reports');
      setReports(data.posts);
    } catch (error) {
      toast.error('Error al cargar reportes');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('¿Eliminar este post?')) return;

    try {
      await api.delete(`/admin/posts/${postId}`);
      toast.success('Post eliminado');
      fetchReports();
      fetchStats();
    } catch (error) {
      toast.error('Error al eliminar post');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Shield size={32} className="text-neon-purple" />
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-2xl p-6 border border-dark-border"
        >
          <Users className="text-neon-blue mb-3" size={32} />
          <div className="text-3xl font-bold mb-1">{stats?.totalUsers}</div>
          <div className="text-gray-400">Usuarios</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card rounded-2xl p-6 border border-dark-border"
        >
          <FileText className="text-neon-green mb-3" size={32} />
          <div className="text-3xl font-bold mb-1">{stats?.totalPosts}</div>
          <div className="text-gray-400">Posts</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card rounded-2xl p-6 border border-dark-border"
        >
          <AlertTriangle className="text-yellow-500 mb-3" size={32} />
          <div className="text-3xl font-bold mb-1">{stats?.reportedPosts}</div>
          <div className="text-gray-400">Reportes</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card rounded-2xl p-6 border border-dark-border"
        >
          <Ban className="text-red-500 mb-3" size={32} />
          <div className="text-3xl font-bold mb-1">{stats?.bannedUsers}</div>
          <div className="text-gray-400">Baneados</div>
        </motion.div>
      </div>

      <div className="bg-dark-card rounded-2xl p-8 border border-dark-border">
        <h2 className="text-2xl font-bold mb-6">Posts Reportados</h2>
        <div className="space-y-4">
          {reports.map((post) => (
            <div
              key={post._id}
              className="bg-dark-bg rounded-lg p-6 border border-dark-border"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                      {post.reportCount} reportes
                    </span>
                    <span className="text-gray-400 text-sm">
                      {post.board.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm">
                    Por {post.author.username}
                  </p>
                </div>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
