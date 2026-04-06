# Product

Alvin Penaflor's personal website — a dual-purpose portfolio and coaching site deployed as a static site to GitHub Pages (`https://pravnala.github.io/`).

## Purpose

Two distinct audiences, one site:

- **Web Developer portfolio**: 20+ years of experience, case studies, and selected experience table for NDA/private work
- **FMA (Filipino Martial Arts) instructor**: 16 years of Lapunti Arnis de Abanico mastery, coaching philosophy, and seminar/training CTA

## Pages

| Route      | Purpose                                                  |
| ---------- | -------------------------------------------------------- |
| `/`        | Hero (split-panel), dual-path navigation (Dev vs. FMA)   |
| `/work`    | Case studies + experience table                          |
| `/lapunti` | Arnis instructor bio, philosophy, seminar CTA            |
| `/blog`    | Unified tech + martial arts feed with category filtering |
| `/contact` | Lead gen form with Dev/Arnis dropdown                    |

## Design Language

- Permanently dark canvas (`bg-ink-900` = `oklch(12% 0 0)`), no light mode
- Color system is a neutral oklch grayscale scale: `ink-50` (near-white) through `ink-950` (near-black) — no glassmorphism, no frosted surfaces
- Hero uses a high-contrast split layout: light panel (`bg-ink-50`) with a fixed background sketch image, dark panel (`bg-ink-950/80`) with staggered text entrance
- Inner page headers (`InnerHeader`) use `bg-ink-50 text-ink-900` — inverted from the dark body — with the sketch image as a decorative fixed element
- Typography: ultra-bold headers (`font-black`, `tracking-[-0.04em]`, `leading-[1.05]`), `Outfit` for headings, `Inter` for body
- Buttons use a bordered, uppercase, small-tracking style with color-swap hover (no scale transforms)
- Section reveal animations via `.reveal` / `.reveal.active` (IntersectionObserver), staggered entrance via `.animate-entrance` with `animation-delay`
- Hover states on cards: `hover:-translate-y-2` + background lightening — no layout-shifting scale
- `BtnArrow` SVG icon animates `translate-x-1` on parent `.group:hover`
