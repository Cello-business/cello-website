import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initReveals(reduced) {
  /* ── Manifest: woorden lichten op tijdens het scrollen ── */
  const scrubEl = document.querySelector('[data-scrub]');
  if (scrubEl) {
    const words = scrubEl.textContent.trim().split(/\s+/);
    scrubEl.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
    if (!reduced) {
      gsap.fromTo(
        scrubEl.querySelectorAll('.w'),
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: scrubEl, start: 'top 78%', end: 'bottom 52%', scrub: true },
        }
      );
    }
  }

  if (reduced) {
    finalizeStats();
    return;
  }

  /* ── Generieke scroll-reveals ── */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 38 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
      }
    );
  });

  /* ── Tellers (buiten de simulatie, die stuurt zijn eigen teller) ── */
  gsap.utils.toArray('[data-count-to]').forEach((el) => {
    if (el.closest('.sim')) return;
    const to = parseFloat(el.dataset.countTo);
    const from = parseFloat(el.dataset.countFrom || '0');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const obj = { v: from };
        gsap.to(obj, {
          v: to,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = Math.round(obj.v)),
        });
      },
    });
  });

  /* ── Vooruitgangsgrafiek tekent zichzelf ── */
  const line = document.querySelector('[data-line]');
  if (line) {
    const len = line.getTotalLength();
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set('.chart-area', { opacity: 0 });
    gsap.set('[data-dot]', { scale: 0, transformOrigin: 'center' });
    ScrollTrigger.create({
      trigger: '.chart',
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(line, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut' });
        gsap.to('.chart-area', { opacity: 1, duration: 0.9, delay: 1.05 });
        gsap.to('[data-dot]', { scale: 1, duration: 0.5, ease: 'back.out(2.4)', delay: 1.45 });
      },
    });
  }

}

/* Reduced motion: meteen de eindwaarden tonen. */
function finalizeStats() {
  document.querySelectorAll('[data-count-to]').forEach((el) => (el.textContent = el.dataset.countTo));
}
