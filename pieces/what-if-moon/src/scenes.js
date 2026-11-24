// =====================================================================
//  SCENES — world coordinates 1920x1080 (16:9). Animated with TT / ev / popS; E0 = the era's start.
//  Shared props first, then one function per scene.
// =====================================================================
function stars(key, n, bb, k = 1) {
  const R = RNG('stars', key);
  for (let i = 0; i < n; i++) {
    const x = R.r(bb[0], bb[2]), y = R.r(bb[1], bb[3]), s = R.r(3, 9) * k, tw = (B + i * 3) % 9 < 2 ? 0.55 : 1;
    sparkle(x, y, s * tw, i % 5 ? '#fff8dc' : '#cfe2ff');
  }
}
function moonDisc(x, y, r, key = 'moon') {
  cut(ellipsePts(x, y, r, r, 0, 48), MOONC, { key, crayon: '#e0d1a0', crAl: 0.35, sb: 22, shc: 'rgba(250,240,200,0.35)', sx: 0, sy: 0 });
  [[-0.35, -0.2, 0.22], [0.3, 0.25, 0.16], [0.05, 0.45, 0.1], [0.4, -0.35, 0.09]].forEach(([dx, dy, rr], i) =>
    cut(ellipsePts(x + dx * r, y + dy * r, rr * r, rr * r * 0.9, 0, 18), '#e4d6a8', { key: key + 'c' + i, shadow: false, tear: 0.4 }));
}
function emptyMoon(x, y, r, key = 'ghost') {   // where the Moon was: a dashed pencil ring
  for (let i = 0; i < 16; i++) { if (i % 2) continue; const a0 = i / 16 * TAU, a1 = (i + 1) / 16 * TAU; ink(arcPts(x, y, r, a0, a1, 6), { w: 4, color: 'rgba(246,236,200,0.55)', amt: 0.4, key: key + i }); }
}
function arrow(x1, y1, x2, y2, w, c, key) {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = w * 3.2;
  cut(capsulePts(x1, y1, x2 - Math.cos(a) * hl * 0.6, y2 - Math.sin(a) * hl * 0.6, w, 4), c, { key: key + 's', sb: 6 });
  cut([[x2, y2], [x2 - Math.cos(a - 0.5) * hl, y2 - Math.sin(a - 0.5) * hl], [x2 - Math.cos(a + 0.5) * hl, y2 - Math.sin(a + 0.5) * hl]], c, { key: key + 'h', sb: 6 });
}
function earth(x, y, r, key = 'earth') {
  cut(ellipsePts(x, y, r, r, 0, 60), PAL.blue, { key, crayon: '#3b5c9e', crAl: 0.35, pat: pat.stripes('rgba(255,255,255,0.07)', 4, 22, 0.5) });
  const land = [[[-0.5, -0.45], [-0.1, -0.6], [0.15, -0.35], [-0.05, -0.05], [-0.35, 0.05], [-0.6, -0.15]], [[0.15, 0.05], [0.55, -0.1], [0.65, 0.25], [0.35, 0.6], [0.1, 0.4]], [[-0.55, 0.35], [-0.25, 0.3], [-0.2, 0.55], [-0.45, 0.62]]];
  land.forEach((L, i) => cut(L.map(([u, v]) => [x + u * r, y + v * r]), i === 1 ? PAL.green : PAL.greenD, { key: key + 'l' + i, sb: 5, sy: 3, crayon: '#2f6b3a', crAl: 0.3 }));
  [[-0.2, -0.75, 0.3], [0.45, 0.45, 0.25]].forEach(([u, v, s], i) => cut(ellipsePts(x + u * r + Math.sin(TT * 0.6 + i) * 6, y + v * r, s * r, s * r * 0.28, 0, 16), '#ffffff', { key: key + 'cl' + i, sb: 4 }));
}
function crab(x, y, s, key = 'crab') {
  const lift = (B % 6 < 3) ? 0 : -4 * s;
  [-1, 1].forEach((d) => { for (let i = 0; i < 3; i++) ink([[x + d * 30 * s, y + 10 * s], [x + d * (62 + i * 6) * s, y + (24 + i * 10) * s]], { w: 5 * s, color: '#b8505e', amt: 0.3, key: key + 'lg' + d + i }); });
  cut(ellipsePts(x - 70 * s, y - 30 * s + lift, 22 * s, 16 * s, -0.5, 14), '#d86a7a', { key: key + 'cl', sb: 4 });
  cut(ellipsePts(x + 70 * s, y - 30 * s, 22 * s, 16 * s, 0.5, 14), '#d86a7a', { key: key + 'cr', sb: 4 });
  cut(ellipsePts(x, y, 52 * s, 32 * s, 0, 24), '#d86a7a', { key: key + 'b', crayon: '#b8505e', crAl: 0.3 });
  face(x, y - 2 * s, 0.7 * s, 'smile');
}
function boat(x, y, s, key = 'boat') {
  const bob = Math.sin(TT * 2.2) * 5 * s;
  cut([[x - 90 * s, y + bob], [x + 90 * s, y + bob], [x + 60 * s, y + 40 * s + bob], [x - 60 * s, y + 40 * s + bob]], PAL.wood, { key: key + 'h', pat: pat.grainWood('rgba(120,60,20,0.2)') });
  ink([[x, y + bob], [x, y - 130 * s + bob]], { w: 5 * s, color: PAL.ink, amt: 0.3, key: key + 'm' });
  cut([[x + 4 * s, y - 125 * s + bob], [x + 80 * s, y - 20 * s + bob], [x + 4 * s, y - 20 * s + bob]], PAL.paper, { key: key + 's', pat: pat.stripes('rgba(76,111,181,0.35)', 8, 26) });
  const lit = (B % 11) < 9;
  cut(rect(x - 50 * s, y - 34 * s + bob, 18 * s, 26 * s, 3), lit ? PAL.yellow : PAL.mustard, { key: key + 'lamp', sb: lit ? 18 : 6, shc: lit ? 'rgba(246,207,85,0.8)' : undefined, sx: 0, sy: 0 });
}
function fish(x, y, s, c, dir, key) {
  const sw = Math.sin(TT * 5 + x) * 0.15;
  ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
  cut([[-40 * s, 0], [-78 * s, -26 * s * (1 + sw)], [-78 * s, 26 * s * (1 - sw)]], c, { key: key + 't', sb: 4 });
  cut(ellipsePts(0, 0, 50 * s, 28 * s, 0, 20), c, { key: key + 'b', pat: pat.stripes('rgba(255,255,255,0.25)', 6, 22) });
  dot(26 * s, -6 * s, 6 * s); dot(28 * s, -8 * s, 2 * s, '#fff');
  ctx.restore();
}
function bubbles(x, y, n, key) {
  for (let i = 0; i < n; i++) { const R = RNG('bub', key, i), p = mod(TT * 0.25 + R.f(), 1); const bx = x + R.n(30) + Math.sin(TT * 3 + i) * 8, by = y - p * 420, r = R.r(5, 12);
    ctx.strokeStyle = 'rgba(220,245,255,0.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by, r, 0, TAU); ctx.stroke(); }
}

// ---- 1. MIDNIGHT: the beach, the Moon over the sea
function sMidnight() {
  cut(rect(-30, -30, W + 60, H + 60, 0), PAL.night, { key: 'skyA', shadow: false, tear: 0, shade: false, pat: pat.dots('rgba(255,230,180,0.06)', 3, 60) });
  stars('A', 70, [0, 0, W, 520]);
  moonDisc(1450, 230, 115, 'moonA');
  // the cliff, the village, the lighthouse beam
  cut([[-40, 600], [-40, 330], [150, 300], [380, 360], [560, 400], [700, 600]], '#28335c', { key: 'cliff', pat: pat.stripes('rgba(255,255,255,0.05)', 3, 18, 0.4) });
  [[60, 250, PAL.brick], [190, 225, PAL.teal], [320, 280, PAL.purple]].forEach(([x, y, c], i) => {
    cut(rect(x, y, 110, 90, 3), c, { key: 'hs' + i });
    cut([[x - 12, y + 4], [x + 55, y - 50], [x + 122, y + 4]], PAL.woodD, { key: 'rf' + i });
    const lit = (B + i * 5) % 23 > 2;
    cut(rect(x + 20, y + 25, 28, 30, 2), lit ? PAL.yellow : '#3b4170', { key: 'wn' + i, shadow: false });
    cut(rect(x + 62, y + 25, 28, 30, 2), PAL.yellow, { key: 'wm' + i, shadow: false });
  });
  const la = Math.sin(TT * 0.9) * 0.6;
  ctx.save(); ctx.globalAlpha = 0.22; ctx.fillStyle = '#fff3c4'; ctx.beginPath(); ctx.moveTo(520, 215); ctx.lineTo(520 + Math.cos(la - 0.08) * 900, 215 + Math.sin(la - 0.08) * 900 * 0.25); ctx.lineTo(520 + Math.cos(la + 0.08) * 900, 215 + Math.sin(la + 0.08) * 900 * 0.25); ctx.closePath(); ctx.fill(); ctx.restore();
  cut(rect(495, 230, 50, 160, 6), PAL.paper, { key: 'lh', pat: pat.stripes('rgba(200,60,60,0.75)', 26, 52, Math.PI / 2) });
  cut(rect(488, 195, 64, 40, 4), PAL.yellow, { key: 'lhl', sb: 22, shc: 'rgba(246,207,85,0.8)', sx: 0, sy: 0 });
  // the sea, the Moon's path on it
  cut([[-40, 560], [W + 40, 540], [W + 40, 900], [-40, 900]], '#2c4a86', { key: 'sea', sy: -4, pat: pat.stripes('rgba(255,255,255,0.07)', 3, 24, Math.PI / 2) });
  for (let i = 0; i < 9; i++) { const y = 575 + i * 32, w = 160 - i * 6 + Math.sin(TT * 3 + i) * 18; cut(rect(1450 - w / 2 + Math.sin(TT * 2 + i * 1.7) * 20, y, w, 9, 4), MOONC, { key: 'glint' + i, shadow: false, grain: false, shade: false, tear: 0.6 }); }
  boat(1080, 640, 0.9, 'boatA');
  for (let i = 0; i < 6; i++) { const x = mod(i * 330 + TT * 40, W + 200) - 100; ink(arcPts(x, 800 + (i % 3) * 25, 34, Math.PI * 1.1, Math.PI * 1.9, 8), { w: 4, color: 'rgba(255,255,255,0.45)', amt: 0.4, key: 'wave' + i }); }
  // the beach
  cut([[-40, 860], [500, 830], [1100, 850], [W + 40, 820], [W + 40, H + 40], [-40, H + 40]], '#e0bf84', { key: 'sand', sy: -6, pat: pat.dots('rgba(150,100,50,0.18)', 3, 26), crayon: '#c9a46a', crAl: 0.25 });
  crab(1560, 930, 0.9, 'crabA');
  cut(ellipsePts(200, 960, 60, 22, 0.1, 18), '#a99a8c', { key: 'rock1' }); cut(ellipsePts(280, 975, 34, 16, 0, 14), '#8f8274', { key: 'rock2' });
  [[1650, 970], [1760, 1010]].forEach(([x, y], i) => cut(ellipsePts(x, y, 26, 16, 0.4 * i, 5), [PAL.pinkL, PAL.paper][i], { key: 'shell' + i, sb: 4 }));
  // the hero, looking up at the Moon
  spark(560, 790, 78, { rays: 9, mood: 'wow', key: 'hero' });
  yearTag('23:59');
  capStrip('tonight, at exactly midnight...');
}

// ---- 2. THE LAST LIGHT: moonlight crossing 384,400 km
function sLight() {
  cut(rect(-30, -30, W + 60, H + 60, 0), '#0e1230', { key: 'spaceB', shadow: false, tear: 0, shade: false, pat: pat.dots('rgba(255,230,180,0.05)', 3, 50) });
  stars('B', 110, [0, 0, W, H]);
  earth(260, 560, 250, 'earthB');
  emptyMoon(1640, 470, 95, 'ghostB');
  const p = clamp(ev(E0 + 0.4, 3.4));
  const x0 = 1545, x1 = 515, xe = lerp(x0, x1, EZ.inOut ? EZ.inOut(p) : p);
  if (p > 0) {
    cut([[x0, 455], [xe, 470], [xe, 520], [x0, 490]], MOONC, { key: 'beam', sb: 24, shc: 'rgba(250,240,200,0.6)', sx: 0, sy: 0, grain: 0.6 });
    sparkle(xe, 495, 26 + (B % 2) * 6, '#fffbe8');
  }
  // the ruler and the counter
  ink([[515, 700], [1545, 700]], { w: 4, color: 'rgba(246,236,200,0.6)', amt: 0.5, key: 'rul' });
  ink([[515, 680], [515, 720]], { w: 4, color: 'rgba(246,236,200,0.6)', key: 'rl' }); ink([[1545, 680], [1545, 720]], { w: 4, color: 'rgba(246,236,200,0.6)', key: 'rr' });
  tag('384,400 km', 1030, 760, 46, { rot: 0.02, tape: false, fill: PAL.cream });
  tag((p * 1.3).toFixed(1) + ' s', 1030, 330, 90, { rot: -0.03, fill: PAL.paper });
  // background life: a satellite, a comet
  const sx = 700 + Math.sin(TT * 0.4) * 30;
  cut(rect(sx - 20, 150, 40, 30, 3), PAL.grey, { key: 'sat' }); cut(rect(sx - 90, 155, 60, 20, 2), PAL.blue, { key: 'satL', pat: pat.lines('rgba(255,255,255,0.4)', 7) }); cut(rect(sx + 30, 155, 60, 20, 2), PAL.blue, { key: 'satR', pat: pat.lines('rgba(255,255,255,0.4)', 7) });
  if (B % 8 < 4) dot(sx, 145, 6, '#ff6b6b');
  const cx = 1500 - mod(TT * 60, 400);
  cut(capsulePts(cx, 900, cx + 160, 860, 14), 'rgba(207,226,238,0.6)', { key: 'tail', shadow: false, grain: false }); dot(cx, 900, 11, '#e8f4ff');
  spark(470, 330, 52, { rays: 9, mood: 'focus', key: 'hero' });
  yearTag('00:00:01');
  capStrip("the last moonlight is still on its way");
}

// ---- 3. THE REEF: the moonlight clock stops
function sReef() {
  cut(rect(-30, -30, W + 60, H + 60, 0), '#1d4f63', { key: 'waterC', shadow: false, tear: 0, shade: false, pat: pat.stripes('rgba(160,230,230,0.05)', 70, 260, 0.35) });
  cut([[-40, 860], [600, 830], [1300, 870], [W + 40, 840], [W + 40, H + 40], [-40, H + 40]], '#c9b07a', { key: 'floor', sy: -5, pat: pat.dots('rgba(90,60,30,0.15)', 3, 22) });
  // seaweed
  for (let i = 0; i < 5; i++) { const x = 120 + i * 420, P = []; for (let k = 0; k <= 12; k++) P.push([x + Math.sin(k * 0.6 + TT * 1.6 + i) * 18, 880 - k * 26]); ink(P, { w: 16, color: PAL.greenD, amt: 0.6, key: 'kelp' + i }); }
  // corals with faces, waiting
  const branch = (x, y, s, c, key) => { [[0, 0, -10, -200], [-10, -110, -90, -190], [-6, -150, 70, -240], [-10, -60, 80, -130]].forEach(([a, b, cc, d], i) => cut(capsulePts(x + a * s, y + b * s, x + cc * s, y + d * s, 36 * s, 6), c, { key: key + i, sb: 6 })); face(x - 6 * s, y - 70 * s, 0.9 * s, 'focus'); };
  branch(520, 900, 1.3, PAL.pink, 'brA'); branch(1180, 900, 1.0, PAL.purple, 'brB');
  cut(ellipsePts(860, 870, 130, 80, 0, 30), PAL.mustard, { key: 'brain', pat: pat.lines('rgba(120,70,20,0.35)', 14), crayon: '#b8862e', crAl: 0.3 }); face(860, 850, 1.1, 'smile');
  cut(ellipsePts(1700, 760, 120, 140, 0, 30), PAL.teal, { key: 'fan', pat: pat.gingham('rgba(255,255,255,0.18)', 6) }); ink([[1700, 900], [1700, 820]], { w: 12, color: PAL.teal, key: 'fanst' });
  // the clock with no hands, half in the sand
  cut(ellipsePts(1450, 900, 90, 90, 0, 36), PAL.woodD, { key: 'ck2o' }); cut(ellipsePts(1450, 900, 76, 76, 0, 36), PAL.paper, { key: 'ck2i', shadow: false });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; ink([[1450 + Math.cos(a) * 56, 900 + Math.sin(a) * 56], [1450 + Math.cos(a) * 66, 900 + Math.sin(a) * 66]], { w: 4, color: PAL.ink, key: 'ck2t' + i }); }
  handText('?', 1432, 925, 70, PAL.ink, { key: 'ckq' });
  cut([[1340, 940], [1560, 935], [1580, 1000], [1320, 1005]], '#c9b07a', { key: 'ckSand', shadow: false });
  fish(330, 400 + Math.sin(TT) * 14, 1.0, PAL.yellow, 1, 'f1');
  fish(1350 + Math.sin(TT * 0.7) * 40, 330, 0.8, PAL.mint, -1, 'f2');
  fish(1000, 520, 0.6, PAL.pinkL, 1, 'f3');
  bubbles(600, 700, 5, 'bA'); bubbles(1700, 650, 4, 'bB');
  // the hero in a diving bubble, sad
  spark(260, 650, 56, { rays: 9, mood: 'sad', key: 'hero' });
  ctx.strokeStyle = 'rgba(230,250,255,0.7)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(260, 650, 92, 0, TAU); ctx.stroke();
  ink(arcPts(260, 650, 72, Math.PI * 1.15, Math.PI * 1.45, 6), { w: 6, color: 'rgba(255,255,255,0.8)', key: 'helmHi' });
  yearTag('the reef');
  capStrip('the moonlight clock stops');
}

// ---- 4. THE TIDES: Moon 100, Sun 46
function sTides() {
  cut(rect(-30, -30, W + 60, H + 60, 0), '#0e1230', { key: 'spaceD', shadow: false, tear: 0, shade: false, pat: pat.dots('rgba(255,230,180,0.05)', 3, 50) });
  stars('D', 90, [0, 0, W, H]);
  // the Sun, off the left edge, with a face
  cut(ellipsePts(-60, 560, 300, 300, 0, 60), PAL.yellow, { key: 'sun', crayon: '#e6b23a', sb: 30, shc: 'rgba(246,207,85,0.5)', sx: 0, sy: 0 });
  face(120, 540, 1.6, 'smile');
  // the oceans' bulge, then the Earth
  const stretch = 1 + Math.sin(TT * 1.4) * 0.02;
  cut(ellipsePts(960, 560, 300 * stretch, 240, 0, 60), '#8fc3e6', { key: 'bulge', pat: pat.stripes('rgba(255,255,255,0.18)', 4, 20, Math.PI / 2) });
  earth(960, 560, 210, 'earthD');
  // the Moon
  moonDisc(1690, 560, 85, 'moonD');
  // the pulls
  arrow(1580, 560, 1300, 560, 44, MOONC, 'arM');
  arrow(330, 560, 590, 560, 20, PAL.yellow, 'arS');
  tag('Moon 100%', 1460, 440, 54, { rot: 0.03, fill: PAL.paper });
  tag('Sun 46%', 470, 440, 54, { rot: -0.03, fill: PAL.paper });
  const sx = 1300 + Math.sin(TT * 0.5) * 30;
  cut(rect(sx - 16, 180, 32, 24, 3), PAL.grey, { key: 'satD' }); cut(rect(sx - 66, 184, 46, 16, 2), PAL.blue, { key: 'satDL' }); cut(rect(sx + 20, 184, 46, 16, 2), PAL.blue, { key: 'satDR' }); if (B % 8 < 4) dot(sx, 176, 5, '#ff6b6b');
  spark(960, 318, 50, { rays: 9, mood: 'focus', key: 'hero' });
  yearTag('the tides');
  capStrip('the Sun pulls too, but less than half as hard');
}

// =====================================================================
//  HERO CANDIDATES — a channel mascot for "What if" (one gets picked, the others are dropped)
// =====================================================================
function heroBob(key, r) { return Math.sin(TT * TAU * 0.8 + key.length) * r * 0.04; }
function heroBlink(key) { return (B + key.length * 7) % 41 < 2; }
// A. OLLIE — a small round owl: night animal, big curious eyes
function owl(x, y, r, o = {}) {
  const key = o.key ?? 'owl', mood = o.mood ?? 'smile'; y += heroBob(key, r);
  const body = PAL.orange, belly = '#f8d9b0';
  cut([[x - r * 0.62, y - r * 0.55], [x - r * 0.5, y - r * 1.05], [x - r * 0.25, y - r * 0.7]], body, { key: key + 'eL', sb: 5 });
  cut([[x + r * 0.62, y - r * 0.55], [x + r * 0.5, y - r * 1.05], [x + r * 0.25, y - r * 0.7]], body, { key: key + 'eR', sb: 5 });
  cut(ellipsePts(x, y, r * 0.78, r * 0.92, 0, 40), body, { key: key + 'b', crayon: PAL.orangeD, crAl: 0.35, crPer: 30 });
  cut(ellipsePts(x, y + r * 0.35, r * 0.48, r * 0.5, 0, 30), belly, { key: key + 'bl', shadow: false, pat: (bb) => { for (let i = 0; i < 3; i++) for (let j = -1; j <= 1; j++) ink(arcPts(x + j * r * 0.2 + (i % 2) * r * 0.1, y + r * (0.2 + i * 0.17), r * 0.07, 0.2, Math.PI - 0.2, 6), { w: 2.5, color: 'rgba(196,84,46,0.6)', key: key + 'f' + i + j }); } });
  const wf = Math.sin(TT * 3) * 0.08;
  cut(rot(ellipsePts(x - r * 0.74, y + r * 0.1, r * 0.2, r * 0.45, 0, 20), x - r * 0.74, y - r * 0.2, 0.25 + wf), PAL.orangeD, { key: key + 'wL', sb: 5 });
  cut(rot(ellipsePts(x + r * 0.74, y + r * 0.1, r * 0.2, r * 0.45, 0, 20), x + r * 0.74, y - r * 0.2, -0.25 - wf), PAL.orangeD, { key: key + 'wR', sb: 5 });
  const blink = heroBlink(key) || mood === 'happy';
  [-1, 1].forEach((d) => {
    const ex = x + d * r * 0.3, ey = y - r * 0.32;
    cut(ellipsePts(ex, ey, r * 0.27, r * 0.27, 0, 24), PAL.paper, { key: key + 'er' + d, sb: 4, sy: 2 });
    if (blink) ink(arcPts(ex, ey + r * 0.03, r * 0.13, Math.PI * 1.15, Math.PI * 1.85, 8), { w: r * 0.05, color: PAL.ink, key: key + 'bk' + d });
    else { const pr = mood === 'wow' ? 0.17 : 0.14; dot(ex + (o.look ?? 0) * r * 0.06, ey, r * pr, PAL.ink); dot(ex + (o.look ?? 0) * r * 0.06 + r * 0.04, ey - r * 0.05, r * 0.045, '#fff'); }
    if (mood === 'sad') ink([[ex - d * r * 0.2, ey - r * 0.36], [ex + d * r * 0.08, ey - r * 0.28]], { w: r * 0.045, color: PAL.ink, key: key + 'brow' + d });
  });
  cut([[x - r * 0.09, y - r * 0.12], [x + r * 0.09, y - r * 0.12], [x, y + (mood === 'wow' ? 0.12 : 0.04) * r]], PAL.mustard, { key: key + 'bk', sb: 3 });
  [-1, 1].forEach((d) => cut(ellipsePts(x + d * r * 0.25, y + r * 0.9, r * 0.14, r * 0.07, 0, 12), PAL.mustard, { key: key + 'ft' + d, sb: 3 }));
}
// B. NOVA — a tiny astronaut: a round helmet, a face behind glass
function astro(x, y, r, o = {}) {
  const key = o.key ?? 'astro', mood = heroBlink(key) && o.mood !== 'happy' ? 'focus' : (o.mood ?? 'smile'); y += heroBob(key, r);
  cut(rect(x - r * 0.75, y - r * 0.2, r * 0.32, r * 0.75, r * 0.1), PAL.grey, { key: key + 'pack' });
  [-1, 1].forEach((d) => cut(capsulePts(x + d * r * 0.25, y + r * 0.7, x + d * r * 0.28, y + r * 1.02, r * 0.26, 6), PAL.paper, { key: key + 'lg' + d, sb: 4 }));
  cut(rect(x - r * 0.48, y + r * 0.05, r * 0.96, r * 0.78, r * 0.3), PAL.paper, { key: key + 'body', pat: pat.lines('rgba(120,110,130,0.18)', 18) });
  cut(rect(x - r * 0.2, y + r * 0.22, r * 0.4, r * 0.24, r * 0.05), PAL.orange, { key: key + 'pnl' });
  if (B % 8 < 4) dot(x + r * 0.1, y + r * 0.34, r * 0.04, '#ff6b6b');
  const wv = Math.sin(TT * 3) * 0.2;
  cut(capsulePts(x - r * 0.45, y + r * 0.2, x - r * 0.78, y + r * (0.55 + wv * 0.2), r * 0.24, 6), PAL.paper, { key: key + 'aL', sb: 4 });
  cut(capsulePts(x + r * 0.45, y + r * 0.2, x + r * 0.78, y - r * (0.1 + wv), r * 0.24, 6), PAL.paper, { key: key + 'aR', sb: 4 });
  cut(ellipsePts(x, y - r * 0.38, r * 0.62, r * 0.56, 0, 40), PAL.paper, { key: key + 'hm' });
  cut(ellipsePts(x, y - r * 0.36, r * 0.47, r * 0.4, 0, 36), '#1b2550', { key: key + 'vz', shadow: false });
  face(x, y - r * 0.38, r / 75, mood);
  ink(arcPts(x - r * 0.08, y - r * 0.4, r * 0.34, Math.PI * 1.1, Math.PI * 1.4, 6), { w: r * 0.06, color: 'rgba(255,255,255,0.75)', key: key + 'gl' });
  ink([[x + r * 0.35, y - r * 0.85], [x + r * 0.45, y - r * 1.1]], { w: r * 0.04, color: PAL.grey, key: key + 'ant' }); dot(x + r * 0.45, y - r * 1.12, r * 0.07, PAL.orange);
}
// C. BLIP — a small round explorer creature with one antenna and a backpack map
function blob(x, y, r, o = {}) {
  const key = o.key ?? 'blip', mood = heroBlink(key) && o.mood !== 'happy' ? 'focus' : (o.mood ?? 'smile'); y += heroBob(key, r);
  const sq = 1 + Math.sin(TT * TAU * 0.8) * 0.03;
  [-1, 1].forEach((d) => cut(ellipsePts(x + d * r * 0.35, y + r * 0.78, r * 0.2, r * 0.12, 0, 12), PAL.orangeD, { key: key + 'ft' + d, sb: 3 }));
  cut(ellipsePts(x, y, r * 0.85 * sq, r * 0.8 / sq, 0, 40), PAL.orange, { key: key + 'b', crayon: PAL.orangeD, crAl: 0.35, crPer: 30 });
  const sw = Math.sin(TT * 2.4) * r * 0.12;
  ink([[x, y - r * 0.78], [x + sw * 0.5, y - r * 1.05], [x + sw, y - r * 1.3]], { w: r * 0.06, color: PAL.ink, key: key + 'ant' });
  cut(ellipsePts(x + sw, y - r * 1.32, r * 0.11, r * 0.11, 0, 14), PAL.yellow, { key: key + 'tip', sb: 10, shc: 'rgba(246,207,85,0.7)', sx: 0, sy: 0 });
  cut(ellipsePts(x - r * 0.92, y + r * 0.1, r * 0.16, r * 0.22, 0.4, 14), PAL.orange, { key: key + 'hL', sb: 4 });
  cut(ellipsePts(x + r * 0.92, y + r * 0.05, r * 0.16, r * 0.22, -0.4, 14), PAL.orange, { key: key + 'hR', sb: 4 });
  face(x, y - r * 0.1, r / 55, mood);
  cut(rect(x - r * 0.3, y + r * 0.3, r * 0.6, r * 0.12, 3), PAL.teal, { key: key + 'belt', shadow: false });
}
function sHeroes() {
  cut(rect(-30, -30, W + 60, H + 60, 0), PAL.night, { key: 'skyH', shadow: false, tear: 0, shade: false, pat: pat.dots('rgba(255,230,180,0.06)', 3, 60) });
  stars('H', 70, [0, 0, W, 620]);
  moonDisc(1700, 170, 80, 'moonH');
  cut([[-40, 780], [700, 760], [1300, 790], [W + 40, 770], [W + 40, H + 40], [-40, H + 40]], '#e0bf84', { key: 'sandH', sy: -6, pat: pat.dots('rgba(150,100,50,0.18)', 3, 26) });
  owl(400, 620, 150, { key: 'ollie', mood: 'wow', look: 1 });
  astro(960, 600, 150, { key: 'nova', mood: 'smile' });
  blob(1520, 640, 140, { key: 'blip', mood: 'happy' });
  tag('A · Ollie the owl', 400, 900, 52, { rot: -0.02 });
  tag('B · Nova the astronaut', 960, 900, 52, { rot: 0.015 });
  tag('C · Blip the explorer', 1520, 900, 52, { rot: -0.01 });
}
