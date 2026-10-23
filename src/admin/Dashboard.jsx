import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Globe, Mail, Video } from 'lucide-react'
import { getAdminStats } from '../lib/firestore'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch((err) => setError(err.message))
  }, [])

  const cards = [
    {
      label: 'Media',
      value: stats?.videos ?? '—',
      hint: `${stats?.homeVideos ?? 0} on homepage`,
      to: '/admin/videos',
      icon: Video,
    },
    {
      label: 'Websites',
      value: stats?.websites ?? '—',
      hint: 'Portfolio sites',
      to: '/admin/websites',
      icon: Globe,
    },
    {
      label: 'Messages',
      value: stats?.messages ?? '—',
      hint: `${stats?.unread ?? 0} unread`,
      to: '/admin/messages',
      icon: Mail,
    },
    {
      label: 'Blog posts',
      value: stats?.posts ?? '—',
      hint: 'Manage articles',
      to: '/admin/blog',
      icon: FileText,
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Firestore-backed admin · Storage later for uploads</p>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.to}
              to={card.to}
              className="rounded-2xl border border-white/10 bg-[#111] p-5 transition hover:border-lime/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">{card.label}</p>
                <Icon className="size-4 text-lime" />
              </div>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="mt-1 text-sm text-muted">{card.hint}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
