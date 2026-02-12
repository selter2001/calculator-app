# 🎨 WYGLĄD INTERFEJSU

## Ekran powitalny

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║                  ⚡  KALKULATOR PRO  ⚡                       ║
║                                                               ║
║            Obsługa nieskończenie dużych liczb                 ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Wpisz "pomoc" aby zobaczyć dostępne polecenia
```

## Główny interfejs

```
╭─[kalkulator]
╰─➤ 2 + 2

┌─────────────────────────────────────────────────────────────
│  4
└─────────────────────────────────────────────────────────────

╭─[kalkulator]
╰─➤ 
```

## Przykłady obliczeń

### Proste dodawanie
```
╭─[kalkulator]
╰─➤ 5 + 3

┌─────────────────────────────────────────────────────────────
│  8
└─────────────────────────────────────────────────────────────
```

### Złożone wyrażenie
```
╭─[kalkulator]
╰─➤ (100 + 50) * 2 - 10

┌─────────────────────────────────────────────────────────────
│  290
└─────────────────────────────────────────────────────────────
```

### Bardzo duże liczby
```
╭─[kalkulator]
╰─➤ 2^100

┌─────────────────────────────────────────────────────────────
│  1267650600228229401496703205376
└─────────────────────────────────────────────────────────────
```

### Mnożenie gigantycznych liczb
```
╭─[kalkulator]
╰─➤ 999999999999 * 888888888888

┌─────────────────────────────────────────────────────────────
│  888888888887111111111112
└─────────────────────────────────────────────────────────────
```

## Menu pomocy

```
╭─[kalkulator]
╰─➤ pomoc

  📖 INSTRUKCJA

  OPERATORY:
    +  dodawanie          (np. 5 + 3)
    -  odejmowanie        (np. 10 - 4)
    *  mnożenie           (np. 7 * 8)
    /  dzielenie          (np. 20 / 4)
    ^  potęgowanie        (np. 2^10)
    %  modulo (reszta)    (np. 17 % 5)
  ( )  nawiasy            (np. (5+3)*2)

  POLECENIA:
    historia  - wyświetl historię obliczeń
    czyść     - wyczyść ekran i historię
    pomoc     - wyświetl tę pomoc
    exit      - wyjdź z programu

  PRZYKŁADY:
    2 + 2
    (5 + 3) * 2
    2^100
    999999999999 * 888888888888
```

## Historia obliczeń

```
╭─[kalkulator]
╰─➤ historia

  📜 HISTORIA OBLICZEŃ

    1. 2 + 2 = 4
    2. (5 + 3) * 2 = 16
    3. 2^10 = 1024
    4. 100 / 4 = 25
    5. 17 % 5 = 2
```

## Obsługa błędów

### Dzielenie przez zero
```
╭─[kalkulator]
╰─➤ 10 / 0

  ✖ Błąd: Dzielenie przez zero
```

### Nieprawidłowe wyrażenie
```
╭─[kalkulator]
╰─➤ 2 + + 3

  ✖ Błąd: Nieprawidłowe wyrażenie matematyczne
```

### Niezbalansowane nawiasy
```
╭─[kalkulator]
╰─➤ (5 + 3 * 2

  ✖ Błąd: Niezbalansowane nawiasy
```

## Wyjście z programu

```
╭─[kalkulator]
╰─➤ exit

  👋 Do zobaczenia!
```

## Schemat kolorów

- 🔵 **Niebieski** - Prompt i ramki
- 🟢 **Zielony** - Wyniki obliczeń
- 🟡 **Żółty** - Nagłówki i tytuły
- 🔴 **Czerwony** - Błędy
- ⚫ **Szary** - Teksty pomocnicze
- 🟦 **Cyan** - Akcenty i dekoracje

## Cechy interfejsu

✅ **Minimalistyczny** - Żadnych zbędnych elementów
✅ **Czytelny** - Wyraźne oddzielenie wyników
✅ **Kolorowy** - Przyjemny dla oka
✅ **Unicode** - Piękne ramki i symbole
✅ **Responsywny** - Natychmiastowe odpowiedzi
✅ **Intuicyjny** - Łatwy w użyciu

## Skróty klawiszowe

- **Enter** - Wykonaj obliczenie
- **Ctrl+C** - Wyjdź z programu
- **Strzałka w górę/dół** - Historia poleceń (wbudowane w terminal)

---

**Przyjemny design + potężne obliczenia = Kalkulator PRO! 🎨🧮**
