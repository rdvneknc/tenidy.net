import fs from 'node:fs'
import path from 'node:path'
import { randomBytes } from 'node:crypto'

const MEDIA_DIR = path.resolve('public/media')

function ensureDir() {
  fs.mkdirSync(MEDIA_DIR, { recursive: true })
}

function safeExt(name = '') {
  const ext = path.extname(name).toLowerCase()
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'].includes(ext)) return ext
  return '.jpg'
}

/**
 * Dev-only: POST /api/local-media  { name, data (base64) }
 * Saves into public/media so files ship with the project / deploy.
 */
export function localMediaPlugin() {
  return {
    name: 'local-media',
    configureServer(server) {
      ensureDir()
      server.middlewares.use('/api/local-media', (req, res, next) => {
        if (req.method !== 'POST') return next()

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body || '{}')
            if (!parsed.data) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Missing image data' }))
              return
            }

            ensureDir()
            const filename = `${Date.now()}-${randomBytes(4).toString('hex')}${safeExt(parsed.name)}`
            const filePath = path.join(MEDIA_DIR, filename)
            const buffer = Buffer.from(parsed.data, 'base64')
            fs.writeFileSync(filePath, buffer)

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ url: `/media/${filename}` }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message || 'Upload failed' }))
          }
        })
      })
    },
  }
}
