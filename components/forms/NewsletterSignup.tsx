'use client'

// ─── Newsletter Signup ────────────────────────────────────────────────────────
// React Hook Form + Zod validation.
// Submits to a Next.js Server Action that inserts into Supabase.

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { subscribeToNewsletter } from '@/app/actions/newsletter'
import { cn } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormData = z.infer<typeof schema>

interface NewsletterSignupProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function NewsletterSignup({ variant = 'dark', className }: NewsletterSignupProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const result = await subscribeToNewsletter(data.email)
      if (result.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
        setErrorMsg(result.message)
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  const isDark = variant === 'dark'

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          // ── Success state ───────────────────────────────────────────────────
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 text-center py-6"
          >
            <CheckCircle className="w-12 h-12 text-glory-gold" aria-hidden="true" />
            <p className={cn('font-display text-xl font-semibold', isDark ? 'text-white' : 'text-navy-dark')}>
              Welcome, Patriot!
            </p>
            <p className={cn('font-body text-sm', isDark ? 'text-white/60' : 'text-gray-500')}>
              You're now part of a community celebrating the greatest nation on Earth.
            </p>
          </motion.div>
        ) : (
          // ── Form state ──────────────────────────────────────────────────────
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Newsletter signup form"
          >
            <div className="flex gap-2">
              {/* Email input */}
              <div className="relative flex-1">
                <Mail
                  className={cn(
                    'absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none',
                    isDark ? 'text-white/40' : 'text-gray-400'
                  )}
                  aria-hidden="true"
                />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl font-body text-sm',
                    'border transition-all duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-glory-gold/50',
                    isDark
                      ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-glory-gold'
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-glory-gold',
                    errors.email && 'border-glory-red focus:ring-glory-red/30'
                  )}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="gold"
                size="md"
                loading={isSubmitting}
                iconRight={!isSubmitting ? <ArrowRight className="w-4 h-4" /> : undefined}
              >
                Join
              </Button>
            </div>

            {/* Error messages */}
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  id="email-error"
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 mt-2 font-body text-xs text-glory-red-light"
                >
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {errors.email.message}
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 mt-2 font-body text-xs text-glory-red-light"
                >
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <p className={cn('font-body text-xs mt-3', isDark ? 'text-white/30' : 'text-gray-400')}>
              No spam. Unsubscribe anytime. We celebrate America, not your inbox.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
