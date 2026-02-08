/**
 * Screenshot specific PDF pages using Puppeteer + PDF.js.
 * Run: node scripts/screenshot-pdf-pages.mjs
 * Requires: puppeteer, and PDFs in scripts/
 */
import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const reportPath = path.join(__dirname, 'steerable-needle-report.pdf')
const outDir = path.join(__dirname, '../public/images/projects/steerable-needle')

/** Crop to figure only – no titles, captions, or axis labels. { top, left, right, bottom } 0–1. */
const reportPages = [
  { page: 3, name: 'baseline-failure.png', crop: { top: 0.20, left: 0.12, right: 0.88, bottom: 0.58 } },
  { page: 4, name: 'segmentation.png', crop: { top: 0.12, left: 0.10, right: 0.90, bottom: 0.28 } }, // two SAM2 panels only
  { page: 6, name: 'skeleton-glare.png', crop: { top: 0.18, left: 0.12, right: 0.88, bottom: 0.62 } },
  { page: 8, name: 'endpoints.png', crop: { top: 0.18, left: 0.12, right: 0.88, bottom: 0.62 } },
  { page: 11, name: 'hero.png', crop: { top: 0.18, left: 0.12, right: 0.88, bottom: 0.68 } },
  { page: 13, name: 'validation.png', crop: { top: 0.18, left: 0.12, right: 0.88, bottom: 0.65 } },
]

if (!fs.existsSync(reportPath)) {
  console.error('Report not found:', reportPath)
  process.exit(1)
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const html = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style> body { margin: 0; background: #fff; } #c { display: block; } </style>
</head>
<body><canvas id="c"></canvas></body>
</html>
`

async function main() {
  const pdfData = fs.readFileSync(reportPath)
  const base64 = pdfData.toString('base64')

  let executablePath
  if (process.platform === 'darwin') {
    const p = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    if (fs.existsSync(p)) executablePath = p
  }
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath && { executablePath }),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 900 })
    await page.goto('data:text/html;base64,' + Buffer.from(html).toString('base64'), {
      waitUntil: 'networkidle0',
    })
    await page.addScriptTag({
      url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    })
    await page.waitForFunction('typeof pdfjsLib !== "undefined"', { timeout: 10000 })

    for (const { page: pageNum, name, crop } of reportPages) {
      const viewSize = await page.evaluate(
        async (base64Data, pageNum) => {
          const pdfjsLib = window.pdfjsLib
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
          const data = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))
          const pdf = await pdfjsLib.getDocument({ data }).promise
          if (pageNum > pdf.numPages) throw new Error('Page ' + pageNum + ' not in PDF')
          const p = await pdf.getPage(pageNum)
          const scale = 2
          const view = await p.getViewport({ scale })
          const canvas = document.getElementById('c')
          canvas.width = view.width
          canvas.height = view.height
          const ctx = canvas.getContext('2d')
          await p.render({ canvasContext: ctx, viewport: view }).promise
          return { width: view.width, height: view.height }
        },
        base64,
        pageNum
      )

      const canvas = await page.$('#c')
      const dest = path.join(outDir, name)
      const opts = { path: dest, type: 'png' }
      if (crop && viewSize) {
        const w = viewSize.width
        const h = viewSize.height
        opts.clip = {
          x: crop.left * w,
          y: crop.top * h,
          width: (crop.right - crop.left) * w,
          height: (crop.bottom - crop.top) * h,
        }
      }
      await canvas.screenshot(opts)
      console.log('Saved', name)
    }
  } finally {
    await browser.close()
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
