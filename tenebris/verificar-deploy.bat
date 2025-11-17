@echo off
chcp 65001 >nul
cls

echo ═══════════════════════════════════════════════════════════
echo   🌑 TENEBRIS - Verificación Pre-Deploy
echo ═══════════════════════════════════════════════════════════
echo.

echo 📋 Verificando archivos necesarios...
echo.

REM Verificar archivos backend
if exist "backend\server.js" (
    echo ✅ backend\server.js
) else (
    echo ❌ backend\server.js - FALTA
)

if exist "backend\package.json" (
    echo ✅ backend\package.json
) else (
    echo ❌ backend\package.json - FALTA
)

if exist "backend\.env.example" (
    echo ✅ backend\.env.example
) else (
    echo ❌ backend\.env.example - FALTA
)

if exist "backend\render.yaml" (
    echo ✅ backend\render.yaml
) else (
    echo ❌ backend\render.yaml - FALTA
)

echo.

REM Verificar archivos frontend
if exist "frontend\package.json" (
    echo ✅ frontend\package.json
) else (
    echo ❌ frontend\package.json - FALTA
)

if exist "frontend\vite.config.js" (
    echo ✅ frontend\vite.config.js
) else (
    echo ❌ frontend\vite.config.js - FALTA
)

if exist "frontend\.env.production" (
    echo ✅ frontend\.env.production
) else (
    echo ❌ frontend\.env.production - FALTA
)

if exist "frontend\vercel.json" (
    echo ✅ frontend\vercel.json
) else (
    echo ❌ frontend\vercel.json - FALTA
)

echo.

REM Verificar documentación
if exist "DEPLOY-PASO-A-PASO.md" (
    echo ✅ DEPLOY-PASO-A-PASO.md
) else (
    echo ❌ DEPLOY-PASO-A-PASO.md - FALTA
)

if exist "DEPLOY-CHECKLIST.md" (
    echo ✅ DEPLOY-CHECKLIST.md
) else (
    echo ❌ DEPLOY-CHECKLIST.md - FALTA
)

if exist ".gitignore" (
    echo ✅ .gitignore
) else (
    echo ❌ .gitignore - FALTA
)

echo.
echo ═══════════════════════════════════════════════════════════
echo   📝 Checklist Pre-Deploy
echo ═══════════════════════════════════════════════════════════
echo.
echo [ ] Node.js instalado (node --version)
echo [ ] Git instalado (git --version)
echo [ ] Código funciona en local
echo [ ] Cuenta de GitHub creada
echo [ ] Cuenta de MongoDB Atlas lista
echo [ ] 30-45 minutos disponibles
echo.
echo ═══════════════════════════════════════════════════════════
echo   🚀 Próximos Pasos
echo ═══════════════════════════════════════════════════════════
echo.
echo 1. Leer DEPLOY-PASO-A-PASO.md
echo 2. Seguir DEPLOY-CHECKLIST.md
echo 3. Guardar URLs en URLS-IMPORTANTES.txt
echo.
echo ═══════════════════════════════════════════════════════════
echo.

pause
