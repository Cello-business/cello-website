# Cello Business website

Marketingsite voor Cello Business: beltraining met AI-klanten voor contactcenters en salesteams. Live op https://www.cellobusiness.com.

## Opbouw

De site is statisch: alles in `public/` gaat ongewijzigd live op Vercel. Er is geen framework en geen bundler; elke pagina is één HTML-bestand met de CSS en JavaScript inline.

```
public/
  index.html                                     homepage
  blog/index.html                                blogoverzicht
  blog/piloten-oefenen-in-een-simulator/         artikel
  404.html                                       pagina voor onbekende links
  img/  audio/                                   foto's en de stemmen van de AI-klanten
  favicon.ico  favicon.svg  apple-touch-icon.png  icon-*.png  site.webmanifest
  sitemap.xml  robots.txt
scripts/sitemap.mjs                              maakt sitemap.xml bij elke deploy
scripts/check.mjs                                controle voor elke deploy
scripts/serve.mjs                                lokale server
vercel.json                                      headers (CSP), redirects, buildinstellingen
```

## Ontwikkelen

```bash
npm run dev     # lokale server op http://localhost:5173, met dezelfde CSP als productie
npm run check   # maakt sitemap.xml en draait dezelfde controle als Vercel bij elke deploy
```

Er zijn geen dependencies; `npm install` is niet nodig.

## Goed om te weten

- **Demo en contact**: de knoppen "Plan een demo" gaan naar de Google Agenda-boekingspagina; het e-mailadres is `contact@cellobusiness.com`.
- **CSP**: `vercel.json` laat alleen inline scripts toe waarvan de hash in `script-src` staat. Pas je een inline `<script>` aan, dan faalt `npm run check` en toont het de nieuwe hash die je in `vercel.json` zet. Zo gaat er nooit een versie live waarin de browser de scripts weigert. JSON-LD (`type="application/ld+json"`) valt daarbuiten.
- **Vindbaarheid en delen**: elke pagina heeft een canonical URL, een description, Open Graph-tags met een deelbeeld van 1200×630 en gestructureerde gegevens (JSON-LD) voor Google. Een nieuwe pagina krijgt die ook. De check controleert dat elk lokaal pad en elke URL naar de eigen site bestaat, en dat de FAQ in de JSON-LD woord voor woord gelijk is aan de zichtbare FAQ. Pas je een FAQ-antwoord aan, doe het dan op beide plaatsen.
- **Foto's**: elke foto heeft een alt-tekst. Puur decoratieve foto's hebben daarnaast `aria-hidden="true"`, zodat een schermlezer ze overslaat.
- **Sitemap**: `sitemap.xml` wordt bij elke deploy automatisch gemaakt uit alle `index.html`-pagina's in `public/` (behalve pagina's met `noindex`). De `lastmod` komt uit de pagina zelf: `article:modified_time` of `article:published_time` voor een artikel, `og:updated_time` voor de homepage (zet die datum bij een inhoudelijke wijziging), en voor het blogoverzicht de datum van het nieuwste artikel.
- **Nieuw blogartikel**: kopieer de map van een bestaand artikel naar `public/blog/<slug>/`, pas de tekst, de `<head>` (titel, description, canonical, og-tags, `article:published_time`) en de JSON-LD aan, voeg het artikel toe aan `public/blog/index.html` en maak een deelbeeld van 1200×630 in `public/img/`. Het komt vanzelf in de sitemap; zonder `article:published_time` stopt de deploy met een duidelijke melding.
- **Adressen**: de site staat alleen op de echte adressen (`/`, `/blog/`, `/blog/<artikel>/`). De vroegere testversie op `/b` bestaat niet meer en geeft een 404. Alleen het oude artikel `/blog/nieuwe-bellers-oefenen-op-je-klanten/` stuurt permanent door naar het huidige (zie `redirects` in `vercel.json`).
- **Analytics**: Vercel Web Analytics via `/_vercel/insights/script.js` (zonder cookies). Lokaal geeft dat script een 404; dat is normaal.
- **Animaties**: respecteren `prefers-reduced-motion` en tonen dan een stilstaand eindbeeld.
