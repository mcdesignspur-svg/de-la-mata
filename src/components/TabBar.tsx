import { Icons } from './primitives';

type TabKey = 'home' | 'farm' | 'box' | 'user';

const items: { k: TabKey; l: string; i: (s?: number, c?: string, active?: boolean) => JSX.Element }[] = [
  { k: 'home', l: 'Mercado', i: Icons.home },
  { k: 'farm', l: 'Fincas', i: Icons.farm },
  { k: 'box',  l: 'Cajita', i: Icons.box },
  { k: 'user', l: 'Yo',     i: Icons.user },
];

export function TabBar({ active = 'home' }: { active?: TabKey }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(251,248,241,0.96)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(34,90,64,0.08)',
      padding: '10px 12px 28px',
      display: 'flex', justifyContent: 'space-around',
      zIndex: 30,
    }}>
      {items.map(it => (
        <div key={it.k} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        }}>
          {it.i(22, active === it.k ? '#225A40' : '#6b7a6b', active === it.k)}
          <div style={{
            fontSize: 10, fontWeight: active === it.k ? 600 : 500,
            color: active === it.k ? '#225A40' : '#6b7a6b',
          }}>{it.l}</div>
        </div>
      ))}
    </div>
  );
}
