/**
 * Converts a lobster claw PNG into ASCII art frames with open/close animation.
 * Uses sharp to read pixel data, then warps the upper and lower halves apart
 * to simulate the pincers opening and closing.
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

// Output dimensions (characters)
const ASCII_COLS = 120;
const ASCII_ROWS = 55;

// Total animation frames (smooth loop)
const TOTAL_FRAMES = 48;

// ASCII density ramp — dark to light
const RAMP = "@%#*+=-:. ";

async function loadImagePixels(imagePath, pixelWidth, pixelHeight) {
  const { data, info } = await sharp(imagePath)
    .resize(pixelWidth, pixelHeight, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return { data, width: info.width, height: info.height };
}

function samplePixel(data, width, height, x, y) {
  // Bilinear interpolation for smooth warping
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, width - 1);
  const y1 = Math.min(y0 + 1, height - 1);

  if (x0 < 0 || y0 < 0 || x0 >= width || y0 >= height) {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  const fx = x - x0;
  const fy = y - y0;

  const sample = (px, py) => {
    const idx = (py * width + px) * 4;
    return {
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2],
      a: data[idx + 3],
    };
  };

  const p00 = sample(x0, y0);
  const p10 = sample(x1, y0);
  const p01 = sample(x0, y1);
  const p11 = sample(x1, y1);

  return {
    r: p00.r * (1 - fx) * (1 - fy) + p10.r * fx * (1 - fy) + p01.r * (1 - fx) * fy + p11.r * fx * fy,
    g: p00.g * (1 - fx) * (1 - fy) + p10.g * fx * (1 - fy) + p01.g * (1 - fx) * fy + p11.g * fx * fy,
    b: p00.b * (1 - fx) * (1 - fy) + p10.b * fx * (1 - fy) + p01.b * (1 - fx) * fy + p11.b * fx * fy,
    a: p00.a * (1 - fx) * (1 - fy) + p10.a * fx * (1 - fy) + p01.a * (1 - fx) * fy + p11.a * fx * fy,
  };
}

function pixelsToAscii(data, width, height, cols, rows, openAmount) {
  // Lobster claw anatomy:
  //   - Upper finger (fixed) stays still
  //   - Lower finger (dactyl) swings DOWN to open
  //   - Hinge/pivot is on the RIGHT (body/palm side)
  //   - Tips are on the LEFT
  // Only the lower half rotates — this is how a real claw opens.

  const centerY = height / 2;
  const maxDisplacement = openAmount * height * 0.22;

  const lines = [];

  for (let row = 0; row < rows; row++) {
    let line = "";
    for (let col = 0; col < cols; col++) {
      const px = (col / cols) * width;
      const py1 = (row * 2 / (rows * 2)) * height;
      const py2 = ((row * 2 + 1) / (rows * 2)) * height;

      let totalBrightness = 0;
      let totalAlpha = 0;
      let samples = 0;

      for (const py of [py1, py2]) {
        // Displacement only for the LOWER half (dactyl swings open)
        // Upper half stays completely fixed
        const horizFactor = px / width; // 0 at hinge (left), 1 at tips (right)
        const smoothFactor = Math.pow(horizFactor, 1.5); // gentle curve

        let srcY;
        if (py <= centerY) {
          // Upper pincer (dactyl): swings upward to open
          srcY = py + smoothFactor * maxDisplacement;
        } else {
          // Lower pincer: FIXED
          srcY = py;
        }

        const pixel = samplePixel(data, width, height, px, srcY);
        const a = pixel.a / 255;

        if (a > 0.05) {
          const brightness = (0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b) / 255;
          totalBrightness += brightness * a;
          totalAlpha += a;
        }
        samples++;
      }

      if (totalAlpha < 0.1) {
        line += " ";
        continue;
      }

      const avgBrightness = totalBrightness / samples;
      const charIdx = Math.floor((1 - avgBrightness) * (RAMP.length - 1));
      line += RAMP[Math.min(charIdx, RAMP.length - 1)];
    }

    lines.push(line.trimEnd());
  }

  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  return lines.join("\n");
}

async function main() {
  const imagePath = process.argv[2] || "/tmp/lobster-claw.png";

  console.log(`Converting ${imagePath} to ${TOTAL_FRAMES} ASCII frames with open/close animation...`);

  // Load image at a working resolution
  const pixelWidth = ASCII_COLS;
  const pixelHeight = ASCII_ROWS * 2;
  const { data, width, height } = await loadImagePixels(imagePath, pixelWidth, pixelHeight);

  // Clean and recreate output dirs
  const baseDir = join(PROJECT_ROOT, "public/animations/claw");
  rmSync(baseDir, { recursive: true, force: true });

  const qualities = ["high", "medium", "low"];
  for (const q of qualities) {
    mkdirSync(join(baseDir, q), { recursive: true });
  }

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    // Smooth sinusoidal open/close cycle
    const t = i / TOTAL_FRAMES;
    // Eased sine wave: closed → open → closed
    const openAmount = 0.5 + 0.5 * Math.sin(t * 2 * Math.PI - Math.PI / 2);
    // Range: 0 (fully closed) to 1 (fully open)

    const frame = pixelsToAscii(data, width, height, ASCII_COLS, ASCII_ROWS, openAmount);
    const filename = `frame_${String(i + 1).padStart(5, "0")}.txt`;

    for (const q of qualities) {
      writeFileSync(join(baseDir, q, filename), frame);
    }

    if ((i + 1) % 8 === 0) {
      process.stdout.write(`  ${i + 1}/${TOTAL_FRAMES}\n`);
    }
  }

  console.log("Done! Animated lobster claw frames saved to public/animations/claw/");
}

main().catch(console.error);
