import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Clapperboard, FileText, LayoutDashboard, LogOut, Mail, Video } from 'lucide-react'
import { db } from '../lib/firebase'
import { useAdminAuth } from './AdminAuth'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/videos', label: 'Videos', icon: Video },
  { to: '/admin/messages', label: 'Messages', icon: Mail, badge: 'messages' },
  { to: '/admin/blog', label: 'Blog', icon: FileText },
]

export default function AdminLayout() {
  const { user, loading, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    if (!user) return undefined
    const q = query(collection(db, 'messages'), where('isRead', '==', false))
    return onSnapshot(
      q,
      (snap) => setUnread(snap.size),
      (err) => console.error(err),
    )
  }, [user])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-white/60">
        Loading…
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-white/10 bg-[#0f0f0f]">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-2">
            <Clapperboard className="size-5 text-lime" />
            <div>
              <p className="text-sm font-bold tracking-tight">tenidy</p>
              <p className="text-[10px] tracking-[0.16em] text-muted uppercase">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon
            const showBadge = item.badge === 'messages' && unread > 0
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-lime/15 text-lime'
                      : 'text-white/65 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="relative">
                  <Icon className="size-4" />
                  {showBadge && (
                    <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-lime shadow-[0_0_6px_rgba(212,248,103,0.85)]" />
                  )}
                </span>
                <span className="flex-1">{item.label}</span>
                {showBadge && (
                  <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-lime px-1.5 py-0.5 text-[10px] font-bold leading-none text-ink">
                    {unread > 99 ? '99+' : unread}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <p className="mb-2 truncate px-3 text-xs text-muted">{user.email}</p>
          <button
            type="button"
            onClick={async () => {
              await logout()
              navigate('/admin/login')
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="size-4" />
            Log out
          </button>
        </div>
      </aside>

      <main className="ml-56 min-h-screen p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
