# 📝 Comandos Útiles - Tenebris

## 🚀 Inicio Rápido

### Windows
```bash
# Doble click en:
START.bat
```

### Manual
```bash
# Terminal 1 - Backend
cd tenebris/backend
npm run dev

# Terminal 2 - Frontend
cd tenebris/frontend
npm run dev
```

## 📦 Instalación

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## 🗄️ Base de Datos

### Crear boards iniciales
```bash
cd backend
npm run seed
```

### Conectar a MongoDB local
```bash
# Iniciar MongoDB
mongod

# Conectar con mongo shell
mongo
use tenebris
```

### Ver colecciones
```javascript
// En mongo shell
show collections
db.users.find()
db.posts.find()
db.boards.find()
```

### Crear usuario admin
```javascript
// En mongo shell o MongoDB Compass
db.users.updateOne(
  { username: "tu_usuario" },
  { $set: { role: "admin" } }
)
```

### Limpiar base de datos
```javascript
// CUIDADO: Esto borra todo
db.users.deleteMany({})
db.posts.deleteMany({})
db.messages.deleteMany({})
db.replies.deleteMany({})
```

## 🔧 Desarrollo

### Backend con auto-reload
```bash
cd backend
npm run dev
```

### Frontend con hot-reload
```bash
cd frontend
npm run dev
```

### Ver logs del backend
```bash
# Los logs aparecen en la terminal donde corre npm run dev
```

## 🏗️ Producción

### Build frontend
```bash
cd frontend
npm run build
# Archivos en: frontend/dist
```

### Iniciar backend en producción
```bash
cd backend
npm start
```

### Preview del build
```bash
cd frontend
npm run preview
```

## 🧪 Testing

### Probar API con curl

#### Registro
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"test123\"}"
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"test123\"}"
```

#### Obtener boards
```bash
curl http://localhost:5000/api/boards
```

#### Obtener posts
```bash
curl http://localhost:5000/api/posts
```

## 🐛 Debug

### Ver variables de entorno
```bash
cd backend
type .env
```

### Verificar puerto en uso
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

### Matar proceso en puerto
```bash
# Encontrar PID
netstat -ano | findstr :5000

# Matar proceso (reemplazar PID)
taskkill /PID <PID> /F
```

### Limpiar node_modules
```bash
# Backend
cd backend
rmdir /s /q node_modules
npm install

# Frontend
cd frontend
rmdir /s /q node_modules
npm install
```

### Limpiar cache de npm
```bash
npm cache clean --force
```

## 📁 Archivos Importantes

### Configuración Backend
- `backend/.env` - Variables de entorno
- `backend/server.js` - Servidor principal
- `backend/package.json` - Dependencias

### Configuración Frontend
- `frontend/vite.config.js` - Config de Vite
- `frontend/tailwind.config.js` - Config de Tailwind
- `frontend/package.json` - Dependencias

### Modelos
- `backend/models/User.js`
- `backend/models/Post.js`
- `backend/models/Board.js`
- `backend/models/Message.js`
- `backend/models/Reply.js`

### Rutas API
- `backend/routes/auth.js` - Autenticación
- `backend/routes/posts.js` - Posts
- `backend/routes/boards.js` - Boards
- `backend/routes/users.js` - Usuarios
- `backend/routes/chat.js` - Chat
- `backend/routes/admin.js` - Admin

### Páginas Frontend
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Board.jsx`
- `frontend/src/pages/Post.jsx`
- `frontend/src/pages/CreatePost.jsx`
- `frontend/src/pages/Chat.jsx`
- `frontend/src/pages/Profile.jsx`
- `frontend/src/pages/Admin.jsx`

## 🔑 Variables de Entorno

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/tenebris
JWT_SECRET=tu_secreto_super_seguro
PORT=5000
NODE_ENV=development
MAX_IMAGE_SIZE=10
MAX_VIDEO_SIZE=500
```

## 🌐 URLs

### Desarrollo
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

### Endpoints API
- POST `/api/auth/register` - Registro
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Perfil actual
- GET `/api/boards` - Listar boards
- GET `/api/posts` - Listar posts
- POST `/api/posts` - Crear post
- GET `/api/posts/:id` - Ver post
- POST `/api/posts/:id/upvote` - Dar upvote
- POST `/api/posts/:id/report` - Reportar
- GET `/api/posts/:id/replies` - Ver respuestas
- POST `/api/posts/:id/replies` - Crear respuesta
- GET `/api/users/search` - Buscar usuarios
- POST `/api/users/:id/friend` - Agregar amigo
- GET `/api/chat/conversations` - Conversaciones
- GET `/api/chat/messages/:userId` - Mensajes
- POST `/api/chat/messages` - Enviar mensaje
- GET `/api/admin/stats` - Estadísticas
- GET `/api/admin/reports` - Posts reportados
- DELETE `/api/admin/posts/:id` - Eliminar post
- POST `/api/admin/users/:id/ban` - Banear usuario

## 💡 Tips

### Desarrollo más rápido
1. Usa `nodemon` para auto-reload del backend (ya incluido)
2. Usa Vite HMR para hot-reload del frontend (automático)
3. Abre MongoDB Compass para ver la base de datos visualmente

### Debugging
1. Usa `console.log()` en backend para ver logs
2. Usa React DevTools en el navegador
3. Usa Network tab para ver requests HTTP

### Performance
1. Usa índices en MongoDB para queries rápidas (ya implementado)
2. Comprime imágenes antes de subir
3. Usa paginación para listas largas (ya implementado)

## 🆘 Ayuda

Si tienes problemas:
1. Lee `INSTALL.md` para instalación detallada
2. Lee `README.md` para información general
3. Lee `FEATURES.md` para ver todas las características
4. Revisa los logs en las terminales
5. Verifica que MongoDB esté corriendo
6. Verifica que los puertos 5000 y 5173 estén libres
