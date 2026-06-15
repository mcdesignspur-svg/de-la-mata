import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="container page-hero" style={{ maxWidth: 640 }}>
      <div className="eyebrow">404 · Página perdida en el conuco</div>
      <h1>Esta vereda no lleva a ningún lado.</h1>
      <p className="lede">
        Tal vez el enlace cambió, o nunca existió. Vuelve al mercado y empezamos de nuevo.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>
        Volver al mercado
      </Link>
    </section>
  );
}
