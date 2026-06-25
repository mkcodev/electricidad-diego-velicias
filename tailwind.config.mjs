/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — Electricidades Diego Velicias
// Fuente de verdad de la identidad visual. NO usar colores/tamaños fuera de aquí.
// Marca: amarillo #F7B904 · negro #1A1A1A · Bebas Neue (display) + Montserrat (UI)
// Cualquier cambio debe reflejarse también en DESIGN_SYSTEM.md
// ─────────────────────────────────────────────────────────────────────────────
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow:        '#F7B904',
          'yellow-dark': '#D99F00',
          'yellow-soft': '#FFF3CC',
          black:         '#1A1A1A',
          white:         '#FFFFFF',
          gray:          '#6B6B6B',
          'gray-light':  '#F2F2F2',
          'gray-border': '#E5E5E5',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans:    ['Montserrat', 'system-ui', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 6rem)',    { lineHeight: '0.95', letterSpacing: '0.01em' }],
        'display-lg': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '0.98', letterSpacing: '0.01em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)',      { lineHeight: '1.0',  letterSpacing: '0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2rem)',    { lineHeight: '1.05', letterSpacing: '0.01em' }],
      },
      letterSpacing: { display: '0.01em', wide: '0.04em', wider: '0.08em' },
      borderRadius: { card: '1rem', btn: '0.625rem' },
      boxShadow: {
        card:         '0 4px 20px 0 rgba(26,26,26,0.08)',
        'card-hover': '0 12px 32px 0 rgba(26,26,26,0.14)',
        yellow:       '0 8px 24px -4px rgba(247,185,4,0.45)',
      },
      maxWidth: { content: '1200px' },
      spacing: { section: '6rem', 'section-sm': '4rem' },
      transitionTimingFunction: { smooth: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(0.95)', opacity: '0.7' },
          '70%':  { transform: 'scale(1.3)',  opacity: '0' },
          '100%': { transform: 'scale(1.3)',  opacity: '0' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s cubic-bezier(0.4,0,0.2,1) both',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};
