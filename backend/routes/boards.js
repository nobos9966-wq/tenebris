const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const { protect, admin } = require('../middleware/auth');

// Obtener todos los boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().sort({ name: 1 });
    res.json({ success: true, boards });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener boards' });
  }
});

// Obtener un board por slug
router.get('/:slug', async (req, res) => {
  try {
    const board = await Board.findOne({ slug: req.params.slug });
    if (!board) {
      return res.status(404).json({ error: 'Board no encontrado' });
    }
    res.json({ success: true, board });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener board' });
  }
});

// Crear board (solo admin)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const board = await Board.create({
      name,
      slug,
      description,
      icon,
      color
    });

    res.status(201).json({ success: true, board });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear board' });
  }
});

module.exports = router;
