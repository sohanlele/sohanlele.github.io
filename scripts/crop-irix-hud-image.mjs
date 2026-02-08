/**
 * One-time script: crop beige borders from the IRIX HUD image.
 * Run: node scripts/crop-irix-hud-image.mjs
 * Requires: npm install sharp
 */
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(__dirname, '../public/images/projects/irix-hud-ring.png')
const dest = src

const buffer = await sharp(src).toBuffer()
const { width, height } = await sharp(buffer).metadata()
// Trim edge padding so subject fills frame (moderate crop for lifestyle shot).
const marginX = 0.04  // 4% off left and right
const marginY = 0.04  // 4% off top and bottom
const left = Math.round(width * marginX)
const top = Math.round(height * marginY)
const w = Math.round(width * (1 - 2 * marginX))
const h = Math.round(height * (1 - 2 * marginY))

await sharp(buffer)
  .extract({ left, top, width: w, height: h })
  .toFile(dest)
console.log('Cropped irix-hud-ring.png (aggressive trim: most of right beige removed)')