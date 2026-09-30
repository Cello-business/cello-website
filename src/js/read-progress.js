/* Artikel: dunne groene balk bovenaan die volloopt terwijl je leest.
   Loopt over de tekst zelf, niet over de hele pagina, zodat hij vol is
   wanneer je het artikel uit hebt en niet pas onderaan de footer. */
export function initReadProgress() {
  const bar = document.querySelector('[data-read-progress]');
  const body = document.querySelector('.post-body');
  if (!bar || !body) return;

  let queued = false;
  const update = () => {
    queued = false;
    // 0 zodra de tekst bovenaan het scherm begint, 1 als het einde onderaan in beeld komt
    const r = body.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const done = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
    bar.style.transform = `scaleX(${done})`;
  };
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
