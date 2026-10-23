import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ExternalLink, GripVertical, Pencil, Plus, Trash2, X } from 'lucide-react'
import {
  createWebsite,
  deleteWebsite,
  ensureSeedWebsites,
  reorderWebsites,
  updateWebsite,
} from '../lib/firestore'
import { mediaSrc } from '../lib/media'
import AdminSelect from './AdminSelect'
import LocalImageField from './LocalImageField'

const SITE_TAGS = [
  'Gaming',
  'SaaS',
  'Studio',
  'E-commerce',
  'Fintech',
  'Hospitality',
  'Local Business',
  'Other',
]

const emptyForm = {
  title: '',
  url: '',
  thumbnail: '',
  tag: 'Other',
}

function SortableRow({ site, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: site.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  }

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-white/8 hover:bg-white/[0.02]">
      <td className="w-10 px-2 py-3">
        <button
          type="button"
          className="cursor-grab touch-none text-white/40 hover:text-white"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>
      </td>
      <td className="px-2 py-3">
        <div className="flex items-center gap-3">
          {site.thumbnail ? (
            <img
              src={mediaSrc(site.thumbnail)}
              alt=""
              className="h-12 w-20 rounded object-cover object-top"
            />
          ) : (
            <div className="flex h-12 w-20 items-center justify-center rounded bg-white/5 text-[10px] text-muted">
              —
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{site.title}</p>
            <p className="truncate text-xs text-muted">{site.tag || '—'}</p>
          </div>
        </div>
      </td>
      <td className="hidden px-2 py-3 text-sm md:table-cell">
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-[220px] items-center gap-1 truncate text-white/60 transition hover:text-lime"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="truncate">{site.url.replace(/^https?:\/\//, '')}</span>
          <ExternalLink className="size-3 shrink-0" />
        </a>
      </td>
      <td className="hidden px-2 py-3 text-sm md:table-cell">{site.tag || '—'}</td>
      <td className="px-2 py-3 text-right">
        <div className="inline-flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(site)}
            className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(site)}
            className="rounded-lg p-2 text-white/50 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminWebsites() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const data = await ensureSeedWebsites()
    setItems(data)
  }, [])

  useEffect(() => {
    load().catch((err) => setError(err.message))
  }, [load])

  const filtered = useMemo(() => {
    return items.filter((site) => {
      if (filterTag && site.tag !== filterTag) return false
      if (query) {
        const q = query.toLowerCase()
        const hay = `${site.title} ${site.url} ${site.tag}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [items, filterTag, query])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setOpen(true)
  }

  const openEdit = (site) => {
    setEditing(site)
    setForm({
      title: site.title,
      url: site.url,
      thumbnail: site.thumbnail || '',
      tag: SITE_TAGS.includes(site.tag) ? site.tag : site.tag || 'Other',
    })
    setError('')
    setOpen(true)
  }

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (!form.title.trim()) throw new Error('Title is required')
      if (!form.url.trim()) throw new Error('Website URL is required')
      if (!form.thumbnail.trim()) throw new Error('Cover image is required')
      let url = form.url.trim()
      if (!/^https?:\/\//i.test(url)) url = `https://${url}`

      const payload = {
        title: form.title.trim(),
        url,
        thumbnail: form.thumbnail.trim(),
        description: '',
        tag: form.tag.trim() || 'Other',
      }
      if (editing) await updateWebsite(editing.id, payload)
      else await createWebsite(payload)
      setOpen(false)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (site) => {
    if (!confirm(`Delete “${site.title}”?`)) return
    await deleteWebsite(site.id)
    await load()
  }

  const onDragEnd = async (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldFilteredIndex = filtered.findIndex((s) => s.id === active.id)
    const newFilteredIndex = filtered.findIndex((s) => s.id === over.id)
    if (oldFilteredIndex < 0 || newFilteredIndex < 0) return

    const reorderedFiltered = arrayMove(filtered, oldFilteredIndex, newFilteredIndex)
    const next = [...items]
    const slotIndexes = items
      .map((s, i) => (filtered.some((f) => f.id === s.id) ? i : -1))
      .filter((i) => i >= 0)
    slotIndexes.forEach((slot, i) => {
      next[slot] = reorderedFiltered[i]
    })

    setItems(next)
    try {
      await reorderWebsites(next.map((s) => s.id))
    } catch (err) {
      console.error(err)
      await load()
    }
  }

  const tagOptions = useMemo(() => {
    const custom = form.tag && !SITE_TAGS.includes(form.tag) ? [form.tag] : []
    return [...SITE_TAGS, ...custom].map((tag) => ({ value: tag, label: tag }))
  }, [form.tag])

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Websites</h1>
          <p className="mt-1 text-sm text-muted">
            /websites portföy kartları · kapak önerisi 1200×750 (16:10)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!items.length && (
            <button
              type="button"
              onClick={() => load().catch((err) => setError(err.message))}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-lime hover:text-lime"
            >
              Load starter sites
            </button>
          )}
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-lime px-4 py-2.5 text-sm font-semibold text-ink"
          >
            <Plus className="size-4" />
            Add website
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-lime"
        />
        <AdminSelect
          aria-label="Filter by tag"
          className="min-w-[9rem]"
          value={filterTag}
          onChange={setFilterTag}
          options={[
            { value: '', label: 'All tags' },
            ...SITE_TAGS.map((tag) => ({ value: tag, label: tag })),
          ]}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-2 py-3" />
                <th className="px-2 py-3 font-medium">Site</th>
                <th className="hidden px-2 py-3 font-medium md:table-cell">URL</th>
                <th className="hidden px-2 py-3 font-medium md:table-cell">Tag</th>
                <th className="px-2 py-3" />
              </tr>
            </thead>
            <SortableContext items={filtered.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <tbody>
                {filtered.map((site) => (
                  <SortableRow
                    key={site.id}
                    site={site}
                    onEdit={openEdit}
                    onDelete={onDelete}
                  />
                ))}
                {!filtered.length && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted">
                      No websites found.
                    </td>
                  </tr>
                )}
              </tbody>
            </SortableContext>
          </table>
        </DndContext>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <form
            onSubmit={onSave}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#111] p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">{editing ? 'Edit website' : 'Add website'}</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-white/50">
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3">
              <Field label="Title">
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="field"
                  placeholder="Limon Games"
                />
              </Field>

              <Field label="Website URL">
                <input
                  required
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="field"
                  placeholder="https://www.example.com"
                />
              </Field>

              <Field label="Tag">
                <AdminSelect
                  aria-label="Tag"
                  value={SITE_TAGS.includes(form.tag) ? form.tag : form.tag || 'Other'}
                  onChange={(tag) => setForm({ ...form, tag })}
                  options={tagOptions}
                />
              </Field>

              {!SITE_TAGS.includes(form.tag) && form.tag && (
                <p className="text-xs text-muted">Custom tag: {form.tag}</p>
              )}

              <LocalImageField
                label="Cover image (required · 1200×750 önerilir)"
                value={form.thumbnail}
                onChange={(thumbnail) => setForm({ ...form, thumbnail })}
                warningText="Görseli public/ veya public/media altına koyup yolu yazın (örn. /limon-games-website.webp). Geliştirmede local yükleme public/media’ya kaydeder."
              />
            </div>

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="mt-5 w-full rounded-xl bg-lime py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save website'}
            </button>
          </form>
        </div>
      )}

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.03);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
        }
        .field:focus { border-color: #d4f867; }
      `}</style>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-white/70">{label}</span>
      {children}
    </label>
  )
}
