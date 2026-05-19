# Tech Stack

## Core

- **Framework**: Astro v6 (SSG — fully static output)
- **Runtime**: Bun
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- **Language**: TypeScript (strict mode)
- **Deployment**: GitHub Pages

## Key Libraries

- `@astrojs/mdx` — content authoring (MDX support for components in markdown)
- `astro:transitions` (`ClientRouter`) — View Transitions API for page navigation
- `astro:assets` (`Image`) — optimized image component

## Tailwind v4 Rules

- Config lives in CSS, not `tailwind.config.js` — use `@theme` in `src/styles/global.css`
- Always read `src/styles/global.css` before styling to discover available design tokens
- Prefer defined tokens over arbitrary bracket values (e.g., `text-ink-50` over `text-[#fff]`)
- Prefer standard utilities over arbitrary values (e.g., `h-px` over `h-[1px]`)
- Never use `[var(--token)]` syntax in class attributes — Tailwind v4 maps `@theme` tokens directly to utilities
- Color scale is `ink-{50..950}` (oklch neutral grayscale) — use these exclusively, no raw hex in classes

## Design Tokens (from `src/styles/global.css`)

```
--color-ink-50  → oklch(98% 0 0)   ← near-white, used for light surfaces & primary text on dark
--color-ink-100 → oklch(90% 0 0)
--color-ink-200 → oklch(80% 0 0)
--color-ink-300 → oklch(70% 0 0)   ← muted text, secondary elements
--color-ink-400 → oklch(60% 0 0)
--color-ink-500 → oklch(50% 0 0)   ← eyebrow text, subtle labels
--color-ink-600 → oklch(40% 0 0)   ← card borders, hover states
--color-ink-700 → oklch(30% 0 0)   ← card backgrounds (Dev path)
--color-ink-800 → oklch(20% 0 0)
--color-ink-900 → oklch(12% 0 0)   ← base body background
--color-ink-950 → oklch(4% 0 0)    ← deepest dark

--blur-glass: 16px
--blur-glass-heavy: 24px
--spacing-section: 6rem
--font-heading: 'Outfit', sans-serif
--font-body: 'Inter', sans-serif
--animate-fade-in-up: fadeInUp 1s ease forwards
```

## Theme

- Site is permanently dark — no light mode, no theme toggle
- `html` element always has `class="dark"` applied via anti-FOUC inline script in `<head>`
- Base background: `bg-ink-900`; inner page headers invert to `bg-ink-50 text-ink-900`

## Content Collections

Defined in `src/content.config.ts` using Astro's `glob` loader:

- `blog`: `.md` files in `src/content/blog/` — fields: `title`, `publishDate`, `category` (`tech` | `martial-arts`), `excerpt`, `draft`
- `work`: `.md` files in `src/content/work/` — fields: `title`, `projectContext`, `problem`, `solution`, `outcome`, `technologies[]`, `isPublic`, `order`

Content is authored directly as `.md` files with YAML frontmatter.

## Styling Rules

- Never use `<style>` blocks in `.astro` components
- Use Tailwind utility classes inline wherever possible
- When a selector can't be expressed inline (pseudo-elements, JS-toggled state classes), add it to `src/styles/global.css` using `@apply`
- Only use plain CSS in `global.css` for rules Tailwind can't express — complex animations, multi-value transitions, `clip-path`, `backdrop-filter` with CSS variables, etc.

## Common Commands

```bash
# Development server
bun run dev

# Production build (static)
bun run build

# Preview production build locally
bun run preview
```
