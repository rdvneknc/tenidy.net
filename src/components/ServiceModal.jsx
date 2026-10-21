import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ServiceModal({ item, image, icon: Icon, open, onClose, ctaLabel }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/12 bg-[#0c0c0c] shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:rounded-2xl"
          >
            <div className="relative shrink-0">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="aspect-[21/9] w-full object-cover sm:aspect-[16/7]"
                />
              ) : (
                <div className="aspect-[21/9] bg-[#141414] sm:aspect-[16/7]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-black/20" />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition hover:border-lime hover:text-lime"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="mb-4 flex items-center gap-2.5">
                {Icon && <Icon className="size-5 shrink-0 text-lime" strokeWidth={1.6} />}
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{item.title}</h2>
              </div>

              <div className="space-y-4">
                {(item.details || []).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-sm leading-relaxed text-white/70 sm:text-[15px] sm:leading-[1.7]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 shrink-0 border-t border-white/10 pt-5">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-95"
                >
                  {ctaLabel}
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
