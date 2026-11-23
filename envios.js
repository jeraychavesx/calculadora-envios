// Calculadora de envíos: envío gratis desde 100.000 COP, si no 8.000 COP.
function calcularEnvio(subtotal) {
  if (typeof subtotal !== 'number' || !Number.isInteger(subtotal) || subtotal < 0) {
    throw new RangeError('El subtotal debe ser un número entero y no negativo');
  }
  return subtotal >= 100000 ? 0 : 8000;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcularEnvio };
}
