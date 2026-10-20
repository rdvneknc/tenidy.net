import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import { createPost, deletePost, listPosts, updatePost } from '../lib/firestore'
import LocalImageField from './LocalImageField'

const empty = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  published: false,
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    const data = await listPosts()
    setPosts(data)
  }

  useEffect(() => {
    load().catch(console.error)
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(empty)
    setError('')
    setOpen(true)
  }

  const openEdit = (post) => {
    setEditing(post)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      coverImage: post.coverImage || '',
      published: post.published,
    })
    setError('')
    setOpen(true)
  }

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editing) await updatePost(editing.id, form)
      else await createPost(form)
      setOpen(false)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (post) => {
    if (!confirm(`Delete “${post.title}”?`)) return
    await deletePost(post.id)
    await load()
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="mt-1 text-sm text-muted">
            Cover optional — add from local via public/media
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-lime px-4 py-2.5 text-sm font-semibold text-ink"
        >
          <Plus className="size-4" />
          New post
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/[0.03] text-xs tracking-wide text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Post</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-white/8">
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold">{post.title}</p>
                  <p className="text-xs text-muted">/{post.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      post.published ? 'bg-lime/15 text-lime' : 'bg-white/5 text-white/45'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => openEdit(post)}
                    className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(post)}
                    className="rounded-lg p-2 text-white/50 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
            {!posts.length && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-muted">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={onSave}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111] p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editing ? 'Edit post' : 'New post'}</h2>
              <button type="button" onClick={() => setOpen(false)}>
                <X className="size-5 text-white/50" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs text-white/70">Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-lime"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-white/70">Slug (optional)</span>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-lime"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs text-white/70">Excerpt</span>
                <input
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-lime"
                />
              </label>
              <LocalImageField
                label="Cover image (optional)"
                value={form.coverImage}
                onChange={(coverImage) => setForm({ ...form, coverImage })}
                warningText="Kapak görseli şart değil. Lokalden public/media klasörüne eklemeyi unutmayın."
              />
              <label className="block">
                <span className="mb-1.5 block text-xs text-white/70">Content</span>
                <textarea
                  required
                  rows={10}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-lime"
                  placeholder="Write your post…"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                Published
              </label>
            </div>

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="mt-5 w-full rounded-xl bg-lime py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save post'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
