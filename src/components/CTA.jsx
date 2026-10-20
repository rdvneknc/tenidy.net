import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

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
          className="rounded-2xl bg-paper px-7 py-12 text-ink md:px-12 md:py-14"
        >
          <p className="label-caps mb-4 text-[11px] text-ink/45">{t.cta.label}</p>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]">
              {t.cta.title}
            </h2>
            <Link
              to="/contact"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-ink transition hover:brightness-95"
            >
              {t.cta.button}
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
