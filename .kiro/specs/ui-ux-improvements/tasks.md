# Tasks: UI/UX Improvements

## Task List

- [x] 1. Overhaul design tokens in `global.css`
  - [x] 1.1 Replace `@theme` block with new dark glassmorphism tokens (`--color-canvas`, `--color-surface`, `--color-surface-hover`, `--color-surface-border`, `--color-ink`, `--color-ink-muted`, `--color-ink-subtle`, `--color-accent`, `--blur-glass`, `--blur-glass-heavy`)
  - [x] 1.2 Update `body` base style to use `background-color: var(--color-canvas)` and `color: var(--color-ink)`
  - [x] 1.3 Remove the `html.dark body` override block from `global.css`
  - [x] 1.4 Update animation tokens: `--duration-reveal: 700ms`, `--easing-reveal: cubic-bezier(0.16, 1, 0.3, 1)`

- [x] 2. Simplify `BaseLayout.astro` anti-FOUC script
  - [x] 2.1 Replace the `localStorage`/`prefers-color-scheme` anti-FOUC script with `document.documentElement.classList.add('dark')`

- [x] 3. Delete `ThemeToggle` component
  - [x] 3.1 Delete `src/components/ui/ThemeToggle.astro`
  - [x] 3.2 Remove `ThemeToggle` import and usage from `Header.astro`

- [x] 4. Rewrite `Header.astro` — navbar visual refinement
  - [x] 4.1 Update navbar height to `h-16` and spacer div to `h-16`
  - [x] 4.2 Update wordmark to `text-base font-black tracking-[-0.04em]`
  - [x] 4.3 Update desktop nav links to `text-xs font-bold tracking-[0.12em] uppercase` with `--color-ink-muted` default color and 150ms `ease-out` hover transition to `--color-ink`
  - [x] 4.4 Update active link indicator to use `--color-accent` via `::after` pseudo-element with `border-b-2`
  - [x] 4.5 Set navbar to `position: fixed`, `background: transparent`, no bottom border by default

- [x] 5. Implement navbar scroll effect in `Header.astro`
  - [x] 5.1 Add `.is-scrolled` CSS class that applies `background: rgba(10,10,10,0.80)`, `backdrop-filter: blur(var(--blur-glass))`, and `1px` bottom border using `--color-surface-border`
  - [x] 5.2 Add `250ms ease-out` transition on `background` and `border-color` for the scroll state change
  - [x] 5.3 Implement passive `scroll` event listener that toggles `.is-scrolled` at 80px threshold
  - [x] 5.4 Re-initialize scroll effect on `astro:after-swap`
  - [x] 5.5 Apply scroll state immediately (no transition) when `prefers-reduced-motion` is active

- [x] 6. Implement fullscreen mobile menu overlay in `Header.astro`
  - [x] 6.1 Replace the slide-down `<nav id="mobile-menu">` with a fullscreen `<div id="mobile-menu" role="dialog" aria-modal="true">` overlay (`position: fixed; inset: 0; z-index: 40`)
  - [x] 6.2 Apply dark glass background: `rgba(10,10,10,0.95)` with `backdrop-filter: blur(var(--blur-glass-heavy))`
  - [x] 6.3 Render nav links as centered vertical stack with `text-3xl font-black tracking-[-0.04em]`
  - [x] 6.4 Apply staggered entrance delays: each link `<li>` at index `i` gets `style="--link-delay: {i * 50}ms"` server-side; CSS applies `transition-delay: var(--link-delay)`
  - [x] 6.5 Implement open animation: `opacity 0→1` + `translateY(-8px)→translateY(0)` over `350ms cubic-bezier(0.16,1,0.3,1)` via `.is-open` class
  - [x] 6.6 Implement close animation: `opacity 1→0` + `translateY(0)→translateY(-8px)` over `250ms ease-in` via `.is-closing` class
  - [x] 6.7 Animate hamburger bars into × icon when `aria-expanded="true"`: top bar `translateY(7px) rotate(45deg)`, middle bar `opacity: 0`, bottom bar `translateY(-7px) rotate(-45deg)`
  - [x] 6.8 Implement focus trap: `Tab`/`Shift+Tab` cycles only within `#mobile-menu` focusable elements; `Escape` closes the menu
  - [x] 6.9 Apply `body { overflow: hidden }` on open; restore on close
  - [x] 6.10 Set `aria-expanded="true"/"false"` on hamburger button to match open/closed state
  - [x] 6.11 Close menu (with animation) when a nav link inside it is clicked
  - [x] 6.12 Hide mobile menu on `md` breakpoint and above regardless of state
  - [x] 6.13 Re-initialize mobile menu on `astro:after-swap`

- [x] 7. Enhance `AnimatedSection.astro`
  - [x] 7.1 Add `clip-up` variant: initial state `clip-path: inset(100% 0 0 0)`, visible state `clip-path: inset(0% 0 0 0)`
  - [x] 7.2 Update all variant transitions to `700ms cubic-bezier(0.16,1,0.3,1)`
  - [x] 7.3 Change `IntersectionObserver` threshold from `0.1` to `0.15`
  - [x] 7.4 Add `will-change: transform` on pre-visible elements; set `will-change: auto` after `is-visible` is applied
  - [x] 7.5 Update `Props` interface to include `clip-up` in the `animation` union type

- [x] 8. Update card components with glass micro-interactions
  - [x] 8.1 Update `CaseStudyCard.astro`: replace border/hover-inversion pattern with glass surface (`bg-[var(--color-surface)]`, `border-[var(--color-surface-border)]`), hover state (`hover:bg-[var(--color-surface-hover)]`, `hover:-translate-y-0.5`, `hover:border-white/24`), and replace `opacity-60` text with `text-[var(--color-ink-muted)]`
  - [x] 8.2 Update `BlogCard.astro`: same glass surface and hover treatment as CaseStudyCard; replace `opacity-60`/`opacity-40` text with `--color-ink-muted`/`--color-ink-subtle` tokens
  - [x] 8.3 Update `DualPath.astro`: replace `hover:opacity-90`/`hover:opacity-80` with glass hover treatment; replace `opacity-60`/`opacity-40` text with ink token equivalents
  - [x] 8.4 Add CTA arrow micro-interaction to all "Read More →", "View Work →", "Explore Arnis →" links: wrap arrow in `<span class="cta-arrow">`, apply `transform: translateX(4px)` on parent hover within `150ms ease-out`

- [-] 9. Write property-based tests
  - [x] 9.1 Write property test for Property 1: text contrast meets WCAG AA minimums (fast-check, ≥100 iterations)
  - [x] 9.2 Write property test for Property 2: no low-opacity text on meaningful content (fast-check, ≥100 iterations)
  - [x] 9.3 Write property test for Property 3: AnimatedSection renders correct attributes for all valid configs (fast-check, ≥100 iterations)
  - [x] 9.4 Write property test for Property 4: only transform and opacity are animated (fast-check, ≥100 iterations)
  - [x] 9.5 Write property test for Property 5: will-change lifecycle is correct (fast-check, ≥100 iterations)
  - [ ] 9.6 Write property test for Property 6: active nav link indicator present for every route (fast-check, ≥100 iterations)
  - [ ] 9.7 Write property test for Property 7: mobile menu nav links have correct staggered delays (fast-check, ≥100 iterations)
  - [ ] 9.8 Write property test for Property 8: aria-expanded reflects mobile menu open/closed state (fast-check, ≥100 iterations)
  - [ ] 9.9 Write property test for Property 9: focus trap contains all keyboard focus within open mobile menu (fast-check, ≥100 iterations)
  - [ ] 9.10 Write property test for Property 10: navbar scroll state is a round-trip (fast-check, ≥100 iterations)
