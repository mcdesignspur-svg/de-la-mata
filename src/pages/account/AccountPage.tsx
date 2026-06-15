import { Navigate } from 'react-router-dom';
import { useProfile } from '../../auth/ProfileContext';
import { BonafideDashboard } from './BonafideDashboard';
import { PatioDashboard } from './PatioDashboard';
import { ConsumidorDashboard } from './ConsumidorDashboard';

export function AccountPage() {
  const { profile } = useProfile();
  if (!profile) return <Navigate to="/onboarding" replace/>;

  switch (profile.type) {
    case 'bonafide':   return <BonafideDashboard profile={profile}/>;
    case 'patio':      return <PatioDashboard profile={profile}/>;
    case 'consumidor': return <ConsumidorDashboard profile={profile}/>;
  }
}
