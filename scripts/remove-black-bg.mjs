/**
 * Make black/near-black pixels transparent in an image.
 * Run: node scripts/remove-black-bg.mjs [path]
 * Default path: public/images/projects/irix-hero.png
 */
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const defaultPath = path.join(__dirname, '../public/images/projects/irix-hero.png')
const imagePath = process.argv[2] || defaultPath

// Any pixel with R,G,B all below this becomes fully transparent (catches black and dark grey)
const threshold = 100

const { data, info } = await sharp(imagePath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info
for (let i = 0; i < data.length; i += channels) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const maxChannel = Math.max(r, g, b)
  if (maxChannel <= threshold) {
    data[i + 3] = 0
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(imagePath)

console.log('Made black background transparent:', imagePath)