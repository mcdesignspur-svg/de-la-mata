# CLAUDE.md — De La Mata

Instrucciones para agentes que trabajen en el código de **De La Mata**. Lee esto primero, luego el [README.md](README.md) para el contexto de producto.

## Qué es

De La Mata es un **concept / spec build propio de MC Designs** (no de cliente): un marketplace agrícola directo de Puerto Rico ("del surco a la mesa, sin intermediarios"). Hoy es un **prototipo frontend navegable (v0.1)** — su valor es como pieza de portfolio y showcase, no como producto en producción. Trátalo como tal: prioriza claridad del concepto y calidad visual sobre robustez de backend.

Vive en `Proyectos/MC Designs/portfolio-projects/de-la-mata/` dentro del 2nd Brain de Miguel (gitignored — no es repo git propio). Routing y guardrails del vault: ver el `CLAUDE.md` raíz del vault y el de `Proyectos/MC Designs/`.

## Stack

- **React 18 + Vite 5 + TypeScript 5** + **React Router 6**.
- **Cero dependencias de UI/CSS externas** — no Tailwind, no librería de componentes, no íconos de paquete. Todo es CSS plano + SVG inline. **Mantenlo así** salvo que Miguel pida lo contrario; parte del punto del build es que es ligero y self-contained.
- Fuentes vía Google Fonts en `index.html`: Fraunces (serif), Inter (sans), JetBrains Mono (mono).

## Comandos

```bash
npm install
npm run dev        # Vite dev server → http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run preview    # sirve dist/
npm run typecheck  # tsc --noEmit
```

No hay tests, linter, ni env vars. **El gate de calidad antes de dar algo por hecho es `npm run typecheck` (o `npm run build`) limpio.** No hay CI.

## Arquitectura

- **Entry:** `index.html` → `src/main.tsx` → `src/App.tsx` (define todas las rutas).
- **Rutas con layout** (envueltas en `SiteLayout`): `/`, `/finca/:slug`, `/cajita`, `/mapa`, `/checkout`, `/agricultores`, `/cuenta`, `*`.
- **Rutas standalone** (sin layout): `/deck`, `/onboarding`, `/onboarding/{bonafide,patio,consumidor}`.
- **Estado global:** dos contextos, ambos en `App.tsx` —
  - `auth/ProfileContext.tsx` — perfil del usuario, uno de tres tipos (`bonafide | patio | consumidor`), persistido en `localStorage` bajo `dlm:profile:v1`.
  - `cart/CartContext.tsx` — carrito.
- **Datos:** `src/data/` — `farms.ts`, `products.ts`, `pickup-points.ts`. Son **fixtures mock**, tipados. No hay fetch ni backend.
- **`src/pages/`** = páginas reales del sitio. **`src/screens/`** = versiones de pantalla renderizadas dentro de marcos iOS (`canvas/IOSFrame.tsx`) para el pitch deck `/deck`. No los confundas: editar una `page` cambia el sitio; editar un `screen` cambia el deck.
- **`src/components/primitives.tsx`** — `LeafMark`, `Icons`, `ProduceGlyph` y tipos compartidos (`ProduceKind`). La mayoría del SVG/iconografía sale de aquí.
- **`legacy/`** — prototipos JSX originales + el brief maestro en `legacy/uploads/`. Material de referencia; **no se importa desde `src/`**. No lo edites para cambiar el app.

## Marca (tokens en `src/styles.css`)

Paleta de campo, **propia de De La Mata** (NO la marca de MC Designs):
`--cosecha #4C9D2F` · `--savia #225A40` · `--maduro #E8A33D` · `--tierra #B8623A` · `--crema #F7F1E3` · `--hueso #FBF8F1` · `--ink #1A1F1A`. Usa los CSS vars, no hardcodees hex nuevos. Idioma de toda la UI: **español de PR** (usa el léxico del campo: conuco, batey, cuerdas, "fresco de la mata").

## Modelo de dominio — tres roles

Cualquier feature debe respetar la distinción (definida en `ProfileContext.tsx` y `data/farms.ts`):

- **Bonafide** — agricultor registrado (Ley Núm. 12-2026), sin tope de ventas, incentivos gubernamentales.
- **Patio** — micro-productor con excedentes; validación comunitaria (`vouchedBy...`), tope mensual de ventas.
- **Consumidor** — compra producto local, suscripción Cajita Local (CSA), recogido comunitario.

## Guardrails

- **Es prototipo/showcase, no prod.** No añadas backend, auth real, pagos reales, ni servicios externos sin que Miguel lo pida explícito. ATH Móvil, sync offline y validación Bonafide son **conceptuales** (UI only) por diseño.
- **No metas dependencias nuevas** a la ligera (ver Stack). Si una feature parece necesitar una librería, propónlo primero.
- **Mantén la data mock coherente y tipada.** Si añades una finca/producto, respeta los tipos existentes (`Farm`, etc.).
- **El `/deck` es el activo de venta más fuerte.** Si tocas screens o el canvas, verifica que el deck siga renderizando.
- Después de cambios, corre `npm run typecheck` antes de reportar listo.

## Por hacer / decisiones abiertas

Ver "Próximos pasos" en el [README.md](README.md) y las "decisiones abiertas" dentro de `src/pages/DeckPage.tsx` (densidad del home: ¿arrancar por finca o por producto?; modelo de riesgo CSA ante huracán; onboarding Bonafide manual vs. auto-validado).
