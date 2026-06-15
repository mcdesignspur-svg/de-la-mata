import { Icons, ProduceGlyph, type ProduceKind } from '../../components/primitives';
import { FreshnessBadge } from '../../components/FreshnessBadge';
import type { PatioProfile } from '../../auth/ProfileContext';
import type { FreshnessGrade } from '../../data/products';

const MONTHLY_CAP = 500;

type Listing = {
  kind: ProduceKind;
  name: string;
  qty: string;
  price: string;
  grade: FreshnessGrade;
  status: 'active' | 'sold-out';
};

const listings: Listing[] = [
  { kind: 'quenepa',  name: 'Quenepa criolla', qty: '8 lb',     price: '$3.00/lb', grade: 'A', status: 'active' },
  { kind: 'aguacate', name: 'Aguacate',        qty: '12 u',     price: '$1.20/u',  grade: 'B', status: 'active' },
];

const recentOrders = [
  { id: 'ORD-4018', customer: 'Yari M.',  items: 'Quenepa · 2 lb', amount: '$6.00', status: 'pendiente' as const },
];

const phases: { n: 1 | 2 | 3; label: string; description: string }[] = [
  { n: 1, label: 'Provisional',  description: 'Te registraste y subiste fotos del solar.' },
  { n: 2, label: 'Visto bueno',  description: 'Un Bonafide o gestor de nodo validó la calidad física en el primer recogido.' },
  { n: 3, label: 'Sello firmado', description: 'Un Bonafide otorgó la recomendación oficial — ya apareces como "Validado por [finca]".' },
];

type Phase = 1 | 2 | 3;

export function PatioDashboard({ profile }: { profile: PatioProfile }) {
  // Mock current phase — fresh signups land in Provisional, but for demo we show Phase 2
  const currentPhase = 2 as Phase;
  const monthlyEarned = 142;
  const monthlyPct = Math.min(100, Math.round((monthlyEarned / MONTHLY_CAP) * 100));

  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">Panel · Cosecha de Patio</div>
        <h1 style={{ marginBottom: 8 }}>
          Hola, {profile.name.split(' ')[0]}.
        </h1>
        <p className="lede" style={{ margin: 0 }}>
          Patio en {profile.town}. Recomendado por <strong>{profile.vouchedByName}</strong>.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          <span className="badge" style={{ background: '#FAEBC2', color: '#5a4a2a' }}>
            Cosecha de Patio
          </span>
          {currentPhase >= 3 && (
            <span className="badge badge-organic">
              ✓ Validado por {profile.vouchedByName.split(' ')[1] || 'tu padrino'}
            </span>
          )}
        </div>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <div className="card card-pad" style={{ padding: 20 }}>
          <div className="eyebrow">Círculo de Confianza</div>
          <h2 className="section-title" style={{ marginTop: 6, marginBottom: 16 }}>
            Tu validación está en fase {currentPhase}
          </h2>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
            {[1, 2, 3].map(p => {
              const isActive = p <= currentPhase;
              return (
                <div key={p} style={{
                  flex: 1, height: 6, borderRadius: 100,
                  background: isActive ? 'var(--cosecha)' : 'var(--line)',
                  transition: 'background 200ms',
                }}/>
              );
            })}
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {phases.map(p => {
              const isActive = p.n <= currentPhase;
              const isCurrent = p.n === currentPhase;
              return (
                <div key={p.n} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: 12, borderRadius: 12,
                  background: isCurrent ? 'var(--crema)' : 'transparent',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 100,
                    background: isActive ? 'var(--cosecha)' : 'var(--line)',
                    color: isActive ? '#fff' : 'var(--muted)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                    fontWeight: 700, fontSize: 12,
                    flexShrink: 0,
                  }}>
                    {isActive ? '✓' : p.n}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? 'var(--ink)' : 'var(--muted)' }}>
                      Fase {p.n} · {p.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.5, marginTop: 2 }}>
                      {p.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {currentPhase < 3 && (
            <div style={{
              marginTop: 16, padding: 14, borderRadius: 12,
              background: 'rgba(232, 163, 61, 0.12)',
              border: '1px solid rgba(232, 163, 61, 0.25)',
              fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5,
            }}>
              <strong>Próximo paso:</strong>{' '}
              {currentPhase === 1
                ? 'Lleva tu primera entrega al punto de recogido — el gestor del nodo verifica calidad y te avanza a Fase 2.'
                : `Espera a que ${profile.vouchedByName} firme tu Sello desde su panel — recibirás notificación.`
              }
            </div>
          )}
        </div>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Tope mensual</h2>
        <div className="card card-pad" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--savia)' }}>
                ${monthlyEarned}
                <span style={{ fontSize: 16, color: 'var(--muted)', fontWeight: 400 }}> / ${MONTHLY_CAP}</span>
              </div>
              <div className="eyebrow">vendido este mes</div>
            </div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
              {monthlyPct}% del tope
            </div>
          </div>
          <div style={{
            marginTop: 14, height: 6, background: 'var(--line)', borderRadius: 100, overflow: 'hidden',
          }}>
            <div style={{
              width: `${monthlyPct}%`, height: '100%',
              background: monthlyPct > 80 ? 'var(--tierra)' : 'var(--cosecha)',
              transition: 'width 300ms',
            }}/>
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '12px 0 0', lineHeight: 1.5 }}>
            El Tier Patio tiene un tope de ${MONTHLY_CAP}/mes para mantener simplicidad legal.
            Si lo superas frecuentemente, podemos ayudarte a registrarte como Bonafide.
          </p>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <button type="button" className="card card-pad" style={{
          width: '100%', textAlign: 'left',
          padding: 16, cursor: 'pointer',
          border: '1px dashed var(--maduro)',
          background: '#fff',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: 'var(--maduro)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {Icons.camera(24, '#225A40')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Listar producto del patio</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Foto, cantidad, precio. La IA asigna el grado de frescura automáticamente.
            </div>
          </div>
          {Icons.arrow(16, '#225A40')}
        </button>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <div className="section-header">
          <div>
            <div className="eyebrow">Productos activos</div>
            <h2 className="section-title">En el catálogo</h2>
          </div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
            {listings.length} listado{listings.length === 1 ? '' : 's'}
          </span>
        </div>

        {listings.length === 0 ? (
          <div className="card card-pad" style={{ padding: 24, textAlign: 'center', color: 'var(--muted)' }}>
            Aún no tienes producto en el catálogo. Lista tu primer artículo arriba.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 8 }}>
            {listings.map((l, i) => (
              <div key={i} className="card" style={{
                padding: 14, display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <ProduceGlyph kind={l.kind} size={48}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{l.name}</div>
                    <FreshnessBadge grade={l.grade}/>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                    {l.qty} · {l.price}
                  </div>
                </div>
                <span className="badge badge-organic" style={{ flexShrink: 0 }}>
                  {l.status === 'active' ? '● Activo' : '○ Agotado'}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container" style={{ marginBottom: 80 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Pedidos</h2>
        {recentOrders.length === 0 ? (
          <div className="card card-pad" style={{ padding: 24, textAlign: 'center', color: 'var(--muted)' }}>
            Aún no hay pedidos.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {recentOrders.map(o => (
              <div key={o.id} className="card card-pad" style={{ padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em' }}>{o.id}</div>
                  <span className="badge" style={{ background: 'var(--maduro)', color: 'var(--savia)' }}>{o.status}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>{o.customer}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 4 }}>{o.items}</div>
                <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--savia)', marginTop: 8 }}>{o.amount}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
