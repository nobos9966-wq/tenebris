const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Buscar usuarios
router.get('/search', protect, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json({ success: true, users: [] });
    }

    const users = await User.find({
      username: { $regex: q, $options: 'i' },
      banned: false
    })
    .select('username avatar')
    .limit(10);

    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
});

// Obtener perfil de usuario
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -email');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Agregar amigo
router.post('/:id/friend', protect, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    
    if (!targetUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (req.user.friends.includes(req.params.id)) {
      return res.status(400).json({ error: 'Ya son amigos' });
    }

    req.user.friends.push(req.params.id);
    await req.user.save();

    res.json({ success: true, message: 'Amigo agregado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar amigo' });
  }
});

// Obtener amigos
router.get('/me/friends', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('friends', 'username avatar');

    res.json({ success: true, friends: user.friends });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener amigos' });
  }
});

module.exports = router;
