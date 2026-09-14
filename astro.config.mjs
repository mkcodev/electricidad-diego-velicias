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
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
