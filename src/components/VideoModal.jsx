import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { mediaSrc } from '../lib/media'
import { getVideoWatchEmbed, resolveWorkThumbnail } from '../lib/videoPreview'

export default function VideoModal({ work, open, onClose }) {
  const { t } = useLanguage()
  const isImage = work?.mediaType === 'image'
  const embed = !isImage && work ? getVideoWatchEmbed(work.videoUrl) : null
  const imageSrc = isImage && work ? mediaSrc(resolveWorkThumbnail(work) || work.thumbnail) : ''
  const isVertical = work?.aspectRatio === '9:16'
  const tagLabel =
    (work?.videoType && t.mediaTags?.[work.videoType]) || work?.videoType || ''

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
      {open && work && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
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
            aria-label={work.title || (isImage ? 'Image' : 'Video')}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22 }}
            className={`relative z-10 overflow-hidden rounded-2xl border border-white/12 bg-[#0c0c0c] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${
              isVertical ? 'w-[min(400px,92vw)]' : 'w-[min(1080px,96vw)]'
            }`}
          >
            {isImage ? (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 z-20 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 backdrop-blur-sm transition hover:border-lime hover:text-lime"
              >
                <X className="size-4" />
              </button>
            ) : (
              <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{work.title}</p>
                  <p className="truncate text-[10px] tracking-[0.16em] text-muted uppercase">
                    {[tagLabel, work.duration].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-lime hover:text-lime"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}

            <div
              className="relative bg-black"
              style={
                isVertical
                  ? { aspectRatio: '9 / 16', maxHeight: '78vh', width: '100%' }
                  : { aspectRatio: '16 / 9', width: '100%' }
              }
            >
              {isImage && imageSrc && (
                <img
                  src={imageSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                />
              )}
              {isImage && !imageSrc && (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
                  Görsel bulunamadı.
                </div>
              )}
              {!isImage && embed?.type === 'iframe' && (
                <iframe
                  title={work.title}
                  src={embed.src}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
              {!isImage && embed?.type === 'file' && (
                <video
                  src={embed.src}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain"
                />
              )}
              {!isImage && !embed && (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted">
                  Bu video bağlantısı önizlenemiyor.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
