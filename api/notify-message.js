import { notifyTelegram } from '../server/telegram.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await notifyTelegram(req.body || {})
    if (result.skipped) return res.status(200).json(result)
    if (!result.ok) return res.status(400).json(result)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Telegram notify failed', err)
    return res.status(500).json({ error: 'Notify failed' })
  }
}
