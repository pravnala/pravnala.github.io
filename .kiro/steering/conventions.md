# Conventions

Rules derived from project decisions. These take precedence over general defaults.

## Micro-Interactions & Animations

- Minimum transition duration for hover/interactive states: `duration-500`
- Use `transition-colors` for background-only changes, `transition-all` when transform is involved
- Card hover pattern: `hover:-translate-y-1` (subtle lift, no scale transforms)
- Image hover: opacity shift (`opacity-60` → `opacity-80`)
- Respect `prefers-reduced-motion` (already handled in global.css)

## Card Styling (on light sections)

- Use CorePhilosophy-style: `border-3 border-ink-400/30 bg-ink-600/30`
- Hover: `hover:border-ink-600 hover:-translate-y-1 transition-all duration-500`
- Text: title in `text-ink-900` or default, description in `text-ink-500`
- Keep cards as individual items in a grid — not a single bordered container wrapping all items

## Tables

- No row borders (`border-b` removed)
- Use alternating row backgrounds: even rows default, odd rows `bg-ink-800/50`
- Distinct hover per stripe: even `hover:bg-ink-600/50`, odd `hover:bg-ink-600/70`
- Add horizontal padding to first (`pl-4`) and last (`pr-4`) columns so content doesn't flush against section edges
- Header row gets a bottom border: `border-b-2 border-ink-600`

## Section Backgrounds (alternating pattern)

Draw from existing homepage tones. Available palette for section alternation:

| Tone                     | Usage                                                  |
| ------------------------ | ------------------------------------------------------ |
| `bg-ink-50 text-ink-900` | Light sections (InnerHero, ValueProps, CorePhilosophy) |
| `bg-ink-700`             | Mid-dark (DualPath dev card, ExperienceTable)          |
| `bg-ink-800`             | Slightly lifted dark (CTA sections)                    |
| `bg-ink-900`             | Base dark (default body, TechStack, GoodFit)           |

Adjacent sections must have visually distinct backgrounds. Never place two `bg-ink-900` sections next to each other.

## Data Architecture

- Page content is externalized to JSON files — never hardcoded in `.astro` components
- Structure: `src/data/{page}/` with one JSON file per section
- Example: `src/data/dev/hero.json`, `src/data/dev/experience.json`, etc.
- Components import only their own data file
- Dynamic values (e.g., years of experience) use `{placeholder}` syntax in JSON, replaced at build time in the page file

## Section Headings

- Every content section uses a two-tier heading: small `text-eyebrow` label + large `text-heading` below it
- Eyebrow: short category word (e.g., "Portfolio", "Career", "Tech", "Services", "Testimonials")
- Heading: descriptive, can use `<br />` for line breaks (e.g., "Selected\nProjects", "Current\nStack")
- Subheadings (h3): `text-xl md:text-2xl font-black tracking-[-0.02em]` — consistent across all sections
- Spacing: `mb-12` between heading and content (if a description paragraph follows the heading, use `mb-6` on heading and `mb-12` on description)
- Use "Selected" prefix to signal curated content (e.g., "Selected Projects", "Selected Experience")

## Case Studies / Content Collections

- Case study files live in `src/data/dev/case-studies/*.md`
- Schema supports optional fields: `problem`, `solution`, `outcome` can be omitted
- `hasDetailPage: boolean` controls whether a `/dev/[slug]` page is generated
- `externalUrl` + `externalLabel` for linking to live projects (label defaults to "View Project")
- Cover images: drop into `src/assets/images/case-studies/`, reference via `coverImage` frontmatter field
- Placeholder image used as fallback (gradient PNG in `src/assets/images/`)
- Card buttons: "View Details" for internal detail page, custom label for external link — both use the `Button` component (primary/secondary variants)

## Routes

- `/dev` — Web development portfolio (formerly `/work`)
- `/arnis` — FMA/Arnis instruction (formerly `/lapunti`)
- Nav labels: "Dev" and "Arnis" (short, parallel, equal weight)
