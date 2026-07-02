import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

import { initNav } from './js/nav.js';
import { initHero } from './js/hero.js';
import { initSim } from './js/sim.js';
import { initReveals } from './js/reveals.js';
import { initAccordion } from './js/accordion.js';
import { initTeam } from './js/team.js';
import { Waveform } from './js/waveform.js';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
ScrollTrigger.config({ ignoreMobileResize: true });

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.115 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

initNav(lenis);
initHero(reduced);
initSim(reduced);
initReveals(reduced);
initAccordion();
initTeam(reduced);

document.querySelectorAll('[data-wave]').forEach((canvas) => new Waveform(canvas, reduced));

// magnetische knoppen (alleen desktop-muis)
if (!reduced && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.22);
      yTo((e.clientY - r.top - r.height / 2) * 0.32);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

// deep-links met hash correct positioneren (Lenis overschrijft de native sprong)
function jumpToHash(immediate) {
  if (!location.hash) return;
  let target = null;
  try {
    target = document.querySelector(location.hash);
  } catch {
    return;
  }
  if (!target) return;
  const offset = location.hash === '#hoe-het-werkt' ? 0 : -84;
  if (lenis) lenis.scrollTo(target, { offset, immediate: Boolean(immediate) });
  else target.scrollIntoView();
}

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  jumpToHash(true);
});
window.addEventListener('hashchange', () => jumpToHash(false));
