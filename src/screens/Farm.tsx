// De La Mata — Farm detail (consumer view)
import { IOSDevice } from '../canvas/IOSFrame';
import { Icons, ProduceGlyph, type ProduceKind } from '../components/primitives';

type FarmProduce = { k: ProduceKind; n: string; s: string };
const inHarvest: FarmProduce[] = [
  { k: 'aguacate', n: 'Aguacate', s: 'listo' },
  { k: 'cafe',     n: 'Café',     s: 'tostado' },
  { k: 'platano',  n: 'Plátano',  s: 'listo' },
  { k: 'yautia',   n: 'Yautía',   s: 'en 2 sem' },
  { k: 'mango',    n: 'Mango',    s: 'en 3 sem' },
];

export function ScreenFarm() {
  return (
    <IOSDevice width={390} height={844}>
      <div style={{ position: 'relative', height: 280, marginTop: -44 }}>
        <div className="img-placeholder warm" style={{
          height: 280, width: '100%', padding: 0,
          alignItems: 'flex-start', justifyContent: 'flex-start',
        }}>
          <svg viewBox="0 0 390 280" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#E8A33D" stopOpacity="0.2"/>
                <stop offset="1" stopColor="#B8623A" stopOpacity="0.15"/>
              </linearGradient>
            </defs>
            <rect width="390" height="280" fill="url(#sky)"/>
            <path d="M0 200 Q 60 160 110 175 Q 170 150 230 180 Q 290 155 390 175 L 390 280 L 0 280 Z" fill="#225A40" opacity="0.55"/>
            <path d="M0 230 Q 80 210 150 220 Q 230 205 300 225 Q 340 218 390 230 L 390 280 L 0 280 Z" fill="#17402d" opacity="0.85"/>
            <g transform="translate(180,180)">
              <ellipse cx="8" cy="0" rx="8" ry="9" fill="#1A1F1A"/>
              <path d="M-2 8 L 18 8 L 16 42 L 0 42 Z" fill="#1A1F1A"/>
              <path d="M-8 22 L -2 14 M 24 22 L 18 14" stroke="#1A1F1A" strokeWidth="3"/>
            </g>
          </svg>

          <div style={{ position: 'absolute', top: 58, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 100,
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#225A40" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
            </div>
            <div style={{
              width: 38, height: 38, borderRadius: 100,
              background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {Icons.heart(18, '#B8623A')}
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: 14, left: 16,
            background: '#225A40', color: '#F7F1E3',
            padding: '6px 10px', borderRadius: 100,
            fontSize: 11, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {Icons.check(12, '#E8A33D')} Agricultor Bonafide · Ley 12-2026
          </div>
        </div>
      </div>

      <div style={{ background: '#FBF8F1', padding: '20px 20px 100px', marginTop: -16, borderRadius: '20px 20px 0 0', position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 6 }}>Utuado · Barrio Caguana</div>
        <div className="serif" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.1, color: '#1A1F1A' }}>
          Hacienda Los Robles
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, fontSize: 13, color: '#3d4a3d' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {Icons.star(12, '#E8A33D')} 4.9 · 142
          </span>
          <span style={{ color: '#6b7a6b' }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#3d4a3d' }}>
            {Icons.pin(12, '#6b7a6b')} 28 mi
          </span>
          <span style={{ color: '#6b7a6b' }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {Icons.leaf(12, '#4C9D2F')} Orgánico
          </span>
        </div>

        <div style={{
          marginTop: 18, background: '#fff', padding: 14, borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 12,
          border: '1px solid rgba(34,90,64,0.08)',
        }}>
          <div style={{
            width: 46, height: 46, borderRadius: 100,
            background: '#E4B892',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 40 40">
              <ellipse cx="20" cy="16" rx="8" ry="9" fill="#6B3E1E"/>
              <path d="M4 40 Q 20 22 36 40 Z" fill="#6B3E1E"/>
              <path d="M8 14 Q 20 4 32 14" stroke="#4C9D2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Don Tito Feliciano</div>
            <div style={{ fontSize: 12, color: '#6b7a6b' }}>Cultivando desde 1987 · 4ta generación</div>
          </div>
          <div style={{
            padding: '8px 12px', borderRadius: 100, background: '#F7F1E3',
            color: '#225A40', fontSize: 12, fontWeight: 600,
          }}>Seguir</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
          {[
            { v: '32', u: 'cuerdas' },
            { v: '18', u: 'cultivos' },
            { v: '214', u: 'cosechas' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', padding: 12, borderRadius: 12, border: '1px solid rgba(34,90,64,0.06)' }}>
              <div className="serif" style={{ fontSize: 22, fontWeight: 500, color: '#225A40' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: '#6b7a6b' }}>{s.u}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>En cosecha</div>
            <span style={{ fontSize: 12, color: '#6b7a6b' }}>cuaderno de campo</span>
          </div>
          <div className="noscroll" style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
            {inHarvest.map((it, i) => (
              <div key={i} style={{ flexShrink: 0, width: 92, background: '#fff', padding: 10, borderRadius: 12, border: '1px solid rgba(34,90,64,0.06)' }}>
                <ProduceGlyph kind={it.k} size={56}/>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{it.n}</div>
                <div style={{ fontSize: 10, color: it.s === 'listo' ? '#4C9D2F' : '#6b7a6b', fontWeight: 500 }}>
                  {it.s === 'listo' ? '● ' : '○ '}{it.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 20px 34px',
        background: 'linear-gradient(180deg, rgba(251,248,241,0) 0%, #FBF8F1 30%)',
        display: 'flex', gap: 10, zIndex: 30,
      }}>
        <button className="btn btn-primary" style={{ flex: 1 }}>
          Comprar en la finca {Icons.arrow(16, '#F7F1E3')}
        </button>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: '#fff', border: '1px solid rgba(34,90,64,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icons.qr(22, '#225A40')}
        </div>
      </div>
    </IOSDevice>
  );
}
