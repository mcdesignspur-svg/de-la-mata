import { Link } from 'react-router-dom';
import { Icons, ProduceGlyph, type ProduceKind } from '../../components/primitives';
import { FreshnessBadge } from '../../components/FreshnessBadge';
import type { BonafideProfile } from '../../auth/ProfileContext';
import type { FreshnessGrade } from '../../data/products';

type Harvest = {
  kind: ProduceKind;
  name: string;
  qty: string;
  time: string;
  amount: string;
  sync: 'pending' | 'synced';
  grade: FreshnessGrade;
};

const recentHarvests: Harvest[] = [
  { kind: 'platano',  name: 'Plátano maduro',   qty: '42 racimos', time: '6:15 am', amount: '$31.50', sync: 'pending', grade: 'A' },
  { kind: 'aguacate', name: 'Aguacate criollo', qty: '18 lb',      time: '7:02 am', amount: '$63.00', sync: 'pending', grade: 'A' },
  { kind: 'yautia',   name: 'Yautía blanca',    qty: '8 lb',       time: '7:48 am', amount: '$22.40', sync: 'pending', grade: 'B' },
  { kind: 'cafe',     name: 'Café pilón',       qty: '4 lb',       time: 'ayer',    amount: '$72.00', sync: 'synced',  grade: 'A' },
];

const pendingOrders = [
  { id: 'ORD-4012', customer: 'Marisol R.', items: 'Aguacate · Plátano · Café', amount: '$33.00', pickup: 'Iglesia San Felipe', when: 'sábado 8–11am' },
  { id: 'ORD-4015', customer: 'Carlos D.',  items: 'Yautía · Calabaza',         amount: '$18.50', pickup: 'Plaza de Utuado',     when: 'domingo 7–1pm' },
];

const ahijados = [
  {
    name: 'Patio de Doña Luisa',
    farmer: 'Doña Luisa Padilla',
    town: 'Camuy · Yeguada',
    phase: 2 as const,
    products: 2,
  },
];

const phaseLabels: Record<1 | 2 | 3, { label: string; color: string }> = {
  1: { label: 'Provisional',   color: 'var(--tierra)' },
  2: { label: 'Visto bueno',   color: 'var(--maduro)' },
  3: { label: 'Sello firmado', color: 'var(--cosecha)' },
};

export function BonafideDashboard({ profile }: { profile: BonafideProfile }) {
  const isLeader = ahijados.length > 0;

  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">Panel · Bonafide</div>
        <h1 style={{ marginBottom: 8 }}>
          Hola, {profile.name.split(' ')[0]}.
        </h1>
        <p className="lede" style={{ margin: 0 }}>
          {profile.farmName} · {profile.town} · {profile.cuerdas} cuerdas
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          <span className="badge badge-bonafide">{Icons.check(11, '#E8A33D')} Bonafide · {profile.bonafideId}</span>
          {isLeader && (
            <span className="badge" style={{ background: 'var(--maduro)', color: 'var(--savia)' }}>
              ★ Líder Comunitario
            </span>
          )}
        </div>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <div style={{
          display: 'grid', gap: 12,
          gridTemplateColumns: 'repeat(3, 1fr)',
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
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <button type="button" className="card card-pad" style={{
          width: '100%', textAlign: 'left',
          padding: 16, cursor: 'pointer',
          border: '1px dashed var(--cosecha)',
          background: '#fff',
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
              Toma foto, anota cantidad. La IA asigna grado de frescura y se sincroniza al detectar señal.
            </div>
          </div>
          {Icons.arrow(16, '#225A40')}
        </button>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <div className="section-header">
          <div>
            <div className="eyebrow">Cuaderno · 20 abr</div>
            <h2 className="section-title">Cosecha de hoy</h2>
          </div>
          <span style={{
            fontSize: 11, color: 'var(--tierra)', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            ↻ 3 entradas pendientes
          </span>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {recentHarvests.map((it, i) => (
            <div key={i} className="card" style={{
              padding: 14, display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <ProduceGlyph kind={it.kind} size={48}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{it.name}</div>
                  <FreshnessBadge grade={it.grade}/>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {it.qty} · {it.time}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="serif" style={{ fontSize: 17, fontWeight: 500, color: 'var(--savia)' }}>{it.amount}</div>
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
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Pedidos pendientes</h2>
        {pendingOrders.length === 0 ? (
          <div className="card card-pad" style={{ padding: 24, textAlign: 'center', color: 'var(--muted)' }}>
            No hay pedidos pendientes. Buen trabajo.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {pendingOrders.map(o => (
              <div key={o.id} className="card card-pad" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em' }}>{o.id}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{o.customer}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 4 }}>{o.items}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {Icons.pin(11, '#6b7a6b')} {o.pickup} · {o.when}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--savia)' }}>{o.amount}</div>
                  <button type="button" className="btn btn-ghost" style={{ marginTop: 8, padding: '8px 14px', fontSize: 13 }}>
                    Empacar {Icons.arrow(14, '#225A40')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <div className="section-header">
          <div>
            <div className="eyebrow">Círculo de Confianza</div>
            <h2 className="section-title">Mis ahijados Patio</h2>
          </div>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
            {ahijados.length} micro-productor{ahijados.length === 1 ? '' : 'es'}
          </span>
        </div>

        {ahijados.length === 0 ? (
          <div className="card card-pad" style={{ padding: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: '50ch', margin: '0 auto 16px' }}>
              Aún no validas a ningún productor de patio. Apadrina vecinos con árboles
              o huertos caseros — cada validación suma a tu insignia de Líder Comunitario.
            </p>
            <button type="button" className="btn btn-ghost">
              Cómo apadrinar a un vecino
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {ahijados.map(a => {
              const phase = phaseLabels[a.phase];
              return (
                <div key={a.name} className="card card-pad" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: '#FAEBC2',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: 22,
                    }}>🏡</div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{a.farmer} · {a.town}</div>
                    </div>
                    <span className="badge" style={{ background: phase.color, color: '#fff' }}>
                      Fase {a.phase} · {phase.label}
                    </span>
                  </div>
                  <div style={{
                    marginTop: 14, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap',
                  }}>
                    <div style={{
                      flex: 1, minWidth: 200,
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      {[1, 2, 3].map(p => (
                        <div key={p} style={{
                          flex: 1, height: 4, borderRadius: 100,
                          background: p <= a.phase ? phase.color : 'var(--line)',
                        }}/>
                      ))}
                    </div>
                    {a.phase === 2 && (
                      <button type="button" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }}>
                        Firmar Sello {Icons.arrow(14, '#F7F1E3')}
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
                    {a.products} producto{a.products === 1 ? '' : 's'} en venta
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="container" style={{ marginBottom: 80 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Próximo payout</h2>
        <div className="card card-pad" style={{
          padding: 20,
          background: 'var(--crema)',
          display: 'grid', gap: 16,
          gridTemplateColumns: 'auto 1fr',
          alignItems: 'center',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: 'var(--maduro)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--savia)', fontWeight: 800, fontSize: 11,
            letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1,
          }}>
            <div>ATH<br/><span style={{ fontSize: 9 }}>BUSINESS</span></div>
          </div>
          <div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--savia)' }}>$728.45</div>
            <div className="eyebrow">disponible · viernes</div>
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13, color: 'var(--ink-soft)', borderTop: '1px solid var(--line-soft)', paddingTop: 14 }}>
            <span>Comisión escalonada · 15% (este mes)</span>
            <span className="mono">$847 brutos · −$118.55 · = $728.45</span>
          </div>
        </div>
      </section>
    </>
  );
}
