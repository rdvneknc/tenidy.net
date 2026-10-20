/** Comma-separated admin emails in VITE_ADMIN_EMAILS (no public signup). */
export function getAdminEmails() {
  return (import.meta.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAllowedAdmin(email) {
  if (!email) return false
  const list = getAdminEmails()
  if (!list.length) return false
  return list.includes(String(email).trim().toLowerCase())
}
