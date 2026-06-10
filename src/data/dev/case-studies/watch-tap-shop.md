---
# To add a cover image:
# 1. Drop your screenshot into src/assets/images/case-studies/
# 2. Uncomment and update the coverImage path below
# coverImage: /src/assets/images/case-studies/watch-tap-shop.png
title: Watch!Tap!Shop!
projectContext: Project consultancy, design, technology stack selection and development of a POC and working prototype for Watch!Tap!Shop!. A winning entry in the first Gawad Pangulo Para sa Natatanging Inobasyon contest of the University of the Philippines, a university system-wide competition for innovative ideas or projects.
# projectContext: Co-founded InterStep Technologies Inc., a startup building an interactive commerce product for commercialization. Served as technical development lead and consultant for a team entry in the first Gawad Pangulo para sa Natatanging Inobasyon contest of the University of the Philippines. Developed the PoC and prototype that won one of the grand prizes.
problem: Traditional e-commerce relies on static product listings disconnected from the content that inspires purchase intent. Video content drives engagement but offers no direct path to purchase — viewers must leave the video, search for the product, and navigate a separate checkout flow. This friction results in lost conversions and a fragmented shopping experience.
solution: Designed and built an interactive video commerce platform that overlays shoppable product tags directly onto video content. Viewers can tap on items they see in a video stream and purchase without leaving the viewing experience. The PoC demonstrated real-time product recognition, contextual overlays, and a streamlined checkout flow — all built as a lightweight web application for maximum reach.
outcome: The prototype won one of the grand prizes in the first Gawad Pangulo para sa Natatanging Inobasyon contest, a university system-wide competition for innovative ideas. The product is now being developed for commercial release under InterStep Technologies Inc.
technologies:
  - SvelteKit
  - Typescript
  - Bun
  - Tailwind
  - Web Components
coverImage: wts.png
externalLabel: Visit Site
hasDetailPage: false
isPublic: true
order: 3
---

## The Challenge

The gap between content consumption and commerce has long been a pain point in digital retail. Consumers discover products through video — social media, livestreams, tutorials — but the path from "I want that" to "I bought that" is riddled with friction.

Watch!Tap!Shop! was conceived to eliminate that gap entirely.

## Approach

As technical development lead, I was responsible for:

- **Architecture design** — chose a component-based approach using Svelte for the interactive overlay layer and Astro for the marketing/landing infrastructure
- **PoC development** — built the working prototype from scratch for the contest's final round, demonstrating the core interaction loop (watch → tap → shop) in a live demo
- **Performance optimization** — ensured the overlay system added minimal overhead to video playback, targeting sub-100ms interaction response times
- **Web Components** — encapsulated the shoppable overlay as framework-agnostic web components for easy embedding across different video platforms

## Technical Decisions

The stack was chosen deliberately:

- **SvelteKit** for the application shell — minimal bundle size matters when you're overlaying on top of video content
- **Web Components** for the embeddable widget — platform-agnostic, works anywhere a script tag can be inserted
- **Tailwind CSS** for rapid UI iteration during the contest timeline
- **Astro** for the static marketing site — fast, SEO-friendly, and easy to maintain

## Result

The prototype demonstrated a complete purchase flow: a viewer watches a video, taps a highlighted product, sees pricing and details in a non-intrusive overlay, and completes checkout — all without leaving the video experience.

This won one of the grand prizes at the inaugural Gawad Pangulo para sa Natatanging Inobasyon, validating both the concept and the technical execution. The product is now in active development for commercial launch.
