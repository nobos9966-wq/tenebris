import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ThumbsUp, TrendingUp, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function Board() {
  const { slug } = useParams();
  const [board, setBoard] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [contentType, setContentType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoard();
    fetchPosts();
  }, [slug, sortBy, contentType]);

  const fetchBoard = async () => {
    try {
      const { data } = await api.get(`/boards/${slug}`);
      setBoard(data.board);
    } catch (error) {
      toast.error('Error al cargar board');
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = { sort: sortBy };
      if (contentType !== 'all') params.contentType = contentType;
      
      const { data } = await api.get(`/posts?board=${board?._id}`, { params });
      setPosts(data.posts);
    } catch (error) {
      toast.error('Error al cargar posts');
    } finally {
      setLoading(false);
    }
  };

  if (!board) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {board.icon} {board.name}
            </h1>
            <p className="text-gray-400">{board.description}</p>
          </div>
          <Link
            to="/create"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg hover:opacity-90 transition"
          >
            <Plus size={20} />
            <span>Crear Post</span>
          </Link>
        </div>
      </div>

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
  );
}
