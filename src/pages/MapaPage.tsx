import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/primitives';
import { pickupPoints } from '../data/pickup-points';
import { farms } from '../data/farms';

export function MapaPage() {
  const [selectedPickup, setSelectedPickup] = useState(pickupPoints[0].id);
  const active = pickupPoints.find(p => p.id === selectedPickup) ?? pickupPoints[0];

  return (
    <>
      <section className="container page-hero">
        <div className="eyebrow">Logística · 4 puntos activos</div>
        <h1>Recoger en tu pueblo.</h1>
        <p className="lede">
          Iglesias, plazas comunitarias y centros que reciben las cajitas de las
          fincas y las entregan los fines de semana. Sin viajes a la finca, sin
          servicio de delivery: una parada cerca de ti.
        </p>
      </section>

      <section className="container" style={{ marginBottom: 80 }}>
        <div style={{
          display: 'grid', gap: 24,
          gridTemplateColumns: 'minmax(0, 1fr)',
          alignItems: 'start',
        }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 3', background: '#EFE7D3' }}>
              <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
                style={{ position: 'absolute', inset: 0 }}>
                <rect width="800" height="600" fill="#EFE7D3"/>
                <path d="M-50 200 Q 200 150 400 220 Q 600 180 880 240 L 880 400 Q 600 380 400 420 Q 200 400 -50 450 Z" fill="#D9CDB0" opacity="0.7"/>
                <path d="M-50 500 Q 240 470 480 540 Q 680 520 880 580 L 880 700 Q 600 680 360 720 Q 160 700 -50 740 Z" fill="#C8D68A" opacity="0.5"/>
                <path d="M 100 80 Q 240 240 400 380 Q 500 500 360 640" stroke="#7BA3C2" strokeWidth="6" fill="none" opacity="0.55"/>
                <path d="M 0 320 L 400 300 L 800 340" stroke="#F7F1E3" strokeWidth="14" fill="none"/>
                <path d="M 0 320 L 400 300 L 800 340" stroke="#B8623A" strokeWidth="3" fill="none" strokeDasharray="8 6" opacity="0.4"/>
                <path d="M 320 0 L 360 320 L 440 600" stroke="#F7F1E3" strokeWidth="10" fill="none"/>
                <path d="M 0 60 Q 200 70 400 50 Q 600 30 800 70 L 800 0 L 0 0 Z" fill="#B8D8E0" opacity="0.5"/>
              </svg>

              {pickupPoints.map(p => {
                const cx = p.mapX * 800;
                const cy = p.mapY * 600;
                const isActive = p.id === selectedPickup;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPickup(p.id)}
                    aria-label={p.name}
                    style={{
                      position: 'absolute',
                      left: `${(cx / 800) * 100}%`,
                      top:  `${(cy / 600) * 100}%`,
                      transform: 'translate(-50%, -100%)',
                      width: isActive ? 44 : 32,
                      height: isActive ? 44 : 32,
                      borderRadius: 100,
                      background: '#B8623A',
                      border: '3px solid #fff',
                      boxShadow: isActive
                        ? '0 0 0 8px rgba(184,98,58,0.18), 0 4px 10px rgba(0,0,0,0.15)'
                        : '0 2px 6px rgba(0,0,0,0.15)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'width 120ms, height 120ms, box-shadow 120ms',
                      padding: 0,
                    }}
                  >
                    {Icons.pin(isActive ? 20 : 14, '#fff')}
                  </button>
                );
              })}

              {farms.map((f, i) => {
                const x = 0.18 + (i * 0.18);
                const y = 0.36 + ((i % 2) * 0.22);
                return (
                  <div key={f.slug} style={{
                    position: 'absolute',
                    left: `${x * 100}%`,
                    top:  `${y * 100}%`,
                    transform: 'translate(-50%, -100%)',
                    width: 26, height: 26, borderRadius: 100,
                    background: '#4C9D2F', border: '3px solid #fff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24">
                      <path d="M3 20V10l9-6 9 6v10M9 20v-6h6v6" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round"/>
                    </svg>
                  </div>
                );
              })}
            </div>
            <div style={{
              padding: 14,
              display: 'flex', gap: 18, flexWrap: 'wrap',
              fontSize: 12, color: 'var(--ink-soft)',
              borderTop: '1px solid var(--line-soft)',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 100, background: '#B8623A', display: 'inline-block' }}/>
                Punto de recogido
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 12, height: 12, borderRadius: 100, background: '#4C9D2F', display: 'inline-block' }}/>
                Finca activa
              </span>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 16 }}>
              <div className="eyebrow">Detalle del punto</div>
              <h2 className="section-title">{active.name}</h2>
              <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
                {active.street} · {active.town}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {active.open
                ? <span className="badge badge-organic">● Abierto</span>
                : <span className="badge badge-soft" style={{ background: 'rgba(184,98,58,0.15)', color: 'var(--tierra)' }}>○ Cerrado hoy</span>
              }
              <span className="badge badge-soft">
                {Icons.clock(11, '#225A40')} {active.schedule}
              </span>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20,
            }}>
              {[
                [active.distanceMi.toString(), 'mi'],
                [active.farmCount.toString(), 'fincas'],
                [active.type, 'tipo'],
              ].map(([v, u], i) => (
                <div key={i} className="card card-pad" style={{ textAlign: 'center', padding: 12 }}>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--savia)' }}>{v}</div>
                  <div className="eyebrow">{u}</div>
                </div>
              ))}
            </div>

            <Link to="/cajita" className="btn btn-primary" style={{ width: '100%' }}>
              Reservar cajita aquí {Icons.arrow(16, '#F7F1E3')}
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginBottom: 80 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>Todos los puntos de recogido</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {pickupPoints.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPickup(p.id)}
              className="card"
              style={{
                textAlign: 'left', cursor: 'pointer', padding: 16,
                display: 'flex', alignItems: 'center', gap: 16,
                border: p.id === selectedPickup ? '1px solid var(--savia)' : '1px solid var(--line-soft)',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: 'var(--crema)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {Icons.pin(20, '#B8623A')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {p.town} · {p.distanceMi} mi · {p.schedule}
                </div>
              </div>
              {p.open && <span className="badge badge-organic" style={{ flexShrink: 0 }}>Abierto</span>}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
