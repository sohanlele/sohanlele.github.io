'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f7f6f3] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <h1 className="text-[30px] leading-tight sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold tracking-tight text-[#0b0d12]">
            Resume
          </h1>
          <p className="mt-3 text-[12px] md:text-[13px] font-medium uppercase tracking-[0.12em] text-[#4b5563] leading-snug">
            Mechanical Engineer & Product Designer specializing in mechanisms and robotics.
          </p>
          <div className="mt-4 w-12 border-t border-[#e0ddd8]" aria-hidden />
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href="/files/sohan_lele_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#166534] text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-[15px]"
          >
            <ExternalLink className="mr-2 w-4 h-4" />
            Open in New Tab
          </a>
          <a
            href="/files/sohan_lele_resume.pdf"
            download="Sohan_Lele_Resume.pdf"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#e0ddd8] bg-white text-[#374151] rounded-lg hover:border-[#166534]/40 transition-colors font-medium text-[15px]"
          >
            <Download className="mr-2 w-4 h-4" />
            Download Resume
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg border border-[#e0ddd8] overflow-hidden"
        >
          <iframe
            src="/files/sohan_lele_resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            className="w-full h-[800px] border-0"
            title="Sohan Lele Resume"
          />
        </motion.div>

        <div className="mt-14 pt-8 border-t border-[#e0ddd8] text-center">
          <p className="text-[16px] text-[#374151] mb-4">
            Interested in working together?
          </p>
          <Link
            href="/contact"
            className="text-[#166534] font-medium hover:underline"
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  )
}
