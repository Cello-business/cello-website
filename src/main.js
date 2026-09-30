import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

import { initSite } from './js/site.js';
import { initHero } from './js/hero.js';
import { initSim } from './js/sim.js';
import { initReveals } from './js/reveals.js';
import { initAccordion } from './js/accordion.js';
import { initTeam } from './js/team.js';
import { Waveform } from './js/waveform.js';

const { reduced } = initSite();

gsap.registerPlugin(DrawSVGPlugin);

initHero(reduced);
initSim(reduced);
initReveals(reduced);
initAccordion();
initTeam(reduced);

document.querySelectorAll('[data-wave]').forEach((canvas) => new Waveform(canvas, reduced));
