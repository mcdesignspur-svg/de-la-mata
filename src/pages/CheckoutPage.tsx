import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons, ProduceGlyph } from '../components/primitives';
import { useCart } from '../cart/CartContext';
import { getProductById, effectivePrice, isDiscounted } from '../data/products';
import { FreshnessBadge } from '../components/FreshnessBadge';
import { getFarmBySlug } from '../data/farms';
import { pickupPoints } from '../data/pickup-points';

export function CheckoutPage() {
  const { lines, setQty, remove, subtotal, clear } = useCart();
  const [pickup, setPickup] = useState(pickupPoints[0].id);
  const [tip, setTip] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  const lineItems = useMemo(() => {
    return lines
      .map(l => ({ line: l, product: getProductById(l.productId) }))
      .filter((x): x is { line: typeof lines[number]; product: NonNullable<ReturnType<typeof getProductById>> } => Boolean(x.product));
  }, [lines]);

  const total = subtotal + tip;
  const pickupPoint = pickupPoints.find(p => p.id === pickup) ?? pickupPoints[0];

  if (confirmed) {
    return (
      <section className="container page-hero" style={{ maxWidth: 640 }}>
        <div className="eyebrow" style={{ color: 'var(--cosecha-deep)' }}>✓ Pago confirmado</div>
        <h1>¡Gracias por apoyar el campo!</h1>
        <p className="lede">
          Recoges tu compra en {pickupPoint.name} · {pickupPoint.schedule}.
          Te enviaremos una notificación cuando la cajita esté empacada.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
          <Link to="/mercado" className="btn btn-primary">Volver al mercado</Link>
          <Link to="/cajita" className="btn btn-ghost">Suscribirme a la Cajita Local</Link>
        </div>
      </section>
    );
  }

  if (lineItems.length === 0) {
    return (
      <section className="container page-hero" style={{ maxWidth: 640 }}>
        <div className="eyebrow">Carrito vacío</div>
        <h1>Aún no hay nada en tu carrito.</h1>
        <p className="lede">
          Explora el mercado y añade producto fresco — luego vuelves aquí a pagar.
        </p>
        <Link to="/mercado" className="btn btn-primary" style={{ marginTop: 24 }}>
          Ir al mercado {Icons.arrow(16, '#F7F1E3')}
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">Pagar</div>
        <h1>Confirmar tu compra</h1>
        <p className="lede">
          Revisamos tu cajita, escoges el punto de recogido y pagas con ATH Móvil
          o Instant QR en la finca.
        </p>
      </section>

      <section className="container" style={{ marginBottom: 80, display: 'grid', gap: 32, gridTemplateColumns: 'minmax(0, 1fr)' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Tu carrito ({lineItems.length})</h2>
          <div className="card" style={{ padding: 4 }}>
            {lineItems.map(({ line, product }, i, arr) => {
              const farm = getFarmBySlug(product.farmSlug);
              return (
                <div key={line.productId} style={{
                  padding: 16, display: 'flex', alignItems: 'center', gap: 16,
                  borderBottom: i < arr.length - 1 ? '1px solid var(--line-soft)' : 'none',
                }}>
                  <ProduceGlyph kind={product.kind} size={56}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{product.name}</div>
                      <FreshnessBadge grade={product.freshness.grade}/>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {farm?.name ?? product.farmSlug} · ${effectivePrice(product).toFixed(2)}/{product.unit}
                      {isDiscounted(product) && <> · <span style={{ color: 'var(--tierra)', fontWeight: 600 }}>Triaje IA</span></>}
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => setQty(line.productId, line.qty - 1)}
                        aria-label="Reducir cantidad"
                      >
                        {Icons.minus(16, '#225A40')}
                      </button>
                      <span className="qty-value">{line.qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => setQty(line.productId, line.qty + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        {Icons.plus(16, '#225A40')}
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(line.productId)}
                        style={{
                          marginLeft: 4, fontSize: 13,
                          color: 'var(--tierra)', background: 'transparent',
                          border: 'none', cursor: 'pointer', padding: '4px 0',
                          textDecoration: 'underline',
                        }}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--savia)', flexShrink: 0 }}>
                    ${(effectivePrice(product) * line.qty).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Recogido</h2>
          <div className="card card-pad" style={{ padding: 16 }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="checkout-pickup">Punto de recogido</label>
              <select
                id="checkout-pickup"
                className="field-select"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
              >
                {pickupPoints.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.town} · {p.schedule}
                  </option>
                ))}
              </select>
            </div>

            <div style={{
              marginTop: 14, padding: 12, borderRadius: 12, background: 'var(--crema)',
              fontSize: 13, color: 'var(--ink-soft)',
            }}>
              {pickupPoint.street} · {pickupPoint.distanceMi} mi · Recogido gratis
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Aporte al agricultor</h2>
          <div className="card card-pad" style={{ padding: 16 }}>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px' }}>
              Suma directa al agricultor — el 100% va a la finca, fuera de comisión.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[0, 2, 5, 10].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTip(t)}
                  className={`chip ${tip === t ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  {t === 0 ? 'Sin aporte' : `+ $${t}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Total</h2>
          <div className="card card-pad" style={{ padding: 20 }}>
            {[
              ['Subtotal', `$${subtotal.toFixed(2)}`],
              ['Aporte al agricultor', tip > 0 ? `+ $${tip.toFixed(2)}` : '—'],
              ['Recogido comunitario', 'Gratis'],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14, color: 'var(--ink-soft)' }}>
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
            <div className="divider" style={{ margin: '12px 0' }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 16, fontWeight: 600 }}>Total</span>
              <span className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--savia)' }}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="card card-pad" style={{
            marginTop: 16, padding: 16,
            border: '2px solid var(--maduro)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: 'var(--maduro)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--savia)', fontWeight: 800, fontSize: 11, lineHeight: 1,
              textAlign: 'center', letterSpacing: '0.05em',
            }}>
              <div>ATH<br/><span style={{ fontSize: 8 }}>MÓVIL</span></div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>ATH Móvil</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Pago seguro de Puerto Rico</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 100, background: 'var(--cosecha)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {Icons.check(13, '#fff')}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 16, padding: '18px 20px', fontSize: 16 }}
            onClick={() => {
              clear();
              setConfirmed(true);
            }}
          >
            Confirmar con ATH Móvil · ${total.toFixed(2)}
          </button>
        </div>
      </section>
    </>
  );
}
