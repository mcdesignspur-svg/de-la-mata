import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons, LeafMark } from '../components/primitives';
import { SiteFooter } from '../layout/SiteFooter';

const HERO_SRCSET = [
  '/images/hero/hero-640.webp 640w',
  '/images/hero/hero-960.webp 960w',
  '/images/hero/hero-1280.webp 1280w',
].join(', ');

const HERO_SIZES = '(min-width: 900px) 50vw, 100vw';

const stats = [
  { value: '85%', label: 'de alimentos importados en la isla' },
  { value: '33%', label: 'de hogares con inseguridad alimentaria' },
  { value: '$1.4M', label: 'recuperables al año si cada hogar gasta $1/día local' },
];

const features = [
  {
    icon: Icons.bag(22, '#225A40'),
    title: 'Mercado directo',
    description: 'Compra yautía, café y mangó cortado esta semana — sin cadenas de supermercado ni viajes de 4,000 millas.',
    to: '/mercado',
  },
  {
    icon: Icons.pin(22, '#225A40'),
    title: 'Fincas cercanas',
    description: 'Explora agricultores por proximidad, conoce su historia, cuerdas y lo que tienen en cosecha hoy.',
    to: '/mapa',
  },
  {
    icon: <LeafMark size={22} color="#225A40" />,
    title: 'Cajita Local',
    description: 'Suscripción semanal tipo CSA: cosecha sorpresa de fincas de tu zona, recogida en punto comunitario.',
    to: '/cajita',
  },
  {
    icon: Icons.wifi(22, '#225A40'),
    title: 'Diseñado para offline',
    description: 'El agricultor registra cosecha desde el conuco sin señal. Todo se sincroniza al llegar a internet.',
    to: '/agricultores',
  },
  {
    icon: Icons.camera(22, '#225A40'),
    title: 'Triaje de frescura',
    description: 'Fotos reales del producto, no stock genérico. Grado de frescura asignado al subir la cosecha.',
    to: '/mercado',
  },
  {
    icon: Icons.check(22, '#225A40'),
    title: 'ATH Móvil + QR',
    description: 'Pago directo al agricultor cuando se escanea el QR en el punto de recogido. Sin retención de 30 días.',
    to: '/checkout',
  },
];

const ROLE_IMAGE_SIZES = '(min-width: 800px) 33vw, 100vw';

const roles = [
  {
    tier: 'Tier 1 · Profesional',
    title: 'Agricultor Bonafide',
    description: 'Finca registrada bajo la Ley Núm. 12-2026. Sin tope de ventas, acceso a incentivos gubernamentales.',
    to: '/onboarding/bonafide',
    bg: 'var(--savia)',
    fg: 'var(--crema)',
    accent: 'var(--maduro)',
    image: {
      src: '/images/roles/agricultor-800.webp',
      srcSet: '/images/roles/agricultor-400.webp 400w, /images/roles/agricultor-800.webp 800w',
      alt: 'Agricultor bonafide en el conuco con su cosecha.',
    },
  },
  {
    tier: 'Tier 2 · Comunitario',
    title: 'Cosecha de Patio',
    description: 'Vecino con excedentes del solar. Validación comunitaria y tope mensual para mantener simplicidad legal.',
    to: '/onboarding/patio',
    bg: '#FAEBC2',
    fg: '#5a4a2a',
    accent: '#8a3a1f',
    image: {
      src: '/images/roles/patio-800.webp',
      srcSet: '/images/roles/patio-400.webp 400w, /images/roles/patio-800.webp 800w',
      alt: 'Vecino compartiendo quenepas y excedentes del patio.',
    },
  },
  {
    tier: 'Cliente',
    title: 'Consumidor',
    description: 'Busca fincas cercanas, suscríbete a Cajita Local y recoge en iglesias o centros comunales.',
    to: '/onboarding/consumidor',
    bg: '#fff',
    fg: 'var(--ink)',
    accent: 'var(--savia)',
    image: {
      src: '/images/roles/consumidor-800.webp',
      srcSet: '/images/roles/consumidor-400.webp 400w, /images/roles/consumidor-800.webp 800w',
      alt: 'Familia recogiendo su Cajita Local en un punto comunitario.',
    },
  },
];

const SPLASH_MS = 2200;

export function LandingPage() {
  const [splash, setSplash] = useState(true);
  const [splashExiting, setSplashExiting] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setSplashExiting(true), SPLASH_MS - 500);
    const doneTimer = window.setTimeout(() => {
      setSplash(false);
      setContentReady(true);
    }, SPLASH_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className="landing-page">
      {splash && (
        <div
          className={`landing-splash${splashExiting ? ' is-exiting' : ''}`}
          aria-hidden={splashExiting}
        >
          <div className="landing-splash-leaf">
            <LeafMark size={88} color="#F7F1E3" />
          </div>
          <div className="landing-splash-brand serif">De La Mata</div>
        </div>
      )}

      <div className={`landing-body${contentReady ? ' is-visible' : ''}`}>
        <section className="landing-hero">
          <header className="landing-header">
            <Link to="/" className="brand" aria-label="Inicio">
              <LeafMark size={26} color="#225A40" />
              <span className="serif brand-word">De La Mata</span>
            </Link>
            <div className="landing-header-actions">
              <Link to="/deck" className="landing-link-muted">Deck</Link>
              <Link to="/mercado" className="btn btn-primary landing-enter-btn">
                Entrar al mercado {Icons.arrow(16, '#F7F1E3')}
              </Link>
            </div>
          </header>

          <div className="landing-hero-grid">
            <div className="landing-hero-copy">
              <div className="container landing-hero-inner">
                <div className="mono landing-hero-badge">Concept build · v0.1 · Puerto Rico</div>
                <h1 className="serif landing-hero-title">
                  Del surco<br />a la mesa.
                </h1>
                <p className="landing-hero-lede">
                  De La Mata es un marketplace agrícola directo que conecta agricultores
                  puertorriqueños con vecinos de su zona — sin intermediarios, sin importaciones
                  de 4,000 millas, con el idioma del campo.
                </p>
                <div className="landing-hero-ctas">
                  <Link to="/mercado" className="btn btn-primary">
                    Explorar el mercado {Icons.arrow(16, '#F7F1E3')}
                  </Link>
                  <Link to="/onboarding" className="btn btn-ghost landing-hero-ghost">
                    Crear cuenta
                  </Link>
                </div>
              </div>
            </div>

            <figure className="landing-hero-visual">
              <picture>
                <source type="image/webp" srcSet={HERO_SRCSET} sizes={HERO_SIZES} />
                <img
                  src="/images/hero/hero-1280.webp"
                  srcSet={HERO_SRCSET}
                  sizes={HERO_SIZES}
                  alt="Agricultores cosechando en el surco y una familia compartiendo la mesa — del campo a la comunidad."
                  width={1280}
                  height={1024}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </figure>
          </div>
        </section>

        <section className="container landing-purpose">
          <div className="eyebrow">La tesis</div>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 12 }}>
            Soberanía alimentaria, no solo comercio.
          </h2>
          <p className="landing-purpose-copy">
            Puerto Rico importa la gran mayoría de lo que come. Eso encarece la mesa,
            concentra el riesgo en el Puerto de San Juan — en la ruta directa de los huracanes —
            y deja al campo sin canal justo para vender fresco de la mata.
            De La Mata ataca esa falla estructural conectando el productor con quien come a su lado.
          </p>

          <div className="landing-stats">
            {stats.map(s => (
              <div key={s.label} className="landing-stat card card-pad">
                <div className="serif landing-stat-value">{s.value}</div>
                <div className="landing-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="container landing-features">
          <div className="eyebrow">Qué hay en la app</div>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 28 }}>
            Features del prototipo navegable.
          </h2>

          <div className="landing-features-grid">
            {features.map(f => (
              <Link key={f.title} to={f.to} className="landing-feature-card card card-pad">
                <div className="landing-feature-icon">{f.icon}</div>
                <h3 className="serif landing-feature-title">{f.title}</h3>
                <p className="landing-feature-desc">{f.description}</p>
                <span className="landing-feature-link">
                  Ver en la app {Icons.arrow(14, '#225A40')}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="container landing-roles">
          <div className="eyebrow">Tres caminos</div>
          <h2 className="section-title" style={{ marginTop: 8, marginBottom: 12 }}>
            Un perfil para cada rol en el campo.
          </h2>
          <p className="landing-purpose-copy" style={{ marginBottom: 28 }}>
            Bonafide para fincas profesionales bajo la Ley Núm. 12-2026.
            Patio para el vecino con quenepas de sobra.
            Consumidor para quien quiere comer local y recoger en comunidad.
          </p>

          <div className="landing-roles-grid">
            {roles.map(r => (
              <div
                key={r.title}
                className="landing-role-card"
                style={{
                  background: r.bg,
                  color: r.fg,
                  ...(r.bg === '#fff' ? { border: '1px solid var(--line-soft)' } : {}),
                }}
              >
                <figure className="landing-role-visual">
                  <img
                    src={r.image.src}
                    srcSet={r.image.srcSet}
                    sizes={ROLE_IMAGE_SIZES}
                    alt={r.image.alt}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>

                <div className="landing-role-body">
                  <div className="mono landing-role-tier" style={{ color: r.accent }}>
                    {r.tier}
                  </div>
                  <h3 className="serif landing-role-title">{r.title}</h3>
                  <p className="landing-role-desc">{r.description}</p>
                  <Link
                    to={r.to}
                    className="btn landing-role-cta"
                    style={{
                      ...(r.title === 'Agricultor Bonafide'
                        ? { background: 'var(--maduro)', color: 'var(--savia)' }
                        : r.title === 'Cosecha de Patio'
                          ? { background: 'var(--savia)', color: 'var(--crema)' }
                          : { background: 'var(--savia)', color: 'var(--crema)' }),
                    }}
                  >
                    Empezar onboarding {Icons.arrow(16, r.title === 'Agricultor Bonafide' ? '#225A40' : '#F7F1E3')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container landing-cta">
          <div className="landing-cta-card card card-pad">
            <div className="eyebrow">Prototipo · MC Designs</div>
            <h2 className="section-title" style={{ marginTop: 8, marginBottom: 10 }}>
              Esto es un concept build — frontend vivo con data mock.
            </h2>
            <p className="landing-purpose-copy" style={{ marginBottom: 0 }}>
              Sin backend ni pagos reales por diseño. La app demuestra flujos completos:
              mercado, fincas, Cajita Local, checkout con ATH Móvil conceptual,
              onboarding por rol y un pitch deck visual en <Link to="/deck" style={{ color: 'var(--savia)', textDecoration: 'underline' }}>/deck</Link>.
            </p>
            <div className="landing-cta-actions">
              <Link to="/mercado" className="btn btn-primary">
                Entrar al mercado {Icons.arrow(16, '#F7F1E3')}
              </Link>
              <Link to="/deck" className="btn btn-ghost">
                Ver pitch deck
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
