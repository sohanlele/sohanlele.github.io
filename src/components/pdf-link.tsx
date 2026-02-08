'use client'

import { Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PDFLinkProps {
  file: string
  title?: string
  className?: string
}

export function PDFLink({ file, title = "View PDF", className }: PDFLinkProps) {
  const downloadPDF = () => {
    const link = document.createElement('a')
    link.href = file
    link.download = file.split('/').pop() || 'document.pdf'
    link.click()
  }

  const openInNewTab = () => {
    window.open(file, '_blank')
  }

  return (
    <div className={cn('flex flex-col sm:flex-row gap-3', className)}>
      <button
        onClick={openInNewTab}
        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors space-x-2"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Open in New Tab</span>
      </button>
      <button
        onClick={downloadPDF}
        className="inline-flex items-center px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </button>
    </div>
  )
}
