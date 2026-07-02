# Cello — Merkstijl

Onze kleuren en lettertype.

## Kleuren

| Naam | Hex | Gebruik |
|------|-----|---------|
| Cello-groen | `#4E9A82` | Hoofdkleur. Knoppen, logo en accenten. |
| Zacht blauw | `#5E8FB8` | Accent. Links en labels. |
| Donkergroen | `#1E3730` | Titels, tekst en donkere vlakken. |
| Grijsgroen | `#5B6B64` | Lopende tekst en bijschriften. |
| Mint | `#E4EFE9` | Badges en kleine panelen. |
| Crème | `#F4F2EA` | Achtergrond voor kaarten en secties. |
| Paginagrijs | `#EAEAE6` | Achtergrond van de pagina. |

## Lettertype

**Figtree** — gratis via [Google Fonts](https://fonts.google.com/specimen/Figtree).

| Gebruik | Gewicht |
|---------|---------|
| Titels | Dik (800) |
| Tussenkoppen en labels | Halfvet (600) |
| Gewone tekst (16px) | Gewoon (400) |

## CSS-variabelen

```css
:root {
  /* Kleuren */
  --cello-groen:   #4E9A82; /* Hoofdkleur. Knoppen, logo en accenten. */
  --zacht-blauw:   #5E8FB8; /* Accent. Links en labels. */
  --donkergroen:   #1E3730; /* Titels, tekst en donkere vlakken. */
  --grijsgroen:    #5B6B64; /* Lopende tekst en bijschriften. */
  --mint:          #E4EFE9; /* Badges en kleine panelen. */
  --creme:         #F4F2EA; /* Achtergrond voor kaarten en secties. */
  --paginagrijs:   #EAEAE6; /* Achtergrond van de pagina. */

  /* Lettertype */
  --font-family: 'Figtree', sans-serif;
  --font-weight-titel: 800;
  --font-weight-tussenkop: 600;
  --font-weight-tekst: 400;
  --font-size-tekst: 16px;
}
```
