# ❓ FAQ - Często Zadawane Pytania

## Instalacja i uruchomienie

### Q: Czy muszę instalować dodatkowe biblioteki?
**A:** Nie! Aplikacja używa tylko wbudowanych modułów Node.js. Po prostu uruchom `npm start`.

### Q: Jak uruchomić kalkulator?
**A:** 
```bash
cd calculator-app
npm start
```

### Q: Dostaję błąd "tsc: command not found"
**A:** Zainstaluj TypeScript globalnie:
```bash
npm install -g typescript
npm run build
npm start
```

### Q: Czy działa na Windows/Mac/Linux?
**A:** Tak! Aplikacja działa na wszystkich systemach z Node.js.

---

## Funkcjonalność

### Q: Jak duże liczby mogę obliczyć?
**A:** Praktycznie nieograniczone! Możesz obliczać liczby o tysiącach cyfr. Przykład: `2^1000` działa bez problemu.

### Q: Czy kalkulator obsługuje liczby dziesiętne?
**A:** Tak! Możesz używać liczb takich jak `3.14`, `0.5`, `2.718` itp.

### Q: Jakie operatory są dostępne?
**A:** 
- `+` - dodawanie
- `-` - odejmowanie
- `*` - mnożenie
- `/` - dzielenie
- `^` - potęgowanie
- `%` - modulo (reszta z dzielenia)
- `( )` - nawiasy

### Q: Czy mogę używać nawiasów?
**A:** Tak! Możesz zagnieżdżać nawiasy dowolnie głęboko: `((((2+3)*4)+5)*6)`

### Q: Jaka jest kolejność wykonywania operacji?
**A:**
1. Nawiasy `( )`
2. Potęgowanie `^`
3. Mnożenie `*`, dzielenie `/`, modulo `%`
4. Dodawanie `+`, odejmowanie `-`

### Q: Czy spacje mają znaczenie?
**A:** Nie. `2+2`, `2 + 2` i `2  +  2` działają tak samo.

---

## Użytkowanie

### Q: Jak zobaczyć poprzednie obliczenia?
**A:** Wpisz `historia` lub `history`.

### Q: Jak wyczyścić ekran?
**A:** Wpisz `czyść` lub `clear`.

### Q: Jak wyjść z programu?
**A:** Wpisz `exit`, `quit` lub naciśnij `Ctrl+C`.

### Q: Czy mogę używać strzałek do przeglądania historii?
**A:** Tak! Strzałki w górę/dół działają (funkcja terminala).

### Q: Czy obliczenia są zapisywane między sesjami?
**A:** Nie. Historia jest czyśczona po zamknięciu programu.

---

## Przykłady

### Q: Jak obliczyć potęgę?
**A:** Użyj operatora `^`:
```
2^10         → 1024
10^6         → 1000000
2^100        → bardzo duża liczba!
```

### Q: Jak obliczyć resztę z dzielenia?
**A:** Użyj operatora `%`:
```
17 % 5       → 2
100 % 7      → 2
1000 % 9     → 1
```

### Q: Jak obliczyć procent?
**A:** Przykład - 20% z 500:
```
500 * 20 / 100   → 100
```

### Q: Czy mogę obliczyć silnię?
**A:** Nie bezpośrednio, ale możesz mnożyć:
```
1*2*3*4*5*6*7*8*9*10   → 3628800
```

---

## Błędy

### Q: Dostaję "Dzielenie przez zero"
**A:** Nie możesz dzielić przez zero. To jest matematycznie niemożliwe.
```
10 / 0   → Błąd ❌
10 / 1   → 10 ✅
```

### Q: Dostaję "Nieprawidłowe wyrażenie matematyczne"
**A:** Sprawdź czy:
- Używasz tylko dozwolonych znaków: `0-9 + - * / ^ % ( )`
- Nie masz podwójnych operatorów: `2++3` ❌
- Wyrażenie ma sens matematyczny

### Q: Dostaję "Niezbalansowane nawiasy"
**A:** Liczba nawiasów otwierających `(` musi być równa liczbie zamykających `)`:
```
(2+3) * 4    → OK ✅
(2+3 * 4     → Błąd ❌
2+3) * 4     → Błąd ❌
```

### Q: Wynik jest nieprecyzyjny dla liczb dziesiętnych
**A:** JavaScript ma ograniczenia precyzji dla liczb zmiennoprzecinkowych (~15 cyfr). To normalne zachowanie.

---

## Zaawansowane

### Q: Jak działa potęgowanie dla bardzo dużych liczb?
**A:** Kalkulator używa algorytmu szybkiego potęgowania (binary exponentiation), który jest bardzo wydajny.

### Q: Czym różni się BigInt od Number?
**A:**
- **BigInt**: Nieograniczone liczby całkowite, idealne dla 2^100
- **Number**: Liczby zmiennoprzecinkowe, do ~15 cyfr precyzji

Kalkulator automatycznie wybiera odpowiedni typ.

### Q: Czy mogę używać liczb ujemnych?
**A:** Tak!
```
-5 + 10      → 5
-20 * -3     → 60
100 - -50    → 150
```

### Q: Jaki jest maksymalny wykładnik potęgi?
**A:** Praktycznie nieograniczony dla liczb całkowitych. Dla `Number` max to około `10^308`.

### Q: Czy mogę obliczyć pierwiastek?
**A:** Obecnie nie, ale możesz użyć potęgowania ułamkowego:
```
# Pierwiastek kwadratowy z 16
16^0.5       → 4
# Pierwiastek sześcienny z 8
8^(1/3)      → 2
```

---

## Wydajność

### Q: Czy kalkulator jest szybki?
**A:** Tak! Większość obliczeń jest natychmiastowa. Bardzo duże potęgi (np. `2^100000`) mogą zająć kilka sekund.

### Q: Ile pamięci używa?
**A:** Bardzo mało. Typowe obliczenie zajmuje kilka kilobajtów.

### Q: Czy mogę obliczyć faktorial bardzo dużej liczby?
**A:** Możesz mnożyć liczby, ale faktorial `1000!` to ~2500 cyfr. Może zająć chwilę.

---

## Rozwiązywanie problemów

### Q: Kolory nie działają w moim terminalu
**A:** Niektóre stare terminale nie obsługują kolorów ANSI. Spróbuj:
- Windows: Użyj Windows Terminal lub PowerShell Core
- Mac/Linux: Większość terminalów działa out-of-the-box

### Q: Program się zawiesza
**A:** Może to się zdarzyć przy ekstremalnie dużych obliczeniach (np. `10^100000`). Naciśnij `Ctrl+C` aby przerwać.

### Q: Chcę zmodyfikować kod - od czego zacząć?
**A:** 
1. Przeczytaj [TECHNICAL.md](TECHNICAL.md)
2. Zobacz kod w `src/index.ts`
3. Zmodyfikuj i zbuduj: `npm run build`

---

## Wsparcie

### Q: Gdzie mogę zgłosić błąd?
**A:** Możesz:
- Stworzyć issue na GitHub (jeśli projekt tam jest)
- Skontaktować się z autorem
- Samodzielnie naprawić i stworzyć pull request

### Q: Czy mogę używać tego komercyjnie?
**A:** Tak! Licencja MIT pozwala na dowolne użycie, także komercyjne.

### Q: Czy mogę modyfikować kod?
**A:** Oczywiście! Licencja MIT to pozwala. Zobacz [LICENSE](LICENSE).

---

## Inne

### Q: Dlaczego ten kalkulator jest lepszy niż `bc` lub `calc`?
**A:** 
- ✅ Przyjemny, kolorowy interfejs
- ✅ Historia obliczeń
- ✅ Napisany w TypeScript (łatwy do modyfikacji)
- ✅ Obsługa nieskończenie dużych liczb
- ✅ Cross-platform

### Q: Czy planujesz dodać więcej funkcji?
**A:** Projekt jest open-source! Możesz dodać własne funkcje:
- Funkcje trygonometryczne (sin, cos, tan)
- Logarytmy
- Pierwiastki
- Wartość bezwzględna
- Zaokrąglanie
- I wiele innych!

### Q: Czy istnieje wersja GUI?
**A:** Obecnie tylko CLI, ale możesz stworzyć wrapper GUI używając Electron lub podobnego frameworka.

---

## Nie znalazłeś odpowiedzi?

Sprawdź:
- [README.md](README.md) - Główna dokumentacja
- [EXAMPLES.md](EXAMPLES.md) - Dziesiątki przykładów
- [TECHNICAL.md](TECHNICAL.md) - Szczegóły techniczne
- [QUICK_START.md](QUICK_START.md) - Szybki start

Lub po prostu wpisz `pomoc` w kalkulatorze! 🚀
