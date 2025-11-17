const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = (io) => {
  const users = new Map(); // userId -> socketId

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('No autorizado'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user || user.banned) {
        return next(new Error('Usuario no válido'));
      }

      socket.userId = user._id.toString();
      socket.username = user.username;
      next();
    } catch (error) {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ Usuario conectado: ${socket.username} (${socket.userId})`);
    
    // Registrar usuario conectado
    users.set(socket.userId, socket.id);
    
    // Notificar a amigos que el usuario está online
    socket.broadcast.emit('user:online', { userId: socket.userId });

    // Unirse a sala personal
    socket.join(`user:${socket.userId}`);

    // Enviar mensaje
    socket.on('message:send', async (data) => {
      try {
        const { receiverId, content } = data;

        const message = await Message.create({
          sender: socket.userId,
          receiver: receiverId,
          content
        });

        const populatedMessage = await Message.findById(message._id)
          .populate('sender receiver', 'username avatar');

        // Enviar al receptor si está online
        const receiverSocketId = users.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('message:receive', populatedMessage);
        }

        // Confirmar al emisor
        socket.emit('message:sent', populatedMessage);
      } catch (error) {
        socket.emit('message:error', { error: 'Error al enviar mensaje' });
      }
    });

    // Usuario escribiendo
    socket.on('typing:start', (data) => {
      const receiverSocketId = users.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing:start', {
          userId: socket.userId,
          username: socket.username
        });
      }
    });

    socket.on('typing:stop', (data) => {
      const receiverSocketId = users.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing:stop', {
          userId: socket.userId
        });
      }
    });

    // Marcar mensajes como leídos
    socket.on('messages:read', async (data) => {
      try {
        await Message.updateMany(
          { sender: data.senderId, receiver: socket.userId, read: false },
          { read: true }
        );

        const senderSocketId = users.get(data.senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit('messages:read', {
            userId: socket.userId
          });
        }
      } catch (error) {
        console.error('Error al marcar mensajes como leídos:', error);
      }
    });

    // Desconexión
    socket.on('disconnect', () => {
      console.log(`❌ Usuario desconectado: ${socket.username}`);
      users.delete(socket.userId);
      socket.broadcast.emit('user:offline', { userId: socket.userId });
    });
  });
};
