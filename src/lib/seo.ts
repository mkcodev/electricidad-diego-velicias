// ─────────────────────────────────────────────────────────────────────────────
// Helpers de SEO: título por defecto y datos estructurados schema.org.
// ─────────────────────────────────────────────────────────────────────────────
import { SITE, ZONAS } from '@data/site';

export function pageTitle(title?: string): string {
  if (!title || title === SITE.name) return `${SITE.name} · ${SITE.role}`;
  return `${title} | ${SITE.shortName}`;
}

// JSON-LD de negocio local (electricista). Mantener sincronizado con site.ts.
export function localBusinessSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: SITE.name,
    url: siteUrl,
    telephone: SITE.phoneIntl,
    email: SITE.email,
    areaServed: ZONAS.map((z) => ({ '@type': 'City', name: z })),
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Zamora / León',
      addressCountry: 'ES',
    },
    priceRange: '€€',
    // 🟡 openingHours: revisar con horario real
    openingHours: 'Mo-Fr 08:00-19:00',
  };
}
