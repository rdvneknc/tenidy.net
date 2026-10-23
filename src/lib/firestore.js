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

function mapPost(id, data) {
  return {
    id,
    title: data.title || '',
    slug: data.slug || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    coverImage: data.coverImage || '',
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
  const ref = await addDoc(messagesCol, {
    name: data.name,
    email: data.email,
    company: data.company || '',
    projectType: data.projectType || '',
    message: data.message,
    isRead: false,
    createdAt: serverTimestamp(),
  })
  const created = await getDoc(ref)
  return mapMessage(ref.id, created.data())
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

export async function listPosts({ publishedOnly = false } = {}) {
  const q = query(postsCol, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  let items = snap.docs.map((d) => mapPost(d.id, d.data()))
  if (publishedOnly) items = items.filter((p) => p.published)
  return items
}

export async function getPostBySlug(slug) {
  const q = query(postsCol, where('slug', '==', slug), where('published', '==', true))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return mapPost(d.id, d.data())
}

export async function createPost(data) {
  let slug = data.slug || slugify(data.title)
  const existing = await getDocs(query(postsCol, where('slug', '==', slug)))
  if (!existing.empty) slug = `${slug}-${Date.now()}`

  const payload = {
    title: data.title,
    slug,
    excerpt: data.excerpt || '',
    content: data.content,
    coverImage: data.coverImage || '',
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
  if (data.published !== undefined) payload.published = !!data.published
  await updateDoc(doc(db, 'posts', id), payload)
  const updated = await getDoc(doc(db, 'posts', id))
  return mapPost(id, updated.data())
}

export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id))
}

export async function getAdminStats() {
  const [videos, messages, posts] = await Promise.all([
    listVideos(),
    listMessages(),
    listPosts(),
  ])
  return {
    videos: videos.length,
    homeVideos: videos.filter((v) => v.showOnHome).length,
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
