import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LeafMark, Icons, ProduceGlyph } from '../components/primitives';
import { ProductCard } from '../components/ProductCard';
import { products, categories } from '../data/products';
import { farms } from '../data/farms';
import { useProfile } from '../auth/ProfileContext';
import type { ProduceKind } from '../components/primitives';

export function HomePage() {
  const [filter, setFilter] = useState<ProduceKind | 'all'>('all');
  const [query, setQuery] = useState('');
  const { profile } = useProfile();
  const firstName = profile?.name.split(' ')[0];
  const greeting = firstName ? `Buenos días, ${firstName}.` : 'Buenos días.';

  const filtered = useMemo(() => {
    let list = products;
    if (filter !== 'all') list = list.filter(p => p.kind === filter);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.farmSlug.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, query]);

  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">Cosecha · 20 abril</div>
        <h1>{greeting}<br/>Hoy hay 14 fincas cerca.</h1>
        <p className="lede">
          Producto puertorriqueño cortado esta semana, directo del agricultor.
          Sin cadenas de supermercado, sin viajes de 4,000 millas, sin intermediarios.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          {!profile && (
            <Link to="/onboarding" className="btn btn-primary">
              Crear cuenta {Icons.arrow(16, '#F7F1E3')}
            </Link>
          )}
          <Link to="/cajita" className={profile ? 'btn btn-primary' : 'btn btn-ghost'}>
            Explorar Cajita Local
            {profile && Icons.arrow(16, '#F7F1E3')}
          </Link>
          <Link to="/mapa" className="btn btn-ghost">
            Ver mapa de recogidos
          </Link>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <div style={{
          background: '#fff',
          border: '1px solid var(--line-soft)',
          borderRadius: 18,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          {Icons.search(20, '#6b7a6b')}
          <input
            type="search"
            placeholder="Buscar yautía, café, mangó…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontFamily: 'inherit', fontSize: 16, background: 'transparent',
              color: 'var(--ink)',
            }}
          />
          {Icons.filter(18, '#225A40')}
        </div>

        <div className="noscroll" style={{
          display: 'flex', gap: 8, marginTop: 16, overflowX: 'auto', paddingBottom: 4,
        }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`chip ${filter === 'all' ? 'active' : ''}`}
          >
            Todo
          </button>
          {categories.map(c => (
            <button
              key={c.kind}
              type="button"
              onClick={() => setFilter(c.kind)}
              className={`chip ${filter === c.kind ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <ProduceGlyph kind={c.kind} size={20}/>
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <section className="container" style={{ marginBottom: 56 }}>
        <div className="hero-cajita">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="eyebrow" style={{ color: 'var(--maduro)' }}>Cajita Local · CSA</div>
            <h2>Comparte la cosecha</h2>
            <p>
              Suscríbete a una cajita semanal y apoya al agricultor antes de la siembra.
              Recoges en tu iglesia o centro comunitario más cercano.
            </p>
            <Link to="/cajita" className="btn btn-accent" style={{ marginTop: 20 }}>
              Desde $28/semana
              {Icons.arrow(16, '#225A40')}
            </Link>
          </div>
          <div className="deco">
            <LeafMark size={280} color="#F7F1E3"/>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div className="eyebrow">Fresco hoy</div>
            <h2 className="section-title">Lo que está cortando el campo</h2>
          </div>
          <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            {filtered.length} producto{filtered.length === 1 ? '' : 's'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{
            background: '#fff', border: '1px dashed var(--line)',
            borderRadius: 16, padding: 32, textAlign: 'center',
            color: 'var(--muted)',
          }}>
            No hay producto para esa búsqueda — prueba otro cultivo o limpia el filtro.
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </section>

      <section className="container" style={{ marginBottom: 80 }}>
        <div style={{ marginBottom: 16 }}>
          <div className="eyebrow">Fincas Bonafide</div>
          <h2 className="section-title">Conoce a quién te alimenta</h2>
        </div>
        <div style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        }}>
          {farms.map(f => (
            <Link key={f.slug} to={`/finca/${f.slug}`} className="card card-pad" style={{ display: 'block' }}>
              <div className="img-placeholder green" style={{ height: 100, borderRadius: 12, marginBottom: 12 }}/>
              <div className="eyebrow">{f.region} · {f.barrio}</div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', margin: '6px 0 4px' }}>
                {f.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                {f.farmer} · {f.generation}ª generación
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                {f.tier === 'bonafide'
                  ? <span className="badge badge-bonafide">Bonafide</span>
                  : <span className="badge" style={{ background: '#FAEBC2', color: '#5a4a2a' }}>Patio</span>
                }
                {f.organic && <span className="badge badge-organic">Orgánico</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <TriajeExplainer/>

      <MissionSection/>
    </>
  );
}

function TriajeExplainer() {
  const grades = [
    {
      letter: 'A',
      label: 'Grado A',
      tag: 'Premium',
      bg: '#E9F0DD',
      color: '#225A40',
      desc: 'Recién cortado, ventana óptima de consumo. Precio base sin ajuste.',
    },
    {
      letter: 'B',
      label: 'Grado B',
      tag: 'Esta semana',
      bg: '#FAEBC2',
      color: '#7d6a1f',
      desc: 'Buen estado, consumo dentro de la semana. Precio estándar.',
    },
    {
      letter: 'C',
      label: 'Consumo inmediato',
      tag: 'Descuento',
      bg: '#F4D5C2',
      color: '#8a3a1f',
      desc: 'Maduro o con marcas leves — descuento automático para evitar desperdicio.',
    },
  ];

  return (
    <section style={{ background: '#fff', padding: '48px 0', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', marginBottom: 56 }}>
      <div className="container">
        <div className="eyebrow">Sistema · Triaje de Frescura</div>
        <h2 className="section-title" style={{ marginTop: 6, marginBottom: 12 }}>
          Cada cosecha pasa por una IA antes de llegar a la mesa.
        </h2>
        <p style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '60ch', margin: '0 0 32px' }}>
          El agricultor saca una foto al recoger. Nuestro sistema de visión computarizada
          analiza pixeles para detectar madurez, marcas y daños. Con eso asigna un grado
          de frescura (A, B o C) y ajusta el precio automáticamente — premium para lo
          recién cortado, descuento para lo que conviene consumir hoy.
        </p>
        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}>
          {grades.map(g => (
            <div key={g.letter} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 100,
                  background: g.bg, color: g.color,
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  fontWeight: 700, fontSize: 20,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {g.letter}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{g.label}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{g.tag}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '12px 0 0' }}>
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  const stats = [
    { value: '85%', label: 'de los alimentos importados', detail: 'Una isla agrícola comprando comida de afuera.' },
    { value: '$1.4M', label: 'recuperables al año', detail: 'Si cada hogar consume $1 diario en producto local.' },
    { value: '7,300', label: 'empleos rurales potenciales', detail: 'Cada $1 que vuelve al campo emplea a alguien.' },
    { value: '47%', label: 'de hogares rurales sin banda', detail: 'Por eso el sistema funciona offline-first.' },
  ];

  return (
    <section style={{
      background: 'var(--savia)',
      color: 'var(--crema)',
      padding: '56px 0',
      marginBottom: 56,
    }}>
      <div className="container">
        <div className="eyebrow" style={{ color: 'var(--maduro)' }}>Por qué importa</div>
        <h2 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '8px 0 16px',
          color: 'var(--crema)',
        }}>
          Soberanía alimentaria,<br/>medida en números.
        </h2>
        <p style={{
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 1.6,
          color: 'rgba(247,241,227,0.85)',
          maxWidth: '60ch',
          margin: '0 0 36px',
        }}>
          Puerto Rico importa el 85% de su comida — y lo paga en vulnerabilidad cada
          vez que un huracán corta los puertos. De La Mata existe para que cada dólar
          que gastas en producto fresco vuelva al agricultor que lo cultivó, aquí.
        </p>
        <div style={{
          display: 'grid', gap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              borderTop: '1px solid rgba(247,241,227,0.2)',
              paddingTop: 16,
            }}>
              <div className="serif" style={{
                fontSize: 'clamp(36px, 6vw, 56px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'var(--maduro)',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--crema)', marginTop: 10 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(247,241,227,0.65)', marginTop: 4, lineHeight: 1.5 }}>
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
