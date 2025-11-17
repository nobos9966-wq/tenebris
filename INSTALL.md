# 🚀 Guía de Instalación - Tenebris

## Requisitos Previos

- Node.js 18+ instalado
- MongoDB instalado localmente O cuenta en MongoDB Atlas (gratis)
- Git instalado

## Instalación Paso a Paso

### 1. Instalar MongoDB (si no lo tienes)

**Opción A: MongoDB Local**
- Windows: Descargar de https://www.mongodb.com/try/download/community
- Ejecutar el instalador y seguir los pasos

**Opción B: MongoDB Atlas (Recomendado - Gratis)**
1. Crear cuenta en https://www.mongodb.com/cloud/atlas/register
2. Crear un cluster gratuito
3. Obtener la cadena de conexión

### 2. Configurar Backend

```bash
cd tenebris/backend
npm install
```

### 3. Configurar Variables de Entorno

Copiar `.env.example` a `.env`:
```bash
copy .env.example .env
```

Editar `.env` con tus datos:
```
MONGODB_URI=mongodb://localhost:27017/tenebris
# O si usas Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.xxxxx.mongodb.net/tenebris

JWT_SECRET=cambiar_por_algo_super_seguro_123456
PORT=5000
NODE_ENV=development
```

### 4. Crear Boards Iniciales

```bash
npm run seed
```

### 5. Iniciar Backend

```bash
npm run dev
```

Deberías ver:
```
✅ MongoDB conectado
🚀 Servidor corriendo en puerto 5000
```

### 6. Configurar Frontend (Nueva terminal)

```bash
cd tenebris/frontend
npm install
```

### 7. Iniciar Frontend

```bash
npm run dev
```

Deberías ver:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 8. Abrir en el Navegador

Ir a: http://localhost:5173

## Crear Usuario Admin

1. Registrarse normalmente en la web
2. En MongoDB, cambiar el rol del usuario:

```javascript
// En MongoDB Compass o mongo shell:
db.users.updateOne(
  { username: "tu_usuario" },
  { $set: { role: "admin" } }
)
```

## Solución de Problemas

### Error: MongoDB no conecta
- Verificar que MongoDB esté corriendo
- Verificar la cadena de conexión en `.env`

### Error: Puerto 5000 en uso
- Cambiar `PORT=5000` a otro puerto en `.env`
- Actualizar `vite.config.js` con el nuevo puerto

### Error: Cannot find module
- Ejecutar `npm install` en backend y frontend

## Estructura de Carpetas

```
tenebris/
├── backend/
│   ├── models/          # Modelos de MongoDB
│   ├── routes/          # Rutas API
│   ├── middleware/      # Autenticación, uploads
│   ├── socket/          # Chat en tiempo real
│   ├── scripts/         # Scripts de utilidad
│   └── uploads/         # Archivos subidos
├── frontend/
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   ├── services/    # API y Socket
│   │   └── store/       # Estado global
│   └── public/
└── README.md
```

## Próximos Pasos

1. Registrar una cuenta
2. Explorar los boards
3. Crear tu primer post
4. Chatear con otros usuarios

¡Disfruta Tenebris! 🌑
