import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M22.5 8.2a3 3 0 0 0-2.1-2.1C18.6 5.7 12 5.7 12 5.7s-6.6 0-8.4.4A3 3 0 0 0 1.5 8.2 31 31 0 0 0 1.1 12a31 31 0 0 0 .4 3.8 3 3 0 0 0 2.1 2.1c1.8.4 8.4.4 8.4.4s6.6 0 8.4-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="m10 15.2 5.2-3.2L10 8.8v6.4Z" fill="currentColor" />
    </svg>
  )
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M8 11v8M8 8v.01M12 19v-5.5a2.5 2.5 0 0 1 5 0V19M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const socials = [
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'YouTube', href: '#', icon: YoutubeIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedinIcon },
]

export default function Footer() {
  const { t } = useLanguage()

  const links = [
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

        <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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

          <ul className="flex items-center justify-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-line text-white/80 transition hover:border-lime hover:text-lime"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
