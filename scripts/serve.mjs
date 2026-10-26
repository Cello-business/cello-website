/* Lokale server voor public/ (`npm run dev`), zonder dependencies.
   Serveert met dezelfde headers als vercel.json, zodat een CSP-fout ook lokaal opvalt
   (zonder HSTS en upgrade-insecure-requests, die op http://localhost niet werken).
   Zoals op Vercel krijgt een pad alleen de headers van de blokken waarvan de source matcht.
   Onbekende paden krijgen 404.html, zoals op Vercel. Redirects uit vercel.json doet hij niet. */
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = join(ROOT, 'public');
const PORT = Number(process.env.PORT) || 5173;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
};

const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
// source is een patroon van Vercel; voor die in vercel.json (/(.*), /fonts/(.*)) volstaat een gewone regex
const rules = vercel.headers.map((h) => ({
  source: new RegExp(`^${h.source}$`),
  headers: h.headers
    .filter((x) => x.key !== 'Strict-Transport-Security')
    .map((x) => [x.key, x.value.replace(/;\s*upgrade-insecure-requests/, '')]),
}));
const headersFor = (path) => Object.fromEntries(rules.filter((r) => r.source.test(path)).flatMap((r) => r.headers));

function resolve(urlPath) {
  const p = join(PUBLIC, normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, ''));
  if (!p.startsWith(PUBLIC)) return null;
  if (existsSync(p) && statSync(p).isFile()) return p;
  if (existsSync(join(p, 'index.html'))) return join(p, 'index.html');
  return null;
}

createServer((req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const file = resolve(path);
  const status = file ? 200 : 404;
  const body = readFileSync(file || join(PUBLIC, '404.html'));
  res.writeHead(status, { ...headersFor(path), 'Content-Type': TYPES[extname(file || '404.html')] || 'application/octet-stream' });
  res.end(body);
}).listen(PORT, () => console.log(`Cello Business draait op http://localhost:${PORT}`));
