import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { listVideos } from '../lib/firestore'
import { useLanguage } from '../i18n/LanguageContext'
import WorkCard from '../components/WorkCard'
import Seo from '../components/Seo'

function useGridCols({ base, sm, md, lg }) {
  const [cols, setCols] = useState(base)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1024) setCols(lg)
      else if (w >= 768) setCols(md ?? sm)
      else if (w >= 640) setCols(sm)
      else setCols(base)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [base, sm, md, lg])

  return cols
}

function VideoGrid({ items, size, columns, colConfig, showMoreLabel }) {
  const cols = useGridCols(colConfig)
  const [rows, setRows] = useState(2)

  useEffect(() => {
    setRows(2)
  }, [items])

  if (!items.length) return null

  const visibleCount = Math.min(items.length, cols * rows)
  const visible = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <div>
      <div className={`grid gap-3 sm:gap-4 ${columns}`}>
        {visible.map((work, i) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
          >
            <WorkCard work={work} size={size} layout="grid" />
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setRows((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:border-lime hover:text-lime"
          >
            {showMoreLabel}
            <ChevronDown className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}

function SectionHeader({ title, badge }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <h2 className="text-sm font-semibold md:text-base">{title}</h2>
      {badge && (
        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted">
          {badge}
        </span>
      )}
    </div>
  )
}

export default function Work() {
  const { t } = useLanguage()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    listVideos()
      .then(setVideos)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const videoItems = useMemo(
    () => videos.filter((v) => v.mediaType !== 'image'),
    [videos],
  )
  const imageItems = useMemo(
    () => videos.filter((v) => v.mediaType === 'image'),
    [videos],
  )

  const vertical = useMemo(
    () => videoItems.filter((v) => v.aspectRatio === '9:16'),
    [videoItems],
  )
  const landscape = useMemo(
    () => videoItems.filter((v) => v.aspectRatio === '16:9'),
    [videoItems],
  )
  const imagesVertical = useMemo(
    () => imageItems.filter((v) => v.aspectRatio === '9:16'),
    [imageItems],
  )
  const imagesLandscape = useMemo(
    () => imageItems.filter((v) => v.aspectRatio === '16:9'),
    [imageItems],
  )

  const filters = [
    { id: 'all', label: t.workPage.all },
    { id: '9:16', label: '9:16' },
    { id: '16:9', label: '16:9' },
    { id: 'images', label: t.workPage.images },
  ]

  const showVertical = filter === 'all' || filter === '9:16'
  const showLandscape = filter === 'all' || filter === '16:9'
  const showImages = filter === 'all' || filter === 'images'
  const showImageHeaders = filter === 'all' || filter === 'images'

  const empty =
    (showVertical ? vertical.length === 0 : true) &&
    (showLandscape ? landscape.length === 0 : true) &&
    (showImages ? imageItems.length === 0 : true)

  return (
    <section className="border-b border-line bg-[radial-gradient(circle_at_18%_12%,rgba(212,248,103,0.04),transparent_36%)]">
      <Seo title={t.seo.work.title} description={t.seo.work.description} path="/work" />
      <div className="container-pad py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <p className="label-caps mb-3 text-[11px] text-muted">{t.workPage.label}</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t.workPage.title}</h1>
          <p className="mt-3 text-base text-white/65">{t.workPage.subtitle}</p>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'border-lime bg-lime/5 text-lime'
                    : 'border-white/15 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {loading ? (
          <p className="mt-12 text-sm text-muted">Loading…</p>
        ) : empty ? (
          <p className="mt-12 text-sm text-muted">{t.workPage.empty}</p>
        ) : (
          <div className="mt-10 flex flex-col gap-12 md:gap-14">
            {showVertical && vertical.length > 0 && (
              <div>
                {filter === 'all' && (
                  <SectionHeader title={t.portfolio.shortTitle} badge="9:16" />
                )}
                <VideoGrid
                  items={vertical}
                  size="vertical"
                  columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  colConfig={{ base: 2, sm: 3, md: 4, lg: 5 }}
                  showMoreLabel={t.workPage.showMore}
                />
              </div>
            )}

            {showLandscape && landscape.length > 0 && (
              <div>
                {filter === 'all' && (
                  <SectionHeader title={t.portfolio.filmTitle} badge="16:9" />
                )}
                <VideoGrid
                  items={landscape}
                  size="landscape"
                  columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  colConfig={{ base: 1, sm: 2, md: 2, lg: 3 }}
                  showMoreLabel={t.workPage.showMore}
                />
              </div>
            )}

            {showImages && imagesVertical.length > 0 && (
              <div>
                {showImageHeaders && (
                  <SectionHeader title={t.workPage.images} badge="9:16" />
                )}
                <VideoGrid
                  items={imagesVertical}
                  size="vertical"
                  columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  colConfig={{ base: 2, sm: 3, md: 4, lg: 5 }}
                  showMoreLabel={t.workPage.showMore}
                />
              </div>
            )}

            {showImages && imagesLandscape.length > 0 && (
              <div>
                {showImageHeaders && (
                  <SectionHeader title={t.workPage.images} badge="16:9" />
                )}
                <VideoGrid
                  items={imagesLandscape}
                  size="landscape"
                  columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  colConfig={{ base: 1, sm: 2, md: 2, lg: 3 }}
                  showMoreLabel={t.workPage.showMore}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
