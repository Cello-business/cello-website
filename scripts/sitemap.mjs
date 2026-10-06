/* Maakt public/sitemap.xml uit de pagina's in public/. Draait bij elke build op Vercel (en bij
   `npm run check` en `npm run dev`), zodat een nieuw blogartikel vanzelf in de sitemap komt.
   - Elke index.html in public/ telt mee, behalve pagina's met noindex.
   - lastmod komt uit de pagina zelf, want Vercel kloont maar 10 commits diep en git-datums kloppen daar niet:
     article:modified_time, anders article:published_time, anders og:updated_time.
     Een pagina zonder eigen datum (zoals het blogoverzicht) krijgt de nieuwste datum van de pagina's eronder.
   - Een blogartikel (public/blog/<slug>/index.html) zonder article:published_time breekt de build af. */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = join(ROOT, 'public');
const SITE = 'https://www.cellobusiness.com';
const DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?([+-]\d{2}:\d{2}|Z))?$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function meta(html, prop) {
  const m = html.match(new RegExp(`<meta (?:property|name)="${prop}" content="([^"]*)"`));
  return m ? m[1].trim() : null;
}

const errors = [];
const pages = walk(PUBLIC)
  .filter((f) => f.endsWith(`${sep}index.html`) || f === join(PUBLIC, 'index.html'))
  .map((file) => {
    const html = readFileSync(file, 'utf8');
    const dir = relative(PUBLIC, file).split(sep).slice(0, -1).join('/');
    const path = dir ? `/${dir}/` : '/';
    const own = meta(html, 'article:modified_time') || meta(html, 'article:published_time') || meta(html, 'og:updated_time');
    if (/^blog\/[^/]+$/.test(dir) && !meta(html, 'article:published_time')) {
      errors.push(`${relative(ROOT, file)}: blogartikel zonder <meta property="article:published_time" content="JJJJ-MM-DD">.`);
    }
    if (own && !DATE.test(own)) errors.push(`${relative(ROOT, file)}: datum "${own}" is geen geldige datum (JJJJ-MM-DD).`);
    return { path, own, noindex: /<meta name="robots" content="[^"]*noindex/.test(html) };
  })
  .filter((p) => !p.noindex)
  .sort((a, b) => a.path.localeCompare(b.path));

for (const p of pages) {
  const below = pages.filter((q) => q.path !== p.path && q.path.startsWith(p.path) && q.own).map((q) => q.own);
  p.lastmod = p.own || below.sort().at(-1) || null;
}

if (errors.length) {
  console.error(`\nsitemap.xml niet gemaakt:\n${errors.map((e) => `  - ${e}`).join('\n')}\n`);
  process.exit(1);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE}${p.path}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`;

const out = join(PUBLIC, 'sitemap.xml');
const changed = !existsSync(out) || readFileSync(out, 'utf8') !== xml;
if (changed) writeFileSync(out, xml);
console.log(`sitemap.xml ${changed ? 'bijgewerkt' : 'ongewijzigd'}: ${pages.map((p) => `${p.path} (${p.lastmod || 'geen datum'})`).join(', ')}`);
