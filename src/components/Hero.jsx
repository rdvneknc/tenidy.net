import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const BANNER_DESKTOP = '/hero-banner.jpg'
const BANNER_MOBILE = '/mobile.jpg'

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section className="relative overflow-hidden border-b border-line bg-ink">
      <div className="absolute inset-0 z-0">
        <img
          src={BANNER_MOBILE}
          alt=""
          className="h-full w-full object-cover object-[center_20%] brightness-[1.08] contrast-[1.02] md:hidden"
        />
        <img
          src={BANNER_DESKTOP}
          alt=""
          className="hidden h-full w-full object-cover object-center brightness-[1.08] contrast-[1.02] md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/55 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/65 via-black/35 to-black/10 md:block" />
      </div>

      <div className="relative z-10">
        <div className="container-pad flex min-h-[420px] items-center py-14 md:min-h-[480px] md:py-16 lg:min-h-[520px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="label-caps mb-4 text-[11px] text-white/70">{hero.label}</p>

            <h1 className="text-[2.5rem] leading-[0.98] font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.75rem]">
              {hero.titleBefore}{' '}
              <span className="text-lime">{hero.titleAccent}</span>
              {hero.titleAfter ? ` ${hero.titleAfter}` : ''}
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed font-normal text-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]">
              {hero.description}
            </p>

            <div className="mt-7">
              <Link
                to="/work"
                className="group inline-flex items-center gap-1 border-b border-white pb-0.5 text-sm font-medium transition hover:border-lime hover:text-lime"
              >
                {hero.explore}
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 bg-black/25 backdrop-blur-[2px]">
          <div className="container-pad flex flex-col gap-2 py-4 text-[11px] font-medium tracking-[0.2em] text-white/55 uppercase sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            {hero.strip.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
