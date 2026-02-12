# 🚀 SZYBKI START

## Krok 1: Rozpakuj pliki
```bash
# Upewnij się, że jesteś w katalogu calculator-app
cd calculator-app
```

## Krok 2: Sprawdź wymagania
```bash
# Sprawdź czy masz Node.js (wymagana wersja 14+)
node -v

# Jeśli nie masz Node.js, pobierz go z: https://nodejs.org
```

## Krok 3: Uruchom kalkulator
```bash
# Kalkulator jest już skompilowany, więc po prostu uruchom:
npm start

# LUB bezpośrednio:
node dist/index.js
```

## Krok 4: Zacznij obliczać! 🎉

Po uruchomieniu zobaczysz:
```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║                  ⚡  KALKULATOR PRO  ⚡                       ║
║                                                               ║
║            Obsługa nieskończenie dużych liczb                 ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Wpisz "pomoc" aby zobaczyć dostępne polecenia

╭─[kalkulator]
╰─➤ 
```

### Pierwsze obliczenia
```
2 + 2
(5 + 3) * 2
2^100
pomoc
```

## Przydatne polecenia

| Polecenie | Co robi |
|-----------|---------|
| `pomoc` | Pokazuje wszystkie funkcje |
| `historia` | Wyświetla historię obliczeń |
| `czyść` | Czyści ekran i historię |
| `exit` | Wychodzi z programu |

## Jeśli coś nie działa

### Problem: "node: command not found"
**Rozwiązanie**: Zainstaluj Node.js z https://nodejs.org

### Problem: "Cannot find module"
**Rozwiązanie**: 
```bash
cd calculator-app
npm run build
npm start
```

### Problem: Chcę przebudować projekt
**Rozwiązanie**:
```bash
# Zainstaluj TypeScript globalnie
npm install -g typescript

# Przebuduj
npm run build

# Uruchom
npm start
```

## Struktura plików

```
calculator-app/
├── src/
│   └── index.ts          ← Kod źródłowy TypeScript
├── dist/
│   └── index.js          ← Skompilowany JavaScript (gotowy!)
├── README.md             ← Pełna dokumentacja
├── EXAMPLES.md           ← Przykłady użycia
├── QUICK_START.md        ← Ten plik
├── demo.js               ← Skrypt demonstracyjny
├── package.json          ← Konfiguracja projektu
└── tsconfig.json         ← Konfiguracja TypeScript
```

## Co dalej?

1. 📖 Przeczytaj [README.md](README.md) - pełna dokumentacja
2. 📚 Zobacz [EXAMPLES.md](EXAMPLES.md) - dziesiątki przykładów
3. 🎮 Uruchom `node demo.js` - demo możliwości
4. 💻 Zacznij obliczać!

---

**Miłego obliczania! 🧮✨**

Jeśli masz pytania, sprawdź README.md lub po prostu wpisz "pomoc" w kalkulatorze.
