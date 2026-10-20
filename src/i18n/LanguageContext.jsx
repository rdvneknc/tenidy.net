import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const saved = localStorage.getItem('tenidy-locale')
    return saved && translations[saved] ? saved : 'en'
  })

  useEffect(() => {
    localStorage.setItem('tenidy-locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => {
    const dict = translations[locale] || translations.tr
    return {
      locale,
      setLocale: (code) => {
        if (translations[code]) setLocale(code)
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
