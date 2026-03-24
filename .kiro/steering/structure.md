# Project Structure

```
src/
  components/         # UI components, organized by feature/section
    arnis/            # Arnis page components
    blog/             # Blog feed and card components
    contact/          # Contact form
    home/             # Homepage sections (Hero, DualPath, CorePhilosophy)
    layout/           # Site-wide layout components (Header, etc.)
    ui/               # Shared/generic UI primitives (ThemeToggle, AnimatedSection)
    work/             # Work/portfolio components
  content/            # Keystatic-managed content (committed as .mdoc files)
    blog/             # Blog post .mdoc files
    work/             # Case study .mdoc files
  layouts/
    BaseLayout.astro  # Root layout — includes anti-FOUC script, fonts, ClientRouter, Header
  pages/              # File-based routing
    api/keystatic/    # Keystatic API route (dev only)
    blog/             # [slug].astro + index.astro
    work/             # [slug].astro + index.astro
    keystatic/        # Keystatic admin UI (dev only)
  styles/
    global.css        # Tailwind @import, @theme tokens, base styles, dark mode overrides
  content.config.ts   # Astro content collection schemas

public/               # Static assets (favicon, etc.)
keystatic.config.ts   # Keystatic CMS schema (mirrors content.config.ts)
astro.config.mjs      # Astro config — integrations, Vite plugins, output mode
```

## Conventions

- Components go in `src/components/{section}/ComponentName.astro` — use descriptive subfolder names matching the page/feature
- Shared primitives (no page-specific logic) go in `src/components/ui/`
- All pages use `BaseLayout.astro` as the root layout
- Content is authored as `.mdoc` (Markdoc) via Keystatic; never edit `.mdoc` files manually unless necessary
- Design tokens (colors, fonts, spacing, animation) are defined once in `src/styles/global.css` under `@theme` — always check here before adding new styles
- Keystatic config in `keystatic.config.ts` must stay in sync with collection schemas in `src/content.config.ts`
