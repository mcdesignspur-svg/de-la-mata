export type PickupPoint = {
  id: string;
  name: string;
  type: 'iglesia' | 'centro' | 'mercado' | 'finca';
  street: string;
  town: string;
  distanceMi: number;
  schedule: string;
  farmCount: number;
  open: boolean;
  /** approximate map coords (0-1 normalized within map svg viewport) */
  mapX: number;
  mapY: number;
};

export const pickupPoints: PickupPoint[] = [
  { id: 'san-felipe',     name: 'Iglesia San Felipe',     type: 'iglesia', street: 'Calle Betances',   town: 'Arecibo',    distanceMi: 1.8,  schedule: 'Sábado · 8–11am',   farmCount: 18, open: true,  mapX: 0.44, mapY: 0.36 },
  { id: 'plaza-utuado',   name: 'Plaza de Utuado',        type: 'mercado', street: 'Calle Justo Ortiz', town: 'Utuado',     distanceMi: 12.4, schedule: 'Domingo · 7am–1pm', farmCount: 24, open: false, mapX: 0.62, mapY: 0.58 },
  { id: 'centro-jayuya',  name: 'Centro Comunal Jayuya',  type: 'centro',  street: 'Carr. 144',         town: 'Jayuya',     distanceMi: 18.2, schedule: 'Sábado · 9am–12pm', farmCount: 11, open: true,  mapX: 0.21, mapY: 0.45 },
  { id: 'plaza-arecibo',  name: 'Plaza del Mercado Arecibo', type: 'mercado', street: 'Avenida Hostos',  town: 'Arecibo',    distanceMi: 0.8,  schedule: 'Sábado · 6am–2pm',  farmCount: 32, open: true,  mapX: 0.38, mapY: 0.48 },
];

export function getPickupById(id: string): PickupPoint | undefined {
  return pickupPoints.find(p => p.id === id);
}
