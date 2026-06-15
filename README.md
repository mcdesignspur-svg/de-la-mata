# De La Mata

**Marketplace agrícola directo de Puerto Rico — del surco a la mesa, sin intermediarios.**

- **Tipo:** Concept / spec build **propio de MC Designs** (no es de cliente ni de familiar/amigo).
- **Propósito:** Pieza de portfolio + showcase de capacidad. Producto de tesis que puede **resonar fuerte con la audiencia y la sociedad de Puerto Rico**.
- **Status:** Prototipo navegable (v0.1) — frontend React vivo con data mock. Sin backend.
- **Stack:** React 18 + Vite + TypeScript + React Router. Sin dependencias de UI externas.
- **Última actualización:** 2026-06-15

> Es distinto al resto de `portfolio-projects/` (Agrocentro Solá, Shekinah son trabajos para familiares/amigos). **De La Mata es self-initiated**: un concepto que Miguel construye para enseñar lo que MC Designs puede hacer y porque la idea tiene peso social real. No hay cliente, deadline externo, ni contraprestación.

---

## La tesis

Puerto Rico **importa el ~85% de lo que come**. Eso es una falla estructural de seguridad nacional: precios 23% más altos que en EE.UU. con ingresos 63% más bajos, 33.2% de inseguridad alimentaria (40.6% en Arecibo), y todas las importaciones centralizadas en el Puerto de San Juan — en la ruta directa de los huracanes.

De La Mata ataca eso conectando **el surco con la mesa sin intermediarios**. No es solo comercio: es una herramienta de **soberanía alimentaria**. El argumento macro que cierra el pitch: si cada hogar gastara $1 diario en producto local, la economía recuperaría ~$1.4 millones al año y se generarían sobre 7,300 empleos rurales.

Por qué resuena en PR: habla el idioma del campo (conuco, batey, "fresco de la mata", "abombao"), se apoya en infraestructura real de la isla (ATH Móvil, iglesias/centros comunales como puntos de recogido) y se ancla a legislación real (Registro Digital de Agricultor Bonafide, **Ley Núm. 12-2026**).

El brief completo (con citas) vive en [`legacy/uploads/App para solucionar fallas en Puerto Rico.md`](legacy/uploads/App%20para%20solucionar%20fallas%20en%20Puerto%20Rico.md).

---

## Qué hay construido

Un frontend navegable con tres perfiles de usuario y un pitch deck visual.

**Tres caminos (onboarding por rol):**
1. **Agricultor Bonafide** (Tier 1 · Profesional) — finca registrada bajo la Ley 12-2026, sin tope de ventas, acceso a incentivos.
2. **Cosecha de Patio** (Tier 2 · Comunitario) — micro-productor (vecino, abuelo) con excedentes; ID local + validación comunitaria (vouched), con tope mensual por simplicidad legal.
3. **Consumidor** — busca fincas cercanas, suscripción a **Cajita Local** (modelo CSA) y recogido comunitario.

**Pantallas / rutas:**
- `/` — Marketplace (home del consumidor)
- `/finca/:slug` — Perfil de finca + agricultor (historia, cuerdas, en cosecha)
- `/cajita` — Suscripción Cajita Local (CSA semanal)
- `/mapa` — Fincas cercanas por proximidad
- `/checkout` — Carrito + pago (ATH Móvil conceptual)
- `/agricultores` — Landing para reclutar agricultores
- `/cuenta` — Dashboard por rol (Bonafide / Patio / Consumidor)
- `/onboarding` — Selector de perfil + flujo por rol
- `/deck` — **Pitch deck visual** (design canvas con artboards, paleta, decisiones abiertas)

**Conceptos del producto** (diseñados, aún no implementados como backend): sincronización offline para zonas sin banda ancha, validación Bonafide vía registro Ley 12-2026, trazabilidad / cuaderno de campo, triaje de frescura (fotos reales), pago con ATH Móvil + Instant QR, y puntos de recogido comunitarios.

---

## Marca

| Token | Color | Nombre |
|---|---|---|
| Cosecha (primary) | `#4C9D2F` | verde campo vivo |
| Savia (deep) | `#225A40` | verde profundo |
| Maduro (accent) | `#E8A33D` | dorado |
| Tierra (warm) | `#B8623A` | terracota |
| Crema / Hueso | `#F7F1E3` / `#FBF8F1` | superficies |
| Tinta | `#1A1F1A` | texto |

**Tipografía (implementada):** Fraunces (serif, titulares) + Inter (sans, UI) + JetBrains Mono (mono, etiquetas). Idioma: español (`<html lang="es">`).

---

## Correr el proyecto

```bash
npm install
npm run dev        # Vite dev server — http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run preview    # sirve el build de producción
npm run typecheck  # tsc --noEmit
```

No hay variables de entorno, base de datos, ni API keys. Todo corre con data local.

---

## Cómo está armado

```
de-la-mata/
  index.html              # entry (fonts, meta, #root)
  src/
    App.tsx               # rutas (React Router)
    main.tsx              # bootstrap
    styles.css            # tokens de marca + estilos globales
    auth/                 # ProfileContext — perfil del usuario (localStorage: dlm:profile:v1)
    cart/                 # CartContext — carrito
    layout/               # SiteHeader / SiteFooter / SiteLayout
    canvas/               # DesignCanvas + IOSFrame (para el /deck)
    screens/              # pantallas dentro de marcos iOS (para el deck)
    components/           # primitives, ProductCard, TabBar, FreshnessBadge
    pages/                # páginas reales del sitio (Home, Finca, Cajita, Mapa, Checkout...)
      onboarding/         # selector + flujo por rol (bonafide / patio / consumidor)
      account/            # dashboards por rol
    data/                 # farms.ts (7) · products.ts (11) · pickup-points.ts (7) — todo mock
  legacy/                 # prototipos JSX originales + el brief maestro (uploads/)
```

**Sin backend.** El estado del usuario se persiste en `localStorage`; los datos de fincas/productos son fixtures en `src/data/`. ATH Móvil, sync offline y validación Bonafide son **conceptuales** (diseñados en UI, no integrados).

Para el detalle técnico y las reglas al editar el código, ver [CLAUDE.md](CLAUDE.md).

---

## Próximos pasos posibles

_Lista viva — De La Mata no tiene deadline; se avanza cuando aporta al portfolio._

- [ ] Pulir el `/deck` como pieza presentable (es el activo de venta más fuerte hoy).
- [ ] Densidad del home: explorar arrancar por **finca** en vez de por producto (decisión abierta v0.2).
- [ ] Definir el modelo de riesgo CSA si la cosecha falla por huracán (crédito rollover / sustitución entre fincas / subsidio).
- [ ] Backend real solo si el concepto avanza a algo más que showcase (Supabase + ATH Móvil real).
- [ ] Case study: si se enseña a un prospect o se publica, escribir `case-study.md` (problema → solución → resonancia).

---

## Relacionado

- [`../README.md`](../README.md) — el programa Portfolio Projects de MC Designs
- [`legacy/uploads/App para solucionar fallas en Puerto Rico.md`](legacy/uploads/App%20para%20solucionar%20fallas%20en%20Puerto%20Rico.md) — plan maestro con fuentes
- `../../brand/DESIGN.md` — sistema de marca de MC Designs (De La Mata corre su propia paleta de campo, no la de MC Designs)
