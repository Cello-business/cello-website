/* Controle voor elke deploy (`npm run build` op Vercel, of `npm run check` lokaal).
   De site is statisch: public/ gaat ongewijzigd live. Dit script breekt de build af
   als er iets is dat in productie stil zou falen:
   1. een inline <script> waarvan de hash niet in de CSP van vercel.json staat
      (de browser weigert het script dan, en menu, tabs en audio werken niet meer);
   2. een lokaal pad (src, href, og:image, sitemap ...) dat naar een bestand verwijst dat niet bestaat;
   3. een pagina uit sitemap.xml met noindex (dan verdwijnt ze uit Google). */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = join(ROOT, 'public');
const SITE = 'https://www.cellobusiness.com';
const errors = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// Bestaat het pad uit de URL in public/? Mappen tellen als ze een index.html hebben
function exists(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean.startsWith('/_vercel/')) return true; // door Vercel zelf geserveerd (Analytics)
  const p = join(PUBLIC, clean);
  if (clean.endsWith('/')) return existsSync(join(p, 'index.html'));
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
}

const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
const csp = vercel.headers.flatMap((h) => h.headers).find((h) => h.key === 'Content-Security-Policy').value;
const scriptSrc = csp.split(';').map((d) => d.trim()).find((d) => d.startsWith('script-src')) || '';

const files = walk(PUBLIC);
const pages = files.filter((f) => f.endsWith('.html'));

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const name = relative(ROOT, file);

  // 1. Inline scripts tegen de CSP. JSON-LD wordt niet uitgevoerd en valt er dus buiten
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/(ld\+)?json"/.test(m[1])) continue;
    const hash = `sha256-${createHash('sha256').update(m[2], 'utf8').digest('base64')}`;
    if (!scriptSrc.includes(`'${hash}'`)) {
      const line = html.slice(0, m.index).split('\n').length;
      errors.push(`${name}:${line} inline script staat niet in de CSP. Zet '${hash}' bij script-src in vercel.json.`);
    }
  }

  // 2. Lokale paden in attributen
  for (const m of html.matchAll(/\b(?:src|href|data-audio)="(\/(?!\/)[^"]*)"/g)) {
    if (!exists(m[1])) errors.push(`${name}: ${m[1]} bestaat niet in public/.`);
  }
}

// 2. Absolute URL's naar de eigen site (canonical, og:image, JSON-LD, sitemap, robots)
for (const file of files.filter((f) => /\.(html|xml|txt|webmanifest)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/https:\/\/www\.cellobusiness\.com(\/[^"'\s<>)]*)/g)) {
    if (!exists(m[1])) errors.push(`${relative(ROOT, file)}: ${SITE}${m[1]} bestaat niet in public/.`);
  }
}
const manifest = JSON.parse(readFileSync(join(PUBLIC, 'site.webmanifest'), 'utf8'));
for (const icon of manifest.icons) {
  if (!exists(icon.src)) errors.push(`public/site.webmanifest: ${icon.src} bestaat niet.`);
}

// 3. Pagina's in de sitemap moeten indexeerbaar zijn
const sitemap = readFileSync(join(PUBLIC, 'sitemap.xml'), 'utf8');
for (const m of sitemap.matchAll(/<loc>https:\/\/www\.cellobusiness\.com(\/[^<]*)<\/loc>/g)) {
  const page = join(PUBLIC, m[1].endsWith('/') ? `${m[1]}index.html` : m[1]);
  if (existsSync(page) && /<meta name="robots" content="[^"]*noindex/.test(readFileSync(page, 'utf8'))) {
    errors.push(`${relative(ROOT, page)} staat in sitemap.xml maar heeft noindex: Google slaat ze dan over.`);
  }
}

if (errors.length) {
  console.error(`\n${errors.length} probleem/problemen gevonden:\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
}
console.log(`OK: ${pages.length} pagina's, CSP-hashes, lokale paden en sitemap kloppen.`);
