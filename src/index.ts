// @ts-nocheck
const readline = require('readline');

/**
 * Kalkulator obsługujący nieskończenie duże liczby
 */
class Calculator {
  private history: Array<{ expression: string; result: string }> = [];

  /**
   * Oblicza wyrażenie matematyczne
   */
  calculate(expression: string): string {
    try {
      const cleanExpr = expression.replace(/\s+/g, '');
      
      if (!cleanExpr || cleanExpr === '') {
        return '';
      }

      if (!this.isValidExpression(cleanExpr)) {
        throw new Error('Nieprawidłowe wyrażenie matematyczne');
      }

      const result = this.evaluateExpression(cleanExpr);
      
      this.history.push({ expression, result });
      
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Nieznany błąd');
    }
  }

  /**
   * Walidacja wyrażenia
   */
  private isValidExpression(expr: string): boolean {
    const validChars = /^[0-9+\-*/.()^%]+$/;
    if (!validChars.test(expr)) return false;

    let balance = 0;
    for (const char of expr) {
      if (char === '(') balance++;
      if (char === ')') balance--;
      if (balance < 0) return false;
    }
    
    return balance === 0;
  }

  /**
   * Ewaluacja wyrażenia z uwzględnieniem kolejności operacji
   */
  private evaluateExpression(expr: string): string {
    // Obsługa nawiasów - rekurencyjnie
    while (expr.includes('(')) {
      const lastOpen = expr.lastIndexOf('(');
      const firstClose = expr.indexOf(')', lastOpen);
      
      if (firstClose === -1) {
        throw new Error('Niezbalansowane nawiasy');
      }
      
      const subExpr = expr.substring(lastOpen + 1, firstClose);
      const subResult = this.evaluateExpression(subExpr);
      
      expr = expr.substring(0, lastOpen) + subResult + expr.substring(firstClose + 1);
    }

    // Kolejność operacji: potęgowanie → mnożenie/dzielenie/modulo → dodawanie/odejmowanie
    expr = this.calculateOperations(expr, ['^']);
    expr = this.calculateOperations(expr, ['*', '/', '%']);
    expr = this.calculateOperations(expr, ['+', '-']);

    return expr;
  }

  /**
   * Oblicza operacje o tym samym priorytecie
   */
  private calculateOperations(expr: string, operators: string[]): string {
    const operatorPattern = operators.map(op => {
      if (op === '^') return '\\^';
      if (op === '*') return '\\*';
      return op;
    }).join('|');
    
    const regex = new RegExp(`(-?\\d+\\.?\\d*)([${operatorPattern}])(-?\\d+\\.?\\d*)`);
    
    while (true) {
      const match = expr.match(regex);
      if (!match) break;
      
      const [fullMatch, num1, operator, num2] = match;
      
      let result: string;
      
      // Sprawdzamy czy możemy użyć BigInt (tylko dla liczb całkowitych)
      const isInteger1 = !num1.includes('.');
      const isInteger2 = !num2.includes('.');
      
      if (isInteger1 && isInteger2 && operator !== '/') {
        result = this.calculateBigInt(num1, operator, num2);
      } else {
        result = this.calculateFloat(num1, operator, num2);
      }
      
      expr = expr.replace(fullMatch, result);
    }
    
    return expr;
  }

  /**
   * Obliczenia dla bardzo dużych liczb całkowitych (BigInt)
   */
  private calculateBigInt(num1: string, operator: string, num2: string): string {
    const big1 = BigInt(num1);
    const big2 = BigInt(num2);
    let result: bigint;

    switch (operator) {
      case '+':
        result = big1 + big2;
        break;
      case '-':
        result = big1 - big2;
        break;
      case '*':
        result = big1 * big2;
        break;
      case '%':
        result = big1 % big2;
        break;
      case '^':
        result = this.bigIntPow(big1, big2);
        break;
      default:
        throw new Error(`Nieznany operator: ${operator}`);
    }

    return result.toString();
  }

  /**
   * Obliczenia dla liczb zmiennoprzecinkowych
   */
  private calculateFloat(num1: string, operator: string, num2: string): string {
    const float1 = parseFloat(num1);
    const float2 = parseFloat(num2);
    let result: number;

    switch (operator) {
      case '+':
        result = float1 + float2;
        break;
      case '-':
        result = float1 - float2;
        break;
      case '*':
        result = float1 * float2;
        break;
      case '/':
        if (float2 === 0) throw new Error('Dzielenie przez zero');
        result = float1 / float2;
        break;
      case '%':
        result = float1 % float2;
        break;
      case '^':
        result = Math.pow(float1, float2);
        break;
      default:
        throw new Error(`Nieznany operator: ${operator}`);
    }

    // Formatowanie wyniku
    return this.formatNumber(result);
  }

  /**
   * Potęgowanie dla BigInt
   */
  private bigIntPow(base: bigint, exponent: bigint): bigint {
    if (exponent < 0n) {
      throw new Error('Nie można podnieść do ujemnej potęgi dla liczb całkowitych');
    }
    
    if (exponent === 0n) return 1n;
    
    let result = 1n;
    let currentBase = base;
    let currentExp = exponent;
    
    // Algorytm szybkiego potęgowania
    while (currentExp > 0n) {
      if (currentExp % 2n === 1n) {
        result *= currentBase;
      }
      currentBase *= currentBase;
      currentExp /= 2n;
    }
    
    return result;
  }

  /**
   * Formatowanie liczby (usuwanie zbędnych zer)
   */
  private formatNumber(num: number): string {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    
    // Dla liczb zmiennoprzecinkowych
    const formatted = num.toFixed(10).replace(/\.?0+$/, '');
    return formatted;
  }

  /**
   * Pobieranie historii
   */
  getHistory(): Array<{ expression: string; result: string }> {
    return [...this.history];
  }

  /**
   * Czyszczenie historii
   */
  clearHistory(): void {
    this.history = [];
  }
}

/**
 * Interfejs CLI z kolorowym, minimalistycznym designem
 */
class CalculatorCLI {
  private calculator: Calculator;
  private rl: readline.Interface;

  // Kolory ANSI
  private colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
  };

  constructor() {
    this.calculator = new Calculator();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ''
    });
  }

  /**
   * Banner powitalny
   */
  private showWelcome(): void {
    console.clear();
    console.log();
    console.log(this.colors.cyan + this.colors.bright + '  ╔═══════════════════════════════════════════════════════════════╗');
    console.log('  ║                                                               ║');
    console.log('  ║                  ⚡  KALKULATOR PRO  ⚡                       ║');
    console.log('  ║                                                               ║');
    console.log('  ║            Obsługa nieskończenie dużych liczb                 ║');
    console.log('  ║                                                               ║');
    console.log('  ╚═══════════════════════════════════════════════════════════════╝' + this.colors.reset);
    console.log();
    console.log(this.colors.dim + '  Wpisz "pomoc" aby zobaczyć dostępne polecenia' + this.colors.reset);
    console.log();
  }

  /**
   * Wyświetlanie pomocy
   */
  private showHelp(): void {
    console.log();
    console.log(this.colors.yellow + this.colors.bright + '  📖 INSTRUKCJA' + this.colors.reset);
    console.log();
    console.log(this.colors.cyan + '  OPERATORY:' + this.colors.reset);
    console.log(this.colors.white + '    +' + this.colors.reset + '  dodawanie          ' + this.colors.dim + '(np. 5 + 3)' + this.colors.reset);
    console.log(this.colors.white + '    -' + this.colors.reset + '  odejmowanie        ' + this.colors.dim + '(np. 10 - 4)' + this.colors.reset);
    console.log(this.colors.white + '    *' + this.colors.reset + '  mnożenie           ' + this.colors.dim + '(np. 7 * 8)' + this.colors.reset);
    console.log(this.colors.white + '    /' + this.colors.reset + '  dzielenie          ' + this.colors.dim + '(np. 20 / 4)' + this.colors.reset);
    console.log(this.colors.white + '    ^' + this.colors.reset + '  potęgowanie        ' + this.colors.dim + '(np. 2^10)' + this.colors.reset);
    console.log(this.colors.white + '    %' + this.colors.reset + '  modulo (reszta)    ' + this.colors.dim + '(np. 17 % 5)' + this.colors.reset);
    console.log(this.colors.white + '  ( )' + this.colors.reset + '  nawiasy            ' + this.colors.dim + '(np. (5+3)*2)' + this.colors.reset);
    console.log();
    console.log(this.colors.cyan + '  POLECENIA:' + this.colors.reset);
    console.log(this.colors.white + '    historia' + this.colors.reset + '  - wyświetl historię obliczeń');
    console.log(this.colors.white + '    czyść' + this.colors.reset + '     - wyczyść ekran i historię');
    console.log(this.colors.white + '    pomoc' + this.colors.reset + '     - wyświetl tę pomoc');
    console.log(this.colors.white + '    exit' + this.colors.reset + '      - wyjdź z programu');
    console.log();
    console.log(this.colors.cyan + '  PRZYKŁADY:' + this.colors.reset);
    console.log(this.colors.dim + '    2 + 2' + this.colors.reset);
    console.log(this.colors.dim + '    (5 + 3) * 2' + this.colors.reset);
    console.log(this.colors.dim + '    2^100' + this.colors.reset);
    console.log(this.colors.dim + '    999999999999 * 888888888888' + this.colors.reset);
    console.log();
  }

  /**
   * Wyświetlanie historii
   */
  private showHistory(): void {
    const history = this.calculator.getHistory();
    
    if (history.length === 0) {
      console.log();
      console.log(this.colors.yellow + '  📝 Historia jest pusta' + this.colors.reset);
      console.log();
      return;
    }

    console.log();
    console.log(this.colors.yellow + this.colors.bright + '  📜 HISTORIA OBLICZEŃ' + this.colors.reset);
    console.log();
    
    history.forEach((entry, index) => {
      const num = (index + 1).toString().padStart(3, ' ');
      console.log(this.colors.gray + `  ${num}.` + this.colors.reset + ` ${entry.expression} ${this.colors.dim}=${this.colors.reset} ${this.colors.green}${entry.result}${this.colors.reset}`);
    });
    
    console.log();
  }

  /**
   * Wyświetlanie promptu
   */
  private showPrompt(): void {
    process.stdout.write(this.colors.blue + this.colors.bright + '  ╭─[' + this.colors.cyan + 'kalkulator' + this.colors.blue + ']' + this.colors.reset + '\n');
    process.stdout.write(this.colors.blue + this.colors.bright + '  ╰─➤ ' + this.colors.reset);
  }

  /**
   * Wyświetlanie wyniku
   */
  private showResult(result: string): void {
    console.log();
    console.log(this.colors.dim + '  ┌─────────────────────────────────────────────────────────────' + this.colors.reset);
    console.log(this.colors.green + this.colors.bright + '  │  ' + result + this.colors.reset);
    console.log(this.colors.dim + '  └─────────────────────────────────────────────────────────────' + this.colors.reset);
    console.log();
  }

  /**
   * Wyświetlanie błędu
   */
  private showError(message: string): void {
    console.log();
    console.log(this.colors.red + '  ✖ ' + message + this.colors.reset);
    console.log();
  }

  /**
   * Obsługa wprowadzonych danych
   */
  private handleInput(input: string): boolean {
    const trimmed = input.trim().toLowerCase();

    // Puste wejście
    if (trimmed === '') {
      return true;
    }

    // Polecenia
    switch (trimmed) {
      case 'exit':
      case 'quit':
      case 'wyjdź':
      case 'wyjdz':
      case 'q':
        console.log();
        console.log(this.colors.cyan + '  👋 Do zobaczenia!' + this.colors.reset);
        console.log();
        return false;

      case 'pomoc':
      case 'help':
      case 'h':
      case '?':
        this.showHelp();
        return true;

      case 'historia':
      case 'history':
        this.showHistory();
        return true;

      case 'czyść':
      case 'czysć':
      case 'czysc':
      case 'clear':
      case 'cls':
        this.calculator.clearHistory();
        console.clear();
        this.showWelcome();
        console.log(this.colors.green + '  ✓ Wyczyszczono' + this.colors.reset);
        console.log();
        return true;

      default:
        // Obliczanie wyrażenia
        try {
          const result = this.calculator.calculate(input);
          if (result !== '') {
            this.showResult(result);
          }
        } catch (error) {
          if (error instanceof Error) {
            this.showError(error.message);
          } else {
            this.showError('Wystąpił nieznany błąd');
          }
        }
        return true;
    }
  }

  /**
   * Uruchomienie aplikacji
   */
  start(): void {
    this.showWelcome();

    this.rl.on('line', (input: string) => {
      const shouldContinue = this.handleInput(input);
      
      if (!shouldContinue) {
        this.rl.close();
        process.exit(0);
      }
      
      this.showPrompt();
    });

    this.rl.on('close', () => {
      process.exit(0);
    });

    // Obsługa Ctrl+C
    this.rl.on('SIGINT', () => {
      console.log();
      console.log(this.colors.cyan + '  👋 Do zobaczenia!' + this.colors.reset);
      console.log();
      process.exit(0);
    });

    this.showPrompt();
  }
}

// Uruchomienie aplikacji
const app = new CalculatorCLI();
app.start();
