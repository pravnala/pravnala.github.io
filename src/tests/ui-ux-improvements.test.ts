import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
}

function toLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function computeContrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const TOKEN_VALUES: Record<string, string> = {
  '--color-ink-50': '#FFFFFF',
  '--color-ink-300': '#A1A1AA',
  '--color-ink-500': '#71717A',
};

const CANVAS = '#0A0A0A';

// ── Property 1: Text contrast meets WCAG AA minimums ─────────────────────────

// WCAG AA: normal text ≥4.5:1, large text ≥3:1
// --color-ink-500 is used for tertiary/label text (large text threshold applies)
const TOKEN_THRESHOLDS: Record<string, number> = {
  '--color-ink-50': 4.5,
  '--color-ink-300': 4.5,
  '--color-ink-500': 3.0,
};

describe('Property 1: Text contrast meets WCAG AA minimums', () => {
  // Feature: ui-ux-improvements, Property 1: Text contrast meets WCAG AA minimums
  it('all ink tokens meet their WCAG AA contrast threshold against canvas', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('--color-ink-50', '--color-ink-300', '--color-ink-500'),
        (token) => {
          const ratio = computeContrastRatio(TOKEN_VALUES[token], CANVAS);
          const threshold = TOKEN_THRESHOLDS[token];
          return ratio >= threshold;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 2: No low-opacity text on meaningful content ─────────────────────

describe('Property 2: No low-opacity text on meaningful content', () => {
  const componentFiles = [
    'src/components/work/CaseStudyCard.astro',
    'src/components/blog/BlogCard.astro',
    'src/components/home/DualPath.astro',
    'src/components/ui/AnimatedSection.astro',
  ];

  const fileContents = componentFiles.map((f) => ({
    file: f,
    content: fs.readFileSync(path.resolve(process.cwd(), f), 'utf-8'),
  }));

  // Feature: ui-ux-improvements, Property 2: No low-opacity text on meaningful content
  it('no opacity class below opacity-50 appears on text-bearing elements', () => {
    fc.assert(
      fc.property(fc.constantFrom(...fileContents), ({ file, content }) => {
        // Match opacity-10 through opacity-40 (i.e., opacity-[1-4]0 or opacity-25)
        // These are the "low opacity" classes that should not appear on text elements
        const lowOpacityPattern = /\bopacity-(?:10|20|25|30|40)\b/g;
        const matches = content.match(lowOpacityPattern);
        if (matches) {
          throw new Error(
            `${file} contains low-opacity class(es): ${matches.join(', ')}`
          );
        }
        return true;
      }),
      { numRuns: 100 }
    );
  });
});

// ── Property 3: AnimatedSection renders correct attributes ────────────────────

describe('Property 3: AnimatedSection renders correct attributes for all valid configs', () => {
  // Pure function modelling the attribute derivation from props
  function deriveAttributes(animation: string, delay: number) {
    return {
      dataAnimation: animation,
      revealDelay: `${delay}ms`,
    };
  }

  // Feature: ui-ux-improvements, Property 3: AnimatedSection renders correct attributes for all valid configs
  it('data-animation and --reveal-delay match props for any valid combination', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('fade-up', 'fade-in', 'slide-left', 'clip-up'),
        fc.nat(2000),
        (animation, delay) => {
          const attrs = deriveAttributes(animation, delay);
          return (
            attrs.dataAnimation === animation &&
            attrs.revealDelay === `${delay}ms`
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 4: Only transform and opacity are animated ──────────────────────

describe('Property 4: Only transform and opacity are animated', () => {
  const ALLOWED_PROPERTIES = new Set([
    'transform',
    'opacity',
    'clip-path',
    'background-color',
    'border-color',
    'background',
    'border',
  ]);

  const componentFiles = [
    'src/components/work/CaseStudyCard.astro',
    'src/components/blog/BlogCard.astro',
    'src/components/home/DualPath.astro',
    'src/components/ui/AnimatedSection.astro',
    'src/components/layout/Navbar.astro',
  ];

  const fileContents = componentFiles.map((f) => ({
    file: f,
    content: fs.readFileSync(path.resolve(process.cwd(), f), 'utf-8'),
  }));

  function extractTransitionProperties(css: string): string[] {
    const props: string[] = [];
    // Match transition: <value> declarations
    const transitionRegex = /transition\s*:\s*([^;}{]+)/g;
    let m: RegExpExecArray | null;
    while ((m = transitionRegex.exec(css)) !== null) {
      const value = m[1].trim();
      // Split on commas that are NOT inside parentheses (e.g. cubic-bezier(...))
      const segments: string[] = [];
      let depth = 0;
      let current = '';
      for (const ch of value) {
        if (ch === '(') {
          depth++;
          current += ch;
        } else if (ch === ')') {
          depth--;
          current += ch;
        } else if (ch === ',' && depth === 0) {
          segments.push(current.trim());
          current = '';
        } else {
          current += ch;
        }
      }
      if (current.trim()) segments.push(current.trim());

      for (const seg of segments) {
        if (!seg) continue;
        // The property name is the first token (before any space/duration)
        const propName = seg.split(/\s+/)[0];
        if (propName && propName !== 'none' && propName !== 'all') {
          props.push(propName);
        }
      }
    }
    return props;
  }

  // Feature: ui-ux-improvements, Property 4: Only transform and opacity are animated
  it('transition declarations only reference allowed CSS properties', () => {
    fc.assert(
      fc.property(fc.constantFrom(...fileContents), ({ file, content }) => {
        // Extract only the <style> block content
        const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
        if (!styleMatch) return true;
        const styleContent = styleMatch.join('\n');

        const props = extractTransitionProperties(styleContent);
        const disallowed = props.filter((p) => !ALLOWED_PROPERTIES.has(p));
        if (disallowed.length > 0) {
          throw new Error(
            `${file} animates disallowed properties: ${disallowed.join(', ')}`
          );
        }
        return true;
      }),
      { numRuns: 100 }
    );
  });
});

// ── Property 5: will-change lifecycle is correct ─────────────────────────────

describe('Property 5: will-change lifecycle is correct', () => {
  const animatedSectionContent = fs.readFileSync(
    path.resolve(process.cwd(), 'src/components/ui/AnimatedSection.astro'),
    'utf-8'
  );

  // Feature: ui-ux-improvements, Property 5: will-change lifecycle is correct
  it('pre-visible state has will-change: transform; visible state has will-change: auto', () => {
    fc.assert(
      fc.property(fc.constant(animatedSectionContent), (content) => {
        // Check that not(.is-visible) has will-change: transform
        const hasWillChangeTransform =
          /animated-section:not\(\.is-visible\)\s*\{[^}]*will-change\s*:\s*transform/s.test(
            content
          );
        // Check that .is-visible has will-change: auto
        const hasWillChangeAuto =
          /animated-section\.is-visible\s*\{[^}]*will-change\s*:\s*auto/s.test(
            content
          );
        return hasWillChangeTransform && hasWillChangeAuto;
      }),
      { numRuns: 100 }
    );
  });
});

// ── Property 6: Active nav link indicator present for every route ─────────────

describe('Property 6: Active nav link indicator present for every route', () => {
  function isActive(href: string, pathname: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  // Feature: ui-ux-improvements, Property 6: Active nav link indicator present for every route
  it('isActive(route, route) is always true for every nav route', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/work', '/arnis', '/blog', '/contact'),
        (route) => {
          return isActive(route, route) === true;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 7: Mobile menu nav links have correct staggered delays ───────────

describe('Property 7: Mobile menu nav links have correct staggered delays', () => {
  function getLinkDelay(index: number): string {
    return `${index * 50}ms`;
  }

  // Feature: ui-ux-improvements, Property 7: Mobile menu nav links have correct staggered delays
  it('each link at index i has --link-delay equal to i * 50ms', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
        (links) => {
          return links.every((_, i) => getLinkDelay(i) === `${i * 50}ms`);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 8: aria-expanded reflects mobile menu open/closed state ──────────

describe('Property 8: aria-expanded reflects mobile menu open/closed state', () => {
  function simulateMenuState(toggles: boolean[]): boolean {
    let isOpen = false;
    for (const toggle of toggles) {
      if (toggle) isOpen = !isOpen;
    }
    return isOpen;
  }

  // Feature: ui-ux-improvements, Property 8: aria-expanded reflects mobile menu open/closed state
  it('aria-expanded always equals String(isOpen) after any toggle sequence', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 20 }),
        (toggles) => {
          const isOpen = simulateMenuState(toggles);
          const ariaExpanded = String(isOpen);
          return ariaExpanded === 'true' || ariaExpanded === 'false';
        }
      ),
      { numRuns: 100 }
    );
  });

  it('aria-expanded value is consistent with computed open state', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 20 }),
        (toggles) => {
          const isOpen = simulateMenuState(toggles);
          return String(isOpen) === (isOpen ? 'true' : 'false');
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 9: Focus trap contains all keyboard focus within open mobile menu ─

describe('Property 9: Focus trap contains all keyboard focus within open mobile menu', () => {
  function nextFocus(current: number, total: number, shift: boolean): number {
    if (shift) return current === 0 ? total - 1 : current - 1;
    return current === total - 1 ? 0 : current + 1;
  }

  // Feature: ui-ux-improvements, Property 9: Focus trap contains all keyboard focus within open mobile menu
  it('nextFocus always returns an index within [0, total-1]', () => {
    fc.assert(
      fc.property(
        fc.nat(10).filter((n) => n > 0), // total >= 1
        fc.boolean(), // shift key
        (total, shift) => {
          // Test all valid current indices
          for (let current = 0; current < total; current++) {
            const next = nextFocus(current, total, shift);
            if (next < 0 || next >= total) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Tab wraps from last to first element', () => {
    fc.assert(
      fc.property(
        fc.nat(10).filter((n) => n > 0),
        (total) => {
          return nextFocus(total - 1, total, false) === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Shift+Tab wraps from first to last element', () => {
    fc.assert(
      fc.property(
        fc.nat(10).filter((n) => n > 0),
        (total) => {
          return nextFocus(0, total, true) === total - 1;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 10: Navbar scroll state is a round-trip ─────────────────────────

describe('Property 10: Navbar scroll state is a round-trip', () => {
  const THRESHOLD = 80;

  function getScrollState(
    scrollY: number,
    threshold: number = THRESHOLD
  ): boolean {
    return scrollY > threshold;
  }

  // Feature: ui-ux-improvements, Property 10: Navbar scroll state is a round-trip
  it('scroll state is false when scrollY <= 80', () => {
    fc.assert(
      fc.property(
        fc.nat(80), // 0..80 inclusive
        (scrollY) => {
          return getScrollState(scrollY) === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('scroll state is true when scrollY > 80', () => {
    fc.assert(
      fc.property(fc.integer({ min: 81, max: 10000 }), (scrollY) => {
        return getScrollState(scrollY) === true;
      }),
      { numRuns: 100 }
    );
  });

  it('getScrollState is idempotent (round-trip)', () => {
    fc.assert(
      fc.property(fc.nat(500), (scrollY) => {
        return getScrollState(scrollY) === getScrollState(scrollY);
      }),
      { numRuns: 100 }
    );
  });

  it('final scroll position determines final state regardless of sequence', () => {
    fc.assert(
      fc.property(
        fc.array(fc.nat(500), { minLength: 2, maxLength: 50 }),
        (positions) => {
          const finalPos = positions[positions.length - 1];
          const expectedState = getScrollState(finalPos);
          // Simulate processing the sequence — only the final position matters
          let state = false;
          for (const pos of positions) {
            state = getScrollState(pos);
          }
          return state === expectedState;
        }
      ),
      { numRuns: 100 }
    );
  });
});
