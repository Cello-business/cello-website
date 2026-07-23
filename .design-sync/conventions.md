# Cello — merkconventies

Dit is een **merkstijl-import zonder componenten**: `_ds_bundle.js` is bewust leeg. Bouw schermen met gewone HTML/CSS en de onderstaande tokens en klassen uit `styles.css` (→ `_ds_bundle.css`). Alle copy is Nederlands, zakelijke B2B-toon. Merknaam in copy: "Cello"; het woordmerk is altijd kleine letters "cello". Elke CTA verwijst naar `contact@cellobusiness.com`.

## Tokens (CSS custom properties, gedefinieerd op `:root`)

- Kleuren: `--groen` #4E9A82 (hoofdkleur, accenten), `--blauw` #5E8FB8 (links/labels), `--donker` #1E3730 (titels/tekst/donkere vlakken; hover-varianten `--donker-2`, `--donker-3`), `--grijsgroen` #5B6B64 (lopende tekst), `--mint` #E4EFE9 (panelen), `--creme` #F4F2EA (kaarten/secties), `--grijs` #EAEAE6 (pagina-achtergrond), `--wit` #FDFDFB (kaartkernen).
- Typografie: `--font` (Figtree; gewichten 400/500/600/700/800 lokaal geleverd via `fonts/fonts.css`). Titels 800 met strakke letterspatiëring; tussenkoppen/labels 600; lopende tekst 400, 16px. `h1`/`h2`/`h3` zijn al gestyled; een `<em>` binnen `h1`/`h2` wordt cursief en groen (accentwoord).
- Vorm & diepte: radii `--r-l` (2rem), `--r-m`, `--r-s`; schaduwen `--shadow-soft`, `--shadow-tiny`; `--shell-pad`.
- Beweging: `--ease`, `--t-fast`, `--t-slow`. Layout: `--container`, `--sec-pad`.

## Klassen (in `_ds_bundle.css`)

- Layout: `.container` (gecentreerde pagina-breedte), `.sec-head` + `.sec-sub` (sectiekop met subtekst).
- Knoppen: `.btn` + variant `.btn-primary` (donker), `.btn-ghost` (licht met rand), `.btn-light` (crème op donker); maat `.btn-s`; optionele pijl-orb in de knop: `.btn-orb` (varianten `.btn-orb-soft`, `.btn-orb-donker`).
- Kaarten: `.shell` > `.core` — dubbele bezel: buitenschil met zachte schaduw, witte kern met afgeronde hoeken. Dit is hét Cello-kaartpatroon.
- Atomen: `.chip` (klein label met icoon), `.avatar` / `.avatar-xs`, `.pulse` (live-stip), `.eq` met 7 `<i>` (statische golfvorm-balkjes, merk-eigen audio-motief).

## Stijlregels

- Rustige, eenvoudige, overwegend statische layouts; beweging subtiel en met respect voor `prefers-reduced-motion`.
- Geen em dashes in copy. Geen drukke of "dansende" animaties.
- Achtergronden: pagina `--grijs`, kaarten `--creme`/`--wit`, donkere secties `--donker`.

## Waar de waarheid staat

Lees vóór het stylen: `styles.css` en zijn imports (`_ds_bundle.css` = tokens + atomen, `fonts/fonts.css`), `guidelines/merkstijl.md` (palet en typografie) en `guidelines/logo.md` (het logo als inline SVG met `fill="currentColor"` — herkleurbaar via CSS `color`; kopieer de paden exact).

## Voorbeeld

```html
<section style="background: var(--grijs); padding: var(--sec-pad) 0;">
  <div class="container">
    <div class="sec-head">
      <h2>Oefen het gesprek <em>voor</em> het gesprek</h2>
      <p class="sec-sub">AI-belsimulaties voor B2B-teams.</p>
    </div>
    <div class="shell"><div class="core" style="padding: 2rem;">
      <span class="chip"><span class="pulse"></span> Live simulatie</span>
      <p>Realistische klantgesprekken, veilig geoefend.</p>
      <a class="btn btn-primary" href="mailto:contact@cellobusiness.com">Plan een demo</a>
    </div></div>
  </div>
</section>
```
