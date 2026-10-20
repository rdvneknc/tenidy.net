import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, 'data')
const uploadsDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const db = new Database(path.join(dataDir, 'tenidy.db'))
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    duration TEXT DEFAULT '',
    video_url TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    aspect_ratio TEXT NOT NULL CHECK(aspect_ratio IN ('9:16', '16:9')),
    video_type TEXT NOT NULL,
    show_on_home INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT DEFAULT '',
    project_type TEXT DEFAULT '',
    message TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT DEFAULT '',
    content TEXT NOT NULL,
    cover_image TEXT DEFAULT '',
    published INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

const adminCount = db.prepare('SELECT COUNT(*) as c FROM admins').get().c
if (adminCount === 0) {
  const password = process.env.ADMIN_PASSWORD || 'tenidy2026'
  const hash = bcrypt.hashSync(password, 10)
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash)
  console.log('Default admin created → username: admin / password:', password)
}

const videoCount = db.prepare('SELECT COUNT(*) as c FROM videos').get().c
if (videoCount === 0) {
  const seed = [
    {
      title: 'Desert Knight',
      category: 'Cinematic Story',
      duration: '0:28',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      aspect_ratio: '9:16',
      video_type: 'Cinematic',
      show_on_home: 1,
    },
    {
      title: 'Noir Perfume',
      category: 'Product Commercial',
      duration: '0:22',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
      aspect_ratio: '9:16',
      video_type: 'Product',
      show_on_home: 1,
    },
    {
      title: 'Match Pulse',
      category: 'Sports Spot',
      duration: '0:31',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
      aspect_ratio: '9:16',
      video_type: 'Commercial',
      show_on_home: 1,
    },
    {
      title: 'First Contact',
      category: 'Sci-Fi Short',
      duration: '0:41',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      aspect_ratio: '9:16',
      video_type: 'Narrative',
      show_on_home: 1,
    },
    {
      title: 'Night Drive',
      category: 'Social Reel',
      duration: '0:19',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80',
      aspect_ratio: '9:16',
      video_type: 'Social',
      show_on_home: 1,
    },
    {
      title: 'Urban Pulse',
      category: 'Brand Reel',
      duration: '0:26',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
      aspect_ratio: '9:16',
      video_type: 'Social',
      show_on_home: 1,
    },
    {
      title: 'Empire Dawn',
      category: 'Game Trailer',
      duration: '1:12',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1100&q=80',
      aspect_ratio: '16:9',
      video_type: 'Cinematic',
      show_on_home: 1,
    },
    {
      title: 'Liquid Gold',
      category: 'Luxury Film',
      duration: '0:48',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1100&q=80',
      aspect_ratio: '16:9',
      video_type: 'Product',
      show_on_home: 1,
    },
    {
      title: 'Iron Heart',
      category: 'AI Animation',
      duration: '1:05',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail:
        'https://images.unsplash.com/photo-1485846234645-a62644f84781?auto=format&fit=crop&w=1100&q=80',
      aspect_ratio: '16:9',
      video_type: 'Commercial',
      show_on_home: 1,
    },
  ]

  const insert = db.prepare(`
    INSERT INTO videos (title, category, duration, video_url, thumbnail, aspect_ratio, video_type, show_on_home, sort_order)
    VALUES (@title, @category, @duration, @video_url, @thumbnail, @aspect_ratio, @video_type, @show_on_home, @sort_order)
  `)

  seed.forEach((v, i) => insert.run({ ...v, sort_order: i }))
}

export { db, uploadsDir }
