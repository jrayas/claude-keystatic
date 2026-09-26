// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import tailwindcss from '@tailwindcss/vite';

// The Keystatic admin route is server-rendered and needs an adapter to run,
// which GitHub Pages (pure static hosting) can't provide. It's only needed
// for local editing, so it's excluded from production builds.
const isDev = process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://jrayas.github.io',
  base: '/claude-keystatic',
  integrations: [
    react(),
    markdoc(),
    ...(isDev ? [keystatic()] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
