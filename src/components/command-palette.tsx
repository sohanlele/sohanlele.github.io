'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, User, Briefcase, Mail, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const commands = [
  { id: 'home', title: 'Home', href: '/', icon: FileText },
  { id: 'projects', title: 'Projects', href: '/projects', icon: Briefcase },
  { id: 'discipline', title: 'Discipline', href: '/discipline', icon: FileText },
  { id: 'about', title: 'About', href: '/about', icon: User },
  { id: 'resume', title: 'Resume', href: '/resume', icon: Download },
  { id: 'contact', title: 'Contact', href: '/contact', icon: Mail },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const filteredCommands = commands.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleSelect = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }

  const handleKeyDownInternal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex].href)
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground mr-3" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDownInternal}
                  className="flex-1 bg-transparent outline-none text-sm"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-muted text-xs rounded">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No results found
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredCommands.map((command, index) => (
                      <motion.button
                        key={command.id}
                        onClick={() => handleSelect(command.href)}
                        className={cn(
                          'w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-colors',
                          index === selectedIndex && 'bg-muted'
                        )}
                        whileHover={{ x: 4 }}
                      >
                        <command.icon className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {command.title}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Navigate with ↑↓ and press Enter to select</span>
                  <div className="flex items-center space-x-4">
                    <kbd className="inline-flex items-center px-1.5 py-0.5 bg-muted rounded text-xs">
                      ⌘K
                    </kbd>
                    <span>to open</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
