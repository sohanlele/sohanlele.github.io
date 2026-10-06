'use client'

import { useEffect, useRef } from 'react'

/** Fades children up once when they scroll into view. `i` staggers siblings. */
export function Reveal({
  children,
  i = 0,
  className = '',
}: {
  children: React.ReactNode
  i?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ '--i': i } as React.CSSProperties}>
      {children}
    </div>
  )
}
