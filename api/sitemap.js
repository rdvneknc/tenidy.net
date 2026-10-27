import { initializeApp, getApps } from 'firebase/app'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'

const SITE = (process.env.VITE_SITE_URL || 'https://ekiworks.com').replace(/\/$/, '')

const STATIC = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/work', priority: '0.9', changefreq: 'weekly' },
  { path: '/websites', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
]

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function toLastmod(value) {
  try {
    if (!value) return new Date().toISOString().slice(0, 10)
    if (typeof value.toDate === 'function') return value.toDate().toISOString().slice(0, 10)
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
    return d.toISOString().slice(0, 10)
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

function urlEntry({ path, lastmod, priority, changefreq }) {
  return `  <url>
    <loc>${escapeXml(`${SITE}${path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

async function loadBlogUrls() {
  const config = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  }
  if (!config.projectId || !config.apiKey) return []

  const app = getApps().length ? getApps()[0] : initializeApp(config)
  const db = getFirestore(app)
  const snap = await getDocs(query(collection(db, 'posts'), where('published', '==', true)))

  const bySlug = new Map()
  snap.docs.forEach((doc) => {
    const data = doc.data() || {}
    const slug = String(data.slug || '')
      .trim()
      .replace(/^\/+|\/+$/g, '')
    if (!slug) return
    const lastmod = toLastmod(data.updatedAt || data.createdAt)
    const prev = bySlug.get(slug)
    if (!prev || lastmod > prev.lastmod) {
      bySlug.set(slug, { path: `/blog/${slug}`, lastmod, priority: '0.7', changefreq: 'weekly' })
    }
  })
  return [...bySlug.values()]
}

async function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10)
  const staticUrls = STATIC.map((u) =>
    urlEntry({ ...u, lastmod: today }),
  )
  let blogUrls = []
  try {
    blogUrls = (await loadBlogUrls()).map(urlEntry)
  } catch (err) {
    console.error('sitemap blog fetch failed', err)
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...blogUrls].join('\n')}
</urlset>
`
}

export default async function handler(req, res) {
  try {
    const xml = await buildSitemapXml()
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).send(xml)
  } catch (err) {
    console.error('sitemap failed', err)
    return res.status(500).send('Sitemap unavailable')
  }
}
