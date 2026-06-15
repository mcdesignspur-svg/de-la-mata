import type { ProduceKind } from '../components/primitives';

export type FreshnessGrade = 'A' | 'B' | 'C';

export type Freshness = {
  /**
   * Grade assigned by the Triaje de Frescura computer-vision pipeline:
   *   A — premium, recién cortado, ventana óptima
   *   B — buen estado, consumir esta semana
   *   C — consumo inmediato, descuento por madurez avanzada
   */
  grade: FreshnessGrade;
  /** Human-readable explanation surfaced in the badge tooltip / card */
  note: string;
  /** Approximate hours since harvest (used to format "cortado hoy 6am") */
  harvestedHoursAgo: number;
  /** Price multiplier applied by Triaje (A=1.0/+, B=1.0, C<1.0) */
  priceMultiplier: number;
};

export type Product = {
  id: string;
  kind: ProduceKind;
  name: string;
  farmSlug: string;
  /** base price in dollars per unit (before freshness multiplier) */
  basePrice: number;
  unit: 'lb' | 'u' | 'racimo' | 'manojo';
  organic: boolean;
  freshness: Freshness;
};

export const products: Product[] = [
  {
    id: 'aguacate-robles', kind: 'aguacate', name: 'Aguacate criollo',
    farmSlug: 'hacienda-los-robles', basePrice: 3.50, unit: 'lb', organic: true,
    freshness: { grade: 'A', note: 'cortado hoy 6am', harvestedHoursAgo: 6, priceMultiplier: 1.0 },
  },
  {
    id: 'platano-tito', kind: 'platano', name: 'Plátano maduro',
    farmSlug: 'conuco-don-tito', basePrice: 0.75, unit: 'u', organic: false,
    freshness: { grade: 'B', note: 'cortado ayer', harvestedHoursAgo: 28, priceMultiplier: 1.0 },
  },
  {
    id: 'cafe-utuado', kind: 'cafe', name: 'Café de altura',
    farmSlug: 'hacienda-utuado', basePrice: 18.00, unit: 'lb', organic: true,
    freshness: { grade: 'A', note: 'tostado el 18', harvestedHoursAgo: 60, priceMultiplier: 1.0 },
  },
  {
    id: 'yautia-ceiba', kind: 'yautia', name: 'Yautía blanca',
    farmSlug: 'batey-la-ceiba', basePrice: 2.80, unit: 'lb', organic: true,
    freshness: { grade: 'B', note: 'cosechada ayer', harvestedHoursAgo: 30, priceMultiplier: 1.0 },
  },
  {
    id: 'mango-robles', kind: 'mango', name: 'Mango mayagüezano',
    farmSlug: 'hacienda-los-robles', basePrice: 1.20, unit: 'u', organic: true,
    freshness: { grade: 'C', note: 'maduro · consumir hoy', harvestedHoursAgo: 72, priceMultiplier: 0.7 },
  },
  {
    id: 'calabaza-ceiba', kind: 'calabaza', name: 'Calabaza criolla',
    farmSlug: 'batey-la-ceiba', basePrice: 4.50, unit: 'u', organic: true,
    freshness: { grade: 'A', note: 'cosechada hoy', harvestedHoursAgo: 4, priceMultiplier: 1.0 },
  },
  {
    id: 'lechuga-tito', kind: 'lechuga', name: 'Lechuga del campo',
    farmSlug: 'conuco-don-tito', basePrice: 2.50, unit: 'u', organic: false,
    freshness: { grade: 'A', note: 'cortada hoy 7am', harvestedHoursAgo: 5, priceMultiplier: 1.0 },
  },
  {
    id: 'tomate-tito', kind: 'tomate', name: 'Tomate cherry',
    farmSlug: 'conuco-don-tito', basePrice: 5.50, unit: 'lb', organic: false,
    freshness: { grade: 'B', note: 'cortado ayer', harvestedHoursAgo: 24, priceMultiplier: 1.0 },
  },
  // Patio tier example — vecino con excedentes
  {
    id: 'quenepa-vecina', kind: 'quenepa', name: 'Quenepa criolla',
    farmSlug: 'patio-doña-luisa', basePrice: 3.00, unit: 'lb', organic: true,
    freshness: { grade: 'A', note: 'recogida hoy del árbol', harvestedHoursAgo: 3, priceMultiplier: 1.0 },
  },
];

/** The price the consumer pays — base × Triaje multiplier, rounded to 2 decimals. */
export function effectivePrice(product: Product): number {
  return Math.round(product.basePrice * product.freshness.priceMultiplier * 100) / 100;
}

/** True when Triaje is offering a discount for immediate consumption */
export function isDiscounted(product: Product): boolean {
  return product.freshness.priceMultiplier < 1;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByFarm(farmSlug: string): Product[] {
  return products.filter(p => p.farmSlug === farmSlug);
}

export const categories: { kind: ProduceKind; label: string }[] = [
  { kind: 'aguacate', label: 'Aguacate' },
  { kind: 'platano',  label: 'Plátano' },
  { kind: 'cafe',     label: 'Café' },
  { kind: 'yautia',   label: 'Yautía' },
  { kind: 'mango',    label: 'Mango' },
  { kind: 'quenepa',  label: 'Quenepa' },
  { kind: 'calabaza', label: 'Calabaza' },
  { kind: 'lechuga',  label: 'Lechuga' },
];

export const freshnessMeta: Record<FreshnessGrade, { label: string; tagline: string; color: string; bg: string }> = {
  A: {
    label: 'Grado A',
    tagline: 'Recién cortado · ventana óptima',
    color: '#225A40',
    bg: '#E9F0DD',
  },
  B: {
    label: 'Grado B',
    tagline: 'Buen estado · esta semana',
    color: '#7d6a1f',
    bg: '#FAEBC2',
  },
  C: {
    label: 'Consumo inmediato',
    tagline: 'Maduro · descuento por madurez',
    color: '#8a3a1f',
    bg: '#F4D5C2',
  },
};
