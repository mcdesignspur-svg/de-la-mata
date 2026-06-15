import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingShell } from './OnboardingShell';
import { Icons } from '../../components/primitives';
import { useProfile, type BonafideProfile } from '../../auth/ProfileContext';

const TOTAL_STEPS = 4;

type Draft = {
  name: string;
  email: string;
  phone: string;
  farmName: string;
  town: string;
  cuerdas: string;
  bonafideId: string;
};

const empty: Draft = {
  name: '', email: '', phone: '',
  farmName: '', town: '', cuerdas: '',
  bonafideId: '',
};

export function BonafideOnboarding() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>(empty);
  const { setProfile } = useProfile();
  const navigate = useNavigate();

  const update = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }));

  const stepValid = (() => {
    if (step === 1) return draft.name.trim() && draft.email.includes('@') && draft.phone.trim();
    if (step === 2) return draft.farmName.trim() && draft.town.trim() && Number(draft.cuerdas) > 0;
    if (step === 3) return /^PR-?\d{3,}$/i.test(draft.bonafideId.trim());
    return true;
  })();

  const next = () => {
    if (!stepValid) return;
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const back = () => {
    if (step > 1) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0 });
    }
  };

  const finish = () => {
    const profile: BonafideProfile = {
      type: 'bonafide',
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      farmName: draft.farmName.trim(),
      town: draft.town.trim(),
      cuerdas: Number(draft.cuerdas),
      bonafideId: draft.bonafideId.trim().toUpperCase(),
      createdAt: new Date().toISOString(),
    };
    setProfile(profile);
    navigate('/cuenta', { replace: true });
  };

  return (
    <OnboardingShell
      step={step}
      totalSteps={TOTAL_STEPS}
      eyebrow="Bonafide · Tier 1"
      exitTo="/onboarding"
      title={
        step === 1 ? 'Empecemos por ti.'
        : step === 2 ? 'Háblanos de la finca.'
        : step === 3 ? 'Validamos tu Bonafide.'
        : '¡Bienvenido al campo!'
      }
      subtitle={
        step === 1 ? 'Necesitamos cómo contactarte. Solo tres campos.'
        : step === 2 ? 'Esto aparece en tu perfil público de finca.'
        : step === 3 ? 'Buscamos tu número en el registro de Ley Núm. 12-2026.'
        : <>Validamos tu Bonafide y enviamos credenciales del panel a <strong>{draft.email}</strong> en menos de 72 horas.</>
      }
      footer={
        step < TOTAL_STEPS ? (
          <>
            {step > 1 && (
              <button type="button" className="btn btn-ghost" onClick={back}>
                Atrás
              </button>
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
            <label className="field-label" htmlFor="b-name">Nombre completo</label>
            <input id="b-name" className="field-input" type="text" autoComplete="name"
              value={draft.name} onChange={e => update({ name: e.target.value })}
              placeholder="Don Tito Feliciano"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="b-email">Correo</label>
            <input id="b-email" className="field-input" type="email" autoComplete="email" inputMode="email"
              value={draft.email} onChange={e => update({ email: e.target.value })}
              placeholder="tito@delamata.pr"/>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="b-phone">Teléfono</label>
            <input id="b-phone" className="field-input" type="tel" autoComplete="tel" inputMode="tel"
              value={draft.phone} onChange={e => update({ phone: e.target.value })}
              placeholder="787-555-0142"/>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="b-farm">Nombre de la finca</label>
            <input id="b-farm" className="field-input" type="text"
              value={draft.farmName} onChange={e => update({ farmName: e.target.value })}
              placeholder="Hacienda Los Robles"/>
          </div>
          <div className="onboarding-field-grid two-col" style={{ display: 'contents' }}>
            <div className="field">
              <label className="field-label" htmlFor="b-town">Pueblo · Barrio</label>
              <input id="b-town" className="field-input" type="text"
                value={draft.town} onChange={e => update({ town: e.target.value })}
                placeholder="Utuado · Caguana"/>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="b-cuerdas">Cuerdas en producción</label>
              <input id="b-cuerdas" className="field-input" type="number" inputMode="numeric"
                min="1" step="1"
                value={draft.cuerdas} onChange={e => update({ cuerdas: e.target.value })}
                placeholder="32"/>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="onboarding-field-grid">
          <div className="field">
            <label className="field-label" htmlFor="b-bonafide">Número Bonafide</label>
            <input id="b-bonafide" className="field-input" type="text"
              value={draft.bonafideId} onChange={e => update({ bonafideId: e.target.value })}
              placeholder="PR-10427"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}/>
            <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', margin: '4px 0 0' }}>
              Formato: PR-XXXXX · 3+ dígitos
            </p>
          </div>

          <div style={{
            background: 'var(--crema)', borderRadius: 12, padding: 14,
            fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5,
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <span style={{ color: 'var(--savia)', flexShrink: 0, marginTop: 2 }}>
              {Icons.check(16, '#225A40')}
            </span>
            <span>
              Si no recuerdas tu número, está en tu carta de registro Bonafide o
              puedes pedirlo a Agricultura. Verificamos manualmente antes de activar
              la cuenta — esto toma 24-72h.
            </span>
          </div>
        </div>
      )}

      {step === 4 && (
        <ConfirmationCard
          tier="Bonafide"
          summary={[
            ['Nombre', draft.name],
            ['Correo', draft.email],
            ['Finca', draft.farmName],
            ['Pueblo', draft.town],
            ['Cuerdas', draft.cuerdas],
            ['Bonafide', draft.bonafideId.toUpperCase()],
          ]}
          nextSteps={[
            'Validamos tu número en el registro de Ley 12-2026',
            'Recibirás credenciales del panel por correo (24-72h)',
            'Una vez activo, registras tu primera cosecha desde el conuco',
          ]}
        />
      )}
    </OnboardingShell>
  );
}

export function ConfirmationCard({
  tier, summary, nextSteps,
}: { tier: string; summary: [string, string][]; nextSteps: string[] }) {
  return (
    <>
      <div className="card" style={{
        background: 'rgba(76, 157, 47, 0.08)',
        border: '1px solid rgba(76, 157, 47, 0.3)',
        padding: 20,
      }}>
        <div className="eyebrow" style={{ color: 'var(--cosecha-deep)' }}>✓ Solicitud lista</div>
        <div className="serif" style={{ fontSize: 22, fontWeight: 500, marginTop: 4 }}>
          Te activamos como {tier}
        </div>
        <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
          {summary.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 16 }}>
              <span style={{ color: 'var(--muted)' }}>{k}</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{v || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card card-pad" style={{ padding: 20 }}>
        <div className="eyebrow">Qué sigue</div>
        <ol style={{ paddingLeft: 20, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {nextSteps.map((s, i) => (
            <li key={i} style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{s}</li>
          ))}
        </ol>
      </div>
    </>
  );
}
