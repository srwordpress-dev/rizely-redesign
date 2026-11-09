/*
  Hero animation engine — "physical meets AI".

  Two particle fields approach from opposite sides and meet; the headline sits in
  the gap between them. The tap lands, a ripple blooms, the digital profile
  emerges from it, three follow-ups fly out, and everything bends upward into the
  brand's rising arc before settling.

  No library, no image assets: both silhouettes are drawn programmatically into an
  offscreen canvas and pixel-sampled into dot clouds, so there is nothing to ship,
  nothing to wait on, and the shapes are parametric.

  Spec: workstreams/08-website/PRD-rizely-web-v4.md §6 (mission-control repo).
  Framework-free on purpose — the React wrapper is components/hero-particles.tsx.
*/

export type Pt = { x: number; y: number };

/* ---------------------------------------------------------------- timeline */

/** Phase boundaries in seconds, exactly as storyboarded with Ankush. */
export const T = {
  scatter: 0.0,
  form: 0.8,
  approach: 2.0,
  contact: 2.6,
  emerge: 3.2,
  rise: 4.5,
  settled: 6.0,
} as const;

/** The headline's protected rectangle, in canvas fractions. Particles that pass
    behind it are dimmed rather than clipped, so the composition stays continuous
    and the text stays legible. Narrow screens need a far wider band: the same
    headline wraps to four lines and fills the width. */
export type Safe = { cx: number; cy: number; w: number; h: number; dim: number };
export type Mode = "stage" | "hero";

/** The hero's text column leaves no clear air for the fields to meet behind it:
    on a phone it fills the width and nearly the full height (W-01), and on
    desktop the profile and follow-ups ended up behind the feature chips at the
    fold. So at every width the whole animation plays in its own band above the
    badge. CSS pixels from the top of the hero; components/hero.tsx reserves
    exactly `top + height` above the text at each breakpoint, so the two must
    change together. On desktop the stage is capped at 960px and centred, so the
    composition sits over the text column instead of at the screen edges. */
export const NARROW_STAGE = { top: 8, height: 170 } as const;
export const WIDE_STAGE = { top: 24, height: 260, maxWidth: 960 } as const;
const stageFor = (W: number) =>
  W < 768
    ? { top: NARROW_STAGE.top, height: NARROW_STAGE.height, width: W }
    : { top: WIDE_STAGE.top, height: WIDE_STAGE.height, width: Math.min(W, WIDE_STAGE.maxWidth) };

/* "stage" is the prototype: one headline, lots of clear air.
   "hero" is the real page: a full text column — badge, headline, subhead,
   two CTAs, microcopy — so the animation gets a band above it (stageFor). */
export const safeFor = (W: number, H: number, mode: Mode = "stage"): Safe => {
  if (mode === "hero") {
    // Everything below the stage band is text.
    const end = stageFor(W).top + stageFor(W).height;
    return { cx: 0.5, cy: (end + H) / 2 / H, w: 1.02, h: (H - end) / H, dim: 0.86 };
  }
  return W < 768
    ? // On a phone the headline wraps to four lines and fills the width, so the
      // fields cannot meet behind it. The text moves to a band at the top and
      // the whole composition drops below it (see LAYOUT).
      { cx: 0.5, cy: 0.15, w: 0.96, h: 0.28, dim: 0.84 }
    : // Sized to the actual text block (max-w-2xl, three lines), vertically
      // centred to match the hero's layout. Dimmed gently — 48px bold type on
      // near-black does not need much protecting.
      { cx: 0.5, cy: 0.5, w: 0.66, h: 0.3, dim: 0.6 };
};

/** Where each piece sits, as canvas fractions. Two layouts, one per breakpoint. */
function layoutFor(W: number, H: number, mode: Mode) {
  const narrow = W < 768;
  if (mode === "hero") {
    // The whole story plays inside the stage band: card left, agent right, the
    // tap in the middle, then card · profile · agent with the follow-ups
    // lifting off above the agent. Laid out in pixels (the band is a fixed
    // height) and converted to fractions of the canvas. Designed on the 170px
    // phone band; on desktop the vertical offsets scale with the taller band and
    // x is placed within the centred stage width.
    const st = stageFor(W);
    const k = st.height / NARROW_STAGE.height;
    const y = (px: number) => (st.top + px * k) / H;
    const x = (f: number) => ((W - st.width) / 2 + f * st.width) / W;
    const mid = NARROW_STAGE.height / 2;
    return {
      fieldY: y(mid),
      cardX: x(0.2),
      agentX: x(0.8),
      nearCardX: x(0.36),
      nearAgentX: x(0.64),
      profile: [0.5, y(mid)] as const,
      // Three-quarter size and a steep stagger, or at 320–375px the three
      // overlap into one strip.
      bubbles: [
        [x(0.68), y(26)],
        [x(0.8), y(17)],
        [x(0.92), y(8)],
      ] as const,
      bubbleScale: 0.75,
      arcY: [y(NARROW_STAGE.height - 6), y(6)] as const,
      scatterY: [y(10), y(NARROW_STAGE.height - 10)] as const,
    };
  }
  return narrow
    ? {
        fieldY: 0.47,
        cardX: 0.25,
        agentX: 0.75,
        nearCardX: 0.385,
        nearAgentX: 0.615,
        profile: [0.5, 0.76] as const,
        bubbles: [
          [0.8, 0.9],
          [0.845, 0.77],
          [0.885, 0.64],
        ] as const,
        arcY: [0.92, 0.36] as const,
        bubbleScale: 1,
        scatterY: [0.12, 0.88] as const,
      }
    : {
        fieldY: 0.47,
        cardX: 0.17,
        agentX: 0.83,
        nearCardX: 0.325,
        nearAgentX: 0.675,
        profile: [0.5, 0.63] as const,
        // Below the agent and fanning right, so the follow-ups rise through
        // clear air instead of landing inside the bubble they came from.
        bubbles: [
          [0.635, 0.86],
          [0.74, 0.8],
          [0.84, 0.73],
        ] as const,
        arcY: [0.78, 0.12] as const,
        bubbleScale: 1,
        scatterY: [0.12, 0.88] as const,
      };
}

/* ------------------------------------------------------------------ easing */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Normalised progress through [a,b], eased. */
const seg = (t: number, a: number, b: number, ease = easeInOutCubic) =>
  ease(clamp01((t - a) / (b - a)));

/* ------------------------------------------------------- shape → dot cloud */

/**
 * Draw into a throwaway canvas and sample the opaque pixels into points,
 * normalised to 0..1 within the box. Line art samples better than solid fills —
 * dots land on the edges that make a shape readable.
 */
function sample(
  w: number,
  h: number,
  gap: number,
  draw: (c: CanvasRenderingContext2D) => void,
): Pt[] {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const c = cv.getContext("2d", { willReadFrequently: true });
  if (!c) return [];
  c.strokeStyle = "#fff";
  c.fillStyle = "#fff";
  c.lineWidth = 3;
  c.lineJoin = "round";
  draw(c);

  const data = c.getImageData(0, 0, w, h).data;
  const pts: Pt[] = [];
  for (let y = 0; y < h; y += gap) {
    for (let x = 0; x < w; x += gap) {
      if (data[(y * w + x) * 4 + 3] > 110) {
        // Jitter inside the sampling cell so the cloud doesn't read as a grid.
        pts.push({
          x: (x + (Math.random() - 0.5) * gap) / w,
          y: (y + (Math.random() - 0.5) * gap) / h,
        });
      }
    }
  }
  return pts;
}

/** The PVC card: rounded rect, chip, NFC arcs, two text lines. */
function cardShape(gap: number): Pt[] {
  const w = 300;
  const h = 189; // 85.6 × 54mm, the real card ratio
  return sample(w, h, gap, (c) => {
    c.beginPath();
    c.roundRect(5, 5, w - 10, h - 10, 16);
    c.stroke();
    // chip
    c.lineWidth = 2.5;
    c.beginPath();
    c.roundRect(32, 60, 46, 34, 6);
    c.stroke();
    // NFC arcs — the tap
    c.lineWidth = 3;
    for (const r of [16, 26, 36]) {
      c.beginPath();
      c.arc(w - 54, h / 2, r, -0.75, 0.75);
      c.stroke();
    }
    // name + role lines
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(32, 128);
    c.lineTo(116, 128);
    c.moveTo(32, 148);
    c.lineTo(88, 148);
    c.stroke();
  });
}

/** The agent: a chat bubble with a tail and a typing pulse. */
function agentShape(gap: number): Pt[] {
  const w = 250;
  const h = 215;
  return sample(w, h, gap, (c) => {
    c.beginPath();
    c.roundRect(5, 5, w - 10, h - 54, 28);
    c.stroke();
    // tail
    c.beginPath();
    c.moveTo(52, h - 49);
    c.lineTo(44, h - 8);
    c.lineTo(96, h - 49);
    c.stroke();
    // typing dots
    for (const dx of [-42, 0, 42]) {
      c.beginPath();
      c.arc(w / 2 + dx, (h - 49) / 2, 9, 0, Math.PI * 2);
      c.fill();
    }
    // pulse ring around the core
    c.lineWidth = 2.5;
    c.beginPath();
    c.arc(w / 2, (h - 49) / 2, 46, 0, Math.PI * 2);
    c.stroke();
  });
}

/** The digital profile: a phone with an avatar and three rows. */
function profileShape(gap: number): Pt[] {
  const w = 182;
  const h = 320;
  return sample(w, h, gap, (c) => {
    c.beginPath();
    c.roundRect(4, 4, w - 8, h - 8, 28);
    c.stroke();
    // avatar
    c.beginPath();
    c.arc(w / 2, 86, 30, 0, Math.PI * 2);
    c.stroke();
    // rows
    c.lineWidth = 7;
    let y = 150;
    for (const len of [0.62, 0.46, 0.54, 0.38]) {
      c.beginPath();
      c.moveTo(w / 2 - (w * len) / 2, y);
      c.lineTo(w / 2 + (w * len) / 2, y);
      c.stroke();
      y += 26;
    }
    // a save-contact pill at the bottom
    c.lineWidth = 3;
    c.beginPath();
    c.roundRect(34, h - 68, w - 68, 34, 17);
    c.stroke();
  });
}

/** A follow-up message bubble. */
function bubbleShape(gap: number): Pt[] {
  const w = 104;
  const h = 72;
  return sample(w, h, gap, (c) => {
    c.lineWidth = 3;
    c.beginPath();
    c.roundRect(3, 3, w - 6, h - 22, 16);
    c.stroke();
    c.beginPath();
    c.moveTo(24, h - 19);
    c.lineTo(18, h - 3);
    c.lineTo(48, h - 19);
    c.stroke();
    c.lineWidth = 4.5;
    c.beginPath();
    c.moveTo(20, 20);
    c.lineTo(w - 24, 20);
    c.moveTo(20, 33);
    c.lineTo(w - 40, 33);
    c.stroke();
  });
}

/* --------------------------------------------------------------- particles */

/** Final role — what a particle becomes after the tap. */
type Role = 0 | 1 | 2 | 3; // 0 stay, 1 profile, 2 bubble, 3 rising trail

export type Particle = {
  // current
  x: number;
  y: number;
  // scatter → formed → approach → final
  sx: number;
  sy: number;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  fx: number;
  fy: number;
  // curve control point for the emerge/rise travel
  qx: number;
  qy: number;
  // unit vector for the contact kick
  kx: number;
  ky: number;
  role: Role;
  /** 0..1 stagger within the particle's own phase */
  lag: number;
  /** extra seconds before this particle starts its emerge move (bubble sequence) */
  hold: number;
  /** colour bucket index */
  col: number;
  /** breathe phase offset */
  wob: number;
  /** base alpha */
  alpha: number;
};

export type Scene = {
  particles: Particle[];
  /** where the two fields meet — the tap */
  contact: Pt;
  /** the headline's protected rectangle for this canvas size */
  safe: Safe;
  /** settled breathing amplitude in px — scaled with the shapes so a small
      composition does not blur into its own wobble */
  breathe: number;
};

/** Two depths of the one Rizely orange, for a cream page (DESIGN.md: one accent,
    no ink specks). Index order matters: the card side draws from 0/1 (mostly the
    deep shade), the agent side from 2/3/4 (mostly the bright one), so the two
    halves read apart while staying one family. The motion is unchanged. */
// Mostly --spark-action (4.80:1 on cream) so the drawing reads; --spark is the accent.
export const COLORS = ["#c84300", "#c84300", "#c84300", "#f05100", "#b33c00"];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Fisher-Yates. Sampled clouds come out row-major, so particles that take a
    prefix of one would otherwise fill only the top band of the shape. */
function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Place a normalised shape's points into canvas space. */
function place(
  pts: Pt[],
  cx: number,
  cy: number,
  w: number,
  h: number,
  rot = 0,
): Pt[] {
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  return pts.map((p) => {
    const dx = (p.x - 0.5) * w;
    const dy = (p.y - 0.5) * h;
    return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos };
  });
}

/**
 * Build the scene for a canvas of W×H CSS pixels. Called at mount and on resize.
 * `density` scales the particle count (1 = desktop, ~0.45 = phone).
 */
export function buildScene(
  W: number,
  H: number,
  density: number,
  mode: Mode = "stage",
): Scene {
  const gap = density >= 0.7 ? 2 : 3; // line art needs tight sampling to read
  // Uniform scale off the design size, floored so the shapes stay readable on a
  // phone instead of shrinking into confetti.
  // In the hero the band, not the canvas, sets the size: tall enough that the
  // settled profile (320 design px) fits inside it, narrow enough that card ·
  // profile · agent sit side by side without touching.
  const s =
    mode === "hero"
      ? // Desktop keeps ~30px clear above and below the shapes, off the navbar and
        // the badge; the phone band is too short to spare more than 12px.
        Math.min(stageFor(W).width / 850, (stageFor(W).height - (W < 768 ? 24 : 60)) / 320)
      : Math.max(Math.min(W / 1200, H / 620), W < 768 ? 0.46 : 0.3);

  const L = layoutFor(W, H, mode);
  const contact: Pt = { x: W * 0.5, y: H * L.fieldY };

  // --- the two fields, formed then approaching
  const cardPts = cardShape(gap);
  const agentPts = agentShape(gap);
  const cardW = 300 * s;
  const cardH = 189 * s;
  const agentW = 250 * s;
  const agentH = 215 * s;

  const fy = H * L.fieldY;
  const cardFormed = place(cardPts, W * L.cardX, fy, cardW, cardH, -0.07);
  const cardNear = place(cardPts, W * L.nearCardX, fy, cardW, cardH, -0.02);
  const agentFormed = place(agentPts, W * L.agentX, fy, agentW, agentH, 0.05);
  const agentNear = place(agentPts, W * L.nearAgentX, fy, agentW, agentH, 0.015);

  // --- the settled composition: card (left) · profile (centre) · agent (right),
  //     three follow-ups rising to the right. This doubles as the static frame
  //     served under prefers-reduced-motion, so it has to read on its own.
  const profilePts = profileShape(gap);
  const profileAt = shuffle(
    place(profilePts, W * L.profile[0], H * L.profile[1], 182 * s, 320 * s),
  );

  const bubblePts = bubbleShape(gap);
  const bs = s * L.bubbleScale;
  const bubbleAt = L.bubbles.map(([bx, by], i) =>
    shuffle(place(bubblePts, W * bx, H * by, 104 * bs, 72 * bs, -0.05 - i * 0.05)),
  );

  const particles: Particle[] = [];

  // Cursors into each target cloud; particles draw from them in order.
  let pi = 0;
  const bi = [0, 0, 0];

  const push = (
    formed: Pt,
    near: Pt,
    side: -1 | 1,
    role: Role,
    seqHold: number,
  ) => {
    // scatter origin: off the near edge, loosely clustered
    const sx = formed.x + side * W * (0.1 + Math.random() * 0.22);
    const sy = H * lerp(L.scatterY[0], L.scatterY[1], Math.random());

    // role 0 drifts back out to where it formed, framing the new profile.
    let fx = formed.x;
    let fy = formed.y;
    let qx = lerp(near.x, formed.x, 0.5) + side * W * 0.02;
    let qy = lerp(near.y, formed.y, 0.5) - H * 0.04;

    if (role === 1) {
      const t = profileAt[pi++ % profileAt.length];
      fx = t.x;
      fy = t.y;
      // bow the travel out through the contact point — it "emerges from the ripple"
      qx = lerp(near.x, fx, 0.5) + (contact.x - lerp(near.x, fx, 0.5)) * 0.85;
      qy = lerp(near.y, fy, 0.5) - H * 0.06;
    } else if (role === 2) {
      const which = Math.floor(Math.random() * 3);
      const cloud = bubbleAt[which];
      const t = cloud[bi[which]++ % cloud.length];
      fx = t.x;
      fy = t.y;
      seqHold = 0.14 * which; // the three fly out in sequence
      qx = lerp(near.x, fx, 0.5);
      qy = lerp(near.y, fy, 0.5) - H * 0.16; // thrown, not slid
    } else if (role === 3) {
      // the rising arc: up and to the right, fanned
      const u = Math.random();
      fx = lerp(W * 0.1, W * 0.95, u) + (Math.random() - 0.5) * W * 0.03;
      fy =
        lerp(H * L.arcY[0], H * L.arcY[1], Math.pow(u, 0.75)) +
        (Math.random() - 0.5) * H * 0.05;
      qx = lerp(near.x, fx, 0.5) - W * 0.04;
      qy = lerp(near.y, fy, 0.5) + H * 0.1; // bend: dip then lift
    }

    const kd = Math.atan2(near.y - contact.y, near.x - contact.x);
    particles.push({
      x: sx,
      y: sy,
      sx,
      sy,
      ax: formed.x,
      ay: formed.y,
      bx: near.x,
      by: near.y,
      fx,
      fy,
      qx,
      qy,
      kx: Math.cos(kd),
      ky: Math.sin(kd),
      role,
      lag: Math.random(),
      hold: seqHold,
      // card side mostly the deep orange, agent side mostly the bright one
      col:
        side === -1
          ? Math.random() < 0.55
            ? 0
            : 1
          : Math.random() < 0.18
            ? 4
            : Math.random() < 0.6
              ? 2
              : 3,
      wob: Math.random() * Math.PI * 2,
      alpha: 0.65 + Math.random() * 0.35,
      });
  };

  // Role mix. The card and agent must survive into the final frame — the static
  // composition has to show all three layers, not just the profile.
  // The phone band has no room for the rising arc: packed into 170px the trail
  // reads as noise over the profile, so those particles go to the shapes.
  // No rising-arc trail in the hero: the band is short and the text sits right below it.
  const trails = mode !== "hero";
  const roleFor = (r: number, isAgent: boolean): Role => {
    if (isAgent) {
      if (r < 0.46) return 0;
      if (r < 0.68) return 1;
      if (r < 0.84 || !trails) return 2;
      return 3;
    }
    if (r < 0.48) return 0;
    if (r < 0.8 || !trails) return 1;
    return 3;
  };

  const n = Math.min(cardFormed.length, cardNear.length);
  for (let i = 0; i < n; i++) {
    if (Math.random() > density) continue;
    push(cardFormed[i], cardNear[i], -1, roleFor(Math.random(), false), 0);
  }
  const m = Math.min(agentFormed.length, agentNear.length);
  for (let i = 0; i < m; i++) {
    if (Math.random() > density) continue;
    push(agentFormed[i], agentNear[i], 1, roleFor(Math.random(), true), 0);
  }

  return {
    particles,
    contact,
    safe: safeFor(W, H, mode),
    breathe: 3.2 * Math.min(1, s / 0.9),
  };
}

/* ------------------------------------------------------------------ update */

/** Soft dimming so dots can pass behind the headline without fighting it. */
function safeDim(x: number, y: number, W: number, H: number, sf: Safe): number {
  const hw = (sf.w * W) / 2;
  const hh = (sf.h * H) / 2;
  const dx = Math.abs(x - sf.cx * W) - hw;
  const dy = Math.abs(y - sf.cy * H) - hh;
  const feather = 46;
  // inside on both axes → dimmed; feathered at the edge
  const fx = clamp01(-dx / feather);
  const fy = clamp01(-dy / feather);
  const inside = fx * fy;
  return 1 - sf.dim * inside;
}

/** Quadratic bezier — used for the emerge/rise travel so it curves, not slides. */
const qbez = (a: number, q: number, b: number, t: number) => {
  const u = 1 - t;
  return u * u * a + 2 * u * t * q + t * t * b;
};

export type Frame = {
  /** ripple rings to draw behind the field: radius + alpha */
  rings: { r: number; a: number }[];
};

/**
 * Advance every particle to time `t` (seconds since start) and write positions
 * and alphas into the supplied scratch arrays. Pure function of `t` — so a
 * static frame is just update(scene, 999) and scrubbing works for free.
 */
export function update(
  scene: Scene,
  t: number,
  W: number,
  H: number,
  outX: Float32Array,
  outY: Float32Array,
  outA: Float32Array,
): Frame {
  const { particles, contact } = scene;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    let x: number;
    let y: number;
    let a = p.alpha;

    // --- 0.0–0.8 scatter: drift, not yet a shape
    const drift = Math.sin(t * 0.9 + p.wob) * 6;
    const sx = p.sx + drift;
    const sy = p.sy + Math.cos(t * 0.8 + p.wob) * 5;

    if (t < T.form) {
      x = sx;
      y = sy;
      a *= 0.35 + 0.65 * seg(t, 0, T.form, easeOutCubic);
    } else {
      // --- 0.8–1.85 form: scatter → the card / the agent, staggered.
      // Finishes a beat early on purpose: the shapes get a moment fully
      // assembled before the approach pulls them apart again.
      const st = p.lag * 0.25;
      const k = seg(t, T.form + st, T.form + 0.8 + st);
      x = lerp(sx, p.ax, k);
      y = lerp(sy, p.ay, k);

      // --- 2.0–2.6 approach: both fields drift toward the centre
      if (t >= T.approach) {
        const k2 = seg(t, T.approach, T.contact);
        x = lerp(p.ax, p.bx, k2);
        y = lerp(p.ay, p.by, k2);
      }

      // --- 2.6–3.2 contact: a kick outward from the meeting point, then recover
      if (t >= T.contact && t < T.emerge + 0.35) {
        const k3 = clamp01((t - T.contact) / 0.6);
        const pulse = Math.sin(k3 * Math.PI) * easeOutQuart(clamp01(k3 * 3));
        const d = Math.hypot(p.bx - contact.x, p.by - contact.y);
        const near = clamp01(1 - d / (W * 0.34)); // closest particles kick hardest
        const push = pulse * near * W * 0.045;
        x += p.kx * push;
        y += p.ky * push;
      }

      // --- 3.2–6.0 emerge + rise: travel the curve to the settled composition
      const start =
        (p.role === 3 ? T.rise : p.role === 0 ? T.rise - 0.2 : T.emerge) +
        p.hold +
        p.lag * 0.22;
      const end = p.role === 1 ? T.rise + 0.25 : T.settled;
      if (t >= start) {
        const k4 = seg(t, start, end, easeInOutCubic);
        x = qbez(p.bx, p.qx, p.fx, k4);
        y = qbez(p.by, p.qy, p.fy, k4);
        if (p.role === 3) a *= 1 - 0.55 * k4; // trails thin out as they rise
      }

      // --- after 6.0: settle and breathe
      if (t > T.settled) {
        const b = t - T.settled;
        x += Math.sin(b * 0.55 + p.wob) * scene.breathe;
        y += Math.cos(b * 0.47 + p.wob * 1.3) * scene.breathe;
      }
    }

    outX[i] = x;
    outY[i] = y;
    outA[i] = a * safeDim(x, y, W, H, scene.safe);
  }

  // The tap's ripple: two rings expanding out of the contact point.
  const rings: { r: number; a: number }[] = [];
  for (const [delay, span] of [
    [0, 1.0],
    [0.16, 1.25],
  ] as const) {
    const k = (t - T.contact - delay) / span;
    if (k > 0 && k < 1) {
      rings.push({
        r: easeOutQuart(k) * Math.min(W, H) * 0.52,
        a: (1 - k) * 0.5,
      });
    }
  }

  return { rings };
}
