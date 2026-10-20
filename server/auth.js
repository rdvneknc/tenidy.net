import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './db.js'

const JWT_SECRET = process.env.JWT_SECRET || 'tenidy-dev-secret-change-me'

export function signToken(admin) {
  return jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '7d' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    req.admin = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export function login(username, password) {
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
  if (!admin) return null
  if (!bcrypt.compareSync(password, admin.password_hash)) return null
  return { id: admin.id, username: admin.username, token: signToken(admin) }
}
