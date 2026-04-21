# Implementation Plan: Alvin Penaflor Website

## Overview

Incremental build of a dual-purpose Astro v6 static site (Dev + Arnis paths) deployed to GitHub Pages. Each task builds on the previous, ending with full integration. TypeScript strict mode throughout.

## Tasks

- [x] 1. Project scaffolding
  - Initialize Astro v6 project with Bun (`bun create astro`)
  - Enable TypeScript strict mode in `tsconfig.json`
  - Install and configure Tailwind CSS v4 (`bun astro add tailwind`)
  - Configure `astro.config.mjs` for SSG output, GitHub Pages `base` and `site` values, and `@astrojs/mdx` + `@keystatic/astro` integrations
  - Create `src/styles/global.css` with `@tailwind` directives and empty `@theme {}` block
  - Create placeholder `src/pages/index.astro` to confirm build succeeds
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 11.1, 11.4_

- [x] 2. Design system — tokens, typography, base styles
  - [x] 2.1 Populate `@theme` block in `src/styles/global.css`
    - Add monochromatic color tokens: `--color-ink`, `--color-paper`, `--color-ink-muted`, `--color-paper-muted`
    - Add typography tokens: `--font-display`, `--font-body`, `--font-weight-black`, `--font-weight-bold`
    - Add spacing token: `--spacing-section`
    - Add animation tokens: `--duration-reveal`, `--easing-reveal`
    - Configure Inter font via Astro font config (no render-blocking requests)
    - Add base styles: `html.dark` class overrides, `body` defaults, heading resets
    - Add `@media (prefers-reduced-motion: reduce)` block disabling non-essential animations
    - _Requirements: 1.4, 10.1, 10.2, 10.3, 10.6, 11.3_

  - [ ]\* 2.2 Write unit test: `@theme` tokens present in `global.css`
    - Assert `global.css` contains `@theme` block
    - Assert expected token names (`--color-ink`, `--color-paper`, `--font-display`, `--spacing-section`, `--duration-reveal`) are present
    - Assert `prefers-reduced-motion` media query is present
    - _Requirements: 10.3, 10.6_

- [x] 3. BaseLayout + anti-FOUC theme engine + ThemeToggle
  - [x] 3.1 Create `src/layouts/BaseLayout.astro`
    - Accept `BaseLayoutProps`: `title`, `description?`, `ogImage?`
    - Inject inline `<script>` in `<head>` that reads `localStorage.getItem('theme')` and falls back to `prefers-color-scheme`; sets `dark` class on `<html>` before first paint
    - Import `global.css`, configure font preloads, include `<ViewTransitions />`
    - _Requirements: 2.3, 2.4, 3.2, 11.3_

  - [x] 3.2 Create `src/components/ui/ThemeToggle.astro`
    - Render as `client:load` island
    - Read/write `localStorage` key `theme` (`'light' | 'dark'`)
    - On click: flip class on `<html>`, update `localStorage`, update toggle icon
    - _Requirements: 2.1, 2.2, 2.5_

  - [ ]\* 3.3 Write property test for theme toggle persistence (Property 1)
    - // Feature: alvin-penaflor-website, Property 1: Theme toggle persistence round-trip
    - Use `fc.constantFrom('light', 'dark')` — 100 iterations
    - For each initial theme: simulate toggle logic; assert `<html>` class flips and `localStorage` reflects new value
    - **Property 1: Theme toggle persistence round-trip**
    - **Validates: Requirements 2.2, 2.5**

- [x] 4. Header, Navigation, and active-link highlighting
  - [x] 4.1 Create `src/components/layout/Navbar.astro`
    - Render nav links to `/`, `/work`, `/arnis`, `/blog`, `/contact`
    - Derive active link from `Astro.url.pathname`; apply active indicator class to matching link only
    - Include `ThemeToggle` component
    - Make header responsive (hamburger menu on mobile)
    - Add micro-interaction styles on nav links (hover transitions)
    - _Requirements: 3.1, 3.4, 3.5, 10.5_

  - [x] 4.2 Wire `Header` into `BaseLayout`
    - Import and render `Header` inside `BaseLayout` above the `<slot />`
    - _Requirements: 3.1_

  - [ ]\* 4.3 Write unit test: Header renders all 5 nav links
    - Assert rendered HTML contains links to `/`, `/work`, `/arnis`, `/blog`, `/contact`
    - _Requirements: 3.1_

  - [ ]\* 4.4 Write property test for active nav link correctness (Property 2)
    - // Feature: alvin-penaflor-website, Property 2: Active navigation link correctness
    - Use `fc.constantFrom('/', '/work', '/arnis', '/blog', '/contact')` — 100 iterations
    - For each path: render Header with that pathname; assert exactly one link has the active class and its `href` matches the path
    - **Property 2: Active navigation link correctness**
    - **Validates: Requirements 3.5**

- [x] 5. Content collections — Zod schemas
  - Create `src/content/config.ts`
  - Define `blogCollection` with Zod schema: `title`, `publishDate`, `category` (enum `tech | martial-arts`), `excerpt?`, `draft` (default `false`)
  - Define `workCollection` with Zod schema: `title`, `projectContext`, `problem`, `solution`, `outcome`, `technologies` (string array), `isPublic` (default `true`), `order?`
  - Export both collections via `collections` object
  - _Requirements: 5.4, 7.4, 9.2, 9.3, 9.4_

- [x] 6. Keystatic CMS configuration
  - Create `keystatic.config.ts` at project root
  - Set `storage: { kind: 'local' }`
  - Define `blog` collection: slugField `title`, path `src/content/blog/*`, schema matching `blogCollection` (title, publishDate, category, excerpt, draft, content markdoc field)
  - Define `work` collection: slugField `title`, path `src/content/work/*`, schema matching `workCollection` (all fields + content markdoc field)
  - Add Keystatic route handler in `src/pages/keystatic/[...params].astro` and API route
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [ ]\* 6.1 Write unit test: Keystatic config correctness
    - Assert `storage.kind === 'local'`
    - Assert `blog` and `work` collections exist
    - Assert `blog` schema has `title`, `publishDate`, `category`, `excerpt`, `draft`, `content` fields
    - Assert `work` schema has `title`, `projectContext`, `problem`, `solution`, `outcome`, `technologies`, `isPublic`, `order`, `content` fields
    - _Requirements: 9.3, 9.4, 9.6_

- [x] 7. AnimatedSection component
  - Create `src/components/ui/AnimatedSection.astro`
  - Accept props: `animation?: 'fade-up' | 'fade-in' | 'slide-left'`, `delay?: number`
  - Use `IntersectionObserver` (client-side script) to add a `is-visible` class when the section enters the viewport
  - Apply CSS transition using `--duration-reveal` and `--easing-reveal` tokens
  - Skip animation (render immediately visible) when `prefers-reduced-motion: reduce` is active
  - _Requirements: 4.5, 10.5, 10.6_

- [x] 8. Home page
  - [x] 8.1 Create `src/components/home/Hero.astro`
    - High-impact headline, positioning statement, two CTAs: "View My Work" → `/work` and "Arnis Training" → `/arnis`
    - Apply text-over-image masking effect per design language
    - Wrap in `AnimatedSection`
    - _Requirements: 4.1, 4.4, 10.4_

  - [x] 8.2 Create `src/components/home/DualPath.astro`
    - Two visually distinct blocks: Dev_Path (links to `/work`) and Arnis_Path (links to `/arnis`)
    - Monochromatic editorial styling, high contrast
    - Wrap in `AnimatedSection`
    - _Requirements: 3.3, 4.2, 4.4_

  - [x] 8.3 Create `src/components/home/CorePhilosophy.astro`
    - Section communicating Alvin's professional and personal values
    - Wrap in `AnimatedSection`
    - _Requirements: 4.3, 4.4_

  - [x] 8.4 Assemble `src/pages/index.astro`
    - Use `BaseLayout`, compose `Hero`, `DualPath`, `CorePhilosophy`
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]\* 8.5 Write unit test: Home page structure
    - Assert page contains Hero section
    - Assert DualPath block contains links to `/work` and `/arnis`
    - Assert Core Philosophy section is present
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 9. Work page and case study detail page
  - [x] 9.1 Create `src/components/work/CaseStudyCard.astro`
    - Display title, project context summary, technologies list
    - Link to `/work/[slug]`
    - _Requirements: 5.1_

  - [x] 9.2 Create `src/components/work/ExperienceTable.astro`
    - Static table of NDA/private projects: industry, role, technologies (no confidential details)
    - _Requirements: 5.2_

  - [x] 9.3 Assemble `src/pages/work/index.astro`
    - Query `workCollection` for all `isPublic: true` entries, sorted by `order`
    - Render `CaseStudyCard` for each entry
    - Render `ExperienceTable`
    - Render CTA linking to `/contact`
    - Render empty-state message if collection is empty
    - _Requirements: 5.1, 5.2, 5.4, 5.5_

  - [x] 9.4 Create `src/pages/work/[slug].astro`
    - Use `getStaticPaths` to generate a page per case study
    - Render full content: title, projectContext, problem, solution, outcome, technologies
    - _Requirements: 5.3, 5.4_

  - [ ]\* 9.5 Write property test: Work page shows all public case studies (Property 3)
    - // Feature: alvin-penaflor-website, Property 3: Work page shows all public case studies
    - Use `fc.array(arbitraryCaseStudy(), { minLength: 3 })` — 100 iterations
    - For each generated set: render Work page; assert every public entry appears and total count ≥ 3
    - **Property 3: Work page shows all public case studies**
    - **Validates: Requirements 5.1**

  - [ ]\* 9.6 Write property test: Case study detail round-trip (Property 4)
    - // Feature: alvin-penaflor-website, Property 4: Case study detail round-trip
    - Use `fc.record({ title, problem, solution, outcome, ... })` — 100 iterations
    - For each generated case study: render `/work/[slug]`; assert title, problem, solution, outcome all appear in output
    - **Property 4: Case study detail round-trip**
    - **Validates: Requirements 5.3**

  - [ ]\* 9.7 Write unit test: Work page has CTA to /contact
    - Assert rendered Work page contains a link to `/contact`
    - _Requirements: 5.5_

- [x] 10. Checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Arnis page
  - [x] 11.1 Create `src/components/arnis/ArnisHero.astro`
    - Philosophy and lineage section for Lapunti Arnis de Abanico
    - Monochromatic editorial styling
    - Wrap in `AnimatedSection`
    - _Requirements: 6.1, 6.4_

  - [x] 11.2 Create `src/components/arnis/InstructorBio.astro`
    - Instructor biography detailing 16 years of Arnis experience
    - Wrap in `AnimatedSection`
    - _Requirements: 6.2_

  - [x] 11.3 Create `src/components/arnis/SeminarCTA.astro`
    - Seminar/Training call-to-action with clear prompt linking to `/contact`
    - _Requirements: 6.3_

  - [x] 11.4 Assemble `src/pages/arnis.astro`
    - Use `BaseLayout`, compose `ArnisHero`, `InstructorBio`, `SeminarCTA`
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ]\* 11.5 Write unit test: Arnis page structure
    - Assert page contains philosophy section, bio section, and CTA link to `/contact`
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 12. Blog page and post detail page
  - [x] 12.1 Create `src/components/blog/BlogCard.astro`
    - Display title, publishDate, category, excerpt
    - Link to `/blog/[slug]`
    - _Requirements: 7.1_

  - [x] 12.2 Create `src/components/blog/CategoryFilter.astro`
    - Client-side filter buttons: "All", "Tech", "Martial Arts"
    - On selection: show only matching `BlogCard` entries, hide others
    - _Requirements: 7.2, 7.3_

  - [x] 12.3 Create `src/components/blog/BlogFeed.astro`
    - Accept `posts: BlogPost[]` and `initialCategory?`
    - Sort posts by `publishDate` descending before rendering
    - Render `CategoryFilter` and a `BlogCard` per post
    - Render empty-state message if no posts match filter
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 12.4 Assemble `src/pages/blog/index.astro`
    - Query `blogCollection` excluding `draft: true` entries
    - Pass sorted posts to `BlogFeed`
    - _Requirements: 7.1, 7.4_

  - [x] 12.5 Create `src/pages/blog/[slug].astro`
    - Use `getStaticPaths` to generate a page per non-draft blog post
    - Render title, publishDate, category, and full body content
    - _Requirements: 7.5, 7.6_

  - [ ]\* 12.6 Write property test: Blog feed sort order (Property 5)
    - // Feature: alvin-penaflor-website, Property 5: Blog feed sort order
    - Use `fc.array(arbitraryBlogPost(), { minLength: 2 })` — 100 iterations
    - For each generated array: run sort logic; assert adjacent posts satisfy `posts[i].publishDate >= posts[i+1].publishDate`
    - **Property 5: Blog feed sort order**
    - **Validates: Requirements 7.1**

  - [ ]\* 12.7 Write property test: Blog category filter correctness (Property 6)
    - // Feature: alvin-penaflor-website, Property 6: Blog category filter correctness
    - Use `fc.tuple(fc.array(arbitraryBlogPost()), fc.constantFrom('tech', 'martial-arts'))` — 100 iterations
    - For each tuple: apply filter; assert every returned post has `category === selectedCategory`
    - **Property 6: Blog category filter correctness**
    - **Validates: Requirements 7.2, 7.3**

  - [ ]\* 12.8 Write property test: Blog post detail round-trip (Property 7)
    - // Feature: alvin-penaflor-website, Property 7: Blog post detail round-trip
    - Use `fc.record({ title, publishDate, category, body })` — 100 iterations
    - For each generated post: render `/blog/[slug]`; assert title, publishDate, category, body all appear in output
    - **Property 7: Blog post detail round-trip**
    - **Validates: Requirements 7.5, 7.6**

- [x] 13. Contact page
  - [x] 13.1 Create `src/components/contact/ContactForm.astro`
    - Fields: `name` (required), `email` (required, type="email"), `inquiryType` (required select: "Web Development" | "Arnis / Martial Arts"), `message` (required textarea)
    - HTML5 `required` attributes + custom JS inline validation on submit
    - Display inline error messages adjacent to each invalid field
    - _Requirements: 8.1, 8.2, 8.4, 8.5_

  - [x] 13.2 Assemble `src/pages/contact.astro`
    - Use `BaseLayout`, render `ContactForm`
    - Include LinkedIn and GitHub profile links
    - _Requirements: 8.1, 8.3_

  - [ ]\* 13.3 Write unit test: Contact page fields and links
    - Assert form has `name`, `email`, `inquiryType`, `message` fields
    - Assert inquiry type select has "Web Development" and "Arnis / Martial Arts" options
    - Assert page contains LinkedIn and GitHub links
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]\* 13.4 Write property test: Required field validation (Property 8)
    - // Feature: alvin-penaflor-website, Property 8: Contact form required-field validation
    - Use `fc.constantFrom('name', 'email', 'inquiryType', 'message')` — 100 iterations
    - For each field: simulate form submission with that field empty; assert form is blocked and inline error identifies the field
    - **Property 8: Contact form required-field validation**
    - **Validates: Requirements 8.4**

  - [ ]\* 13.5 Write property test: Email format validation (Property 9)
    - // Feature: alvin-penaflor-website, Property 9: Contact form email format validation
    - Use `fc.string()` filtered to exclude valid email patterns — 100 iterations
    - For each invalid email string: submit form; assert validation error is shown on the email field
    - **Property 9: Contact form email format validation**
    - **Validates: Requirements 8.5**

- [x] 14. Seed content
  - Create 3 public case study `.mdoc` files in `src/content/work/` with all required fields populated (title, projectContext, problem, solution, outcome, technologies, isPublic: true)
  - Create 2 sample blog post `.mdoc` files in `src/content/blog/` — one `tech`, one `martial-arts` — with `draft: false`
  - Verify build succeeds and Work page shows all 3 case studies, Blog page shows both posts
  - _Requirements: 5.1, 7.1, 9.2, 9.5_

- [x] 15. 404 page
  - Create `src/pages/404.astro`
  - Use `BaseLayout`, display a friendly "Page not found" message with a link back to `/`
  - _Requirements: 1.7_

- [x] 16. Checkpoint — ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 17. GitHub Pages deployment config
  - Confirm `astro.config.mjs` has correct `site` (e.g., `https://pravnala.github.io`) and `base` values
  - Create `.github/workflows/deploy.yml` using the official `withastro/action` GitHub Action
  - Workflow: trigger on push to `main`, build with Bun, deploy `dist/` to `gh-pages` branch
  - _Requirements: 11.1, 11.4_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints at tasks 10 and 16 ensure incremental validation
- Property tests (Properties 1–9) validate universal correctness; unit tests validate specific examples and edge cases
- Use Vitest for all tests; use fast-check for property-based tests (minimum 100 iterations each)
- Draft blog posts (`draft: true`) must never appear in the feed or generate detail pages
- Empty collection states must render gracefully with a message rather than crashing
