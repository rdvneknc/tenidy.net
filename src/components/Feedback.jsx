import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const testimonials = [
  {
    quote: 'Our trailer finally looks like a real game cinematic. Sharp pacing, strong mood, and a finish that players actually share.',
    rating: 5,
    category: 'Game Trailer',
    name: 'Aytaç Coşkun',
    role: 'Creative Director',
    company: 'Limon Games',
  },
  {
    quote: 'They turned our brand energy into short films that feel premium without losing the fun. Clear process, fast turns, solid results.',
    rating: 5,
    category: 'Social Content',
    name: 'James Whitaker',
    role: 'Marketing Lead',
    company: "B'stop",
  },
  {
    quote: 'Explaining eSIM used to feel dry. Ekiworks made it simple, visual, and trustworthy — our launch creatives finally clicked.',
    rating: 5,
    category: 'Product Video',
    name: 'Sophie Laurent',
    role: 'Head of Growth',
    company: 'Airlivo E-sim',
  },
  {
    quote: 'Warm, cinematic, and on-brand. The spot captured the atmosphere of Stoa better than anything we had shot before.',
    rating: 5,
    category: 'AI Commercial',
    name: 'Burhan Şirin',
    role: 'Owner',
    company: 'Stoa Pub',
  },
  {
    quote: 'They took a rough brief and turned it into a film that actually feels like our brand — cinematic, sharp, and memorable.',
    rating: 5,
    category: 'AI Commercial',
    name: 'Elena Vargas',
    role: 'Brand Director',
    company: 'Lumora Beauty',
  },
  {
    quote: 'The process felt collaborative from day one. Every frame got real attention, and the trailer landed exactly how we hoped.',
    rating: 5,
    category: 'Creative Production',
    name: 'Marcus Chen',
    role: 'Head of Creative',
    company: 'Orbit Interactive',
  },
  {
    quote: 'Fresh ideas, clear communication, and content that finally felt right for our audience across every platform.',
    rating: 5,
    category: 'Social Content',
    name: 'Priya Nair',
    role: 'Marketing Lead',
    company: 'Northline Apparel',
  },
  {
    quote: 'We needed a product film fast without looking cheap. Ekiworks delivered something that could sit next to any luxury campaign.',
    rating: 5,
    category: 'Product Video',
    name: 'Jonas Meier',
    role: 'CMO',
    company: 'Aether Watches',
  },
  {
    quote: 'Rare to find a team that understands both AI tooling and storytelling. The final cut outperformed our previous agency work.',
    rating: 4,
    category: 'AI Commercial',
    name: 'Sofia Alvarez',
    role: 'VP Brand',
    company: 'Volt Mobility',
  },
]

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating ? 'fill-lime text-lime' : 'fill-transparent text-white/25'
          }`}
          strokeWidth={1.75}
        />
      ))}
    </div>
  )
}

function FeedbackCard({ item, featured = false, className = '' }) {
  return (
    <article
      className={`relative flex h-[320px] flex-col rounded-2xl border border-white/10 bg-[#121212] p-5 md:h-[360px] md:p-6 ${
        featured
          ? 'before:absolute before:top-0 before:left-5 before:h-[2px] before:w-14 before:rounded-full before:bg-lime'
          : ''
      } ${className}`}
    >
      <div className="mb-4 flex shrink-0 items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Stars rating={item.rating} />
          <span className="text-xs font-medium text-white/70">{item.rating.toFixed(1)} / 5</span>
        </div>
        <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-0.5 text-[9px] font-medium tracking-[0.14em] text-muted uppercase">
          Verified
        </span>
      </div>

      <p className="min-h-0 flex-1 overflow-hidden text-[15px] leading-relaxed font-normal text-white/90 md:text-base">
        “{item.quote}”
      </p>

      <div className="mt-auto shrink-0 pt-5">
        <p className="mb-3 text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
          {item.category}
        </p>
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50">
              <User className="size-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{item.name}</p>
              <p className="truncate text-xs font-normal text-muted">
                {item.role} · {item.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Feedback() {
  const { t } = useLanguage()
  const pages = useMemo(() => {
    const chunks = []
    for (let i = 0; i < testimonials.length; i += 3) {
      chunks.push(testimonials.slice(i, i + 3))
    }
    return chunks
  }, [])

  const [page, setPage] = useState(0)
  const total = pages.length

  const go = (dir) => {
    setPage((p) => (p + dir + total) % total)
  }

  return (
    <section id="feedback" className="border-b border-line bg-ink-soft py-12 md:py-16">
      <div className="container-pad">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="label-caps mb-2 text-[11px] text-muted">{t.feedback.label}</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t.feedback.titleBefore}{' '}
              <span className="text-lime">{t.feedback.titleAccent}</span>
            </h2>
            <p className="mt-2 text-sm font-normal text-muted md:text-[15px]">
              {t.feedback.subtitle}
            </p>
          </div>

          <div className="hidden items-center gap-2 self-start sm:self-auto md:flex">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => go(-1)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-lime hover:text-lime"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => go(1)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-lime text-lime transition hover:bg-lime hover:text-ink"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: horizontal swipe */}
      <div className="md:hidden">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-[1.5rem] pb-1">
          {testimonials.map((item, i) => (
            <FeedbackCard
              key={item.name}
              item={item}
              featured={i === 0}
              className="w-[min(85vw,320px)] shrink-0 snap-center"
            />
          ))}
        </div>
        <p className="container-pad mt-5 text-[11px] font-normal text-muted">{t.feedback.caption}</p>
      </div>

      {/* Desktop: paged grid */}
      <div className="container-pad hidden md:block">
        <div className="grid gap-5 md:grid-cols-3">
          {pages[page].map((item, i) => (
            <FeedbackCard key={`${item.name}-${page}`} item={item} featured={i === 0} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:relative">
          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition ${
                  i === page ? 'w-6 bg-lime' : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] font-normal text-muted sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2">
            {t.feedback.caption}
          </p>
        </div>
      </div>
    </section>
  )
}
