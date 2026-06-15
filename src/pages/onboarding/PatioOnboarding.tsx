import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingShell } from './OnboardingShell';
import { ConfirmationCard } from './BonafideOnboarding';
import { Icons } from '../../components/primitives';
import { useProfile, type PatioProfile } from '../../auth/ProfileContext';

const TOTAL_STEPS = 4;

type Draft = {
  name: string;
  email: string;
  phone: string;
  town: string;
  produces: string;
  monthlyEstimate: string;
  vouchedByName: string;
  vouchedByBonafide: string;
};

const empty: Draft = {
  name: '', email: '', phone: '', town: '',
  produces: '', monthlyEstimate: '',
  vouchedByName: '', vouchedByBonafide: '',
};

const monthlyOptions = [
  '$0–$50',
  '$50–$200',
  '$200–$500',
  'No estoy seguro/a',
];

export function PatioOnboarding() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(empty);
  const { setProfile } = useProfile();
  const navigate = useNavigate();

  const update = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }));

  const stepValid = (() => {
    if (step === 1) return draft.name.trim() && draft.email.includes('@') && draft.phone.trim();
    if (step === 2) return draft.town.trim() && draft.produces.trim() && draft.monthlyEstimate;
    if (step === 3) return draft.vouchedByName.trim() && /^PR-?\d{3,}$/i.test(draft.vouchedByBonafide.trim());
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
    const profile: PatioProfile = {
      type: 'patio',
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      town: draft.town.trim(),
      produces: draft.produces.trim(),
      monthlyEstimate: draft.monthlyEstimate,
      vouchedByName: draft.vouchedByName.trim(),
      vouchedByBonafide: draft.vouchedByBonafide.trim().toUpperCase(),
      createdAt: new Date().toISOString(),
    };
    setProfile(profile);
    navigate('/cuenta', { replace: true });
  };

  return (
    <OnboardingShell
      step={step}
      totalSteps={TOTAL_STEPS}
      eyebrow="Cosecha de Patio · Tier 2"
      exitTo="/onboarding"
      title={
        step === 1 ? 'Empecemos por ti.'
        : step === 2 ? 'Cuéntanos del solar.'
        : step === 3 ? '¿Quién te recomienda?'
        : '¡Bienvenida al campo!'
      }
      subtitle={
        step === 1 ? 'Necesitamos cómo contactarte. Solo tres campos.'
        : step === 2 ? 'Esto nos ayuda a entender qué excedente vamos a manejar.'
        : step === 3 ? 'Un Agricultor Bonafide cercano da fe — esto reemplaza el papeleo formal.'
        : <>Coordinamos la validación con {draft.vouchedByName || 'el Bonafide'} y te activamos en menos de una semana.</>
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
            Ir a mi panel
          </button>
        )
      }
    >
      {step === 1 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="p-name">Nombre completo</label>
            <input id="p-name" className="field-input" type="text" autoComplete="name"
              value={draft.name} onChange={e => update({ name: e.target.value })}
              placeholder="Doña Luisa Padilla"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="p-email">Correo</label>
            <input id="p-email" className="field-input" type="email" autoComplete="email" inputMode="email"
              value={draft.email} onChange={e => update({ email: e.target.value })}
              placeholder="luisa@correo.pr"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="p-phone">Teléfono</label>
            <input id="p-phone" className="field-input" type="tel" autoComplete="tel" inputMode="tel"
              value={draft.phone} onChange={e => update({ phone: e.target.value })}
              placeholder="787-555-0149"/>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="p-town">Pueblo · Barrio</label>
            <input id="p-town" className="field-input" type="text"
              value={draft.town} onChange={e => update({ town: e.target.value })}
              placeholder="Camuy · Yeguada"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="p-produces">¿Qué tienes en el patio?</label>
            <textarea id="p-produces" className="field-textarea" rows={3}
              value={draft.produces} onChange={e => update({ produces: e.target.value })}
              placeholder="Tres árboles de quenepa, un palo de aguacate, gallinas que ponen…"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="p-monthly">Estimado mensual de venta</label>
            <select id="p-monthly" className="field-select"
              value={draft.monthlyEstimate} onChange={e => update({ monthlyEstimate: e.target.value })}>
              <option value="">Escoge un rango…</option>
              {monthlyOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', margin: '4px 0 0' }}>
              El tier Patio tiene un tope mensual para mantener simplicidad legal.
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="p-vouched">Bonafide cercano</label>
            <input id="p-vouched" className="field-input" type="text"
              value={draft.vouchedByName} onChange={e => update({ vouchedByName: e.target.value })}
              placeholder="Don Tito Feliciano"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="p-vouched-id">Su número Bonafide</label>
            <input id="p-vouched-id" className="field-input" type="text"
              value={draft.vouchedByBonafide} onChange={e => update({ vouchedByBonafide: e.target.value })}
              placeholder="PR-10427"
              autoCapitalize="characters" autoCorrect="off" spellCheck={false}/>
          </div>

          <div style={{
            background: 'var(--crema)', borderRadius: 12, padding: 14,
            fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5,
          }}>
            <strong>¿Por qué necesitamos esto?</strong> El Tier Patio existe para
            sumar al vecino con árboles del solar sin que tenga que registrarse formalmente.
            Pedimos la recomendación de un Bonafide para mantener trazabilidad y confianza
            entre la comunidad.
          </div>
        </div>
      )}

      {step === 4 && (
        <ConfirmationCard
          tier="Cosecha de Patio"
          summary={[
            ['Nombre', draft.name],
            ['Correo', draft.email],
            ['Pueblo', draft.town],
            ['Produce', draft.produces.length > 60 ? draft.produces.slice(0, 60) + '…' : draft.produces],
            ['Estimado/mes', draft.monthlyEstimate],
            ['Recomendado por', `${draft.vouchedByName} · ${draft.vouchedByBonafide.toUpperCase()}`],
          ]}
          nextSteps={[
            `Contactamos a ${draft.vouchedByName || 'tu recomendante'} para confirmar la recomendación`,
            'Recibirás credenciales del panel cuando confirme (1-7 días)',
            'Una vez activa, listas tu primer producto desde el panel',
          ]}
        />
      )}
    </OnboardingShell>
  );
}
