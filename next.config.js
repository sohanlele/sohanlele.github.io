/** @type {import('next').NextConfig} */
// Use NEXT_PUBLIC_BASE_PATH for deployment: '' for root (Vercel/custom domain), '/Portfolio' for GitHub Pages project site
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const nextConfig = {
  output: 'export',
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  experimental: {
    mdxRs: true,
  },
  images: {
    // Required for static export (GitHub Pages): Image Optimization API needs a server
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig

