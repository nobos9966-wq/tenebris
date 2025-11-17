# ✅ Checklist de Deploy - Tenebris

## Antes de empezar

- [ ] Tengo cuenta de GitHub
- [ ] Mi código funciona en local
- [ ] Tengo 30-45 minutos disponibles

---

## PASO 1: MongoDB Atlas ⏱️ 10 min

- [ ] Crear cuenta en https://www.mongodb.com/cloud/atlas/register
- [ ] Crear cluster M0 FREE
- [ ] Crear usuario `tenebris_user` con contraseña
- [ ] Permitir acceso desde 0.0.0.0/0
- [ ] Copiar cadena de conexión
- [ ] Agregar `/tenebris` antes del `?`
- [ ] Guardar cadena completa

**Cadena guardada:**
```
mongodb+srv://tenebris_user:PASSWORD@cluster.xxxxx.mongodb.net/tenebris?retryWrites=true&w=majority
```

---

## PASO 2: GitHub ⏱️ 5 min

- [ ] Crear repositorio en https://github.com/new
- [ ] Nombre: `tenebris`
- [ ] Ejecutar comandos:

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

## PASO 3: Render (Backend) ⏱️ 10 min

- [ ] Crear cuenta en https://render.com con GitHub
- [ ] New + → Web Service
- [ ] Conectar repositorio `tenebris`
- [ ] Configurar:
  - Name: `tenebris-backend`
  - Root Directory: `backend`
  - Build: `npm install`
  - Start: `npm start`
  - Plan: Free

- [ ] Variables de entorno:
  ```
  MONGODB_URI = [tu cadena de MongoDB]
  JWT_SECRET = tenebris_super_secreto_12345
  PORT = 10000
  NODE_ENV = production
  FRONTEND_URL = https://tenebris.vercel.app
  ```

- [ ] Click "Create Web Service"
- [ ] Esperar deploy (5-10 min)
- [ ] Copiar URL: `https://tenebris-backend.onrender.com`
- [ ] Abrir Shell y ejecutar: `npm run seed`
- [ ] Verificar: abrir `/api/health` en navegador

**URL Backend:**
```
https://tenebris-backend.onrender.com
```

---

## PASO 4: Vercel (Frontend) ⏱️ 10 min

- [ ] Editar `frontend/.env.production`:
  ```
  VITE_API_URL=https://tenebris-backend.onrender.com
  ```

- [ ] Guardar en GitHub:
  ```bash
  git add .
  git commit -m "Add production config"
  git push
  ```

- [ ] Crear cuenta en https://vercel.com/signup con GitHub
- [ ] Add New → Project
- [ ] Importar repositorio `tenebris`
- [ ] Configurar:
  - Framework: Vite
  - Root Directory: `frontend`
  - Build: `npm run build`
  - Output: `dist`

- [ ] Variable de entorno:
  ```
  VITE_API_URL = https://tenebris-backend.onrender.com
  ```

- [ ] Click "Deploy"
- [ ] Esperar (2-3 min)
- [ ] Copiar URL: `https://tenebris.vercel.app`

**URL Frontend:**
```
https://tenebris.vercel.app
```

---

## PASO 5: Actualizar CORS ⏱️ 2 min

- [ ] Ir a Render → tu servicio
- [ ] Environment → Editar `FRONTEND_URL`
- [ ] Poner tu URL real de Vercel
- [ ] Save Changes
- [ ] Esperar reinicio (1-2 min)

---

## PASO 6: Probar 🎉

- [ ] Abrir tu URL de Vercel
- [ ] Registrar usuario
- [ ] Ver mensaje de bienvenida
- [ ] Crear un post
- [ ] Dar upvote
- [ ] Enviar mensaje de chat
- [ ] ¡Funciona! 🎉

---

## PASO 7: Crear Admin (Opcional)

- [ ] Ir a MongoDB Atlas
- [ ] Database → Browse Collections
- [ ] Base de datos: `tenebris`
- [ ] Colección: `users`
- [ ] Buscar tu usuario
- [ ] Edit Document
- [ ] Cambiar `"role": "user"` por `"role": "admin"`
- [ ] Update
- [ ] Recargar sitio
- [ ] Ver ícono de escudo
- [ ] Acceder a /admin

---

## 🎉 ¡COMPLETADO!

### Mis URLs:
- **Frontend:** ___________________________
- **Backend:** ___________________________

### Compartir:
Solo comparte tu URL de Frontend con tus amigos.

---

## ⚠️ Nota sobre Render Gratis

El backend se duerme después de 15 min sin uso.
Primera carga puede tardar 30-60 segundos.

**Solución:** Usar UptimeRobot (gratis)
1. https://uptimerobot.com
2. Add Monitor → HTTP(s)
3. URL: tu backend + `/api/health`
4. Interval: 5 minutes

---

## 🆘 Problemas?

### Backend no responde
- Ver logs en Render Dashboard
- Verificar variables de entorno
- Verificar MongoDB conectado

### Frontend no conecta
- Verificar VITE_API_URL en Vercel
- Verificar FRONTEND_URL en Render
- Ver consola del navegador (F12)

### Chat no funciona
- Verificar que backend esté despierto
- Verificar Socket.io en consola
- Esperar 30-60 seg si backend estaba dormido

---

**¡Tu Tenebris está 100% online! 🌑**
