#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('\n🧮 DEMO KALKULATORA - Automatyczne testy\n');
console.log('═'.repeat(60));
console.log('\n');

const calculatorPath = path.join(__dirname, 'dist', 'index.js');

// Przykładowe obliczenia do przetestowania
const testCases = [
  { expr: '2 + 2', desc: 'Proste dodawanie' },
  { expr: '(5 + 3) * 2', desc: 'Nawiasy i mnożenie' },
  { expr: '2^10', desc: 'Potęgowanie' },
  { expr: '2^100', desc: 'Bardzo duże potęgowanie' },
  { expr: '999999999999 * 888888888888', desc: 'Mnożenie bardzo dużych liczb' },
  { expr: '100 / 4', desc: 'Dzielenie' },
  { expr: '17 % 5', desc: 'Modulo (reszta z dzielenia)' },
  { expr: '((10 + 5) * 3) - 20', desc: 'Zagnieżdżone nawiasy' },
];

console.log('Przykładowe obliczenia:\n');

testCases.forEach((test, index) => {
  console.log(`${index + 1}. ${test.desc}`);
  console.log(`   Wyrażenie: ${test.expr}`);
  console.log('');
});

console.log('═'.repeat(60));
console.log('\n💡 Aby uruchomić kalkulator interaktywnie, wpisz: npm start');
console.log('\n📖 Dostępne polecenia w kalkulatorze:');
console.log('   • pomoc     - wyświetla pomoc');
console.log('   • historia  - pokazuje historię obliczeń');
console.log('   • czyść     - czyści ekran');
console.log('   • exit      - wychodzi z programu');
console.log('\n');
