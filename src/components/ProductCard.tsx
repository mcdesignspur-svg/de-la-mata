import { Link } from 'react-router-dom';
import { effectivePrice, isDiscounted, type Product } from '../data/products';
import { getFarmBySlug } from '../data/farms';
import { ProduceGlyph, Icons } from './primitives';
import { FreshnessBadge } from './FreshnessBadge';
import { useCart } from '../cart/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const farm = getFarmBySlug(product.farmSlug);
  const { add } = useCart();
  const unitLabel = product.unit === 'lb' ? '/lb' : product.unit === 'u' ? '/u' : `/${product.unit}`;
  const price = effectivePrice(product);
  const discounted = isDiscounted(product);
  const discountPct = Math.round((1 - product.freshness.priceMultiplier) * 100);

  return (
    <article className="product-card">
      <div className="thumb">
        <ProduceGlyph kind={product.kind} size={84}/>
        <span className="freshness">{product.freshness.note.toUpperCase()}</span>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <FreshnessBadge grade={product.freshness.grade}/>
        </div>
        {discounted && (
          <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <span className="discount-tag">−{discountPct}%</span>
          </div>
        )}
      </div>
      <div className="body">
        <div className="name">{product.name}</div>
        <div className="farm">
          {Icons.pin(11, '#6b7a6b')}
          {farm
            ? <Link to={`/finca/${farm.slug}`}>{farm.name}</Link>
            : <span>{product.farmSlug}</span>}
          {farm && <> · {farm.distanceMi} mi</>}
        </div>
        <div className="price-row">
          <div>
            {discounted && <span className="price-strike">${product.basePrice.toFixed(2)}</span>}
            <span className="price">${price.toFixed(2)}</span>
            <span className="unit">{unitLabel}</span>
          </div>
          <button
            className="add"
            aria-label={`Añadir ${product.name} al carrito`}
            onClick={() => add(product.id, 1)}
          >
            {Icons.plus(16, '#fff')}
          </button>
        </div>
      </div>
    </article>
  );
}
