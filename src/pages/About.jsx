import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import Seo from '../components/Seo'

export default function About() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <section className="border-b border-line">
      <Seo title={t.seo.about.title} description={t.seo.about.description} path="/about" />
      <div className="container-pad py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <p className="label-caps mb-3 text-[11px] text-muted">{about.label}</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.25rem]">
            {about.title} <span className="text-lime">{about.titleAccent}</span>
          </h1>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_220px] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-y-6"
          >
            {about.paragraphs.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-base leading-relaxed font-normal text-white/75 md:text-[17px] md:leading-[1.75]"
              >
                {p}
              </p>
            ))}

            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-ink transition hover:brightness-95"
            >
              {about.cta}
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </Link>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="flex flex-row gap-4 lg:flex-col lg:gap-0 lg:border-l lg:border-line lg:pl-8"
          >
            {about.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-5 ${
                  i < about.stats.length - 1 ? 'lg:border-b lg:border-line' : ''
                }`}
              >
                <p className="text-2xl font-bold tracking-tight text-lime md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium tracking-[0.14em] text-muted uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
