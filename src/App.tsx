import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './cart/CartContext';
import { ProfileProvider } from './auth/ProfileContext';
import { SiteLayout } from './layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { FincaPage } from './pages/FincaPage';
import { CajitaPage } from './pages/CajitaPage';
import { MapaPage } from './pages/MapaPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AgricultoresPage } from './pages/AgricultoresPage';
import { DeckPage } from './pages/DeckPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OnboardingChooser } from './pages/onboarding/OnboardingChooser';
import { BonafideOnboarding } from './pages/onboarding/BonafideOnboarding';
import { PatioOnboarding } from './pages/onboarding/PatioOnboarding';
import { ConsumidorOnboarding } from './pages/onboarding/ConsumidorOnboarding';
import { AccountPage } from './pages/account/AccountPage';

export function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <CartProvider>
          <Routes>
            {/* Standalone routes — no SiteLayout */}
            <Route path="/deck" element={<DeckPage />} />
            <Route path="/onboarding" element={<OnboardingChooser />} />
            <Route path="/onboarding/bonafide" element={<BonafideOnboarding />} />
            <Route path="/onboarding/patio" element={<PatioOnboarding />} />
            <Route path="/onboarding/consumidor" element={<ConsumidorOnboarding />} />

            {/* Site routes — wrapped in SiteLayout */}
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="finca/:slug" element={<FincaPage />} />
              <Route path="cajita" element={<CajitaPage />} />
              <Route path="mapa" element={<MapaPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="agricultores" element={<AgricultoresPage />} />
              <Route path="cuenta" element={<AccountPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </ProfileProvider>
    </BrowserRouter>
  );
}
