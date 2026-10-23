import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { ensureSeedWebsites } from '../lib/firestore'
import { mediaSrc } from '../lib/media'
import { useLanguage } from '../i18n/LanguageContext'
import Seo from '../components/Seo'

function hostname(url = '') {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function WebsiteCard({ site, index }) {
  const host = hostname(site.url)
  const isExternal = /^https?:\/\//i.test(site.url)

  return (
    <motion.a
      href={site.url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:border-lime/35 hover:shadow-[0_28px_60px_rgba(0,0,0,0.45)]"
    >
      {/* Browser chrome */}
      <div className="border-b border-white/8 bg-[#121212] px-3 pt-3 pb-0">
        <div className="mb-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-1 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/8 bg-black/40 px-2.5 py-1">
            <ExternalLink className="size-3 shrink-0 text-white/30" />
            <span className="truncate text-[10px] tracking-wide text-white/45">{host}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-t-lg border border-b-0 border-white/8 bg-[#0a0a0a]">
          <div className="aspect-[16/10] overflow-hidden">
            {site.thumbnail ? (
              <img
                src={mediaSrc(site.thumbnail)}
                alt=""
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#141414] text-sm text-muted">
                {site.title}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {site.tag && (
              <p className="mb-1.5 text-[10px] font-medium tracking-[0.18em] text-lime/80 uppercase">
                {site.tag}
              </p>
            )}
            <h2 className="truncate text-lg font-semibold tracking-tight text-white">
              {site.title}
            </h2>
          </div>
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function Websites() {
  const { t } = useLanguage()
  const page = t.websitesPage
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ensureSeedWebsites()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="border-b border-line bg-[radial-gradient(circle_at_82%_8%,rgba(212,248,103,0.06),transparent_32%),radial-gradient(circle_at_12%_40%,rgba(255,255,255,0.03),transparent_40%)]">
      <Seo title={t.seo.websites.title} description={t.seo.websites.description} path="/websites" />
      <div className="container-pad py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <p className="label-caps mb-3 text-[11px] text-muted">{page.label}</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{page.title}</h1>
          <p className="mt-3 text-base text-white/65">{page.subtitle}</p>
        </motion.div>

        {loading ? (
          <p className="mt-12 text-sm text-muted">Loading…</p>
        ) : !items.length ? (
          <p className="mt-12 text-sm text-muted">{page.empty}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((site, i) => (
              <WebsiteCard key={site.id} site={site} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
