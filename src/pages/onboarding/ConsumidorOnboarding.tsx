import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingShell } from './OnboardingShell';
import { ConfirmationCard } from './BonafideOnboarding';
import { Icons, ProduceGlyph, type ProduceKind } from '../../components/primitives';
import { categories } from '../../data/products';
import { pickupPoints } from '../../data/pickup-points';
import { useProfile, type ConsumidorProfile } from '../../auth/ProfileContext';

const TOTAL_STEPS = 4;

type Draft = {
  name: string;
  email: string;
  town: string;
  householdSize: string;
  pickupId: string;
  cajitaInterested: boolean;
  interests: ProduceKind[];
};

const empty: Draft = {
  name: '', email: '', town: '',
  householdSize: '2',
  pickupId: pickupPoints[0]?.id ?? '',
  cajitaInterested: true,
  interests: [],
};

export function ConsumidorOnboarding() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(empty);
  const { setProfile } = useProfile();
  const navigate = useNavigate();

  const update = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }));
  const toggleInterest = (k: ProduceKind) =>
    setDraft(d => ({
      ...d,
      interests: d.interests.includes(k)
        ? d.interests.filter(x => x !== k)
        : [...d.interests, k],
    }));

  const stepValid = (() => {
    if (step === 1) return draft.name.trim() && draft.email.includes('@');
    if (step === 2) return draft.town.trim() && Number(draft.householdSize) > 0;
    if (step === 3) return Boolean(draft.pickupId);
    return true;
  })();

  const next = () => {
    if (!stepValid || step >= TOTAL_STEPS) return;
    setStep(s => s + 1);
    window.scrollTo({ top: 0 });
  };
  const back = () => {
    if (step > 1) { setStep(s => s - 1); window.scrollTo({ top: 0 }); }
  };

  const finish = () => {
    const profile: ConsumidorProfile = {
      type: 'consumidor',
      name: draft.name.trim(),
      email: draft.email.trim(),
      town: draft.town.trim(),
      householdSize: Number(draft.householdSize),
      pickupId: draft.pickupId,
      cajitaInterested: draft.cajitaInterested,
      createdAt: new Date().toISOString(),
    };
    setProfile(profile);
    navigate('/cuenta', { replace: true });
  };

  const pickupName = pickupPoints.find(p => p.id === draft.pickupId)?.name ?? '—';

  return (
    <OnboardingShell
      step={step}
      totalSteps={TOTAL_STEPS}
      eyebrow="Consumidor"
      exitTo="/onboarding"
      title={
        step === 1 ? '¿Cómo te llamamos?'
        : step === 2 ? 'Tu hogar.'
        : step === 3 ? 'Cajita y recogido.'
        : '¡Bienvenida!'
      }
      subtitle={
        step === 1 ? 'Solo nombre y correo. Te enviamos confirmaciones de pedido y notificaciones de cajita.'
        : step === 2 ? 'Esto nos ayuda a recomendar la cantidad correcta de cajita y mostrarte fincas cerca.'
        : step === 3 ? 'Escoge tu punto de recogido y decide si te suscribes a la Cajita Local desde el principio.'
        : <>Listo. Si quieres, te llevamos directo a {draft.cajitaInterested ? <strong>tu primera Cajita Local</strong> : <strong>el mercado</strong>}.</>
      }
      footer={
        step < TOTAL_STEPS ? (
          <>
            {step > 1 && (
              <button type="button" className="btn btn-ghost" onClick={back}>Atrás</button>
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={next}
              disabled={!stepValid}
              style={{ flex: 1, opacity: stepValid ? 1 : 0.5 }}
            >
              Continuar {Icons.arrow(16, '#F7F1E3')}
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={finish} style={{ width: '100%' }}>
            {draft.cajitaInterested ? 'Reservar mi primera cajita' : 'Ir al mercado'}
          </button>
        )
      }
    >
      {step === 1 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="c-name">Tu nombre</label>
            <input id="c-name" className="field-input" type="text" autoComplete="name"
              value={draft.name} onChange={e => update({ name: e.target.value })}
              placeholder="Marisol Rivera"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="c-email">Correo</label>
            <input id="c-email" className="field-input" type="email" autoComplete="email" inputMode="email"
              value={draft.email} onChange={e => update({ email: e.target.value })}
              placeholder="tu@correo.pr"/>
          </div>

          <div>
            <div className="field-label" style={{ marginBottom: 8 }}>Lo que más te interesa (opcional)</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map(c => {
                const active = draft.interests.includes(c.kind);
                return (
                  <button
                    key={c.kind}
                    type="button"
                    onClick={() => toggleInterest(c.kind)}
                    className={`chip ${active ? 'active' : ''}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                  >
                    <ProduceGlyph kind={c.kind} size={20}/>
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="c-town">Pueblo</label>
            <input id="c-town" className="field-input" type="text"
              value={draft.town} onChange={e => update({ town: e.target.value })}
              placeholder="Arecibo"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="c-household">Personas en tu hogar</label>
            <input id="c-household" className="field-input" type="number" inputMode="numeric"
              min="1" max="20" step="1"
              value={draft.householdSize} onChange={e => update({ householdSize: e.target.value })}
              placeholder="2"/>
            <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', margin: '4px 0 0' }}>
              {Number(draft.householdSize) <= 2 && 'Sugerimos cajita Pareja · 6 lb'}
              {Number(draft.householdSize) > 2 && Number(draft.householdSize) <= 4 && 'Sugerimos cajita Familia · 12 lb'}
              {Number(draft.householdSize) > 4 && 'Sugerimos cajita Comunidad · 20 lb'}
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="c-pickup">Punto de recogido</label>
            <select id="c-pickup" className="field-select"
              value={draft.pickupId} onChange={e => update({ pickupId: e.target.value })}>
              {pickupPoints.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} · {p.town} · {p.schedule}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <div className="field-label">¿Te suscribes a la Cajita Local?</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => update({ cajitaInterested: true })}
                className={`chip ${draft.cajitaInterested ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                Sí · empezar con cajita
              </button>
              <button
                type="button"
                onClick={() => update({ cajitaInterested: false })}
                className={`chip ${!draft.cajitaInterested ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                Por ahora compras puntuales
              </button>
            </div>
            <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', margin: '8px 0 0' }}>
              Puedes cambiar esto en cualquier momento.
            </p>
          </div>
        </div>
      )}

      {step === 4 && (
        <ConfirmationCard
          tier="Consumidor"
          summary={[
            ['Nombre', draft.name],
            ['Correo', draft.email],
            ['Pueblo', draft.town],
            ['Hogar', `${draft.householdSize} persona${Number(draft.householdSize) === 1 ? '' : 's'}`],
            ['Recogido', pickupName],
            ['Cajita Local', draft.cajitaInterested ? 'Sí, suscripción semanal' : 'No por ahora'],
          ]}
          nextSteps={
            draft.cajitaInterested
              ? [
                  'Te llevamos a escoger el tamaño de tu primera cajita',
                  'Confirmas con ATH Móvil — primer cobro se hace al despachar',
                  'Recoges sábado en el punto que escogiste',
                ]
              : [
                  'Te llevamos al mercado con tus intereses ya filtrados',
                  'Añades productos al carrito y pagas con ATH Móvil',
                  'Recoges en tu punto comunitario los fines de semana',
                ]
          }
        />
      )}
    </OnboardingShell>
  );
}
