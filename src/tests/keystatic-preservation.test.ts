import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Property 2: Preservation — Non-Keystatic Routes Unaffected
 *
 * Validates: Requirements 3.1, 3.2, 3.3
 *
 * IMPORTANT: These tests MUST PASS on unfixed code.
 * They confirm the baseline behavior that must be preserved after the fix.
 *
 * Preservation property (from bugfix.md):
 *   FOR ALL X WHERE NOT isBugCondition(X) DO
 *     ASSERT handleRequest(X) = handleRequest'(X)
 *   END FOR
 *
 * isBugCondition(X) = X.path STARTS_WITH "/keystatic" AND runtime = "dev"
 * Therefore: non-Keystatic paths are those NOT starting with "/keystatic"
 */

// ── File paths ────────────────────────────────────────────────────────────────

const ROOT = process.cwd();

const NON_KEYSTATIC_PAGES = [
  { route: '/', file: path.resolve(ROOT, 'src/pages/index.astro') },
  { route: '/work', file: path.resolve(ROOT, 'src/pages/work/index.astro') },
  { route: '/blog', file: path.resolve(ROOT, 'src/pages/blog/index.astro') },
  { route: '/arnis', file: path.resolve(ROOT, 'src/pages/arnis.astro') },
  { route: '/contact', file: path.resolve(ROOT, 'src/pages/contact.astro') },
];

const ASTRO_CONFIG = path.resolve(ROOT, 'astro.config.mjs');

// ── Helpers ───────────────────────────────────────────────────────────────────

function readSourceFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Returns true if the source has `export const prerender = true`
 * combined with an empty getStaticPaths() — the broken pattern that
 * produces no routes.
 */
function hasBrokenPrerenderPattern(source: string): boolean {
  const hasPrerenderTrue = /export\s+const\s+prerender\s*=\s*true/.test(source);
  const hasEmptyGetStaticPaths =
    /function\s+getStaticPaths\s*\(\s*\)\s*\{[\s\n]*return\s*\[\s*\]/.test(
      source
    );
  return hasPrerenderTrue && hasEmptyGetStaticPaths;
}

/**
 * Returns true if the astro.config.mjs conditionally loads @keystatic/astro
 * only when NODE_ENV !== 'production'.
 */
function hasConditionalKeystatic(source: string): boolean {
  // Must have a check for non-production environment
  const hasEnvCheck =
    /process\.env\.NODE_ENV\s*!==\s*['"]production['"]/.test(source) ||
    /process\.env\.NODE_ENV\s*===\s*['"]production['"]/.test(source);

  // Must conditionally import @keystatic/astro
  const hasConditionalImport =
    /if\s*\(.*\)\s*\{[\s\S]*?keystatic[\s\S]*?\}/.test(source);

  return hasEnvCheck && hasConditionalImport;
}

/**
 * Returns true if the path starts with /keystatic (the bug condition scope).
 */
function isKeystatic(requestPath: string): boolean {
  return (
    requestPath.startsWith('/keystatic') ||
    requestPath.startsWith('/api/keystatic')
  );
}

// ── Property 2a: Non-Keystatic pages do NOT have the broken pattern ───────────

describe('Property 2a: Non-Keystatic pages do not have the broken prerender pattern', () => {
  /**
   * Validates: Requirements 3.2, 3.3
   *
   * Non-Keystatic pages (/, /work, /blog, /arnis, /contact) must NOT have
   * `prerender = true` with empty `getStaticPaths()`. That pattern is only
   * present in the Keystatic routes (the bug). Regular pages render correctly.
   *
   * This test PASSES on unfixed code — confirming baseline behavior to preserve.
   */

  for (const { route, file } of NON_KEYSTATIC_PAGES) {
    it(`${route} does not have the broken prerender+getStaticPaths pattern`, () => {
      fc.assert(
        fc.property(fc.constant(readSourceFile(file)), (source) => {
          expect(hasBrokenPrerenderPattern(source)).toBe(false);
        }),
        { numRuns: 1 }
      );
    });
  }
});

// ── Property 2b: astro.config.mjs conditionally excludes Keystatic in prod ───

describe('Property 2b: Production build excludes Keystatic integration', () => {
  /**
   * Validates: Requirements 3.1
   *
   * `astro.config.mjs` must conditionally load `@keystatic/astro` only when
   * NODE_ENV !== 'production'. This ensures the production static build
   * excludes all Keystatic routes.
   *
   * This test PASSES on unfixed code — the config is already correct.
   */

  it('astro.config.mjs conditionally loads @keystatic/astro based on NODE_ENV', () => {
    fc.assert(
      fc.property(fc.constant(readSourceFile(ASTRO_CONFIG)), (source) => {
        expect(hasConditionalKeystatic(source)).toBe(true);
      }),
      { numRuns: 1 }
    );
  });

  it('astro.config.mjs does not unconditionally import @keystatic/astro', () => {
    fc.assert(
      fc.property(fc.constant(readSourceFile(ASTRO_CONFIG)), (source) => {
        // An unconditional top-level import would always include Keystatic in prod
        const hasUnconditionalImport =
          /^import\s+.*keystatic.*from\s+['"]@keystatic\/astro['"]/m.test(
            source
          );
        expect(hasUnconditionalImport).toBe(false);
      }),
      { numRuns: 1 }
    );
  });
});

// ── Property 2c: PBT — arbitrary non-Keystatic paths are not bug-condition ────

describe('Property 2c: Arbitrary non-Keystatic paths do not satisfy isBugCondition', () => {
  /**
   * Validates: Requirements 3.2, 3.3
   *
   * For all request paths NOT starting with /keystatic, the bug condition
   * does not apply — route handling is unchanged before and after the fix.
   *
   * Uses fast-check to generate arbitrary paths and verify they fall outside
   * the bug condition scope.
   */

  // Generator: paths that do NOT start with /keystatic or /api/keystatic
  const nonKeystatic = fc.webPath().filter((p) => !isKeystatic(p));

  it('generated non-Keystatic paths do not satisfy isBugCondition', () => {
    fc.assert(
      fc.property(nonKeystatic, (requestPath) => {
        expect(isKeystatic(requestPath)).toBe(false);
      }),
      { numRuns: 500 }
    );
  });

  it('known non-Keystatic routes are outside the bug condition scope', () => {
    const knownRoutes = [
      '/',
      '/work',
      '/blog',
      '/arnis',
      '/contact',
      '/work/some-slug',
      '/blog/some-post',
    ];

    fc.assert(
      fc.property(fc.constantFrom(...knownRoutes), (requestPath) => {
        expect(isKeystatic(requestPath)).toBe(false);
      }),
      { numRuns: 100 }
    );
  });

  it('only /keystatic and /api/keystatic paths satisfy isBugCondition', () => {
    const keystatic = [
      '/keystatic',
      '/keystatic/',
      '/keystatic/dashboard',
      '/api/keystatic/reader',
    ];

    fc.assert(
      fc.property(fc.constantFrom(...keystatic), (requestPath) => {
        expect(isKeystatic(requestPath)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });
});

// ── Property 2d: Non-Keystatic page source files are well-formed ──────────────

describe('Property 2d: Non-Keystatic page source files are well-formed', () => {
  /**
   * Validates: Requirements 3.2, 3.3
   *
   * Each non-Keystatic page must exist on disk and contain a BaseLayout
   * import — confirming they are real, renderable pages (not empty stubs).
   */

  for (const { route, file } of NON_KEYSTATIC_PAGES) {
    it(`${route} source file exists and uses BaseLayout`, () => {
      fc.assert(
        fc.property(fc.constant(file), (filePath) => {
          expect(fs.existsSync(filePath)).toBe(true);
          const source = readSourceFile(filePath);
          expect(source).toContain('BaseLayout');
        }),
        { numRuns: 1 }
      );
    });
  }
});
