/* Canvas-golfvorm die "spraak" simuleert: golven van activiteit met ademende basis. */
export class Waveform {
  constructor(canvas, reduced) {
    this.c = canvas;
    this.ctx = canvas.getContext('2d');
    this.reduced = reduced;
    this.t = reduced ? 14.2 : 0;
    this.running = false;
    this.raf = null;

    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);

    window.addEventListener('resize', this.resize);
    this.resize();

    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? this.start() : this.stop())),
      { threshold: 0.05 }
    );
    io.observe(canvas);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = this.c.getBoundingClientRect();
    if (!r.width) return;
    this.c.width = Math.round(r.width * dpr);
    this.c.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = r.width;
    this.h = r.height;
    this.draw();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  tick(now) {
    if (!this.running) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.t += dt;
    this.draw();
    this.raf = requestAnimationFrame(this.tick);
  }

  draw() {
    const { ctx, w, h, t } = this;
    if (!w) return;
    ctx.clearRect(0, 0, w, h);

    const bw = 5;
    const n = Math.max(24, Math.floor(w / 16));
    const gap = (w - n * bw) / (n + 1);

    for (let i = 0; i < n; i++) {
      const x = gap + i * (bw + gap);
      const voice = Math.max(0, Math.sin(t * 1.9 - i * 0.33)) * (0.55 + 0.45 * Math.sin(t * 0.7 + i * 0.13));
      const base = 0.12 + 0.05 * Math.sin(t * 2.2 + i * 0.55);
      const amp = Math.min(1, base + voice * 0.8 * (0.6 + 0.4 * Math.sin(i * 1.7 + t * 0.5)));
      const bh = Math.max(4, amp * h * 0.84);
      const y = (h - bh) / 2;

      // kleurverloop groen -> zacht blauw over de breedte
      const k = i / n;
      const rC = Math.round(78 + (94 - 78) * k);
      const gC = Math.round(154 + (143 - 154) * k);
      const bC = Math.round(130 + (184 - 130) * k);
      ctx.fillStyle = `rgba(${rC}, ${gC}, ${bC}, ${0.4 + 0.6 * amp})`;

      ctx.beginPath();
      ctx.roundRect(x, y, bw, bh, 3);
      ctx.fill();
    }
  }
}
