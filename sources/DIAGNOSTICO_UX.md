# Diagnóstico UX/UI — SquatGym

**Fecha:** 2026-04-17
**Scope:** `index.html` (prototipo SPA, 911 líneas, 17 pantallas)
**Estándar a11y:** WCAG 2.1 AA
**Audits aplicados:** `design:design-critique` · `design:accessibility-review` · `design:design-system`

---

## Resumen ejecutivo

El prototipo tiene una **identidad visual sólida** (estética deportiva, paleta coherente, tipografías bien elegidas) pero presenta **problemas transversales** en tres áreas: (1) accesibilidad básica rota por uso de `<div onclick>` en lugar de `<button>`, (2) inconsistencia en la escala de tokens (spacings y tamaños tipográficos ad-hoc), y (3) falta de patrones estándar para modales, estados vacíos y loading.

**Score por eje:**

| Eje | Score | Comentario |
|---|---|---|
| Identidad visual | 8/10 | Paleta, tipografía, clip-paths distintivos |
| Jerarquía | 6/10 | Stats dashboard sin priorización, forms largos sin stepper |
| Consistencia | 5/10 | Dos sistemas paralelos de botones, spacings ad-hoc |
| Accesibilidad | 3/10 | `<div onclick>`, labels no asociadas, contraste al límite |
| Patrones | 4/10 | "Modales" son screens, sin empty states ni loading |
| Copy | 6/10 | Ya tiene propuesta en `UX_COPY.md` lista para aplicar |

**Issues totales:** 42 (🔴 12 críticos · 🟡 21 mayores · 🟢 9 menores)

---

## Lo que funciona bien

Antes de las recomendaciones, vale reconocer lo que no hay que tocar:

- **Sistema de color semántico** (`--ok/--err/--warn/--acc`) bien definido en `:root` (línea 9). Fácil de tokenizar más.
- **Tipografías diferenciadas** con propósito: Bebas Neue para titulares, Barlow para cuerpo. Jerarquía clara entre display y body.
- **Matriz PERMS** (línea 446-452) como fuente única de verdad para visibilidad de acciones. Eso evita inconsistencias de permisos en la UI.
- **Clip-path en botones primarios** y en el bloque derecho del login — diferencial visual memorable, acorde con la marca "gym".
- **Badges de estado con paleta coherente** (`b-ok/b-err/b-warn/b-mut`) y borde translúcido. Patrón reutilizable.
- **Topbar con role-badge** contextualiza inmediatamente quién está logueado.

---

## 1. Design Critique — Hallazgos

### 1.1 Primera impresión

**Login (líneas 142-175).** Compite demasiada información en el split. A los 2 segundos el ojo salta entre: logo SQUATGYM · tag "Sistema Integrado" · título "Iniciar Sesión" · bloque naranja gigante "GESTIÓN INTEGRAL" · número "SG" enorme al fondo · bloque de credenciales demo resaltado en naranja. Son 6 elementos peleando por atención.

**Recomendación:** Bajar el ruido del panel derecho (el "SG" gigante más el gradient — uno o el otro, no ambos). Colapsar "Credenciales demo" en un `<details>` que arranque cerrado. Esto deja el foco real en el formulario de login.

### 1.2 Usabilidad

| # | Hallazgo | Severidad | Recomendación |
|---|---|---|---|
| 1 | **Modales no son modales** (líneas 283-292, 358-366). Las pantallas de baja son screens normales con una card centrada. No hay backdrop, no hay focus trap, no se cierran con Escape, y se navegan con la sidebar aún visible. | 🔴 Crítico | Convertir en modales reales con `<dialog>` HTML nativo o un overlay con `role="dialog"` + focus trap + cierre con Escape. |
| 2 | **Form alumno sin stepper** (líneas 221-242). El usuario llena datos personales, contacto y plan en un solo scroll y después aparece de sorpresa la Declaración Jurada. No hay indicador de que son 2 pasos. | 🔴 Crítico | Stepper visible arriba: "1. Datos del alumno · 2. Declaración de salud". Así el usuario sabe qué viene. |
| 3 | **Tabla de alumnos: acciones pegadas** (línea 596). Los 3 botones Ver/Editar/Baja tienen `margin-left:.2rem` (línea 79). En mobile o densidad alta se tocan entre sí. | 🟡 Mayor | Gap mínimo de 8px entre action buttons, o menú kebab "⋯" en mobile. |
| 4 | **Dashboard: 4 stats sin priorización** (líneas 198, 543-547, 560-564). Todas las stat cards son del mismo tamaño y peso visual. El admin no sabe cuál es la métrica-norte del día. | 🟡 Mayor | Hacer una stat "hero" más grande (ej. Deudores, si hay) y las otras 3 secundarias. O resaltar la única accionable. |
| 5 | **Mi Plan (línea 382-387): tabla sin contexto de acción**. El alumno ve su cronograma pero no puede inscribirse/desinscribirse, no ve ocupación de la clase, no puede agregar al calendario. | 🟡 Mayor | Añadir acción "Agregar a Google Calendar" o al menos "Cupo: 18/20" en cada fila para contexto. |
| 6 | **Login con credenciales demo expuestas** (líneas 161-168). Aceptable para TPI académico, pero mezclar auth real con info de demo es anti-patrón fuera del contexto académico. | 🟢 Menor | Colapsar en `<details>`. Agregar leyenda "Solo para demostración — en producción este bloque no existe". |
| 7 | **Registro de asistencia: deudor bloqueado sin affordance claro** (línea 877). Muestra "DEUDOR - Restringido" en rojo pero el checkbox disabled se ve casi igual al habilitado. | 🟡 Mayor | Opacidad reducida (0.5), icon "🔒" antes del nombre, tooltip explicando la restricción. |
| 8 | **No hay loading states** ni skeletons en ninguna pantalla. Todo es instantáneo (demo), pero cuando se conecte a backend real los usuarios verán blancos abruptos. | 🟢 Menor | Documentar en handoff: cada `render*()` debe tener loading skeleton. |
| 9 | **No hay empty states visuales**. Tablas vacías muestran `<tr><td colspan="5">Sin registros</td></tr>` gris (línea 732). Sin ilustración ni CTA. | 🟡 Mayor | Empty state con icono grande, mensaje en 2 líneas y botón de acción ("Sin pagos registrados aún · [Registrar primer pago]"). |

### 1.3 Jerarquía visual

- **Lo que el ojo ve primero en Dashboard:** El bloque 4-columnas de stats (correcto).
- **Lo que ve segundo:** El título "PANEL PRINCIPAL" en Bebas Neue 2rem (correcto).
- **Lo que se pierde:** Las alertas al final (`dash-alerts`, línea 202). Van abajo del fold en pantallas medianas. Crítico para deudores/clases llenas.

**Recomendación:** Mover alertas arriba de los stats (o al lado). Son las que requieren acción del día.

### 1.4 Consistencia

| Elemento | Inconsistencia | Recomendación |
|---|---|---|
| Botones | Dos sistemas paralelos: `btn btn-p/btn-s/btn-d/btn-ok` (CTAs grandes, líneas 53-59) **vs** `ab ab-v/ab-e/ab-d` (action buttons compactos, líneas 79-82). Distinta nomenclatura para la misma familia. | Unificar bajo `btn` con modificadores de tamaño (`btn btn-p btn-sm`). |
| Clip-path | Solo 4 de los 7 tipos de botón tienen clip-path polígono (btn-p, btn-d, btn-ok, login-r). Los demás son rectangulares. | Aplicar clip-path solo a CTAs primarias o removerlo de todos. Actualmente es arbitrario. |
| Spacing | Valores ad-hoc: 0.2, 0.25, 0.3, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.9, 1, 1.2, 1.5, 1.8, 2rem. 17 valores distintos. | Escala de 6 pasos: 4/8/12/16/24/32px (0.25/0.5/0.75/1/1.5/2rem). |
| Tipografía | 8 font-sizes entre 0.65 y 0.85rem (líneas 20, 24, 34, 35, 64, 71, 72, 74). Casi imperceptibles entre sí. | Escala de 4 pasos: xs/sm/base/lg (12/14/16/18px). |
| Icons | Todo son emojis (🔑🏠📋🏋️🎓📋📞🏥📎✍️📥💾▶). Distinto estilo entre plataformas (Apple emoji vs Android emoji vs Windows emoji). | Migrar a SVG inline o set de iconos (Lucide, Phosphor). |
| Cards | `stat` tiene border-left 3px acc, `fsec` no tiene acento, `confirm-box` tiene border-top 3px err, `qa` tiene pseudo-elemento top 2px acc que anima on hover. 4 patrones distintos. | Decidir: o todas tienen acento o ninguna. Recomiendo: solo primary cards tienen acento (stat y qa), secundarias son planas (fsec, confirm-box). |

---

## 2. Accessibility Audit — Hallazgos

### 2.1 Contraste de color

| Elemento | Foreground | Background | Ratio | Requerido | ¿Pasa? |
|---|---|---|---|---|---|
| Texto cuerpo (`--txt` sobre `--bg`) | #F0F0F0 | #0A0A0A | 18.4:1 | 4.5:1 | ✅ |
| Texto muted (`--mut` sobre `--sur`) | #777 | #131313 | 4.48:1 | 4.5:1 | ❌ (límite) |
| Texto muted sobre `--bg` | #777 | #0A0A0A | 4.92:1 | 4.5:1 | ✅ |
| Label form (`label`, línea 90) | #777 | #131313 | 4.48:1 | 4.5:1 | ❌ |
| Placeholder input | ~#555 | #1C1C1C | ~3.2:1 | 4.5:1 | ❌ |
| `ph-sub` en dashboard | #777 | #0A0A0A | 4.92:1 | 4.5:1 | ✅ |
| Badge b-mut (texto #777) | #777 | rgba(119,119,119,.12) | ~3.8:1 | 4.5:1 | ❌ |
| `sb-item` inactivo | #777 | #131313 | 4.48:1 | 4.5:1 | ❌ |
| `role-btn` texto | #F0F0F0 | #131313 | 16.2:1 | 4.5:1 | ✅ |
| Focus border (rgba(255,107,0)) | #FF6B00 | #1C1C1C | 3.9:1 | 3:1 (non-text) | ✅ |

**Conclusión:** `--mut: #777` está en el límite de AA. **Subirlo a `#8C8C8C` o `#909090`** da 5.1:1 de forma conservadora.

### 2.2 Perceptible

| # | Hallazgo | Criterio | Severidad | Recomendación |
|---|---|---|---|---|
| 1 | `role-btn` son `<div>` sin role ni aria-label (líneas 155-159). Screen reader los lee como texto plano. | 4.1.2 | 🔴 Crítico | Convertir a `<button>` o agregar `role="button" aria-label="..."` |
| 2 | Emojis como únicos identificadores de items de sidebar (🏠📅💳✅) y quick actions. SR lee "house emoji" o salta. | 1.1.1 | 🟡 Mayor | `aria-hidden="true"` en el emoji + texto visible ya existe. |
| 3 | Login decorative "SG" gigante (línea 172) no marcado decorativo. | 1.1.1 | 🟢 Menor | Agregar `aria-hidden="true"`. |
| 4 | Labels de form no asociadas al input vía `for="id"` (líneas 149-150, 226-238, etc.). | 1.3.1 | 🔴 Crítico | Agregar `for="fa-apellido"` en cada label o envolver input dentro de label. |
| 5 | `chk-row` (líneas 249-256, 270): la descripción del checkbox está en un `<div>` hermano, no dentro de `<label>`. Click en texto no toggles el checkbox. | 1.3.1 / 3.3.2 | 🔴 Crítico | Envolver: `<label class="chk-row"><input type="checkbox"><span>...</span></label>`. |
| 6 | File upload area (líneas 261-265) es un `<div onclick>`. No accesible por teclado. | 2.1.1 | 🔴 Crítico | Envolver en `<label for="dj-file">` nativo. |
| 7 | Tablas sin `<caption>` ni `scope="col"` en `<th>`. SR lee todas las celdas sin contexto de columna. | 1.3.1 | 🟡 Mayor | Agregar `<caption class="sr-only">` + `scope="col"`. |

### 2.3 Operable

| # | Hallazgo | Criterio | Severidad | Recomendación |
|---|---|---|---|---|
| 8 | **`sb-item` son `<div onclick>`** (líneas 41-43, 497-498). No en tab order, Enter/Space no los activan. | 2.1.1 | 🔴 Crítico | `<button class="sb-item">` o `<a href="#" role="menuitem">`. |
| 9 | **`qa` (quick action) son `<div onclick>`** (líneas 110-113, 377-379, 566-569). Idem. | 2.1.1 | 🔴 Crítico | Convertir a `<button>` o `<a>`. |
| 10 | **`role-btn` login** (líneas 155-159): `<div>` clickeables. | 2.1.1 | 🔴 Crítico | `<button type="button">`. |
| 11 | **No hay focus ring visible en botones** (línea 53). Solo inputs tienen `:focus { border-color: var(--acc) }`. | 2.4.7 | 🔴 Crítico | Agregar `:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px }` global. |
| 12 | Touch targets: `.ab` (action button, línea 79) tiene padding .22rem .55rem → ~26x20px. Por debajo de 44x44. | 2.5.5 | 🟡 Mayor | Mínimo 32x32 en desktop, 44x44 en mobile (`@media (pointer:coarse)`). |
| 13 | Toggle (línea 120-125) tiene 40x20 — target width OK pero height < 44. | 2.5.5 | 🟢 Menor | Aumentar área clickeable con padding invisible. |
| 14 | **No hay skip-link** para saltar sidebar en cada navegación. | 2.4.1 | 🟡 Mayor | `<a href="#main-area" class="sr-only sr-only-focusable">Saltar al contenido</a>`. |
| 15 | Navegación entre screens usa `display:none/block` sin cambiar `<title>` ni URL. Browsing history no funciona, SR no anuncia cambio de página. | 4.1.2 | 🟡 Mayor | Al cambiar screen: update `document.title` y `history.pushState`. Agregar `role="status" aria-live="polite"` al cambio. |

### 2.4 Entendible

| # | Hallazgo | Criterio | Severidad | Recomendación |
|---|---|---|---|---|
| 16 | `alert()` nativo para errores y confirmaciones (15 llamadas, líneas 472, 639, 648, 654, 660, 661, 713, 716, 802, 810, 814, 826, 861, 892, 907). Bloquea, no se estiliza, pierde contexto del input. | 3.3.1 | 🟡 Mayor | Reemplazar por mensaje inline al lado del input (`aria-describedby`) + toast para confirmaciones globales. |
| 17 | Campos obligatorios usan `*` en label pero sin `aria-required="true"` ni `required` HTML consistente (algunos inputs sí lo tienen, otros no). | 3.3.2 | 🟡 Mayor | Agregar `required` + `aria-required="true"` + leyenda "Los campos con * son obligatorios" al inicio de cada form. |
| 18 | Mensajes de error tras `alert()` no persisten — el usuario los cierra y no los ve más. | 3.3.1 | 🟡 Mayor | Mensaje persistente bajo el campo hasta que se corrija. |

### 2.5 Robusto

| # | Hallazgo | Criterio | Severidad | Recomendación |
|---|---|---|---|---|
| 19 | "Modales" (baja-alumno, baja-clase) sin `role="dialog" aria-modal="true" aria-labelledby`. | 4.1.2 | 🔴 Crítico | Agregar roles y atributos ARIA. |
| 20 | Stats que cambian dinámicamente (asistencia, dashboard) no tienen `aria-live`. | 4.1.2 | 🟡 Mayor | `<div aria-live="polite">` en contador de presentes/ausentes. |
| 21 | Sidebar no usa `<nav>` ni `role="navigation"`. Es `<aside>` con `<div>` dentro. | 4.1.2 | 🟡 Mayor | `<nav aria-label="Navegación principal">`. |
| 22 | Topbar es `<div>`, no `<header>`. | 4.1.2 | 🟢 Menor | Usar `<header>`. |

### 2.6 Responsive / zoom

| # | Hallazgo | Severidad | Recomendación |
|---|---|---|---|
| 23 | `@media(max-width:768px)` oculta sidebar completa (línea 137) **sin reemplazo**. En mobile no hay navegación. | 🔴 Crítico | Hamburger menu o bottom-nav en mobile. |
| 24 | Zoom a 200% con navegador: stat-val de 2.2rem desborda, tabla hace scroll horizontal extenso. | 🟡 Mayor | Tabla responsive con stack en mobile. |
| 25 | Body font-size 0.85rem (~13.6px). Por debajo de 16px recomendado. | 🟡 Mayor | Subir a 15-16px (0.95-1rem). |

---

## 3. Design System Audit — Hallazgos

### 3.1 Coverage de tokens

| Categoría | Definidos en `:root` | Hardcoded en CSS |
|---|---|---|
| Colores | 11 tokens | ~8 rgba() ad-hoc |
| Spacing | 0 tokens | ~17 valores únicos |
| Typography sizes | 0 tokens | ~8 font-sizes |
| Font weights | 0 tokens | 4 weights inline |
| Border radius | 0 tokens | No hay border-radius (solo clip-path) |
| Shadows | 0 tokens | 1 box-shadow implícito (backdrop-filter) |
| Motion | 0 tokens | 3 durations (.15s, .2s, .3s) |
| Z-index | 0 tokens | 1 valor (100 en topbar) |

**Score de tokenización: 15/100.** Solo colores están tokenizados. El resto son valores mágicos.

### 3.2 Tokens sugeridos para agregar

```css
:root {
  /* Spacing — escala de 6 pasos */
  --sp-1: 0.25rem; /* 4px */
  --sp-2: 0.5rem;  /* 8px */
  --sp-3: 0.75rem; /* 12px */
  --sp-4: 1rem;    /* 16px */
  --sp-5: 1.5rem;  /* 24px */
  --sp-6: 2rem;    /* 32px */

  /* Typography — escala de 5 pasos */
  --fs-xs: 0.75rem;  /* 12px — labels, badges */
  --fs-sm: 0.875rem; /* 14px — body secundario */
  --fs-md: 1rem;     /* 16px — body principal */
  --fs-lg: 1.25rem;  /* 20px — subtítulos */
  --fs-xl: 2rem;     /* 32px — títulos */
  --fs-display: 2.5rem; /* 40px — Bebas Neue display */

  /* Motion */
  --dur-fast: 150ms;
  --dur-base: 200ms;
  --dur-slow: 300ms;
  --ease-out: cubic-bezier(.4, 0, .2, 1);

  /* Elevation */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,.4);
  --shadow-lg: 0 12px 32px rgba(0,0,0,.5);

  /* Radius */
  --r-sm: 2px;
  --r-md: 4px;
  --r-lg: 8px;
}
```

### 3.3 Componentes — inventario y score

| Componente | Estados | Variantes | Docs | Score |
|---|---|---|---|---|
| Button (`.btn`) | default, hover | p/s/d/ok | ❌ | 6/10 |
| Action Button (`.ab`) | default, hover | v/e/d | ❌ | 5/10 |
| Role Button (`.role-btn`) | default, hover | — | ❌ | 4/10 |
| Input | default, focus | text/email/tel/date/number/time/pw/select/textarea | ❌ | 7/10 |
| Checkbox (en `chk-row`) | default | — | ❌ | 3/10 (no accesible) |
| Toggle (`.tog`) | default, checked | — | ❌ | 6/10 |
| Card Stat (`.stat`) | default | — | ❌ | 7/10 |
| Card FSec (`.fsec`) | default | — | ❌ | 7/10 |
| Card Quick Action (`.qa`) | default, hover (animado) | — | ❌ | 8/10 |
| Badge (`.badge`) | default | ok/err/warn/mut | ❌ | 8/10 |
| Alert (`.alert`) | default | warn/err/ok/info | ❌ | 8/10 |
| Table | default, row-hover | — | ❌ | 6/10 |
| Sidebar Item (`.sb-item`) | default, hover, active | — | ❌ | 4/10 (no a11y) |
| Topbar | default | — | ❌ | 7/10 |
| Confirm Box (`.confirm-box`) | default | — | ❌ | 4/10 (no es modal real) |

**Score promedio: 5.9/10.** Buena base semántica, pero faltan estados (loading, disabled explícito, error) y documentación.

### 3.4 Acciones prioritarias

1. **Unificar familia Button.** Colapsar `.btn` y `.ab` en una sola familia con modificadores: `.btn` (base) + variantes (`.btn--primary`, `.btn--secondary`, `.btn--danger`, `.btn--success`, `.btn--ghost`) + sizes (`.btn--sm`, `.btn--md`, `.btn--lg`).
2. **Tokenizar spacing y typography** (ver bloque CSS arriba).
3. **Definir estados faltantes** para todos los componentes: `:focus-visible`, `:disabled`, loading (aria-busy), error.
4. **Documentar cada componente** en un `DESIGN_SYSCOMP.md` con variantes/estados/a11y.

---

## 4. Priorización consolidada

### 🔴 Críticos (bloquean uso para ciertos usuarios) — 12

| # | Issue | Líneas index.html |
|---|---|---|
| C1 | `<div onclick>` en sidebar, quick actions y role-btn | 41-43, 110-113, 155-159, 377-379, 497-498, 566-569 |
| C2 | Labels de form no asociadas al input | 90, 226-238, 267, 289, 332-338 |
| C3 | Checkbox con descripción fuera de `<label>` | 249-256, 270 |
| C4 | File upload con `<div onclick>` | 261-265 |
| C5 | "Modales" no son modales (sin `role="dialog"`, sin focus trap, sin Escape) | 283-292, 358-366 |
| C6 | Sin focus ring visible en botones | 53-59 |
| C7 | Mobile: sidebar oculta sin reemplazo | 137 |
| C8 | Form alumno largo sin stepper | 221-242 |
| C9 | `--mut: #777` falla AA en `--sur` | 9 |
| C10 | `alert()` bloquea y no es inclusivo (15 llamadas en total) | 472, 639, 648, 654, 660, 661, 713, 716, 802, 810, 814, 826, 861, 892, 907 |
| C11 | Navegación sin actualizar `<title>`/URL/aria-live | 501-520 |
| C12 | Tablas sin `<caption>` ni `scope` | 216, 309, 322, 385, 392, 399 |

### 🟡 Mayores (degradan experiencia) — 21

C13. Acciones tabla pegadas · C14. Dashboard stats sin priorización · C15. Mi Plan sin contexto · C16. Deudor bloqueado sin affordance · C17. Sin empty states · C18. Emojis como únicos íconos · C19. Tabla sin scope · C20. Tocuh targets pequeños · C21. Sin skip-link · C22. Sin aria-live en stats · C23. Sidebar no es `<nav>` · C24. `alert()` en vez de inline · C25. Campos obligatorios inconsistentes · C26. Errores no persisten · C27. Mensajes SR no anuncian cambio de screen · C28. Body font-size 13.6px · C29. Tabla no responsive · C30. Dos sistemas paralelos de botones · C31. Spacing ad-hoc (17 valores) · C32. 8 font-sizes distintos · C33. Cards con 4 patrones de acento distintos.

### 🟢 Menores (polish) — 9

C34. Credenciales demo expuestas · C35. Sin loading states · C36. Toggle < 44px height · C37. Login "SG" no aria-hidden · C38. Topbar es `<div>` · C39. Clip-path arbitrario entre botones · C40. Sin tokens de shadow/motion/radius · C41. Sin documentación de componentes · C42. No hay breadcrumbs en screens profundas.

---

## 5. Roadmap de mitigación (Fases 1-4)

Consolidado con el plan acordado, estos son los issues que cada fase cubre:

### Fase 1 — Aplicar UX copy (quick win)
**Cubre:** C10 parcialmente (reemplaza texto de `alert()` por el copy del `UX_COPY.md`).
**No cubre:** El reemplazo de `alert()` como mecanismo — eso va a Fase 2.
**Tiempo estimado:** 30 min.

### Fase 2 — Accesibilidad (críticos)
**Cubre:** C1, C2, C3, C4, C5, C6, C7, C9, C10, C11, C12, C14 (skip-link), C19, C22, C23, C25, C26, C27.
**Tiempo estimado:** 2-3 horas.
**Highlights:** convertir a `<button>`, asociar labels, modales con `<dialog>`, focus ring global, subir `--mut` a #909090, reemplazar `alert()` por toasts y mensajes inline con `aria-live`.

### Fase 3 — Design system / tokens
**Cubre:** C30, C31, C32, C33, C40, C41.
**Tiempo estimado:** 2 horas.
**Highlights:** tokenizar spacing/typography/motion, unificar familia Button, documentar en `DESIGN_SYSCOMP.md`.

### Fase 4 — Jerarquía y pulido
**Cubre:** C8 (stepper), C13 (gap tabla), C15 (Mi Plan), C16 (deudor affordance), C17 (empty states), C18 (iconos SVG), C20 (touch targets), C24 (inline errors), C28 (body font), C29 (tabla responsive), C34, C35 (loading skeletons), C42 (breadcrumbs).
**Tiempo estimado:** 3-4 horas.
**Highlights:** rediseñar dashboard con hero stat, añadir empty states ilustrados, stepper en form alumno, migrar emojis a Lucide, loading skeletons.

### Fase 5 (opcional) — Handoff doc
**Cubre:** spec para docente con tokens, componentes, estados, breakpoints, a11y notes. Útil para el informe final del TPI.
**Tiempo estimado:** 1 hora.

---

## 6. Decisiones que necesitan tu input

Antes de arrancar las fases siguientes, 3 definiciones rápidas:

1. **Mantener emojis o migrar a SVG?** Emojis ahorra peso pero no es accesible ni consistente entre OS. SVG requiere incluir set (~15-20kb). **Mi recomendación:** migrar a Lucide SVG inline.
2. **`<dialog>` HTML nativo o overlay custom?** El nativo es 1 línea y accesible por default. El overlay custom permite diseñar el backdrop. **Mi recomendación:** `<dialog>` (y estilizar con CSS).
3. **Aplicar cambios incrementales o hacer una versión v2 en paralelo?** Paralela permite comparar; incremental es más rápido. **Mi recomendación:** incremental (conservamos git como backup).

---

**Próximo paso sugerido:** arrancar **Fase 1 (aplicar UX copy)** porque es el cambio de menor riesgo y ya está todo documentado en `UX_COPY.md`. Después Fase 2 (a11y crítico), luego Fase 3 (design system), finalmente Fase 4 (polish visual).

¿Arrancamos con Fase 1 o preferís otro orden?
