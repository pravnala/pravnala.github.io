import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Property 1: Bug Condition — Keystatic Routes Return 404 in Dev
 *
 * Validates: Requirements 1.1, 1.2, 1.3
 *
 * CRITICAL: This test is EXPECTED TO FAIL on unfixed code.
 * Failure confirms the bug exists. DO NOT fix the code when this test fails.
 *
 * Bug condition: isBugCondition(X) = X.path starts with "/keystatic" AND runtime = "dev"
 * Expected (correct) behavior: prerender !== true (so the @keystatic/astro integration
 * can handle requests at runtime instead of producing no static routes)
 */

const KEYSTATIC_PAGE_ROUTE = path.resolve(
  process.cwd(),
  'src/pages/keystatic/[...params].astro'
);

const KEYSTATIC_API_ROUTE = path.resolve(
  process.cwd(),
  'src/pages/api/keystatic/[...params].ts'
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function readSourceFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Returns true if the source file contains `export const prerender = true`.
 * This is the bug condition: prerender=true with empty getStaticPaths() produces
 * no routes, making the Keystatic admin unreachable in dev.
 */
function hasPrerenderTrue(source: string): boolean {
  return /export\s+const\s+prerender\s*=\s*true/.test(source);
}

/**
 * Returns true if the source file contains an empty getStaticPaths() that
 * returns an empty array — the mechanism that produces zero static routes.
 */
function hasEmptyGetStaticPaths(source: string): boolean {
  return /function\s+getStaticPaths\s*\(\s*\)\s*\{[\s\n]*return\s*\[\s*\]/.test(
    source
  );
}

/**
 * Returns true if the source file contains a hardcoded 404 GET handler —
 * the symptom that makes all API requests return 404.
 */
function hasHardcoded404Handler(source: string): boolean {
  return /export\s+function\s+GET\s*\(\s*\)[\s\S]*?status:\s*404/.test(source);
}

// ── Property 1a: Keystatic page route must NOT have prerender = true ──────────

describe('Property 1a: Keystatic page route must not be statically prerendered', () => {
  /**
   * Validates: Requirements 1.2
   *
   * The bug: src/pages/keystatic/[...params].astro has `export const prerender = true`
   * with an empty getStaticPaths(), which produces no routes and makes the admin
   * UI unreachable in dev mode.
   *
   * Fix: prerender must NOT be true (should be false or absent) so Astro delegates
   * rendering to the @keystatic/astro integration at runtime.
   */
  it('prerender is not true in src/pages/keystatic/[...params].astro', () => {
    fc.assert(
      fc.property(
        fc.constant(readSourceFile(KEYSTATIC_PAGE_ROUTE)),
        (source) => {
          // Assert the fix condition: prerender must NOT be true
          expect(hasPrerenderTrue(source)).toBe(false);
        }
      ),
      { numRuns: 1 }
    );
  });

  it('getStaticPaths is not present (or not empty) in src/pages/keystatic/[...params].astro', () => {
    fc.assert(
      fc.property(
        fc.constant(readSourceFile(KEYSTATIC_PAGE_ROUTE)),
        (source) => {
          // Assert the fix condition: empty getStaticPaths must NOT be present
          expect(hasEmptyGetStaticPaths(source)).toBe(false);
        }
      ),
      { numRuns: 1 }
    );
  });
});

// ── Property 1b: Keystatic API route must NOT have prerender = true ───────────

describe('Property 1b: Keystatic API route must not be statically prerendered', () => {
  /**
   * Validates: Requirements 1.3
   *
   * The bug: src/pages/api/keystatic/[...params].ts has `export const prerender = true`,
   * empty getStaticPaths(), and a hardcoded GET() handler that always returns 404.
   *
   * Fix: prerender must NOT be true so Astro routes requests to the Keystatic API
   * handler provided by the @keystatic/astro integration.
   */
  it('prerender is not true in src/pages/api/keystatic/[...params].ts', () => {
    fc.assert(
      fc.property(
        fc.constant(readSourceFile(KEYSTATIC_API_ROUTE)),
        (source) => {
          expect(hasPrerenderTrue(source)).toBe(false);
        }
      ),
      { numRuns: 1 }
    );
  });

  it('getStaticPaths is not present (or not empty) in src/pages/api/keystatic/[...params].ts', () => {
    fc.assert(
      fc.property(
        fc.constant(readSourceFile(KEYSTATIC_API_ROUTE)),
        (source) => {
          expect(hasEmptyGetStaticPaths(source)).toBe(false);
        }
      ),
      { numRuns: 1 }
    );
  });

  it('hardcoded 404 GET handler is not present in src/pages/api/keystatic/[...params].ts', () => {
    fc.assert(
      fc.property(
        fc.constant(readSourceFile(KEYSTATIC_API_ROUTE)),
        (source) => {
          // The hardcoded 404 handler is the direct cause of all API requests returning 404
          expect(hasHardcoded404Handler(source)).toBe(false);
        }
      ),
      { numRuns: 1 }
    );
  });
});

// ── Property 1c: Bug condition scoped to /keystatic paths in dev ──────────────

describe('Property 1c: isBugCondition — /keystatic paths in dev are affected', () => {
  /**
   * Validates: Requirements 1.1, 1.2, 1.3
   *
   * Models the bug condition from bugfix.md:
   *   isBugCondition(X) = X.path STARTS_WITH "/keystatic" AND runtime = "dev"
   *
   * With the current (unfixed) code, any path starting with /keystatic in dev
   * will hit the broken routes and return 404. This property encodes that
   * the fix must make these routes reachable (status != 404).
   */

  const keystatiPaths = [
    '/keystatic',
    '/keystatic/',
    '/keystatic/dashboard',
    '/keystatic/collection/blog',
    '/keystatic/collection/work',
    '/api/keystatic/reader',
    '/api/keystatic/branch/main',
  ];

  it('all /keystatic paths are covered by the bug condition (path starts with /keystatic)', () => {
    fc.assert(
      fc.property(fc.constantFrom(...keystatiPaths), (requestPath) => {
        const isBugCondition =
          requestPath.startsWith('/keystatic') ||
          requestPath.startsWith('/api/keystatic');
        // All sampled paths must satisfy the bug condition
        expect(isBugCondition).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('source files confirm the bug: prerender=true causes /keystatic routes to be unreachable', () => {
    const pageSource = readSourceFile(KEYSTATIC_PAGE_ROUTE);
    const apiSource = readSourceFile(KEYSTATIC_API_ROUTE);

    fc.assert(
      fc.property(fc.constantFrom(...keystatiPaths), (requestPath) => {
        const isKeystatic =
          requestPath.startsWith('/keystatic') ||
          requestPath.startsWith('/api/keystatic');

        if (isKeystatic) {
          // For any /keystatic path in dev, the current source files must NOT
          // have prerender=true (the fix condition). If they DO have prerender=true,
          // the route is unreachable — this assertion will FAIL, confirming the bug.
          const pageHasBug = hasPrerenderTrue(pageSource);
          const apiHasBug = hasPrerenderTrue(apiSource);

          // This assertion encodes the EXPECTED (fixed) behavior.
          // It FAILS on unfixed code, confirming the bug exists.
          expect(pageHasBug || apiHasBug).toBe(false);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
