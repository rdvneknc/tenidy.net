import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { availableLocaleCodes, translations } from './translations'

const LanguageContext = createContext(null)

const AVAILABLE = new Set(availableLocaleCodes)

function isAvailableLocale(code) {
  return AVAILABLE.has(code) && Boolean(translations[code])
}

/** Map browser language → site locale (no IP / geo lookup). */
function detectBrowserLocale() {
  if (typeof navigator === 'undefined') return 'en'

  const candidates = [
    ...(navigator.languages || []),
    navigator.language,
    navigator.userLanguage,
  ].filter(Boolean)

  for (const raw of candidates) {
    const code = String(raw).toLowerCase().replace('_', '-')
    const primary = code.split('-')[0]
    if (isAvailableLocale(primary)) return primary
    if (isAvailableLocale(code)) return code
  }

  return 'en'
}

function getInitialLocale() {
  try {
    const saved = localStorage.getItem('ekiworks-locale')
    if (saved && isAvailableLocale(saved)) return saved
  } catch {
    // ignore private-mode / blocked storage
  }
  return detectBrowserLocale()
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale)

  useEffect(() => {
    if (!isAvailableLocale(locale)) {
      setLocale(detectBrowserLocale())
      return
    }
    try {
      localStorage.setItem('ekiworks-locale', locale)
    } catch {
      // ignore
    }
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => {
    const dict = translations[locale] || translations.en
    return {
      locale: isAvailableLocale(locale) ? locale : 'en',
      setLocale: (code) => {
        if (isAvailableLocale(code)) setLocale(code)
      },
      t: dict,
    }
  }, [locale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
