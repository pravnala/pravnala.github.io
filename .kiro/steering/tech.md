# Tech Stack

## Core

- **Framework**: Astro v6 (SSG — fully static output)
- **Runtime**: Bun
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **CMS**: Keystatic (local-only mode, dev only — excluded from production builds)
- **Language**: TypeScript (strict mode)
- **Deployment**: GitHub Pages

## Key Libraries

- `@astrojs/markdoc` + `@astrojs/mdx` — content authoring
- `@keystatic/astro` + `@keystatic/core` — local CMS UI at `/keystatic` (dev only)
- `astro:transitions` (`ClientRouter`) — View Transitions API for page navigation

## Tailwind v4 Rules

- Config lives in CSS, not `tailwind.config.js` — use `@theme` in `src/styles/global.css`
- Always read `src/styles/global.css` before styling to discover available design tokens
- Prefer defined tokens over arbitrary bracket values (e.g., `text-ink` over `text-[#000]`)
- Prefer standard utilities over arbitrary values (e.g., `h-px` over `h-[1px]`)
- For Tailwind v4 syntax questions, consult the latest Tailwind docs

## Theme

- Site is permanently dark -- no light mode, no theme toggle
- `html` element always has `class="dark"` applied via a simplified anti-FOUC inline script in `<head>`
- Base background is `--color-canvas: #0A0A0A`; no `html.dark` override block needed in `global.css`

## Content Collections

Defined in `src/content.config.ts` using Astro's `glob` loader:
- `blog`: `.mdoc` files in `src/content/blog/` — fields: `title`, `publishDate`, `category` (`tech` | `martial-arts`), `excerpt`, `draft`
- `work`: `.mdoc` files in `src/content/work/` — fields: `title`, `projectContext`, `problem`, `solution`, `outcome`, `technologies[]`, `isPublic`, `order`

Content is authored via Keystatic at `/keystatic` during dev and committed as `.mdoc` files.

## Common Commands

```bash
# Development server (with Keystatic CMS at /keystatic)
bun run dev

# Production build (static, Keystatic excluded)
bun run build

# Preview production build locally
bun run preview
```
