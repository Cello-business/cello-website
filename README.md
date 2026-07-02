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

- **E-mailadres**: alle CTA's verwijzen naar `hallo@cello.be` (placeholder). Zoek-en-vervang in `index.html` zodra het echte adres bestaat.
- **Copy**: alle teksten staan in `index.html`; kleuren en tokens in `src/styles/base.css` (afgeleid van `merkstijl.md`).
- **Animaties**: respecteren `prefers-reduced-motion` en werken ook zonder JavaScript (statische eindtoestanden).
- **Simulatie-sectie**: de gepinde scroll-ervaring zit in `src/js/sim.js`; op mobiel wordt die automatisch een gestapelde versie.
