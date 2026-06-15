import { useState } from 'react';
import { LeafMark, Icons, ProduceGlyph, type ProduceKind } from '../components/primitives';
import { pickupPoints } from '../data/pickup-points';

const STORAGE_KEY = 'dlm:cajita-signup:v1';

const sizes: { id: 'pareja' | 'familia' | 'comunidad'; label: string; weight: string; price: number; serves: string }[] = [
  { id: 'pareja',    label: 'Pareja',    weight: '6 lb',  price: 28, serves: '2 personas · semana' },
  { id: 'familia',   label: 'Familia',   weight: '12 lb', price: 48, serves: '4 personas · semana' },
  { id: 'comunidad', label: 'Comunidad', weight: '20 lb', price: 78, serves: '6+ personas · semana' },
];

const sample: { kind: ProduceKind; n: string; q: string }[] = [
  { kind: 'aguacate', n: 'Aguacate', q: '3 u' },
  { kind: 'platano',  n: 'Plátano',  q: '6 u' },
  { kind: 'yautia',   n: 'Yautía',   q: '2 lb' },
  { kind: 'lechuga',  n: 'Lechuga',  q: '1 u' },
  { kind: 'tomate',   n: 'Tomate',   q: '1.5 lb' },
  { kind: 'calabaza', n: 'Calabaza', q: '1 u' },
];

export function CajitaPage() {
  const [size, setSize] = useState<'pareja' | 'familia' | 'comunidad'>('familia');
  const [pickup, setPickup] = useState(pickupPoints[0].id);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { size, pickup, email, name, ts: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage unavailable — proceed anyway, signup is mock
    }
    setSubmitted(true);
  };

  const selected = sizes.find(s => s.id === size)!;

  return (
    <>
      <section className="page-hero-dark">
        <div className="deco">
          <LeafMark size={400} color="#F7F1E3"/>
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'var(--maduro)' }}>CSA · Cajita Local</div>
          <h1>Comparte la cosecha,<br/>compromete la siembra.</h1>
          <p>
            Cada semana recibes una cajita con lo que está en cosecha — frutas, raíces,
            verduras, café — de tres fincas Bonafide rotando. Pagas por adelantado y
            apoyas al agricultor antes de que siembre.
          </p>
        </div>
      </section>

      <section className="container" style={{ marginTop: 48 }}>
        <div className="eyebrow">Esta semana, una cajita Familia trae</div>
        <h2 className="section-title" style={{ marginTop: 6, marginBottom: 24 }}>
          Lo que está cortando el campo
        </h2>
        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        }}>
          {sample.map((it, i) => (
            <div key={i} className="card card-pad" style={{ textAlign: 'center', padding: '16px 12px' }}>
              <ProduceGlyph kind={it.kind} size={72}/>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>{it.n}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{it.q}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 16 }}>
          La composición varía según cosecha — todas las semanas avisamos qué viene
          con tres días de anticipación.
        </p>
      </section>

      <section className="container" style={{ marginTop: 64 }}>
        <h2 className="section-title" style={{ marginBottom: 24 }}>Escoge tu tamaño</h2>
        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}>
          {sizes.map(s => {
            const active = size === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                className="card"
                style={{
                  padding: 20,
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: active ? '2px solid var(--savia)' : '1px solid var(--line-soft)',
                  background: active ? '#fff' : '#fff',
                  boxShadow: active ? '0 8px 24px rgba(23,64,45,0.08)' : 'none',
                  transition: 'box-shadow 160ms, border-color 160ms',
                }}
              >
                <div className="eyebrow">{s.weight}</div>
                <div className="serif" style={{
                  fontSize: 26, fontWeight: 500, marginTop: 6,
                  color: active ? 'var(--savia)' : 'var(--ink)',
                }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{s.serves}</div>
                <div style={{
                  marginTop: 16,
                  fontFamily: 'Fraunces, Georgia, serif',
                  fontSize: 32, fontWeight: 500, color: 'var(--savia)',
                }}>
                  ${s.price}<span style={{ fontSize: 14, color: 'var(--muted)' }}> /sem</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="container" style={{ marginTop: 56 }}>
        <div style={{
          display: 'grid', gap: 32,
          gridTemplateColumns: 'minmax(0, 1fr)',
        }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: 8 }}>
              {submitted ? '¡Bienvenida a la cajita!' : 'Reserva tu cajita'}
            </h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6, marginBottom: 24, marginTop: 0 }}>
              {submitted
                ? 'Te enviamos un correo con el detalle. La primera entrega es el próximo sábado.'
                : 'Escogemos tu primera entrega para el próximo sábado. Puedes pausar o cancelar antes del miércoles previo.'}
            </p>

            {submitted ? (
              <div className="card card-pad" style={{
                background: 'rgba(76, 157, 47, 0.08)',
                border: '1px solid rgba(76, 157, 47, 0.3)',
                borderRadius: 16,
                padding: 24,
              }}>
                <div className="eyebrow" style={{ color: 'var(--cosecha-deep)' }}>Confirmación</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>
                  Cajita {selected.label} · ${selected.price}/sem
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
                  Recogido en {pickupPoints.find(p => p.id === pickup)?.name}
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-ghost"
                  style={{ marginTop: 20 }}
                >
                  Ajustar selección
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="card card-pad" style={{ padding: 24, display: 'grid', gap: 16 }}>
                <div className="field">
                  <label className="field-label" htmlFor="cajita-name">Tu nombre</label>
                  <input
                    id="cajita-name"
                    className="field-input"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Marisol Rivera"
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="cajita-email">Correo</label>
                  <input
                    id="cajita-email"
                    className="field-input"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@correo.pr"
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="cajita-pickup">Punto de recogido</label>
                  <select
                    id="cajita-pickup"
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
                  background: 'var(--crema)',
                  borderRadius: 12, padding: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div className="eyebrow">Total semanal</div>
                    <div style={{
                      fontFamily: 'Fraunces, Georgia, serif',
                      fontSize: 26, fontWeight: 500, color: 'var(--savia)',
                    }}>
                      ${selected.price}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>
                    Cajita {selected.label}<br/>{selected.weight} · {selected.serves}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Reservar mi cajita {Icons.arrow(16, '#F7F1E3')}
                </button>
                <p className="mono" style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', margin: 0 }}>
                  No se cobra hasta confirmar pago con ATH Móvil
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
