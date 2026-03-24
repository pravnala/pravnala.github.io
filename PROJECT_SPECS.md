## Project Specification: Alvin Penaflor Website
**Goal:** Replace the existing site at `https://pravnala.github.io/` with a premium, dual-purpose static website showcasing 20+ years of web development and 16 years of Arnis mastery.

### 1. Core Tech Stack
* **Framework:** Astro v6 (SSG mode).
* **Runtime:** Bun.
* **Styling:** Tailwind CSS v4.
* **CMS:** Keystatic (Local-only mode).
* **Type System:** TypeScript (strict configuration).
* **Deployment:** GitHub Pages.


### 2. Site Map & Page Structure

| Page | Primary Purpose | Key Sections to Include |
| :--- | :--- | :--- |
| **Home (`/`)** | Gateway | High-impact Hero; "Dual-Path" navigation (Dev vs. Arnis); Core Philosophy. |
| **Work (`/work`)** | Dev Conversion | Detailed Case Studies (3 public); "Selected Experience" table (NDA/Private projects). |
| **Arnis (`/arnis`)** | Coaching Conversion | Lapunti Arnis de Abanico philosophy; Instructor bio; Seminar/Training CTA. |
| **Blog (`/blog`)** | Authority | Unified feed for Tech and Martial Arts; Category filtering. |
| **Contact (`/contact`)** | Lead Gen | Minimalist form (Dev/Arnis dropdown); LinkedIn/GitHub links. |

### 3. Technical Requirements

#### **Astro**
* Use Astro best practices for approaching tasks (i.e., image optimization, fonts configuration, content collection, etc)
* Create components as needed and organize components in descriptive folders under the /src/components/ directory

#### **Tailwind v4**
* **CRITICAL RULE:** For all generic Tailwind v4 syntax questions (e.g., gradients, flexbox, typography classes), ALWAYS rely on your knowledge or refer to the latest Tailwind documentation using the `context7` MCP server.
* Tailwind v4 uses CSS variables and `@theme` instead of `tailwind.config.js`
* **CRITICAL:** The definitive `@theme` configuration is located in `src/styles/global.css`. Always read this file to discover the latest available custom design tokens, fonts, colors, and animations before styling new components.
* Prefer defined design tokens over arbitrary bracket values when possible.
* Prefer standard utility classes over arbitrary values (e.g., use `h-px` instead of `h-[1px]`).

#### **Keystatic CMS (Local-Only)**
* **Workflow:** Content is managed via a local UI at `/keystatic` during development.
* **Storage:** Data is saved as `.mdoc` (Markdoc) files directly in `src/content/`.
* **Sync:** Content updates are pushed to GitHub via standard `git commit` alongside code changes. No external API or Cloud account required.

#### **Theme Engine**
* **Permanently Dark:** The site uses a single dark theme (`#0A0A0A` canvas). There is no light mode or theme toggle.
* **Anti-Flicker:** A simplified inline script in the `<head>` ensures the dark background is applied before first paint.

#### **Design Language**
* **Aesthetic:** Dark Glassmorphism -- a permanently dark canvas with frosted-glass UI surfaces, gray midtone hierarchy, and fluid motion design.
* **Motion:** Use Astro's built-in **View Transitions** for seamless, app-like navigation between the Dev and Arnis sections.

### 4. Site Design

* **Style:** Dark Glassmorphism. Permanent dark canvas (`#0A0A0A`) with frosted glass cards/panels (`backdrop-filter: blur(16px)`, `rgba(255,255,255,0.06)` backgrounds). Gray midtone tokens for text hierarchy. No light mode.
* **Typography:** Aggressive Sans-Serif. Ultra-bold headers with tight tracking (`-0.04em`) and tight leading (`1.05`). Nav labels in uppercase with wide tracking (`0.12em`).
* **Color Tokens:** `--color-canvas` (#0A0A0A), `--color-surface` (rgba white 6%), `--color-ink` (#FFFFFF), `--color-ink-muted` (#A1A1AA / zinc-400), `--color-ink-subtle` (#71717A / zinc-500), `--color-accent` (#E4E4E7 / zinc-200).
* **Feel:** Premium dark site with prominent section reveal animations, fluid micro-interactions, and glass-effect UI surfaces.
