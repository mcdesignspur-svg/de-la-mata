import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LeafMark, Icons } from '../components/primitives';
import { useCart } from '../cart/CartContext';
import { useProfile, profileLabels } from '../auth/ProfileContext';

const nav = [
  { to: '/mercado',       label: 'Mercado' },
  { to: '/cajita',        label: 'Cajita Local' },
  { to: '/mapa',          label: 'Mapa' },
  { to: '/agricultores',  label: 'Agricultores' },
];

export function SiteHeader() {
  const { itemCount } = useCart();
  const { profile, clear } = useProfile();
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu on outside click
  useEffect(() => {
    if (!profileMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [profileMenuOpen]);

  const firstName = profile?.name.split(' ')[0] ?? '';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <LeafMark size={24} color="#225A40"/>
          <span className="serif brand-word">De La Mata</span>
        </Link>

        <nav className={`site-nav ${open ? 'is-open' : ''}`}>
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/mercado'}
              className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header-actions">
          {profile ? (
            <div ref={profileMenuRef} style={{ position: 'relative' }}>
              <button
                type="button"
                className="profile-pill"
                aria-haspopup="menu"
                aria-expanded={profileMenuOpen}
                onClick={() => setProfileMenuOpen(o => !o)}
              >
                <span className="profile-avatar" aria-hidden="true">
                  {firstName.charAt(0).toUpperCase()}
                </span>
                <span className="profile-pill-name">{firstName}</span>
              </button>
              {profileMenuOpen && (
                <div role="menu" className="profile-menu">
                  <div className="profile-menu-header">
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{profile.name}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      {profileLabels[profile.type].label}
                    </div>
                  </div>
                  <div className="profile-menu-list">
                    <Link to="/cuenta" role="menuitem" onClick={() => setProfileMenuOpen(false)}>
                      {profile.type === 'consumidor' ? 'Mi cuenta' : 'Mi panel'}
                    </Link>
                    {profile.type === 'consumidor' && (
                      <Link to="/cajita" role="menuitem" onClick={() => setProfileMenuOpen(false)}>
                        Mi Cajita Local
                      </Link>
                    )}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        clear();
                        setProfileMenuOpen(false);
                      }}
                      className="profile-menu-signout"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/onboarding" className="join-btn">Únete</Link>
          )}

          <Link to="/checkout" className="cart-btn" aria-label="Carrito">
            {Icons.bag(20, '#225A40')}
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          <button
            className="menu-btn"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="#225A40" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="#225A40" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
