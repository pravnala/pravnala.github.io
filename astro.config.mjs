// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';

// Keystatic requires server-side rendering for its admin UI.
// We only include it in dev mode; production builds are fully static.
const isDev = process.env.NODE_ENV !== 'production';

const integrations = [mdx(), markdoc(), react()];

if (isDev) {
  const { default: keystatic } = await import('@keystatic/astro');
  integrations.push(keystatic());
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://pravnala.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations,
});
