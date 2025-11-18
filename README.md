# Tenebris - Foro Anónimo

Foro anónimo moderno con chat en tiempo real, construido con React, Node.js y MongoDB.

## 🚀 Deploy en Producción

### Backend (Render)
1. Conecta tu repositorio de GitHub a Render
2. Configura las variables de entorno:
   - `MONGODB_URI`: Tu string de conexión de MongoDB Atlas
   - `JWT_SECRET`: Clave secreta para JWT (genera una segura)
   - `NODE_ENV`: production
   - `FRONTEND_URL`: URL de tu frontend en Vercel

### Frontend (Vercel)
1. Conecta tu repositorio de GitHub a Vercel
2. Configura la variable de entorno:
   - `VITE_API_URL`: URL de tu backend en Render

## 🛠️ Desarrollo Local

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
tenebris/
├── backend/          # API Node.js + Express
├── frontend/         # React + Vite
├── docker-compose.yml
└── README.md
```

## 🔧 Variables de Entorno

Ver `.env.example` en cada directorio para las variables necesarias.