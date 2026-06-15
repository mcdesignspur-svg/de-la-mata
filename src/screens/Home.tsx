// De La Mata — Consumer Home / Marketplace
import { IOSDevice } from '../canvas/IOSFrame';
import { LeafMark, Icons, ProduceGlyph, type ProduceKind } from '../components/primitives';
import { TabBar } from '../components/TabBar';

const categories: { k: ProduceKind; l: string }[] = [
  { k: 'aguacate', l: 'Aguacate' },
  { k: 'platano',  l: 'Plátano' },
  { k: 'cafe',     l: 'Café' },
  { k: 'yautia',   l: 'Yautía' },
  { k: 'mango',    l: 'Mango' },
  { k: 'quenepa',  l: 'Quenepa' },
  { k: 'calabaza', l: 'Calabaza' },
  { k: 'lechuga',  l: 'Lechuga' },
];

const products: { k: ProduceKind; n: string; f: string; p: string; u: string; dist: string; hrs: string }[] = [
  { k: 'aguacate', n: 'Aguacate criollo', f: 'Finca Los Robles',     p: '$3.50', u: '/lb', dist: '4.2 mi', hrs: 'cortado hoy 6am' },
  { k: 'platano',  n: 'Plátano maduro',   f: 'Conuco de Don Tito',   p: '$0.75', u: '/u',  dist: '2.1 mi', hrs: 'cortado ayer' },
  { k: 'cafe',     n: 'Café de altura',   f: 'Hacienda Utuado',      p: '$18',   u: '/lb', dist: '28 mi',  hrs: 'tostado el 18' },
  { k: 'yautia',   n: 'Yautía blanca',    f: 'Batey La Ceiba',       p: '$2.80', u: '/lb', dist: '6.8 mi', hrs: 'cosechada ayer' },
];

export function ScreenHome() {
  return (
    <IOSDevice width={390} height={844}>
      <div style={{
        background: '#F7F1E3',
        padding: '58px 20px 18px',
        borderBottom: '1px solid rgba(34,90,64,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LeafMark size={22} color="#225A40"/>
            <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: '#225A40', letterSpacing: '-0.01em' }}>
              De La Mata
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {Icons.pin(16, '#225A40')}
            <span style={{ fontSize: 13, color: '#225A40', fontWeight: 500 }}>Arecibo</span>
          </div>
        </div>

        <div className="serif" style={{ fontSize: 26, lineHeight: 1.15, color: '#1A1F1A', marginBottom: 4 }}>
          Buenos días, Marisol.
        </div>
        <div style={{ fontSize: 14, color: '#6b7a6b' }}>
          14 fincas cerca de ti · cosecha de hoy
        </div>

        <div style={{
          marginTop: 16,
          background: '#fff',
          borderRadius: 14,
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          border: '1px solid rgba(34,90,64,0.08)',
        }}>
          {Icons.search(18, '#6b7a6b')}
          <span style={{ fontSize: 15, color: '#6b7a6b', flex: 1 }}>Buscar yautía, café, mangó…</span>
          {Icons.filter(16, '#225A40')}
        </div>
      </div>

      <div style={{ background: '#FBF8F1', paddingBottom: 90 }}>
        <div style={{ padding: '18px 0 14px' }}>
          <div className="noscroll" style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px' }}>
            {categories.map(c => (
              <div key={c.k} style={{ flexShrink: 0, textAlign: 'center', width: 62 }}>
                <ProduceGlyph kind={c.k} size={56}/>
                <div style={{ fontSize: 11, color: '#3d4a3d', marginTop: 6, fontWeight: 500 }}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '6px 20px 18px' }}>
          <div style={{
            background: '#225A40',
            borderRadius: 18,
            padding: 18,
            color: '#F7F1E3',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', right: -18, top: -14, opacity: 0.18 }}>
              <LeafMark size={150} color="#F7F1E3"/>
            </div>
            <div className="eyebrow" style={{ color: '#E8A33D', marginBottom: 6 }}>
              Cajita Local · CSA
            </div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.2, marginBottom: 4, fontWeight: 500 }}>
              Comparte la cosecha
            </div>
            <div style={{ fontSize: 13, color: 'rgba(247,241,227,0.8)', marginBottom: 14, maxWidth: 230 }}>
              Suscríbete a una cajita semanal y apoya al agricultor antes de la siembra.
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#E8A33D', color: '#225A40',
              padding: '9px 14px', borderRadius: 100,
              fontSize: 13, fontWeight: 600,
            }}>
              Desde $28/semana {Icons.arrow(14, '#225A40')}
            </div>
          </div>
        </div>

        <div style={{ padding: '6px 20px 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div className="eyebrow">Cosecha · 20 abril</div>
            <div className="serif" style={{ fontSize: 20, fontWeight: 500, color: '#1A1F1A', marginTop: 2 }}>
              Fresco de la mata
            </div>
          </div>
          <span style={{ fontSize: 13, color: '#225A40', fontWeight: 500 }}>Ver todo</span>
        </div>

        <div style={{ padding: '8px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {products.map((it, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(34,90,64,0.08)',
            }}>
              <div className="img-placeholder" style={{ height: 110, padding: 0, alignItems: 'center', justifyContent: 'center' }}>
                <ProduceGlyph kind={it.k} size={68}/>
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                  background: 'rgba(255,255,255,0.92)', padding: '3px 6px',
                  color: '#225A40', letterSpacing: '0.04em',
                }}>{it.hrs.toUpperCase()}</div>
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1F1A', marginBottom: 2 }}>{it.n}</div>
                <div style={{ fontSize: 11, color: '#6b7a6b', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {Icons.pin(10, '#6b7a6b')} {it.f} · {it.dist}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div>
                    <span className="serif" style={{ fontSize: 18, fontWeight: 500, color: '#225A40' }}>{it.p}</span>
                    <span style={{ fontSize: 11, color: '#6b7a6b' }}>{it.u}</span>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: '#225A40', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    {Icons.plus(14, '#fff')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="home"/>
    </IOSDevice>
  );
}
