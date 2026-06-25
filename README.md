# Electricidades Diego Velicias — Web

Sitio web del electricista Diego Velicias (comarca de Benavente · Zamora/León).
Stack: **Astro + Tailwind + React (islas) + GSAP + Framer Motion + lucide**.

## Documentos clave (leer antes de programar)
- **`CLAUDE.md`** — reglas vinculantes del proyecto.
- **`DESIGN_SYSTEM.md`** — sistema de diseño (colores, tipografía, componentes, movimiento).
- **`ROADMAP.md`** — plan de construcción fase a fase.
- **`src/data/site.ts`** — todo el contenido y datos (placeholders marcados con 🟡).

## Comandos
```bash
npm install      # instalar
npm run dev      # desarrollo (localhost:4321)
npm run build    # genera /dist  → se sube a Hostinger (public_html)
npm run preview  # previsualizar el build
npm run check    # comprobar tipos
```

## Despliegue (Hostinger, estático)
Subir el contenido de `/dist` a `public_html`. Ver Fase 7 del ROADMAP.

## Estado
Cimientos listos (design system, UI base, layout, home de referencia).
Pendiente: resto de páginas/secciones (ver ROADMAP) y respuestas del cliente (🟡 en `site.ts`).
