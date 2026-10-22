import { useEffect, useMemo, useRef, useState } from 'react'
import { Maximize2, Play } from 'lucide-react'
import {
  fetchVimeoThumbnail,
  getVideoPreview,
  parseVideoId,
  resolveWorkThumbnail,
} from '../lib/videoPreview'
import VideoModal from './VideoModal'

export default function WorkCard({ work, size = 'landscape', layout = 'scroll' }) {
  const isVertical = size === 'vertical'
  const isGrid = layout === 'grid'
  const isImage = work.mediaType === 'image'
  const preview = useMemo(
    () => (isImage ? null : getVideoPreview(work.videoUrl)),
    [isImage, work.videoUrl],
  )
  const initialThumb = useMemo(() => resolveWorkThumbnail(work), [work])
  const [thumb, setThumb] = useState(initialThumb)
  const [hover, setHover] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [open, setOpen] = useState(false)
  const timerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    setThumb(initialThumb)
  }, [initialThumb])

  useEffect(() => {
    if (isImage || work.thumbnail) return undefined
    const parsed = parseVideoId(work.videoUrl)
    if (parsed?.provider !== 'vimeo') return undefined
    let cancelled = false
    fetchVimeoThumbnail(work.videoUrl).then((url) => {
      if (!cancelled && url) setThumb(url)
    })
    return () => {
      cancelled = true
    }
  }, [isImage, work.thumbnail, work.videoUrl])

  useEffect(() => {
    if (!isImage && hover && preview && !open) {
      timerRef.current = window.setTimeout(() => setShowPreview(true), 180)
    } else {
      window.clearTimeout(timerRef.current)
      setShowPreview(false)
    }
    return () => window.clearTimeout(timerRef.current)
  }, [hover, preview, open, isImage])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (showPreview) {
      el.currentTime = 0
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [showPreview])

  const openModal = () => {
    setShowPreview(false)
    setHover(false)
    setOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className={`group block cursor-pointer rounded-2xl border border-white/12 bg-white/[0.02] p-2 text-left transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.04] ${
          isGrid
            ? 'w-full'
            : isVertical
              ? 'w-[152px] shrink-0 sm:w-[168px] md:w-[184px]'
              : 'w-[260px] shrink-0 sm:w-[300px] md:w-[340px]'
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-xl bg-[#1a1a1a] ${
            isVertical ? 'aspect-[9/16]' : 'aspect-video'
          }`}
        >
          {thumb ? (
            <img
              src={thumb}
              alt={work.title || ''}
              className={`h-full w-full object-cover transition duration-500 ${
                showPreview ? 'opacity-0' : 'opacity-100 group-hover:scale-[1.02]'
              }`}
              loading="lazy"
              draggable={false}
              onError={(e) => {
                if (isImage) return
                const id = parseVideoId(work.videoUrl)?.id
                if (id && !e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = '1'
                  e.currentTarget.src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
                }
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-xs text-muted">
              {work.title || '—'}
            </div>
          )}

          {showPreview && preview?.type === 'iframe' && (
            <iframe
              title={work.title}
              src={preview.src}
              className="pointer-events-none absolute inset-0 h-full w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              loading="eager"
            />
          )}

          {showPreview && preview?.type === 'file' && (
            <video
              ref={videoRef}
              src={preview.src}
              muted
              loop
              playsInline
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity ${
              showPreview ? 'opacity-40' : 'opacity-100'
            }`}
          />

          <span
            className={`absolute bottom-2.5 left-2.5 inline-flex size-7 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition ${
              showPreview
                ? 'opacity-0'
                : 'opacity-100 group-hover:border-lime/60 group-hover:bg-lime group-hover:text-ink'
            }`}
          >
            {isImage ? (
              <Maximize2 className="size-3" />
            ) : (
              <Play className="size-3 fill-current" />
            )}
          </span>

          {!isImage && work.duration && (
            <span
              className={`absolute right-2.5 bottom-2.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm transition ${
                showPreview ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {work.duration}
            </span>
          )}
        </div>

        {!isImage && work.title && (
          <div className="mt-2 px-0.5 pb-0.5">
            <h4 className="truncate text-sm font-semibold text-white">{work.title}</h4>
          </div>
        )}
      </button>

      <VideoModal work={work} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
