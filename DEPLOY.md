# 🚀 Guía de Deploy - Tenebris

## Configuración para Producción

### 1️⃣ MongoDB Atlas
Ya tienes configurado:
```
mongodb+srv://tenebris_user:N5Qwwy5LqbjT5MoQ@tenebriscluster.ntubjmj.mongodb.net/tenebris
```

### 2️⃣ Backend en Render

1. **Conecta tu repositorio de GitHub a Render**
2. **Crea un nuevo Web Service**
3. **Configuración:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

4. **Variables de Entorno en Render:**
   ```
   MONGODB_URI=mongodb+srv://tenebris_user:N5Qwwy5LqbjT5MoQ@tenebriscluster.ntubjmj.mongodb.net/tenebris?retryWrites=true&w=majority
   JWT_SECRET=9d8f7a6b5c4e3f2g1h0jklmnopqrstuvxyz123456
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://TU-DOMINIO-VERCEL.vercel.app
   ```

5. **Después del deploy, copia la URL de Render** (ej: `https://tenebris-7ps9.onrender.com`)

### 3️⃣ Frontend en Vercel

1. **Conecta tu repositorio de GitHub a Vercel**
2. **Configuración:**
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Variables de Entorno en Vercel:**
   ```
   VITE_API_URL=https://TU-URL-DE-RENDER.onrender.com
   ```

4. **Actualiza el archivo `frontend/.env.production`** con tu URL de Render

### 4️⃣ Actualizar URLs Cruzadas

Después de tener ambas URLs:

1. **En Render**, actualiza la variable `FRONTEND_URL` con tu dominio de Vercel
2. **En Vercel**, actualiza `VITE_API_URL` con tu dominio de Render
3. **Redeploy ambos servicios**

### 5️⃣ Verificación

1. **Backend Health Check:**
   ```
   https://TU-URL-RENDER.onrender.com/api/health
   ```
   Debe responder: `{"status":"ok","message":"Tenebris API funcionando"}`

2. **Frontend:**
   Abre tu URL de Vercel y prueba el registro/login

### ⚠️ Notas Importantes

- **Render Free Tier**: El servidor se duerme después de 15 minutos de inactividad. La primera petición puede tardar 30-60 segundos.
- **CORS**: Ya está configurado para aceptar peticiones desde Vercel
- **MongoDB Atlas**: Asegúrate de que la IP `0.0.0.0/0` esté permitida en Network Access
- **Uploads**: En Render free tier, los archivos subidos se borran al reiniciar. Para producción real, usa Cloudinary o AWS S3.

### 🔒 Seguridad

Antes de producción real:
1. Cambia el `JWT_SECRET` por uno más seguro
2. Considera usar variables de entorno secretas
3. Habilita rate limiting más estricto
4. Configura un dominio personalizado

### 📝 Comandos Útiles

**Seed de boards (ejecutar una vez en Render):**
```bash
npm run seed
```

**Ver logs en Render:**
Dashboard → Tu servicio → Logs

**Ver logs en Vercel:**
Dashboard → Tu proyecto → Deployments → Ver logs
