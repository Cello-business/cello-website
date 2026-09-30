/* De onderwerpen van de blog: de gesprekken waar onze doelgroep tegen
   opziet. Elk onderwerp heeft een icoon, dat naast het onderwerp staat en
   in het vlak verschijnt als een artikel (nog) geen eigen beeld heeft. */

export const ONDERWERPEN = [
  {
    slug: 'sales',
    label: 'Sales',
    icoon:
      '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/>',
  },
  {
    slug: 'klantendienst',
    label: 'Klantendienst',
    icoon:
      '<path d="M4.5 13a7.5 7.5 0 0 1 15 0"/><rect x="3" y="13" width="4.2" height="6.2" rx="2"/><rect x="16.8" y="13" width="4.2" height="6.2" rx="2"/><path d="M19 19.5c0 1.6-2.4 2.3-5 2.3"/>',
  },
  {
    slug: 'onboarding',
    label: 'Onboarding',
    icoon:
      '<circle cx="9" cy="7.5" r="3.8"/><path d="M2.5 20.5v-1.2a4.8 4.8 0 0 1 4.8-4.8h3.4a4.8 4.8 0 0 1 4.8 4.8v1.2M19 8.5v6M22 11.5h-6"/>',
  },
  {
    slug: 'leiderschap',
    label: 'Leiderschap',
    icoon: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  },
];

export const ONDERWERP = Object.fromEntries(ONDERWERPEN.map((o) => [o.slug, o]));

export function icoon(slug) {
  const o = ONDERWERP[slug];
  if (!o) return '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${o.icoon}</svg>`;
}
