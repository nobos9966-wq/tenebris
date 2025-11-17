import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Image, Video, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

export default function CreatePost() {
  const [boards, setBoards] = useState([]);
  const [contentType, setContentType] = useState('text');
  const [boardId, setBoardId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const { data } = await api.get('/boards');
      setBoards(data.boards);
      if (data.boards.length > 0) {
        setBoardId(data.boards[0]._id);
      }
    } catch (error) {
      toast.error('Error al cargar boards');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validar tamaño
    const maxSize = contentType === 'video' ? 500 * 1024 * 1024 : 10 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast.error(`Archivo muy grande. Máximo ${contentType === 'video' ? '500MB' : '10MB'}`);
      return;
    }

    setFile(selectedFile);
    
    // Preview
    if (contentType === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else if (contentType === 'video') {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('boardId', boardId);
      formData.append('contentType', contentType);
      formData.append('title', title);
      formData.append('content', content);
      if (file) formData.append('media', file);

      const { data } = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Post creado exitosamente');
      navigate(`/post/${data.post._id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al crear post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-card rounded-2xl p-8 border border-dark-border"
      >
        <h1 className="text-3xl font-bold mb-8">Crear Nuevo Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Tipo de Contenido</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => { setContentType('text'); setFile(null); setPreview(''); }}
                className={`flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition ${
                  contentType === 'text'
                    ? 'border-neon-purple bg-neon-purple/10'
                    : 'border-dark-border hover:border-gray-600'
                }`}
              >
                <FileText size={32} />
                <span>Texto</span>
              </button>
              <button
                type="button"
                onClick={() => { setContentType('image'); setFile(null); setPreview(''); }}
                className={`flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition ${
                  contentType === 'image'
                    ? 'border-neon-purple bg-neon-purple/10'
                    : 'border-dark-border hover:border-gray-600'
                }`}
              >
                <Image size={32} />
                <span>Imagen</span>
              </button>
              <button
                type="button"
                onClick={() => { setContentType('video'); setFile(null); setPreview(''); }}
                className={`flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition ${
                  contentType === 'video'
                    ? 'border-neon-purple bg-neon-purple/10'
                    : 'border-dark-border hover:border-gray-600'
                }`}
              >
                <Video size={32} />
                <span>Video</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Board</label>
            <select
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
              required
            >
              {boards.map((board) => (
                <option key={board._id} value={board._id}>
                  {board.icon} {board.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
              maxLength={200}
              required
            />
          </div>

          {contentType === 'text' && (
            <div>
              <label className="block text-sm font-medium mb-2">Contenido</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition h-48 resize-none"
                maxLength={10000}
                required
              />
            </div>
          )}

          {(contentType === 'image' || contentType === 'video') && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Descripción (opcional)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition h-24 resize-none"
                  maxLength={5000}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subir {contentType === 'image' ? 'Imagen' : 'Video'}
                </label>
                <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center hover:border-neon-purple transition">
                  <input
                    type="file"
                    accept={contentType === 'image' ? 'image/*' : 'video/*'}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">
                      Click para subir {contentType === 'image' ? 'imagen' : 'video'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Máximo {contentType === 'video' ? '500MB (2 horas)' : '10MB'}
                    </p>
                  </label>
                </div>

                {preview && (
                  <div className="mt-4">
                    {contentType === 'image' ? (
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                    ) : (
                      <video src={preview} controls className="max-h-64 mx-auto rounded-lg" />
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Publicando...' : 'Publicar Post'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
