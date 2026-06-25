// ─────────────────────────────────────────────────────────────────────────────
// Configuración del formulario de presupuesto (envío client-side).
// Web3Forms (https://web3forms.com): gratis, sin servidor. Los correos llegan
// a SITE.formEmail. Crear cuenta y pegar la access_key abajo.
// ─────────────────────────────────────────────────────────────────────────────

// 🟡 TODO: pegar la access_key real de Web3Forms (https://web3forms.com/#features)
export const WEB3FORMS_ACCESS_KEY = 'TODO-WEB3FORMS-ACCESS-KEY';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// Página a la que se redirige tras un envío correcto.
export const FORM_SUCCESS_REDIRECT = '/gracias';

export type QuoteFormData = {
  nombre: string;
  telefono: string;
  email?: string;
  servicio: string; // slug de SERVICIOS
  mensaje: string;
  consentimiento: boolean; // RGPD — obligatorio
  // honeypot anti-spam (debe ir vacío)
  botcheck?: string;
};
