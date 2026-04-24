---
name: squatgym-design
description: Use this skill to generate well-branded interfaces and assets for SquatGym, an Argentine gym management platform — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files:
- `colors_and_type.css` — token source of truth. Import this and use CSS vars (`--sg-bg`, `--sg-acc`, `--sg-ff-display`, etc.) rather than hard-coding values.
- `ui_kits/squatgym_admin/` — React recreation with Shell, Primitives, Screens. Copy components from here as starting points.
- `preview/` — visual cards demonstrating each token and component.
- `sources/squatgym_prototype.html` — the original vanilla-JS prototype; canonical reference for interaction patterns.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy the CSS + relevant JSX components out and create static HTML files for the user to view. The app is Spanish-language and dark-themed — respect both by default.

If working on production code, copy assets and read the README to become an expert in designing with this brand. Pay particular attention to: the signature 7px clip-path bevel on CTAs, the `SQUAT<span>GYM</span>` wordmark pattern, the `TITLE <span>ACCENT</span>` heading pattern, Bebas Neue for display / Barlow for body, and the strict "no rounded corners except avatars" rule.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (role / screen / tone / which sede), and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.
