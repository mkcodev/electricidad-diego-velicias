# ROADMAP — Construcción de la web

Plan de ejecución para **Claude Code en terminal**. Construir en orden. Cada fase tiene
criterios de aceptación; no pasar a la siguiente sin cumplirlos y con `npm run build` en verde.

> Lee primero `CLAUDE.md` y `DESIGN_SYSTEM.md`. Contenido en `src/data/site.ts`.

---

## Fase 0 — Arranque (una vez)

```bash
npm install
npm run dev
```

- [ ] Las dependencias instalan sin errores.
- [ ] `localhost:4321` carga.
- [ ] Cargar Bebas Neue + Montserrat en `Layout.astro` (`<link>` Google Fonts, `display=swap`).
- [ ] Copiar los 4 logos a `src/assets/logo/` y un favicon a `public/`.

---

## Fase 1 — Cimientos UI (`@ui`)

Construir los componentes base ANTES que las secciones, porque todo los reutiliza.

1. `Icon.astro` — render de icono lucide a partir de string.
2. `Button.astro` — variantes primary/secondary/outline (+ icono opcional).
3. `Section.astro` — wrapper `.section` + `.container-web`, prop `bg`.
4. `SectionHeading.astro` — eyebrow + h2 + accent-bar.
5. `Card.astro`, `Badge.astro`.

**Aceptación:** una página de prueba (`/sandbox`, borrar al final) que muestra los 3 botones, una tarjeta y un heading correctamente estilados con los tokens.

---

## Fase 2 — Esqueleto global

1. `Layout.astro` — `<head>` SEO completo, fuentes, JSON-LD `Electrician`, props `title`/`description`/`image`/`noindex`. (Hay base previa: actualizar fuentes a Bebas/Montserrat y datos a `site.ts`.)
2. `sections/Header.astro` — logo + `NAV` de `site.ts` + CTA “Presupuesto” + teléfono. Menú móvil accesible (sin Alpine; JS mínimo o `<details>`).
3. `sections/Footer.astro` — datos de contacto, zona de cobertura, enlaces legales, redes (si existen), copyright.
4. `react/WhatsappFab.tsx` **o** versión Astro — botón flotante con `WHATSAPP_URL`, anillo `animate-pulse-ring`, `aria-label`.

**Aceptación:** header y footer en todas las páginas, navegación funcional, WhatsApp abre chat con mensaje precargado.

---

## Fase 3 — Home (`/`)

Secciones (en `@sections`, una por archivo), en este orden vertical:

1. `HeroHome` — H1 (`tagline`), subtítulo, CTA doble (Presupuesto + Llamar), señales de confianza (autorizado, zona). Animación de entrada GSAP suave.
2. `ServiciosGrid` — tarjetas de `SERVICIOS` (destacados o todos), enlazan a detalle.
3. `Valores` — 4 diferenciadores de `VALORES` con icono.
4. `ComoTrabajo` — pasos 1·2·3 (contacto → visita/presupuesto → trabajo). 🟡 validar pasos.
5. `ZonaPreview` — mini-mapa/listado de cobertura + enlace a `/zona-de-cobertura`.
6. `Resenas` — carrusel React (Framer Motion) de `RESENAS`. 🟡 placeholder hasta tener reales.
7. `CtaFinal` — bloque negro o amarillo con llamada a la acción y teléfono/WhatsApp.

**Aceptación:** home completa, responsive, una sola `<h1>`, animaciones sutiles, build verde, Lighthouse SEO/Best-practices ≥ 90.

---

## Fase 4 — Servicios

1. `/servicios/index.astro` — todos los servicios en grid + intro.
2. `/servicios/[slug].astro` — `getStaticPaths` desde `SERVICIOS`; detalle con `descripcion`, `puntos`, CTA, servicios relacionados. SEO propio por servicio.

**Aceptación:** una página por servicio generada automáticamente, breadcrumbs, enlaces internos correctos.

---

## Fase 5 — Sobre mí · Zona · Contacto · Gracias · Legales

1. `sobre-mi.astro` — historia de Diego, foto, acreditaciones (🟡 datos), confianza, CTA.
2. `zona-de-cobertura.astro` — mapa interactivo (React) + listado `ZONAS` para SEO local; un párrafo por área si se quiere reforzar posicionamiento.
3. `contacto.astro` — datos de contacto + `react/QuoteForm.tsx` (Web3Forms, validación, RGPD, honeypot).
4. `gracias.astro` — confirmación + enlaces de vuelta.
5. `legal/aviso-legal`, `legal/privacidad`, `legal/cookies` — textos RGPD. 🟡 requieren datos fiscales de Diego.

**Aceptación:** formulario envía a `SITE.formEmail` y redirige a `/gracias`; consentimiento RGPD obligatorio; legales enlazados desde el footer.

---

## Fase 6 — SEO técnico y pulido

- [ ] `sitemap` generándose; `public/robots.txt` apuntando al sitemap.
- [ ] `title`/`description` únicos por página; Open Graph con imagen.
- [ ] JSON-LD `LocalBusiness`/`Electrician` con `areaServed` (pueblos), teléfono, horario.
- [ ] `alt` en todas las imágenes; `<Image />` de astro:assets.
- [ ] 404 personalizada (`pages/404.astro`).
- [ ] Revisión de contraste y foco en toda la web.
- [ ] Borrar `/sandbox` de pruebas.

---

## Fase 7 — Build y despliegue (Hostinger)

```bash
npm run build      # genera /dist
npm run preview    # comprobar el build localmente
```

Despliegue en Hostinger (hosting estático):
1. Subir el **contenido de `/dist`** a `public_html` (Administrador de archivos o FTP).
2. Configurar el dominio definitivo y forzar HTTPS.
3. Actualizar `site` en `astro.config.mjs` y `SITE.url`/`domain` al dominio real, y reconstruir.
4. Formulario: crear cuenta Web3Forms, pegar `access_key` en `src/lib/forms.ts`, reconstruir.
5. Conectar Google Business + Google Search Console y enviar el sitemap.

**Aceptación:** web pública en el dominio, formulario llegando al correo, sitemap enviado.

---

## Pendientes de cliente (🟡 bloquean contenido final)

Recopilar de Diego (cuestionario `preguntas.txt`) para sustituir placeholders:
- Lista definitiva de servicios y cuáles potenciar.
- ¿Urgencias 24h? Años de experiencia. Nº de instalador y categoría.
- Radio real de desplazamiento y pueblos cubiertos.
- Eslogan, tono y referencias visuales.
- Reseñas reales (Google Business), fotos de trabajos, datos fiscales para legales.

---

## Orden sugerido de prompts en terminal

1. “Lee CLAUDE.md y DESIGN_SYSTEM.md. Ejecuta la Fase 1 del ROADMAP: crea los componentes UI base en `@ui`.”
2. “Fase 2: Layout, Header, Footer y botón de WhatsApp según el sistema.”
3. “Fase 3: construye la home sección a sección, en orden.”
4. “Fase 4: páginas de servicios con rutas dinámicas.”
5. “Fase 5: sobre-mí, zona, contacto+formulario, gracias y legales.”
6. “Fase 6: SEO técnico y pulido. Lanza `npm run build` y corrige.”

Tras cada fase: `npm run build` y revisión visual antes de continuar.
