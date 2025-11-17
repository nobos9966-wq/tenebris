@echo off
echo ========================================
echo    TENEBRIS - Inicio Rapido
echo ========================================
echo.

echo [1/3] Verificando instalacion...
cd backend
if not exist "node_modules" (
    echo Instalando dependencias del backend...
    call npm install
)

cd ..\frontend
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    call npm install
)

echo.
echo [2/3] Verificando configuracion...
cd ..\backend
if not exist ".env" (
    echo Creando archivo .env...
    copy .env.example .env
    echo.
    echo IMPORTANTE: Edita backend\.env con tu configuracion de MongoDB
    echo Presiona cualquier tecla cuando hayas configurado .env...
    pause > nul
)

echo.
echo [3/3] Iniciando servidores...
echo.
echo Abriendo Backend en nueva ventana...
start "Tenebris Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 > nul

echo Abriendo Frontend en nueva ventana...
start "Tenebris Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo    Servidores iniciados!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
