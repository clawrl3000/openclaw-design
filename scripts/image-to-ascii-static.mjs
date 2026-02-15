/**
 * Converts a single image to a static ASCII art frame.
 * Strips gray backgrounds by detecting saturation — the red/orange claw
 * is highly saturated while the gray bg is desaturated.
 *
 * Usage: node image-to-ascii-static.mjs <input.png> <output-folder-name>
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

const ASCII_COLS = 120;
const ASCII_ROWS = 55;

// ASCII density ramp — dark to light
const RAMP = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

async function convert(imagePath, folderName) {
  const pixelWidth = ASCII_COLS;
  const pixelHeight = ASCII_ROWS * 2;

  const { data, info } = await sharp(imagePath)
    .resize(pixelWidth, pixelHeight, {
      fit: "contain",
      background: { r: 128, g: 128, b: 128, alpha: 255 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lines = [];

  for (let row = 0; row < ASCII_ROWS; row++) {
    let line = "";
    for (let col = 0; col < ASCII_COLS; col++) {
      let totalBrightness = 0;
      let totalWeight = 0;
      let samples = 0;

      for (const yOff of [0, 1]) {
        const y = row * 2 + yOff;
        if (y >= info.height) continue;

        const idx = (y * info.width + col) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Calculate saturation to distinguish claw (saturated red/orange)
        // from gray background (desaturated)
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Gray background has low saturation — skip it
        if (saturation < 0.12) {
          samples++;
          continue;
        }

        totalBrightness += brightness;
        totalWeight += 1;
        samples++;
      }

      if (totalWeight < 0.5) {
        line += " ";
        continue;
      }

      const avgBrightness = totalBrightness / totalWeight;

      // Map brightness to character — brighter = denser (since claw is bright on dark bg)
      const charIdx = Math.floor((1 - avgBrightness) * (RAMP.length - 1));
      line += RAMP[Math.min(Math.max(charIdx, 0), RAMP.length - 1)];
    }

    lines.push(line.trimEnd());
  }

  // Trim trailing empty lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  const frame = lines.join("\n");

  // Save as single frame in the animation folder structure
  const baseDir = join(PROJECT_ROOT, `public/animations/${folderName}`);
  for (const q of ["high", "medium", "low"]) {
    mkdirSync(join(baseDir, q), { recursive: true });
    writeFileSync(join(baseDir, q, "frame_00001.txt"), frame);
  }

  console.log(`Saved ASCII art to public/animations/${folderName}/`);
  // Print preview
  console.log(frame.split("\n").slice(0, 15).join("\n"));
  console.log("...");
}

const imagePath = process.argv[2];
const folderName = process.argv[3];

if (!imagePath || !folderName) {
  console.error("Usage: node image-to-ascii-static.mjs <input.png> <folder-name>");
  process.exit(1);
}

convert(imagePath, folderName).catch(console.error);
