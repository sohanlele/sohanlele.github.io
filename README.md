# Sohan Lele's Personal Website

A modern, Apple-inspired portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, minimal interface with dark theme
- **Responsive**: Optimized for all device sizes
- **Fast Performance**: Built with Next.js 14 and optimized for speed
- **SEO Optimized**: Proper meta tags and structured data
- **Accessible**: WCAG compliant with keyboard navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (default)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### GitHub Pages (sohanlele.github.io)

The site is configured for static export and can be deployed to **GitHub Pages** so it lives at **https://sohanlele.github.io**.

1. **Create a repo named `sohanlele.github.io`** (required for a user/org site at that URL). Push this project there, or copy the contents of this repo into it.

2. **Enable GitHub Pages**: In the repo → **Settings** → **Pages** → **Source**: choose **GitHub Actions**.

3. **Push to `main`**: The workflow in `.github/workflows/deploy-pages.yml` runs on every push to `main`. It builds the static site and deploys it to GitHub Pages. After the first successful run, the site will be live at **https://sohanlele.github.io**.

If you keep this repo named **Portfolio** instead of **sohanlele.github.io**, the site will be at **https://sohanlele.github.io/Portfolio/** and you would need to set `basePath: '/Portfolio'` in `next.config.js` and redeploy.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── content/            # Project data and content
├── lib/                # Utility functions
└── styles/             # Global styles
```

## License

MIT License - feel free to use this template for your own portfolio.