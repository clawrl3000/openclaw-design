/**
 * Generates ASCII art frames of an animated lobster claw (open/close cycle).
 * Uses signed distance functions for clean, filled shapes.
 * Output: public/animations/claw/{high,medium,low}/frame_XXXXX.txt
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

// Grid dimensions
const COLS = 140;
const ROWS = 65;
const TOTAL_FRAMES = 60;

// ASCII density ramp (dense → sparse)
const RAMP = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

// --- SDF primitives ---

function sdCircle(px, py, cx, cy, r) {
  const dx = px - cx;
  const dy = py - cy;
  return Math.sqrt(dx * dx + dy * dy) - r;
}

function sdBox(px, py, cx, cy, hw, hh) {
  const dx = Math.abs(px - cx) - hw;
  const dy = Math.abs(py - cy) - hh;
  return Math.sqrt(Math.max(dx, 0) ** 2 + Math.max(dy, 0) ** 2) + Math.min(Math.max(dx, dy), 0);
}

function sdEllipse(px, py, cx, cy, rx, ry) {
  const dx = (px - cx) / rx;
  const dy = (py - cy) / ry;
  return Math.sqrt(dx * dx + dy * dy) - 1;
}

// Rotate point around origin
function rotate(px, py, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [px * c - py * s, px * s + py * c];
}

// SDF union (merge shapes)
function opUnion(a, b) {
  return Math.min(a, b);
}

// SDF smooth union
function opSmoothUnion(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - (h * h * k) / 4;
}

// --- Claw shape definition ---

function clawSDF(px, py, openAngle) {
  // All coordinates in a normalized space where the claw is centered
  // The claw faces LEFT (pincers point left, arm goes right)

  // === UPPER PINCER (fixed finger) ===
  // An elongated shape curving upward-left
  const upperAngle = openAngle * 0.3; // upper pincer moves less
  const [upx, upy] = rotate(px - 0, py - 0, upperAngle);

  // Upper pincer: thick tapered arc
  // Made from an ellipse offset upward
  const upperBase = sdEllipse(upx, upy, -18, -8, 22, 6);
  // Tip: small circle at the end
  const upperTipX = -35;
  const upperTipY = -6;
  const [utx, uty] = rotate(upperTipX, upperTipY, upperAngle);
  const upperTip = sdCircle(px, py, utx, uty, 2.5);

  // === LOWER PINCER (dactyl — the moving part) ===
  const lowerAngle = -openAngle; // lower pincer moves more
  const [lpx, lpy] = rotate(px - 0, py - 0, lowerAngle);

  // Lower pincer: thick tapered arc
  const lowerBase = sdEllipse(lpx, lpy, -18, 8, 22, 6);
  // Tip
  const lowerTipX = -35;
  const lowerTipY = 6;
  const [ltx, lty] = rotate(lowerTipX, lowerTipY, lowerAngle);
  const lowerTip = sdCircle(px, py, ltx, lty, 2.5);

  // === PALM (propodus — the thick body) ===
  const palm = sdEllipse(px, py, 5, 0, 16, 11);

  // === KNUCKLE (joint between palm and arm) ===
  const knuckle = sdCircle(px, py, 18, 0, 9);

  // === ARM ===
  const arm = sdEllipse(px, py, 35, 0, 18, 7);

  // === COMBINE all parts ===
  let d = palm;
  d = opSmoothUnion(d, upperBase, 4);
  d = opSmoothUnion(d, lowerBase, 4);
  d = opSmoothUnion(d, knuckle, 3);
  d = opSmoothUnion(d, arm, 4);
  d = opUnion(d, upperTip);
  d = opUnion(d, lowerTip);

  return d;
}

// --- Frame rendering ---

function renderFrame(openAngle) {
  const lines = [];

  // Center the claw in the grid
  const centerX = COLS * 0.38; // slightly left of center so arm has room
  const centerY = ROWS * 0.5;

  // Character aspect ratio: characters are ~2x taller than wide
  const aspectRatio = 0.48;

  for (let row = 0; row < ROWS; row++) {
    let line = "";
    for (let col = 0; col < COLS; col++) {
      // Map grid position to claw coordinate space
      const px = (col - centerX) * aspectRatio;
      const py = row - centerY;

      const dist = clawSDF(px, py, openAngle);

      if (dist < 0) {
        // Inside the claw — use density based on how deep inside
        const depth = Math.min(-dist / 6, 1);
        const charIdx = Math.floor((1 - depth) * (RAMP.length * 0.6));
        line += RAMP[Math.min(charIdx, RAMP.length - 1)];
      } else if (dist < 1.5) {
        // Edge — use medium density for outline
        const edgeFade = dist / 1.5;
        const charIdx = Math.floor(RAMP.length * 0.4 + edgeFade * RAMP.length * 0.4);
        line += RAMP[Math.min(charIdx, RAMP.length - 1)];
      } else {
        line += " ";
      }
    }
    lines.push(line.trimEnd());
  }

  // Trim trailing empty lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  return lines.join("\n");
}

// --- Generate all frames ---

const qualities = ["high", "medium", "low"];
for (const q of qualities) {
  mkdirSync(join(PROJECT_ROOT, `public/animations/claw/${q}`), { recursive: true });
}

console.log(`Generating ${TOTAL_FRAMES} claw frames (${COLS}x${ROWS})...`);

for (let i = 0; i < TOTAL_FRAMES; i++) {
  // Smooth sinusoidal open/close cycle
  const t = i / TOTAL_FRAMES;
  const openAngle = 0.08 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI));

  const frame = renderFrame(openAngle);
  const filename = `frame_${String(i + 1).padStart(5, "0")}.txt`;

  // Write to all quality tiers (same content — it's procedural)
  for (const q of qualities) {
    writeFileSync(join(PROJECT_ROOT, `public/animations/claw/${q}`, filename), frame);
  }

  if ((i + 1) % 10 === 0) {
    process.stdout.write(`  ${i + 1}/${TOTAL_FRAMES}\n`);
  }
}

console.log("Done! Claw animation frames saved to public/animations/claw/");
