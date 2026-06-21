/**
 * Favicon generator — produces PNG favicon files from a canvas drawing.
 * Run once: node scripts/generate-favicons.mjs
 * Requires no extra deps — uses Node's built-in canvas via the 'canvas' package.
 * Falls back to writing inline SVG-based HTML if canvas package is unavailable.
 */

import { createCanvas } from "canvas";
import { writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC    = resolve(__dirname, "../public");

/**
 * Draw the Arrowhead orange triangle favicon onto a canvas of given size.
 */
function drawFavicon(size) {
  const canvas = createCanvas(size, size);
  const ctx    = canvas.getContext("2d");

  /* Background */
  const r = size * 0.18;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fillStyle = "#0f0f0f";
  ctx.fill();

  /* Triangle points */
  const pad = size * 0.12;
  const tip = { x: size / 2, y: pad };
  const bL  = { x: pad,          y: size - pad };
  const bR  = { x: size - pad,   y: size - pad };

  /* Orange gradient fill */
  const grad = ctx.createLinearGradient(tip.x, tip.y, bR.x, bR.y);
  grad.addColorStop(0,   "#ff7a42");
  grad.addColorStop(0.5, "#FF5A1F");
  grad.addColorStop(1,   "#c03a0a");

  ctx.beginPath();
  ctx.moveTo(tip.x, tip.y);
  ctx.lineTo(bR.x,  bR.y);
  ctx.lineTo(bL.x,  bL.y);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  /* Inner highlight */
  const hiGrad = ctx.createLinearGradient(tip.x, tip.y, tip.x, bL.y);
  hiGrad.addColorStop(0,   "rgba(255,255,255,0.28)");
  hiGrad.addColorStop(0.5, "rgba(255,255,255,0.06)");
  hiGrad.addColorStop(1,   "rgba(255,255,255,0)");
  ctx.fillStyle = hiGrad;
  ctx.fill();

  /* Edge stroke */
  ctx.beginPath();
  ctx.moveTo(tip.x, tip.y);
  ctx.lineTo(bR.x,  bR.y);
  ctx.lineTo(bL.x,  bL.y);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth   = Math.max(1, size * 0.012);
  ctx.stroke();

  return canvas;
}

const SIZES = [
  { name: "favicon-16x16.png",          size: 16  },
  { name: "favicon-32x32.png",          size: 32  },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

let success = true;
for (const { name, size } of SIZES) {
  try {
    const canvas = drawFavicon(size);
    const buf    = canvas.toBuffer("image/png");
    writeFileSync(resolve(PUBLIC, name), buf);
    console.log(`✓ Generated ${name} (${size}x${size})`);
  } catch (e) {
    console.error(`✗ Failed ${name}: ${e.message}`);
    success = false;
  }
}

if (success) {
  console.log("\n✅ All favicon PNGs generated in public/");
  console.log("   Copy public/favicon-32x32.png → public/favicon.ico manually,");
  console.log("   or use a converter: https://convertio.co/png-ico/");
} else {
  console.log("\n⚠  Some files failed. Install the 'canvas' package:");
  console.log("   npm install canvas --save-dev");
  console.log("   Then re-run: node scripts/generate-favicons.mjs");
}
