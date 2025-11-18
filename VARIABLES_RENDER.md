# 🔐 Variables de Entorno para Render

## Configuración en Render Dashboard

Ve a: **Dashboard → tenebris-backend → Environment**

Agrega estas variables:

```env
MONGODB_URI=mongodb+srv://tenebris_user:N5Qwwy5LqbjT5MoQ@tenebriscluster.ntubjmj.mongodb.net/tenebris?retryWrites=true&w=majority

JWT_SECRET=9d8f7a6b5c4e3f2g1h0jklmnopqrstuvxyz123456

NODE_ENV=production

PORT=10000

FRONTEND_URL=https://tenebris-sbld.vercel.app

MAX_IMAGE_SIZE=10

MAX_VIDEO_SIZE=500
```

---

## ⚠️ Importante

1. **Después de agregar/cambiar variables**, haz clic en **"Save Changes"**
2. El servicio se redespleará automáticamente
3. Espera 2-3 minutos para que el deploy termine

---

## 🔒 Seguridad

Para producción real, considera:
- Cambiar el `JWT_SECRET` por uno más seguro y aleatorio
- Usar variables secretas en Render (están encriptadas)
- No compartir estas credenciales públicamente

---

## ✅ Verificación

Después de configurar, verifica que funcione:

```bash
curl https://tenebris-4.onrender.com/api/health
```

Debe responder:
```json
{"status":"ok","message":"Tenebris API funcionando"}
```
