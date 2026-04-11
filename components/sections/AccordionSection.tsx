'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  question: string
  answer: string | React.ReactNode
}

interface AccordionSectionProps {
  items: AccordionItem[]
  title?: string
  className?: string
  dark?: boolean
  allowMultiple?: boolean
}

export function AccordionSection({
  items,
  title,
  className,
  dark = true,
  allowMultiple = false,
}: AccordionSectionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={cn('space-y-2', className)}>
      {title && (
        <h3 className={cn('mb-6 font-display text-h3', dark ? 'text-white' : 'text-navy-dark')}>
          {title}
        </h3>
      )}

      {items.map((item) => {
        const isOpen = openIds.has(item.id)

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-xl border transition-colors duration-200',
              dark
                ? isOpen
                  ? 'border-glory-gold/30 bg-navy-light'
                  : 'border-white/10 bg-navy-light/50 hover:border-white/20'
                : isOpen
                  ? 'border-glory-blue/30 bg-white'
                  : 'border-parchment-dark bg-white hover:border-glory-blue/30'
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              className={cn(
                'flex w-full items-center justify-between gap-4 px-5 py-4 text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
                dark ? 'focus-visible:ring-glory-gold' : 'focus-visible:ring-glory-blue'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-header-${item.id}`}
            >
              <span
                className={cn(
                  'font-body text-base font-semibold leading-snug',
                  dark
                    ? isOpen ? 'text-glory-gold' : 'text-white'
                    : isOpen ? 'text-glory-blue' : 'text-navy-dark'
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                  dark
                    ? isOpen ? 'border-glory-gold/40 bg-glory-gold/20 text-glory-gold' : 'border-white/20 text-white/50'
                    : isOpen ? 'border-glory-blue/30 bg-glory-blue/15 text-glory-blue' : 'border-parchment-dark text-navy-mid/45'
                )}
                aria-hidden="true"
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-header-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn('px-5 pb-5 pt-0 font-body text-base leading-relaxed', dark ? 'text-white/65' : 'text-navy-mid/70')}>
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
