# Design Tokens

## Tokens de Diseno

### Tipografias

| Clase Tailwind | Fuente | Origen | Pesos |
|---|---|---|---|
| `font-title` | Figtree | Google Fonts | 300-900 (variable) |
| `font-body` | Blauer Nue | `app/assets/css/fonts.css` | 100-900 (8 pesos + italics) |

### Colores

> `--color-*: initial` resetea todos los colores de Tailwind. Solo existen los definidos aqui.

**Primary (rojo):**
| Token | Hex |
|---|---|
| `primary-50` | #fef2f3 |
| `primary-100` | #fde5e7 |
| `primary-200` | #fbced3 |
| `primary-300` | #f7a7b0 |
| `primary-400` | #f27587 |
| `primary-500` / `primary` | #e71d35 |
| `primary-600` | #d01729 |
| `primary-700` | #a0091e |
| `primary-800` | #87071a |
| `primary-900` | #780716 |

**Secondary (azul):**
| Token | Hex |
|---|---|
| `secondary-50` | #eff6ff |
| `secondary-100` | #dbeafe |
| `secondary-200` | #bfdbfe |
| `secondary-300` | #93c5fd |
| `secondary-400` | #60a5fa |
| `secondary-500` / `secondary` | #2463eb |
| `secondary-600` | #1d4ed8 |
| `secondary-700` | #163b8d |
| `secondary-800` | #1e3a8a |
| `secondary-900` | #07142f |

**Neutral (gris-teal):**
| Token | Hex |
|---|---|
| `neutral-0` / `white` | #ffffff |
| `neutral-50` | #f7fcfc |
| `neutral-100` | #eff9fa |
| `neutral-200` | #e0f3f5 |
| `neutral-300` | #d0ecf0 |
| `neutral-400` | #b1e0e6 |
| `neutral-500` | #57888e |
| `neutral-600` | #487a80 |
| `neutral-700` | #396b71 |
| `neutral-800` | #2a5157 |
| `neutral-900` / `black` | #162526 |

**Sistema (sin escala, usar opacidades para variantes):**
| Token | Hex |
|---|---|
| `success` | #22c393 |
| `warning` | #fccc4f |
| `error` | #f04343 |

### Uso de Tokens

```html
bg-primary-500  text-secondary-700  border-neutral-300
bg-success/10  text-error  border-warning/30
font-title font-bold  font-body font-medium
```
