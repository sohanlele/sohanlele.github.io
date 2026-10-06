'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { basePath } from '@/lib/utils'

const linkClass = 'transition-colors duration-200 hover:text-ink'

export function Navbar() {
  const pathname = usePathname() ?? ''
  const onProjects = pathname === '/projects' || pathname.startsWith('/work')
  const onContact = pathname === '/contact'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-[22px] leading-none text-ink">
          Sohan Lele
        </Link>
        <ul className="flex items-center gap-6 sm:gap-8 text-[14px] text-muted">
          <li>
            <Link href="/projects" className={`${linkClass} ${onProjects ? 'text-ink' : ''}`}>
              Projects
            </Link>
          </li>
          <li>
            <a
              href={basePath + '/files/sohan_lele_resume.pdf?v=4'}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Resume
            </a>
          </li>
          <li>
            <Link href="/contact" className={`${linkClass} ${onContact ? 'text-ink' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
