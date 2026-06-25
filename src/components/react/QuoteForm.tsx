import { useState } from 'react';
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT, FORM_SUCCESS_REDIRECT } from '@lib/forms';

// Importar SERVICIOS del sitio — disponible en cliente gracias a importación estática de Astro
const SERVICIOS_SLUGS: { slug: string; titulo: string }[] = [
  { slug: 'instalaciones', titulo: 'Instalaciones eléctricas' },
  { slug: 'averias', titulo: 'Averías y reparaciones' },
  { slug: 'boletines', titulo: 'Boletines y certificados' },
  { slug: 'mantenimiento', titulo: 'Mantenimiento' },
  { slug: 'fotovoltaica', titulo: 'Placas solares' },
  { slug: 'recarga-vehiculo', titulo: 'Punto de recarga VE' },
  { slug: 'otro', titulo: 'Otro / No sé' },
];

type Estado = 'idle' | 'enviando' | 'error';

export default function QuoteForm() {
  const [estado, setEstado] = useState<Estado>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!String(data.get('nombre') ?? '').trim()) errs.nombre = 'El nombre es obligatorio.';
    const tel = String(data.get('telefono') ?? '').trim();
    if (!tel) errs.telefono = 'El teléfono es obligatorio.';
    else if (!/^[0-9+\s\-()]{7,15}$/.test(tel)) errs.telefono = 'Introduce un teléfono válido.';
    if (!String(data.get('servicio') ?? '')) errs.servicio = 'Selecciona un servicio.';
    if (!String(data.get('mensaje') ?? '').trim()) errs.mensaje = 'Cuéntanos qué necesitas.';
    if (!data.get('consentimiento')) errs.consentimiento = 'Debes aceptar la política de privacidad.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get('botcheck')) return;

    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setEstado('enviando');

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        nombre: data.get('nombre'),
        telefono: data.get('telefono'),
        email: data.get('email') || '(no indicado)',
        servicio: data.get('servicio'),
        mensaje: data.get('mensaje'),
      };
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        window.location.href = FORM_SUCCESS_REDIRECT;
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  }

  const err = (field: string) =>
    errors[field] ? (
      <p role="alert" id={`${field}-error`} className="mt-1 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulario de presupuesto">
      {/* Honeypot anti-spam */}
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="label">Nombre *</label>
          <input
            id="nombre" name="nombre" type="text" autoComplete="name"
            className={`input ${errors.nombre ? 'border-red-500' : ''}`}
            placeholder="Tu nombre"
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
            aria-invalid={!!errors.nombre}
          />
          {err('nombre')}
        </div>

        <div>
          <label htmlFor="telefono" className="label">Teléfono *</label>
          <input
            id="telefono" name="telefono" type="tel" autoComplete="tel"
            className={`input ${errors.telefono ? 'border-red-500' : ''}`}
            placeholder="614 772 633"
            aria-describedby={errors.telefono ? 'telefono-error' : undefined}
            aria-invalid={!!errors.telefono}
          />
          {err('telefono')}
        </div>

        <div>
          <label htmlFor="email" className="label">Email <span className="text-brand-gray font-normal">(opcional)</span></label>
          <input
            id="email" name="email" type="email" autoComplete="email"
            className="input"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="servicio" className="label">¿Qué necesitas? *</label>
          <select
            id="servicio" name="servicio"
            className={`input ${errors.servicio ? 'border-red-500' : ''}`}
            aria-describedby={errors.servicio ? 'servicio-error' : undefined}
            aria-invalid={!!errors.servicio}
            defaultValue=""
          >
            <option value="" disabled>Selecciona un servicio…</option>
            {SERVICIOS_SLUGS.map((s) => (
              <option key={s.slug} value={s.titulo}>{s.titulo}</option>
            ))}
          </select>
          {err('servicio')}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="mensaje" className="label">Cuéntame qué necesitas *</label>
        <textarea
          id="mensaje" name="mensaje" rows={4}
          className={`input resize-none ${errors.mensaje ? 'border-red-500' : ''}`}
          placeholder="Describe brevemente la situación o el trabajo que necesitas…"
          aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
          aria-invalid={!!errors.mensaje}
        />
        {err('mensaje')}
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox" name="consentimiento"
            className="mt-1 w-4 h-4 accent-brand-yellow flex-shrink-0"
            aria-describedby={errors.consentimiento ? 'consentimiento-error' : undefined}
            aria-invalid={!!errors.consentimiento}
          />
          <span className="text-sm text-brand-gray">
            He leído y acepto la{' '}
            <a href="/privacidad" className="text-brand-black font-semibold underline hover:text-brand-yellow-dark transition-colors">
              política de privacidad
            </a>
            . *
          </span>
        </label>
        {err('consentimiento')}
      </div>

      {estado === 'error' && (
        <div role="alert" className="mt-4 px-4 py-3 rounded-btn bg-red-50 border border-red-200 text-sm text-red-700">
          Ha ocurrido un error al enviar el formulario. Por favor, llámame al{' '}
          <a href="tel:+34614772633" className="font-bold underline">614 772 633</a>.
        </div>
      )}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="btn-primary mt-6 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        aria-live="polite"
      >
        {estado === 'enviando' ? 'Enviando…' : 'Enviar solicitud'}
      </button>

      <p className="mt-3 text-xs text-brand-gray text-center">
        Respondo en el menor tiempo posible. El presupuesto es gratuito y sin compromiso.
      </p>
    </form>
  );
}
