# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **design system package**, not an application. It documents and packages the visual language for **SquatGym**, an Argentine gym management platform (roles: Admin, Encargado, Secretaria, Profesor, Alumno; Spanish UI, dark theme). Everything derives from the canonical prototype in `sources/squatgym_prototype.html` — that file is the ground truth for interaction patterns; `colors_and_type.css` is the ground truth for tokens.

There is **no build system, no test suite, no package manager**. All HTML files open directly in the browser; React files load via CDN + Babel in `<script type="text/babel">`.

## Running / previewing

- **UI kit click-through:** open `ui_kits/squatgym_admin/index.html` directly in a browser. Boots React 18 + Babel standalone from CDN and imports `Shell.jsx`, `Primitives.jsx`, `Screens.jsx` as Babel-transformed scripts. No bundler.
- **Token previews:** open any file in `preview/` directly — each is a standalone card demonstrating one aspect (colors, type scale, buttons, alerts, etc.). They all pull tokens from `../colors_and_type.css`.
- **Canonical reference:** `sources/squatgym_prototype.html` is the original single-file vanilla-JS prototype. Read-only — treat as spec, not as code to edit.

## Architecture

**Token → Preview → Kit** is the flow:

1. `colors_and_type.css` defines every visual decision as a CSS custom property on `:root` (`--sg-bg`, `--sg-acc`, `--sg-ff-display`, `--sg-clip-login`, etc.). This is the **only** place hard-coded design values should live. When adding a new color/spacing/motion value, add a token here first.
2. `preview/*.html` cards consume those tokens to demonstrate each aspect visually. Use these to validate a token change without running the full kit.
3. `ui_kits/squatgym_admin/` is the React recreation — three JSX modules + one HTML entry. Components here **must read from CSS vars**, never inline hex values. Structure:
   - `Shell.jsx` — `Topbar`, `Sidebar`, `PageHeader`, and the `ROLES` / `NAV_BY_ROLE` maps that drive per-role navigation.
   - `Primitives.jsx` — `Btn`, `Badge`, `Stat`, `Alert`, `Avatar`, `QuickAction`, `FormField`, `FormSection`. New reusable atoms go here.
   - `Screens.jsx` — route-level compositions (`LoginScreen`, `DashboardScreen`, `AlumnosScreen`, `AlumnoFormScreen`, `DetalleAlumnoScreen`). App state (current screen, role, selected alumno) is managed here via `useState` in a top-level `<App/>`, no router.
   - Screens stubbed as "PRÓXIMAMENTE": Declaración Jurada, Baja confirmation, Estado de Cuenta, Pagos, Asistencia, Horarios, Sedes, Reportes. Build these from existing primitives — do not invent new patterns.

`sources/` also contains text docs (`DIAGNOSTICO_UX.md`, `UX_COPY.md`, `WARNIER_LAYOUTS.md`, `NOTAS_SESION.md`) that are reference-only — read them to understand intent before changing copy, IA, or flagged UX issues.

## Non-negotiable design rules

These are load-bearing and easy to accidentally break:

- **Zero border-radius everywhere.** Only exception: avatars (`50%`). The "rounded" identity comes from the **signature 7px clip-path bevel** on primary/success/danger CTAs: `polygon(0 0, calc(100% - 7px) 0, 100% 100%, 7px 100%)` (token: `--sg-clip-cta`). Never add `border-radius` to buttons, cards, inputs, or badges.
- **Two fonts only.** `--sg-ff-display` (Bebas Neue, tracked caps) for titles/stats/logo; `--sg-ff-body` (Barlow) for everything else. Do not introduce a third family. Note: `ui_kits/squatgym_admin/index.html` experimentally uses Inter for body — this is a deviation from the documented system; match Barlow when working elsewhere unless the user explicitly asks for the Inter variant.
- **One accent color.** Orange `--sg-acc` (`#FF6B00`) + deep `--sg-acc2` (`#FF3A00`) for the signature diagonal gradient. Semantics only: `--sg-ok` / `--sg-err` / `--sg-warn`, always used at 12% tint fill + 30% border. Do not introduce other hues.
- **Hairline borders only.** `rgba(255,255,255,0.07)` (token `--sg-bor`). No drop shadows except modals (`0 4px 12px rgba(0,0,0,.4)`).
- **Title highlight pattern:** page titles split last word in orange — `<h1>GESTIÓN DE <span class="sg-accent">ALUMNOS</span></h1>`. Always the last word, always the key noun.
- **Logo:** `SQUAT` + `<span>GYM</span>` (span in accent orange), Bebas Neue. No standalone mark exists.
- **Background is flat** everywhere except the login right panel (diagonal orange gradient clipped via `--sg-clip-login` with a giant `SG` wordmark at 22rem).
- **Motion is minimal:** 150ms hover, 200ms base, 300ms for rare reveals. Easing `cubic-bezier(.4, 0, .2, 1)`. No bounces, no springs.

## Content / copy rules

- **Spanish (Argentine).** Current copy uses formal infinitives ("Complete el formulario") and tú-free imperatives ("Revisá", "Mirá"). Voseo is acceptable but not currently used — match surrounding text.
- **Casing:** UPPERCASE for titles, section headers, stat labels, buttons, badges, table headers, form labels. Title Case for named entities (plans, sedes). Sentence case for body and errors.
- **Tracked caps** are mandatory on all uppercase text: `letter-spacing: 0.08em`–`0.18em`.
- **Formats:** DNI `40.123.456` (dots, 8 digits); row numbers zero-padded to 3 digits (`001`); dates `DD/MM/YYYY` display / `YYYY-MM-DD` inputs; currency in ARS with Argentine grouping.
- **Emoji as icons** is used throughout the prototype but is **flagged as tech-debt** in `sources/DIAGNOSTICO_UX.md`. The documented migration target is Lucide (24×24, 2px stroke). Don't add new emoji iconography — prefer Lucide when introducing new icons.

## When asked to build visuals

- Throwaway mock / slide / artifact: copy relevant CSS + JSX into a self-contained static HTML file.
- Production component: read `ui_kits/squatgym_admin/Primitives.jsx` first — the atom likely already exists. Extend via props, don't duplicate.
- Always consume tokens via `var(--sg-*)`; never hard-code hex, px spacing, or font names.
