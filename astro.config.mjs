import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// output 'static': HTML estático -> subir /dist a public_html en Hostinger.
export default defineConfig({
  site: 'https://electricidadesvelicias.es', // TODO: dominio real
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap(),
  ],
  build: { inlineStylesheets: 'auto' },
});
