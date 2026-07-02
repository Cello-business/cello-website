import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Over ons: vier kaarten naast elkaar, rol en bio altijd zichtbaar.
   Enige beweging: de kaarten schuiven één voor één in beeld. */
export function initTeam(reduced) {
  const cards = gsap.utils.toArray('.person');
  if (!cards.length || reduced) return;

  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 34 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.95,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.team-people', start: 'top 82%', once: true },
    }
  );
}
