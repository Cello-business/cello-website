/* Vite-plugin voor de blog. Elk artikel is een map blog/<slug>/index.html met
   een handvol meta-tags in de <head> (titel, description, auteur, datum,
   onderwerp). Uit die tags bouwt deze plugin, bij `npm run dev` en bij de
   build, wat anders met de hand bijgehouden moest worden:

   - blog/index.html: het nieuwste artikel groot, met beeld, en de oudere
     artikels eronder;
   - elk artikel: de meta/og/JSON-LD-tags, de kop (onderwerp, datum,
     leestijd), het beeld en "Lees ook";
   - de Engelse versie: staat er een en.html naast het artikel, dan komt die
     als onzichtbaar <template> in de pagina, en krijgen alle blogpagina's een
     woordenlijst met de Engelse titels en samenvattingen. src/js/i18n.js
     wisselt ze om wanneer iemand EN kiest.

   Een artikel publiceren is dus: map kopiëren, meta invullen, tekst schrijven. */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { ONDERWERPEN, ONDERWERP, icoon } from './onderwerpen.js';
import { AUTEURS } from './auteurs.js';
import { normalize } from '../../src/js/i18n.js';

// het echte adres: zonder www stuurt Vercel door, dus canonical en sitemap wijzen naar www
const SITE = 'https://www.cellobusiness.com';
const WOORDEN_PER_MINUUT = 200;

const datumKort = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });
const datumLang = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });

/* ── Artikels inlezen ── */

function meta(html, attr, name) {
  const re = new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]*)"`, 'i');
  return html.match(re)?.[1] ?? '';
}

function leestijd(html) {
  const body = html.match(/<div class="post-body[^"]*">([\s\S]*?)<\/div>\s*<\/article>/)?.[1] ?? '';
  const woorden = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(woorden / WOORDEN_PER_MINUUT));
}

function leesArtikel(dir, slug) {
  const html = readFileSync(resolve(dir, slug, 'index.html'), 'utf-8');
  // de lijst toont de kop van het artikel; de <title> is voor zoekmachines en mag korter
  const kop = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1];
  const titel = kop
    ? kop.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    : (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? slug).replace(/\s*·\s*Cello\s*$/, '');
  const onderwerp = meta(html, 'name', 'cello:onderwerp');
  if (!ONDERWERP[onderwerp]) {
    console.warn(`[blog] ${slug}: onbekend onderwerp "${onderwerp}". Kies uit: ${ONDERWERPEN.map((o) => o.slug).join(', ')}.`);
  }
  return {
    slug,
    url: `/blog/${slug}/`,
    titel,
    beschrijving: meta(html, 'name', 'description'),
    auteur: meta(html, 'name', 'author'),
    datum: meta(html, 'property', 'article:published_time'),
    beeld: meta(html, 'name', 'cello:beeld'),
    onderwerp: ONDERWERP[onderwerp] ? onderwerp : ONDERWERPEN[0].slug,
    minuten: leestijd(html),
    en: leesEngels(dir, slug),
  };
}

/* De Engelse versie naast een artikel (en.html), als die er is: titel en
   description voor browser en overzicht, en de kop, intro en tekst zelf. */
function leesEngels(dir, slug) {
  const file = resolve(dir, slug, 'en.html');
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf-8');
  const start = html.indexOf('<h1');
  if (start < 0) {
    console.warn(`[blog] ${slug}/en.html heeft geen <h1>; de Engelse versie wordt overgeslagen.`);
    return null;
  }
  return {
    titel: zonderTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''),
    paginatitel: html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '',
    beschrijving: meta(html, 'name', 'description'),
    inhoud: html.slice(start).trim(),
  };
}

/* Alle artikels, nieuwste eerst. Mappen met een _ ervoor tellen niet mee. */
export function leesArtikels(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_') && existsSync(resolve(dir, e.name, 'index.html')))
    .map((e) => leesArtikel(dir, e.name))
    .sort((a, b) => b.datum.localeCompare(a.datum));
}

/* ── Stukjes HTML ── */

// titels en beschrijvingen komen als HTML-tekst uit het artikel: veilig in tekst,
// maar een " moet nog ontsnapt worden in een attribuut, en JSON wil platte tekst
const attr = (s) => s.replace(/"/g, '&quot;');
const plat = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const zonderTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const minuten = (a) => `<span>${a.minuten} <span>min lezen</span></span>`;
const kort = (iso) => (iso ? datumKort.format(new Date(iso)) : '');
const lang = (iso) => (iso ? datumLang.format(new Date(iso)) : '');

/* Het beeld van een artikel, of zonder beeld een rustig vlak met het icoon
   van het onderwerp, zodat de lijst nooit een gat heeft. */
function beeld(a, laden = 'lazy') {
  if (a.beeld) return `<img src="${a.beeld}" alt="" loading="${laden}" decoding="async" />`;
  return `<span class="post-beeld-leeg post-beeld-${a.onderwerp}">${icoon(a.onderwerp)}</span>`;
}

function onderwerpRegel(a) {
  const o = ONDERWERP[a.onderwerp];
  return `<span class="post-onderwerp">${o.label}</span><span aria-hidden="true">·</span>${minuten(a)}`;
}

/* Het nieuwste artikel: groot beeld, daaronder datum, titel, samenvatting. */
function uitgelicht(a) {
  return `
          <article class="post-featured" data-reveal>
            <a href="${a.url}">
              <div class="post-beeld">${beeld(a, 'eager')}</div>
              <div class="post-featured-text">
                <time datetime="${a.datum}" data-fmt="lang">${lang(a.datum)}</time>
                <h2>${a.titel}</h2>
                <p>${a.beschrijving}</p>
                <p class="post-meta">${onderwerpRegel(a)}</p>
              </div>
            </a>
          </article>`;
}

/* Oudere artikels (en "Lees ook"): kleinere kaarten met beeld. */
function kaarten(artikels) {
  const kaart = (a) => `
            <article class="post-card">
              <a href="${a.url}">
                <div class="post-beeld">${beeld(a)}</div>
                <time datetime="${a.datum}" data-fmt="kort">${kort(a.datum)}</time>
                <h3>${a.titel}</h3>
                <p class="post-meta">${onderwerpRegel(a)}</p>
              </a>
            </article>`;
  return `
          <div class="post-grid">${artikels.map(kaart).join('')}
          </div>`;
}

function overzicht(artikels) {
  if (!artikels.length) return '';
  const [nieuwste, ...ouder] = artikels;
  const rest = ouder.length
    ? `
          <section class="post-more" aria-labelledby="meer-artikels">
            <h2 id="meer-artikels">Meer artikels</h2>${kaarten(ouder)}
          </section>`
    : '';
  return uitgelicht(nieuwste) + rest;
}

function artikelMeta(a) {
  const url = `${SITE}${a.url}`;
  // deelbeeld: het eigen beeld als het een foto is (svg kan LinkedIn niet tonen)
  const deelbeeld = /\.(jpe?g|png|webp)$/i.test(a.beeld) ? `${SITE}${a.beeld}` : `${SITE}/og-image.png`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: plat(a.titel),
    description: plat(a.beschrijving),
    datePublished: a.datum,
    inLanguage: 'nl-BE',
    image: deelbeeld,
    mainEntityOfPage: url,
    author: { '@type': 'Person', name: plat(a.auteur), ...(AUTEURS[a.auteur] && { jobTitle: AUTEURS[a.auteur].rol }) },
    publisher: { '@type': 'Organization', name: 'Cello', logo: { '@type': 'ImageObject', url: `${SITE}/favicon-512.png` } },
  };
  return `<link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Cello" />
    <meta property="og:locale" content="nl_BE" />
    <meta property="og:title" content="${attr(a.titel)}" />
    <meta property="og:description" content="${attr(a.beschrijving)}" />
    <meta property="og:image" content="${deelbeeld}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${attr(a.titel)}" />
    <meta name="twitter:description" content="${attr(a.beschrijving)}" />
    <meta name="twitter:image" content="${deelbeeld}" />
    <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`;
}

/* De regel boven de titel: onderwerp, wie het schreef, wanneer, hoe lang. */
function artikelKop(a) {
  const o = ONDERWERP[a.onderwerp];
  const wie = AUTEURS[a.auteur];
  if (a.auteur && !wie) console.warn(`[blog] ${a.slug}: auteur "${a.auteur}" staat niet in blog/_build/auteurs.js.`);
  const auteur = a.auteur
    ? `<span class="post-auteur">${wie ? `<img src="${wie.foto}" alt="" />` : ''}<span>${a.auteur}</span></span>`
    : '';
  return `<div class="post-kicker">
            <span class="post-topic">${o.label}</span>
            ${auteur}
            <span><time datetime="${a.datum}" data-fmt="lang">${lang(a.datum)}</time> · ${minuten(a)}</span>
          </div>`;
}

function leesOok(a, artikels) {
  const anderen = artikels.filter((x) => x.slug !== a.slug);
  const keuze = [...anderen.filter((x) => x.onderwerp === a.onderwerp), ...anderen.filter((x) => x.onderwerp !== a.onderwerp)].slice(0, 2);
  if (!keuze.length) return '';
  return `
      <section class="post-related" aria-labelledby="lees-ook">
        <div class="blog-col">
          <h2 id="lees-ook">Lees ook</h2>${kaarten(keuze)}
        </div>
      </section>`;
}

/* Engels: de titels en samenvattingen van alle artikels (voor het overzicht
   en "Lees ook"), als woordenlijst die i18n.js over de pagina legt. De
   sleutels zijn de Nederlandse teksten, genormaliseerd zoals i18n.js dat doet. */
function woordenlijst(artikels) {
  const lijst = {};
  for (const a of artikels) {
    if (!a.en) continue;
    lijst[normalize(plat(a.titel))] = plat(a.en.titel);
    if (a.beschrijving && a.en.beschrijving) lijst[normalize(plat(a.beschrijving))] = plat(a.en.beschrijving);
  }
  if (!Object.keys(lijst).length) return '';
  return `<script type="application/json" id="i18n-en">${JSON.stringify(lijst).replace(/</g, '\\u003c')}</script>`;
}

// het hele Engelse artikel, onzichtbaar tot iemand EN kiest
function engelsArtikel(a) {
  if (!a.en) return '';
  return `<template id="artikel-en" data-titel="${attr(a.en.paginatitel)}">${a.en.inhoud}</template>`;
}

/* ── De plugin ── */

export function blogPlugin(root) {
  const dir = resolve(root, 'blog');
  const isBlogHtml = (file) => file.startsWith(dir) && file.endsWith('index.html');

  return {
    name: 'cello-blog',

    // het overzicht hangt af van alle artikels: bij elke wijziging opnieuw laden
    configureServer(server) {
      const herlaad = (file) => {
        if (isBlogHtml(resolve(file)) || resolve(file).startsWith(resolve(dir, '_build'))) server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', herlaad);
      server.watcher.on('unlink', herlaad);
      server.watcher.on('change', herlaad);
    },

    // sitemap.xml voor Google: homepage, blog en elk artikel met zijn datum
    generateBundle() {
      const artikels = leesArtikels(dir);
      const url = (loc, lastmod) =>
        `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        url(`${SITE}/`),
        url(`${SITE}/blog/`, artikels[0]?.datum),
        ...artikels.map((a) => url(`${SITE}${a.url}`, a.datum)),
        '</urlset>',
        '',
      ].join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml });
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const file = resolve(ctx.filename);
        if (!isBlogHtml(file)) return html;
        const artikels = leesArtikels(dir);

        if (file === resolve(dir, 'index.html')) {
          return html
            .replace('<!-- cello:overzicht -->', overzicht(artikels))
            .replace('</main>', `${woordenlijst(artikels)}
    </main>`);
        }

        const slug = basename(dirname(file));
        const a = artikels.find((x) => x.slug === slug) ?? leesArtikel(dir, slug);
        return html
          .replace('<!-- cello:meta -->', artikelMeta(a))
          .replace('<!-- cello:kop -->', artikelKop(a))
          .replace('<!-- cello:beeld -->', `<figure class="post-hero">${beeld(a, 'eager')}</figure>`)
          .replace('<!-- cello:lees-ook -->', leesOok(a, artikels))
          .replace('</main>', `${engelsArtikel(a)}${woordenlijst(artikels)}
    </main>`);
      },
    },
  };
}
