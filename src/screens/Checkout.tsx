// De La Mata — Checkout con ATH Móvil
import { IOSDevice } from '../canvas/IOSFrame';
import { Icons, ProduceGlyph, type ProduceKind } from '../components/primitives';

const items: { k: ProduceKind; n: string; f: string; q: string; p: string }[] = [
  { k: 'aguacate', n: 'Aguacate criollo', f: 'Hacienda Los Robles', q: '2 lb', p: '$7.00' },
  { k: 'cafe',     n: 'Café de altura',   f: 'Hacienda Los Robles', q: '1 lb', p: '$18.00' },
  { k: 'platano',  n: 'Plátano maduro',   f: 'Conuco Don Tito',     q: '8 u',  p: '$6.00' },
];

const totals: [string, string][] = [
  ['Subtotal', '$31.00'],
  ['Aporte al agricultor', '+$2.00'],
  ['Recogido comunitario', 'Gratis'],
];

export function ScreenCheckout() {
  return (
    <IOSDevice width={390} height={844}>
      <div style={{ padding: '58px 20px 16px', background: '#FBF8F1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 100, background: '#fff',
          border: '1px solid rgba(34,90,64,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#225A40" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
        </div>
        <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Pagar</div>
        <div style={{ width: 38 }}/>
      </div>

      <div style={{ background: '#FBF8F1', padding: '6px 20px 140px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 4, border: '1px solid rgba(34,90,64,0.06)' }}>
          {items.map((it, i, arr) => (
            <div key={i} style={{
              padding: 12, display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < arr.length - 1 ? '1px solid rgba(34,90,64,0.06)' : 'none',
            }}>
              <ProduceGlyph kind={it.k} size={48}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{it.n}</div>
                <div style={{ fontSize: 11, color: '#6b7a6b' }}>{it.f} · {it.q}</div>
              </div>
              <div className="serif" style={{ fontSize: 16, fontWeight: 500, color: '#225A40' }}>{it.p}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Recogido</div>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 14,
            border: '1px solid rgba(34,90,64,0.06)',
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: '#F7F1E3',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {Icons.pin(20, '#B8623A')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Iglesia San Felipe</div>
              <div style={{ fontSize: 12, color: '#6b7a6b', marginTop: 2 }}>
                Calle Betances · Arecibo · 1.8 mi
              </div>
              <div style={{
                marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 5,
                background: '#E9F0DD', color: '#225A40', padding: '4px 8px',
                borderRadius: 100, fontSize: 11, fontWeight: 600,
              }}>
                {Icons.clock(11, '#225A40')} Sábado · 8–11am
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#225A40', fontWeight: 600 }}>Cambiar</span>
          </div>
        </div>

        <div style={{ marginTop: 16, background: '#fff', padding: 14, borderRadius: 16, border: '1px solid rgba(34,90,64,0.06)' }}>
          {totals.map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: '#3d4a3d' }}>
              <span>{k}</span>
              <span>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: 'rgba(34,90,64,0.08)', margin: '8px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Total</span>
            <span className="serif" style={{ fontSize: 26, fontWeight: 500, color: '#225A40' }}>$33.00</span>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Pagar con</div>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 14,
            border: '2px solid #E8A33D',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: '#E8A33D',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, color: '#225A40', fontWeight: 800, fontSize: 10,
              letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1,
            }}>
              <div>
                ATH
                <div style={{ fontSize: 8, marginTop: 2 }}>MÓVIL</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>ATH Móvil</div>
              <div style={{ fontSize: 12, color: '#6b7a6b' }}>•••• 4521 · Marisol R.</div>
            </div>
            <div style={{
              width: 20, height: 20, borderRadius: 100, background: '#4C9D2F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {Icons.check(12, '#fff')}
            </div>
          </div>
          <div style={{
            marginTop: 8, fontSize: 11, color: '#6b7a6b',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            También aceptamos Instant QR en finca
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 20px 34px',
        background: '#FBF8F1',
        borderTop: '1px solid rgba(34,90,64,0.06)',
        zIndex: 30,
      }}>
        <button className="btn btn-primary" style={{ width: '100%', padding: '16px 20px', borderRadius: 16 }}>
          Confirmar con ATH Móvil · $33.00
        </button>
      </div>
    </IOSDevice>
  );
}
