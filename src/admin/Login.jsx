import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Clapperboard } from 'lucide-react'
import Seo from '../components/Seo'
import { useAdminAuth } from './AdminAuth'

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export default function AdminLogin() {
  const { user, loading, login, loginWithGoogle } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/admin" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  const onGoogle = async () => {
    setError('')
    setSubmitting(true)
    try {
      await loginWithGoogle()
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <Seo title="Admin Login" description="ekiworks admin" path="/admin/login" noindex />
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111] p-7">
        <div className="mb-6 flex items-center gap-2">
          <Clapperboard className="size-5 text-lime" />
          <div>
            <p className="font-bold">ekiworks admin</p>
            <p className="text-xs text-muted">Only allowlisted emails</p>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <label className="mb-3 block">
            <span className="mb-1.5 block text-xs text-white/70">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-lime"
              required
            />
          </label>

          <label className="mb-4 block">
            <span className="mb-1.5 block text-xs text-white/70">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-lime"
              required
            />
          </label>

          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-lime py-2.5 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] tracking-wide text-muted uppercase">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={onGoogle}
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.03] py-2.5 text-sm font-medium transition hover:border-white/30 disabled:opacity-60"
        >
          <GoogleIcon className="size-4" />
          Continue with Google
        </button>
      </div>
    </div>
  )
}
