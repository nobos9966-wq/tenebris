const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Reply = require('../models/Reply');
const Board = require('../models/Board');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Obtener posts con filtros
router.get('/', async (req, res) => {
  try {
    const { board, contentType, sort = 'recent', page = 1, limit = 20 } = req.query;
    
    const query = { deleted: false };
    if (board) query.board = board;
    if (contentType) query.contentType = contentType;

    let sortOption = { createdAt: -1 };
    if (sort === 'popular') sortOption = { upvotes: -1, createdAt: -1 };
    if (sort === 'trending') sortOption = { views: -1, upvotes: -1 };

    const posts = await Post.find(query)
      .populate('board', 'name slug icon color')
      .populate('author', 'username avatar')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Post.countDocuments(query);

    res.json({
      success: true,
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});

// Obtener un post específico
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('board', 'name slug icon color')
      .populate('author', 'username avatar');

    if (!post || post.deleted) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Incrementar vistas
    post.views += 1;
    await post.save();

    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener post' });
  }
});

// Crear post
router.post('/', protect, upload.single('media'), async (req, res) => {
  try {
    const { boardId, contentType, title, content } = req.body;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Board no encontrado' });
    }

    const postData = {
      board: boardId,
      author: req.user._id,
      contentType,
      title,
      content
    };

    if (req.file) {
      postData.mediaUrl = `/uploads/${req.file.filename}`;
      if (contentType === 'image') {
        postData.thumbnail = postData.mediaUrl;
      }
    }

    const post = await Post.create(postData);
    
    // Incrementar contador del board
    board.postCount += 1;
    await board.save();

    const populatedPost = await Post.findById(post._id)
      .populate('board', 'name slug icon color')
      .populate('author', 'username avatar');

    res.status(201).json({ success: true, post: populatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear post' });
  }
});

// Upvote post
router.post('/:id/upvote', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const hasUpvoted = post.upvotedBy.includes(req.user._id);

    if (hasUpvoted) {
      post.upvotes -= 1;
      post.upvotedBy = post.upvotedBy.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.upvotes += 1;
      post.upvotedBy.push(req.user._id);
    }

    await post.save();

    res.json({ success: true, upvotes: post.upvotes, hasUpvoted: !hasUpvoted });
  } catch (error) {
    res.status(500).json({ error: 'Error al dar upvote' });
  }
});

// Reportar post
router.post('/:id/report', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    post.reported = true;
    post.reportCount += 1;
    await post.save();

    res.json({ success: true, message: 'Post reportado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al reportar post' });
  }
});

// Obtener replies de un post
router.get('/:id/replies', async (req, res) => {
  try {
    const replies = await Reply.find({ post: req.params.id, deleted: false })
      .populate('author', 'username avatar')
      .sort({ createdAt: 1 });

    res.json({ success: true, replies });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener respuestas' });
  }
});

// Crear reply
router.post('/:id/replies', protect, upload.single('media'), async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const replyData = {
      post: req.params.id,
      author: req.user._id,
      content
    };

    if (req.file) {
      replyData.mediaUrl = `/uploads/${req.file.filename}`;
    }

    const reply = await Reply.create(replyData);
    
    post.replyCount += 1;
    await post.save();

    const populatedReply = await Reply.findById(reply._id)
      .populate('author', 'username avatar');

    res.status(201).json({ success: true, reply: populatedReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear respuesta' });
  }
});

module.exports = router;
