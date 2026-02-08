'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-semibold text-[#171717] mb-4">404</h1>
      <p className="text-[#525252] mb-8">Page not found</p>
      <Link
        href="/"
        className="text-xs text-[#737373] hover:text-[hsl(var(--accent))] transition-colors"
      >
        ← back home
      </Link>
    </div>
  )
}
