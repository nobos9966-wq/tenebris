import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Board from './pages/Board';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import TestConnection from './pages/TestConnection';

function App() {
  const { token, user } = useAuthStore();

  console.log('🔐 Auth State:', { hasToken: !!token, user: user?.username });

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        <Toaster position="top-right" />
        {token && <Navbar />}
        
        <Routes>
          <Route path="/test" element={<TestConnection />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" replace />} />
          
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/board/:slug" element={token ? <Board /> : <Navigate to="/login" replace />} />
          <Route path="/post/:id" element={token ? <Post /> : <Navigate to="/login" replace />} />
          <Route path="/create" element={token ? <CreatePost /> : <Navigate to="/login" replace />} />
          <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" replace />} />
          <Route path="/chat/:userId" element={token ? <Chat /> : <Navigate to="/login" replace />} />
          <Route path="/profile/:id" element={token ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/admin" element={token && user?.role === 'admin' ? <Admin /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
