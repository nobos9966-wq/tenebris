import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

let socket = null;

export const connectSocket = () => {
  const token = useAuthStore.getState().token;
  
  if (!token || socket?.connected) return socket;

  const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  socket = io(SOCKET_URL, {
    auth: { token }
  });

  socket.on('connect', () => {
    console.log('✅ Socket conectado');
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket desconectado');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
