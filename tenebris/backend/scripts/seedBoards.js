require('dotenv').config();
const mongoose = require('mongoose');
const Board = require('../models/Board');

const boards = [
  {
    name: 'Zona 4',
    slug: 'zona-4',
    description: 'Contenido random y discusiones generales',
    icon: '🎭',
    color: '#a855f7'
  },
  {
    name: 'Memes',
    slug: 'memes',
    description: 'Los mejores memes de internet',
    icon: '😂',
    color: '#ec4899'
  },
  {
    name: 'Tecnología',
    slug: 'tecnologia',
    description: 'Noticias y discusiones sobre tecnología',
    icon: '💻',
    color: '#3b82f6'
  },
  {
    name: 'Gaming',
    slug: 'gaming',
    description: 'Videojuegos y cultura gamer',
    icon: '🎮',
    color: '#10b981'
  },
  {
    name: 'Arte',
    slug: 'arte',
    description: 'Comparte tu arte y creatividad',
    icon: '🎨',
    color: '#f59e0b'
  },
  {
    name: 'Música',
    slug: 'musica',
    description: 'Todo sobre música',
    icon: '🎵',
    color: '#8b5cf6'
  }
];

async function seedBoards() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tenebris');
    console.log('✅ Conectado a MongoDB');

    await Board.deleteMany({});
    console.log('🗑️  Boards anteriores eliminados');

    await Board.insertMany(boards);
    console.log('✅ Boards creados exitosamente');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedBoards();
