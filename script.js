/* =========================================================
   ✏️  EVERYTHING PERSONAL LIVES HERE
   ========================================================= */
const CONFIG = {
  herName: 'Nandini',
  yourName: 'Lavish',

  // Countdown target — 7 Nov 2026, 12:00 AM (India time)
  birthday: '2026-11-07T00:00:00+05:30',
  // Part 1 (Birthday Eve) shows before midnight, Part 2 (the birthday site) unlocks at 12:00 AM.
  // Preview either part any time with  ?eve  or  ?birthday  at the end of the URL.
  showEveBeforeBirthday: true,
  age: 23,

  eve: {
    photo: 'photos/eve/bouquet.jpg',
    // Her photos that rotate inside the bouquet polaroid (after the bouquet photo)
    rotate: ['05', '18', '06', '30', '40', '44', '53'].map((n) => `photos/gallery/${n}.jpg`),
    rotateEvery: 2800,
    note: 'I hope you got your\nbirthday eve thing ♡',
    peek: 'photos/eve/collage.jpg',
    strip: ['photos/gallery/14.jpg', 'photos/gallery/16.jpg', 'photos/gallery/19.jpg'],
  },

  metDate: '2021-02-04T00:00:00+05:30',

  music: 'music/song.mp3',

  story: [
    { date: '04 FEB 2021', title: 'The day we met', sub: 'an ordinary day that became everything' },
    { date: '04 MAY 2022', title: 'The day you became mine', sub: 'and forever finally had a name' },
    { date: '07 NOV 2026', title: 'Your birthday', sub: 'still falling for you, every single day' },
  ],
  storyPhoto: 'photos/gallery/27.jpg',

  letter:
`Dear Nandini,

happy birthday, my love. ever since the 4th of February 2021, my world has been softer, brighter and so much more beautiful — all because of you.

you are my calm on difficult days, my laughter on ordinary ones, and my favourite thought before I fall asleep. thank you for your kindness, your patience, your beautiful heart, and that smile that still makes mine skip.

I hope this year gives you everything you have ever wished for — and I promise to be right beside you for all of it.`,
  letterSign: 'XO, Lavish',
  letterPhoto: 'photos/gallery/18.jpg',
  letterPhotoNote: 'my favourite view!',

  // Scrapbook photos (from photos/gallery). Notes are written in red "handwriting".
  photos: [
    { src: 'photos/gallery/03.jpg', note: 'that smile. always.' },
    { src: 'photos/gallery/09.jpg', note: 'us, being us' },
    { src: 'photos/gallery/17.jpg', note: 'flowers for my flower' },
    { src: 'photos/gallery/23.jpg', note: 'life is short, laugh a lot' },
    { src: 'photos/gallery/29.jpg', note: 'sparklers & you ✦' },
    { src: 'photos/gallery/21.jpg', note: 'my favourite date' },
    { src: 'photos/gallery/25.jpg', note: 'silly us' },
    { src: 'photos/gallery/02.jpg', note: 'my safe place' },
    { src: 'photos/gallery/48.jpg', note: 'forever & always' },
  ],
  // All photos for the moving film strip: photos/gallery/01.jpg … 60.jpg
  filmCount: 60,

  // Shown like song lyrics, with "love of my life" written over them
  reasons: [
    ['Baby, you are the love of my life', 'the calm in all my noise', 'the reason I believe in forever'],
    ['I love the way you laugh at my jokes', 'even the terrible ones', 'especially the terrible ones'],
    ['I love how you care for everyone', 'how you make ordinary days feel like magic', 'how you turn every place into home'],
    ['I love our late-night conversations', 'about everything and nothing', 'and how time disappears with you'],
    ['I love that you believe in me', 'even on the days I don’t', 'you are stronger than you will ever know'],
    ['and I love you', 'simply because you are you', 'today, tomorrow, always'],
  ],

  candles: 5,

  // Her real gifts — each one is a ticket she slides open
  gifts: [
    { title: 'Something to keep', text: 'Describe your first gift here — maybe a hint of where to find it.', when: '07.11.2026', where: 'look under your pillow' },
    { title: 'Something to wear', text: 'Describe your second gift here.', when: '07.11.2026', where: 'ask me for it' },
    { title: 'A night for us', text: 'Dinner, just the two of us. Dress code: beautiful (you already are).', when: '07.11.2026 · 8 PM', where: 'a surprise' },
  ],

  secret: 'psst… I fall in love with you a little more every single day.',

  finale: 'I love you more than all the stars in the sky.<br>Happy birthday, my forever.<br><span class="sig">Lavish</span>',
};

/* ========================================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (a, b) => Math.random() * (b - a) + a;
const pad = (n) => String(n).padStart(2, '0');
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

$$('.her-name').forEach((el) => (el.textContent = CONFIG.herName));
$$('.his-name').forEach((el) => (el.textContent = CONFIG.yourName));
$$('.her-name-lower').forEach((el) => (el.textContent = CONFIG.herName.toLowerCase()));
$$('.her-initial').forEach((el) => (el.textContent = CONFIG.herName[0]));
$$('.his-initial').forEach((el) => (el.textContent = CONFIG.yourName[0]));
$$('.her-initial-pair').forEach((el) => (el.textContent = `${CONFIG.herName[0]} & ${CONFIG.yourName[0]}`));
document.title = `For ${CONFIG.herName}`;

$$('.paper').forEach((sec) => {
  sec.insertAdjacentHTML('afterbegin', '<svg class="paper-svg" aria-hidden="true"><rect width="100%" height="100%" filter="url(#paperF)" /></svg>');
});

function fitCanvas(c) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
}

function loadImg(src, onOk, onFail) {
  const img = new Image();
  img.onload = () => onOk(img);
  img.onerror = onFail;
  img.src = src;
  return img;
}

/* ---------------- Lightbox ---------------- */
const lb = $('#lightbox');
let lbList = [], lbIndex = 0;
function openLightboxList(list, i) {
  lbList = list;
  lbIndex = Math.max(0, i);
  $('#lbImg').src = lbList[lbIndex].src;
  $('#lbCaption').textContent = lbList[lbIndex].note || '';
  lb.classList.add('show');
}
function stepLightbox(dir) {
  if (!lbList.length) return;
  openLightboxList(lbList, (lbIndex + dir + lbList.length) % lbList.length);
}

/* ---------------- FX: confetti hearts + cursor sparkle ---------------- */
const fx = $('#fx');
const fctx = fx.getContext('2d');
fitCanvas(fx);
addEventListener('resize', () => fitCanvas(fx));
let parts = [];
let fxOn = false;
const FX_COLORS = ['#a5121f', '#d4313f', '#f2e8d9', '#f4d3d4', '#caa66a', '#ffffff', '#6e0f1b'];

function heartPath(ctx, s) {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(-s, -s * 0.35, -s * 0.5, -s * 1.1, 0, -s * 0.4);
  ctx.bezierCurveTo(s * 0.5, -s * 1.1, s, -s * 0.35, 0, s * 0.35);
  ctx.fill();
}

function burst(x = innerWidth / 2, y = innerHeight / 2, n = 140, spread = 12) {
  for (let i = 0; i < n; i++) {
    const a = rand(0, Math.PI * 2), v = rand(2, spread), k = Math.random();
    parts.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, g: 0.17, drag: 0.982,
      size: rand(5, 10), rot: rand(0, 6), vr: rand(-0.2, 0.2),
      color: FX_COLORS[(Math.random() * FX_COLORS.length) | 0],
      type: k < 0.4 ? 'heart' : 'paper', life: 1, decay: rand(0.004, 0.008),
    });
  }
  runFx();
}
function trail(x, y) {
  parts.push({
    x, y, vx: rand(-0.3, 0.3), vy: rand(0.2, 0.9), g: 0.01, drag: 0.99, size: rand(3, 5.5), rot: rand(-0.4, 0.4), vr: 0,
    color: Math.random() < 0.5 ? '#c4202d' : '#e9a3aa', type: 'heart', life: 1, decay: rand(0.025, 0.04),
  });
  runFx();
}
function runFx() { if (!fxOn) { fxOn = true; requestAnimationFrame(stepFx); } }
function stepFx() {
  fctx.clearRect(0, 0, innerWidth, innerHeight);
  parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 50);
  for (const p of parts) {
    p.vy += p.g; p.vx *= p.drag; p.vy *= p.drag; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= p.decay;
    fctx.save();
    fctx.translate(p.x, p.y);
    fctx.rotate(p.rot);
    fctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
    fctx.fillStyle = p.color;
    if (p.type === 'heart') heartPath(fctx, p.size);
    else { fctx.scale(1, Math.cos(p.rot * 2)); fctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66); }
    fctx.restore();
  }
  if (parts.length) requestAnimationFrame(stepFx);
  else { fxOn = false; fctx.clearRect(0, 0, innerWidth, innerHeight); }
}
if (matchMedia('(pointer: fine)').matches) {
  let last = 0;
  addEventListener('pointermove', (e) => {
    const t = performance.now();
    if (t - last > 45) { last = t; trail(e.clientX, e.clientY); }
  });
}

/* ---------------- Music ---------------- */
const audio = $('#bgMusic');
const musicBtn = $('#musicBtn');
let musicOk = true;
audio.src = CONFIG.music;
audio.addEventListener('error', () => { musicOk = false; musicBtn.classList.add('hidden'); });
function startMusic() {
  if (!musicOk) return;
  audio.volume = 0;
  audio.play().then(() => {
    musicBtn.classList.remove('hidden');
    musicBtn.classList.add('playing');
    const iv = setInterval(() => { audio.volume = Math.min(0.6, audio.volume + 0.03); if (audio.volume >= 0.6) clearInterval(iv); }, 120);
  }).catch(() => musicBtn.classList.remove('hidden'));
}
musicBtn.addEventListener('click', () => {
  if (audio.paused) { audio.play(); musicBtn.classList.add('playing'); }
  else { audio.pause(); musicBtn.classList.remove('playing'); }
});

/* ---------------- Countdown (eve + birthday section) ---------------- */
const target = new Date(CONFIG.birthday).getTime();
const eve = $('#eve');
const params = new URLSearchParams(location.search);
const showEve = params.has('eve') || (!params.has('birthday') && CONFIG.showEveBeforeBirthday && Date.now() < target);
$('#bdayLine').textContent = new Date(target)
  .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })
  .toUpperCase().replace(/ /g, ' · ') + ' — 12:00 AM';

function setNum(el, v) {
  if (el.textContent === v) return;
  el.textContent = v;
  el.classList.remove('tick');
  void el.offsetWidth;
  el.classList.add('tick');
}
let cdDone = null;
function tickCountdown() {
  const diff = target - Date.now();
  const done = diff <= 0;
  if (done !== cdDone) {
    $$('[data-cd-wrap]').forEach((w) => w.classList.toggle('done', done));
    if (done && cdDone === false) celebrateBirthday();
    cdDone = done;
  }
  if (done) return;
  let s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  $$('[data-cd="d"]').forEach((el) => setNum(el, pad(d)));
  $('#cdcDays').classList.toggle('hidden', d === 0);
  $$('[data-cd="h"]').forEach((el) => setNum(el, pad(h)));
  $$('[data-cd="m"]').forEach((el) => setNum(el, pad(m)));
  $$('[data-cd="s"]').forEach((el) => setNum(el, pad(s)));
}
function celebrateBirthday() {
  burst(innerWidth / 2, innerHeight * 0.4, 260, 15);
  setTimeout(() => burst(innerWidth * 0.2, innerHeight * 0.3, 120), 400);
  setTimeout(() => burst(innerWidth * 0.8, innerHeight * 0.3, 120), 800);
  if (showEve) $('.sheet-cd').scrollIntoView({ behavior: 'smooth', block: 'center' });
}
tickCountdown();
setInterval(tickCountdown, 1000);

/* ---------------- Part 1: Birthday Eve ---------------- */
if (showEve) {
  eve.classList.remove('hidden');
  $('#eveAge').innerHTML = [...String(CONFIG.age)].map((c) => `<span>${c}</span>`).join('');
  $('#eveNote').innerHTML = CONFIG.eve.note.split('\n').map((l) => l.replace(/[<>&]/g, '')).join('<br>');
  $('#eveDate').textContent = new Date(target).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
  startPolaroidRotation();
  buildDiscoBall();
  paintDiscoStickers();
  loadImg(CONFIG.eve.peek, (img) => $('#evePrint').appendChild(img), () => $('#evePrint').classList.add('hidden'));
  CONFIG.eve.strip.forEach((src) => loadImg(src, (img) => {
    const f = document.createElement('figure');
    f.appendChild(img);
    $('#eveStrip').appendChild(f);
  }, () => {}));
}
function startPolaroidRotation() {
  const rot = $('#eveRot');
  const dots = $('#eveDots');
  const srcs = [CONFIG.eve.photo, ...CONFIG.eve.rotate];
  const imgs = srcs.map((src, i) => {
    const img = new Image();
    img.src = src;
    img.alt = '';
    if (i === 0) img.className = 'on';
    rot.appendChild(img);
    dots.insertAdjacentHTML('beforeend', `<i class="${i === 0 ? 'on' : ''}"></i>`);
    return img;
  });
  let cur = 0;
  const show = (n) => {
    imgs[cur].classList.remove('on');
    dots.children[cur].classList.remove('on');
    cur = (n + imgs.length) % imgs.length;
    imgs[cur].classList.add('on');
    dots.children[cur].classList.add('on');
    rot.classList.remove('flash');
    void rot.offsetWidth;
    rot.classList.add('flash');
  };
  let timer = setInterval(() => show(cur + 1), CONFIG.eve.rotateEvery);
  $('#evePolaroid').addEventListener('click', () => {
    clearInterval(timer);
    show(cur + 1);
    timer = setInterval(() => show(cur + 1), CONFIG.eve.rotateEvery);
  });
}

/* ---- 3D disco ball made of every photo (drawn on one canvas so phones stay smooth) ---- */
function buildDiscoBall() {
  const stage = $('#discoStage');
  const disco = $('#disco');
  const cv = $('#discoBall');
  const ctx = cv.getContext('2d');
  const N = CONFIG.filmCount;
  const SPR = 64;
  const gray = new Array(N), color = new Array(N);

  // Pre-bake small grayscale + colour sprites once instead of filtering every frame
  Array.from({ length: N }, (_, i) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(img.naturalWidth, img.naturalHeight);
      const sx = (img.naturalWidth - s) / 2, sy = (img.naturalHeight - s) / 2;
      const c = document.createElement('canvas');
      c.width = c.height = SPR;
      c.getContext('2d').drawImage(img, sx, sy, s, s, 0, 0, SPR, SPR);
      color[i] = c;
      const g = document.createElement('canvas');
      g.width = g.height = SPR;
      const gx = g.getContext('2d');
      gx.drawImage(c, 0, 0);
      try {
        const d = gx.getImageData(0, 0, SPR, SPR);
        const p = d.data;
        for (let k = 0; k < p.length; k += 4) {
          const v = Math.max(0, Math.min(255, (0.2126 * p[k] + 0.7152 * p[k + 1] + 0.0722 * p[k + 2] - 128) * 1.25 + 128));
          p[k] = p[k + 1] = p[k + 2] = v;
        }
        gx.putImageData(d, 0, 0);
      } catch (_) { /* tainted canvas (file://) — fall back to colour */ }
      gray[i] = g;
    };
    img.src = `photos/thumbs/${pad(i + 1)}.jpg`;
  });

  let R = 150, W = 300, dpr = 1, tiles = [];
  const PERSP = 1500;

  function build() {
    R = parseFloat(getComputedStyle(stage).getPropertyValue('--R')) || 150;
    W = R * 2;
    dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(W * dpr);
    const r = R * 0.9, step = 11, D = Math.PI / 180;
    const size = (r * step * Math.PI) / 180, ts = size * 0.92;
    tiles = [];
    let n = 0;
    for (let lat = -84; lat <= 84; lat += step) {
      const f = lat * D, cf = Math.cos(f), sf = Math.sin(f);
      const count = Math.max(3, Math.round((2 * Math.PI * r * cf) / size));
      const off = Math.random() * 360;
      for (let k = 0; k < count; k++) {
        const t = (off + (k * 360) / count) * D, ct = Math.cos(t), st = Math.sin(t);
        tiles.push({
          p: [r * cf * st, -r * sf, r * cf * ct],      // centre
          u: [ct * ts, 0, -st * ts],                    // east edge
          v: [sf * st * ts, cf * ts, sf * ct * ts],     // "down" edge (south)
          i: n % N,
          b: rand(0.75, 1.35),
          pop: -1e9,
          m: null,
        });
        n++;
      }
    }
    $('#discoCount').textContent = `${N} moments of us`;
  }
  build();
  let rw = innerWidth;
  addEventListener('resize', () => { if (innerWidth !== rw) { rw = innerWidth; build(); } });

  const glints = $('#glints');
  for (let i = 0; i < 22; i++) {
    const a = rand(0, Math.PI * 2);
    const d = rand(R * 1.15, R * 1.6);
    glints.insertAdjacentHTML('beforeend',
      `<svg class="${Math.random() < 0.4 ? 'silver' : ''}" style="left:${(Math.cos(a) * d).toFixed(0)}px;top:${(Math.sin(a) * d * 0.8).toFixed(0)}px;animation-delay:${rand(-3, 0).toFixed(2)}s"><use href="#sparkle"/></svg>`);
  }

  const popAmt = (age) => (age < 0 ? 0 : age < 1800 ? Math.min(1, age / 800) : Math.max(0, 1 - (age - 1800) / 800));

  let rotY = 0, rotX = -14, vel = 0.18, dragging = false, lastX = 0, lastY = 0, moved = 0;
  const BASE = 0.18;

  function draw(now) {
    const D = Math.PI / 180;
    const cy = Math.cos(rotY * D), sy = Math.sin(rotY * D);
    const cx = Math.cos(rotX * D), sx = Math.sin(rotX * D);
    // rotate about Y, then about X
    const rot = (a) => {
      const x1 = a[0] * cy + a[2] * sy, z1 = -a[0] * sy + a[2] * cy;
      return [x1, a[1] * cx - z1 * sx, a[1] * sx + z1 * cx];
    };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    const h = W / 2, pops = [];
    for (const t of tiles) {
      const p = rot(t.p);
      if (p[2] <= 0) { t.m = null; continue; }
      const s = (PERSP / (PERSP - p[2])) * dpr;
      const u = rot(t.u), v = rot(t.v);
      const m = t.m = [u[0] * s, u[1] * s, v[0] * s, v[1] * s, (h + p[0] * s / dpr) * dpr, (h + p[1] * s / dpr) * dpr];
      ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
      const img = gray[t.i];
      if (img) ctx.drawImage(img, -0.5, -0.5, 1, 1);
      else { ctx.fillStyle = '#888'; ctx.fillRect(-0.5, -0.5, 1, 1); }
      if (t.b < 1) { ctx.fillStyle = `rgba(0,0,0,${(1 - t.b).toFixed(2)})`; ctx.fillRect(-0.5, -0.5, 1, 1); }
      else if (t.b > 1) { ctx.fillStyle = `rgba(255,255,255,${((t.b - 1) * 0.45).toFixed(2)})`; ctx.fillRect(-0.5, -0.5, 1, 1); }
      const a = popAmt(now - t.pop);
      if (a > 0) pops.push([t, a]);
    }
    for (const [t, a] of pops) {
      const m = t.m;
      ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
      ctx.globalAlpha = a * 0.55;
      ctx.fillStyle = '#fff';
      ctx.fillRect(-0.62, -0.62, 1.24, 1.24);
      ctx.globalAlpha = a;
      if (color[t.i]) ctx.drawImage(color[t.i], -0.5, -0.5, 1, 1);
      ctx.globalAlpha = 1;
    }
  }

  let raf = 0, last = 0, visible = true;
  function frame(now) {
    const k = last ? Math.min(3, (now - last) / 16.67) : 1;
    last = now;
    if (!dragging) {
      rotY += vel * k;
      vel += (BASE - vel) * 0.02 * k;
      rotX += (-14 - rotX) * 0.03 * k;
    }
    draw(now);
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { rootMargin: '100px' }).observe(stage);
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();

  function tileAt(clientX, clientY) {
    const rc = cv.getBoundingClientRect();
    const px = (clientX - rc.left - rc.width / 2 + W / 2) * dpr;
    const py = (clientY - rc.top - rc.height / 2 + W / 2) * dpr;
    let best = null, bd = Infinity;
    for (const t of tiles) {
      const m = t.m;
      if (!m) continue;
      const dx = px - m[4], dy = py - m[5];
      const det = m[0] * m[3] - m[1] * m[2];
      const lx = (m[3] * dx - m[2] * dy) / det, ly = (-m[1] * dx + m[0] * dy) / det;
      const d = Math.max(Math.abs(lx), Math.abs(ly));
      if (d < bd) { bd = d; best = t; }
    }
    return bd <= 0.6 ? best : null;
  }

  disco.addEventListener('pointerdown', (e) => {
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
    disco.setPointerCapture(e.pointerId);
  });
  disco.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    moved += Math.abs(dx) + Math.abs(dy);
    rotY += dx * 0.5;
    rotX = Math.max(-40, Math.min(25, rotX - dy * 0.3));
    vel = dx * 0.5;
    lastX = e.clientX; lastY = e.clientY;
  });
  const end = (e) => {
    if (!dragging) return;
    dragging = false;
    if (moved < 6) {
      const hit = tileAt(e.clientX, e.clientY);
      if (hit) {
        openLightboxList(Array.from({ length: N }, (_, k) => ({ src: `photos/gallery/${pad(k + 1)}.jpg`, note: '' })), hit.i);
      } else {
        vel = 14;
      }
    }
  };
  disco.addEventListener('pointerup', end);
  disco.addEventListener('pointercancel', () => { dragging = false; });

  setInterval(() => {
    if (!raf) return;
    const now = performance.now();
    for (let k = 0; k < 4; k++) tiles[(Math.random() * tiles.length) | 0].pop = now;
  }, 450);
}

/* ---- little disco-ball stickers, drawn once on a canvas ---- */
function paintDiscoStickers() {
  const S = 200, R = 86, c = document.createElement('canvas');
  c.width = c.height = S;
  const x = c.getContext('2d');
  x.translate(S / 2, S / 2);
  x.beginPath(); x.arc(0, 0, R + 9, 0, Math.PI * 2); x.fillStyle = '#fff'; x.fill();
  x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fillStyle = '#2a2a2a'; x.fill();
  x.save(); x.clip();
  const rows = 16, cols = 22;
  for (let i = 0; i < rows; i++) {
    const la1 = -Math.PI / 2 + (i / rows) * Math.PI, la2 = -Math.PI / 2 + ((i + 1) / rows) * Math.PI;
    for (let j = 0; j < cols; j++) {
      const lo1 = -Math.PI / 2 + (j / cols) * Math.PI, lo2 = -Math.PI / 2 + ((j + 1) / cols) * Math.PI;
      const P = (la, lo) => [R * Math.cos(la) * Math.sin(lo), R * Math.sin(la)];
      const pts = [P(la1, lo1), P(la1, lo2), P(la2, lo2), P(la2, lo1)];
      const nx = Math.sin((lo1 + lo2) / 2) * Math.cos((la1 + la2) / 2), ny = Math.sin((la1 + la2) / 2);
      const light = Math.max(0, 0.55 - nx * 0.35 - ny * 0.45) + Math.random() * 0.5;
      const v = Math.round(Math.min(255, 70 + light * 190));
      x.beginPath(); pts.forEach(([px, py], k) => (k ? x.lineTo(px, py) : x.moveTo(px, py))); x.closePath();
      x.fillStyle = `rgb(${v},${v},${v})`; x.fill();
      x.strokeStyle = '#1e1e1e'; x.lineWidth = 0.8; x.stroke();
    }
  }
  const g = x.createRadialGradient(-R * 0.35, -R * 0.4, 2, -R * 0.35, -R * 0.4, R * 0.5);
  g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(-R, -R, R * 2, R * 2);
  x.restore();
  const url = c.toDataURL();
  $$('.stk-disco').forEach((img) => (img.src = url));
}

$('#openBirthday').addEventListener('click', () => {
  eve.classList.add('gone');
  burst(innerWidth / 2, innerHeight / 2, 160, 12);
  setTimeout(() => eve.classList.add('hidden'), 1500);
});

/* ---------------- Intro: envelope → curtains ---------------- */
const intro = $('#intro');
const curtains = $('#curtains');
let opened = false;
function openIntro() {
  if (opened) return;
  opened = true;
  intro.classList.add('open');
  startMusic();
  const r = $('#seal').getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, 110, 10);
  setTimeout(() => intro.classList.add('gone'), 1300);
  setTimeout(() => {
    curtains.classList.add('open');
    document.body.classList.remove('locked');
    document.body.classList.add('started');
  }, 2500);
  setTimeout(() => curtains.classList.add('gone'), 5600);
}
$('#seal').addEventListener('click', openIntro);

/* ---------------- Scroll progress ---------------- */
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });

/* ---------------- Reveal ---------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

/* ---------------- Story agenda ---------------- */
const agenda = $('#agenda');
CONFIG.story.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'ag-item';
  el.innerHTML = `<span class="ag-num">${pad(i + 1)}/</span><div><p class="ag-title"></p><p class="ag-date"></p><p class="ag-sub"></p></div>`;
  el.querySelector('.ag-title').textContent = s.title;
  el.querySelector('.ag-date').textContent = s.date;
  el.querySelector('.ag-sub').textContent = s.sub;
  agenda.appendChild(el);
});
const storyPhoto = $('#storyPhoto');
loadImg(CONFIG.storyPhoto, (img) => storyPhoto.appendChild(img), () => {
  storyPhoto.innerHTML = `<div class="ph-empty" style="color:#d9c9b8;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center">add a photo<small>${CONFIG.storyPhoto}</small></div>`;
});

const met = new Date(CONFIG.metDate).getTime();
$('#metLine').textContent = new Date(met).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');
function tickUs() {
  let s = Math.max(0, Math.floor((Date.now() - met) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  $('#uDays').textContent = d.toLocaleString('en-IN');
  $('#uHours').textContent = pad(h);
  $('#uMins').textContent = pad(m);
  $('#uSecs').textContent = pad(s);
}
tickUs();
setInterval(tickUs, 1000);

/* ---------------- LOVE band ---------------- */
$$('.love-band span').forEach((s) => (s.textContent = 'LOVE'.repeat(30)));

/* ---------------- Letter desk ---------------- */
const pol = $('#deskPolaroid');
pol.innerHTML = '<div class="ph"></div>';
loadImg(CONFIG.letterPhoto, (img) => $('.ph', pol).appendChild(img), () => {
  $('.ph', pol).innerHTML = `<div class="ph-empty" style="color:#d9c9b8">add a photo<small>${CONFIG.letterPhoto}</small></div>`;
});
$('#deskNote').textContent = CONFIG.letterPhotoNote;
$('#letterSign').textContent = CONFIG.letterSign;

function typeLetter() {
  const el = $('#letterText');
  const text = CONFIG.letter;
  let i = 0;
  (function step() {
    if (i >= text.length) { $('#caret').style.display = 'none'; $('#letterSign').classList.add('in'); return; }
    const ch = text[i++];
    el.textContent += ch;
    setTimeout(step, ch === '\n' ? 300 : /[.,!?—]/.test(ch) ? 240 : rand(22, 46));
  })();
}
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) { obs.disconnect(); setTimeout(typeLetter, 700); }
}, { threshold: 0.3 }).observe($('#letterCard'));

/* ---------------- Memories scrapbook ---------------- */
const book = $('#scrapbook');
const loaded = [];
CONFIG.photos.forEach((p, i) => {
  const mem = document.createElement('div');
  mem.className = 'mem reveal';
  mem.style.transitionDelay = `${(i % 3) * 0.12}s`;
  mem.style.setProperty('--r', `${rand(-4, 4).toFixed(1)}deg`);
  mem.innerHTML = `<span class="tape" style="--t:${rand(-8, 8).toFixed(1)}deg"></span>
    <div class="photo"><div class="ph"></div></div>
    <p class="note" style="--n:${rand(-5, 5).toFixed(1)}deg"></p>`;
  $('.note', mem).textContent = p.note;
  const ph = $('.ph', mem);
  loadImg(p.src, (img) => { img.alt = p.note; ph.appendChild(img); loaded[i] = p; }, () => {
    ph.innerHTML = `<div class="ph-empty">add a photo<small>${p.src}</small></div>`;
    mem.style.cursor = 'default';
  });
  mem.addEventListener('click', () => loaded[i] && openLightbox(i));
  book.appendChild(mem);
});

const filmSrcs = Array.from({ length: CONFIG.filmCount }, (_, i) => `photos/thumbs/${pad(i + 1)}.jpg`);
const half = Math.ceil(filmSrcs.length / 2);
[[$('#filmA'), filmSrcs.slice(0, half)], [$('#filmB'), filmSrcs.slice(half)]].forEach(([row, list]) => {
  row.innerHTML = [...list, ...list].map((src) => `<img src="${src}" alt="" loading="lazy">`).join('');
});

function openLightbox(i) {
  const list = loaded.filter(Boolean);
  openLightboxList(list, list.indexOf(loaded[i]));
}
$('#lbPrev').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
$('#lbNext').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });
lb.addEventListener('click', (e) => { if (e.target === lb || e.target.hasAttribute('data-close')) lb.classList.remove('show'); });
addEventListener('keydown', (e) => {
  if (lb.classList.contains('show') && e.key === 'ArrowLeft') stepLightbox(-1);
  if (lb.classList.contains('show') && e.key === 'ArrowRight') stepLightbox(1);
  if (e.key === 'Escape') $$('.lightbox, .modal').forEach((m) => m.classList.remove('show'));
});

/* ---------------- Love of my life ---------------- */
const lyrics = $('#lyrics');
CONFIG.reasons.forEach((stanza, i) => {
  const div = document.createElement('div');
  div.className = 'stanza';
  stanza.forEach((line, j) => {
    const p = document.createElement('p');
    p.textContent = line;
    p.style.transitionDelay = `${j * 0.15}s`;
    div.appendChild(p);
  });
  lyrics.appendChild(div);
  io.observe(div);
});
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) { obs.disconnect(); setTimeout(() => $('#lyricsScript').classList.add('in'), 900); }
}, { threshold: 0.4 }).observe($('.lyrics'));

/* ---------------- Cake ---------------- */
const candlesEl = $('#candles');
const n = CONFIG.candles;
for (let i = 0; i < n; i++) {
  const c = document.createElement('div');
  c.className = 'candle';
  c.style.left = `${160 + (i - (n - 1) / 2) * Math.min(26, 120 / Math.max(1, n - 1))}px`;
  c.innerHTML = '<div class="flame"></div>';
  c.addEventListener('click', () => blowCandle(c));
  candlesEl.appendChild(c);
}
let cakeDone = false;
function blowCandle(c) {
  if (c.classList.contains('out')) return;
  c.classList.add('out');
  const smoke = document.createElement('div');
  smoke.className = 'smoke';
  c.appendChild(smoke);
  if (!cakeDone && !$('.candle:not(.out)', candlesEl)) {
    cakeDone = true;
    stopMic();
    setTimeout(() => {
      burst(innerWidth / 2, innerHeight * 0.45, 220, 14);
      setTimeout(() => burst(innerWidth * 0.2, innerHeight * 0.35, 90), 350);
      setTimeout(() => burst(innerWidth * 0.8, innerHeight * 0.35, 90), 700);
      $('#wishMsg').textContent = 'may it all come true';
      $('#cakeHint').textContent = 'your wish is on its way ♡';
      $('.cake-actions').classList.add('hidden');
    }, 600);
  }
}
let micStream, micCtx, micRaf;
$('#micBtn').addEventListener('click', async () => {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 512;
    micCtx.createMediaStreamSource(micStream).connect(analyser);
    const data = new Uint8Array(analyser.fftSize);
    $('#micBtn').textContent = 'now, gently blow…';
    let lastBlow = 0;
    (function listen(t) {
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (const v of data) sum += ((v - 128) / 128) ** 2;
      if (Math.sqrt(sum / data.length) > 0.18 && t - lastBlow > 200) {
        lastBlow = t;
        const lit = $$('.candle:not(.out)', candlesEl);
        if (lit.length) blowCandle(lit[(Math.random() * lit.length) | 0]);
      }
      micRaf = requestAnimationFrame(listen);
    })(0);
  } catch {
    $('#micBtn').textContent = 'tap the flames instead';
  }
});
function stopMic() {
  cancelAnimationFrame(micRaf);
  micStream?.getTracks().forEach((t) => t.stop());
  micCtx?.close();
}

/* ---------------- Gift tickets ---------------- */
const tickets = $('#tickets');
CONFIG.gifts.forEach((g, i) => {
  const w = document.createElement('div');
  w.className = 'ticket-wrap reveal';
  w.innerHTML = `
    <div class="ticket">
      <div class="t-main">
        <span class="t-side-label">ADMIT ONE · NO. ${pad(i + 1)}</span>
        <p class="t-kicker">gift ${ROMAN[i] || i + 1} · for ${CONFIG.herName.toLowerCase()}</p>
        <p class="t-title"></p>
        <p class="t-text"></p>
        <div class="t-meta"><span>when: <b class="t-when"></b></span><span>where: <b class="t-where"></b></span></div>
      </div>
      <div class="t-stub">
        <span class="mono">ticket</span>
        <span class="no">${pad(i + 1)}</span>
        <div class="barcode"></div>
        <span class="hand">valid forever</span>
      </div>
    </div>
    <div class="sleeve">
      <span class="s-names">${CONFIG.herName}<br>&amp;<br>${CONFIG.yourName}</span>
      <span class="s-hint">tap to open</span>
    </div>`;
  $('.t-title', w).textContent = g.title;
  $('.t-text', w).textContent = g.text;
  $('.t-when', w).textContent = g.when;
  $('.t-where', w).textContent = g.where;
  w.addEventListener('click', () => {
    if (w.classList.contains('opened')) return;
    w.classList.add('opened');
    const r = w.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 110, 10);
  });
  tickets.appendChild(w);
});

$$('.reveal').forEach((el) => io.observe(el));

/* ---------------- Secret ---------------- */
$('#secretText').textContent = CONFIG.secret;
$('#secretBtn').addEventListener('click', () => $('#secretModal').classList.add('show'));
$('#secretModal').addEventListener('click', (e) => {
  if (e.target.id === 'secretModal' || e.target.hasAttribute('data-close')) $('#secretModal').classList.remove('show');
});

/* ---------------- Finale: heart of stars ---------------- */
const finale = $('#finale');
const hc = $('#heartCanvas');
const hctx = hc.getContext('2d');
let finaleRaf, finaleRun = 0;
const heartPt = (t) => ({
  x: 16 * Math.sin(t) ** 3,
  y: -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
});

function startFinale() {
  const run = ++finaleRun;
  cancelAnimationFrame(finaleRaf);
  fitCanvas(hc);
  const W = innerWidth, H = innerHeight;
  const scale = Math.min(W, H) / 50;
  const cx = W / 2, cy = H * 0.3;
  const sky = Array.from({ length: 180 }, () => ({ x: rand(0, W), y: rand(0, H), r: rand(0.3, 1.3), p: rand(0, 6), s: rand(0.5, 2) }));
  const N = 800;
  const pts = Array.from({ length: N }, (_, i) => {
    const inner = Math.random() < 0.3 ? Math.sqrt(Math.random()) * 0.92 : 1;
    const hp = heartPt(inner < 1 ? rand(0, Math.PI * 2) : (i / N) * Math.PI * 2);
    const red = Math.random() < 0.6;
    return {
      x: rand(0, W), y: rand(H * 0.6, H * 1.2),
      tx: cx + hp.x * scale * inner, ty: cy + hp.y * scale * inner,
      r: rand(0.6, inner < 1 ? 1.6 : 2.3), p: rand(0, 6),
      color: red ? `hsl(${rand(350, 358)}, 85%, ${rand(55, 70)}%)` : `hsl(${rand(30, 40)}, 60%, ${rand(85, 92)}%)`,
      speed: rand(0.015, 0.04),
    };
  });
  const begin = performance.now();
  hctx.fillStyle = '#16040a';
  hctx.fillRect(0, 0, W, H);
  (function frame(t) {
    if (run !== finaleRun) return;
    const e = (t - begin) / 1000;
    hctx.fillStyle = 'rgba(22, 4, 10, 0.28)';
    hctx.fillRect(0, 0, W, H);
    for (const s of sky) {
      hctx.globalAlpha = 0.2 + 0.8 * Math.abs(Math.sin(e * s.s + s.p));
      hctx.fillStyle = '#fff4ea';
      hctx.beginPath(); hctx.arc(s.x, s.y, s.r, 0, 7); hctx.fill();
    }
    const beat = 1 + 0.045 * Math.max(0, Math.sin(e * 3.6)) ** 10;
    hctx.shadowBlur = 10;
    for (const p of pts) {
      p.x += (cx + (p.tx - cx) * beat - p.x) * p.speed;
      p.y += (cy + (p.ty - cy) * beat - p.y) * p.speed;
      hctx.globalAlpha = 0.55 + 0.45 * Math.sin(e * 2.4 + p.p);
      hctx.fillStyle = p.color;
      hctx.shadowColor = p.color;
      hctx.beginPath(); hctx.arc(p.x + Math.sin(e * 1.5 + p.p) * 0.8, p.y, p.r, 0, 7); hctx.fill();
    }
    hctx.shadowBlur = 0;
    hctx.globalAlpha = 1;
    finaleRaf = requestAnimationFrame(frame);
  })(begin);

  const textEl = $('#finaleText');
  textEl.innerHTML = '';
  const tokens = CONFIG.finale.split(/(<[^>]+>)/).filter(Boolean);
  let html = '', ti = 0, ci = 0;
  setTimeout(function type() {
    if (run !== finaleRun || ti >= tokens.length) return;
    const tok = tokens[ti];
    if (tok.startsWith('<')) { html += tok; ti++; ci = 0; }
    else if (ci < tok.length) html += tok[ci++];
    else { ti++; ci = 0; }
    const open = (html.match(/<span[^>]*>/g) || []).length > (html.match(/<\/span>/g) || []).length;
    textEl.innerHTML = html + (open ? '</span>' : '');
    setTimeout(type, tok.startsWith('<') ? 0 : 60);
  }, 3200);
}
$('#finalHeart').addEventListener('click', () => {
  finale.classList.add('show');
  document.body.classList.add('locked');
  startFinale();
});
$('#finaleClose').addEventListener('click', () => {
  finale.classList.remove('show');
  document.body.classList.remove('locked');
  finaleRun++;
});
