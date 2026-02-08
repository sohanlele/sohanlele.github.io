'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isProjects = pathname === '/projects'
  const isContact = pathname === '/contact'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#166534] border-b border-[#14532d]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className={`text-lg text-white/95 transition-colors hover:underline hover:text-white ${
            isHome ? 'font-medium text-white' : ''
          }`}
        >
          Sohan Lele
        </Link>
        <ul className="flex items-center gap-6 text-base">
          <li>
            <Link
              href="/projects"
              className={`text-white/90 hover:text-white hover:underline transition-colors ${
                isProjects ? 'text-white font-medium' : ''
              }`}
            >
              Projects
            </Link>
          </li>
          <li>
            <a
              href="/files/sohan_lele_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white hover:underline transition-colors"
            >
              Resume
            </a>
          </li>
          <li>
            <Link
              href="/contact"
              className={`text-white/90 hover:text-white hover:underline transition-colors ${
                isContact ? 'text-white font-medium' : ''
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
