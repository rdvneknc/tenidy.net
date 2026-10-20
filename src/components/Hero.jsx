import { ArrowUpRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const BANNER_SRC = '/hero-banner.jpg'

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      <div className="absolute inset-0 z-0">
        <img
          src={BANNER_SRC}
          alt=""
          className="h-full w-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10">
        <div className="container-pad flex min-h-[420px] items-center py-14 md:min-h-[480px] md:py-16 lg:min-h-[520px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="label-caps mb-4 text-[11px] text-white/55">{hero.label}</p>

            <h1 className="text-[2.5rem] leading-[0.98] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
              {hero.titleBefore}{' '}
              <span className="text-lime">{hero.titleAccent}</span>
              {hero.titleAfter ? ` ${hero.titleAfter}` : ''}
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed font-normal text-white/75">
              {hero.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                to="/#products"
                className="group inline-flex items-center gap-1 border-b border-white pb-0.5 text-sm font-medium transition hover:border-lime hover:text-lime"
              >
                {hero.explore}
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                type="button"
                className="inline-flex items-center gap-3 text-sm font-medium text-white/90 transition hover:text-lime"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm">
                  <Play className="size-3.5 fill-current" />
                </span>
                {hero.showreel}
              </button>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-pad flex flex-col gap-2 py-4 text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            {hero.strip.map((item, i) => (
              <div key={item} className="contents sm:flex sm:items-center sm:gap-6">
                {i > 0 && <span className="hidden text-white/20 sm:inline">/</span>}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
