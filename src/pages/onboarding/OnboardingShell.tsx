import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { LeafMark } from '../../components/primitives';

type Props = {
  /** 1-indexed current step */
  step?: number;
  /** total step count for progress dots */
  totalSteps?: number;
  /** small label above main heading (e.g., "Onboarding · Bonafide") */
  eyebrow?: string;
  /** main heading rendered inside the shell */
  title?: string;
  /** secondary descriptor under the title */
  subtitle?: ReactNode;
  /** main body content (form fields, list, etc.) */
  children: ReactNode;
  /** sticky-ish footer with primary/back buttons */
  footer?: ReactNode;
  /** when true, the close link goes back to the chooser instead of home */
  exitTo?: string;
  /** swap the savia-50% background tint for white when content needs more breathing room */
  variant?: 'tinted' | 'plain';
};

export function OnboardingShell({
  step,
  totalSteps,
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  exitTo = '/',
  variant = 'tinted',
}: Props) {
  return (
    <div className={`onboarding-shell ${variant}`}>
      <header className="onboarding-header">
        <Link to="/" className="brand" aria-label="Inicio">
          <LeafMark size={26} color="#225A40"/>
          <span className="serif brand-word">De La Mata</span>
        </Link>
        <Link to={exitTo} className="onboarding-exit" aria-label="Salir del onboarding">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </Link>
      </header>

      {step !== undefined && totalSteps !== undefined && (
        <div className="onboarding-progress" aria-label={`Paso ${step} de ${totalSteps}`}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className={`onboarding-progress-dot ${i + 1 <= step ? 'is-filled' : ''}`}
              aria-hidden="true"
            />
          ))}
          <span className="onboarding-progress-label mono">
            Paso {step} de {totalSteps}
          </span>
        </div>
      )}

      <main className="onboarding-body">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        {title && <h1 className="onboarding-title serif">{title}</h1>}
        {subtitle && <p className="onboarding-subtitle">{subtitle}</p>}
        <div className="onboarding-content">{children}</div>
      </main>

      {footer && (
        <div className="onboarding-footer">
          <div className="onboarding-footer-inner">{footer}</div>
        </div>
      )}
    </div>
  );
}
