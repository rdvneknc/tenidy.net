import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { listVideos } from '../lib/firestore'
import WorkCard from './WorkCard'

function MediaRow({ title, badge, items, size }) {
  const scrollerRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanPrev(scrollLeft > 4)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows, items.length])

  const scrollBy = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.7) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  if (!items.length) return null

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-semibold md:text-base">{title}</h3>
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted">
            {badge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            disabled={!canPrev}
            onClick={() => scrollBy(-1)}
            className={`inline-flex size-8 items-center justify-center rounded-full border transition md:size-9 ${
              canPrev
                ? 'border-white/25 text-white hover:border-lime hover:text-lime'
                : 'cursor-default border-white/10 text-white/25'
            }`}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            disabled={!canNext}
            onClick={() => scrollBy(1)}
            className={`inline-flex size-8 items-center justify-center rounded-full border transition md:size-9 ${
              canNext
                ? 'border-lime text-lime hover:bg-lime hover:text-ink'
                : 'cursor-default border-white/10 text-white/25'
            }`}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 transition-opacity duration-300 md:w-24 ${
            canPrev ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.85) 28%, rgba(0,0,0,0.35) 62%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 transition-opacity duration-300 md:w-24 ${
            canNext ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(270deg, #000 0%, rgba(0,0,0,0.85) 28%, rgba(0,0,0,0.35) 62%, transparent 100%)',
          }}
        />

        <div
          ref={scrollerRef}
          className="scrollbar-hide flex gap-3 overflow-x-auto px-0.5 py-0.5 md:gap-3.5"
        >
          {items.map((work) => (
            <WorkCard key={work.id} work={work} size={size} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    listVideos({ homeOnly: true })
      .then(setVideos)
      .catch(console.error)
  }, [])

  const verticalWorks = videos.filter(
    (v) => v.mediaType !== 'image' && v.aspectRatio === '9:16',
  )
  const landscapeWorks = videos.filter(
    (v) => v.mediaType !== 'image' && v.aspectRatio === '16:9',
  )

  return (
    <section id="products" className="border-b border-line bg-ink-soft py-9 md:py-12">
      <div className="container-pad">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="label-caps mb-1.5 text-[11px] text-muted">{t.portfolio.label}</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.portfolio.title}</h2>
            <p className="mt-1.5 text-sm font-normal text-muted md:text-[15px]">
              {t.portfolio.subtitle}
            </p>
          </div>

          <Link
            to="/work"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:border-lime hover:text-lime"
          >
            {t.portfolio.viewAll}
            <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
          </Link>
        </div>

        <div className="flex flex-col gap-6 md:gap-7">
          <MediaRow
            title={t.portfolio.shortTitle}
            badge="9:16"
            items={verticalWorks}
            size="vertical"
          />
          <MediaRow
            title={t.portfolio.filmTitle}
            badge="16:9"
            items={landscapeWorks}
            size="landscape"
          />
        </div>
      </div>
    </section>
  )
}
