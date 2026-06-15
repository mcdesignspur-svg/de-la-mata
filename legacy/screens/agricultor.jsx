// De La Mata — Farmer module (register harvest, offline-first)
function ScreenAgricultor() {
  return (
    <IOSDevice width={390} height={844}>
      {/* Top — offline banner + identity */}
      <div style={{ background: '#17402d', padding: '58px 20px 22px', color: '#F7F1E3', position: 'relative' }}>
        {/* Offline banner */}
        <div style={{
          position: 'absolute', top: 46, left: 0, right: 0,
          background: '#B8623A', color: '#F7F1E3',
          padding: '4px 20px',
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11, fontWeight: 600,
          letterSpacing: '0.02em',
        }}>
          {Icons.wifi(12, '#F7F1E3')} Sin señal · 3 entradas en cola
        </div>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="eyebrow" style={{ color: '#E8A33D' }}>Agricultor Bonafide · #PR-10427</div>
            <div className="serif" style={{ fontSize: 24, fontWeight: 500, marginTop: 4 }}>
              Hola, Don Tito
            </div>
            <div style={{ fontSize: 12, color: 'rgba(247,241,227,0.7)', marginTop: 2 }}>
              Conuco de Don Tito · Jayuya
            </div>
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: 100, background: '#E4B892',
            border: '2px solid #E8A33D',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="30" height="30" viewBox="0 0 40 40">
              <ellipse cx="20" cy="16" rx="8" ry="9" fill="#6B3E1E"/>
              <path d="M4 40 Q 20 22 36 40 Z" fill="#6B3E1E"/>
            </svg>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 18 }}>
          {[
            { v: '$847', u: 'esta semana' },
            { v: '23', u: 'pedidos' },
            { v: '12', u: 'en cosecha' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(247,241,227,0.08)',
              border: '1px solid rgba(247,241,227,0.12)',
              borderRadius: 12, padding: 10,
            }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 500, color: '#E8A33D' }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'rgba(247,241,227,0.7)' }}>{s.u}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ background: '#FBF8F1', padding: '20px 20px 100px' }}>
        {/* Register harvest CTA */}
        <div style={{
          background: '#fff', padding: 16, borderRadius: 16,
          border: '1px dashed #4C9D2F',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: '#4C9D2F',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {Icons.camera(22, '#fff')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Registrar cosecha de hoy</div>
            <div style={{ fontSize: 11, color: '#6b7a6b' }}>Se sincroniza al encontrar señal</div>
          </div>
          {Icons.arrow(16, '#225A40')}
        </div>

        {/* Today's harvests */}
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="eyebrow">Cuaderno · 20 abr</div>
            <span style={{ fontSize: 11, color: '#B8623A', display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
              ↻ 3 pendientes
            </span>
          </div>
          {[
            { k: 'platano', n: 'Plátano maduro', q: '42 racimos', t: '6:15 am', p: '$31.50', sync: 'pending' },
            { k: 'aguacate', n: 'Aguacate criollo', q: '18 lb', t: '7:02 am', p: '$63.00', sync: 'pending' },
            { k: 'yautia', n: 'Yautía blanca', q: '8 lb', t: '7:48 am', p: '$22.40', sync: 'pending' },
            { k: 'cafe', n: 'Café pilón', q: '4 lb', t: 'ayer', p: '$72.00', sync: 'synced' },
          ].map((it, i) => (
            <div key={i} style={{
              background: '#fff', padding: 12, borderRadius: 12,
              marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12,
              border: '1px solid rgba(34,90,64,0.06)',
            }}>
              <ProduceGlyph kind={it.k} size={44}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{it.n}</div>
                <div style={{ fontSize: 11, color: '#6b7a6b' }}>{it.q} · {it.t}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="serif" style={{ fontSize: 16, fontWeight: 500, color: '#225A40' }}>{it.p}</div>
                {it.sync === 'pending' ? (
                  <div style={{
                    fontSize: 9, color: '#B8623A', fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                  }}>● en cola</div>
                ) : (
                  <div style={{
                    fontSize: 9, color: '#4C9D2F', fontWeight: 600,
                  }}>✓ sincronizada</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Incentive */}
        <div style={{
          marginTop: 16, padding: 14, borderRadius: 14,
          background: '#F7F1E3',
          display: 'flex', alignItems: 'center', gap: 12,
          border: '1px solid rgba(232,163,61,0.25)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: '#E8A33D',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#225A40', fontWeight: 800,
          }}>₱</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#225A40' }}>Incentivo Ley 12-2026</div>
            <div style={{ fontSize: 11, color: '#6b7a6b' }}>$420 disponibles · reclamar antes del 30 abr</div>
          </div>
          {Icons.arrow(16, '#225A40')}
        </div>
      </div>
    </IOSDevice>
  );
}

Object.assign(window, { ScreenAgricultor });
