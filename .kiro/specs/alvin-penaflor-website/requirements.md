# Requirements Document

## Introduction

A premium, dual-purpose static website for Alvin Penaflor, replacing the existing site at `https://pravnala.github.io/`. The site serves two distinct audiences: potential clients seeking an experienced web developer (20+ years), and martial arts students/organizations seeking an Arnis instructor (16 years of Lapunti Arnis de Abanico mastery). Built with Astro v6 (SSG), Bun, Tailwind CSS v4, Keystatic CMS (local-only), and deployed to GitHub Pages.

## Glossary

- **Site**: The complete static website deployed to GitHub Pages.
- **Visitor**: Any person browsing the Site.
- **Dev_Path**: The web development-focused section of the Site targeting potential clients.
- **Arnis_Path**: The martial arts-focused section of the Site targeting students and organizations.
- **Hero**: The primary above-the-fold section of the Home page.
- **Case_Study**: A detailed write-up of a completed web development project.
- **Blog_Post**: A written article belonging to either the Tech or Martial_Arts category.
- **Theme_Engine**: The light/dark mode system including toggle, persistence, and anti-flicker logic.
- **CMS**: Keystatic running in local-only mode, managing content as `.mdoc` files in `src/content/`.
- **Content_Collection**: An Astro content collection backed by `.mdoc` files managed by the CMS.
- **View_Transition**: Astro's built-in page transition animation system.
- **Design_Token**: A CSS variable defined in the `@theme` block inside `src/styles/global.css`.
- **FOUC**: Flash of Unstyled Content — a visible flicker caused by theme styles loading after initial render.
- **Contact_Form**: The minimalist lead-generation form on the Contact page.

---

## Requirements

### Requirement 1: Site Foundation and Tech Stack

**User Story:** As a developer maintaining the Site, I want a well-structured Astro v6 project with strict TypeScript, Bun as the runtime, and Tailwind CSS v4, so that the codebase is type-safe, fast to build, and easy to maintain.

#### Acceptance Criteria

1. THE Site SHALL be built using Astro v6 in Static Site Generation (SSG) mode.
2. THE Site SHALL use Bun as the package manager and runtime.
3. THE Site SHALL use TypeScript with strict configuration enabled.
4. THE Site SHALL use Tailwind CSS v4 with all Design_Tokens defined as CSS variables inside an `@theme` block in `src/styles/global.css`.
5. THE Site SHALL organize reusable UI elements as components under the `/src/components/` directory in descriptive subfolders.
6. THE Site SHALL use Astro best practices for image optimization, font configuration, and Content_Collection setup.
7. IF a build error occurs, THEN THE Site SHALL surface a descriptive error message and halt the build process.

---

### Requirement 2: Theme Engine (Light/Dark Mode)

**User Story:** As a Visitor, I want to toggle between light and dark mode and have my preference remembered, so that I can read the Site comfortably without it resetting on every visit.

#### Acceptance Criteria

1. THE Theme_Engine SHALL provide a manual toggle in the site header that switches between light and dark mode.
2. THE Theme_Engine SHALL persist the Visitor's theme choice using `localStorage`.
3. THE Theme_Engine SHALL apply an inline script in the `<head>` of every page that reads `localStorage` and sets the correct theme class before the page renders, preventing FOUC.
4. WHEN a Visitor has no stored preference, THE Theme_Engine SHALL default to the Visitor's operating system preference via the `prefers-color-scheme` media query.
5. WHEN a Visitor activates the toggle, THE Theme_Engine SHALL immediately switch the active theme and update the stored preference in `localStorage`.

---

### Requirement 3: Global Navigation and View Transitions

**User Story:** As a Visitor, I want smooth, app-like navigation between pages, so that the Site feels premium and polished rather than a standard multi-page website.

#### Acceptance Criteria

1. THE Site SHALL include a persistent header navigation with links to Home, Work, Arnis, Blog, and Contact pages.
2. THE Site SHALL use Astro's built-in View Transitions API to animate page navigation.
3. THE Site SHALL display a "Dual-Path" navigation element on the Home page that visually distinguishes the Dev_Path from the Arnis_Path.
4. THE Site SHALL be fully responsive across mobile, tablet, and desktop viewport sizes.
5. WHEN a Visitor navigates to a page, THE Site SHALL highlight the active navigation link corresponding to the current page.

---

### Requirement 4: Home Page

**User Story:** As a Visitor, I want a high-impact landing page that immediately communicates who Alvin Penaflor is and guides me toward the relevant section, so that I can quickly find what I'm looking for.

#### Acceptance Criteria

1. THE Home page SHALL include a Hero section with a high-impact headline, a brief positioning statement, and clear calls-to-action for both the Dev_Path and the Arnis_Path.
2. THE Home page SHALL include a "Dual-Path" navigation block that visually separates and links to the Work page (Dev_Path) and the Arnis page (Arnis_Path).
3. THE Home page SHALL include a Core Philosophy section communicating Alvin's professional and personal values.
4. THE Home page SHALL use the monochromatic editorial design language: high-contrast black-and-white, ultra-bold headers with tight tracking and tight leading, and no mid-tones or gradients.
5. THE Home page SHALL include section reveal animations triggered as sections enter the Visitor's viewport.

---

### Requirement 5: Work Page (Dev Conversion)

**User Story:** As a potential client, I want to see detailed case studies and a summary of Alvin's experience, so that I can evaluate his skills and decide whether to reach out.

#### Acceptance Criteria

1. THE Work page SHALL display a minimum of 3 public Case_Study entries with project context, problem statement, solution, and outcome.
2. THE Work page SHALL include a "Selected Experience" table listing NDA or private projects with non-confidential details such as industry, role, and technologies used.
3. WHEN a Case_Study is selected, THE Work page SHALL display the full Case_Study content.
4. THE Work page SHALL source Case_Study content from a Content_Collection managed by the CMS.
5. THE Work page SHALL include a call-to-action linking to the Contact page.

---

### Requirement 6: Arnis Page (Coaching Conversion)

**User Story:** As a prospective student or event organizer, I want to learn about Alvin's Arnis background and how to book a seminar or training session, so that I can decide whether to engage his services.

#### Acceptance Criteria

1. THE Arnis page SHALL include a section describing the Lapunti Arnis de Abanico philosophy and lineage.
2. THE Arnis page SHALL include an instructor biography section detailing Alvin's 16 years of Arnis experience.
3. THE Arnis page SHALL include a Seminar/Training call-to-action section with a clear prompt linking to the Contact page.
4. THE Arnis page SHALL use the same monochromatic editorial design language as the rest of the Site.

---

### Requirement 7: Blog Page (Authority Building)

**User Story:** As a Visitor, I want to read articles about web development and martial arts, and filter by category, so that I can find content relevant to my interests.

#### Acceptance Criteria

1. THE Blog page SHALL display a unified feed of all Blog_Post entries sorted by publication date in descending order.
2. THE Blog page SHALL support filtering Blog_Post entries by category, with at minimum a "Tech" category and a "Martial Arts" category.
3. WHEN a Visitor selects a category filter, THE Blog page SHALL display only Blog_Post entries belonging to that category.
4. THE Blog page SHALL source Blog_Post content from a Content_Collection managed by the CMS.
5. WHEN a Visitor selects a Blog_Post, THE Site SHALL navigate to a dedicated page rendering the full Blog_Post content.
6. THE Blog_Post detail page SHALL display the title, publication date, category, and full body content of the Blog_Post.

---

### Requirement 8: Contact Page (Lead Generation)

**User Story:** As a Visitor ready to reach out, I want a simple contact form with context about my inquiry type, so that Alvin receives well-qualified leads without friction.

#### Acceptance Criteria

1. THE Contact page SHALL include a Contact_Form with fields for name, email address, inquiry type, and message.
2. THE Contact_Form SHALL include an inquiry type selector with at minimum "Web Development" and "Arnis / Martial Arts" options.
3. THE Contact page SHALL display links to Alvin's LinkedIn and GitHub profiles.
4. IF a Visitor submits the Contact_Form with a missing required field, THEN THE Contact_Form SHALL display a descriptive inline validation message identifying the missing field.
5. IF a Visitor submits the Contact_Form with an invalid email address format, THEN THE Contact_Form SHALL display a descriptive inline validation message.

---

### Requirement 9: Content Management (Keystatic CMS)

**User Story:** As the site owner, I want to manage blog posts and case studies through a local CMS UI, so that I can update content without editing raw files or redeploying manually.

#### Acceptance Criteria

1. THE CMS SHALL be accessible at the `/keystatic` route during local development.
2. THE CMS SHALL save all content as `.mdoc` (Markdoc) files directly in the `src/content/` directory.
3. THE CMS SHALL provide a collection for Blog_Post entries with fields for title, publication date, category, and body content.
4. THE CMS SHALL provide a collection for Case_Study entries with fields for title, project context, problem statement, solution, outcome, and technologies used.
5. WHEN content is updated via the CMS, THE Site SHALL reflect the updated content on the next build without requiring code changes.
6. THE CMS SHALL operate in local-only mode with no external API calls or cloud account required.

---

### Requirement 10: Design System and Typography

**User Story:** As a Visitor, I want a visually consistent, premium experience across all pages, so that the Site communicates professionalism and attention to detail.

#### Acceptance Criteria

1. THE Site SHALL use a monochromatic color scheme limited to black, white, and their direct contrasts with no mid-tones or gradients.
2. THE Site SHALL use an aggressive sans-serif typeface (Inter or PP Neue Montreal) for all headings with ultra-bold weight, tight letter-spacing, and tight line-height.
3. THE Site SHALL define all typography scales, spacing, and color values as Design_Tokens in `src/styles/global.css`.
4. THE Site SHALL apply text-over-image masking effects on applicable Hero and feature sections.
5. THE Site SHALL include micro-interaction animations on interactive elements such as buttons, links, and navigation items.
6. WHERE a Visitor's operating system has enabled reduced motion preferences, THE Site SHALL reduce or disable non-essential animations.

---

### Requirement 11: Deployment and Performance

**User Story:** As the site owner, I want the Site deployed to GitHub Pages with fast load times, so that Visitors have a reliable, high-performance experience.

#### Acceptance Criteria

1. THE Site SHALL be deployable to GitHub Pages as a fully static output generated by Astro's SSG build.
2. THE Site SHALL use Astro's built-in image optimization for all images to reduce payload size.
3. THE Site SHALL load web fonts using Astro's font configuration to avoid render-blocking requests.
4. WHEN the Astro build command is run, THE Site SHALL produce a complete static output in the `dist/` directory with no server-side runtime dependencies.
