import {
  createContext, useCallback, useContext, useEffect, useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'dlm:profile:v1';

export type ProfileType = 'bonafide' | 'patio' | 'consumidor';

export type BonafideProfile = {
  type: 'bonafide';
  name: string;
  email: string;
  phone: string;
  farmName: string;
  town: string;
  cuerdas: number;
  bonafideId: string;
  createdAt: string;
};

export type PatioProfile = {
  type: 'patio';
  name: string;
  email: string;
  phone: string;
  town: string;
  produces: string;
  monthlyEstimate: string;
  vouchedByName: string;
  vouchedByBonafide: string;
  createdAt: string;
};

export type ConsumidorProfile = {
  type: 'consumidor';
  name: string;
  email: string;
  town: string;
  householdSize: number;
  pickupId: string;
  cajitaInterested: boolean;
  createdAt: string;
};

export type Profile = BonafideProfile | PatioProfile | ConsumidorProfile;

type ProfileState = {
  profile: Profile | null;
  setProfile: (p: Profile) => void;
  clear: () => void;
};

const ProfileCtx = createContext<ProfileState | null>(null);

function readInitial(): Profile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // shape-check: must be an object with one of the three known types
    if (
      parsed && typeof parsed === 'object' &&
      (parsed.type === 'bonafide' || parsed.type === 'patio' || parsed.type === 'consumidor') &&
      typeof parsed.name === 'string'
    ) {
      return parsed as Profile;
    }
    return null;
  } catch {
    return null;
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile | null>(readInitial);

  useEffect(() => {
    try {
      if (profile) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // storage unavailable
    }
  }, [profile]);

  const setProfile = useCallback((p: Profile) => setProfileState(p), []);
  const clear = useCallback(() => setProfileState(null), []);

  return (
    <ProfileCtx.Provider value={{ profile, setProfile, clear }}>
      {children}
    </ProfileCtx.Provider>
  );
}

export function useProfile(): ProfileState {
  const ctx = useContext(ProfileCtx);
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');
  return ctx;
}

export const profileLabels: Record<ProfileType, { label: string; short: string }> = {
  bonafide:   { label: 'Agricultor Bonafide', short: 'Bonafide' },
  patio:      { label: 'Cosecha de Patio',    short: 'Patio' },
  consumidor: { label: 'Consumidor',          short: 'Consumidor' },
};
