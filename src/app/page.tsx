import Link from 'next/link'
import { projects } from '@/content/projects'
import { basePath, splitTitle } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-24 md:pt-44 md:pb-32">
      <Reveal>
        <h1 className="font-serif text-ink text-[clamp(2.75rem,7vw,5rem)] leading-[1.02] tracking-[-0.02em]">
          Hi, I'm Sohan Lele.
        </h1>
      </Reveal>

      <div className="mt-10 md:mt-14 max-w-[62ch] space-y-6 text-[17px] md:text-[18px] leading-[1.65] text-pretty">
        <Reveal i={1}>
          <p className="text-ink">
            I'm a product design engineer in robotics and hardware. I design mechanisms and physical products, and I also build the perception and sensor-fusion side that makes them work: computer vision, signal processing, and state estimation.
          </p>
        </Reveal>
        <Reveal i={2}>
          <p>
            I like thinking through tradeoffs, especially where engineering decisions shape usability, reliability, and real-world performance. I enjoy working close to execution and taking on team leadership when needed, particularly in fast-moving or ambiguous environments.
          </p>
        </Reveal>
        <Reveal i={3}>
          <p>
            Outside of engineering, I spend a lot of time in the gym lifting and training MMA. I'm also building IRIX, an AI fitness coach that runs on the wearables people already own. You can learn more at{' '}
            <a href="https://tryirix.com/" target="_blank" rel="noopener noreferrer" className="link">
              tryirix.com
            </a>
            .
          </p>
        </Reveal>
        <Reveal i={4}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-md bg-ink px-5 py-2.5 text-[15px] text-canvas transition-transform duration-150 ease-out active:scale-[0.98]"
            >
              View projects
            </Link>
            <a
              href={basePath + '/files/sohan_lele_resume.pdf?v=3'}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-[15px]"
            >
              Resume
            </a>
          </div>
        </Reveal>
      </div>

      <section className="mt-24 md:mt-32" aria-labelledby="work-index">
        <Reveal>
          <h2 id="work-index" className="label">
            Work
          </h2>
        </Reveal>
        <ul className="mt-5 border-t border-line">
          {projects.map((project, i) => {
            const { kicker, name } = splitTitle(project.title, project.nameFirst)
            return (
              <li key={project.slug} className="border-b border-line">
                <Reveal i={Math.min(i, 6)}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="group flex items-baseline justify-between gap-6 py-4 md:py-5"
                  >
                    <span className="min-w-0">
                      <span className="font-serif text-[22px] md:text-[26px] leading-tight text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-ink">
                        {name}
                      </span>
                      {kicker && <span className="ml-3 text-[14px] text-muted">{kicker}</span>}
                    </span>
                    <span className="font-mono text-[12px] text-muted tabular-nums shrink-0">{project.year}</span>
                  </Link>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
