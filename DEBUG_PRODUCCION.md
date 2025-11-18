# 🐛 Debugging en Producción - Tenebris

## Problemas Comunes y Soluciones

### 1. Error al Iniciar Sesión

#### ✅ Cambios Aplicados:
- **URL de API corregida**: Ahora incluye `/api` al final
- **Timeout aumentado**: 30 segundos para Render free tier
- **Mejor manejo de errores**: Logs en consola del navegador
- **Validación de campos**: Antes de enviar la petición

#### 🔍 Cómo Debuggear:

**En el Frontend (Vercel):**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network"
3. Intenta hacer login
4. Busca la petición a `/auth/login`
5. Verifica:
   - ✅ URL completa: `https://tenebris-7ps9.onrender.com/api/auth/login`
   - ✅ Status: Debe ser 200 (éxito) o 401/400 (credenciales)
   - ✅ Headers: Debe tener `Access-Control-Allow-Origin`
   - ✅ Response: Debe tener `{success: true, token: "...", user: {...}}`

**En el Backend (Render):**
1. Ve a tu dashboard de Render
2. Selecciona tu servicio "tenebris-backend"
3. Ve a "Logs"
4. Busca errores como:
   - `❌ Error MongoDB:` → Problema de conexión a MongoDB Atlas
   - `Error al iniciar sesión` → Error en la ruta de login
   - `CORS` → Problema de CORS

### 2. Verificar Variables de Entorno

#### En Render:
```
MONGODB_URI=mongodb+srv://tenebris_user:N5Qwwy5LqbjT5MoQ@tenebriscluster.ntubjmj.mongodb.net/tenebris?retryWrites=true&w=majority
JWT_SECRET=9d8f7a6b5c4e3f2g1h0jklmnopqrstuvxyz123456
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://TU-DOMINIO-VERCEL.vercel.app
```

#### En Vercel:
```
VITE_API_URL=https://tenebris-7ps9.onrender.com/api
```

### 3. Errores Comunes

#### Error: "Network Error" o "Timeout"
**Causa**: Render free tier se duerme después de 15 minutos
**Solución**: 
- Espera 30-60 segundos en la primera petición
- El servidor se está despertando
- Intenta de nuevo

#### Error: "CORS header missing"
**Causa**: Backend no está enviando headers CORS
**Solución**: Ya está arreglado en `server.js`
- CORS configurado ANTES de helmet
- `app.options('*')` maneja preflight
- Verifica que `FRONTEND_URL` esté correcta en Render

#### Error: "Credenciales inválidas"
**Causa**: Usuario o contraseña incorrectos
**Solución**:
- Verifica que el usuario exista en MongoDB
- Prueba crear un nuevo usuario
- Ejecuta el seed: `npm run seed` en Render

#### Error: "Usuario ya existe"
**Causa**: Intentando registrar un usuario que ya existe
**Solución**: Usa otro nombre de usuario

### 4. Probar el Backend Directamente

Usa curl o Postman para probar:

```bash
# Health check
curl https://tenebris-7ps9.onrender.com/api/health

# Registro
curl -X POST https://tenebris-7ps9.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'

# Login
curl -X POST https://tenebris-7ps9.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

### 5. Verificar MongoDB Atlas

1. Ve a MongoDB Atlas dashboard
2. Verifica que el cluster esté activo
3. Ve a "Network Access"
4. Asegúrate de que `0.0.0.0/0` esté permitido
5. Ve a "Database Access"
6. Verifica que el usuario `tenebris_user` exista

### 6. Logs en Consola del Navegador

Ahora verás logs útiles:
```
Intentando login con: {username: "testuser"}
Login exitoso: {success: true, token: "...", user: {...}}
```

O en caso de error:
```
Error en login: {response: {data: {error: "Credenciales inválidas"}}}
```

### 7. Redeploy Después de Cambios

**Vercel (Frontend):**
- Los cambios se autodeploy al hacer push a GitHub
- O manualmente: Dashboard → Deployments → Redeploy

**Render (Backend):**
- Los cambios se autodeploy al hacer push a GitHub
- O manualmente: Dashboard → Manual Deploy → Deploy latest commit

### 8. Checklist de Verificación

- [ ] Backend responde en `/api/health`
- [ ] Variables de entorno configuradas en Render
- [ ] Variables de entorno configuradas en Vercel
- [ ] MongoDB Atlas permite conexiones desde cualquier IP
- [ ] CORS configurado correctamente
- [ ] URL de API en frontend incluye `/api`
- [ ] Logs del backend no muestran errores
- [ ] Consola del navegador no muestra errores de red

### 9. Si Nada Funciona

1. **Verifica la URL de Render**: Puede haber cambiado
2. **Actualiza `.env.production`** con la nueva URL
3. **Redeploy Vercel** después de cambiar variables
4. **Espera 2-3 minutos** después del deploy
5. **Limpia caché del navegador** (Ctrl + Shift + R)
6. **Prueba en modo incógnito**

### 10. Contacto de Emergencia

Si sigues teniendo problemas:
1. Revisa los logs de Render
2. Revisa la consola del navegador
3. Copia el error exacto
4. Verifica que todas las URLs sean correctas
