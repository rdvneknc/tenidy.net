import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore'
import { db } from './firebase'

const videosCol = collection(db, 'videos')
const websitesCol = collection(db, 'websites')
const messagesCol = collection(db, 'messages')
const postsCol = collection(db, 'posts')

function mapVideo(id, data) {
  return {
    id,
    title: data.title || '',
    category: data.category || data.videoType || '',
    duration: data.duration || '',
    videoUrl: data.videoUrl || '',
    thumbnail: data.thumbnail || '',
    aspectRatio: data.aspectRatio || '9:16',
    videoType: data.videoType || '',
    mediaType: data.mediaType === 'image' ? 'image' : 'video',
    showOnHome: !!data.showOnHome,
    sortOrder: data.sortOrder ?? 0,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt || null,
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || data.updatedAt || null,
  }
}

function mapMessage(id, data) {
  return {
    id,
    name: data.name || '',
    email: data.email || '',
    company: data.company || '',
    projectType: data.projectType || '',
    message: data.message || '',
    isRead: !!data.isRead,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt || null,
  }
}

function normalizePostLocale(locale) {
  if (locale === 'tr' || locale === 'et' || locale === 'en' || locale === 'fi' || locale === 'ru') {
    return locale
  }
  return 'en'
}

function mapPost(id, data) {
  return {
    id,
    title: data.title || '',
    slug: data.slug || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    coverImage: data.coverImage || '',
    locale: normalizePostLocale(data.locale),
    published: !!data.published,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt || null,
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || data.updatedAt || null,
  }
}

export async function listVideos({ homeOnly = false } = {}) {
  const q = query(videosCol, orderBy('sortOrder', 'asc'))
  const snap = await getDocs(q)
  let items = snap.docs.map((d) => mapVideo(d.id, d.data()))
  if (homeOnly) items = items.filter((v) => v.showOnHome)
  return items
}

export async function createVideo(data) {
  const sortSnap = await getDocs(query(videosCol, orderBy('sortOrder', 'desc')))
  const maxOrder = sortSnap.docs[0]?.data()?.sortOrder ?? -1
  const mediaType = data.mediaType === 'image' ? 'image' : 'video'
  const payload = {
    title: mediaType === 'image' ? '' : data.title || '',
    category: data.videoType || '',
    duration: mediaType === 'image' ? '' : data.duration || '',
    videoUrl: mediaType === 'image' ? '' : data.videoUrl || '',
    thumbnail: data.thumbnail || '',
    aspectRatio: data.aspectRatio,
    videoType: data.videoType || '',
    mediaType,
    showOnHome: !!data.showOnHome,
    sortOrder: maxOrder + 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const ref = await addDoc(videosCol, payload)
  const created = await getDoc(ref)
  return mapVideo(ref.id, created.data())
}

export async function updateVideo(id, data) {
  const payload = {
    updatedAt: serverTimestamp(),
  }
  if (data.title !== undefined) payload.title = data.title
  if (data.duration !== undefined) payload.duration = data.duration
  if (data.videoUrl !== undefined) payload.videoUrl = data.videoUrl
  if (data.thumbnail !== undefined) payload.thumbnail = data.thumbnail
  if (data.aspectRatio !== undefined) payload.aspectRatio = data.aspectRatio
  if (data.mediaType !== undefined) {
    payload.mediaType = data.mediaType === 'image' ? 'image' : 'video'
  }
  if (data.videoType !== undefined) {
    payload.videoType = data.videoType
    payload.category = data.videoType
  }
  if (data.showOnHome !== undefined) payload.showOnHome = !!data.showOnHome

  await updateDoc(doc(db, 'videos', id), payload)
  const updated = await getDoc(doc(db, 'videos', id))
  return mapVideo(id, updated.data())
}

export async function deleteVideo(id) {
  await deleteDoc(doc(db, 'videos', id))
}

function mapWebsite(id, data) {
  return {
    id,
    title: data.title || '',
    url: data.url || '',
    thumbnail: data.thumbnail || '',
    description: data.description || '',
    tag: data.tag || '',
    sortOrder: data.sortOrder ?? 0,
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt || null,
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || data.updatedAt || null,
  }
}

const SEED_WEBSITES = [
  {
    title: 'Limon Games',
    url: 'https://www.limon.games/',
    thumbnail: '/limon-games-website.webp',
    description: '',
    tag: 'Gaming',
  },
  {
    title: 'Airlivo',
    url: 'https://www.airlivo.com/tr',
    thumbnail: '/airlivo-website.webp',
    description: '',
    tag: 'SaaS',
  },
  {
    title: 'Atelier Nord',
    url: 'https://example.com/atelier-nord',
    thumbnail: '/media/site-atelier.jpg',
    description: '',
    tag: 'Studio',
  },
  {
    title: 'Maison Line',
    url: 'https://example.com/maison-line',
    thumbnail: '/media/site-commerce.jpg',
    description: '',
    tag: 'E-commerce',
  },
  {
    title: 'Ledgerly',
    url: 'https://example.com/ledgerly',
    thumbnail: '/media/site-fintech.jpg',
    description: '',
    tag: 'Fintech',
  },
  {
    title: 'Copper & Co',
    url: 'https://example.com/copper-co',
    thumbnail: '/media/site-cafe.jpg',
    description: '',
    tag: 'Local Business',
  },
]

export async function listWebsites() {
  try {
    const q = query(websitesCol, orderBy('sortOrder', 'asc'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => mapWebsite(d.id, d.data()))
  } catch (err) {
    // Fallback if sortOrder index is missing
    console.warn('listWebsites orderBy failed, using unsorted fetch', err)
    const snap = await getDocs(websitesCol)
    return snap.docs
      .map((d) => mapWebsite(d.id, d.data()))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  }
}

const WEBSITE_COVER_PATCHES = [
  { test: (s) => /limon\.games/i.test(s.url), thumbnail: '/limon-games-website.webp' },
  { test: (s) => /airlivo\.com/i.test(s.url), thumbnail: '/airlivo-website.webp' },
]

function localSeedWebsites() {
  return SEED_WEBSITES.map((item, i) => ({
    id: `seed-${i}`,
    ...item,
    sortOrder: i,
    createdAt: null,
    updatedAt: null,
  }))
}

/** Seed starter websites when collection is empty; falls back to local demo data. */
export async function ensureSeedWebsites() {
  try {
    const existing = await listWebsites()
    if (existing.length) {
      for (const site of existing) {
        const patch = WEBSITE_COVER_PATCHES.find((p) => p.test(site))
        if (patch && site.thumbnail !== patch.thumbnail) {
          await updateWebsite(site.id, { thumbnail: patch.thumbnail })
        }
      }
      return listWebsites()
    }

    // Collection empty — write seed docs (needs auth write rules)
    for (const item of SEED_WEBSITES) {
      await createWebsite(item)
    }
    return listWebsites()
  } catch (err) {
    console.error(err)
    // Before rules were fixed, writes failed and only this temporary list was shown
    return localSeedWebsites()
  }
}

export async function createWebsite(data) {
  let maxOrder = -1
  try {
    const sortSnap = await getDocs(query(websitesCol, orderBy('sortOrder', 'desc')))
    maxOrder = sortSnap.docs[0]?.data()?.sortOrder ?? -1
  } catch {
    const snap = await getDocs(websitesCol)
    snap.docs.forEach((d) => {
      const order = d.data()?.sortOrder ?? -1
      if (order > maxOrder) maxOrder = order
    })
  }
  const payload = {
    title: data.title || '',
    url: data.url || '',
    thumbnail: data.thumbnail || '',
    description: data.description || '',
    tag: data.tag || '',
    sortOrder: maxOrder + 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const ref = await addDoc(websitesCol, payload)
  const created = await getDoc(ref)
  return mapWebsite(ref.id, created.data())
}

export async function updateWebsite(id, data) {
  const payload = { updatedAt: serverTimestamp() }
  if (data.title !== undefined) payload.title = data.title
  if (data.url !== undefined) payload.url = data.url
  if (data.thumbnail !== undefined) payload.thumbnail = data.thumbnail
  if (data.description !== undefined) payload.description = data.description
  if (data.tag !== undefined) payload.tag = data.tag
  await updateDoc(doc(db, 'websites', id), payload)
  const updated = await getDoc(doc(db, 'websites', id))
  return mapWebsite(id, updated.data())
}

export async function deleteWebsite(id) {
  await deleteDoc(doc(db, 'websites', id))
}

export async function reorderWebsites(ids) {
  const batch = writeBatch(db)
  ids.forEach((id, index) => {
    batch.update(doc(db, 'websites', id), {
      sortOrder: index,
      updatedAt: serverTimestamp(),
    })
  })
  await batch.commit()
}

export async function reorderVideos(ids) {
  const batch = writeBatch(db)
  ids.forEach((id, index) => {
    batch.update(doc(db, 'videos', id), {
      sortOrder: index,
      updatedAt: serverTimestamp(),
    })
  })
  await batch.commit()
}

export async function createMessage(data) {
  const payload = {
    name: data.name,
    email: data.email,
    company: data.company || '',
    projectType: data.projectType || '',
    message: data.message,
    isRead: false,
    createdAt: serverTimestamp(),
  }
  // Public visitors can create but not read messages — don't getDoc after write.
  const ref = await addDoc(messagesCol, payload)
  return mapMessage(ref.id, {
    ...payload,
    createdAt: new Date().toISOString(),
  })
}

export async function listMessages() {
  const q = query(messagesCol, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => mapMessage(d.id, d.data()))
}

export async function markMessageRead(id) {
  await updateDoc(doc(db, 'messages', id), { isRead: true })
  const updated = await getDoc(doc(db, 'messages', id))
  return mapMessage(id, updated.data())
}

export async function deleteMessage(id) {
  await deleteDoc(doc(db, 'messages', id))
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function listPosts({ publishedOnly = false, locale } = {}) {
  const q = query(postsCol, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  let items = snap.docs.map((d) => mapPost(d.id, d.data()))
  if (publishedOnly) items = items.filter((p) => p.published)
  if (locale) {
    const want = normalizePostLocale(locale)
    items = items.filter((p) => p.locale === want)
  }
  return items
}

export async function getPostBySlug(slug, { locale } = {}) {
  const q = query(postsCol, where('slug', '==', slug), where('published', '==', true))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const items = snap.docs.map((d) => mapPost(d.id, d.data()))
  if (locale) {
    const want = normalizePostLocale(locale)
    return items.find((p) => p.locale === want) || null
  }
  return items[0] || null
}

export async function createPost(data) {
  const locale = normalizePostLocale(data.locale)
  let slug = data.slug || slugify(data.title)
  const existing = await getDocs(query(postsCol, where('slug', '==', slug)))
  const clash = existing.docs.some((d) => normalizePostLocale(d.data()?.locale) === locale)
  if (clash) slug = `${slug}-${Date.now()}`

  const payload = {
    title: data.title,
    slug,
    excerpt: data.excerpt || '',
    content: data.content,
    coverImage: data.coverImage || '',
    locale,
    published: !!data.published,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const ref = await addDoc(postsCol, payload)
  const created = await getDoc(ref)
  return mapPost(ref.id, created.data())
}

export async function updatePost(id, data) {
  const payload = { updatedAt: serverTimestamp() }
  if (data.title !== undefined) payload.title = data.title
  if (data.slug !== undefined) payload.slug = data.slug
  if (data.excerpt !== undefined) payload.excerpt = data.excerpt
  if (data.content !== undefined) payload.content = data.content
  if (data.coverImage !== undefined) payload.coverImage = data.coverImage
  if (data.locale !== undefined) payload.locale = normalizePostLocale(data.locale)
  if (data.published !== undefined) payload.published = !!data.published
  await updateDoc(doc(db, 'posts', id), payload)
  const updated = await getDoc(doc(db, 'posts', id))
  return mapPost(id, updated.data())
}

export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id))
}

export async function getAdminStats() {
  const [videos, websites, messages, posts] = await Promise.all([
    listVideos(),
    listWebsites(),
    listMessages(),
    listPosts(),
  ])
  return {
    videos: videos.length,
    homeVideos: videos.filter((v) => v.showOnHome).length,
    websites: websites.length,
    messages: messages.length,
    unread: messages.filter((m) => !m.isRead).length,
    posts: posts.length,
  }
}

/** Optional: seed starter docs if collection empty */
export async function ensureSeedVideos() {
  const existing = await listVideos()
  if (existing.length) return existing

  const seed = [
    {
      title: 'Desert Knight',
      duration: '0:28',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      aspectRatio: '9:16',
      videoType: 'Game Ads',
      showOnHome: true,
    },
    {
      title: 'Empire Dawn',
      duration: '1:12',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=80',
      aspectRatio: '16:9',
      videoType: 'Game Ads',
      showOnHome: true,
    },
  ]

  for (const item of seed) {
    await createVideo(item)
  }
  return listVideos()
}
