# 🚀 Deploy Rápido de Tenebris

## 🎯 Objetivo: Subir Tenebris a Internet en 30 minutos

---

## 📋 Lo que necesitas

- ✅ Cuenta de GitHub (gratis)
- ✅ Cuenta de MongoDB Atlas (gratis)
- ✅ Cuenta de Render (gratis)
- ✅ Cuenta de Vercel (gratis)
- ✅ 30-45 minutos de tiempo

**COSTO TOTAL: $0/mes** 🎉

---

## 🔥 Pasos Rápidos

### 1️⃣ MongoDB Atlas (10 min)

```
1. https://www.mongodb.com/cloud/atlas/register
2. Crear cluster M0 FREE
3. Usuario: tenebris_user
4. Contraseña: [autogenerar y guardar]
5. Network: 0.0.0.0/0
6. Copiar cadena de conexión
7. Agregar /tenebris antes del ?
```

**Guardar:**
```
mongodb+srv://tenebris_user:PASSWORD@cluster.xxxxx.mongodb.net/tenebris?retryWrites=true&w=majority
```

---

### 2️⃣ GitHub (5 min)

```bash
cd tenebris
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/tenebris.git
git push -u origin main
```

---

### 3️⃣ Render - Backend (10 min)

```
1. https://render.com → Registrar con GitHub
2. New + → Web Service
3. Conectar repo: tenebris
4. Name: tenebris-backend
5. Root Directory: backend
6. Build: npm install
7. Start: npm start
8. Plan: Free
```

**Variables de entorno:**
```
MONGODB_URI = [tu cadena de MongoDB]
JWT_SECRET = tenebris_secreto_12345
PORT = 10000
NODE_ENV = production
FRONTEND_URL = https://tenebris.vercel.app
```

**Después del deploy:**
```bash
# En Shell de Render:
npm run seed
```

**Guardar URL:** `https://tenebris-backend.onrender.com`

---

### 4️⃣ Vercel - Frontend (10 min)

**Primero, actualizar archivo:**

Editar `frontend/.env.production`:
```env
VITE_API_URL=https://tenebris-backend.onrender.com
```

**Subir cambios:**
```bash
git add .
git commit -m "Add production config"
git push
```

**Deploy:**
```
1. https://vercel.com/signup → Registrar con GitHub
2. Add New → Project
3. Importar: tenebris
4. Framework: Vite
5. Root Directory: frontend
6. Build: npm run build
7. Output: dist
```

**Variable de entorno:**
```
VITE_API_URL = https://tenebris-backend.onrender.com
```

**Guardar URL:** `https://tenebris.vercel.app`

---

### 5️⃣ Actualizar CORS (2 min)

```
1. Render → tu servicio → Environment
2. Editar FRONTEND_URL con tu URL real de Vercel
3. Save Changes
4. Esperar reinicio
```

---

### 6️⃣ Probar (5 min)

```
1. Abrir tu URL de Vercel
2. Registrar usuario
3. Crear post
4. Enviar mensaje
5. ¡Funciona! 🎉
```

---

## 🎉 ¡LISTO!

Tu Tenebris está en internet:
- **Frontend:** https://tenebris.vercel.app
- **Backend:** https://tenebris-backend.onrender.com

Comparte tu URL de Vercel con tus amigos.

---

## 🔧 Problemas Comunes

### Backend tarda en responder
- Es normal la primera vez (30-60 seg)
- Render duerme el servicio después de 15 min sin uso
- Solución: usar UptimeRobot (gratis)

### Frontend no conecta
- Verificar VITE_API_URL en Vercel
- Verificar FRONTEND_URL en Render
- Ver consola del navegador (F12)

### MongoDB no conecta
- Verificar IP whitelist: 0.0.0.0/0
- Verificar usuario y contraseña
- Verificar que la cadena tenga /tenebris

---

## 📚 Más Información

- **Guía completa:** DEPLOY-PASO-A-PASO.md
- **Checklist:** DEPLOY-CHECKLIST.md
- **URLs importantes:** URLS-IMPORTANTES.txt
- **Documentación:** README.md

---

## 🆘 Ayuda

Si algo no funciona:
1. Ver logs en Render Dashboard
2. Ver consola del navegador (F12)
3. Verificar variables de entorno
4. Esperar 30-60 seg si backend estaba dormido

---

**¡Tu Tenebris está 100% online y gratis! 🌑**
