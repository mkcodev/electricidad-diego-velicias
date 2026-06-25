# CLAUDE.md — Reglas del proyecto

> Web de **Electricidades Diego Velicias** (electricista autorizado, comarca de Benavente).
> Este archivo es **vinculante**. Antes de escribir o modificar código, léelo entero.
> Si algo no está aquí ni en `DESIGN_SYSTEM.md`, **pregunta — no inventes**.

---

## 0. Regla de oro

**No inventes datos, colores, fuentes, medidas, iconos ni contenido.**
Todo sale de tres sitios:

1. **Diseño** → `tailwind.config.mjs` + `DESIGN_SYSTEM.md`
2. **Contenido** → `src/data/site.ts`
3. **Qué construir y en qué orden** → `ROADMAP.md`

Si un dato lleva `🟡 TODO`, es un placeholder: **mantenlo como placeholder visible**, no te lo inventes como si fuera real. Nunca publiques reseñas, números de años de experiencia ni nº de instalador inventados.

---

## 1. Stack (no añadir dependencias sin permiso)

- **Astro 4** con `output: 'static'` (se despliega en **Hostinger** subiendo `/dist` a `public_html`).
- **Tailwind CSS 3** — toda la maquetación. Sin CSS suelto salvo `global.css`.
- **React 18** vía `@astrojs/react` — SOLO para islas interactivas (ver §4).
- **GSAP** — animaciones de scroll y timelines complejas (en islas).
- **Framer Motion** — micro-interacciones y entrada de componentes React.
- **lucide-react** — TODOS los iconos. Prohibido emojis como iconos de UI y prohibido SVG inline propio.

No instales otras librerías (sliders, UI kits, etc.) sin aprobación. Si crees que hace falta una, proponla primero.

---

## 2. Arquitectura de la web

Multipágina (sin blog). Páginas:

| Ruta                     | Archivo                                   | Contenido |
|--------------------------|-------------------------------------------|-----------|
| `/`                      | `src/pages/index.astro`                   | Home con todas las secciones clave |
| `/servicios`             | `src/pages/servicios/index.astro`         | Listado de servicios |
| `/servicios/[slug]`      | `src/pages/servicios/[slug].astro`        | Detalle por servicio (genera de `SERVICIOS`) |
| `/sobre-mi`              | `src/pages/sobre-mi.astro`                | Diego, acreditaciones, confianza |
| `/zona-de-cobertura`     | `src/pages/zona-de-cobertura.astro`       | Mapa + listado de pueblos (SEO local) |
| `/contacto`              | `src/pages/contacto.astro`                | Formulario de presupuesto + datos |
| `/gracias`               | `src/pages/gracias.astro`                 | Confirmación tras enviar formulario |
| `/aviso-legal`, `/privacidad`, `/cookies` | `src/pages/legal/*.astro`    | Legales (RGPD) |

Todas las páginas usan `src/layouts/Layout.astro`.

---

## 3. Estructura de carpetas (respétala)

```
src/
├── components/
│   ├── ui/          → piezas base reutilizables .astro (Button, Card, Section, Badge, Icon…)
│   ├── sections/    → secciones de página .astro (Hero, Servicios, Valores, CTA, Footer…)
│   └── react/       → SOLO islas interactivas .tsx (formulario, mapa, carrusel reseñas…)
├── layouts/
│   └── Layout.astro → <head>, SEO, Header, Footer, botón WhatsApp
├── data/
│   └── site.ts      → TODO el contenido y datos
├── lib/             → helpers TS (seo, schema.org, validación de formulario…)
├── styles/
│   └── global.css   → base + clases de componente (@layer)
└── pages/           → rutas (ver tabla §2)
```

Alias de import (ya en `tsconfig.json`): `@ui/*`, `@sections/*`, `@react/*`, `@layouts/*`, `@data/*`, `@lib/*`.

---

## 4. Astro vs React — cuándo usar cada uno

**Por defecto, todo es `.astro` (estático, 0 JS).** Usa una isla React `.tsx` SOLO si hay interactividad de cliente real:

- Formulario de presupuesto (validación + envío) → React.
- Carrusel/acordeón de reseñas, FAQ acordeón → React o `<details>` nativo si basta.
- Mapa interactivo de zona → React.
- Menú móvil → puede ser Astro + JS mínimo inline; no requiere React.

Hidratación: usa la directiva más barata que funcione — `client:visible` para lo que está bajo el pliegue, `client:idle` para lo prioritario. Nunca `client:load` salvo que sea imprescindible.

GSAP y Framer Motion **solo dentro de componentes React** (`@react/*`) o en `<script>` de Astro para animaciones de scroll sencillas. No mezcles ambas en el mismo elemento.

---

## 5. Reglas de diseño (resumen — detalle en DESIGN_SYSTEM.md)

- **Colores**: solo los tokens `brand-*` de Tailwind. El amarillo `#F7B904` es acento/CTA, **no** se usa como fondo de páginas enteras ni para texto largo (mal contraste). Fondos: blanco y `brand-gray-light`; bloques de contraste en `brand-black`.
- **Tipografía**: titulares `font-display` (Bebas Neue, SIEMPRE en mayúsculas, son condensados); todo lo demás `font-sans` (Montserrat). Nunca uses Bebas Neue para párrafos.
- **Botones**: `.btn-primary` (amarillo) para la acción principal de cada vista; `.btn-secondary`/`.btn-outline` para el resto. Un solo `.btn-primary` visible por sección.
- **Iconos**: `lucide-react`, nombre en `site.ts` como string; tamaño 20–24px UI, 32–40px en tarjetas. Trazo coherente.
- **Espaciado**: secciones con `.section` y contenedor `.container-web`. No inventes paddings sueltos grandes.
- **Bordes/sombras**: `rounded-card`/`rounded-btn`, `shadow-card`/`shadow-card-hover`. Nada de sombras o radios arbitrarios.

Si necesitas un valor que no existe en los tokens, **añádelo a `tailwind.config.mjs` y documéntalo en `DESIGN_SYSTEM.md`** — no lo metas como clase arbitraria `[...]`.

---

## 6. Contenido y copy

- Idioma: **español de España**, tono cercano y profesional (ni frío ni informal de más).
- Trata de "tú" al visitante. Diego habla en primera persona o como "nosotros" de forma consistente (elige una y mantenla — por defecto **primera persona del singular**, es autónomo).
- **Sin dirección física** en ninguna parte. Usar zona de cobertura (`Zamora · León`).
- CTA recurrente: pedir presupuesto (teléfono, WhatsApp o formulario).
- No prometer "24h" salvo que `SITE.urgencias24h === true`.

---

## 7. SEO (es un objetivo central del proyecto)

- Cada página define `title` + `description` propios vía props de `Layout`.
- SEO **local**: incluir de forma natural "electricista", "Benavente", "Zamora", "León" y pueblos de `ZONAS`.
- Datos estructurados `schema.org` tipo `Electrician`/`LocalBusiness` en `Layout` (ya esbozado) — mantener `telephone`, `areaServed`, `email`.
- Una sola `<h1>` por página. Jerarquía correcta de encabezados.
- `alt` descriptivo en todas las imágenes. Imágenes optimizadas (usar `astro:assets` `<Image />`).
- Generar `sitemap` (integración ya añadida) y `robots.txt`.

---

## 8. Formulario de presupuesto

- Envío **client-side** (no hay servidor en Hostinger estático). Usar **Web3Forms** (`https://web3forms.com`, gratis): se necesita una `access_key` → guardar en `src/lib/forms.ts` con un placeholder `🟡 TODO`. Los correos llegan a `SITE.formEmail`.
- Validación en cliente antes de enviar. Mostrar estado: idle / enviando / éxito → redirigir a `/gracias` / error.
- Incluir checkbox de consentimiento RGPD enlazando a `/privacidad`. **Obligatorio.**
- Campos mínimos: nombre, teléfono, (email opcional), tipo de servicio (de `SERVICIOS`), mensaje.
- Honeypot anti-spam.

---

## 9. Accesibilidad y rendimiento

- Contraste AA mínimo. Texto sobre amarillo siempre en `brand-black`, nunca blanco.
- Foco visible (ya en `global.css`). Navegación por teclado en menús y formulario.
- `aria-label` en botones de solo icono (teléfono, WhatsApp, menú).
- Respetar `prefers-reduced-motion` (ya contemplado): las animaciones GSAP/Framer deben desactivarse o reducirse.
- Objetivo Lighthouse: 90+ en todo. Imágenes lazy, fuentes con `display=swap`.

---

## 10. Flujo de trabajo y comandos

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo en localhost:4321
npm run build      # genera /dist (lo que se sube a Hostinger)
npm run preview    # previsualiza el build
npm run check      # astro check (tipos)
```

Antes de dar por terminada una tarea: `npm run build` debe pasar **sin errores ni warnings nuevos**.

### Convenciones de código
- Componentes en **PascalCase** (`HeroHome.astro`, `QuoteForm.tsx`).
- Un componente = un fichero. Secciones de página viven en `@sections`, no sueltas en `pages`.
- Nada de datos hardcodeados en componentes: importar de `@data/site`.
- TypeScript estricto. Sin `any` salvo justificado.
- Comentarios en español, breves y útiles.

### Git
- Commits pequeños y descriptivos en español: `feat: sección hero home`, `fix: contraste botón`.
- No commitear `node_modules`, `/dist`, ni claves reales.

---

## 11. Qué NO hacer (lista negra)

- ❌ Inventar colores, fuentes, sombras o tamaños fuera de los tokens.
- ❌ Usar clases arbitrarias de Tailwind (`bg-[#...]`, `text-[22px]`) en vez de tokens.
- ❌ Emojis como iconos de interfaz (sí permitidos en texto/copy puntual).
- ❌ Bebas Neue en párrafos o textos largos.
- ❌ Amarillo como fondo de página completa o como color de texto de cuerpo.
- ❌ Publicar contenido `🟡 TODO` o reseñas inventadas como si fueran reales.
- ❌ Añadir dependencias nuevas sin aprobación.
- ❌ `client:load` por defecto en islas.
- ❌ Poner dirección física o teléfono distinto al de `site.ts`.
- ❌ Dejar el build roto.
