# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Keystatic Routes Return 404 in Dev
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate that `/keystatic` and `/api/keystatic/*` routes are unreachable
  - **Scoped PBT Approach**: Scope the property to the concrete failing cases: requests where `X.path` starts with `/keystatic` and runtime is dev
  - Test that `src/pages/keystatic/[...params].astro` with `prerender = true` and empty `getStaticPaths()` produces no routes (isBugCondition: path starts with `/keystatic` AND runtime = "dev")
  - Test that `src/pages/api/keystatic/[...params].ts` with `prerender = true` and empty `getStaticPaths()` returns 404 for all Keystatic API paths
  - Assert that the route handler delegates to `@keystatic/astro` integration instead of returning 404 (expectedBehavior: status != 404 AND body contains Keystatic admin UI)
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found (e.g., "GET /keystatic returns 404 instead of Keystatic admin UI")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3_

- [~] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Keystatic Routes Unaffected
  - **IMPORTANT**: Follow observation-first methodology
  - Observe: non-Keystatic pages (e.g., `/`, `/work`, `/blog`, `/arnis`, `/contact`) render correctly on unfixed code
  - Observe: `bun run build` produces fully static output with no Keystatic routes included on unfixed code
  - Write property-based test: for all request paths NOT starting with `/keystatic`, route handling behavior is unchanged (from Preservation Requirements in bugfix.md)
  - Write property-based test: for all non-Keystatic pages, static build output is unaffected
  - Verify tests PASS on UNFIXED code (confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3_

- [~] 3. Fix Keystatic admin and API routes inaccessible in dev
  - [~] 3.1 Fix `src/pages/keystatic/[...params].astro` to use SSR in dev
    - Remove `export const prerender = true` and the empty `getStaticPaths()` function
    - Replace with `export const prerender = false` so Astro delegates rendering to the `@keystatic/astro` integration at runtime
    - The integration is already conditionally loaded in `astro.config.mjs` when `NODE_ENV !== 'production'`
    - _Bug_Condition: isBugCondition(X) where X.path starts with "/keystatic" AND runtime = "dev"_
    - _Expected_Behavior: handleRequest'(X).status != 404 AND body contains Keystatic admin UI_
    - _Preservation: Non-Keystatic routes must continue to render correctly (3.2, 3.3)_
    - _Requirements: 1.2, 2.1, 2.2_

  - [~] 3.2 Fix `src/pages/api/keystatic/[...params].ts` to delegate to Keystatic API handler
    - Remove `export const prerender = true`, the empty `getStaticPaths()`, and the hardcoded `GET()` 404 handler
    - Replace with `export const prerender = false` so Astro routes requests to the Keystatic API handler provided by the integration
    - _Bug_Condition: isBugCondition(X) where X.path starts with "/keystatic" AND runtime = "dev"_
    - _Expected_Behavior: handleRequest'(X) delegates to @keystatic/astro API handler_
    - _Preservation: Production static build must continue to exclude Keystatic routes (3.1)_
    - _Requirements: 1.3, 2.3, 3.1_

  - [~] 3.3 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Keystatic Routes Reachable in Dev
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior (status != 404, body contains Keystatic admin UI)
    - When this test passes, it confirms the fix is correct
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
    - _Requirements: 2.1, 2.2, 2.3_

  - [~] 3.4 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-Keystatic Routes Unaffected
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm non-Keystatic pages still render correctly and production build remains fully static

- [~] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
