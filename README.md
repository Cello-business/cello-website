# Cello website

Marketingsite voor Cello: AI-belsimulaties waarmee teams echte telefoongesprekken oefenen en meteen feedback krijgen.

## Stack

- [Vite](https://vitejs.dev): build & dev server
- [GSAP](https://gsap.com) + ScrollTrigger: scroll-animaties (gepinde simulatie, reveals, tellers)
- [Lenis](https://lenis.darkroom.engineering): smooth scrolling
- Vanilla HTML/CSS/JS, merkstijl uit `merkstijl.md`

## Ontwikkelen

```bash
npm install
npm run dev      # dev server op http://localhost:5173
npm run build    # productie-build naar dist/
npm run preview  # bekijk de productie-build lokaal
```

## Goed om te weten

- **E-mailadres**: alle CTA's verwijzen naar `contact@cellobusiness.com`.
- **Copy**: alle teksten staan in `index.html`; kleuren en tokens in `src/styles/base.css`. Die tokens komen uit het Cello design system (`docs/design.md` in de webapp): het palet is gesloten, dus geen nieuwe kleuren toevoegen.
- **Blog**: elk artikel is een eigen map `blog/<slug>/index.html`. Een nieuw artikel maak je zo:
  1. Kopieer `blog/_sjabloon` naar `blog/<slug>` (kort, kleine letters, koppeltekens). Het sjabloon is meteen de schrijfhandleiding.
  2. Vul in de `<head>` de titel, description, auteur (moet in `blog/_build/auteurs.js` staan, voor foto en rol), datum (`article:published_time`) en het onderwerp (`cello:onderwerp`: `sales`, `klantendienst`, `onboarding` of `leiderschap`) in.
  3. Zet een beeld (verhouding 2:1, bv. 2400×1200 jpg) in `public/blog/beelden/` en vul `cello:beeld` in. Zonder beeld toont de blog een rustig vlak met het icoon van het onderwerp.
  4. Schrijf de titel, intro en tekst.

  De rest gebeurt vanzelf, in `npm run dev` en bij de build (`blog/_build/plugin.js`): het overzicht (het nieuwste artikel groot, oudere eronder), de leestijd, "Lees ook", het deelbeeld voor LinkedIn en de canonical/og/JSON-LD-tags. De titel in het overzicht is de `<h1>` van het artikel; de `<title>` mag korter, voor Google. Het beeld van het eerste artikel is gemaakt met de stijlen van de site; de bron staat in `blog/_beelden/`. Mappen die met `_` beginnen gaan niet live. Artikels zijn Nederlandstalig; de rand (nav, footer, overzicht) vertaalt mee via `src/js/i18n.js`.
- **Animaties**: respecteren `prefers-reduced-motion` en werken ook zonder JavaScript (statische eindtoestanden).
- **Simulatie-sectie**: de gepinde scroll-ervaring zit in `src/js/sim.js`; op mobiel wordt die automatisch een gestapelde versie.
