import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/content/projects'
import { basePath, splitTitle } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

const position = { 'left top': 'object-left-top', left: 'object-left', top: 'object-top', center: 'object-center' }

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
      <header className="mb-14 md:mb-20">
        <h1 className="font-serif text-ink text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.02em]">
          Projects
        </h1>
        <p className="mt-4 text-[17px] text-muted">Hardware, robotics, and perception work.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {projects.map((project, i) => {
          const href = project.externalUrl ?? `/work/${project.slug}`
          const { kicker, name } = splitTitle(project.title, project.nameFirst)
          const card = (
            <>
              <div className="frame relative aspect-[3/2] overflow-hidden">
                {project.heroImage ? (
                  <Image
                    src={basePath + project.heroImage}
                    alt=""
                    fill
                    className={`object-cover origin-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03] ${
                      position[project.heroImagePosition ?? 'center']
                    } ${project.heroImageScale != null ? 'scale-[var(--hero-scale)] motion-safe:group-hover:scale-[calc(var(--hero-scale)*1.03)]' : ''}`}
                    style={
                      project.heroImageScale != null
                        ? ({ '--hero-scale': String(project.heroImageScale) } as React.CSSProperties)
                        : undefined
                    }
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i < 2}
                  />
                ) : null}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="label">{kicker ?? project.role}</span>
                <span className="font-mono text-[12px] text-muted tabular-nums">{project.year}</span>
              </div>
              <h2 className="mt-2 font-serif text-[28px] leading-[1.1] text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-ink">
                {name}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-body line-clamp-3 text-pretty">{project.oneLiner}</p>
              {project.tags && project.tags.length > 0 && (
                <p className="mt-4 text-[13px] text-muted">{project.tags.slice(0, 4).join(' · ')}</p>
              )}
            </>
          )
          return (
            <Reveal key={project.slug} i={i % 2}>
              {project.externalUrl ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
                  {card}
                </a>
              ) : (
                <Link href={href} className="group block">
                  {card}
                </Link>
              )}
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
