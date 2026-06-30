import { Link, useParams } from 'react-router-dom';
import { Icons, ProduceGlyph } from '../components/primitives';
import { ProductCard } from '../components/ProductCard';
import { getFarmBySlug } from '../data/farms';
import { getProductsByFarm } from '../data/products';

export function FincaPage() {
  const { slug } = useParams();
  const farm = slug ? getFarmBySlug(slug) : undefined;

  if (!farm) {
    return (
      <section className="container page-hero">
        <div className="eyebrow">404 · Finca no encontrada</div>
        <h1>Esa finca no está en nuestro catálogo.</h1>
        <p className="lede">
          Revisa el enlace o vuelve al mercado para ver todas las fincas activas.
        </p>
        <Link to="/mercado" className="btn btn-primary" style={{ marginTop: 16 }}>
          Volver al mercado
        </Link>
      </section>
    );
  }

  const products = getProductsByFarm(farm.slug);

  return (
    <>
      {/* hero */}
      <section style={{
        background: 'linear-gradient(180deg, #F4E8D8 0%, var(--hueso) 100%)',
        padding: '32px 0 0',
      }}>
        <div className="container">
          <Link to="/mercado" style={{ fontSize: 13, color: 'var(--savia)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
            Volver al mercado
          </Link>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginTop: 24,
            alignItems: 'end',
          }}>
            <div>
              <div className="eyebrow">{farm.region} · {farm.barrio}</div>
              <h1 className="serif" style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 500,
                lineHeight: 1.05,
                margin: '8px 0 12px',
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}>{farm.name}</h1>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', fontSize: 14, color: 'var(--ink-soft)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {Icons.star(14, '#E8A33D')} {farm.rating} · {farm.reviews} reseñas
                </span>
                <span style={{ color: 'var(--muted)' }}>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {Icons.pin(14, '#6b7a6b')} {farm.distanceMi} mi
                </span>
                {farm.organic && <>
                  <span style={{ color: 'var(--muted)' }}>·</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {Icons.leaf(14, '#4C9D2F')} Orgánico
                  </span>
                </>}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {farm.tier === 'bonafide'
                  ? <span className="badge badge-bonafide">{Icons.check(11, '#E8A33D')} Bonafide · Ley 12-2026</span>
                  : <span className="badge" style={{ background: '#FAEBC2', color: '#5a4a2a' }}>Cosecha de Patio · validada por la comunidad</span>
                }
                <span className="badge badge-soft">Cultivando desde {farm.since}</span>
                {farm.generation > 0 && <span className="badge badge-soft">{farm.generation}ª generación</span>}
              </div>
            </div>
          </div>

          {/* landscape illustration */}
          <div style={{
            marginTop: 32, height: 200, borderRadius: 16, overflow: 'hidden',
            position: 'relative', background: '#F4E8D8',
          }}>
            <svg viewBox="0 0 1200 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <linearGradient id="finca-sky" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#E8A33D" stopOpacity="0.25"/>
                  <stop offset="1" stopColor="#B8623A" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <rect width="1200" height="280" fill="url(#finca-sky)"/>
              <path d="M0 200 Q 200 150 380 175 Q 540 140 720 180 Q 900 145 1200 175 L 1200 280 L 0 280 Z" fill="#225A40" opacity="0.55"/>
              <path d="M0 230 Q 240 210 460 220 Q 700 200 920 225 Q 1060 218 1200 230 L 1200 280 L 0 280 Z" fill="#17402d" opacity="0.85"/>
            </svg>
          </div>
        </div>
      </section>

      {/* farmer card + stats */}
      <section className="container" style={{ marginTop: 32 }}>
        <div style={{
          display: 'grid', gap: 20,
          gridTemplateColumns: '1fr',
        }}>
          <div className="card card-pad" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 100, background: '#E4B892',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="38" height="38" viewBox="0 0 40 40">
                <ellipse cx="20" cy="16" rx="8" ry="9" fill="#6B3E1E"/>
                <path d="M4 40 Q 20 22 36 40 Z" fill="#6B3E1E"/>
                <path d="M8 14 Q 20 4 32 14" stroke="#4C9D2F" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{farm.farmer}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{farm.bio}</div>
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
          }}>
            {[
              { v: farm.cuerdas,  u: 'cuerdas' },
              { v: farm.crops,    u: 'cultivos' },
              { v: farm.harvests, u: 'cosechas' },
            ].map((s, i) => (
              <div key={i} className="card card-pad">
                <div className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--savia)' }}>{s.v}</div>
                <div className="eyebrow">{s.u}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* story */}
      <section className="container" style={{ marginTop: 32 }}>
        <div className="card card-pad" style={{ padding: 24 }}>
          <div className="eyebrow">Cuaderno de campo</div>
          <p className="serif" style={{
            fontSize: 'clamp(18px, 2vw, 22px)',
            lineHeight: 1.5,
            margin: '8px 0 0',
            color: 'var(--ink-soft)',
            fontWeight: 400,
          }}>
            {farm.story}
          </p>
        </div>
      </section>

      {/* in harvest strip */}
      <section className="container" style={{ marginTop: 32 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>En cosecha ahora</div>
        <div className="noscroll" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {farm.inHarvest.map((it, i) => (
            <div key={i} className="card" style={{ flexShrink: 0, width: 120, padding: 12 }}>
              <ProduceGlyph kind={it.kind} size={64}/>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8 }}>{it.name}</div>
              <div style={{
                fontSize: 11,
                fontWeight: 500,
                color: it.status === 'listo' ? 'var(--cosecha)' : 'var(--muted)',
                marginTop: 2,
              }}>
                {it.status === 'listo' ? '● ' : '○ '}{it.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* products from this farm */}
      <section className="container" style={{ marginTop: 48 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>
          Comprar de {farm.name}
        </h2>
        {products.length === 0 ? (
          <div className="card card-pad" style={{ color: 'var(--muted)', textAlign: 'center' }}>
            Esta finca aún no tiene producto activo en el mercado.
          </div>
        ) : (
          <div className="product-grid">
            {products.map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        )}
      </section>
    </>
  );
}
