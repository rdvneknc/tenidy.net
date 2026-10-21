import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  CalendarDays,
  Clapperboard,
  Gamepad2,
  ImageIcon,
  Play,
  ScanFace,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import ServiceModal from '../components/ServiceModal'

const ICONS = {
  'game-app-ads': Gamepad2,
  'ai-commercials': Clapperboard,
  'ai-ugc': ScanFace,
  'social-content': Play,
  'ai-visuals': ImageIcon,
  'social-mgmt': CalendarDays,
}

const MEDIA = {
  'game-app-ads': '/gameapp.jpg',
  'ai-commercials': '/aicommercials.jpg',
  'ai-ugc': '/aiucg.jpg',
  'social-content': '/socialmediacontent.jpg',
  'ai-visuals': '/aivisualproductimagery.jpg',
  'social-mgmt': '/socialmediamanagement.jpg',
}

function ServiceMedia({ id }) {
  const src = MEDIA[id]
  if (!src) return <div className="aspect-[16/10] bg-[#141414]" />

  return (
    <img
      src={src}
      alt=""
      className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
      loading="lazy"
    />
  )
}

export default function ServicesPage() {
  const { t } = useLanguage()
  const page = t.servicesPage
  const [active, setActive] = useState(null)

  return (
    <section className="border-b border-line">
      <div className="container-pad py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="label-caps mb-3 text-[11px] text-lime">{page.label}</p>
            <h1 className="text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl lg:text-[3.25rem]">
              {page.titleBefore}{' '}
              <span className="text-lime">{page.titleAccent}</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/60">{page.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="shrink-0 lg:pt-8"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:border-lime hover:text-lime"
            >
              {page.discuss}
              <ArrowUpRight className="size-4" strokeWidth={2.25} />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {page.items.map((item, i) => {
            const Icon = ICONS[item.id] || Clapperboard
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(0.05 + i * 0.05, 0.35) }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] transition hover:border-lime/40"
              >
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="w-full cursor-pointer text-left"
                >
                  <div className="relative overflow-hidden">
                    <ServiceMedia id={item.id} />
                    <span className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm transition group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                      <ArrowUpRight className="size-4" strokeWidth={2.25} />
                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <Icon className="size-4 shrink-0 text-lime" strokeWidth={1.6} />
                      <h2 className="text-[17px] font-semibold tracking-tight">{item.title}</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55">{item.description}</p>
                  </div>
                </button>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-16"
        >
          <h2 className="max-w-md text-2xl font-bold tracking-tight md:text-3xl">
            {page.footerTitle}
          </h2>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-95 sm:self-auto"
          >
            {page.cta}
            <ArrowUpRight className="size-4" strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>

      <ServiceModal
        item={active}
        image={active ? MEDIA[active.id] : null}
        icon={active ? ICONS[active.id] : null}
        open={!!active}
        onClose={() => setActive(null)}
        ctaLabel={page.cta}
      />
    </section>
  )
}
