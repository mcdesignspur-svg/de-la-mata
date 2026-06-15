// De La Mata — Map of pickup points + nearby farms
function ScreenMapa() {
  return (
    <IOSDevice width={390} height={844}>
      {/* Map canvas */}
      <div style={{ position: 'absolute', inset: 0, background: '#EFE7D3' }}>
        {/* Stylized map */}
        <svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
          {/* base */}
          <rect width="390" height="844" fill="#EFE7D3"/>
          {/* terrain blobs */}
          <path d="M-50 200 Q 100 150 200 220 Q 300 180 440 240 L 440 400 Q 300 380 200 420 Q 100 400 -50 450 Z" fill="#D9CDB0" opacity="0.7"/>
          <path d="M-50 500 Q 120 470 240 540 Q 340 520 440 580 L 440 700 Q 300 680 180 720 Q 80 700 -50 740 Z" fill="#C8D68A" opacity="0.5"/>
          {/* rivers */}
          <path d="M 50 100 Q 120 300 200 450 Q 250 600 180 800" stroke="#7BA3C2" strokeWidth="4" fill="none" opacity="0.55"/>
          {/* roads */}
          <path d="M 0 380 L 200 360 L 390 400" stroke="#F7F1E3" strokeWidth="10" fill="none"/>
          <path d="M 0 380 L 200 360 L 390 400" stroke="#B8623A" strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.4"/>
          <path d="M 160 0 L 180 400 L 220 844" stroke="#F7F1E3" strokeWidth="7" fill="none"/>
          {/* coast */}
          <path d="M 0 80 Q 100 90 200 70 Q 300 50 390 90 L 390 0 L 0 0 Z" fill="#B8D8E0" opacity="0.5"/>
        </svg>

        {/* Pin — pickup */}
        <MapPin top={300} left={170} color="#B8623A" kind="pickup" active/>
        <MapPin top={490} left={240} color="#B8623A" kind="pickup"/>
        <MapPin top={380} left={80} color="#B8623A" kind="pickup"/>

        {/* Pin — farms */}
        <MapPin top={220} left={260} color="#4C9D2F" kind="farm"/>
        <MapPin top={560} left={140} color="#4C9D2F" kind="farm"/>
        <MapPin top={420} left={310} color="#4C9D2F" kind="farm"/>
        <MapPin top={340} left={50}  color="#4C9D2F" kind="farm"/>

        {/* "You" */}
        <div style={{
          position: 'absolute', top: 380, left: 195,
          width: 18, height: 18, borderRadius: 100,
          background: '#225A40', border: '3px solid #fff',
          boxShadow: '0 0 0 8px rgba(34,90,64,0.15)',
        }}/>
      </div>

      {/* Top search */}
      <div style={{ position: 'absolute', top: 54, left: 16, right: 16, zIndex: 10 }}>
        <div style={{
          background: '#fff', borderRadius: 14, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#F7F1E3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Icons.pin(16, '#225A40')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#6b7a6b' }}>Cerca de</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Arecibo · 10 mi</div>
          </div>
          {Icons.filter(16, '#225A40')}
        </div>

        {/* Chips */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto' }} className="noscroll">
          <div className="chip active">Todo</div>
          <div className="chip" style={{ background: '#fff' }}>● Puntos de recogido</div>
          <div className="chip" style={{ background: '#fff' }}>● Fincas</div>
          <div className="chip" style={{ background: '#fff' }}>Abierto ahora</div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        background: '#FBF8F1', borderRadius: '24px 24px 0 0',
        padding: '12px 20px 34px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 100, background: 'rgba(34,90,64,0.2)', margin: '0 auto 14px' }}/>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: '#B8623A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {Icons.pin(18, '#fff')}
          </div>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">Punto de recogido comunitario</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Iglesia San Felipe</div>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 600, background: '#E9F0DD',
            color: '#4C9D2F', padding: '4px 8px', borderRadius: 100,
          }}>ABIERTO</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[['1.8 mi', 'distancia'], ['Sáb', '8–11am'], ['18', 'fincas']].map(([v, u], i) => (
            <div key={i} style={{
              flex: 1, background: '#fff', padding: 10, borderRadius: 10,
              border: '1px solid rgba(34,90,64,0.06)', textAlign: 'center',
            }}>
              <div className="serif" style={{ fontSize: 16, fontWeight: 500, color: '#225A40' }}>{v}</div>
              <div style={{ fontSize: 10, color: '#6b7a6b' }}>{u}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" style={{ flex: 1 }}>
            Elegir para mi cajita
          </button>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: '#fff', border: '1px solid rgba(34,90,64,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {Icons.arrow(18, '#225A40')}
          </div>
        </div>
      </div>
    </IOSDevice>
  );
}

function MapPin({ top, left, color, kind, active }) {
  return (
    <div style={{
      position: 'absolute', top, left, transform: 'translate(-50%, -100%)',
    }}>
      <div style={{
        width: active ? 44 : 32, height: active ? 44 : 32,
        borderRadius: 100, background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '3px solid #fff',
        boxShadow: active ? `0 0 0 8px ${color}22, 0 4px 10px rgba(0,0,0,0.15)` : '0 2px 6px rgba(0,0,0,0.15)',
      }}>
        {kind === 'pickup'
          ? Icons.pin(active ? 20 : 14, '#fff')
          : <svg width={active ? 20 : 14} height={active ? 20 : 14} viewBox="0 0 24 24">
              <path d="M3 20V10l9-6 9 6v10M9 20v-6h6v6" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round"/>
            </svg>
        }
      </div>
    </div>
  );
}

Object.assign(window, { ScreenMapa });
