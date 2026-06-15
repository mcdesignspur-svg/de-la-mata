import type { ProduceKind } from '../components/primitives';

export type FarmTier = 'bonafide' | 'patio';

export type Farm = {
  slug: string;
  name: string;
  farmer: string;
  bio: string;
  region: string;
  barrio: string;
  distanceMi: number;
  rating: number;
  reviews: number;
  cuerdas: number;
  crops: number;
  harvests: number;
  organic: boolean;
  /**
   * Bonafide — Ley Núm. 12-2026 registry, no monthly limit, government incentives.
   * Patio    — micro-producer (vecino, abuelo) con excedentes; ID local
   *            + validación comunitaria, monthly cap on sales for legal simplicity.
   */
  tier: FarmTier;
  since: number;
  generation: number;
  inHarvest: { kind: ProduceKind; name: string; status: 'listo' | 'tostado' | string }[];
  story: string;
};

export const farms: Farm[] = [
  {
    slug: 'hacienda-los-robles',
    name: 'Hacienda Los Robles',
    farmer: 'Don Tito Feliciano',
    bio: 'Cuarta generación cultivando en las montañas de Utuado.',
    region: 'Utuado',
    barrio: 'Barrio Caguana',
    distanceMi: 28,
    rating: 4.9,
    reviews: 142,
    cuerdas: 32,
    crops: 18,
    harvests: 214,
    organic: true,
    tier: 'bonafide',
    since: 1987,
    generation: 4,
    inHarvest: [
      { kind: 'aguacate', name: 'Aguacate', status: 'listo' },
      { kind: 'cafe',     name: 'Café',     status: 'tostado' },
      { kind: 'platano',  name: 'Plátano',  status: 'listo' },
      { kind: 'yautia',   name: 'Yautía',   status: 'en 2 sem' },
      { kind: 'mango',    name: 'Mango',    status: 'en 3 sem' },
    ],
    story: 'Don Tito heredó la finca de su abuelo. Cultiva sin químicos desde 2002, y abastece a tres restaurantes de Cabo Rojo además de la cajita semanal.',
  },
  {
    slug: 'conuco-don-tito',
    name: 'Conuco de Don Tito',
    farmer: 'Don Tito Rivera',
    bio: 'Plátano y recao todo el año en las laderas de Jayuya.',
    region: 'Jayuya',
    barrio: 'Barrio Coabey',
    distanceMi: 2.1,
    rating: 4.7,
    reviews: 88,
    cuerdas: 12,
    crops: 9,
    harvests: 96,
    organic: false,
    tier: 'bonafide',
    since: 2003,
    generation: 2,
    inHarvest: [
      { kind: 'platano',  name: 'Plátano', status: 'listo' },
      { kind: 'lechuga',  name: 'Lechuga', status: 'listo' },
      { kind: 'tomate',   name: 'Tomate',  status: 'en 1 sem' },
    ],
    story: 'Conuco familiar de seis cuerdas que se expandió a doce tras Huracán María. Don Tito siembra rotando con leguminosas para mantener el suelo.',
  },
  {
    slug: 'batey-la-ceiba',
    name: 'Batey La Ceiba',
    farmer: 'Yari Maldonado',
    bio: 'Cooperativa de tres familias en el norte de Arecibo.',
    region: 'Arecibo',
    barrio: 'Barrio Esperanza',
    distanceMi: 6.8,
    rating: 4.8,
    reviews: 56,
    cuerdas: 22,
    crops: 14,
    harvests: 134,
    organic: true,
    tier: 'bonafide',
    since: 1995,
    generation: 3,
    inHarvest: [
      { kind: 'yautia',   name: 'Yautía',   status: 'listo' },
      { kind: 'calabaza', name: 'Calabaza', status: 'listo' },
      { kind: 'quenepa',  name: 'Quenepa',  status: 'en 4 sem' },
    ],
    story: 'Tres familias trabajando 22 cuerdas en cooperativa. Comparten equipos, semillas, y el riesgo de cada cosecha.',
  },
  {
    slug: 'hacienda-utuado',
    name: 'Hacienda Utuado',
    farmer: 'Carmen Reyes',
    bio: 'Café de altura, tostado en finca, desde 1962.',
    region: 'Utuado',
    barrio: 'Barrio Mameyes',
    distanceMi: 28,
    rating: 5.0,
    reviews: 203,
    cuerdas: 48,
    crops: 4,
    harvests: 62,
    organic: true,
    tier: 'bonafide',
    since: 1962,
    generation: 3,
    inHarvest: [
      { kind: 'cafe', name: 'Café arábica',  status: 'tostado' },
      { kind: 'cafe', name: 'Café typica',   status: 'en cosecha' },
    ],
    story: 'Café de sombra en altura, beneficio húmedo en finca. Carmen sigue tostando en máquina de su abuelo, ajustada con sensores nuevos.',
  },
  // Patio tier — vecina con árboles del solar y excedentes mensuales
  {
    slug: 'patio-doña-luisa',
    name: 'Patio de Doña Luisa',
    farmer: 'Doña Luisa Padilla',
    bio: 'Tres árboles de quenepa y un palo de aguacate en el patio.',
    region: 'Camuy',
    barrio: 'Barrio Yeguada',
    distanceMi: 4.4,
    rating: 4.9,
    reviews: 12,
    cuerdas: 0.3,
    crops: 4,
    harvests: 9,
    organic: true,
    tier: 'patio',
    since: 2024,
    generation: 1,
    inHarvest: [
      { kind: 'quenepa',  name: 'Quenepa',  status: 'listo' },
      { kind: 'aguacate', name: 'Aguacate', status: 'en 2 sem' },
    ],
    story: 'Doña Luisa lleva treinta años en su casa de Camuy. Los árboles del patio dan más de lo que ella sola consume — la app le da un canal legal y simple para vender el excedente sin formalizar una finca.',
  },
];

export function getFarmBySlug(slug: string): Farm | undefined {
  return farms.find(f => f.slug === slug);
}

export const tierMeta: Record<FarmTier, { label: string; short: string; color: string; bg: string }> = {
  bonafide: {
    label: 'Agricultor Bonafide',
    short: 'Bonafide',
    color: '#F7F1E3',
    bg: '#225A40',
  },
  patio: {
    label: 'Cosecha de Patio',
    short: 'Patio',
    color: '#5a4a2a',
    bg: '#FAEBC2',
  },
};
