# 🔧 Solución Error de Registro

## 🎯 Pasos para Arreglar:

### 1. **Haz commit y push de los cambios**:
```bash
git add .
git commit -m "Fix: Agregar página de test de conexión"
git push
```

### 2. **Espera 2-3 minutos** para que Vercel redeploy

### 3. **Abre la página de test**:
```
https://tenebris-sbld.vercel.app/test
```

Esta página te mostrará:
- ✅ Si la URL de API está configurada
- ✅ Si el backend responde
- ✅ Si el registro funciona
- ✅ Errores exactos si hay problemas

### 4. **Prueba los botones**:

#### Botón 1: "Probar /api/health"
- Debe responder: `{"status":"ok","message":"Tenebris API funcionando"}`
- Si falla, el backend no está respondiendo

#### Botón 2: "Probar Registro"
- Debe crear un usuario de prueba
- Si falla, verás el error exacto

---

## 🔍 Posibles Errores y Soluciones:

### Error 1: "API URL: NO CONFIGURADA"
**Problema**: Vercel no está leyendo las variables de entorno

**Solución**:
1. Ve a Vercel Dashboard → Settings → Environment Variables
2. Agrega:
   ```
   VITE_API_URL = https://tenebris-4.onrender.com/api
   ```
3. Marca los 3 ambientes (Production, Preview, Development)
4. Redeploy sin cache

---

### Error 2: "Network Error" o "Timeout"
**Problema**: El backend de Render está dormido (free tier)

**Solución**:
1. Abre primero: `https://tenebris-4.onrender.com/api/health`
2. Espera 30-60 segundos (el servidor se está despertando)
3. Vuelve a intentar el registro

---

### Error 3: "CORS header missing"
**Problema**: CORS no está configurado correctamente en Render

**Solución**:
1. Ve a Render Dashboard → tenebris-backend → Environment
2. Verifica que exista:
   ```
   FRONTEND_URL = https://tenebris-sbld.vercel.app
   ```
3. Si no existe, agrégala
4. Guarda y espera el redeploy (2-3 minutos)

---

### Error 4: "Usuario ya existe"
**Problema**: Intentas registrar un usuario que ya existe

**Solución**:
- Usa otro nombre de usuario
- O usa el botón "Probar Registro" que genera usuarios únicos

---

### Error 5: "Error de conexión"
**Problema**: La URL del backend está mal

**Solución**:
1. Verifica en la página /test que la URL sea:
   ```
   https://tenebris-4.onrender.com/api
   ```
2. Si es diferente, actualiza el archivo `frontend/.env`:
   ```
   VITE_API_URL=https://tenebris-4.onrender.com/api
   ```
3. Haz commit y push

---

## 📋 Checklist de Verificación:

- [ ] Backend responde en: `https://tenebris-4.onrender.com/api/health`
- [ ] Variable `VITE_API_URL` configurada en Vercel
- [ ] Variable `FRONTEND_URL` configurada en Render
- [ ] Página /test muestra la URL correcta
- [ ] Botón "Probar /api/health" funciona
- [ ] Botón "Probar Registro" funciona

---

## 🚀 Después de Arreglar:

1. Ve a: `https://tenebris-sbld.vercel.app/register`
2. Registra un usuario nuevo
3. Deberías ver:
   ```
   ✅ Registro exitoso
   ¡Bienvenido a Tenebris, [tu_usuario]!
   ```
4. Serás redirigido a Home automáticamente

---

## 📞 Si Sigue Sin Funcionar:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Copia TODO lo que aparezca
4. Ve a la pestaña "Network"
5. Busca la petición "register"
6. Copia la respuesta

Y dime exactamente qué error ves.

---

## 🎯 Acceso Rápido:

- **Página de Test**: https://tenebris-sbld.vercel.app/test
- **Backend Health**: https://tenebris-4.onrender.com/api/health
- **Registro**: https://tenebris-sbld.vercel.app/register
- **Login**: https://tenebris-sbld.vercel.app/login
