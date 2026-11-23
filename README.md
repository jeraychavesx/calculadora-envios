# Calculadora de envíos

Pequeña calculadora web que indica cuánto cuesta el envío de una compra en una tienda.

## Regla de negocio

- La calculadora recibe un **subtotal entero y no negativo** en pesos colombianos (COP).
- Si el subtotal es **menor a 100.000 COP**, el envío cuesta **8.000 COP**.
- Si el subtotal es **igual o mayor a 100.000 COP**, el envío es **gratis (0 COP)**.
- Los montos vacíos, negativos o decimales producen un **error de validación**.

## Archivos

| Archivo | Contenido |
| --- | --- |
| `index.html` | Formulario de la calculadora (lo que ve el usuario). |
| `envios.js` | Función `calcularEnvio(subtotal)` con la regla de negocio. |
| `envios.test.js` | Pruebas unitarias con el ejecutor de pruebas de Node.js. |
| `evidencias/` | Salidas de las pruebas antes y después de la corrección. |

## Cómo usar la calculadora

1. Abre `index.html` en un navegador (doble clic sobre el archivo) o entra a la versión publicada:
   <https://jeraychavesx.github.io/calculadora-envios/>
2. Ingresa el monto **sin puntos ni comas** y pulsa **Calcular**.

Ejemplos para comprobar que funciona:

| Escribes | Debe mostrar |
| --- | --- |
| `99999` | Envío: 8.000 COP |
| `100000` | Envío: 0 COP |
| `250000` | Envío: 0 COP |
| *(campo vacío)* | Ingresa el subtotal de la compra. |
| `-5` o `100.5` | Ingresa un monto entero y no negativo, sin puntos ni comas. |

## Cómo ejecutar las pruebas

Requisito: **Node.js 22 o superior** (`node --version` para comprobarlo).

En la carpeta del proyecto ejecuta:

```bash
node --test
```

Resultado esperado: `tests 5`, `pass 5`, `fail 0`.

| Caso | Entrada | Esperado |
| --- | --- | --- |
| Justo debajo del límite | 99.999 COP | 8.000 COP |
| Límite exacto | 100.000 COP | 0 COP |
| Justo encima del límite | 100.001 COP | 0 COP |
| Negativo | −1 COP | `RangeError` |
| Decimal sobre el límite (caso adicional) | 100.000,5 COP | `RangeError` |

## Defecto encontrado y corrección

La versión inicial usaba `subtotal > 100000`, así que el monto exacto de 100.000 COP cobraba
8.000 COP de envío. La prueba del límite lo detectó (3 aprobadas, 1 fallida). Se cambió el
operador a `>=` en `envios.js` y las pruebas volvieron a pasar. La prueba del límite se mantiene
para detectar una regresión si el error reaparece.

```js
return subtotal >= 100000 ? 0 : 8000;
```

Las salidas completas están en [`evidencias/salida-pruebas-antes.txt`](evidencias/salida-pruebas-antes.txt)
y [`evidencias/salida-pruebas-despues.txt`](evidencias/salida-pruebas-despues.txt).

## Despliegue (GitHub Pages)

1. Sube la versión corregida a la raíz de la rama `main`.
2. En GitHub entra a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama **main** y carpeta **/(root)**, y guarda.
4. Revisa la ejecución en la pestaña **Actions** (*pages build and deployment*).
5. Abre la URL que aparece en **Settings → Pages**.

### Prueba de humo después de publicar

| Comprobación | Resultado esperado |
| --- | --- |
| Abrir la URL en ventana privada | Aparece el formulario |
| Calcular con `100000` | Envío de 0 COP |
| Enviar el campo vacío | Mensaje de validación |

Si la versión publicada presenta una regresión, revierte el cambio (`git revert <commit>`),
sube de nuevo y repite la prueba de humo cuando termine el nuevo despliegue.
