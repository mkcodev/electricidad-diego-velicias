// ─────────────────────────────────────────────────────────────────────────────
// Helpers de SEO: título por defecto y datos estructurados schema.org.
// ─────────────────────────────────────────────────────────────────────────────
import { SITE, ZONAS, type Servicio } from '@data/site';

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
    // Mantener sincronizado con SITE.horario
    openingHours: 'Mo-Fr 08:00-20:00',
  };
}

// JSON-LD de servicio individual, para páginas /servicios/[slug].
export function serviceSchema(servicio: Servicio, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: servicio.titulo,
    name: servicio.titulo,
    description: servicio.descripcion,
    provider: {
      '@type': 'Electrician',
      name: SITE.name,
      telephone: SITE.phoneIntl,
      email: SITE.email,
    },
    areaServed: ZONAS.map((z) => ({ '@type': 'City', name: z })),
    url: `${siteUrl}/servicios/${servicio.slug}`,
  };
}

// JSON-LD de migas de pan (breadcrumb), para páginas con navegación jerárquica.
export function breadcrumbSchema(items: { name: string; path: string }[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
