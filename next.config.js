/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === 'production' ? '/Portfolio' : ''
const nextConfig = {
  output: 'export',
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Required for GitHub Pages when repo is sohanlele/Portfolio (site at sohanlele.github.io/Portfolio/)
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

