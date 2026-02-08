'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Download, 
  ExternalLink,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PDFSlideshowProps {
  file: string
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function PDFSlideshow({ 
  file, 
  className, 
  autoPlay = true, 
  autoPlayInterval = 8000 
}: PDFSlideshowProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [timeUntilNext, setTimeUntilNext] = useState(autoPlayInterval)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || totalPages <= 1) return

    const interval = setInterval(() => {
      setCurrentPage(prev => prev >= totalPages ? 1 : prev + 1)
      setTimeUntilNext(autoPlayInterval)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, totalPages, autoPlayInterval])

  // Countdown timer
  useEffect(() => {
    if (!isPlaying || totalPages <= 1) return

    const timer = setInterval(() => {
      setTimeUntilNext(prev => {
        if (prev <= 1000) {
          return autoPlayInterval
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, totalPages, autoPlayInterval])

  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => prev <= 1 ? totalPages : prev - 1)
  }, [totalPages])

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => prev >= totalPages ? 1 : prev + 1)
  }, [totalPages])

  const togglePlayPause = () => {
    setIsPlaying(prev => !prev)
  }

  const resetView = () => {
    setScale(1)
    setRotation(0)
  }

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0))
  }

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5))
  }

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const downloadPDF = () => {
    const link = document.createElement('a')
    link.href = file
    link.download = file.split('/').pop() || 'document.pdf'
    link.click()
  }

  const openInNewTab = () => {
    window.open(file, '_blank')
  }

  // Handle PDF iframe load
  const handleIframeLoad = () => {
    setIsLoading(false)
    setTotalPages(10) // Default fallback
  }

  const handleIframeError = () => {
    setError('Failed to load PDF')
    setIsLoading(false)
  }

  if (error) {
    return (
      <div className={cn('flex flex-col items-center justify-center p-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl', className)}>
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load PDF</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              The document couldn't be displayed in the viewer. You can still access it using the options below.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openInNewTab}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 space-x-2 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in New Tab</span>
            </button>
            <button
              onClick={downloadPDF}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-600 transition-all duration-200 space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative group', className)}>
      {/* Minimal Controls - Apple Style */}
      <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center space-x-2 bg-gray-800/90 backdrop-blur-xl rounded-2xl px-4 py-2 shadow-lg border border-gray-700/20">
          <button
            onClick={goToPrevPage}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-gray-300" /> : <Play className="w-4 h-4 text-gray-300" />}
          </button>
          
          <button
            onClick={goToNextPage}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
          
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          <button
            onClick={zoomOut}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-gray-300" />
          </button>
          
          <span className="text-xs text-gray-400 min-w-[2rem] text-center font-medium">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={zoomIn}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-gray-300" />
          </button>
          
          <button
            onClick={rotate}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title="Rotate"
          >
            <RotateCcw className="w-4 h-4 text-gray-300" />
          </button>
          
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          <button
            onClick={openInNewTab}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4 text-gray-300" />
          </button>
          
          <button
            onClick={downloadPDF}
            className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
            title="Download PDF"
          >
            <Download className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* PDF Display - Apple Style */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="relative">
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-300">Loading document...</p>
              </div>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-none">
                <iframe
                  src={`${file}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=FitH`}
                  className="w-full h-[700px] border-0"
                  style={{ width: '100%', minWidth: '100%' }}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title={`PDF Page ${currentPage}`}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Minimal Progress Indicator - Apple Style */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-3 bg-gray-800/80 backdrop-blur-xl rounded-2xl px-4 py-2 shadow-lg border border-gray-700/20">
            <span className="text-xs text-gray-400 font-medium">
              {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all duration-200',
                    currentPage === i + 1 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  )}
                />
              ))}
              {totalPages > 8 && (
                <span className="text-xs text-gray-400 ml-2">
                  +{totalPages - 8}
                </span>
              )}
            </div>
            {isPlaying && (
                <div className="flex items-center space-x-2 ml-3 pl-3 border-l border-gray-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">
                  Next in {Math.ceil(timeUntilNext / 1000)}s
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
