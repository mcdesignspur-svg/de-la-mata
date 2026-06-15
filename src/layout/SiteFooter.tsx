import { Link } from 'react-router-dom';
import { LeafMark } from '../components/primitives';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="brand">
            <LeafMark size={28} color="#F7F1E3"/>
            <span className="serif brand-word" style={{ color: '#F7F1E3' }}>De La Mata</span>
          </div>
          <p className="site-footer-mission">
            Marketplace agrícola directo de Puerto Rico. Del surco a la mesa,
            sin intermediarios.
          </p>
        </div>

        <div className="site-footer-cols">
          <div>
            <div className="eyebrow" style={{ color: '#E8A33D', marginBottom: 12 }}>Comprar</div>
            <ul className="site-footer-links">
              <li><Link to="/">Mercado</Link></li>
              <li><Link to="/cajita">Cajita Local</Link></li>
              <li><Link to="/mapa">Puntos de recogido</Link></li>
              <li><Link to="/onboarding/consumidor">Crear cuenta</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: '#E8A33D', marginBottom: 12 }}>Vender</div>
            <ul className="site-footer-links">
              <li><Link to="/agricultores">Para agricultores</Link></li>
              <li><Link to="/onboarding/bonafide">Onboarding Bonafide</Link></li>
              <li><Link to="/onboarding/patio">Onboarding Patio</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: '#E8A33D', marginBottom: 12 }}>Proyecto</div>
            <ul className="site-footer-links">
              <li><Link to="/deck">Moodboard / deck</Link></li>
              <li><a href="mailto:hola@delamata.pr">hola@delamata.pr</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span className="mono">© {new Date().getFullYear()} De La Mata · Puerto Rico</span>
        <span className="mono" style={{ opacity: 0.6 }}>v0.1 · pre-launch</span>
      </div>
    </footer>
  );
}
