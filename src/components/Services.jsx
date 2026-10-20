import { Camera, Clapperboard, CirclePlay } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const icons = [Camera, Clapperboard, CirclePlay]

export default function Services() {
  const { t } = useLanguage()
  const items = t.services.items.map((item, i) => ({
    ...item,
    icon: icons[i],
  }))

  return (
    <section id="services" className="border-b border-line py-12 md:py-16">
      <div className="container-pad">
        <div className="mb-8 md:mb-10">
          <p className="label-caps mb-2 text-[11px] text-muted">{t.services.label}</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.services.title}</h2>
        </div>

        <div className="grid gap-0 md:grid-cols-3">
          {items.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`border-line py-7 md:px-7 md:py-2 ${
                  i < items.length - 1 ? 'border-b md:border-r md:border-b-0' : ''
                } ${i === 0 ? 'md:pl-0' : ''} ${i === items.length - 1 ? 'md:pr-0' : ''}`}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
                  <Icon className="size-6 shrink-0 text-white/90" strokeWidth={1.4} />
                </div>
                <p className="max-w-sm text-sm leading-relaxed font-normal text-muted">
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
