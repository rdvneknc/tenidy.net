import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { db, uploadsDir } from './db.js'
import { login, requireAuth } from './auth.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use('/uploads', express.static(uploadsDir))

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-')
    cb(null, `${Date.now()}-${safe}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'))
    cb(null, true)
  },
})

function mapVideo(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    duration: row.duration,
    videoUrl: row.video_url,
    thumbnail: row.thumbnail,
    aspectRatio: row.aspect_ratio,
    videoType: row.video_type,
    showOnHome: !!row.show_on_home,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function mapMessage(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    projectType: row.project_type,
    message: row.message,
    isRead: !!row.is_read,
    createdAt: row.created_at,
  }
}

function mapPost(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    published: !!row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {}
  const result = login(username, password)
  if (!result) return res.status(401).json({ error: 'Invalid credentials' })
  res.json(result)
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ id: req.admin.id, username: req.admin.username })
})

// Upload
app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

// Public videos (homepage)
app.get('/api/videos', (req, res) => {
  const { home, aspect, type, q } = req.query
  let sql = 'SELECT * FROM videos WHERE 1=1'
  const params = []

  if (home === '1') {
    sql += ' AND show_on_home = 1'
  }
  if (aspect) {
    sql += ' AND aspect_ratio = ?'
    params.push(aspect)
  }
  if (type) {
    sql += ' AND video_type = ?'
    params.push(type)
  }
  if (q) {
    sql += ' AND (title LIKE ? OR category LIKE ? OR video_type LIKE ?)'
    const like = `%${q}%`
    params.push(like, like, like)
  }

  sql += ' ORDER BY sort_order ASC, id ASC'
  const rows = db.prepare(sql).all(...params)
  res.json(rows.map(mapVideo))
})

app.get('/api/videos/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM videos WHERE id = ?').get(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(mapVideo(row))
})

app.post('/api/videos', requireAuth, (req, res) => {
  const {
    title,
    duration = '',
    videoUrl,
    thumbnail,
    aspectRatio,
    videoType,
    showOnHome = false,
  } = req.body || {}
  const category = req.body.category || videoType

  if (!title || !videoUrl || !thumbnail || !aspectRatio || !videoType) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!['9:16', '16:9'].includes(aspectRatio)) {
    return res.status(400).json({ error: 'Invalid aspect ratio' })
  }

  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), -1) as m FROM videos').get().m
  const info = db
    .prepare(
      `INSERT INTO videos (title, category, duration, video_url, thumbnail, aspect_ratio, video_type, show_on_home, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      title,
      category,
      duration,
      videoUrl,
      thumbnail,
      aspectRatio,
      videoType,
      showOnHome ? 1 : 0,
      maxOrder + 1,
    )

  const row = db.prepare('SELECT * FROM videos WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(mapVideo(row))
})

app.put('/api/videos/reorder', requireAuth, (req, res) => {
  const { ids } = req.body || {}
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids array required' })

  const update = db.prepare(
    "UPDATE videos SET sort_order = ?, updated_at=datetime('now') WHERE id = ?",
  )
  const tx = db.transaction((list) => {
    list.forEach((id, index) => update.run(index, id))
  })
  tx(ids)
  res.json({ ok: true })
})

app.put('/api/videos/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM videos WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  const title = req.body.title ?? existing.title
  const duration = req.body.duration ?? existing.duration
  const videoUrl = req.body.videoUrl ?? existing.video_url
  const thumbnail = req.body.thumbnail ?? existing.thumbnail
  const aspectRatio = req.body.aspectRatio ?? existing.aspect_ratio
  const videoType = req.body.videoType ?? existing.video_type
  const category = req.body.category ?? videoType ?? existing.category
  const showOnHome =
    req.body.showOnHome !== undefined ? (req.body.showOnHome ? 1 : 0) : existing.show_on_home

  if (!['9:16', '16:9'].includes(aspectRatio)) {
    return res.status(400).json({ error: 'Invalid aspect ratio' })
  }

  db.prepare(
    `UPDATE videos SET title=?, category=?, duration=?, video_url=?, thumbnail=?, aspect_ratio=?, video_type=?, show_on_home=?, updated_at=datetime('now') WHERE id=?`,
  ).run(
    title,
    category,
    duration,
    videoUrl,
    thumbnail,
    aspectRatio,
    videoType,
    showOnHome,
    req.params.id,
  )

  const row = db.prepare('SELECT * FROM videos WHERE id = ?').get(req.params.id)
  res.json(mapVideo(row))
})

app.delete('/api/videos/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM videos WHERE id = ?').run(req.params.id)
  if (!info.changes) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// Messages
app.post('/api/messages', (req, res) => {
  const { name, email, company = '', projectType = '', message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  const info = db
    .prepare(
      `INSERT INTO messages (name, email, company, project_type, message) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(name, email, company, projectType, message)

  const row = db.prepare('SELECT * FROM messages WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(mapMessage(row))
})

app.get('/api/messages', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all()
  res.json(rows.map(mapMessage))
})

app.patch('/api/messages/:id/read', requireAuth, (req, res) => {
  const info = db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(req.params.id)
  if (!info.changes) return res.status(404).json({ error: 'Not found' })
  const row = db.prepare('SELECT * FROM messages WHERE id = ?').get(req.params.id)
  res.json(mapMessage(row))
})

app.delete('/api/messages/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id)
  if (!info.changes) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// Blog public
app.get('/api/posts', (req, res) => {
  const { all } = req.query
  if (all === '1') {
    // admin list — still require auth preferably; used only from admin with token
    return res.status(401).json({ error: 'Use /api/admin/posts' })
  }
  const rows = db
    .prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC')
    .all()
  res.json(rows.map(mapPost))
})

app.get('/api/posts/:slug', (req, res) => {
  const row = db
    .prepare('SELECT * FROM posts WHERE slug = ? AND published = 1')
    .get(req.params.slug)
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(mapPost(row))
})

app.get('/api/admin/posts', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all()
  res.json(rows.map(mapPost))
})

app.post('/api/admin/posts', requireAuth, (req, res) => {
  const { title, excerpt = '', content, coverImage = '', published = false, slug } = req.body || {}
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' })

  let finalSlug = slug || slugify(title)
  const exists = db.prepare('SELECT id FROM posts WHERE slug = ?').get(finalSlug)
  if (exists) finalSlug = `${finalSlug}-${Date.now()}`

  const info = db
    .prepare(
      `INSERT INTO posts (title, slug, excerpt, content, cover_image, published) VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(title, finalSlug, excerpt, content, coverImage, published ? 1 : 0)

  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(mapPost(row))
})

app.put('/api/admin/posts/:id', requireAuth, (req, res) => {
  const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
  if (!existing) return res.status(404).json({ error: 'Not found' })

  const title = req.body.title ?? existing.title
  const excerpt = req.body.excerpt ?? existing.excerpt
  const content = req.body.content ?? existing.content
  const coverImage = req.body.coverImage ?? existing.cover_image
  const published =
    req.body.published !== undefined ? (req.body.published ? 1 : 0) : existing.published
  let slug = req.body.slug ?? existing.slug

  const clash = db.prepare('SELECT id FROM posts WHERE slug = ? AND id != ?').get(slug, req.params.id)
  if (clash) slug = `${slug}-${Date.now()}`

  db.prepare(
    `UPDATE posts SET title=?, slug=?, excerpt=?, content=?, cover_image=?, published=?, updated_at=datetime('now') WHERE id=?`,
  ).run(title, slug, excerpt, content, coverImage, published, req.params.id)

  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
  res.json(mapPost(row))
})

app.delete('/api/admin/posts/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id)
  if (!info.changes) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
})

// Stats for dashboard
app.get('/api/admin/stats', requireAuth, (_req, res) => {
  const videos = db.prepare('SELECT COUNT(*) as c FROM videos').get().c
  const homeVideos = db.prepare('SELECT COUNT(*) as c FROM videos WHERE show_on_home = 1').get().c
  const messages = db.prepare('SELECT COUNT(*) as c FROM messages').get().c
  const unread = db.prepare('SELECT COUNT(*) as c FROM messages WHERE is_read = 0').get().c
  const posts = db.prepare('SELECT COUNT(*) as c FROM posts').get().c
  res.json({ videos, homeVideos, messages, unread, posts })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Server error' })
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
