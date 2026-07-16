---
title: Regina De Vera
projectContext: Website redesign consultancy, tech stack migration, and development for Regina De Vera, a Julliard-trained actor and educator. Keystatic CMS. The project also involved migration and reformatting of 100+ blog articles, automated using python scripts.
technologies:
  - Astro
  - Bun
  - Keystatic
  - Tailwind
  - Typescript
  - Python
  - Netlify Forms
externalUrl: https://reginadevera.com
coverImage: reginadevera.png
externalLabel: View Site
hasDetailPage: false
isPublic: true
order: 1
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
