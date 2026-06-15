import { Link } from 'react-router-dom';
import { Icons, ProduceGlyph, type ProduceKind } from '../components/primitives';
import type { FarmTier } from '../data/farms';

const harvests: { kind: ProduceKind; n: string; q: string; t: string; p: string; sync: 'pending' | 'synced' }[] = [
  { kind: 'platano',  n: 'Plátano maduro',   q: '42 racimos', t: '6:15 am', p: '$31.50', sync: 'pending' },
  { kind: 'aguacate', n: 'Aguacate criollo', q: '18 lb',      t: '7:02 am', p: '$63.00', sync: 'pending' },
  { kind: 'yautia',   n: 'Yautía blanca',    q: '8 lb',       t: '7:48 am', p: '$22.40', sync: 'pending' },
  { kind: 'cafe',     n: 'Café pilón',       q: '4 lb',       t: 'ayer',    p: '$72.00', sync: 'synced' },
];

const tiers: {
  id: FarmTier;
  label: string;
  tagline: string;
  bullets: string[];
  bg: string;
  fg: string;
  accent: string;
}[] = [
  {
    id: 'bonafide',
    label: 'Agricultor Bonafide',
    tagline: 'Para fincas registradas bajo la Ley Núm. 12-2026.',
    bullets: [
      'Sin límite mensual de venta',
      'Acceso a incentivos gubernamentales y exenciones contributivas',
      'Comisión escalonada · 15% (< $10k) hasta 10% (> $50k)',
      'Onboarding: validamos tu número en el registro Bonafide',
    ],
    bg: 'var(--savia)',
    fg: 'var(--crema)',
    accent: 'var(--maduro)',
  },
  {
    id: 'patio',
    label: 'Cosecha de Patio',
    tagline: 'Para vecinos con árboles y excedentes en casa.',
    bullets: [
      'Solo necesitas ID local + validación comunitaria (un Bonafide cercano da fe)',
      'Tope mensual de venta para mantener simplicidad legal',
      'Mismo % de comisión, sin trámites contributivos extra',
      'Onboarding: foto del solar + recomendación de un Bonafide',
    ],
    bg: '#FAEBC2',
    fg: '#5a4a2a',
    accent: '#8a3a1f',
  },
];

export function AgricultoresPage() {
  return (
    <>
      <section className="page-hero-dark deeper">
        <div className="agri-banner">
          {Icons.wifi(14, '#F7F1E3')} Diseñado para offline · 47% de hogares rurales no tienen banda ancha
        </div>
        <div className="container" style={{ position: 'relative', paddingTop: 28 }}>
          <div className="eyebrow" style={{ color: 'var(--maduro)' }}>Para agricultores</div>
          <h1>El campo importa.<br/>La señal no.</h1>
          <p>
            Registra tu cosecha desde el conuco — sin señal, sin app store, sin formularios
            burocráticos. La sincronización ocurre cuando llegas a un punto con internet.
          </p>
        </div>
      </section>

      <section className="container" style={{ marginTop: 48, marginBottom: 64 }}>
        <div className="eyebrow">Dos caminos a la red</div>
        <h2 className="section-title" style={{ marginTop: 6, marginBottom: 8 }}>
          Bonafide o Cosecha de Patio.
        </h2>
        <p style={{
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
          maxWidth: '60ch',
          margin: '0 0 28px',
        }}>
          La Ley Núm. 12-2026 abrió el registro Bonafide a fincas profesionales.
          Pero también queremos en la red al vecino que vende quenepas del árbol del patio,
          y a la abuela con un canasto de huevos. Por eso tenemos dos perfiles diferenciados.
        </p>

        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}>
          {tiers.map(t => (
            <div key={t.id} style={{
              background: t.bg,
              color: t.fg,
              borderRadius: 20,
              padding: 24,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div className="mono" style={{ fontSize: 11, color: t.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {t.id === 'bonafide' ? 'Tier 1 · Profesional' : 'Tier 2 · Comunitario'}
              </div>
              <div className="serif" style={{
                fontSize: 'clamp(22px, 2.6vw, 28px)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                margin: '8px 0 8px',
                color: t.fg,
              }}>
                {t.label}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.5, opacity: 0.85, margin: '0 0 16px' }}>
                {t.tagline}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {t.bullets.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.5 }}>
                    <span style={{
                      color: t.accent, fontWeight: 700, flexShrink: 0,
                      marginTop: 2, fontSize: 14, lineHeight: 1,
                    }}>
                      ✦
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/onboarding/${t.id}`}
                className="btn"
                style={{
                  marginTop: 20,
                  background: t.id === 'bonafide' ? 'var(--maduro)' : 'var(--savia)',
                  color: t.id === 'bonafide' ? 'var(--savia)' : 'var(--crema)',
                  width: '100%',
                }}
              >
                Empezar onboarding {t.label} {Icons.arrow(16, t.id === 'bonafide' ? '#225A40' : '#F7F1E3')}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ marginBottom: 64 }}>
        <div className="eyebrow">Vista previa · panel del agricultor</div>
        <h2 className="section-title" style={{ marginTop: 6, marginBottom: 24 }}>
          Cómo se ve un día normal
        </h2>

        <div style={{
          display: 'grid', gap: 12,
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginBottom: 24,
        }}>
          {[
            { v: '$847', u: 'esta semana', c: 'var(--maduro)' },
            { v: '23',   u: 'pedidos',     c: 'var(--cosecha)' },
            { v: '12',   u: 'en cosecha',  c: 'var(--savia)' },
          ].map((s, i) => (
            <div key={i} className="card card-pad kpi-card">
              <div className="serif kpi-value" style={{ color: s.c }}>{s.v}</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>{s.u}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div className="card card-pad" style={{
            padding: 16,
            border: '1px dashed var(--cosecha)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: 'var(--cosecha)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {Icons.camera(24, '#fff')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Registrar cosecha de hoy</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Toma foto, anota cantidad, marca cultivo. La IA asigna grado de frescura
                y se sincroniza al encontrar señal.
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <div className="eyebrow">Cuaderno · 20 abr</div>
              <span style={{
                fontSize: 11, color: 'var(--tierra)', fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>
                ↻ 3 entradas pendientes de sincronizar
              </span>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {harvests.map((it, i) => (
                <div key={i} className="card" style={{
                  padding: 14, display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <ProduceGlyph kind={it.kind} size={48}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{it.n}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{it.q} · {it.t}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div className="serif" style={{ fontSize: 17, fontWeight: 500, color: 'var(--savia)' }}>{it.p}</div>
                    <div style={{
                      fontSize: 10, fontWeight: 600,
                      color: it.sync === 'pending' ? 'var(--tierra)' : 'var(--cosecha)',
                    }}>
                      {it.sync === 'pending' ? '● en cola' : '✓ sincronizada'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 64 }}>
        <h2 className="section-title" style={{ marginBottom: 24 }}>
          Cómo funciona
        </h2>
        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}>
          {[
            {
              n: '01',
              t: 'Validamos tu acceso',
              d: 'Si eres Bonafide, buscamos tu número en el registro de Ley 12-2026. Si eres Patio, una vecina o vecino Bonafide te recomienda.',
            },
            {
              n: '02',
              t: 'Registras desde el conuco',
              d: 'La app guarda todo localmente. Cuando llegas a señal, sube cosechas, pedidos, y fotos al sistema de Triaje de Frescura automáticamente.',
            },
            {
              n: '03',
              t: 'Cobras sin intermediarios',
              d: 'ATH Móvil directo a tu cuenta cuando el QR de entrega se escanea en el punto de recogido. Sin retención, sin esperas de 30 días.',
            },
          ].map(s => (
            <div key={s.n} className="card card-pad" style={{ padding: 20 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--maduro)', letterSpacing: '0.15em' }}>
                {s.n}
              </div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', margin: '8px 0 6px' }}>
                {s.t}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ marginBottom: 80 }}>
        <div className="card card-pad" style={{
          padding: 32,
          background: 'var(--crema)',
          borderRadius: 24,
          border: '1px solid rgba(184,98,58,0.2)',
        }}>
          <div className="eyebrow">Únete</div>
          <h2 className="section-title" style={{ marginTop: 6, marginBottom: 8 }}>
            Empieza tu onboarding
          </h2>
          <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6, maxWidth: '50ch', marginTop: 0 }}>
            Cuatro pasos guiados, sin contrato de exclusividad, sin cuotas mensuales.
            Escoge el camino correcto y lo terminas en dos minutos.
          </p>

          <div style={{
            display: 'grid', gap: 12, marginTop: 24,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}>
            <Link to="/onboarding/bonafide" className="btn btn-primary" style={{ width: '100%' }}>
              Onboarding Bonafide {Icons.arrow(16, '#F7F1E3')}
            </Link>
            <Link to="/onboarding/patio" className="btn" style={{
              width: '100%',
              background: '#FAEBC2',
              color: '#5a4a2a',
            }}>
              Onboarding Patio {Icons.arrow(16, '#5a4a2a')}
            </Link>
          </div>

          <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 16 }}>
            ¿No estás seguro? <Link to="/onboarding" style={{ color: 'var(--savia)', textDecoration: 'underline' }}>Te ayudamos a escoger</Link>
          </p>
        </div>
      </section>
    </>
  );
}
