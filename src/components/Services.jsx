import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  CalendarDays,
  Clapperboard,
  Gamepad2,
  ImageIcon,
  Play,
  ScanFace,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const ICONS = {
  'game-app-ads': Gamepad2,
  'ai-commercials': Clapperboard,
  'ai-ugc': ScanFace,
  'social-content': Play,
  'ai-visuals': ImageIcon,
  'social-mgmt': CalendarDays,
}

export default function Services() {
  const { t } = useLanguage()
  const items = t.servicesPage.items

  return (
    <section id="services" className="border-b border-line py-10 md:py-16">
      <div className="container-pad">
        <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-caps mb-2 text-[11px] text-muted">{t.services.label}</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.services.title}</h2>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:border-lime hover:text-lime"
          >
            {t.services.viewAll}
            <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-2">
          {items.map((service, i) => {
            const Icon = ICONS[service.id] || Clapperboard
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
                className="border-b border-line py-4 last:border-b-0 sm:border-b lg:py-6"
              >
                <div className="flex items-center justify-between gap-3 md:mb-2.5">
                  <h3 className="text-base font-semibold tracking-tight md:text-lg">
                    {service.title}
                  </h3>
                  <Icon className="size-5 shrink-0 text-lime" strokeWidth={1.5} />
                </div>
                <p className="hidden text-sm leading-relaxed text-muted md:block">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
