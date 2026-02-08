# Steerable Needle — image plan

PDFs are in `scripts/`: `steerable-needle-report.pdf`, `steerable-needle-presentation.pdf`.

**Option A — Manual export (recommended):** Open each PDF and export these pages as PNG:

| File | Source |
|------|--------|
| `hero.png` | Report p.11 "Final triangulated overlay side-by-side frames" — OR Presentation p.5 "Video demo" slide |
| `baseline-failure.png` | Report p.3, Figure 1 (stereo in gel failure) |
| `segmentation.png` | Report p.4, Figure 2 (SAM2 mask example frames) |
| `skeleton-glare.png` | Report p.6 (skeletonization + glare artifact) |
| `endpoints.png` | Report p.8 (endpoints overlay + third-branch failure) |
| `validation.png` | Report p.13 or Presentation p.7 (model vs measured curve, 7% error) |

**Option B — Script:** After `brew install cairo` (for pdftocairo), run from repo root: `node scripts/extract-steerable-needle-images.js`, then rename the generated files to the names above.
