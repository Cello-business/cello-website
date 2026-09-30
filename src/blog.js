import { initSite } from './js/site.js';
import { initReveals } from './js/reveals.js';
import { initReadProgress } from './js/read-progress.js';

/* Entry voor het blogoverzicht en elk artikel. De leesbalk bestaat alleen
   op een artikel en slaat zichzelf over op het overzicht. */
const { reduced } = initSite();

initReveals(reduced);
initReadProgress();
