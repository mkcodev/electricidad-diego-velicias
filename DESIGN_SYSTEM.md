# Design System — Electricidades Diego Velicias

Sistema de diseño vinculante. Implementado en `tailwind.config.mjs` y `src/styles/global.css`.
**Toda decisión visual sale de aquí.** Si falta un valor, se añade primero al token y luego se documenta en este archivo.

---

## 1. Principios

1. **Eléctrico pero serio.** Amarillo enérgico sobre base neutra (negro/blanco/gris). Profesional, no “barato”.
2. **El amarillo es acento, no fondo.** Guía la mirada hacia las acciones (CTA, datos clave), no inunda la pantalla.
3. **Contraste y legibilidad primero.** Cumplir AA siempre.
4. **Bebas Neue manda en titulares; Montserrat sostiene el resto.**
5. **Menos es más.** Espacio en blanco generoso, jerarquía clara, poca decoración.

---

## 2. Color

| Token Tailwind        | HEX       | Uso |
|-----------------------|-----------|-----|
| `brand-yellow`        | `#F7B904` | Acento principal, CTA, subrayados, iconos destacados |
| `brand-yellow-dark`   | `#D99F00` | Hover de elementos amarillos |
| `brand-yellow-soft`   | `#FFF3CC` | Fondos suaves, badges, highlights |
| `brand-black`         | `#1A1A1A` | Titulares, texto, fondos de contraste |
| `brand-white`         | `#FFFFFF` | Fondo base, texto sobre oscuro |
| `brand-gray`          | `#6B6B6B` | Texto secundario, captions |
| `brand-gray-light`    | `#F2F2F2` | Fondos de sección alternos |
| `brand-gray-border`   | `#E5E5E5` | Bordes de tarjetas e inputs |
| `whatsapp`            | `#25D366` | SOLO botón flotante de WhatsApp |

**Reglas de contraste**
- Texto sobre `brand-yellow` → SIEMPRE `brand-black`. Nunca blanco.
- Texto de cuerpo → `brand-black` sobre claro, `brand-white` sobre `brand-black`.
- Texto secundario → `brand-gray` (solo sobre fondos claros).
- Amarillo prohibido para: fondos de página completa, texto de párrafo.

**Combinaciones aprobadas (fondo → texto)**
- Blanco → negro / gris.
- `brand-gray-light` → negro / gris.
- `brand-black` → blanco + acentos amarillos.
- `brand-yellow` → negro (bloques CTA cortos, badges).

---

## 3. Tipografía

Dos familias, cargadas en `Layout.astro` con `display=swap`.

**Bebas Neue** — `font-display`. Condensada, un solo peso, SIEMPRE en MAYÚSCULAS. Solo titulares y números muy grandes de impacto.

**Montserrat** — `font-sans`. Pesos: 400 (cuerpo), 600 (subtítulos/UI/botones), 700 (números/énfasis).

### Escala de titulares (display)
| Clase           | Tamaño (clamp)        | Uso |
|-----------------|-----------------------|-----|
| `text-display-xl` | 3.5 → 6rem          | H1 del hero |
| `text-display-lg` | 2.75 → 4.5rem       | H1 de página interior |
| `text-display-md` | 2 → 3rem            | H2 de sección |
| `text-display-sm` | 1.5 → 2rem          | H3 / títulos de tarjeta grandes |

> Bebas Neue ya lleva `tracking-display` y `uppercase` aplicados por `global.css` a `h1–h4`.

### Escala de texto (Montserrat, tamaños Tailwind por defecto)
| Uso              | Clases |
|------------------|--------|
| Lead / intro     | `text-lg md:text-xl text-brand-gray` |
| Cuerpo           | `text-base leading-relaxed` |
| Secundario       | `text-sm text-brand-gray` |
| Eyebrow/kicker   | `.eyebrow` (uppercase, tracking, amarillo oscuro) |
| Botón            | `font-semibold tracking-wide` |

**Patrón de encabezado de sección recomendado**
```
<p class="eyebrow">Servicios</p>
<h2 class="text-display-md">Lo que hago por ti</h2>
<span class="accent-bar mt-3"></span>
```

---

## 4. Espaciado y layout

- Contenedor: `.container-web` (máx. 1200px, padding lateral responsive).
- Sección: `.section` (96px vertical desktop / 64px móvil).
- Grid de tarjetas: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`.
- Ritmo vertical interno: múltiplos de 4 (Tailwind `space-y-4/6/8`).
- Alternar fondos entre secciones: blanco ↔ `brand-gray-light` para separar visualmente.

---

## 5. Componentes UI base (`@ui`)

Construir estos primero; el resto los reutiliza.

| Componente      | Notas |
|-----------------|-------|
| `Button.astro`  | variantes `primary` / `secondary` / `outline`; props `href`, `variant`, `icon?`. Usa clases `.btn-*`. |
| `Section.astro` | wrapper con `.section` + `.container-web`; prop `bg="white"|"gray"|"black"`. |
| `Card.astro`    | `.card .card-hover`; slots header/body. |
| `Badge.astro`   | `.badge`. |
| `Icon.astro`    | recibe `name` (string lucide) y lo renderiza. Centraliza el uso de iconos en contexto estático. |
| `SectionHeading.astro` | eyebrow + h2 + accent-bar (patrón §3). |

### Botones
- **Primario** `.btn-primary`: amarillo, texto negro. Máximo **uno** prominente por sección.
- **Secundario** `.btn-secondary`: negro.
- **Outline** `.btn-outline`: sobre fondos amarillos o como terciario.
- Altura táctil mínima 44px. Icono opcional a la izquierda o derecha (lucide, 20px).

### Tarjetas
- `.card` + `.card-hover`. Padding `p-6`. Radio `rounded-card`. Borde `brand-gray-border`.
- Tarjeta de servicio: icono en círculo `brand-yellow-soft` arriba, título `text-display-sm`, resumen en `text-brand-gray`, enlace “Ver más”.

---

## 6. Iconografía

- Librería única: **lucide-react**. En `site.ts` el icono es un **string** con el nombre PascalCase exacto.
- Tamaños: 20–24px en UI/listas, 32–40px en tarjetas, trazo por defecto (`stroke-width` 2).
- Color: heredan `currentColor`; acentuar con `text-brand-yellow-dark` o negro según fondo.
- Mapa de iconos sugerido por servicio (verificar que existen en lucide):
  `PlugZap` instalaciones · `TriangleAlert` averías · `FileCheck2` boletines ·
  `Wrench` mantenimiento · `SunMedium` solar · `CarFront` recarga VE ·
  `BadgeCheck`, `Clock`, `Handshake`, `MapPin`, `Phone`, `MessageCircle`, `Mail`, `Star`.

> Antes de usar un icono, confirma que existe en lucide-react. Si no, elige el más cercano y anótalo.

---

## 7. Movimiento (GSAP + Framer Motion)

Filosofía: **sutil, rápido, con propósito.** Nada de animaciones que distraigan o ralenticen.

- **Entrada por scroll** (secciones, tarjetas): fade + subida de 16–24px, duración 0.5–0.7s, easing `cubic-bezier(0.4,0,0.2,1)`, stagger 0.08s entre tarjetas. GSAP `ScrollTrigger` o utilidad `animate-fade-up`.
- **Micro-interacciones** (botones, tarjetas hover): ya resueltas con Tailwind `transition`/`hover:-translate-y`. No animar con JS lo que el CSS ya hace.
- **Framer Motion**: solo en islas React (carrusel reseñas, acordeón FAQ, formulario). `whileInView` con `viewport={{ once: true }}`.
- **WhatsApp flotante**: anillo `animate-pulse-ring` discreto.
- **Reduced motion**: respetar `prefers-reduced-motion` (global.css ya lo neutraliza; en JS comprobar `window.matchMedia` y saltar animaciones).

Duraciones de referencia: micro 150–200ms · entrada 500–700ms · nunca > 1s.

---

## 8. Formularios

- Inputs con `.input`, etiquetas con `.label`. Estados foco amarillo.
- Error: borde rojo (`border-red-500`) + mensaje `text-sm text-red-600`. (rojo solo funcional, no de marca.)
- Éxito → redirección a `/gracias`.
- Checkbox RGPD obligatorio antes de habilitar envío.

---

## 9. Imágenes y media

- Usar `astro:assets` `<Image />` para optimización automática.
- Fotos reales de Diego/trabajos cuando estén disponibles (🟡 pendientes). Mientras, placeholders neutros marcados.
- Estilo fotográfico: luz natural, trabajos reales, limpio. Evitar stock genérico de “bombillas” cliché.
- Logos en `/public` o `src/assets`: usar versión negra sobre claro, blanca sobre oscuro/amarillo.

---

## 10. Checklist por componente

Antes de dar por hecho un componente:
- [ ] Solo tokens `brand-*`, sin valores arbitrarios.
- [ ] Datos desde `@data/site`, nada hardcodeado.
- [ ] Titulares en `font-display`, cuerpo en `font-sans`.
- [ ] Contraste AA verificado (texto sobre amarillo = negro).
- [ ] Iconos de lucide, con `aria-label` si es solo icono.
- [ ] Responsive (móvil primero) y foco por teclado.
- [ ] Animación sutil y con `prefers-reduced-motion` respetado.
- [ ] `npm run build` sin errores.
