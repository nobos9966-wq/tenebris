# 🌐 URLs de Producción - Tenebris

## URLs Configuradas

### Frontend (Vercel)
```
https://tenebris-sbld.vercel.app
```

### Backend (Render)
```
https://tenebris-4.onrender.com
```

### API Endpoint
```
https://tenebris-4.onrender.com/api
```

---

## ✅ Configuración Completa

### 1. Variables de Entorno en Render (Backend)

Ve a tu dashboard de Render → tenebris-backend → Environment

```env
MONGODB_URI=mongodb+srv://tenebris_user:N5Qwwy5LqbjT5MoQ@tenebriscluster.ntubjmj.mongodb.net/tenebris?retryWrites=true&w=majority
JWT_SECRET=9d8f7a6b5c4e3f2g1h0jklmnopqrstuvxyz123456
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://tenebris-sbld.vercel.app
```

**IMPORTANTE**: Después de agregar/cambiar variables, haz clic en "Save Changes" y el servicio se redespleará automáticamente.

### 2. Variables de Entorno en Vercel (Frontend)

Ve a tu dashboard de Vercel → tenebris-frontend → Settings → Environment Variables

```env
VITE_API_URL=https://tenebris-4.onrender.com/api
```

**IMPORTANTE**: Después de agregar/cambiar variables, ve a Deployments → Redeploy (con "Use existing Build Cache" desmarcado).

---

## 🧪 Pruebas

### 1. Verificar Backend
Abre en tu navegador:
```
https://tenebris-4.onrender.com/api/health
```

Debe responder:
```json
{"status":"ok","message":"Tenebris API funcionando"}
```

⚠️ **Nota**: Si el backend está dormido (Render free tier), la primera petición tardará 30-60 segundos.

### 2. Verificar Frontend
Abre en tu navegador:
```
https://tenebris-sbld.vercel.app
```

Deberías ver la página de login.

### 3. Probar Login/Registro

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Intenta registrarte o hacer login
4. Verás logs como:
   ```
   Intentando login con: {username: "testuser"}
   Login exitoso: {success: true, token: "...", user: {...}}
   ```

### 4. Verificar CORS

En la consola del navegador, ve a la pestaña "Network":
1. Intenta hacer login
2. Busca la petición a `auth/login`
3. Verifica que:
   - Status: 200 (éxito)
   - Response Headers incluya: `Access-Control-Allow-Origin: https://tenebris-sbld.vercel.app`

---

## 🔧 Comandos Útiles

### Probar Backend con curl

```bash
# Health check
curl https://tenebris-4.onrender.com/api/health

# Registro
curl -X POST https://tenebris-4.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'

# Login
curl -X POST https://tenebris-4.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

---

## 📝 Checklist de Deploy

- [ ] Backend deployado en Render
- [ ] Frontend deployado en Vercel
- [ ] Variables de entorno configuradas en Render
- [ ] Variables de entorno configuradas en Vercel
- [ ] `/api/health` responde correctamente
- [ ] Frontend carga sin errores
- [ ] Login/Registro funciona
- [ ] MongoDB Atlas permite conexiones desde 0.0.0.0/0
- [ ] CORS configurado correctamente

---

## 🚨 Si Algo No Funciona

1. **Verifica los logs de Render**:
   - Dashboard → tenebris-backend → Logs
   - Busca errores de MongoDB, CORS, o rutas

2. **Verifica la consola del navegador**:
   - F12 → Console
   - Busca errores de red o CORS

3. **Verifica las variables de entorno**:
   - Render: Dashboard → Environment
   - Vercel: Settings → Environment Variables

4. **Redeploy si es necesario**:
   - Render: Manual Deploy → Deploy latest commit
   - Vercel: Deployments → Redeploy

5. **Limpia caché**:
   - Navegador: Ctrl + Shift + R
   - O prueba en modo incógnito

---

## 📞 Debugging Avanzado

Si sigues teniendo problemas, revisa:
- `DEBUG_PRODUCCION.md` - Guía completa de debugging
- `DEPLOY.md` - Guía de deploy paso a paso
