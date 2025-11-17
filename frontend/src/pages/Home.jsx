import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Clock, ThumbsUp, Image, Video, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [posts, setPosts] = useState([]);
  const [contentType, setContentType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchBoards();
    fetchPosts();
  }, [contentType, sortBy]);

  const fetchBoards = async () => {
    try {
      const { data } = await api.get('/boards');
      setBoards(data.boards);
    } catch (error) {
      toast.error('Error al cargar boards');
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = { sort: sortBy };
      if (contentType !== 'all') params.contentType = contentType;
      
      const { data } = await api.get('/posts', { params });
      setPosts(data.posts);
    } catch (error) {
      toast.error('Error al cargar posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border border-neon-purple/30 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">
            ¡Bienvenido a Tenebris, {user?.username}!
          </h2>
          <p className="text-gray-300 mb-4">¿Qué tipo de contenido quieres explorar hoy?</p>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setContentType('text'); setShowWelcome(false); }}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-card hover:bg-dark-hover border border-dark-border rounded-lg transition"
            >
              <FileText size={18} />
              <span>Texto</span>
            </button>
            <button
              onClick={() => { setContentType('image'); setShowWelcome(false); }}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-card hover:bg-dark-hover border border-dark-border rounded-lg transition"
            >
              <Image size={18} />
              <span>Imágenes</span>
            </button>
            <button
              onClick={() => { setContentType('video'); setShowWelcome(false); }}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-card hover:bg-dark-hover border border-dark-border rounded-lg transition"
            >
              <Video size={18} />
              <span>Videos</span>
            </button>
            <button
              onClick={() => setShowWelcome(false)}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
            >
              Ver todo
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-2xl p-6 border border-dark-border sticky top-24">
            <h3 className="text-xl font-bold mb-4">Boards</h3>
            <div className="space-y-2">
              {boards.map((board) => (
                <Link
                  key={board._id}
                  to={`/board/${board.slug}`}
                  className="flex items-center space-x-3 p-3 hover:bg-dark-hover rounded-lg transition"
                >
                  <span className="text-2xl">{board.icon}</span>
                  <div>
                    <div className="font-medium">{board.name}</div>
                    <div className="text-sm text-gray-400">{board.postCount} posts</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy('recent')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  sortBy === 'recent' ? 'bg-neon-purple text-white' : 'bg-dark-card hover:bg-dark-hover'
                }`}
              >
                <Clock size={18} />
                <span>Recientes</span>
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  sortBy === 'popular' ? 'bg-neon-purple text-white' : 'bg-dark-card hover:bg-dark-hover'
                }`}
              >
                <ThumbsUp size={18} />
                <span>Populares</span>
              </button>
              <button
                onClick={() => setSortBy('trending')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  sortBy === 'trending' ? 'bg-neon-purple text-white' : 'bg-dark-card hover:bg-dark-hover'
                }`}
              >
                <TrendingUp size={18} />
                <span>Trending</span>
              </button>
            </div>

            <Link
              to="/create"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg hover:opacity-90 transition"
            >
              <Plus size={18} />
              <span>Crear Post</span>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                  className="block bg-dark-card hover:bg-dark-hover border border-dark-border rounded-2xl p-6 transition"
                >
                  <div className="flex items-start space-x-4">
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">
                          {post.board.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          por {post.author.username}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      {post.content && (
                        <p className="text-gray-400 line-clamp-2">{post.content}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
                        <span>👍 {post.upvotes}</span>
                        <span>💬 {post.replyCount}</span>
                        <span>👁️ {post.views}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
