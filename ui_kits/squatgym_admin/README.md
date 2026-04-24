# SquatGym Admin — UI Kit

Interactive React recreation of the SquatGym management platform. Lifted pixel-by-pixel from `sources/squatgym_prototype.html` and broken into modular, reusable components driven by `colors_and_type.css`.

## Files

- `index.html` — entry point. Boots React, injects the compiled styles, and renders `<App/>`. Demonstrates a realistic click-through: login → role selection → dashboard → alumnos list → alta form / ficha detalle.
- `Shell.jsx` — `Topbar`, `Sidebar`, `PageHeader`, role → navigation mapping (`ROLES`, `NAV_BY_ROLE`).
- `Primitives.jsx` — `Btn`, `Badge`, `Stat`, `Alert`, `Avatar`, `QuickAction`, `FormField`, `FormSection`.
- `Screens.jsx` — `LoginScreen`, `DashboardScreen`, `AlumnosScreen`, `AlumnoFormScreen`, `DetalleAlumnoScreen`.

## Running

Open `index.html` directly. No build step; loads React + Babel from CDN, imports JSX via `<script type="text/babel" src="...">`.

## Click-through coverage

1. **Login** — Demo role shortcuts (Admin / Encargado / Secretaria / Profesor / Alumno). All roles navigate to dashboard; each has a different sidebar and dashboard content.
2. **Dashboard** — KPI stats, quick-action cards, alert list. Content differs for `alumno` role (personal view).
3. **Alumnos** — Table with search + filter (estado, sede). Row actions: Ver → navigates to detalle, Editar, Baja.
4. **Alta / Modificación** — Multi-section form (Datos Personales / Contacto / Plan y Actividad).
5. **Ficha del Alumno** — Profile box with avatar, split panel (contacto / financiero).

## Not included (out of scope for the kit)

The kit is a visual + interaction recreation, not a functional product. These screens exist in the original prototype but are stubbed here as "PRÓXIMAMENTE" placeholders: Declaración Jurada, Baja confirmation, Estado de Cuenta, Pagos, Asistencia, Horarios, Sedes, Reportes. Pattern library from Primitives + Screens is enough to build them.
