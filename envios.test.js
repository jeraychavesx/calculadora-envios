const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calcularEnvio } = require('./envios.js');

test('99.999 COP cobra 8.000 COP de envío', () => {
  assert.equal(calcularEnvio(99999), 8000);
});

test('100.000 COP (límite exacto) tiene envío gratis', () => {
  assert.equal(calcularEnvio(100000), 0);
});

test('100.001 COP tiene envío gratis', () => {
  assert.equal(calcularEnvio(100001), 0);
});

test('-1 COP produce RangeError', () => {
  assert.throws(() => calcularEnvio(-1), RangeError);
});

// Caso adicional (actividad para entregar): un decimal justo encima del límite
// no debe colarse como envío gratis; la regla exige montos enteros.
test('100.000,5 COP (decimal) produce RangeError', () => {
  assert.throws(() => calcularEnvio(100000.5), RangeError);
});
