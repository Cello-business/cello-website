/* Lokale server voor public/ (`npm run dev`), zonder dependencies.
   Serveert met dezelfde headers als vercel.json, zodat een CSP-fout ook lokaal opvalt
   (zonder HSTS en upgrade-insecure-requests, die op http://localhost niet werken).
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
};

const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
const headers = Object.fromEntries(
  vercel.headers
    .flatMap((h) => h.headers)
    .filter((h) => h.key !== 'Strict-Transport-Security')
    .map((h) => [h.key, h.value.replace(/;\s*upgrade-insecure-requests/, '')]),
);

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
  res.writeHead(status, { ...headers, 'Content-Type': TYPES[extname(file || '404.html')] || 'application/octet-stream' });
  res.end(body);
}).listen(PORT, () => console.log(`Cello Business draait op http://localhost:${PORT}`));
