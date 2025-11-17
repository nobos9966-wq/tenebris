const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Board = require('../models/Board');
const { protect, admin } = require('../middleware/auth');

// Obtener posts reportados
router.get('/reports', protect, admin, async (req, res) => {
  try {
    const posts = await Post.find({ reported: true, deleted: false })
      .populate('board', 'name slug')
      .populate('author', 'username')
      .sort({ reportCount: -1 });

    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
});

// Eliminar post
router.delete('/posts/:id', protect, admin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    post.deleted = true;
    await post.save();

    res.json({ success: true, message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar post' });
  }
});

// Banear usuario
router.post('/users/:id/ban', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.banned = true;
    await user.save();

    res.json({ success: true, message: 'Usuario baneado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al banear usuario' });
  }
});

// Desbanear usuario
router.post('/users/:id/unban', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.banned = false;
    await user.save();

    res.json({ success: true, message: 'Usuario desbaneado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desbanear usuario' });
  }
});

// Estadísticas del sitio
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments({ deleted: false });
    const totalBoards = await Board.countDocuments();
    const reportedPosts = await Post.countDocuments({ reported: true, deleted: false });
    const bannedUsers = await User.countDocuments({ banned: true });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalPosts,
        totalBoards,
        reportedPosts,
        bannedUsers
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router;
