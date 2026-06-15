import { Link } from 'react-router-dom';
import { Icons, ProduceGlyph, type ProduceKind } from '../../components/primitives';
import type { ConsumidorProfile } from '../../auth/ProfileContext';
import { useCart } from '../../cart/CartContext';
import { getProductById, effectivePrice } from '../../data/products';
import { getFarmBySlug, farms } from '../../data/farms';
import { pickupPoints } from '../../data/pickup-points';

const upcomingCajita: { kind: ProduceKind; name: string; qty: string }[] = [
  { kind: 'aguacate', name: 'Aguacate', qty: '3 u' },
  { kind: 'platano',  name: 'Plátano',  qty: '6 u' },
  { kind: 'yautia',   name: 'Yautía',   qty: '2 lb' },
  { kind: 'lechuga',  name: 'Lechuga',  qty: '1 u' },
  { kind: 'tomate',   name: 'Tomate',   qty: '1.5 lb' },
  { kind: 'calabaza', name: 'Calabaza', qty: '1 u' },
];

const recentOrders = [
  { id: 'ORD-3987', date: '13 abr', items: 'Café · Plátano · Yautía', amount: '$28.50', status: 'recogido' as const },
  { id: 'ORD-3954', date: '6 abr',  items: 'Aguacate · Tomate cherry', amount: '$13.00', status: 'recogido' as const },
];

export function ConsumidorDashboard({ profile }: { profile: ConsumidorProfile }) {
  const { lines, subtotal, itemCount } = useCart();
  const pickup = pickupPoints.find(p => p.id === profile.pickupId) ?? pickupPoints[0];
  const followedFarms = farms.slice(0, 3);

  const cartProducts = lines
    .map(l => ({ line: l, product: getProductById(l.productId) }))
    .filter((x): x is { line: typeof lines[number]; product: NonNullable<ReturnType<typeof getProductById>> } => Boolean(x.product));

  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">Mi cuenta</div>
        <h1 style={{ marginBottom: 8 }}>
          Hola, {profile.name.split(' ')[0]}.
        </h1>
        <p className="lede" style={{ margin: 0 }}>
          {profile.town} · {profile.householdSize} persona{profile.householdSize === 1 ? '' : 's'} en el hogar
        </p>
      </section>

      {profile.cajitaInterested && (
        <section className="container" style={{ marginBottom: 32 }}>
          <div style={{
            background: 'var(--savia)',
            color: 'var(--crema)',
            borderRadius: 20,
            padding: 24,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div className="eyebrow" style={{ color: 'var(--maduro)' }}>Cajita Local · próxima entrega</div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.1, margin: '6px 0 4px', color: 'var(--crema)' }}>
              Sábado 27 abril
            </div>
            <div style={{ fontSize: 13, color: 'rgba(247,241,227,0.8)' }}>
              Recoges en {pickup.name} · {pickup.schedule}
            </div>
            <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', marginTop: 20 }}>
              {upcomingCajita.map((it, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <ProduceGlyph kind={it.kind} size={56}/>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6, color: 'var(--crema)' }}>{it.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'rgba(247,241,227,0.65)' }}>{it.qty}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              <Link to="/cajita" className="btn btn-accent">
                Ajustar mi cajita
              </Link>
              <button type="button" className="btn btn-ghost" style={{
                color: 'var(--crema)',
                borderColor: 'rgba(247,241,227,0.3)',
              }}>
                Pausar esta semana
              </button>
            </div>
          </div>
        </section>
      )}

      {!profile.cajitaInterested && (
        <section className="container" style={{ marginBottom: 32 }}>
          <div className="card card-pad" style={{
            padding: 20, background: 'var(--crema)',
            border: '1px dashed var(--line)',
          }}>
            <div className="eyebrow">Cajita Local</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 500, margin: '6px 0 8px' }}>
              ¿Te suscribes a una cajita semanal?
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 14px', maxWidth: '50ch' }}>
              Apoya al agricultor antes de la siembra. Cancelas o pausas cuando quieras.
            </p>
            <Link to="/cajita" className="btn btn-primary">
              Explorar Cajita Local {Icons.arrow(16, '#F7F1E3')}
            </Link>
          </div>
        </section>
      )}

      {itemCount > 0 && (
        <section className="container" style={{ marginBottom: 32 }}>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Tu carrito</h2>
          <div className="card card-pad" style={{ padding: 16 }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {cartProducts.slice(0, 3).map(({ line, product }) => {
                const farm = getFarmBySlug(product.farmSlug);
                return (
                  <div key={line.productId} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <ProduceGlyph kind={product.kind} size={40}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{product.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                        {farm?.name ?? product.farmSlug} · ×{line.qty}
                      </div>
                    </div>
                    <div className="serif" style={{ fontSize: 15, fontWeight: 500, color: 'var(--savia)', flexShrink: 0 }}>
                      ${(effectivePrice(product) * line.qty).toFixed(2)}
                    </div>
                  </div>
                );
              })}
              {cartProducts.length > 3 && (
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  + {cartProducts.length - 3} más
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line-soft)', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div className="eyebrow">Subtotal</div>
                <div className="serif" style={{ fontSize: 24, fontWeight: 500, color: 'var(--savia)' }}>
                  ${subtotal.toFixed(2)}
                </div>
              </div>
              <Link to="/checkout" className="btn btn-primary">
                Ir a pagar {Icons.arrow(16, '#F7F1E3')}
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="container" style={{ marginBottom: 32 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Mi impacto</h2>
        <div className="card card-pad" style={{
          padding: 20, background: 'var(--crema)',
          border: '1px solid rgba(184,98,58,0.15)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="serif" style={{ fontSize: 36, fontWeight: 500, color: 'var(--savia)' }}>$312</div>
              <div className="eyebrow">aportados a fincas locales este año</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--tierra)' }}>14</div>
              <div className="eyebrow">cajitas recibidas</div>
            </div>
          </div>
          <div style={{
            marginTop: 14, height: 6, background: 'rgba(34,90,64,0.1)',
            borderRadius: 100, overflow: 'hidden',
          }}>
            <div style={{ width: '58%', height: '100%', background: 'var(--cosecha)', borderRadius: 100 }}/>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>14 de 24 cajitas hacia la meta anual</div>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Mi punto de recogido</h2>
        <div className="card card-pad" style={{ padding: 16, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: 'var(--crema)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {Icons.pin(22, '#B8623A')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{pickup.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
              {pickup.street} · {pickup.town} · {pickup.distanceMi} mi
            </div>
            <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5,
              background: '#E9F0DD', color: 'var(--savia)', padding: '4px 10px',
              borderRadius: 100, fontSize: 11, fontWeight: 600,
            }}>
              {Icons.clock(11, '#225A40')} {pickup.schedule}
            </div>
          </div>
          <Link to="/mapa" style={{ fontSize: 12, color: 'var(--savia)', fontWeight: 600, flexShrink: 0 }}>
            Cambiar
          </Link>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 32 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Órdenes recientes</h2>
        {recentOrders.length === 0 ? (
          <div className="card card-pad" style={{ padding: 24, textAlign: 'center', color: 'var(--muted)' }}>
            Aún no tienes órdenes. Visita el mercado para comenzar.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {recentOrders.map(o => (
              <div key={o.id} className="card card-pad" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em' }}>{o.id} · {o.date}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{o.items}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 500, color: 'var(--savia)' }}>{o.amount}</div>
                  <span className="badge badge-organic" style={{ marginTop: 4 }}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container" style={{ marginBottom: 80 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Fincas que sigues</h2>
        <div style={{
          display: 'grid', gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        }}>
          {followedFarms.map(f => (
            <Link key={f.slug} to={`/finca/${f.slug}`} className="card card-pad" style={{ display: 'block', padding: 16 }}>
              <div className="img-placeholder green" style={{ height: 80, borderRadius: 10, marginBottom: 12 }}/>
              <div className="eyebrow">{f.region}</div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 500, margin: '4px 0 2px' }}>{f.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{f.farmer}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
