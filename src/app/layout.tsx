import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'


export const metadata: Metadata = {
  title: 'Sohan Lele — Product Design Engineer & Founder',
  description: 'Product design engineer building hardware. Co-Founder & CEO at IRIX.',
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
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#f7f6f3] text-[#374151] antialiased" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <a href="#main" className="sr-only focus:fixed focus:top-4 focus:left-6 focus:z-[100] focus:px-3 focus:py-2 focus:bg-white focus:text-black focus:text-sm focus:w-auto focus:h-auto focus:overflow-visible focus:[clip:auto] lowercase">
          skip to content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}

