// De La Mata — shared UI primitives

export function LeafMark({
  size = 22,
  color = '#225A40',
  veinColor = '#F7F1E3',
}: {
  size?: number;
  color?: string;
  veinColor?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 30 C 16 24, 14 20, 10 17" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M16 4 C 22 6, 26 11, 26 18 C 26 23, 22 27, 16 27 C 10 27, 6 23, 6 18 C 6 11, 10 6, 16 4 Z"
        fill={color} opacity="0.95"/>
      <path d="M16 6 L 16 26 M 16 14 L 22 12 M 16 14 L 10 12 M 16 20 L 23 19 M 16 20 L 9 19"
        stroke={veinColor} strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

export const Icons = {
  search: (s = 20, c = '#1A1F1A') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.8"/>
      <path d="m20 20-3.5-3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  pin: (s = 16, c = '#225A40') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" stroke={c} strokeWidth="1.8"/>
      <circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.8"/>
    </svg>
  ),
  heart: (s = 18, c = '#1A1F1A', fill: string = 'none') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill}>
      <path d="M12 20s-7-4.5-7-10a4.5 4.5 0 0 1 7-3.7A4.5 4.5 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  plus: (s = 18, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  minus: (s = 18, c = '#225A40') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  check: (s = 16, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="m5 12 5 5L20 7" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  home: (s = 22, c = '#225A40', active = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={active ? c : 'none'}>
      <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  box: (s = 22, c = '#225A40', active = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={active ? c : 'none'}>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M3 7.5 12 12l9-4.5M12 12v9" stroke={c} strokeWidth="1.8"/>
    </svg>
  ),
  farm: (s = 22, c = '#225A40', active = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={active ? c : 'none'}>
      <path d="M3 20V10l9-6 9 6v10" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 20v-6h6v6" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  user: (s = 22, c = '#225A40', active = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={active ? c : 'none'}>
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.8"/>
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  bag: (s = 22, c = '#225A40') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 8h14l-1 12H6L5 8Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 10V7a3 3 0 0 1 6 0v3" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  wifi: (s = 14, c = '#B8623A') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 9c5-4 13-4 18 0M6 13c4-3 8-3 12 0M9 17c2-1 4-1 6 0" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="m4 4 16 16" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  clock: (s = 14, c = '#225A40') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8"/>
      <path d="M12 7v5l3 2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  leaf: (s = 14, c = '#4C9D2F') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M20 4C10 4 4 10 4 18c0 1 0 2 .5 2.5M5 19c5 0 14-3 15-15" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  star: (s = 14, c = '#E8A33D') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="m12 3 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9l6.6-.9L12 3Z"/>
    </svg>
  ),
  qr: (s = 22, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" stroke={c} strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="7" stroke={c} strokeWidth="1.8"/>
      <rect x="3" y="14" width="7" height="7" stroke={c} strokeWidth="1.8"/>
      <path d="M14 14h3v3M21 17v4h-4M17 21h-3" stroke={c} strokeWidth="1.8"/>
    </svg>
  ),
  arrow: (s = 18, c = '#225A40') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  filter: (s = 18, c = '#225A40') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M7 12h10M10 18h4" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  camera: (s = 18, c = '#fff') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" stroke={c} strokeWidth="1.8"/>
      <circle cx="12" cy="13" r="4" stroke={c} strokeWidth="1.8"/>
    </svg>
  ),
};

type ProduceKind =
  | 'aguacate' | 'platano' | 'cafe' | 'yautia' | 'mango'
  | 'quenepa' | 'calabaza' | 'lechuga' | 'tomate';

type ShapeKind = 'pear' | 'crescent' | 'bean' | 'tuber' | 'oval' | 'round' | 'leafy';

const produceStyles: Record<ProduceKind, { bg: string; fg: string; shape: ShapeKind }> = {
  aguacate: { bg: '#C8D68A', fg: '#4C9D2F', shape: 'pear' },
  platano:  { bg: '#F4DC8E', fg: '#C89430', shape: 'crescent' },
  cafe:     { bg: '#E4B892', fg: '#6B3E1E', shape: 'bean' },
  yautia:   { bg: '#D9C4A3', fg: '#8B5E34', shape: 'tuber' },
  mango:    { bg: '#F3B062', fg: '#C4651C', shape: 'oval' },
  quenepa:  { bg: '#B8D17A', fg: '#4C9D2F', shape: 'round' },
  calabaza: { bg: '#F0A04B', fg: '#B45A1F', shape: 'round' },
  lechuga:  { bg: '#B7D48A', fg: '#4C9D2F', shape: 'leafy' },
  tomate:   { bg: '#E8866A', fg: '#B83A1F', shape: 'round' },
};

export function ProduceGlyph({ kind, size = 56 }: { kind: ProduceKind; size?: number }) {
  const s = produceStyles[kind] ?? produceStyles.aguacate;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.2,
      background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      border: `1px solid ${s.fg}22`,
    }}>
      <ProduceShape kind={s.shape} fg={s.fg} size={size * 0.6}/>
    </div>
  );
}

function ProduceShape({ kind, fg, size }: { kind: ShapeKind; fg: string; size: number }) {
  if (kind === 'pear') return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M20 5 Q 18 8 20 12 Q 28 14 30 24 Q 30 34 20 36 Q 10 34 10 24 Q 12 14 20 12" fill={fg}/>
      <ellipse cx="16" cy="20" rx="2" ry="4" fill="#fff" opacity="0.3"/>
    </svg>
  );
  if (kind === 'crescent') return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M8 30 Q 6 12 20 8 Q 34 10 32 22 Q 30 18 20 20 Q 12 22 14 32 Q 10 32 8 30 Z" fill={fg}/>
    </svg>
  );
  if (kind === 'bean') return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <ellipse cx="20" cy="20" rx="12" ry="16" fill={fg}/>
      <path d="M20 6 Q 22 20 20 34" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.5"/>
    </svg>
  );
  if (kind === 'tuber') return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M10 18 Q 8 10 18 8 Q 30 8 32 18 Q 34 28 26 32 Q 14 34 10 28 Z" fill={fg}/>
      <circle cx="18" cy="18" r="1" fill="#fff" opacity="0.4"/>
      <circle cx="24" cy="22" r="1" fill="#fff" opacity="0.4"/>
    </svg>
  );
  if (kind === 'oval') return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <ellipse cx="20" cy="22" rx="13" ry="15" fill={fg}/>
      <path d="M20 7 Q 22 4 24 6" stroke="#4C9D2F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
  if (kind === 'round') return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="22" r="14" fill={fg}/>
      <ellipse cx="14" cy="16" rx="3" ry="4" fill="#fff" opacity="0.3"/>
    </svg>
  );
  if (kind === 'leafy') return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M20 8 Q 8 12 8 22 Q 8 32 20 34 Q 32 32 32 22 Q 32 12 20 8 Z" fill={fg}/>
      <path d="M20 10 L 20 34 M 12 18 L 28 18 M 10 26 L 30 26" stroke="#fff" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
  return null;
}

export type { ProduceKind };
