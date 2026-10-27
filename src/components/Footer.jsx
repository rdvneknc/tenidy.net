import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { label: t.nav.work, to: '/work' },
    { label: t.nav.websites, to: '/websites' },
    { label: t.nav.services, to: '/services' },
    { label: t.nav.about, to: '/about' },
    { label: t.nav.contact, to: '/contact' },
    { label: t.blog.footerLink, to: '/blog' },
  ]

  return (
    <footer className="border-t border-line py-10">
      <div className="container-pad flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex max-w-sm flex-col items-center md:items-start">
          <Link to="/" className="text-xl font-bold tracking-tight">
            ekiworks
          </Link>
          <p className="mt-1.5 text-sm font-normal text-muted">{t.footer.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-medium text-white/75 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
