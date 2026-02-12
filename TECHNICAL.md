# ⚙️ DOKUMENTACJA TECHNICZNA

## Architektura aplikacji

### Główne komponenty

```
┌─────────────────────────────────────────┐
│         CalculatorCLI                   │
│  (Interfejs użytkownika)                │
│  - Obsługa wejścia/wyjścia              │
│  - Kolorowanie terminala                │
│  - Zarządzanie sesją                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Calculator                      │
│  (Logika obliczeniowa)                  │
│  - Parsowanie wyrażeń                   │
│  - Walidacja składni                    │
│  - Obliczenia matematyczne              │
│  - Historia operacji                    │
└─────────────────────────────────────────┘
```

## Klasa Calculator

### Metody publiczne

#### `calculate(expression: string): string`
Główna metoda obliczająca wyrażenie matematyczne.

**Parametry:**
- `expression` - wyrażenie matematyczne jako string

**Zwraca:**
- Wynik obliczeń jako string (może być BigInt lub number)

**Rzuca:**
- `Error` - jeśli wyrażenie jest niepoprawne

**Przykład:**
```typescript
const calc = new Calculator();
const result = calc.calculate("2 + 2"); // "4"
```

#### `getHistory(): Array<{expression: string, result: string}>`
Pobiera historię wszystkich obliczeń.

**Zwraca:**
- Tablica obiektów z wyrażeniami i wynikami

#### `clearHistory(): void`
Czyści historię obliczeń.

### Metody prywatne

#### `isValidExpression(expr: string): boolean`
Waliduje składnię wyrażenia matematycznego.

Sprawdza:
- Czy zawiera tylko dozwolone znaki: `0-9`, `+`, `-`, `*`, `/`, `^`, `%`, `(`, `)`
- Czy nawiasy są zbalansowane

#### `evaluateExpression(expr: string): string`
Ewaluuje wyrażenie z uwzględnieniem kolejności operacji.

**Kolejność operacji:**
1. Nawiasy `( )`
2. Potęgowanie `^`
3. Mnożenie `*`, dzielenie `/`, modulo `%`
4. Dodawanie `+`, odejmowanie `-`

#### `calculateOperations(expr: string, operators: string[]): string`
Oblicza operacje o tym samym priorytecie.

#### `calculateBigInt(num1: string, operator: string, num2: string): string`
Wykonuje operacje na bardzo dużych liczbach całkowitych (BigInt).

#### `calculateFloat(num1: string, operator: string, num2: string): string`
Wykonuje operacje na liczbach zmiennoprzecinkowych.

#### `bigIntPow(base: bigint, exponent: bigint): bigint`
Szybkie potęgowanie dla BigInt (algorytm binary exponentiation).

## Klasa CalculatorCLI

### Metody publiczne

#### `start(): void`
Uruchamia interaktywny interfejs kalkulatora.

### Metody prywatne

#### `showWelcome(): void`
Wyświetla ekran powitalny.

#### `showHelp(): void`
Wyświetla pomoc z dostępnymi operatorami i poleceniami.

#### `showHistory(): void`
Wyświetla historię obliczeń.

#### `showPrompt(): void`
Wyświetla prompt do wprowadzania danych.

#### `showResult(result: string): void`
Wyświetla wynik obliczeń w ramce.

#### `showError(message: string): void`
Wyświetla komunikat o błędzie.

#### `handleInput(input: string): boolean`
Obsługuje wprowadzone dane użytkownika.

**Zwraca:**
- `true` - kontynuuj działanie
- `false` - zakończ program

## Obsługa dużych liczb

### BigInt

Aplikacja używa natywnego JavaScript BigInt do obsługi bardzo dużych liczb całkowitych.

**Zalety:**
- Brak limitu rozmiaru liczby (tylko pamięć)
- Precyzyjne obliczenia na liczbach całkowitych
- Natywna implementacja (szybka)

**Ograniczenia:**
- Tylko liczby całkowite
- Nie można mieszać BigInt z Number w operacjach

**Implementacja:**
```typescript
const big1 = BigInt("999999999999");
const big2 = BigInt("888888888888");
const result = big1 * big2; // BigInt
```

### Number (Float)

Dla operacji zmiennoprzecinkowych używamy standardowego Number.

**Zalety:**
- Obsługa liczb dziesiętnych
- Kompatybilność z funkcjami matematycznymi

**Ograniczenia:**
- Precyzja do ~15-17 cyfr znaczących
- Możliwe błędy zaokrągleń

## Algorytmy

### Parsowanie wyrażeń

1. **Usuwanie spacji**: `"2 + 2"` → `"2+2"`
2. **Walidacja**: Sprawdzenie poprawności znaków i nawiasów
3. **Obsługa nawiasów**: Rekurencyjne rozwiązywanie od najbardziej zagnieżdżonych
4. **Kolejność operacji**: Potęgowanie → Mnożenie/Dzielenie → Dodawanie/Odejmowanie

### Szybkie potęgowanie (Binary Exponentiation)

```
Algorytm dla a^n:
1. Jeśli n = 0, zwróć 1
2. Jeśli n parzyste: a^n = (a^2)^(n/2)
3. Jeśli n nieparzyste: a^n = a * a^(n-1)

Złożoność: O(log n)
```

**Przykład:**
```
2^10:
2^10 = (2^2)^5 = 4^5
4^5 = 4 * 4^4 = 4 * (4^2)^2 = 4 * 16^2
16^2 = 256
Wynik: 4 * 256 = 1024
```

## Kolorowanie terminala

### Kody ANSI

Aplikacja używa kodów escape ANSI do kolorowania:

```typescript
const colors = {
  reset: '\x1b[0m',      // Reset
  bright: '\x1b[1m',     // Pogrubienie
  dim: '\x1b[2m',        // Przyciemnienie
  
  cyan: '\x1b[36m',      // Cyjan
  green: '\x1b[32m',     // Zielony
  yellow: '\x1b[33m',    // Żółty
  red: '\x1b[31m',       // Czerwony
  blue: '\x1b[34m',      // Niebieski
};
```

**Użycie:**
```typescript
console.log(colors.green + 'Sukces!' + colors.reset);
```

## Obsługa błędów

### Typy błędów

1. **Nieprawidłowe wyrażenie**: Niedozwolone znaki
2. **Niezbalansowane nawiasy**: `(2+3` lub `2+3)`
3. **Dzielenie przez zero**: `10/0`
4. **Ujemny wykładnik dla BigInt**: `2^(-3)` (tylko dla liczb całkowitych)

### Try-Catch

Wszystkie błędy są przechwytywane i wyświetlane w przyjazny sposób:

```typescript
try {
  const result = calculator.calculate(input);
  showResult(result);
} catch (error) {
  showError(error.message);
}
```

## Konfiguracja TypeScript

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",        // Wspiera BigInt
    "module": "commonjs",      // Node.js modules
    "lib": ["ES2020"],         // Biblioteki ES2020
    "outDir": "./dist",        // Output directory
    "rootDir": "./src",        // Source directory
    "strict": false,           // Wyłączone strict mode (dla prostoty)
    "esModuleInterop": true    // Kompatybilność modułów
  }
}
```

## Wydajność

### Złożoność obliczeniowa

| Operacja | Złożoność | Uwagi |
|----------|-----------|-------|
| Dodawanie | O(n) | n = liczba cyfr |
| Odejmowanie | O(n) | n = liczba cyfr |
| Mnożenie | O(n²) | Naiwne mnożenie |
| Dzielenie | O(n²) | |
| Potęgowanie | O(log m * n²) | m = wykładnik, n = cyfry |

### Optymalizacje

1. **Szybkie potęgowanie**: O(log n) zamiast O(n)
2. **BigInt**: Natywna implementacja (C++)
3. **Leniwe obliczenia**: Tylko potrzebne operacje

## Rozszerzanie aplikacji

### Dodawanie nowych operatorów

1. Dodaj operator do regex w `isValidExpression`
2. Dodaj obsługę w `calculateBigInt` lub `calculateFloat`
3. Dodaj do dokumentacji pomocy

**Przykład - dodanie operatora factorial (!):**

```typescript
// W calculateOperations
if (expr.includes('!')) {
  expr = expr.replace(/(\d+)!/g, (match, num) => {
    return factorial(BigInt(num)).toString();
  });
}

function factorial(n: bigint): bigint {
  if (n <= 1n) return 1n;
  return n * factorial(n - 1n);
}
```

### Dodawanie funkcji matematycznych

```typescript
// sin, cos, sqrt, etc.
expr = expr.replace(/sqrt\(([^)]+)\)/g, (match, num) => {
  return Math.sqrt(parseFloat(num)).toString();
});
```

## Testowanie

### Przypadki testowe

```typescript
const testCases = [
  { input: "2+2", expected: "4" },
  { input: "2^10", expected: "1024" },
  { input: "(5+3)*2", expected: "16" },
  { input: "10/0", shouldThrow: true },
];
```

### Uruchomienie testów

```bash
# Testy ręczne
npm start

# Automatyczne demo
node demo.js
```

## Bezpieczeństwo

### Zabezpieczenia

1. **Nie używamy eval()** - Własny parser
2. **Walidacja wejścia** - Sprawdzanie przed obliczeniami
3. **Obsługa błędów** - Graceful degradation
4. **Limit rekursji** - Zagnieżdżone nawiasy (naturalny limit stosu)

### Potencjalne zagrożenia

- ReDoS (Regex Denial of Service) - Minimalizowane przez proste regex
- Stack overflow - Bardzo głębokie zagnieżdżenia nawiasów

## Kompatybilność

- **Node.js**: v14.0.0+
- **TypeScript**: v4.0.0+
- **Systemy**: Windows, macOS, Linux
- **Terminale**: Wszystkie z obsługą ANSI colors

---

**Kod źródłowy jest w pełni udokumentowany i gotowy do rozbudowy! 🚀**
