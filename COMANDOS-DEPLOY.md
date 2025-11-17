# 🔧 Comandos Útiles para Deploy

## 📝 Comandos Git

### Primera vez (subir a GitHub)
```bash
cd tenebris
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/tenebris.git
git push -u origin main
```

### Actualizar código después de cambios
```bash
git add .
git commit -m "Descripción de cambios"
git push
```

### Ver estado de Git
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

### Deshacer último commit (mantener cambios)
```bash
git reset --soft HEAD~1
```

---

## 🗄️ Comandos MongoDB

### Conectar a MongoDB local
```bash
mongosh
```

### Conectar a MongoDB Atlas
```bash
mongosh "mongodb+srv://tenebris_user:PASSWORD@cluster.xxxxx.mongodb.net/tenebris"
```

### Ver bases de datos
```javascript
show dbs
```

### Usar base de datos tenebris
```javascript
use tenebris
```

### Ver colecciones
```javascript
show collections
```

### Ver usuarios
```javascript
db.users.find().pretty()
```

### Convertir usuario en admin
```javascript
db.users.updateOne(
  { username: "tu_usuario" },
  { $set: { role: "admin" } }
)
```

### Ver posts
```javascript
db.posts.find().pretty()
```

### Contar documentos
```javascript
db.users.countDocuments()
db.posts.countDocuments()
db.boards.countDocuments()
```

### Eliminar todos los posts (cuidado!)
```javascript
db.posts.deleteMany({})
```

### Backup de base de datos
```bash
mongodump --uri="mongodb+srv://..." --out=backup
```

---

## 🚀 Comandos Render (Backend)

### Ver logs en tiempo real
```
Render Dashboard → Tu servicio → Logs
```

### Ejecutar comando en Shell
```
Render Dashboard → Tu servicio → Shell
```

### Seed de datos
```bash
npm run seed
```

### Ver variables de entorno
```bash
env
```

### Reiniciar servicio
```
Render Dashboard → Tu servicio → Manual Deploy → Deploy latest commit
```

### Ver uso de recursos
```
Render Dashboard → Tu servicio → Metrics
```

---

## ⚡ Comandos Vercel (Frontend)

### Deploy desde CLI (opcional)
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

### Ver logs de deploy
```
Vercel Dashboard → Tu proyecto → Deployments → View Logs
```

### Redeploy
```
Vercel Dashboard → Tu proyecto → Deployments → Redeploy
```

### Ver variables de entorno
```
Vercel Dashboard → Tu proyecto → Settings → Environment Variables
```

### Agregar dominio personalizado
```
Vercel Dashboard → Tu proyecto → Settings → Domains → Add
```

---

## 🧪 Comandos de Testing

### Probar backend local
```bash
cd backend
npm run dev
```

### Probar frontend local
```bash
cd frontend
npm run dev
```

### Probar API con curl
```bash
# Health check
curl http://localhost:5000/api/health

# Registrar usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

### Probar API en producción
```bash
# Health check
curl https://tenebris-backend.onrender.com/api/health

# Ver boards
curl https://tenebris-backend.onrender.com/api/boards
```

---

## 🔍 Comandos de Diagnóstico

### Ver versión de Node.js
```bash
node --version
```

### Ver versión de npm
```bash
npm --version
```

### Ver versión de Git
```bash
git --version
```

### Limpiar cache de npm
```bash
npm cache clean --force
```

### Reinstalar dependencias
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Ver puertos en uso (Windows)
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

### Matar proceso en puerto (Windows)
```bash
# Encontrar PID
netstat -ano | findstr :5000

# Matar proceso
taskkill /PID [número] /F
```

---

## 📊 Comandos de Monitoreo

### Ver logs de backend local
```bash
cd backend
npm run dev
# Los logs aparecen en la terminal
```

### Ver logs de frontend local
```bash
cd frontend
npm run dev
# Los logs aparecen en la terminal
```

### Ver logs de MongoDB
```bash
# En MongoDB Atlas
Atlas Dashboard → Database → Monitoring
```

### Ver métricas de Render
```
Render Dashboard → Tu servicio → Metrics
```

### Ver analytics de Vercel
```
Vercel Dashboard → Tu proyecto → Analytics
```

---

## 🔐 Comandos de Seguridad

### Generar JWT secret seguro
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Generar contraseña segura
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Hash de contraseña (bcrypt)
```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('mi_password', 10);
console.log(hash);
```

---

## 🛠️ Comandos de Mantenimiento

### Actualizar dependencias
```bash
# Backend
cd backend
npm update

# Frontend
cd frontend
npm update
```

### Ver dependencias desactualizadas
```bash
npm outdated
```

### Auditar seguridad
```bash
npm audit
npm audit fix
```

### Build de producción local
```bash
# Frontend
cd frontend
npm run build

# Ver resultado
cd dist
```

---

## 🔄 Comandos de Actualización

### Actualizar código en producción
```bash
# 1. Hacer cambios en tu código
# 2. Probar en local
# 3. Subir a GitHub
git add .
git commit -m "Descripción de cambios"
git push

# 4. Render y Vercel se actualizan automáticamente
```

### Forzar redeploy sin cambios
```bash
# Render
Render Dashboard → Manual Deploy → Deploy latest commit

# Vercel
Vercel Dashboard → Deployments → Redeploy
```

---

## 📱 Comandos de UptimeRobot

### Configurar monitor
```
1. https://uptimerobot.com
2. Add New Monitor
3. Monitor Type: HTTP(s)
4. URL: https://tenebris-backend.onrender.com/api/health
5. Monitoring Interval: 5 minutes
```

### Ver status
```
UptimeRobot Dashboard → Monitors
```

---

## 🎯 Comandos Útiles Específicos

### Crear nuevo board
```javascript
// En MongoDB
db.boards.insertOne({
  name: "Nuevo Board",
  slug: "nuevo-board",
  description: "Descripción del board",
  icon: "🎨",
  color: "purple"
})
```

### Ver estadísticas
```javascript
// En MongoDB
db.users.countDocuments()
db.posts.countDocuments()
db.messages.countDocuments()
db.boards.countDocuments()
```

### Limpiar posts antiguos
```javascript
// Eliminar posts de más de 30 días
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
db.posts.deleteMany({ createdAt: { $lt: thirtyDaysAgo } })
```

### Banear usuario
```javascript
db.users.updateOne(
  { username: "usuario_malo" },
  { $set: { isBanned: true } }
)
```

### Desbanear usuario
```javascript
db.users.updateOne(
  { username: "usuario_malo" },
  { $set: { isBanned: false } }
)
```

---

## 🆘 Comandos de Emergencia

### Rollback a commit anterior
```bash
# Ver commits
git log --oneline

# Volver a commit específico
git reset --hard [commit-hash]
git push --force
```

### Restaurar base de datos
```bash
mongorestore --uri="mongodb+srv://..." backup/
```

### Limpiar todo y empezar de nuevo
```bash
# ⚠️ CUIDADO: Esto borra todo
db.dropDatabase()
npm run seed
```

---

**Guarda este archivo para referencia rápida! 📚**
