import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const links = [
    { label: t.nav.work, to: '/#products' },
    { label: t.nav.services, to: '/#services' },
    { label: t.nav.about, to: '/about' },
    { label: t.nav.contact, to: '/contact' },
  ].sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }))

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/80 backdrop-blur-md">
      <nav className="container-pad flex h-14 items-center justify-between md:h-16">
        <Link to="/" className="text-xl font-bold tracking-tight md:text-[22px]">
          tenidy
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              {link.to.startsWith('/#') ? (
                <Link
                  to={link.to}
                  className="text-sm font-medium text-white/80 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ) : (
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition hover:text-white ${
                      isActive ? 'text-white' : 'text-white/80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5 md:gap-3">
          <LanguageSwitcher compact />
          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-lime px-5 py-2 text-sm font-medium text-ink transition hover:brightness-95 md:inline-flex"
          >
            {t.nav.cta}
            <ArrowUpRight className="size-4" strokeWidth={2.5} />
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-9 items-center justify-center rounded-full border border-line text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="container-pad flex flex-col gap-4 py-5">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-lime px-5 py-2 text-sm font-medium text-ink"
              >
                {t.nav.cta}
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
