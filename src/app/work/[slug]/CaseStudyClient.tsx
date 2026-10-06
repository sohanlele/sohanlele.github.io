'use client'

import Link from 'next/link'
import type { Project } from '@/content/projects'
import { basePath, splitTitle } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

type SectionKey =
  | 'problem'
  | 'insight'
  | 'solution'
  | 'whatIBuilt'
  | 'decisions'
  | 'systemModes'
  | 'results'
  | 'iteration'
  | 'outcome'
  | 'learnings'
  | 'status'
  | 'nextSteps'

const sections: { key: SectionKey; title: string }[] = [
  { key: 'problem', title: 'Problem' },
  { key: 'insight', title: 'Insight' },
  { key: 'solution', title: 'Solution' },
  { key: 'whatIBuilt', title: 'What I built' },
  { key: 'decisions', title: 'Decisions' },
  { key: 'systemModes', title: 'How it works' },
  { key: 'results', title: 'Results' },
  { key: 'iteration', title: 'Iteration' },
  { key: 'outcome', title: 'Outcome' },
  { key: 'learnings', title: 'Learnings' },
  { key: 'status', title: 'Status' },
  { key: 'nextSteps', title: 'Next' },
]

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[1.25rem_1fr] text-pretty">
          <span aria-hidden className="mt-[0.72em] h-px w-2.5 bg-muted/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Images and videos attached to one section. Two or more images flow into two columns. */
function Media({ project, after }: { project: Project; after: SectionKey }) {
  const images = project.inlineImages?.filter((m) => m.after === after) ?? []
  const youtube = project.inlineVideos?.filter((m) => m.after === after) ?? []
  const local = project.inlineLocalVideos?.filter((m) => m.after === after) ?? []
  if (images.length + youtube.length + local.length === 0) return null

  return (
    <div className="mt-10 space-y-6">
      {images.length > 0 && (
        <div className={images.length > 1 ? 'sm:columns-2 gap-5 [&>*]:mb-5' : ''}>
          {images.map((img, i) => (
            <figure key={i} className="break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={basePath + img.src}
                alt={img.alt ?? project.title}
                loading="lazy"
                className={`frame block h-auto ${
                  images.length > 1 ? 'w-full' : 'mx-auto max-h-[560px] w-auto max-w-full'
                }`}
              />
              {img.alt && (
                <figcaption aria-hidden className="mt-2.5 text-[13px] leading-[1.5] text-muted text-pretty">
                  {img.alt}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {youtube.map((v, i) => (
        <div key={i} className="frame relative aspect-video overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${v.youtubeId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ))}

      {local.length > 0 && (
        <div className={local.length > 1 ? 'grid gap-5 sm:grid-cols-2' : ''}>
          {local.map((v, i) => (
            <figure key={i}>
              <div className="frame relative aspect-video overflow-hidden bg-ink">
                <video controls playsInline preload="metadata" className="absolute inset-0 h-full w-full object-contain">
                  <source src={basePath + v.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {v.caption && <figcaption className="mt-2.5 text-[13px] text-muted">{v.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}

function SectionBody({ project, k }: { project: Project; k: SectionKey }) {
  const value = project[k]
  if (typeof value === 'string') return <p className="text-pretty">{value}</p>
  if (k === 'systemModes' && project.systemModes) {
    return (
      <div className="space-y-9">
        {project.systemModes.map((mode, i) => (
          <div key={i}>
            <h3 className="mb-3.5 text-[15px] font-medium text-ink">{mode.name}</h3>
            <Bullets items={mode.items} />
          </div>
        ))}
      </div>
    )
  }
  return <Bullets items={value as string[]} />
}

export default function CaseStudyClient({ project }: { project: Project }) {
  const { kicker, name } = splitTitle(project.title, project.nameFirst)
  const link = project.links?.[0]
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Timeline', value: project.context },
    { label: 'Focus', value: project.tags?.slice(0, 5).join(' · ') },
  ].filter((f) => f.value)

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-24 md:pt-36 md:pb-32">
      <header>
        <Reveal>
          <Link href="/projects" className="label transition-colors duration-200 hover:text-ink">
            ← Projects
          </Link>
          {kicker && <p className="mt-10 text-[17px] text-muted">{kicker}</p>}
          <h1
            className={`${
              kicker ? 'mt-2' : 'mt-10'
            } max-w-[18ch] font-serif text-ink text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.02em]`}
          >
            {name}
          </h1>
        </Reveal>
        <Reveal i={1}>
          <p className="mt-7 max-w-[60ch] text-[19px] md:text-[21px] leading-[1.5] text-ink text-pretty">
            {project.oneLiner}
          </p>
          {link && (
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center rounded-md bg-ink px-5 py-2.5 text-[15px] text-canvas transition-transform duration-150 ease-out active:scale-[0.98]"
            >
              {link.label}
            </a>
          )}
        </Reveal>
        <Reveal i={2}>
          <dl className="mt-12 grid gap-x-10 gap-y-6 border-y border-line py-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="label">{f.label}</dt>
                <dd className="mt-2 text-[14px] leading-[1.55] text-body">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {project.heroImage && (
        <Reveal i={3} className="mt-12 md:mt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={basePath + project.heroImage}
            alt=""
            className="frame mx-auto block h-auto max-h-[640px] w-auto max-w-full"
          />
        </Reveal>
      )}

      <article className="mt-8 md:mt-12">
        {sections.map(({ key, title }) => {
          const value = project[key]
          if (!value || (Array.isArray(value) && value.length === 0)) return null
          return (
            <section
              key={key}
              className="grid gap-x-12 gap-y-5 border-t border-line py-12 md:grid-cols-[9.5rem_minmax(0,1fr)] md:py-16 first:border-t-0"
            >
              <h2 className="label md:sticky md:top-24 md:self-start md:pt-1.5">{title}</h2>
              <Reveal>
                <div className="max-w-[68ch] text-[17px] leading-[1.65] text-body">
                  <SectionBody project={project} k={key} />
                </div>
                <Media project={project} after={key} />
              </Reveal>
            </section>
          )
        })}
      </article>

      <div className="mt-8 border-t border-line pt-10">
        <Link href="/projects" className="link text-[15px]">
          All projects
        </Link>
      </div>
    </div>
  )
}
