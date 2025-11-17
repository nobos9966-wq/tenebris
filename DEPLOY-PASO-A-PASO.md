# 🚀 Deploy de Tenebris - Guía Paso a Paso

## ⏱️ Tiempo estimado: 30-45 minutos

---

## PASO 1: MongoDB Atlas (Base de Datos) - 10 minutos

### 1. Crear cuenta
- Ir a: https://www.mongodb.com/cloud/atlas/register
- Registrarse con Google (más rápido)

### 2. Crear cluster GRATIS
- Click "Build a Database"
- Seleccionar **M0 FREE** (el primero)
- Región: AWS - US East (N. Virginia)
- Nombre: `tenebris`
- Click "Create"
- ⏳ Esperar 3-5 minutos

### 3. Crear usuario de base de datos
- Click "Database Access" (menú izquierdo)
- Click "Add New Database User"
- Username: `tenebris_user`
- Password: Click "Autogenerate Secure Password"
- **⚠️ COPIAR Y GUARDAR LA CONTRASEÑA**
- Database User Privileges: "Read and write to any database"
- Click "Add User"

### 4. Permitir acceso desde cualquier IP
- Click "Network Access" (menú izquierdo)
- Click "Add IP Address"
- Click "Allow Access from Anywhere"
- Confirmar

### 5. Obtener cadena de conexión
- Click "Database" (menú izquierdo)
- Click "Connect" en tu cluster
- Click "Connect your application"
- Copiar la cadena (se ve así):
  ```
  mongodb+srv://tenebris_user:<password>@tenebris.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- Reemplazar `<password>` con la contraseña que copiaste
- Agregar `/tenebris` antes del `?`:
  ```
  mongodb+srv://tenebris_user:TU_PASSWORD@tenebris.xxxxx.mongodb.net/tenebris?retryWrites=true&w=majority
  ```
- **⚠️ GUARDAR ESTA CADENA COMPLETA**

---

## PASO 2: Subir a GitHub - 5 minutos

### 1. Crear repositorio en GitHub
- Ir a: https://github.com/new
- Nombre: `tenebris`
- Descripción: "Foro anónimo moderno estilo 4chan"
- Público o Privado (tu elección)
- **NO** marcar "Add a README file"
- Click "Create repository"

### 2. Subir tu código
Abrir terminal en la carpeta `tenebris` y ejecutar:

```bash
git init
git add .
git commit -m "Initial commit - Tenebris"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/tenebris.git
git push -u origin main
```

Reemplazar `TU_USUARIO` con tu usuario de GitHub.

---

## PASO 3: Deploy Backend en Render - 10 minutos

### 1. Crear cuenta en Render
- Ir a: https://render.com
- Click "Get Started for Free"
- Registrarse con GitHub (recomendado)
- Autorizar acceso a tus repositorios

### 2. Crear Web Service
- En Dashboard, click "New +" → "Web Service"
- Buscar y seleccionar tu repositorio `tenebris`
- Click "Connect"

### 3. Configurar servicio
Llenar el formulario:

- **Name:** `tenebris-backend`
- **Region:** Oregon (US West)
- **Root Directory:** `backend`
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

### 4. Variables de entorno
Click "Advanced" → Agregar estas variables:

```
MONGODB_URI
Pegar tu cadena de MongoDB Atlas completa

JWT_SECRET
tenebris_super_secreto_cambiar_en_produccion_12345

PORT
10000

NODE_ENV
production

FRONTEND_URL
https://tenebris.vercel.app
```

**⚠️ IMPORTANTE:** Reemplazar `MONGODB_URI` con tu cadena real de MongoDB Atlas.

### 5. Deploy
- Click "Create Web Service"
- ⏳ Esperar 5-10 minutos (primera vez)
- Cuando termine, verás "Live" en verde
- **⚠️ COPIAR LA URL** (ejemplo: `https://tenebris-backend.onrender.com`)

### 6. Seed de datos iniciales
- En tu servicio de Render, click "Shell" (arriba a la derecha)
- Ejecutar:
  ```bash
  npm run seed
  ```
- Deberías ver: "✅ 6 boards creados"

### 7. Verificar que funciona
Abrir en navegador:
```
https://tenebris-backend.onrender.com/api/health
```

Deberías ver:
```json
{"status":"ok","message":"Tenebris API funcionando"}
```

---

## PASO 4: Deploy Frontend en Vercel - 10 minutos

### 1. Actualizar URL del backend
Editar el archivo `tenebris/frontend/.env.production`:

```env
VITE_API_URL=https://tenebris-backend.onrender.com
```

Reemplazar con tu URL real de Render.

### 2. Guardar cambios en GitHub
```bash
git add .
git commit -m "Add production config"
git push
```

### 3. Crear cuenta en Vercel
- Ir a: https://vercel.com/signup
- Registrarse con GitHub
- Autorizar acceso

### 4. Importar proyecto
- En Dashboard, click "Add New..." → "Project"
- Buscar y seleccionar tu repositorio `tenebris`
- Click "Import"

### 5. Configurar proyecto
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` (ya viene por defecto)
- **Output Directory:** `dist` (ya viene por defecto)

### 6. Variables de entorno
Click "Environment Variables":

```
VITE_API_URL
https://tenebris-backend.onrender.com
```

Reemplazar con tu URL real de Render.

### 7. Deploy
- Click "Deploy"
- ⏳ Esperar 2-3 minutos
- Cuando termine, verás "Congratulations!"
- **⚠️ COPIAR LA URL** (ejemplo: `https://tenebris.vercel.app`)

---

## PASO 5: Actualizar CORS en Backend - 5 minutos

### 1. Actualizar variable de entorno
- Ir a Render Dashboard
- Click en tu servicio `tenebris-backend`
- Click "Environment"
- Editar `FRONTEND_URL` con tu URL real de Vercel
- Click "Save Changes"
- El servicio se reiniciará automáticamente (1-2 minutos)

---

## PASO 6: Probar tu Tenebris en Internet 🎉

### 1. Abrir tu sitio
Ir a tu URL de Vercel (ejemplo: `https://tenebris.vercel.app`)

### 2. Registrar primera cuenta
- Click "Regístrate"
- Usuario: `admin`
- Contraseña: `admin123`
- Email: (opcional)
- Click "Registrarse"

### 3. Probar funcionalidades
- ✅ Ver mensaje de bienvenida
- ✅ Seleccionar tipo de contenido
- ✅ Ver boards
- ✅ Crear un post de prueba
- ✅ Dar upvote
- ✅ Responder a un post
- ✅ Buscar usuarios
- ✅ Enviar mensaje de chat

### 4. Convertir tu usuario en admin
- Ir a MongoDB Atlas
- Click "Database" → "Browse Collections"
- Seleccionar base de datos `tenebris`
- Seleccionar colección `users`
- Buscar tu usuario
- Click "Edit Document"
- Cambiar `"role": "user"` por `"role": "admin"`
- Click "Update"
- Recargar tu sitio
- Ahora verás el ícono de escudo en la navbar
- Click para acceder al panel de admin

---

## 🎉 ¡LISTO! Tu Tenebris está en Internet

### URLs finales:
- **Frontend:** https://tenebris.vercel.app (tu URL real)
- **Backend:** https://tenebris-backend.onrender.com (tu URL real)
- **Base de datos:** MongoDB Atlas (en la nube)

### Compartir con otros:
Solo comparte tu URL de Vercel. Los usuarios pueden:
- Registrarse
- Crear posts
- Subir imágenes y videos
- Chatear en tiempo real
- Todo funciona 100% online

---

## ⚠️ Importante sobre el plan gratuito

### Render (Backend)
- **Se duerme después de 15 minutos sin uso**
- La primera carga puede tardar 30-60 segundos
- Después funciona normal
- 750 horas/mes gratis (suficiente para 1 proyecto)

### Solución: Mantener despierto (opcional)
1. Ir a: https://uptimerobot.com
2. Crear cuenta gratis
3. Click "Add New Monitor"
4. Monitor Type: HTTP(s)
5. Friendly Name: `Tenebris Backend`
6. URL: Tu URL de Render + `/api/health`
7. Monitoring Interval: 5 minutes
8. Click "Create Monitor"

Esto hará ping cada 5 minutos y mantendrá tu backend despierto.

---

## 🔧 Solución de Problemas

### Backend no responde
1. Ir a Render Dashboard → Tu servicio → "Logs"
2. Verificar errores
3. Verificar que MongoDB esté conectado
4. Verificar variables de entorno

### Frontend no conecta con backend
1. Verificar `VITE_API_URL` en Vercel
2. Verificar `FRONTEND_URL` en Render
3. Abrir consola del navegador (F12) y ver errores

### MongoDB no conecta
1. Verificar que la IP 0.0.0.0/0 esté permitida
2. Verificar usuario y contraseña
3. Verificar que la cadena tenga `/tenebris` antes del `?`

### Chat no funciona
1. Verificar que backend esté corriendo
2. Verificar que Socket.io esté conectado (ver consola del navegador)
3. Verificar CORS en backend

---

## 📊 Resumen de Costos

| Servicio | Costo | Límites |
|----------|-------|---------|
| MongoDB Atlas | $0/mes | 512MB |
| Render | $0/mes | 750h/mes |
| Vercel | $0/mes | 100GB/mes |
| **TOTAL** | **$0/mes** | ✅ Gratis para siempre |

---

## 🚀 Próximos Pasos (Opcional)

### Dominio personalizado
1. Comprar dominio en Namecheap, GoDaddy, etc.
2. En Vercel: Settings → Domains → Add
3. Seguir instrucciones de DNS

### Mejorar rendimiento
- Activar UptimeRobot para mantener backend despierto
- Configurar CDN para archivos grandes
- Optimizar imágenes antes de subir

### Agregar funcionalidades
- Notificaciones push
- Búsqueda avanzada
- Hashtags
- Menciones @usuario
- Modo claro/oscuro

---

## ✅ Checklist Final

- [ ] MongoDB Atlas configurado
- [ ] Usuario de base de datos creado
- [ ] Cadena de conexión guardada
- [ ] Código subido a GitHub
- [ ] Backend deployado en Render
- [ ] Variables de entorno configuradas
- [ ] Seed ejecutado
- [ ] Frontend deployado en Vercel
- [ ] CORS actualizado
- [ ] Sitio probado y funcionando
- [ ] Usuario admin creado
- [ ] URLs guardadas
- [ ] ¡Compartido con amigos! 🎉

---

**¡Felicidades! Tu Tenebris está 100% online y funcionando. 🌑**

*Cualquier problema, revisar los logs en Render y la consola del navegador.*
