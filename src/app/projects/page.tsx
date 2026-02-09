import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/content/projects'
import { basePath } from '@/lib/utils'

const ACCENT = '#166534'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f3] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <h1 className="text-[30px] leading-tight sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold tracking-tight text-[#0b0d12]">
            Projects
          </h1>
          <p className="mt-3 text-[12px] md:text-[13px] font-medium uppercase tracking-[0.12em] text-[#4b5563] leading-snug">
            Product design from concept to production.
          </p>
          <div className="mt-4 w-12 border-t border-[#e0ddd8]" aria-hidden />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {projects.map((project) => {
            const href = project.externalUrl ?? `/work/${project.slug}`
            const isExternal = !!project.externalUrl
            const cardClass =
              'group flex flex-col h-full overflow-hidden bg-white rounded-lg w-full'
            const content = (
              <>
                <div className="relative w-full aspect-[3/2] flex-shrink-0 overflow-hidden rounded-t-lg bg-[#f0eeeb]">
                  {project.heroImage ? (
                    <Image
                      src={basePath + project.heroImage}
                      alt={project.title}
                      fill
                      className={`object-cover group-hover:scale-[1.02] transition-transform duration-300 origin-center ${
                        project.heroImagePosition === 'left top'
                          ? 'object-left-top'
                          : project.heroImagePosition === 'left'
                            ? 'object-left'
                            : project.heroImagePosition === 'top'
                              ? 'object-top'
                              : 'object-center'
                      } ${project.heroImageScale != null ? 'scale-[var(--hero-scale)]' : ''}`}
                      style={project.heroImageScale != null ? { '--hero-scale': String(project.heroImageScale) } as React.CSSProperties : undefined}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[#9ca3af] text-sm bg-[#f0eeeb]">
                      {project.year}
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 min-h-[220px] rounded-b-lg">
                  <h2 className="text-xl font-semibold text-[#0b0d12] group-hover:text-[#166534] transition-colors">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-[#374151] text-[15px] leading-relaxed line-clamp-3 flex-shrink-0">
                    {project.oneLiner}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 flex-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2.5 py-1 text-xs font-medium rounded border border-[#166534]/30 text-[#166534]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-4 inline-block text-sm font-medium text-[#166534] hover:underline flex-shrink-0">
                    View project →
                  </span>
                </div>
              </>
            )
            return isExternal ? (
              <a
                key={project.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {content}
              </a>
            ) : (
              <Link key={project.slug} href={href} className={cardClass}>
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
