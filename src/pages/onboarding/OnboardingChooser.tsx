import { Link } from 'react-router-dom';
import { OnboardingShell } from './OnboardingShell';
import { Icons, LeafMark } from '../../components/primitives';

const choices = [
  {
    to: '/onboarding/bonafide',
    eyebrow: 'Tier 1 · Profesional',
    title: 'Soy Agricultor Bonafide',
    description: 'Tengo finca registrada bajo la Ley Núm. 12-2026 y vendo regularmente.',
    bg: 'var(--savia)',
    fg: 'var(--crema)',
    accent: 'var(--maduro)',
    iconBg: 'rgba(247,241,227,0.12)',
    icon: <LeafMark size={32} color="#F7F1E3"/>,
  },
  {
    to: '/onboarding/patio',
    eyebrow: 'Tier 2 · Comunitario',
    title: 'Tengo Cosecha de Patio',
    description: 'Mi solar produce más de lo que consumo — quiero vender el excedente.',
    bg: '#FAEBC2',
    fg: '#5a4a2a',
    accent: '#8a3a1f',
    iconBg: '#fff',
    icon: <LeafMark size={32} color="#7d6a1f"/>,
  },
  {
    to: '/onboarding/consumidor',
    eyebrow: 'Cliente',
    title: 'Quiero comprar producto local',
    description: 'Busco fincas cercanas, suscripción a Cajita Local, y recogido comunitario.',
    bg: '#fff',
    fg: 'var(--ink)',
    accent: 'var(--savia)',
    iconBg: 'var(--crema)',
    icon: <span style={{ color: 'var(--savia)' }}>{Icons.bag(28, '#225A40')}</span>,
  },
];

export function OnboardingChooser() {
  return (
    <OnboardingShell
      eyebrow="Onboarding · 2 minutos"
      title="¿Cómo te sumas al campo?"
      subtitle="Tres caminos en De La Mata, uno para cada perfil. Escoge el tuyo y te guiamos paso a paso."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {choices.map(c => (
          <Link
            key={c.to}
            to={c.to}
            className="onboarding-pick-card"
            style={{
              background: c.bg,
              color: c.fg,
              border: c.bg === '#fff' ? '1px solid var(--line-soft)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="icon" style={{ background: c.iconBg, flexShrink: 0 }}>
                {c.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mono" style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: c.accent,
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  {c.eyebrow}
                </div>
                <div className="serif" style={{
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15,
                  color: c.fg,
                }}>
                  {c.title}
                </div>
                <p style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: c.bg === '#fff' ? 'var(--muted)' : c.fg,
                  opacity: c.bg === '#fff' ? 1 : 0.85,
                  margin: '6px 0 0',
                }}>
                  {c.description}
                </p>
              </div>
              <span style={{ flexShrink: 0, color: c.accent }}>
                {Icons.arrow(20, c.bg === '#fff' ? '#225A40' : (c.accent === 'var(--maduro)' ? '#E8A33D' : '#8a3a1f'))}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', marginTop: 24 }}>
        ¿No estás seguro? Empieza como Consumidor — siempre puedes añadir un perfil de
        agricultor después.
      </p>
    </OnboardingShell>
  );
}
