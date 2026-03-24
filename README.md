# Alvin Penaflor — Personal Website

Personal website for Alvin Penaflor, showcasing 20+ years of web development experience and 16 years of Arnis (Lapunti Arnis de Abanico) mastery.

Live site: [pravnala.github.io](https://pravnala.github.io)

## Tech Stack

- [Astro v6](https://astro.build) — static site generation
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling with `@theme` CSS variables
- [Keystatic](https://keystatic.com) — local-only CMS for content management
- [Bun](https://bun.sh) — runtime and package manager
- TypeScript (strict)
- GitHub Pages — deployment

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, dual-path navigation, core philosophy |
| `/work` | Case studies and selected experience table |
| `/arnis` | Lapunti Arnis de Abanico — instructor bio and seminar CTA |
| `/blog` | Unified tech + martial arts blog with category filtering |
| `/contact` | Contact form with dev/arnis context dropdown |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server (includes Keystatic CMS at /keystatic)
bun dev

# Build for production
bun build

# Preview production build
bun preview
```

## Content Management

Content is managed via Keystatic's local UI during development. Navigate to `/keystatic` while the dev server is running to create or edit blog posts and work case studies. Content is stored as `.mdoc` files in `src/content/` and committed to git alongside code changes.

## Design

Monochromatic editorial minimalism — high-contrast black and white, aggressive sans-serif typography, section reveal animations, and Astro View Transitions for seamless navigation between the dev and arnis sections.

Light/dark mode is supported with a manual toggle that persists via `localStorage` and includes an anti-flicker inline script to prevent FOUC.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds the site and deploys to GitHub Pages.
