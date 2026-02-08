/**
 * Create placeholder PNGs for steerable-needle so image paths don't 404.
 * Run: node scripts/create-placeholder-images.mjs
 */
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/images/projects/steerable-needle')

const width = 800
const height = 500
const names = ['hero.png', 'baseline-failure.png', 'segmentation.png', 'skeleton-glare.png', 'endpoints.png', 'validation.png']

// Simple gray placeholder with text would need a font; use solid gray for now
const placeholder = await sharp({
  create: { width, height, channels: 3, background: { r: 230, g: 228, b: 225 } },
})
  .png()
  .toBuffer()

for (const name of names) {
  const dest = path.join(outDir, name)
  await sharp(placeholder).toFile(dest)
  console.log('Created', name)
}
console.log('Done. Replace these with exports from the PDF when ready.')
