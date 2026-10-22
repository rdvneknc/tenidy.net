import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const CTA_BG = '/ekiworks-cta-5x1.webp'

export default function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-10 md:py-14">
      <div className="container-pad">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-white/10"
        >
          <img
            src={CTA_BG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15 md:from-black/70 md:via-black/35 md:to-transparent" />

          <div className="relative px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14">
            <span
              aria-hidden
              className="absolute top-0 left-6 h-[2px] w-14 rounded-full bg-lime sm:left-8 md:left-12"
            />

            <p className="label-caps mb-3 text-[11px] text-white/55">{t.cta.label}</p>
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                {t.cta.title}
              </h2>
              <Link
                to="/contact"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-white/90"
              >
                {t.cta.button}
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
