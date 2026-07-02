import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const RING = 207.3; // omtrek score-ring (2 * pi * 33)
const SCORE = 78;

export function initSim(reduced) {
  const sim = document.querySelector('.sim');
  if (!sim) return;

  const scoreEl = sim.querySelector('[data-count-to]');
  const ring = sim.querySelector('[data-ring]');
  const mm = gsap.matchMedia();

  /* ── Desktop: gepinde, gescrubde simulatie ── */
  mm.add('(min-width: 900px)', () => {
    if (reduced) {
      showStatic(sim, scoreEl, ring);
      return;
    }

    const steps = gsap.utils.toArray('.sim-step');
    gsap.set(steps[0], { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sim,
        start: 'top top',
        end: '+=3400',
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
      },
    });

    // fase 1: scenario wordt gekozen (groene rand + rest dimt)
    tl.to('.pick-1', { scale: 1.03, boxShadow: 'inset 0 0 0 2px rgba(78, 154, 130, 0.95)', duration: 0.4 }, 0.3)
      .to(['.pick-2', '.pick-3'], { opacity: 0.38, scale: 0.985, duration: 0.4 }, 0.35)

      // overgang fase 1 -> 2
      .to('.stage-picker', { autoAlpha: 0, y: -46, duration: 0.5 }, 1.1)
      .to(steps[0], { opacity: 0.34, duration: 0.4 }, 1.1)
      .to(steps[1], { opacity: 1, duration: 0.4 }, 1.2)
      .fromTo('.stage-call', { autoAlpha: 0, y: 64 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 1.35);

    // het gesprek verschijnt zin per zin
    gsap.utils.toArray('[data-bubble]').forEach((b, i) => {
      tl.fromTo(
        b,
        { autoAlpha: 0, y: 26, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' },
        1.8 + i * 0.5
      );
    });

    // overgang fase 2 -> 3 (gesprek eerst volledig weg, dan pas het rapport)
    tl.to('.stage-call', { autoAlpha: 0, y: -46, scale: 0.96, duration: 0.5 }, 4.55)
      .to(steps[1], { opacity: 0.34, duration: 0.4 }, 4.55)
      .to(steps[2], { opacity: 1, duration: 0.4 }, 4.9)
      .fromTo('.stage-report', { autoAlpha: 0, y: 72 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 5.15);

    // het rapport vult zich
    const counter = { v: 0 };
    tl.to(ring, { strokeDashoffset: RING * (1 - SCORE / 100), duration: 1.1, ease: 'power2.out' }, 5.6).to(
      counter,
      {
        v: SCORE,
        duration: 1.1,
        ease: 'power2.out',
        onUpdate: () => (scoreEl.textContent = Math.round(counter.v)),
      },
      5.6
    );

    gsap.utils.toArray('.rbar-fill').forEach((bar, i) => {
      tl.to(bar, { scaleX: parseFloat(bar.dataset.bar) / 100, duration: 0.7, ease: 'power3.out' }, 5.7 + i * 0.12);
    });

    tl.fromTo(
      '[data-chip]',
      { autoAlpha: 0, y: 16, scale: 0.9 },
      { autoAlpha: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.4, ease: 'back.out(1.8)' },
      6.25
    )
      // rustpunt op het einde van de pin
      .to({}, { duration: 0.6 });

    // voortgangslijn over de volledige tijdlijn
    tl.to('[data-progress]', { scaleY: 1, ease: 'none', duration: tl.duration() }, 0);
  });

  /* ── Mobiel: gestapelde kaarten, eindtoestanden via CSS ── */
  mm.add('(max-width: 899px)', () => {
    if (reduced) {
      if (scoreEl) scoreEl.textContent = String(SCORE);
      return;
    }

    gsap.utils.toArray('.sim-stage').forEach((stageEl) => {
      gsap.fromTo(
        stageEl,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: stageEl, start: 'top 86%', once: true },
        }
      );
    });

    if (scoreEl) {
      ScrollTrigger.create({
        trigger: '.stage-report',
        start: 'top 82%',
        once: true,
        onEnter: () => {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: SCORE,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => (scoreEl.textContent = Math.round(counter.v)),
          });
        },
      });
    }
  });
}

/* Reduced motion op desktop: alles statisch en volledig zichtbaar tonen. */
function showStatic(sim, scoreEl, ring) {
  gsap.set('.sim-stage', { position: 'relative', inset: 'auto', autoAlpha: 1, marginBottom: '2.2rem' });
  gsap.set('.sim-step', { opacity: 1 });
  gsap.set('[data-progress]', { scaleY: 1 });
  gsap.set('.pick-1', { boxShadow: 'inset 0 0 0 2px rgba(78, 154, 130, 0.95)' });
  if (ring) gsap.set(ring, { strokeDashoffset: RING * (1 - SCORE / 100) });
  if (scoreEl) scoreEl.textContent = String(SCORE);
  gsap.utils.toArray('.rbar-fill').forEach((bar) => {
    gsap.set(bar, { scaleX: parseFloat(bar.dataset.bar) / 100 });
  });
}
