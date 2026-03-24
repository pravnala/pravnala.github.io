# Product

Alvin Penaflor's personal website — a dual-purpose portfolio and coaching site deployed as a static site to GitHub Pages (`https://pravnala.github.io/`).

## Purpose

Two distinct audiences, one site:
- **Web Developer portfolio**: 20+ years of experience, case studies, and selected experience table for NDA/private work
- **Arnis instructor**: 16 years of Lapunti Arnis de Abanico mastery, coaching philosophy, and seminar/training CTA

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, dual-path navigation (Dev vs. Arnis), core philosophy |
| `/work` | Case studies + experience table |
| `/arnis` | Instructor bio, philosophy, seminar CTA |
| `/blog` | Unified tech + martial arts feed with category filtering |
| `/contact` | Lead gen form with Dev/Arnis dropdown |

## Design Language

- Dark Glassmorphism -- permanently dark canvas (`#0A0A0A`), frosted-glass UI surfaces, no light mode
- Gray midtone hierarchy: `--color-ink` (#FFF), `--color-ink-muted` (#A1A1AA), `--color-ink-subtle` (#71717A)
- Glass surfaces: `backdrop-filter: blur(16px)`, `rgba(255,255,255,0.06)` backgrounds, subtle white borders
- Aggressive sans-serif typography: ultra-bold headers, tight tracking (`-0.04em`), tight leading (`1.05`)
- Prominent section reveal animations, fluid micro-interactions, spring-curve easing
- Astro View Transitions for seamless navigation between Dev and Arnis sections
