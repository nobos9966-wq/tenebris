import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { connectSocket, getSocket } from '../services/socket';
import { useAuthStore } from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Chat() {
  const { userId: selectedUserId } = useParams();
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = connectSocket();
    fetchFriends();

    if (socket.current) {
      socket.current.on('message:receive', (message) => {
        if (message.sender._id === selectedUser?._id) {
          setMessages((prev) => [...prev, message]);
          scrollToBottom();
        }
      });

      socket.current.on('typing:start', ({ userId }) => {
        if (userId === selectedUser?._id) {
          setIsTyping(true);
        }
      });

      socket.current.on('typing:stop', ({ userId }) => {
        if (userId === selectedUser?._id) {
          setIsTyping(false);
        }
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off('message:receive');
        socket.current.off('typing:start');
        socket.current.off('typing:stop');
      }
    };
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUserId) {
      loadUserChat(selectedUserId);
    }
  }, [selectedUserId]);

  const fetchFriends = async () => {
    try {
      const { data } = await api.get('/users/me/friends');
      setFriends(data.friends);
    } catch (error) {
      toast.error('Error al cargar amigos');
    }
  };

  const loadUserChat = async (userId) => {
    try {
      const { data: userData } = await api.get(`/users/${userId}`);
      setSelectedUser(userData.user);

      const { data: messagesData } = await api.get(`/chat/messages/${userId}`);
      setMessages(messagesData.messages);
      scrollToBottom();
    } catch (error) {
      toast.error('Error al cargar chat');
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await api.get(`/users/search?q=${query}`);
      setSearchResults(data.users);
    } catch (error) {
      console.error('Error al buscar usuarios');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedUser) return;

    socket.current?.emit('message:send', {
      receiverId: selectedUser._id,
      content: messageText
    });

    setMessages([...messages, {
      _id: Date.now(),
      sender: { _id: user.id, username: user.username },
      receiver: selectedUser,
      content: messageText,
      createdAt: new Date()
    }]);

    setMessageText('');
    scrollToBottom();
  };

  const handleTyping = () => {
    if (selectedUser) {
      socket.current?.emit('typing:start', { receiverId: selectedUser._id });
      setTimeout(() => {
        socket.current?.emit('typing:stop', { receiverId: selectedUser._id });
      }, 1000);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-1 bg-dark-card rounded-2xl border border-dark-border p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar usuarios..."
                className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="mt-2 bg-dark-bg rounded-lg border border-dark-border">
                {searchResults.map((searchUser) => (
                  <button
                    key={searchUser._id}
                    onClick={() => {
                      loadUserChat(searchUser._id);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="w-full p-3 hover:bg-dark-hover transition text-left"
                  >
                    {searchUser.username}
                  </button>
                ))}
              </div>
            )}
          </div>

          <h3 className="font-bold mb-3">Amigos</h3>
          <div className="space-y-2">
            {friends.map((friend) => (
              <button
                key={friend._id}
                onClick={() => loadUserChat(friend._id)}
                className={`w-full p-3 rounded-lg text-left transition ${
                  selectedUser?._id === friend._id
                    ? 'bg-neon-purple/20 border border-neon-purple'
                    : 'hover:bg-dark-hover'
                }`}
              >
                <div className="font-medium">{friend.username}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-dark-card rounded-2xl border border-dark-border flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b border-dark-border">
                <h2 className="text-xl font-bold">{selectedUser.username}</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender._id === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        message.sender._id === user.id
                          ? 'bg-gradient-to-r from-neon-purple to-neon-pink'
                          : 'bg-dark-bg'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: es })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="text-gray-400 text-sm italic">
                    {selectedUser.username} está escribiendo...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-dark-border">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => {
                      setMessageText(e.target.value);
                      handleTyping();
                    }}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-purple transition"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg hover:opacity-90 transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Selecciona un usuario para chatear
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
