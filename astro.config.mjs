import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// output 'static': HTML estático -> subir /dist a public_html en Hostinger.
export default defineConfig({
  site: 'https://electricidad-diego-velicias.vercel.app', // 🟡 actualizar cuando haya dominio propio (Hostinger)
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      // /gracias es noindex (página de confirmación de formulario): no debe ir en el sitemap.
      filter: (page) => !page.includes('/gracias'),
      lastmod: new Date(),
      xslURL: '/sitemap.xsl',
      serialize(item) {
        const path = new URL(item.url).pathname;
        let priority = 0.6;
        let changefreq = /** @type {const} */ ('monthly');

        if (path === '/') {
          priority = 1.0;
          changefreq = 'weekly';
        } else if (path === '/servicios/') {
          priority = 0.9;
          changefreq = 'weekly';
        } else if (path.startsWith('/servicios/')) {
          priority = 0.8;
        } else if (path === '/contacto/') {
          priority = 0.9;
        } else if (path === '/zona-de-cobertura/') {
          priority = 0.8;
        } else if (path === '/sobre-mi/') {
          priority = 0.6;
        } else if (path.startsWith('/legal/')) {
          priority = 0.2;
          changefreq = 'yearly';
        }

        return { ...item, priority, changefreq };
      },
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
