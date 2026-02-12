@echo off
echo.
echo ========================================
echo   KALKULATOR PRO - Uruchamianie...
echo ========================================
echo.

REM Sprawdzanie czy Node.js jest zainstalowany
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [BLAD] Node.js nie jest zainstalowany!
    echo.
    echo Pobierz Node.js z: https://nodejs.org
    echo.
    pause
    exit /b 1
)

REM Uruchomienie kalkulatora
node dist\index.js

pause
