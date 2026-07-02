export function initAccordion() {
  const acc = document.querySelector('.acc');
  if (!acc) return;
  const items = [...acc.querySelectorAll('.acc-item')];

  const setOpen = (item) => {
    items.forEach((it) => {
      const open = it === item;
      it.classList.toggle('is-open', open);
      it.querySelector('.acc-head').setAttribute('aria-expanded', String(open));
    });
  };

  items.forEach((item) => {
    item.querySelector('.acc-head').addEventListener('click', () => setOpen(item));
    item.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover) and (min-width: 900px)').matches) setOpen(item);
    });
  });
}
