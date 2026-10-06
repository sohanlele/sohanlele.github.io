import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'


export const metadata: Metadata = {
  title: 'Sohan Lele | Product Design Engineer, Robotics & Hardware',
  description: 'Product design engineer in robotics and hardware, with hands-on perception and sensor-fusion work. Co-Founder at IRIX.',
  authors: [{ name: 'Sohan Lele' }],
  creator: 'Sohan Lele',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sohanlele.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-body">
        <a href="#main" className="sr-only focus:fixed focus:top-4 focus:left-6 focus:z-[100] focus:px-3 focus:py-2 focus:bg-ink focus:text-canvas focus:text-sm focus:w-auto focus:h-auto focus:overflow-visible focus:[clip:auto] lowercase">
          skip to content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
          <footer className="border-t border-line">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-[14px] text-muted">
              <span>Sohan Lele</span>
              <div className="flex gap-6">
                <a href="mailto:sohanlele@gmail.com" className="transition-colors duration-200 hover:text-ink">Email</a>
                <a href="https://www.linkedin.com/in/sohanlele" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-ink">LinkedIn</a>
                <a href="https://x.com/sohanlele" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-ink">X</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

