# 🚀 Deploy GRATIS de Tenebris a Internet

## 🎯 Plataformas 100% Gratuitas

### Stack Gratuito Recomendado:
- **MongoDB Atlas** - Base de datos (512MB gratis)
- **Render** - Backend (750 horas/mes gratis)
- **Vercel** - Frontend (ilimitado gratis)

---

## 📋 PASO 1: MongoDB Atlas (Base de Datos)

### 1.1 Crear Cuenta
1. Ir a: https://www.mongodb.com/cloud/atlas/register
2. Registrarse con email o Google
3. Verificar email

### 1.2 Crear Cluster Gratuito
1. Click en "Build a Database"
2. Seleccionar **M0 FREE** (512MB)
3. Elegir región más cercana (ej: AWS - US East)
4. Nombre del cluster: `tenebris`
5. Click "Create"
6. Esperar 3-5 minutos

### 1.3 Configurar Acceso
1. **Database Access:**
   - Click "Database Access" (menú izquierdo)
   - Click "Add New Database User"
   - Username: `tenebris_user`
   - Password: Generar automático (COPIAR Y GUARDAR)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### 1.4 Obtener Connection String
1. Click "Database" (menú izquierdo)
2. Click "Connect" en tu cluster
3. Click "Connect your application"
4. Copiar la cadena de conexión:
   ```
   mongodb+srv://tenebris_user:<password>@tenebris.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Reemplazar `<password>` con tu contraseña
6. **GUARDAR ESTA CADENA** - la necesitarás después

---

## 📋 PASO 2: Render (Backend)

### 2.1 Preparar Código
1. Crear archivo `tenebris/backend/render.yaml`:

```yaml
services:
  - type: web
    name: tenebris-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

2. Asegurarse que `backend/package.json` tenga:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node scripts/seedBoards.js"
  }
}
```

### 2.2 Crear Cuenta en Render
1. Ir a: https://render.com
2. Click "Get Started for Free"
3. Registrarse con GitHub (recomendado) o email

### 2.3 Subir Código a GitHub
```bash
cd tenebris
git init
git add .
git commit -m "Initial commit - Tenebris"

# Crear repositorio en GitHub:
# 1. Ir a https://github.com/new
# 2. Nombre: tenebris
# 3. Público o Privado
# 4. NO inicializar con README
# 5. Copiar comandos que aparecen

git remote add origin https://github.com/TU_USUARIO/tenebris.git
git branch -M main
git push -u origin main
```

### 2.4 Deploy en Render
1. En Render Dashboard, click "New +"
2. Seleccionar "Web Service"
3. Conectar tu repositorio GitHub
4. Configuración:
   - **Name:** `tenebris-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`

5. **Variables de Entorno** (Environment):
   Click "Advanced" → "Add Environment Variable":
   
   ```
   MONGODB_URI = mongodb+srv://tenebris_user:TU_PASSWORD@tenebris.xxxxx.mongodb.net/tenebris?retryWrites=true&w=majority
   
   JWT_SECRET = tu_secreto_super_seguro_cambiar_123456789
   
   PORT = 10000
   
   NODE_ENV = production
   ```

6. Click "Create Web Service"
7. Esperar 5-10 minutos (primera vez)
8. **COPIAR LA URL** que aparece (ej: `https://tenebris-backend.onrender.com`)

### 2.5 Seed de Datos
1. En Render Dashboard, ir a tu servicio
2. Click en "Shell" (terminal)
3. Ejecutar:
   ```bash
   npm run seed
   ```

---

## 📋 PASO 3: Vercel (Frontend)

### 3.1 Actualizar Configuración Frontend

1. Editar `tenebris/frontend/src/services/api.js`:
```javascript
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

// ... resto del código igual
```

2. Editar `tenebris/frontend/src/services/socket.js`:
```javascript
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

  // ... resto del código igual
```

3. Crear `tenebris/frontend/.env.production`:
```env
VITE_API_URL=https://tenebris-backend.onrender.com
```

4. Crear `tenebris/frontend/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3.2 Crear Cuenta en Vercel
1. Ir a: https://vercel.com/signup
2. Registrarse con GitHub (recomendado)

### 3.3 Deploy en Vercel

**Opción A: Desde GitHub (Recomendado)**
1. Push cambios a GitHub:
   ```bash
   cd tenebris
   git add .
   git commit -m "Add production config"
   git push
   ```

2. En Vercel Dashboard:
   - Click "Add New..." → "Project"
   - Importar tu repositorio `tenebris`
   - Configuración:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   
3. **Environment Variables:**
   ```
   VITE_API_URL = https://tenebris-backend.onrender.com
   ```

4. Click "Deploy"
5. Esperar 2-3 minutos
6. **COPIAR LA URL** (ej: `https://tenebris.vercel.app`)

**Opción B: Desde CLI**
```bash
cd tenebris/frontend
npm install -g vercel
vercel login
vercel --prod
```

---

## 📋 PASO 4: Configurar CORS en Backend

1. Editar `tenebris/backend/server.js`:
```javascript
// Cambiar esta línea:
app.use(cors());

// Por esta:
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tenebris.vercel.app',  // Tu URL de Vercel
    'https://tu-dominio-custom.com'  // Si tienes dominio propio
  ],
  credentials: true
}));

// Y en Socket.io:
const io = socketIo(server, {
  cors: {
    origin: [
      'http://localhost:5173',
      'https://tenebris.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});
```

2. Push cambios:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

3. Render se actualizará automáticamente

---

## 📋 PASO 5: Verificar Deployment

### 5.1 Probar Backend
```bash
# Reemplazar con tu URL de Render
curl https://tenebris-backend.onrender.com/api/health
```

Debería responder:
```json
{"status":"ok","message":"Tenebris API funcionando"}
```

### 5.2 Probar Frontend
1. Abrir tu URL de Vercel en navegador
2. Registrar una cuenta
3. Crear un post
4. Probar chat

---

## 🎉 URLs Finales

Después del deploy tendrás:

- **Frontend:** `https://tenebris.vercel.app`
- **Backend:** `https://tenebris-backend.onrender.com`
- **Base de Datos:** MongoDB Atlas (en la nube)

---

## ⚠️ Limitaciones del Plan Gratuito

### Render (Backend)
- ✅ 750 horas/mes (suficiente para 1 proyecto)
- ⚠️ Se duerme después de 15 min de inactividad
- ⚠️ Primera carga puede tardar 30-60 segundos
- ✅ 512MB RAM
- ✅ Builds ilimitados

### Vercel (Frontend)
- ✅ Despliegues ilimitados
- ✅ 100GB bandwidth/mes
- ✅ Sin límite de tiempo
- ✅ CDN global
- ✅ SSL automático

### MongoDB Atlas
- ✅ 512MB almacenamiento
- ✅ Suficiente para miles de posts
- ✅ Backups automáticos
- ✅ Sin límite de tiempo

---

## 🔧 Solución de Problemas

### Backend no responde
1. Verificar logs en Render Dashboard
2. Verificar variables de entorno
3. Verificar que MongoDB esté conectado

### Frontend no conecta con Backend
1. Verificar VITE_API_URL en Vercel
2. Verificar CORS en backend
3. Abrir consola del navegador (F12)

### MongoDB no conecta
1. Verificar IP whitelist (0.0.0.0/0)
2. Verificar usuario y contraseña
3. Verificar connection string

### Render se duerme
- Es normal en plan gratuito
- Primera carga tarda 30-60 segundos
- Solución: usar servicio de "ping" gratuito como UptimeRobot

---

## 🚀 Mejoras Opcionales

### Dominio Personalizado (Gratis)
1. **Freenom** - Dominios .tk, .ml, .ga gratis
2. En Vercel: Settings → Domains → Add
3. Configurar DNS según instrucciones

### Keep Backend Awake
1. **UptimeRobot** (https://uptimerobot.com)
2. Crear monitor HTTP
3. URL: tu backend de Render
4. Intervalo: 5 minutos
5. Evita que se duerma

### SSL/HTTPS
- ✅ Vercel: Automático
- ✅ Render: Automático
- ✅ MongoDB Atlas: Automático

---

## 📊 Resumen de Costos

| Servicio | Plan | Costo | Límites |
|----------|------|-------|---------|
| MongoDB Atlas | M0 | $0 | 512MB |
| Render | Free | $0 | 750h/mes |
| Vercel | Hobby | $0 | 100GB/mes |
| **TOTAL** | | **$0/mes** | ✅ |

---

## ✅ Checklist de Deploy

- [ ] Crear cuenta MongoDB Atlas
- [ ] Crear cluster gratuito
- [ ] Configurar usuario y network access
- [ ] Copiar connection string
- [ ] Crear cuenta Render
- [ ] Subir código a GitHub
- [ ] Deploy backend en Render
- [ ] Configurar variables de entorno
- [ ] Ejecutar seed de datos
- [ ] Crear cuenta Vercel
- [ ] Deploy frontend en Vercel
- [ ] Configurar VITE_API_URL
- [ ] Actualizar CORS en backend
- [ ] Probar registro y login
- [ ] Probar crear post
- [ ] Probar chat
- [ ] ¡Compartir tu URL! 🎉

---

## 🎓 Comandos Rápidos

```bash
# 1. Preparar para deploy
cd tenebris
git init
git add .
git commit -m "Initial commit"

# 2. Subir a GitHub
git remote add origin https://github.com/TU_USUARIO/tenebris.git
git push -u origin main

# 3. Deploy frontend con Vercel CLI (opcional)
cd frontend
npm install -g vercel
vercel --prod

# 4. Ver logs de Render
# Ir a Dashboard → Tu servicio → Logs

# 5. Actualizar después de cambios
git add .
git commit -m "Update"
git push
# Render y Vercel se actualizan automáticamente
```

---

## 🌐 Alternativas Gratuitas

### Backend
- **Railway** - 500 horas/mes gratis
- **Fly.io** - 3 VMs gratis
- **Cyclic** - Ilimitado gratis

### Frontend
- **Netlify** - Similar a Vercel
- **GitHub Pages** - Para sitios estáticos
- **Cloudflare Pages** - CDN global

### Base de Datos
- **MongoDB Atlas** - La mejor opción
- **ElephantSQL** - PostgreSQL gratis
- **PlanetScale** - MySQL gratis

---

**¡Tu Tenebris estará en internet 100% GRATIS! 🌑**

*Tiempo estimado de deploy: 30-45 minutos*
