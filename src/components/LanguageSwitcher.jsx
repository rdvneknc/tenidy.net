import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { locales } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

function Flag({ code, className = '' }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt=""
      width={20}
      height={15}
      className={`inline-block rounded-[2px] object-cover ${className}`}
      loading="lazy"
    />
  )
}

export default function LanguageSwitcher({ compact = false }) {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = locales.find((l) => l.code === locale) || locales[0]

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.lang.label}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] font-medium text-white/85 transition hover:border-white/30 hover:bg-white/[0.06] ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
        }`}
      >
        <span>{current.short}</span>
        <ChevronDown
          className={`size-3.5 text-white/50 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-[calc(100%+8px)] right-0 z-50 min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-[#111] p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
        >
          <p className="px-2.5 pt-1.5 pb-2 text-[10px] font-medium tracking-[0.16em] text-muted uppercase">
            {t.lang.label}
          </p>
          {locales.map((item) => {
            const active = item.code === locale
            const disabled = !item.available
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={active}
                disabled={disabled}
                onClick={() => {
                  if (!item.available) return
                  setLocale(item.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                  disabled
                    ? 'cursor-not-allowed text-white/30'
                    : active
                      ? 'bg-lime/10 text-lime'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Flag code={item.flag} className={disabled ? 'opacity-40' : ''} />
                  {item.label}
                </span>
                {disabled ? (
                  <span className="text-[10px] font-medium tracking-wide text-white/25 uppercase">
                    {t.lang.soon}
                  </span>
                ) : active ? (
                  <Check className="size-3.5" strokeWidth={2.5} />
                ) : null}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
