import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { listVideos } from '../lib/firestore'
import { useLanguage } from '../i18n/LanguageContext'
import WorkCard from '../components/WorkCard'

function VideoGrid({ items, size, columns }) {
  if (!items.length) return null

  return (
    <div className={`grid gap-3 sm:gap-4 ${columns}`}>
      {items.map((work, i) => (
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
  )
}

export default function Work() {
  const { t } = useLanguage()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [ratio, setRatio] = useState('all')

  useEffect(() => {
    listVideos()
      .then(setVideos)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const vertical = useMemo(
    () => videos.filter((v) => v.aspectRatio === '9:16'),
    [videos],
  )
  const landscape = useMemo(
    () => videos.filter((v) => v.aspectRatio === '16:9'),
    [videos],
  )

  const filters = [
    { id: 'all', label: t.workPage.all },
    { id: '9:16', label: '9:16' },
    { id: '16:9', label: '16:9' },
  ]

  const showVertical = ratio === 'all' || ratio === '9:16'
  const showLandscape = ratio === 'all' || ratio === '16:9'
  const empty =
    (showVertical ? vertical.length === 0 : true) &&
    (showLandscape ? landscape.length === 0 : true)

  return (
    <section className="border-b border-line bg-[radial-gradient(circle_at_18%_12%,rgba(212,248,103,0.04),transparent_36%)]">
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
            const active = ratio === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setRatio(f.id)}
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
                {ratio === 'all' && (
                  <div className="mb-4 flex items-center gap-2.5">
                    <h2 className="text-sm font-semibold md:text-base">
                      {t.portfolio.shortTitle}
                    </h2>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted">
                      9:16
                    </span>
                  </div>
                )}
                <VideoGrid
                  items={vertical}
                  size="vertical"
                  columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                />
              </div>
            )}

            {showLandscape && landscape.length > 0 && (
              <div>
                {ratio === 'all' && (
                  <div className="mb-4 flex items-center gap-2.5">
                    <h2 className="text-sm font-semibold md:text-base">
                      {t.portfolio.filmTitle}
                    </h2>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-muted">
                      16:9
                    </span>
                  </div>
                )}
                <VideoGrid
                  items={landscape}
                  size="landscape"
                  columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
