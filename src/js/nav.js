export function initNav(lenis) {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  let open = false;
  const setMenu = (v) => {
    open = v;
    burger.classList.toggle('is-open', v);
    menu.classList.toggle('is-open', v);
    burger.setAttribute('aria-expanded', String(v));
    burger.setAttribute('aria-label', v ? 'Menu sluiten' : 'Menu openen');
    menu.setAttribute('aria-hidden', String(!v));
    document.body.style.overflow = v ? 'hidden' : '';
    if (lenis) v ? lenis.stop() : lenis.start();
  };

  burger.addEventListener('click', () => setMenu(!open));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setMenu(false);
  });

  // vloeiende anker-navigatie
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        if (id === '#top') lenis.scrollTo(0, { duration: 1.3 });
        else lenis.scrollTo(target, { offset: id === '#hoe-het-werkt' ? 0 : -84, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      history.replaceState(null, '', id);
    });
  });
}
