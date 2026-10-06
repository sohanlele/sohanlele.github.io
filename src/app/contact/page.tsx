import { Reveal } from '@/components/reveal'

const links = [
  { label: 'Email', value: 'sohanlele@gmail.com', href: 'mailto:sohanlele@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/sohanlele', href: 'https://www.linkedin.com/in/sohanlele' },
  { label: 'X', value: '@sohanlele', href: 'https://x.com/sohanlele' },
]

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-24 md:pt-40 md:pb-32 min-h-[80dvh]">
      <Reveal>
        <h1 className="font-serif text-ink text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.02em]">
          Stay Close
        </h1>
      </Reveal>
      <Reveal i={1}>
        <p className="mt-8 max-w-[52ch] text-[17px] md:text-[18px] leading-[1.65] text-pretty">
          If you want to talk, collaborate, or learn more about what I'm working on, feel free to reach out.
        </p>
      </Reveal>
      <ul className="mt-14 max-w-xl border-t border-line">
        {links.map((l, i) => (
          <li key={l.label} className="border-b border-line">
            <Reveal i={i + 2}>
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 py-5"
              >
                <span className="label">{l.label}</span>
                <span className="text-[17px] text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-ink">
                  {l.value}
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
