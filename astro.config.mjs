// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://pravnala.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx()],
  fonts: [
    {
      name: 'Outfit',
      provider: fontProviders.google(),
      cssVariable: '--font-outfit',
      weights: [400, 700, 900],
      styles: ['normal'],
    },
    {
      name: 'Inter',
      provider: fontProviders.google(),
      cssVariable: '--font-inter',
      weights: [400, 700, 900],
      styles: ['normal', 'italic'],
    },
  ],
});
