'use client'

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 md:px-10 mt-auto">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-6 text-sm text-white/70 mb-4">
          <a
            href="https://github.com/sohanlele"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(var(--accent))] transition-colors"
          >
            Sohan Lele on GitHub
          </a>
          <a
            href="https://linkedin.com/in/sohanlele"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(var(--accent))] transition-colors"
          >
            Sohan Lele on LinkedIn
          </a>
          <a
            href="mailto:sohanlele@gmail.com"
            className="hover:text-[hsl(var(--accent))] transition-colors"
          >
            Send an email to Sohan Lele
          </a>
        </div>
        <p className="text-xs text-white/50">
          Copyright © {new Date().getFullYear()} | All rights reserved.
        </p>
      </div>
    </footer>
  )
}
