# Requirements Document

## Introduction

This feature overhauls the visual design and interactivity of Alvin Penaflor's personal website — a dual-purpose portfolio and Arnis coaching site. The redesign pivots from a strict black/white monochromatic scheme to a **dark glassmorphism** aesthetic: a permanently dark canvas (`#0A0A0A`) with frosted-glass UI surfaces, gray midtone tokens for hierarchy, and fluid motion design. Light/dark mode toggling is removed entirely.

The improvements target six areas: design system overhaul (dark glass tokens), contrast compliance, animation and micro-interaction refinement, navbar visual quality, fullscreen mobile navigation menu, and a navbar scroll effect.

The site is built with Astro v6, Tailwind CSS v4, TypeScript, and Bun, deployed as a static site to GitHub Pages.

---

## Glossary

- **Site**: The Alvin Penaflor personal website at `https://pravnala.github.io/`
- **Header**: The `src/components/layout/Header.astro` component rendered in `BaseLayout.astro`
- **Navbar**: The navigation bar rendered inside the Header, containing the wordmark, nav links, and hamburger button
- **Mobile_Menu**: The fullscreen overlay navigation panel shown on viewports narrower than the `md` breakpoint (768px)
- **Scroll_Effect**: The visual state change applied to the Navbar when the user scrolls past a defined threshold
- **AnimatedSection**: The `src/components/ui/AnimatedSection.astro` component that wraps sections with reveal animations
- **ThemeToggle**: The `src/components/ui/ThemeToggle.astro` component — to be removed as part of this feature
- **Design_Token**: A CSS custom property defined in `src/styles/global.css` under `@theme`
- **Canvas**: The `--color-canvas` Design_Token (`#0A0A0A`), the permanent dark page background
- **Surface**: The `--color-surface` Design_Token — frosted glass card/panel background (`rgba(255,255,255,0.06)`)
- **Surface_Border**: The `--color-surface-border` Design_Token — subtle glass edge (`rgba(255,255,255,0.12)`)
- **Ink**: The `--color-ink` Design_Token (`#FFFFFF`), primary text on dark background
- **Ink_Muted**: The `--color-ink-muted` Design_Token (`#A1A1AA` — zinc-400), secondary/muted text passing WCAG AA
- **Ink_Subtle**: The `--color-ink-subtle` Design_Token (`#71717A` — zinc-500), tertiary text passing WCAG AA at 4.6:1 on Canvas
- **Accent**: The `--color-accent` Design_Token (`#E4E4E7` — zinc-200), used for active states and highlights
- **Blur_Glass**: The `--blur-glass` Design_Token (`16px`), standard backdrop-filter blur for glass surfaces
- **Reduced_Motion**: The `prefers-reduced-motion: reduce` media query preference
- **WCAG_AA**: Web Content Accessibility Guidelines 2.1 Level AA — minimum 4.5:1 contrast ratio for normal text, 3:1 for large text
- **View_Transitions**: Astro's `ClientRouter` View Transitions API used for page navigation

---

## Requirements

### Requirement 0: Design System Overhaul

**User Story:** As a developer, I want a cohesive dark glassmorphism design system defined in a single source of truth, so that all components share consistent tokens and the site feels unified.

#### Acceptance Criteria

1. THE Site SHALL permanently use a dark canvas background (`--color-canvas: #0A0A0A`) and SHALL NOT implement a light mode or theme toggle.
2. THE `ThemeToggle` component SHALL be removed from the Header and from `src/components/ui/`.
3. THE anti-FOUC script in `BaseLayout.astro` SHALL be simplified to always apply the dark theme class without reading `localStorage`.
4. THE `src/styles/global.css` `@theme` block SHALL define the following Design_Tokens, replacing all previous color tokens:
   - `--color-canvas: #0A0A0A`
   - `--color-surface: rgba(255, 255, 255, 0.06)`
   - `--color-surface-hover: rgba(255, 255, 255, 0.10)`
   - `--color-surface-border: rgba(255, 255, 255, 0.12)`
   - `--color-ink: #FFFFFF`
   - `--color-ink-muted: #A1A1AA`
   - `--color-ink-subtle: #71717A`
   - `--color-accent: #E4E4E7`
   - `--blur-glass: 16px`
   - `--blur-glass-heavy: 24px`
5. THE `body` base style SHALL set `background-color: var(--color-canvas)` and `color: var(--color-ink)`.
6. THE `html.dark` override block SHALL be removed from `global.css` as it is no longer needed.
7. THE `PROJECT_SPECS.md` design language section SHALL be updated to reflect the dark glassmorphism aesthetic, gray midtone tokens, and removal of light mode.

---

### Requirement 1: Contrast Compliance

**User Story:** As a visitor, I want all text and interactive elements to be clearly readable against the dark glass background, so that I can consume content without straining my eyes.

#### Acceptance Criteria

1. THE Site SHALL render all body text using `--color-ink` (`#FFFFFF`) or `--color-ink-muted` (`#A1A1AA`) at a minimum contrast ratio of 4.5:1 against `--color-canvas` (`#0A0A0A`), as defined by WCAG_AA.
2. THE Site SHALL render all heading text using `--color-ink` at a minimum contrast ratio of 3:1 against `--color-canvas`, as defined by WCAG_AA.
3. THE Site SHALL NOT use `opacity` values below `0.5` on any text element that conveys meaningful content.
4. THE Site SHALL replace all `opacity-40` and `opacity-60` utility classes on text elements with the `--color-ink-muted` or `--color-ink-subtle` tokens.
5. THE Site SHALL ensure that glass surface borders using `--color-surface-border` remain visible against `--color-canvas` at all times.
6. THE `--color-ink-subtle` token (`#71717A`) SHALL pass WCAG AA at 4.6:1 contrast against `--color-canvas` (`#0A0A0A`) for use as tertiary/label text.

---

### Requirement 2: Animation and Micro-Interaction Refinement

**User Story:** As a visitor, I want section reveals and interactive elements to feel polished and fluid, so that the site communicates craftsmanship through its motion design.

#### Acceptance Criteria

1. THE AnimatedSection SHALL support the following animation variants: `fade-up`, `fade-in`, `slide-left`, and `clip-up`.
   - `clip-up`: reveals content by expanding `clip-path` from `inset(100% 0 0 0)` to `inset(0% 0 0 0)`.
   - All variants SHALL use a duration of `700ms` and `cubic-bezier(0.16, 1, 0.3, 1)` easing for a fluid, spring-like feel.
2. THE AnimatedSection SHALL support a `delay` prop (in milliseconds) to allow staggered reveals of sibling elements.
3. WHEN a user hovers over a card component (CaseStudyCard, BlogCard, DualPath path block), THE Site SHALL:
   - Transition the card background from `--color-surface` to `--color-surface-hover` within 200ms using `ease-out`.
   - Translate the card `2px` upward using `transform: translateY(-2px)` within 200ms.
   - Intensify the glass border from `--color-surface-border` to `rgba(255,255,255,0.24)` within 200ms.
4. THE Site SHALL use `transform` and `opacity` exclusively for all animation properties, and SHALL NOT animate `width`, `height`, `top`, `left`, or other layout-triggering properties.
5. WHEN the `prefers-reduced-motion: reduce` media query is active, THE AnimatedSection SHALL immediately apply the `is-visible` class to all `.animated-section` elements without transition, and THE Site SHALL set all transition durations to `0.01ms`.
6. THE Site SHALL apply `will-change: transform` to `.animated-section` elements only while they are in the pre-visible state, and SHALL remove it after the `is-visible` class is applied.
7. WHEN a nav link in the Navbar is hovered, THE Site SHALL transition its color from `--color-ink-muted` to `--color-ink` within 150ms using `ease-out`.
8. THE Site SHALL add a directional arrow micro-interaction to CTA link elements (e.g., "View Work →") where the arrow translates `4px` to the right on hover within 150ms, using `transform: translateX()` only.
9. THE AnimatedSection intersection threshold SHALL be set to `0.15` (15% of element visible) to trigger reveals earlier and feel more prominent.

---

### Requirement 3: Navbar Visual Refinement

**User Story:** As a visitor, I want the navbar to feel premium and intentional, reinforcing the dark glassmorphism design language from the first moment I land on the site.

#### Acceptance Criteria

1. THE Navbar SHALL use a `h-16` (64px) height to provide breathing room around the wordmark and nav links.
2. THE Navbar SHALL render the wordmark "AP" at `text-base` size with `font-black` weight and `tracking-[-0.04em]` letter-spacing.
3. THE Navbar SHALL render desktop nav links at `text-xs` size with `font-bold` weight, `tracking-[0.12em]` letter-spacing, `uppercase` transform, and `--color-ink-muted` color by default.
4. THE Navbar SHALL indicate the active page link with a 2px bottom border (`border-b-2`) using `--color-accent` color, implemented via a CSS `::after` pseudo-element.
5. THE Navbar SHALL be `position: fixed` at the top of the viewport at all times.
6. WHEN the Scroll_Effect is inactive (page is at the top), THE Navbar SHALL have `background: transparent` and no bottom border.
7. THE Header SHALL include a spacer `div` of `h-16` height so that page content is not obscured by the fixed Navbar.
8. THE `ThemeToggle` button SHALL be removed from the Navbar.

---

### Requirement 4: Mobile Navigation Menu

**User Story:** As a visitor on a mobile device, I want a smooth, immersive fullscreen navigation menu, so that I can navigate between pages with a premium feel.

#### Acceptance Criteria

1. THE Mobile_Menu SHALL be a fullscreen overlay (`position: fixed; inset: 0`) covering the entire viewport when open.
2. THE Mobile_Menu SHALL use the dark glass aesthetic: `background: rgba(10, 10, 10, 0.95)` with `backdrop-filter: blur(var(--blur-glass-heavy))`.
3. THE Mobile_Menu SHALL be hidden by default and SHALL only be shown when the hamburger button is activated.
4. WHEN the hamburger button is activated, THE Mobile_Menu SHALL animate open using an `opacity` transition from `0` to `1` combined with a `transform: translateY(-8px)` to `translateY(0)` over `350ms` using `cubic-bezier(0.16, 1, 0.3, 1)` easing.
5. WHEN the Mobile_Menu is open and the hamburger button is activated again, THE Mobile_Menu SHALL animate closed by reversing the open animation over `250ms` using `ease-in` easing.
6. WHEN the Mobile_Menu is open, THE hamburger button's three bars SHALL animate into an "×" (close) icon: the top bar SHALL rotate `45deg` and translate down, the middle bar SHALL fade to `opacity: 0`, and the bottom bar SHALL rotate `-45deg` and translate up, all within 250ms.
7. THE Mobile_Menu nav links SHALL be displayed in a centered vertical stack with large typography (`text-3xl`, `font-black`, `tracking-[-0.04em]`) and SHALL stagger their entrance with `50ms` delays between each link.
8. WHEN a nav link inside the Mobile_Menu is clicked, THE Mobile_Menu SHALL animate closed before navigation occurs.
9. THE Mobile_Menu SHALL be hidden on viewports at or above the `md` breakpoint (768px) regardless of its open/closed state.
10. THE Mobile_Menu SHALL set `aria-expanded="true"` on the hamburger button when open and `aria-expanded="false"` when closed.
11. THE Mobile_Menu SHALL be re-initialized after each Astro View Transitions navigation by listening to the `astro:after-swap` event.
12. WHEN the Mobile_Menu is open, THE Site SHALL trap keyboard focus within the menu until it is closed, and pressing `Escape` SHALL close the menu.
13. WHEN the Mobile_Menu is open, THE `body` SHALL have `overflow: hidden` applied to prevent background scrolling.

---

### Requirement 5: Navbar Scroll Effect

**User Story:** As a visitor, I want the navbar to visually distinguish itself as I scroll down the page, so that I always know where the navigation is and can easily access it.

#### Acceptance Criteria

1. WHEN the user scrolls more than `80px` from the top of the page, THE Navbar SHALL transition to a "scrolled" state within 250ms using `ease-out` easing.
2. WHEN the Navbar enters the scrolled state, THE Navbar SHALL apply a glass background: `background: rgba(10, 10, 10, 0.80)` with `backdrop-filter: blur(var(--blur-glass))`.
3. WHEN the Navbar enters the scrolled state, THE Navbar SHALL apply a `1px` bottom border using `--color-surface-border` to visually separate it from page content.
4. WHEN the user scrolls back to within `80px` of the top of the page, THE Navbar SHALL transition back to the transparent state within 250ms.
5. THE Scroll_Effect SHALL be implemented using a `scroll` event listener with a passive flag (`{ passive: true }`) to avoid blocking the main thread.
6. THE Scroll_Effect script SHALL be re-initialized after each Astro View Transitions navigation by listening to the `astro:after-swap` event.
7. WHEN the `prefers-reduced-motion: reduce` media query is active, THE Navbar SHALL apply the scrolled state background and border immediately (without transition) when the scroll threshold is crossed.
