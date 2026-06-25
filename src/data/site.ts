// ─────────────────────────────────────────────────────────────────────────────
// DATOS DEL SITIO — Electricidades Diego Velicias
// Fuente ÚNICA de verdad para todo el contenido. Los componentes NO deben
// escribir datos hardcodeados: siempre importar desde aquí.
//
// 🟡 = PLACEHOLDER pendiente de confirmar con el cliente (Diego). Buscar "TODO".
// ✅ = dato confirmado.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name:      'Electricidades Diego Velicias', // ✅
  shortName: 'Diego Velicias',                // ✅
  legalName: 'Diego Velicias',                // 🟡 TODO: ¿autónomo o SL? nombre fiscal
  tagline:   'Electricista autorizado en la comarca de Benavente', // 🟡 confirmar eslogan
  subtagline:'Instalaciones, averías y mantenimiento eléctrico con garantía y trato cercano.',
  description:
    'Electricista autorizado y técnico especialista en Morales del Rey, Valencia de Don Juan y comarca de Benavente. Instalaciones, reparaciones, boletines y mantenimiento eléctrico.',

  phone:        '614 772 633',                     // ✅
  phoneIntl:    '+34614772633',                    // ✅
  email:        'info@diegovelicias.com',          // ✅ principal
  emailAlt:     'diegoveliciaselectricidad@gmail.com', // ✅ secundario
  formEmail:    'diegoveliciaselectricidad@gmail.com', // 🟡 a Gmail por ahora; webmail luego
  horario:      'Lunes a Viernes · 8:00–19:00',    // 🟡 confirmar
  urgencias24h: false,                              // 🟡 confirmar

  baseTowns:    ['Morales del Rey', 'Valencia de Don Juan'], // ✅
  coverageLabel:'Zamora · León',                             // ✅
  coverageArea: 'Comarca de Benavente y alrededores (provincias de Zamora y León)', // ✅

  role:         'Electricista autorizado · Técnico especialista', // ✅
  installerNumber: '', // 🟡 nº instalador + categoría
  yearsExperience: '', // 🟡 años de experiencia

  domain: 'electricidadesvelicias.es', // 🟡 confirmar dominio (Hostinger)
  url:    'https://electricidadesvelicias.es',

  social: {
    instagram: '',      // 🟡
    facebook:  '',      // 🟡
    googleBusiness: '', // 🟡 ficha Google Business (clave SEO local)
  },
} as const;

export const WHATSAPP_MSG =
  'Hola Diego, te escribo desde la web. Me gustaría que me pasaras un presupuesto.';
export const WHATSAPP_URL =
  `https://wa.me/${SITE.phoneIntl.replace('+', '')}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

export const NAV = [
  { label: 'Inicio',    href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Sobre mí',  href: '/sobre-mi' },
  { label: 'Zona',      href: '/zona-de-cobertura' },
  { label: 'Contacto',  href: '/contacto' },
] as const;

// SERVICIOS — `icon` = nombre EXACTO de un icono lucide. `slug` = /servicios/[slug]
export type Servicio = {
  slug: string;
  icon: string;
  titulo: string;
  resumen: string;
  descripcion: string;
  puntos: string[];
  destacado?: boolean;
};

export const SERVICIOS: Servicio[] = [
  {
    slug: 'instalaciones',
    icon: 'PlugZap',
    titulo: 'Instalaciones eléctricas',
    resumen: 'Instalaciones nuevas y reformas para viviendas, locales y naves.',
    descripcion:
      'Realizamos instalaciones eléctricas completas: vivienda nueva, reforma integral, ampliación de cuadro, nuevos puntos de luz y enchufes, todo conforme a normativa.',
    puntos: ['Vivienda nueva y reforma', 'Cuadros eléctricos', 'Puntos de luz y enchufes', 'Iluminación LED'],
    destacado: true,
  },
  {
    slug: 'averias',
    icon: 'TriangleAlert',
    titulo: 'Averías y reparaciones',
    resumen: 'Localizamos y reparamos cualquier fallo eléctrico con rapidez.',
    descripcion:
      'Detección y reparación de averías: cortes de luz, cortocircuitos, diferenciales que saltan, enchufes o puntos sin corriente.',
    puntos: ['Diagnóstico in situ', 'Cortocircuitos', 'Cuadros y diferenciales', 'Reparación inmediata'],
    destacado: true,
  },
  {
    slug: 'boletines',
    icon: 'FileCheck2',
    titulo: 'Boletines y certificados',
    resumen: 'Tramitamos el boletín eléctrico necesario para dar de alta la luz.',
    descripcion:
      'Emisión y tramitación del Certificado de Instalación Eléctrica (boletín) para contratar suministro, reformas o cambios de potencia.',
    puntos: ['Boletín para alta de luz', 'Certificados reglamentarios', 'Cambios de potencia', 'Tramitación incluida'],
  },
  {
    slug: 'mantenimiento',
    icon: 'Wrench',
    titulo: 'Mantenimiento',
    resumen: 'Revisiones periódicas para comunidades, empresas y negocios.',
    descripcion:
      'Contratos y revisiones de mantenimiento eléctrico preventivo para comunidades de vecinos, locales y empresas.',
    puntos: ['Comunidades de vecinos', 'Locales y negocios', 'Revisiones preventivas', 'Atención a incidencias'],
  },
  // 🟡 TODO: ¿Diego ofrece estos? Activar/eliminar según respuestas:
  {
    slug: 'fotovoltaica',
    icon: 'SunMedium',
    titulo: 'Placas solares',
    resumen: 'Autoconsumo fotovoltaico para reducir tu factura.',
    descripcion:
      'Estudio, instalación y legalización de paneles solares para autoconsumo doméstico y de empresa.',
    puntos: ['Estudio de ahorro', 'Instalación completa', 'Legalización', 'Mantenimiento'],
  },
  {
    slug: 'recarga-vehiculo',
    icon: 'CarFront',
    titulo: 'Punto de recarga VE',
    resumen: 'Instalación de cargadores para vehículo eléctrico (wallbox).',
    descripcion:
      'Instalación de puntos de recarga homologados para particulares, garajes comunitarios y empresas.',
    puntos: ['Wallbox homologado', 'Particular y comunidad', 'Tramitación', 'Configuración'],
  },
];

// POR QUÉ ELEGIRNOS  🟡 ajustar a lo que diga Diego
export const VALORES = [
  { icon: 'BadgeCheck', titulo: 'Autorizado y certificado', desc: 'Electricista autorizado y técnico especialista. Trabajos conforme a normativa, con boletín.' },
  { icon: 'Clock',      titulo: 'Rápido y puntual',          desc: 'Llegamos cuando decimos y resolvemos a la primera para que recuperes la luz cuanto antes.' },
  { icon: 'Handshake',  titulo: 'Trato cercano',             desc: 'Te explicamos todo claro, sin tecnicismos ni sorpresas en la factura.' },
  { icon: 'MapPin',     titulo: 'De la zona',                desc: 'Conocemos la comarca y nos desplazamos por Zamora y León.' },
];

// RESEÑAS  🟡 sustituir por reseñas reales (Google Business). No inventar.
export type Resena = { nombre: string; lugar: string; texto: string; estrellas: number };
export const RESENAS: Resena[] = [
  { nombre: 'Pendiente', lugar: 'Benavente', texto: '🟡 Reseña real pendiente de recopilar de Google Business.', estrellas: 5 },
  { nombre: 'Pendiente', lugar: 'Valencia de Don Juan', texto: '🟡 Reseña real pendiente.', estrellas: 5 },
  { nombre: 'Pendiente', lugar: 'Morales del Rey', texto: '🟡 Reseña real pendiente.', estrellas: 5 },
];

// FAQs  🟡 validar con Diego
export const FAQS = [
  { pregunta: '¿Pedís algo por el presupuesto?', respuesta: 'No. El presupuesto es gratuito y sin compromiso.' },
  { pregunta: '¿Hacéis el boletín eléctrico?', respuesta: 'Sí, tramitamos el certificado de instalación eléctrica necesario para dar de alta la luz o para reformas.' },
  { pregunta: '¿A qué zona os desplazáis?', respuesta: 'Trabajamos en la comarca de Benavente y alrededores, entre las provincias de Zamora y León.' },
  { pregunta: '¿Trabajáis con comunidades de vecinos?', respuesta: 'Sí, ofrecemos mantenimiento y reparaciones para comunidades de propietarios.' },
];

// ZONAS DE COBERTURA  🟡 completar pueblos reales
export const ZONAS = [
  'Benavente', 'Morales del Rey', 'Valencia de Don Juan',
  'Santa Cristina de la Polvorosa', 'San Cristóbal de Entreviñas',
];
