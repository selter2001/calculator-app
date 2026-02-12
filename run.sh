#!/bin/bash

echo ""
echo "========================================"
echo "  KALKULATOR PRO - Uruchamianie..."
echo "========================================"
echo ""

# Sprawdzanie czy Node.js jest zainstalowany
if ! command -v node &> /dev/null
then
    echo "[BŁĄD] Node.js nie jest zainstalowany!"
    echo ""
    echo "Pobierz Node.js z: https://nodejs.org"
    echo ""
    exit 1
fi

# Uruchomienie kalkulatora
node dist/index.js
