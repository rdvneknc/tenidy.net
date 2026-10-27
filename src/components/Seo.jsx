import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const DEFAULT_SITE = 'https://ekiworks.com'
const DEFAULT_IMAGE = '/hero-banner.jpg'

const OG_LOCALE = {
  en: 'en_US',
  et: 'et_EE',
  fi: 'fi_FI',
  ru: 'ru_RU',
  tr: 'tr_TR',
}

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href, attrs = {}) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  Object.entries(attrs).forEach(([k, v]) => {
    if (v == null) el.removeAttribute(k)
    else el.setAttribute(k, v)
  })
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Head-only SEO helper — no visual UI.
 * Sets title, description, canonical, Open Graph, Twitter, robots, JSON-LD.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
  type = 'website',
  jsonLd = null,
}) {
  const { locale } = useLanguage()

  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE).replace(/\/$/, '')
    const fullTitle = title?.includes('ekiworks') ? title : `${title} | ekiworks`
    const url = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`
    const ogLocale = OG_LOCALE[locale] || 'en_US'

    document.title = fullTitle
    document.documentElement.lang = locale || 'en'

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertMeta('name', 'author', 'ekiworks')

    const gsc = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
    if (gsc) upsertMeta('name', 'google-site-verification', gsc)

    upsertMeta('property', 'og:site_name', 'ekiworks')
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', fullTitle)
    upsertMeta('property', 'og:locale', ogLocale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)

    upsertLink('canonical', noindex ? null : url)

    upsertJsonLd('ld-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ekiworks',
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      email: 'ridvan@ekiworks.com',
      description:
        'AI-powered films, visuals, websites, and creative content for brands, games, and apps.',
      address: [
        { '@type': 'PostalAddress', addressLocality: 'Tallinn', addressCountry: 'EE' },
        { '@type': 'PostalAddress', addressLocality: 'Wyoming', addressCountry: 'US' },
        { '@type': 'PostalAddress', addressLocality: 'Ankara', addressCountry: 'TR' },
      ],
    })

    if (path === '/' && !noindex) {
      upsertJsonLd('ld-website', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ekiworks',
        url: siteUrl,
        inLanguage: Object.keys(OG_LOCALE),
      })
    } else {
      upsertJsonLd('ld-website', null)
    }

    upsertJsonLd('ld-page', jsonLd)

    return () => {
      upsertJsonLd('ld-page', null)
    }
  }, [title, description, path, image, noindex, type, jsonLd, locale])

  return null
}
