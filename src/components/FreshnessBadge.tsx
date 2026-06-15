import { freshnessMeta, type FreshnessGrade } from '../data/products';

type Variant = 'compact' | 'full';

export function FreshnessBadge({
  grade,
  variant = 'compact',
}: { grade: FreshnessGrade; variant?: Variant }) {
  const m = freshnessMeta[grade];
  return (
    <span
      className="freshness-badge"
      data-grade={grade}
      title={m.tagline}
      style={{ background: m.bg, color: m.color }}
    >
      <span className="freshness-grade-letter">{grade}</span>
      {variant === 'full' && <span className="freshness-grade-label">{m.label}</span>}
    </span>
  );
}
