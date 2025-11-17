const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentType: {
    type: String,
    enum: ['text', 'image', 'video'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    maxlength: 10000
  },
  mediaUrl: {
    type: String
  },
  thumbnail: {
    type: String
  },
  upvotes: {
    type: Number,
    default: 0
  },
  upvotedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  replyCount: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  reported: {
    type: Boolean,
    default: false
  },
  reportCount: {
    type: Number,
    default: 0
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índices para búsquedas rápidas
postSchema.index({ board: 1, createdAt: -1 });
postSchema.index({ contentType: 1 });
postSchema.index({ upvotes: -1 });

module.exports = mongoose.model('Post', postSchema);
