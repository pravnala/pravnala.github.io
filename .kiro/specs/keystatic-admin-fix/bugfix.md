# Bugfix Requirements Document

## Introduction

The Keystatic admin UI at `/keystatic` is inaccessible during development. Both the admin page route (`src/pages/keystatic/[...params].astro`) and the API route (`src/pages/api/keystatic/[...params].ts`) are configured with `export const prerender = true` and return empty `getStaticPaths()` arrays. This causes Astro to treat them as static routes that generate no pages — effectively making the Keystatic admin unreachable even in dev mode, despite the `@keystatic/astro` integration being conditionally loaded.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a developer accesses `http://localhost:4321/keystatic` during `bun run dev` THEN the system returns a 404 or blank page instead of the Keystatic admin UI

1.2 WHEN a request hits `src/pages/keystatic/[...params].astro` in dev mode THEN the system skips rendering because `prerender = true` with an empty `getStaticPaths()` produces no routes

1.3 WHEN a request hits `src/pages/api/keystatic/[...params].ts` in dev mode THEN the system returns a 404 response because the route is statically prerendered with no paths and a hardcoded 404 GET handler

### Expected Behavior (Correct)

2.1 WHEN a developer accesses `http://localhost:4321/keystatic` during `bun run dev` THEN the system SHALL render and serve the Keystatic admin UI

2.2 WHEN a request hits `src/pages/keystatic/[...params].astro` in dev mode THEN the system SHALL delegate rendering to the `@keystatic/astro` integration by using server-side rendering (not static prerendering)

2.3 WHEN a request hits `src/pages/api/keystatic/[...params].ts` in dev mode THEN the system SHALL delegate the request to the Keystatic API handler provided by the integration

### Unchanged Behavior (Regression Prevention)

3.1 WHEN `bun run build` is executed for production THEN the system SHALL CONTINUE TO produce a fully static output with no Keystatic routes included

3.2 WHEN any non-Keystatic page is accessed in dev mode THEN the system SHALL CONTINUE TO render correctly without regression

3.3 WHEN any non-Keystatic page is built for production THEN the system SHALL CONTINUE TO generate correct static HTML output

---

## Bug Condition

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type HttpRequest
  OUTPUT: boolean

  RETURN X.path STARTS_WITH "/keystatic" AND runtime = "dev"
END FUNCTION
```

### Fix Checking Property

```pascal
// Property: Fix Checking — Keystatic admin must be reachable in dev
FOR ALL X WHERE isBugCondition(X) DO
  result ← handleRequest'(X)
  ASSERT result.status != 404 AND result.body CONTAINS keystatic_admin_ui
END FOR
```

### Preservation Property

```pascal
// Property: Preservation Checking — non-Keystatic routes must be unaffected
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT handleRequest(X) = handleRequest'(X)
END FOR
```
