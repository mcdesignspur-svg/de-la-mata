// De La Mata — Cajita Local (CSA subscription)
function ScreenCajita() {
  return (
    <IOSDevice width={390} height={844}>
      <div style={{ background: '#225A40', padding: '58px 20px 24px', color: '#F7F1E3', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, opacity: 0.12 }}>
          <LeafMark size={220} color="#F7F1E3"/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 100, background: 'rgba(247,241,227,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#F7F1E3" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
          </div>
          <span className="eyebrow" style={{ color: '#E8A33D' }}>CSA · Cajita Local</span>
        </div>
        <div className="serif" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.1, marginBottom: 6 }}>
          Tu cajita de esta semana
        </div>
        <div style={{ fontSize: 13, color: 'rgba(247,241,227,0.75)' }}>
          Lunes 27 abril · Recogido en Iglesia San Felipe
        </div>
      </div>

      {/* Cajita card */}
      <div style={{ background: '#FBF8F1', padding: '20px 20px 110px', position: 'relative' }}>
        <div style={{
          background: '#fff', borderRadius: 20, padding: 18,
          marginTop: -32, position: 'relative',
          border: '1px solid rgba(34,90,64,0.08)',
          boxShadow: '0 8px 24px rgba(23,64,45,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 2 }}>Tamaño Familia · 12 lb</div>
              <div className="serif" style={{ fontSize: 22, fontWeight: 500, color: '#1A1F1A' }}>
                Esta semana trae
              </div>
            </div>
            <div style={{
              padding: '5px 10px', borderRadius: 100, background: '#4C9D2F',
              color: '#fff', fontSize: 11, fontWeight: 600,
            }}>EN RUTA</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { k: 'aguacate', n: 'Aguacate', q: '3 u' },
              { k: 'platano', n: 'Plátano', q: '6 u' },
              { k: 'yautia', n: 'Yautía', q: '2 lb' },
              { k: 'lechuga', n: 'Lechuga', q: '1 u' },
              { k: 'tomate', n: 'Tomate', q: '1.5 lb' },
              { k: 'calabaza', n: 'Calabaza', q: '1 u' },
            ].map((it, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <ProduceGlyph kind={it.k} size={62}/>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{it.n}</div>
                <div style={{ fontSize: 10, color: '#6b7a6b' }}>{it.q}</div>
              </div>
            ))}
          </div>

          {/* surprise */}
          <div style={{
            marginTop: 14, padding: '10px 12px', background: '#F7F1E3',
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 100, background: '#E8A33D',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>✦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#225A40' }}>Bonus de la semana</div>
              <div style={{ fontSize: 11, color: '#6b7a6b' }}>Un manojo de recao fresco de Don Tito</div>
            </div>
          </div>
        </div>

        {/* Contributing farms */}
        <div style={{ marginTop: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Tus fincas esta semana</div>
          {[
            { n: 'Hacienda Los Robles', l: 'Utuado', p: 'Aguacate, café' },
            { n: 'Conuco de Don Tito', l: 'Jayuya', p: 'Plátano, recao' },
            { n: 'Batey La Ceiba', l: 'Arecibo', p: 'Yautía, calabaza' },
          ].map((f, i) => (
            <div key={i} style={{
              background: '#fff', padding: 12, borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 8, border: '1px solid rgba(34,90,64,0.06)',
            }}>
              <div className="img-placeholder green" style={{ width: 44, height: 44, borderRadius: 10, padding: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{f.n}</div>
                <div style={{ fontSize: 11, color: '#6b7a6b' }}>{f.l} · {f.p}</div>
              </div>
              {Icons.arrow(14, '#225A40')}
            </div>
          ))}
        </div>

        {/* Progress / impact */}
        <div style={{
          marginTop: 18, padding: 16, borderRadius: 16,
          background: '#F7F1E3', border: '1px solid rgba(184,98,58,0.15)',
        }}>
          <div className="eyebrow" style={{ color: '#B8623A', marginBottom: 8 }}>Tu impacto</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <span className="serif" style={{ fontSize: 28, fontWeight: 500, color: '#225A40' }}>$312</span>
              <div style={{ fontSize: 11, color: '#6b7a6b', marginTop: 2 }}>
                aportados a fincas locales este año
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="serif" style={{ fontSize: 22, fontWeight: 500, color: '#B8623A' }}>14</span>
              <div style={{ fontSize: 11, color: '#6b7a6b' }}>cajitas</div>
            </div>
          </div>
          <div style={{ marginTop: 12, height: 6, background: 'rgba(34,90,64,0.1)', borderRadius: 100, overflow: 'hidden' }}>
            <div style={{ width: '58%', height: '100%', background: '#4C9D2F', borderRadius: 100 }}/>
          </div>
          <div style={{ fontSize: 11, color: '#6b7a6b', marginTop: 6 }}>14 de 24 cajitas hacia meta anual</div>
        </div>
      </div>

      <TabBar active="box"/>
    </IOSDevice>
  );
}

Object.assign(window, { ScreenCajita });
