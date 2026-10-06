import { basePath } from '@/lib/utils'

const resumePdf = basePath + '/files/sohan_lele_resume.pdf?v=4'

export default function ResumePage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
      <h1 className="font-serif text-ink text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.02em]">
        Resume
      </h1>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a
          href={resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-ink px-5 py-2.5 text-[15px] text-canvas transition-transform duration-150 ease-out active:scale-[0.98]"
        >
          Open PDF
        </a>
        <a href={resumePdf} download="Sohan_Lele_Resume.pdf" className="link text-[15px]">
          Download
        </a>
      </div>
      <div className="frame mt-12 overflow-hidden">
        <iframe
          src={resumePdf + '#toolbar=0&navpanes=0&view=FitH'}
          className="block h-[1100px] w-full border-0 bg-white"
          title="Sohan Lele resume"
        />
      </div>
    </div>
  )
}
