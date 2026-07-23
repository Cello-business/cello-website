# Design-sync notities — cello-website

- Dit is een **merkstijl-import zonder componenten** (tokens-only). De site is een vanilla single-page marketingsite, geen componentenbibliotheek; de gebruiker koos bewust voor een brand-only sync (kleuren, typografie, fonts, logo, richtlijnen).
- Entry is een lege stub: `.design-sync/brand/entry.js` — geef die door als `--entry`. De site zelf heeft geen bundelbare component-entry.
- De repo heeft geen React; converter-deps (react, react-dom, esbuild, ts-morph, @types/react, playwright@1.60.0) staan in `.ds-sync/` — geef `--node-modules ./.ds-sync/node_modules` door, NIET het repo-node_modules.
- Playwright: lokale chromium-cache is build 1223 → playwright **1.60.0** (nieuwere cache vereist mogelijk een andere versie; check `~/Library/Caches/ms-playwright`).
- Figtree-fonts komen uit `~/Documents/Cello-business/huisstijl/` en zijn gekopieerd naar `.design-sync/brand/fonts/` (extraFonts is workspace-bounded). Bij nieuwe gewichten: opnieuw kopiëren én `.design-sync/brand/fonts.css` bijwerken.
- `logo.md` staat bewust op repo-root: emitGuidelines behoudt het pad relatief aan de package-root, en een pad onder `.design-sync/` zou als verborgen (dot-)map in `guidelines/` belanden.
- `tokensGlob` werkt alleen binnen een `tokensPkg` uit node_modules — bruikbaar noch nodig hier. Logo-styling zit daarom als self-contained inline-style snippet in `logo.md`/conventions, niet als CSS-klassen.
- Er bestaat een ouder, handgemaakt project "Cello Design System" (019df9b5-b9d1-7357-91d4-4648b9d928cc) op het account — NIET het sync-doel. Dit repo synct naar "Cello Merkstijl" (90ee3977-2943-4fb9-9247-7e04b9c4e183).
- Stijlvoorkeuren van Alex verwerkt in conventions.md: B2B-toon, geen em dashes, rustige/statische layouts. `.eyebrow` bestaat in base.css maar is bewust niet opgenomen in de conventions-vocabulaire (Alex vermijdt eyebrow-badges).

## Re-sync risico's

- `base.css` is de bron van `_ds_bundle.css`: nieuwe klassen of tokens daar vereisen een bijgewerkte `conventions.md` (namen valideren tegen de verse build) en een re-sync.
- Het logo-SVG in `logo.md` is een kopie van de inline SVG in `index.html` — wijzigt het logo op de site, dan moet `logo.md` mee.
- `merkstijl.md` en `base.css` moeten samen wijzigen (zie CLAUDE.md); de sync shipt beide (guidelines resp. CSS).
- De render-check draaide op 0 previews (tokens-only) — er is niets visueels geverifieerd behalve validate's structurele checks; beoordeel na wijzigingen het resultaat in claude.ai/design zelf.
