import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHero(reduced) {
  const stagewrap = document.querySelector('.hero-stagewrap');
  const stage = document.querySelector('.hero-stage');
  const tilt = document.querySelector('.hero-tilt');
  const chips = gsap.utils.toArray('.float-chip');

  // tikkende gesprekstimer
  const timerEl = document.querySelector('[data-timer]');
  if (timerEl) {
    let s = 151;
    setInterval(() => {
      if (document.hidden) return;
      s += 1;
      const m = String(Math.floor(s / 60)).padStart(2, '0');
      const r = String(s % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${r}`;
    }, 1000);
  }

  if (reduced || !stage) return;

  /* ── Logo-entree: ogen poppen, de hoorn tekent zichzelf, dan één belgolf ── */
  const mark = document.querySelector('.hero-mark');
  const dots = mark ? mark.querySelectorAll('.mark-dot') : [];
  const handG = mark ? mark.querySelector('.mark-hand') : null;
  const hand = mark ? mark.querySelector('.mark-hand-path') : null;
  const ripples = mark ? mark.querySelectorAll('.mark-ripple') : [];

  function ringPulse() {
    const t = gsap.timeline();
    ripples.forEach((r, i) => {
      const at = i * 0.16;
      t.set(r, { scale: 0.55, transformOrigin: '50% 50%' }, at)
        .to(r, { opacity: 0.5, duration: 0.16, ease: 'power1.in' }, at)
        .to(r, { scale: 1.28, duration: 0.85, ease: 'power2.out' }, at)
        .to(r, { opacity: 0, duration: 0.5, ease: 'power1.out' }, at + 0.3);
    });
    if (handG) {
      t.to(handG, { rotation: 7, duration: 0.09, transformOrigin: '50% 50%' }, 0)
        .to(handG, { rotation: -5, duration: 0.11 }, 0.09)
        .to(handG, { rotation: 3, duration: 0.11 }, 0.2)
        .to(handG, { rotation: 0, duration: 0.14, ease: 'power1.out' }, 0.31);
    }
    return t;
  }

  // beginposes
  if (mark) {
    gsap.set(dots, { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(hand, { drawSVG: '0%', fillOpacity: 0, stroke: '#1e3730', strokeWidth: 14 });
  }
  gsap.set('.hero-sub', { y: 22 });
  gsap.set('.hero-cta', { y: 22 });
  gsap.set(stagewrap, { y: 90 });
  gsap.set(stage, { rotateX: 16 });
  gsap.set(chips, {
    autoAlpha: 0,
    scale: 0.55,
    z: (i, el) => (parseFloat(el.dataset.depth) || 1) * 34,
  });

  // entree
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.12 });
  if (mark) {
    tl.to(dots, { scale: 1, duration: 0.55, ease: 'back.out(2.2)', stagger: 0.13 }, 0.05)
      .to(hand, { drawSVG: '100%', duration: 0.85, ease: 'power2.inOut' }, 0.1)
      .to(hand, { fillOpacity: 1, duration: 0.4, ease: 'power1.out' }, 0.9)
      .to(hand, { strokeOpacity: 0, duration: 0.35 }, 0.95)
      .add(ringPulse(), 1.0);
  }
  tl.to('.line-inner', { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.11 }, 0.55)
    .to('.hero-sub', { autoAlpha: 1, y: 0, duration: 0.9 }, 0.85)
    .to('.hero-cta', { autoAlpha: 1, y: 0, duration: 0.9 }, 0.95)
    .to(stagewrap, { autoAlpha: 1, y: 0, duration: 1.25 }, 1.0)
    .to(stage, { rotateX: 9, duration: 1.25, ease: 'power3.out' }, 1.0)
    .to(chips, { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'back.out(1.9)', stagger: 0.12 }, 1.45)
    .call(startAmbient);

  // subtiele herhaling van de belgolf bij hover op het logo
  if (mark) {
    let pulse = null;
    mark.addEventListener('mouseenter', () => {
      if (tl.isActive() || (pulse && pulse.isActive())) return;
      pulse = ringPulse();
    });
  }

  function startAmbient() {
    // scroll: kaart richt zich op en schaalt licht bij
    gsap.to(stage, {
      rotateX: 0,
      scale: 1.02,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: { trigger: stagewrap, start: 'top 70%', end: 'top 18%', scrub: 0.6 },
    });
  }

  // 3D-tilt met de muis + parallax op de chips
  if (window.matchMedia('(pointer: fine)').matches) {
    const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3.out' });
    const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3.out' });
    const chipTos = chips.map((chip) => ({
      x: gsap.quickTo(chip, 'x', { duration: 1.1, ease: 'power3.out' }),
      y: gsap.quickTo(chip, 'y', { duration: 1.1, ease: 'power3.out' }),
      d: parseFloat(chip.dataset.depth) || 1,
    }));

    stagewrap.addEventListener('mousemove', (e) => {
      const r = stagewrap.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      rx(ny * -6.5);
      ry(nx * 8.5);
      chipTos.forEach((c) => {
        c.x(nx * 15 * c.d);
        c.y(ny * 13 * c.d);
      });
    });

    stagewrap.addEventListener('mouseleave', () => {
      rx(0);
      ry(0);
      chipTos.forEach((c) => {
        c.x(0);
        c.y(0);
      });
    });
  }
}
