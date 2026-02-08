'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/content/projects'
import { basePath } from '@/lib/utils'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-14 border-t border-[#e0ddd8]">
      <h2 className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#166534] mb-6">
        {title}
      </h2>
      <div className="prose prose-neutral max-w-none">{children}</div>
    </section>
  )
}

function InlineImageBlock({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="py-10 -mx-5 sm:-mx-8">
      <div className="max-w-6xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={basePath + src}
          alt={alt}
          className="w-full h-auto block"
        />
      </div>
    </div>
  )
}

function InlineVideoBlock({ youtubeId }: { youtubeId: string }) {
  return (
    <div className="py-10">
      <div className="max-w-xl mx-auto">
        <div className="relative aspect-video overflow-hidden bg-[#0b0d12] rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}

function InlineLocalVideoBlock({ src }: { src: string }) {
  return (
    <div className="py-10 -mx-5 sm:-mx-8">
      <div className="max-w-3xl mx-auto">
        <div className="relative aspect-video overflow-hidden bg-[#0b0d12] rounded-lg">
          <video
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-contain"
          >
            <source src={basePath + src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudyClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      {/* Header */}
      <header className="pt-24 pb-16 md:pt-28 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/projects"
            className="text-xs text-[#4b5563] hover:text-[#166534] transition-colors mb-8 inline-block"
          >
            ← back to projects
          </Link>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#4b5563] mb-2">
            <span>{project.year}</span>
            {project.context && <span>{project.context}</span>}
            {project.role && <span>{project.role}</span>}
          </div>
          <h1 className="text-[30px] leading-tight sm:text-[34px] md:text-[40px] font-bold tracking-tight text-[#0b0d12]">
            {project.title}
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#374151] mt-4 leading-[1.7]">{project.oneLiner}</p>
          {project.links && project.links.length > 0 && (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-md bg-[#166534] text-white text-sm font-medium hover:bg-[#14502d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#166534] focus:ring-offset-2 focus:ring-offset-[#f7f6f3]"
            >
              {project.links[0].label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </header>

      {project.heroImage && (
        <div className="max-w-4xl mx-auto px-5 sm:px-8 mb-8">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={basePath + project.heroImage}
              alt={project.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>
      )}

      {/* Case study content */}
      <article className="max-w-2xl mx-auto px-5 sm:px-8 py-16">
        {project.problem && (
          <>
            <Section title="Problem">
              <p className="text-[#374151] leading-[1.7]">{project.problem}</p>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'problem')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'problem')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'problem')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.insight && (
          <>
            <Section title="Insight">
              <p className="text-[#374151] leading-[1.7]">{project.insight}</p>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'insight')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'insight')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'insight')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.solution && (
          <>
            <Section title="Solution">
              <p className="text-[#374151] leading-[1.7]">{project.solution}</p>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'solution')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'solution')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'solution')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.whatIBuilt && project.whatIBuilt.length > 0 && (
          <>
            <Section title="What I built">
              <ul className="list-none space-y-2 text-[#374151]">
                {project.whatIBuilt.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#9ca3af]">—</span>
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'whatIBuilt')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'whatIBuilt')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'whatIBuilt')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.decisions && project.decisions.length > 0 && (
          <>
            <Section title="Engineering + design decisions">
              <ul className="list-none space-y-2 text-[#374151]">
                {project.decisions.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#9ca3af]">—</span>
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'decisions')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'decisions')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'decisions')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.systemModes && project.systemModes.length > 0 && (
          <>
            <Section title="System modes">
              <div className="space-y-8">
                {project.systemModes.map((mode, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-medium text-[#0b0d12] mb-3">{mode.name}</h3>
                    <ul className="list-none space-y-2 text-[#374151]">
                      {mode.items.map((item, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-[#9ca3af]">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'systemModes')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'systemModes')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'systemModes')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.results && project.results.length > 0 && (
          <>
            <Section title="Results">
              <ul className="list-none space-y-2">
                {project.results.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#9ca3af]">—</span>
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'results')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'results')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'results')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.iteration && project.iteration.length > 0 && (
          <>
            <Section title="Iteration and failures">
              <ul className="list-none space-y-2 text-[#374151]">
                {project.iteration.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#9ca3af]">—</span>
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'iteration')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'iteration')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'iteration')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.outcome && (
          <>
            <Section title="Outcome">
              <p className="text-[#374151] leading-[1.7]">{project.outcome}</p>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'outcome')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'outcome')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'outcome')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.learnings && project.learnings.length > 0 && (
          <>
            <Section title="Learnings">
              <ul className="list-none space-y-2 text-[#374151]">
                {project.learnings.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#9ca3af]">—</span>
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'learnings')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'learnings')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'learnings')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.status && (
          <>
            <Section title="Current status">
              <p className="text-[#374151] leading-[1.7]">{project.status}</p>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'status')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'status')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'status')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        {project.nextSteps && project.nextSteps.length > 0 && (
          <>
            <Section title="What I'd do next">
              <ul className="list-none space-y-2 text-[#374151]">
                {project.nextSteps.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#9ca3af]">—</span>
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
            {project.inlineImages
              ?.filter((img) => img.after === 'nextSteps')
              .map((img, i) => (
                <InlineImageBlock key={i} src={img.src} alt={img.alt ?? project.title} />
              ))}
            {project.inlineVideos
              ?.filter((v) => v.after === 'nextSteps')
              .map((v, i) => (
                <InlineVideoBlock key={i} youtubeId={v.youtubeId} />
              ))}
            {project.inlineLocalVideos
              ?.filter((v) => v.after === 'nextSteps')
              .map((v, i) => (
                <InlineLocalVideoBlock key={i} src={v.src} />
              ))}
          </>
        )}

        <div className="pt-16 border-t border-[#e0ddd8] mt-16">
          <Link
            href="/projects"
            className="text-xs font-medium text-[#4b5563] hover:text-[#166534] transition-colors"
          >
            ← View all projects
          </Link>
        </div>
      </article>
    </div>
  )
}
