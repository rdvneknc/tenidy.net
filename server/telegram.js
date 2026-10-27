/** Send a contact-form alert via Telegram Bot API (free). */
export async function notifyTelegram(payload) {
  const token = String(process.env.TELEGRAM_BOT_TOKEN || '').trim()
  // Strip accidental quotes/spaces from Vercel env values
  const chatId = String(process.env.TELEGRAM_CHAT_ID || '')
    .trim()
    .replace(/^["']|["']$/g, '')
  if (!token || !chatId) {
    return { ok: false, skipped: true, reason: 'Telegram env not configured' }
  }

  const name = String(payload.name || '').trim().slice(0, 120)
  const email = String(payload.email || '').trim().slice(0, 120)
  const company = String(payload.company || '').trim().slice(0, 120)
  const projectType = String(payload.projectType || '').trim().slice(0, 80)
  const message = String(payload.message || '').trim().slice(0, 3500)

  if (!name || !email || !message) {
    return { ok: false, reason: 'Missing fields' }
  }

  const escape = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  const lines = [
    '<b>Yeni iletişim formu</b>',
    '',
    `<b>İsim:</b> ${escape(name)}`,
    `<b>E-posta:</b> ${escape(email)}`,
  ]
  if (company) lines.push(`<b>Şirket:</b> ${escape(company)}`)
  if (projectType) lines.push(`<b>Konu:</b> ${escape(projectType)}`)
  lines.push('', escape(message))

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.ok) {
    return { ok: false, reason: data.description || `HTTP ${res.status}` }
  }
  return { ok: true }
}
