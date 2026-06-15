import {
  createContext, useContext, useEffect, useMemo, useState, useCallback,
  type ReactNode,
} from 'react';
import { getProductById, effectivePrice } from '../data/products';

const STORAGE_KEY = 'dlm:cart:v1';

export type CartLine = { productId: string; qty: number };

type CartState = {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
};

const CartCtx = createContext<CartState | null>(null);

function readInitial(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.productId === 'string' && typeof l.qty === 'number' && l.qty > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage may be unavailable (private mode); fail silently
    }
  }, [lines]);

  const add = useCallback((productId: string, qty: number = 1) => {
    setLines(prev => {
      const existing = prev.find(l => l.productId === productId);
      if (existing) {
        return prev.map(l => l.productId === productId ? { ...l, qty: l.qty + qty } : l);
      }
      return [...prev, { productId, qty }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setLines(prev => prev.filter(l => l.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines(prev => {
      if (qty <= 0) return prev.filter(l => l.productId !== productId);
      return prev.map(l => l.productId === productId ? { ...l, qty } : l);
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const l of lines) {
      count += l.qty;
      const p = getProductById(l.productId);
      if (p) total += effectivePrice(p) * l.qty;
    }
    return { itemCount: count, subtotal: total };
  }, [lines]);

  const value: CartState = { lines, add, remove, setQty, clear, itemCount, subtotal };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
