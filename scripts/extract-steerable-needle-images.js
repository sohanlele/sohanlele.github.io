/**
 * Extract images from Steerable Needle report and presentation PDFs.
 * Run from repo root: node scripts/extract-steerable-needle-images.js
 * Requires: pdf-poppler (and poppler on system if needed)
 */
const path = require('path')
const fs = require('fs')

const reportPath = path.join(__dirname, 'steerable-needle-report.pdf')
const presentationPath = path.join(__dirname, 'steerable-needle-presentation.pdf')
const outDir = path.join(__dirname, '../public/images/projects/steerable-needle')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

async function extract() {
  let pdf
  try {
    pdf = require('pdf-poppler')
  } catch (e) {
    console.error('pdf-poppler not found. Run: npm install pdf-poppler')
    process.exit(1)
  }

  const opts = { format: 'png', out_dir: outDir, out_prefix: 'page' }

  // Report: pages 3,4,6,8,11,13 → baseline-failure, segmentation, skeleton-glare, endpoints, hero (or validation), validation
  const reportPages = [
    { page: 3, name: 'baseline-failure.png' },
    { page: 4, name: 'segmentation.png' },
    { page: 6, name: 'skeleton-glare.png' },
    { page: 8, name: 'endpoints.png' },
    { page: 11, name: 'hero.png' },
    { page: 13, name: 'validation.png' },
  ]
  for (const { page, name } of reportPages) {
    try {
      await pdf.convert(reportPath, { ...opts, out_prefix: `report-p${page}`, page })
      const src = path.join(outDir, `report-p${page}-${page}.png`)
      const dest = path.join(outDir, name)
      if (fs.existsSync(src)) {
        fs.renameSync(src, dest)
        console.log('Extracted', name)
      }
    } catch (err) {
      console.warn('Skip', name, err.message)
    }
  }

  // Presentation p.5 as alternate hero if report p.11 failed
  try {
    await pdf.convert(presentationPath, { ...opts, out_prefix: 'pres-p5', page: 5 })
    const src = path.join(outDir, 'pres-p5-5.png')
    if (fs.existsSync(src) && !fs.existsSync(path.join(outDir, 'hero.png'))) {
      fs.renameSync(src, path.join(outDir, 'hero.png'))
      console.log('Extracted hero from presentation p.5')
    }
  } catch (err) {
    console.warn('Presentation p.5', err.message)
  }

  console.log('Done.')
}

extract().catch((e) => {
  console.error(e)
  process.exit(1)
})
