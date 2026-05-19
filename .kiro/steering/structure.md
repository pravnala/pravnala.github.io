# Project Structure

```
src/
  components/
    arnis/            # Arnis/FMA page sections (ArnisHero, InstructorBio, SeminarCTA)
    blog/             # Blog feed and card components
    common/           # Shared primitives: Button, BtnArrow
    contact/          # Contact form and socials
    form/             # Form field primitives (TextInput, TextArea, SelectInput)
    home/             # Homepage sections (Hero, DualPath, CorePhilosophy)
    layout/           # Site-wide layout: Header, InnerHero
    ui/               # Generic UI primitives
    work/             # Work/portfolio: CaseStudies, CaseStudyCard, Experience, WorkCTA
  content/            # Markdown content files
    blog/             # Blog post .md files
    work/             # Case study .md files
  layouts/
    BaseLayout.astro  # Root layout — anti-FOUC script, fonts, ClientRouter, Header, reveal observer
  pages/
    blog/             # [slug].astro + index.astro
    work/             # [slug].astro + index.astro
    index.astro       # Homepage
    contact.astro
    lapunti.astro     # FMA/Arnis page (route is /lapunti, not /arnis)
    404.astro
  styles/
    global.css        # Tailwind @import, @theme tokens, base styles, utility classes
  content.config.ts   # Astro content collection schemas

public/               # Static assets (favicon, etc.)
src/assets/images/    # Optimized images (used via astro:assets Image component)
astro.config.mjs      # Astro config — integrations, Vite plugins, output mode
```

## Key Component Patterns

### `BaseLayout.astro`

Root layout for all pages. Provides: anti-FOUC dark class, font preconnects, `ClientRouter`, `Header`, and the global `.reveal` IntersectionObserver script (runs on `astro:page-load`).

### `Header.astro`

Fixed top nav (`z-60`). Scrolls to `is-scrolled` state (backdrop blur) after 80px. Includes hamburger → fullscreen mobile menu overlay with focus trap and keyboard handling. Re-initializes on `astro:after-swap`.

### `InnerHero.astro`

Used on inner pages (`/work`, etc.) as the page hero. Inverted colors: `bg-ink-50 text-ink-900`. Accepts `title` and `description` props. Features the `pravnala-sketch` image as a fixed decorative element.

### `Button.astro`

Accepts `href`, `variant` (`primary` | `secondary`), and spread props. Bordered, uppercase, small-tracking style. Primary: dark bg, light text. Secondary: light bg, dark text. Color-swap on hover, no scale transforms.

### `BtnArrow.astro`

Inline SVG arrow icon. Animates `translate-x-1` via `group-hover:translate-x-1` — parent must have `class="group"`.

## Conventions

- Components go in `src/components/{section}/ComponentName.astro`
- Shared primitives (no page-specific logic) go in `src/components/common/` or `src/components/ui/`
- All pages use `BaseLayout.astro` as the root layout
- FMA/Arnis page route is `/lapunti` (not `/arnis`)
- Content is authored as `.md` files with YAML frontmatter in `src/content/`
- Design tokens are defined once in `src/styles/global.css` under `@theme` — always check before adding new styles
- Section entrance: use `.reveal` class for scroll-triggered fade-up, `.animate-entrance` with `animation-delay` for immediate staggered entrance on load
