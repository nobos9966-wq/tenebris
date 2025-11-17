import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle, Flag, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchPost();
    fetchReplies();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data.post);
      setHasUpvoted(data.post.upvotedBy?.includes(user?.id));
    } catch (error) {
      toast.error('Error al cargar post');
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data } = await api.get(`/posts/${id}/replies`);
      setReplies(data.replies);
    } catch (error) {
      toast.error('Error al cargar respuestas');
    }
  };

  const handleUpvote = async () => {
    try {
      const { data } = await api.post(`/posts/${id}/upvote`);
      setPost({ ...post, upvotes: data.upvotes });
      setHasUpvoted(data.hasUpvoted);
    } catch (error) {
      toast.error('Error al dar upvote');
    }
  };

  const handleReport = async () => {
    if (!confirm('¿Reportar este post?')) return;
    
    try {
      await api.post(`/posts/${id}/report`);
      toast.success('Post reportado');
    } catch (error) {
      toast.error('Error al reportar');
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await api.post(`/posts/${id}/replies`, { content: replyContent });
      setReplies([...replies, data.reply]);
      setReplyContent('');
      setPost({ ...post, replyCount: post.replyCount + 1 });
      toast.success('Respuesta publicada');
    } catch (error) {
      toast.error('Error al responder');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Link
            to={`/board/${post.board.slug}`}
            className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-lg text-sm hover:bg-neon-purple/30 transition"
          >
            {post.board.icon} {post.board.name}
          </Link>
          <span className="text-gray-400 text-sm">
            por {post.author.username}
          </span>
          <span className="text-gray-500 text-sm">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: es })}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        {post.content && (
          <p className="text-gray-300 mb-6 whitespace-pre-wrap">{post.content}</p>
        )}

        {post.mediaUrl && (
          <div className="mb-6">
            {post.contentType === 'image' ? (
              <img
                src={post.mediaUrl}
                alt={post.title}
                className="max-w-full rounded-lg"
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                className="max-w-full rounded-lg"
              />
            )}
          </div>
        )}

        <div className="flex items-center space-x-6 text-gray-400">
          <button
            onClick={handleUpvote}
            className={`flex items-center space-x-2 hover:text-neon-purple transition ${
              hasUpvoted ? 'text-neon-purple' : ''
            }`}
          >
            <ThumbsUp size={20} fill={hasUpvoted ? 'currentColor' : 'none'} />
            <span>{post.upvotes}</span>
          </button>
          <div className="flex items-center space-x-2">
            <MessageCircle size={20} />
            <span>{post.replyCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye size={20} />
            <span>{post.views}</span>
          </div>
          <button
            onClick={handleReport}
            className="flex items-center space-x-2 hover:text-red-400 transition ml-auto"
          >
            <Flag size={20} />
            <span>Reportar</span>
          </button>
        </div>
      </motion.div>

      <div className="bg-dark-card rounded-2xl p-8 border border-dark-border mb-6">
        <h2 className="text-xl font-bold mb-4">Responder</h2>
        <form onSubmit={handleReply}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition h-32 resize-none mb-4"
            placeholder="Escribe tu respuesta..."
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg hover:opacity-90 transition"
          >
            Publicar Respuesta
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Respuestas ({replies.length})</h2>
        {replies.map((reply) => (
          <motion.div
            key={reply._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card rounded-xl p-6 border border-dark-border"
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="font-medium">{reply.author.username}</span>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: es })}
              </span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">{reply.content}</p>
            {reply.mediaUrl && (
              <img
                src={reply.mediaUrl}
                alt="Reply media"
                className="mt-4 max-w-md rounded-lg"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
