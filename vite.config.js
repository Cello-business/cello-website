import { defineConfig } from 'vite';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPlugin } from './blog/_build/plugin.js';

const root = fileURLToPath(new URL('.', import.meta.url));

/* Elke map in blog/ met een index.html is een artikel en wordt mee gebouwd.
   Mappen die met een _ beginnen (zoals blog/_sjabloon) zijn werkbestanden:
   bereikbaar in `npm run dev`, maar ze gaan niet live. Het overzicht, de
   artikelkop en "Lees ook" worden gevuld door blog/_build/plugin.js. */
function blogPages() {
  const dir = resolve(root, 'blog');
  const pages = { blog: resolve(dir, 'index.html') };
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue;
    const file = resolve(dir, entry.name, 'index.html');
    if (existsSync(file)) pages[`blog/${entry.name}`] = file;
  }
  return pages;
}

export default defineConfig({
  base: './',
  plugins: [blogPlugin(root)],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        ...blogPages(),
      },
    },
  },
});
