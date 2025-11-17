# 🌑 TENEBRIS - Foro Anónimo Moderno

Plataforma web estilo 4chan con funcionalidades modernas: boards temáticos, chat en tiempo real, subida de multimedia y diseño oscuro profesional.

![Tenebris](https://img.shields.io/badge/Status-Completo-success)
![Node](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## ✨ Características Completas

### 🔐 Autenticación
- ✅ Registro rápido (usuario + contraseña, email opcional)
- ✅ Login seguro con JWT
- ✅ Mensaje de bienvenida personalizado
- ✅ Selección de tipo de contenido al entrar

### 📋 Boards Temáticos
- ✅ Sistema de boards (Zona 4, Memes, Tecnología, Gaming, Arte, Música)
- ✅ Miniaturas automáticas de imágenes y videos
- ✅ Ordenar por: Recientes / Populares / Trending
- ✅ Filtros por tipo: Texto / Imagen / Video
- ✅ Scroll infinito para cargar más posts

### 📝 Publicación de Contenido
- ✅ Botón "Crear Post" siempre visible
- ✅ Formularios adaptados por tipo de contenido
- ✅ Vista previa antes de publicar
- ✅ Validación de archivos (imágenes hasta 10MB, videos hasta 500MB/2h)
- ✅ Selección de board para publicar

### 💬 Interacción
- ✅ Sistema de respuestas (hilos)
- ✅ Upvotes/Me gusta
- ✅ Reportar contenido inapropiado
- ✅ Contador de vistas
- ✅ Miniaturas automáticas

### 💬 Chat en Tiempo Real
- ✅ Solo para usuarios registrados
- ✅ Lista de amigos/contactos
- ✅ Buscar y chatear con cualquier usuario
- ✅ Mensajes en tiempo real (Socket.io)
- ✅ Indicador "escribiendo..."
- ✅ Notificaciones de mensajes nuevos

### 🛡️ Moderación y Seguridad
- ✅ Panel de administrador completo
- ✅ Sistema de reportes
- ✅ Estadísticas del sitio
- ✅ Banear/desbanear usuarios
- ✅ Eliminar posts reportados
- ✅ Hashing de contraseñas (bcrypt)
- ✅ Protección XSS, CSRF, SQL Injection
- ✅ Validación de inputs

### 🎨 Diseño y UX
- ✅ Tema oscuro con colores neón suaves
- ✅ Interfaz minimalista y profesional
- ✅ Animaciones suaves (Framer Motion)
- ✅ Responsive (móvil y escritorio)
- ✅ Botones redondeados y menús desplegables

### 🚀 Escalabilidad
- ✅ Trending posts por board
- ✅ Miniaturas automáticas
- ✅ Historial de usuario
- ✅ Preparado para miles de posts
- ✅ Arquitectura escalable

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Estilos utility-first
- **Framer Motion** - Animaciones fluidas
- **Socket.io Client** - WebSockets
- **Zustand** - Estado global
- **Axios** - HTTP client
- **React Router** - Navegación
- **React Hot Toast** - Notificaciones

### Backend
- **Node.js + Express** - Servidor API REST
- **MongoDB + Mongoose** - Base de datos NoSQL
- **Socket.io** - Chat en tiempo real
- **JWT** - Autenticación
- **Bcrypt** - Hash de contraseñas
- **Multer** - Subida de archivos
- **Helmet** - Seguridad HTTP
- **Express Validator** - Validación

## 📦 Instalación Rápida

### Requisitos
- Node.js 18+
- MongoDB (local o Atlas)

### 1. Instalar dependencias

```bash
# Backend
cd tenebris/backend
npm install

# Frontend (nueva terminal)
cd tenebris/frontend
npm install
```

### 2. Configurar MongoDB

**Opción A: MongoDB Local**
- Descargar de https://www.mongodb.com/try/download/community
- Instalar y ejecutar

**Opción B: MongoDB Atlas (Gratis - Recomendado)**
- Crear cuenta en https://www.mongodb.com/cloud/atlas/register
- Crear cluster gratuito
- Obtener cadena de conexión

### 3. Configurar variables de entorno

```bash
cd backend
copy .env.example .env
```

Editar `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/tenebris
# O Atlas: mongodb+srv://usuario:password@cluster.xxxxx.mongodb.net/tenebris

JWT_SECRET=cambiar_por_algo_super_seguro_123456
PORT=5000
NODE_ENV=development
```

### 4. Crear boards iniciales

```bash
cd backend
npm run seed
```

### 5. Iniciar aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Deberías ver:
```
✅ MongoDB conectado
🚀 Servidor corriendo en puerto 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Deberías ver:
```
➜  Local:   http://localhost:5173/
```

### 6. Abrir en navegador

Ir a: **http://localhost:5173**

## 👤 Crear Usuario Admin

1. Registrarse normalmente en la web
2. En MongoDB Compass o mongo shell:

```javascript
db.users.updateOne(
  { username: "tu_usuario" },
  { $set: { role: "admin" } }
)
```

## 📁 Estructura del Proyecto

```
tenebris/
├── backend/
│   ├── models/          # Modelos MongoDB (User, Post, Board, Message, Reply)
│   ├── routes/          # Rutas API (auth, posts, boards, users, chat, admin)
│   ├── middleware/      # Auth, upload, validación
│   ├── socket/          # Chat en tiempo real
│   ├── scripts/         # Scripts de utilidad (seed)
│   ├── uploads/         # Archivos subidos (auto-creado)
│   ├── server.js        # Servidor principal
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar
│   │   ├── pages/       # Login, Register, Home, Board, Post, CreatePost, Chat, Profile, Admin
│   │   ├── services/    # API, Socket
│   │   ├── store/       # Zustand (authStore)
│   │   ├── App.jsx      # Router principal
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── INSTALL.md           # Guía detallada de instalación
├── README.md            # Este archivo
└── .gitignore
```

## 🎯 Funcionalidades por Página

### 🏠 Home (`/`)
- Mensaje de bienvenida personalizado
- Selección de tipo de contenido (Texto/Imagen/Video)
- Lista de boards en sidebar
- Posts con filtros y ordenamiento
- Botón crear post

### 📋 Board (`/board/:slug`)
- Vista de board específico
- Posts filtrados por board
- Ordenar por recientes/populares/trending
- Crear post en ese board

### 📝 Post (`/post/:id`)
- Vista completa del post
- Upvote/downvote
- Sistema de respuestas
- Reportar contenido
- Contador de vistas

### ✍️ Crear Post (`/create`)
- Selección de tipo de contenido
- Formulario adaptado
- Vista previa
- Validación de archivos
- Selección de board

### 💬 Chat (`/chat` o `/chat/:userId`)
- Lista de amigos
- Buscar usuarios
- Chat en tiempo real
- Indicador "escribiendo..."
- Historial de mensajes

### 👤 Perfil (`/profile/:id`)
- Información del usuario
- Agregar amigo
- Enviar mensaje

### 🛡️ Admin (`/admin`)
- Estadísticas del sitio
- Posts reportados
- Eliminar contenido
- Banear usuarios

## 🔒 Seguridad Implementada

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ JWT con expiración de 30 días
- ✅ Validación de inputs (express-validator)
- ✅ Protección headers HTTP (helmet)
- ✅ CORS configurado
- ✅ Sanitización de archivos
- ✅ Límites de tamaño de archivos
- ✅ Protección contra inyección NoSQL
- ✅ Autenticación en Socket.io

## 🚀 Próximos Pasos

1. **Registrar cuenta** en http://localhost:5173/register
2. **Explorar boards** y ver posts existentes
3. **Crear tu primer post** (texto, imagen o video)
4. **Agregar amigos** y chatear en tiempo real
5. **Convertir a admin** para acceder al panel de moderación

## 📚 Documentación Adicional

- Ver `INSTALL.md` para guía detallada de instalación
- Ver `backend/.env.example` para variables de entorno
- Ver comentarios en código para detalles de implementación

## 🐛 Solución de Problemas

### MongoDB no conecta
- Verificar que MongoDB esté corriendo
- Verificar cadena de conexión en `.env`

### Puerto 5000 en uso
- Cambiar `PORT` en `.env`
- Actualizar proxy en `vite.config.js`

### Error al subir archivos
- Verificar que carpeta `uploads/` exista
- Verificar permisos de escritura

### Socket.io no conecta
- Verificar que backend esté corriendo
- Verificar URL en `frontend/src/services/socket.js`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta Tenebris! 🌑**
