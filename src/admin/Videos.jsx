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
import { GripVertical, Pencil, Plus, Trash2, X } from 'lucide-react'
import {
  createVideo,
  deleteVideo,
  listVideos,
  reorderVideos,
  updateVideo,
} from '../lib/firestore'
import { mediaSrc } from '../lib/media'
import { resolveWorkThumbnail } from '../lib/videoPreview'
import AdminSelect from './AdminSelect'
import LocalImageField from './LocalImageField'

const MEDIA_TAGS = [
  'Game Ads',
  'Application Ads',
  'UGC',
  'Social Media',
  'AI Visuals',
  'Other',
]

const emptyForm = {
  title: '',
  duration: '',
  videoUrl: '',
  thumbnail: '',
  aspectRatio: '9:16',
  mediaType: 'video',
  videoType: 'Game Ads',
  showOnHome: true,
}

function SortableRow({ video, onEdit, onDelete, onToggleHome }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: video.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  }

  const isImage = video.mediaType === 'image'

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
          {(() => {
            const thumb = video.thumbnail
              ? mediaSrc(video.thumbnail)
              : resolveWorkThumbnail(video)
            return thumb ? (
              <img
                src={thumb}
                alt=""
                className="h-12 w-10 rounded object-cover md:h-14 md:w-20"
              />
            ) : (
              <div className="flex h-12 w-10 items-center justify-center rounded bg-white/5 text-[10px] text-muted md:h-14 md:w-20">
                —
              </div>
            )
          })()}
          <div>
            <p className="text-sm font-semibold">
              {video.title || (isImage ? 'Untitled image' : 'Untitled')}
            </p>
            <p className="text-xs text-muted">
              {isImage ? 'Image' : 'Video'}
              {video.videoType ? ` · ${video.videoType}` : ''}
            </p>
          </div>
        </div>
      </td>
      <td className="hidden px-2 py-3 text-sm md:table-cell">{video.aspectRatio}</td>
      <td className="hidden px-2 py-3 text-sm capitalize md:table-cell">
        {isImage ? 'Image' : 'Video'}
      </td>
      <td className="px-2 py-3">
        <button
          type="button"
          onClick={() => onToggleHome(video)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
            video.showOnHome ? 'bg-lime/15 text-lime' : 'bg-white/5 text-white/45'
          }`}
        >
          {video.showOnHome ? 'On home' : 'Hidden'}
        </button>
      </td>
      <td className="px-2 py-3 text-right">
        <div className="inline-flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(video)}
            className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(video)}
            className="rounded-lg p-2 text-white/50 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminVideos() {
  const [videos, setVideos] = useState([])
  const [filterAspect, setFilterAspect] = useState('')
  const [filterMedia, setFilterMedia] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [filterHome, setFilterHome] = useState('')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const data = await listVideos()
    setVideos(data)
  }, [])

  useEffect(() => {
    load().catch((err) => setError(err.message))
  }, [load])

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      if (filterAspect && v.aspectRatio !== filterAspect) return false
      if (filterMedia && v.mediaType !== filterMedia) return false
      if (filterTag && v.videoType !== filterTag) return false
      if (filterHome === '1' && !v.showOnHome) return false
      if (filterHome === '0' && v.showOnHome) return false
      if (query) {
        const q = query.toLowerCase()
        if (
          !v.title.toLowerCase().includes(q) &&
          !(v.videoType || '').toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [videos, filterAspect, filterMedia, filterTag, filterHome, query])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setOpen(true)
  }

  const openEdit = (video) => {
    setEditing(video)
    setForm({
      title: video.title,
      duration: video.duration || '',
      videoUrl: video.videoUrl || '',
      thumbnail: video.thumbnail || '',
      aspectRatio: video.aspectRatio,
      mediaType: video.mediaType === 'image' ? 'image' : 'video',
      videoType: MEDIA_TAGS.includes(video.videoType) ? video.videoType : 'Other',
      showOnHome: video.showOnHome,
    })
    setError('')
    setOpen(true)
  }

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const isImage = form.mediaType === 'image'
      if (!isImage && !form.title?.trim()) {
        throw new Error('Title is required')
      }
      if (isImage && !form.thumbnail?.trim()) {
        throw new Error('Image requires a file / path under public/media')
      }
      if (!isImage && !form.videoUrl?.trim()) {
        throw new Error('Video link is required')
      }
      const payload = {
        ...form,
        title: isImage ? '' : form.title.trim(),
        videoType: form.videoType || 'Other',
        duration: isImage ? '' : form.duration,
        videoUrl: isImage ? '' : form.videoUrl,
      }
      if (editing) await updateVideo(editing.id, payload)
      else await createVideo(payload)
      setOpen(false)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (video) => {
    if (!confirm(`Delete “${video.title || (video.mediaType === 'image' ? 'image' : 'item')}”?`)) return
    await deleteVideo(video.id)
    await load()
  }

  const onToggleHome = async (video) => {
    await updateVideo(video.id, { showOnHome: !video.showOnHome })
    await load()
  }

  const onDragEnd = async (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldFilteredIndex = filtered.findIndex((v) => v.id === active.id)
    const newFilteredIndex = filtered.findIndex((v) => v.id === over.id)
    if (oldFilteredIndex < 0 || newFilteredIndex < 0) return

    const reorderedFiltered = arrayMove(filtered, oldFilteredIndex, newFilteredIndex)

    const next = [...videos]
    const slotIndexes = videos
      .map((v, i) => (filtered.some((f) => f.id === v.id) ? i : -1))
      .filter((i) => i >= 0)
    slotIndexes.forEach((slot, i) => {
      next[slot] = reorderedFiltered[i]
    })

    setVideos(next)
    try {
      await reorderVideos(next.map((v) => v.id))
    } catch (err) {
      console.error(err)
      await load()
    }
  }

  const isImage = form.mediaType === 'image'

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media</h1>
          <p className="mt-1 text-sm text-muted">
            Videos and images — thumbnail optional for videos (YouTube/Vimeo cover used if empty)
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-lime px-4 py-2.5 text-sm font-semibold text-ink"
        >
          <Plus className="size-4" />
          Add media
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-lime"
        />
        <AdminSelect
          aria-label="Filter by ratio"
          className="min-w-[9rem]"
          value={filterAspect}
          onChange={setFilterAspect}
          options={[
            { value: '', label: 'All ratios' },
            { value: '9:16', label: '9:16' },
            { value: '16:9', label: '16:9' },
          ]}
        />
        <AdminSelect
          aria-label="Filter by media"
          className="min-w-[9rem]"
          value={filterMedia}
          onChange={setFilterMedia}
          options={[
            { value: '', label: 'All media' },
            { value: 'video', label: 'Videos' },
            { value: 'image', label: 'Images' },
          ]}
        />
        <AdminSelect
          aria-label="Filter by tag"
          className="min-w-[10rem]"
          value={filterTag}
          onChange={setFilterTag}
          options={[
            { value: '', label: 'All tags' },
            ...MEDIA_TAGS.map((tag) => ({ value: tag, label: tag })),
          ]}
        />
        <AdminSelect
          aria-label="Filter by homepage"
          className="min-w-[9rem]"
          value={filterHome}
          onChange={setFilterHome}
          options={[
            { value: '', label: 'Home: all' },
            { value: '1', label: 'On homepage' },
            { value: '0', label: 'Not on homepage' },
          ]}
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-2 py-3" />
                <th className="px-2 py-3 font-medium">Item</th>
                <th className="hidden px-2 py-3 font-medium md:table-cell">Ratio</th>
                <th className="hidden px-2 py-3 font-medium md:table-cell">Type</th>
                <th className="px-2 py-3 font-medium">Home</th>
                <th className="px-2 py-3" />
              </tr>
            </thead>
            <SortableContext items={filtered.map((v) => v.id)} strategy={verticalListSortingStrategy}>
              <tbody>
                {filtered.map((video) => (
                  <SortableRow
                    key={video.id}
                    video={video}
                    onEdit={openEdit}
                    onDelete={onDelete}
                    onToggleHome={onToggleHome}
                  />
                ))}
                {!filtered.length && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">
                      No media found.
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
              <h2 className="text-lg font-bold">{editing ? 'Edit media' : 'Add media'}</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-white/50">
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Media type">
                  <AdminSelect
                    aria-label="Media type"
                    value={form.mediaType}
                    onChange={(mediaType) =>
                      setForm({
                        ...form,
                        mediaType,
                        title: mediaType === 'image' ? '' : form.title,
                        duration: mediaType === 'image' ? '' : form.duration,
                        videoUrl: mediaType === 'image' ? '' : form.videoUrl,
                      })
                    }
                    options={[
                      { value: 'video', label: 'Video' },
                      { value: 'image', label: 'Image' },
                    ]}
                  />
                </Field>
                <Field label="Aspect ratio">
                  <AdminSelect
                    aria-label="Aspect ratio"
                    value={form.aspectRatio}
                    onChange={(aspectRatio) => setForm({ ...form, aspectRatio })}
                    options={[
                      { value: '9:16', label: '9:16' },
                      { value: '16:9', label: '16:9' },
                    ]}
                  />
                </Field>
              </div>

              <Field label="Tag">
                <AdminSelect
                  aria-label="Tag"
                  value={form.videoType}
                  onChange={(videoType) => setForm({ ...form, videoType })}
                  options={MEDIA_TAGS.map((tag) => ({ value: tag, label: tag }))}
                />
              </Field>

              {!isImage && (
                <Field label="Title">
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="field"
                  />
                </Field>
              )}

              {!isImage && (
                <Field label="Duration">
                  <input
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="field"
                    placeholder="0:28"
                  />
                </Field>
              )}

              {!isImage && (
                <Field label="Video link (URL)">
                  <input
                    required={!isImage}
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    className="field"
                    placeholder="https://…"
                  />
                </Field>
              )}

              <LocalImageField
                label={isImage ? 'Image (required)' : 'Thumbnail (optional)'}
                value={form.thumbnail}
                onChange={(thumbnail) => setForm({ ...form, thumbnail })}
                warningText={
                  isImage
                    ? 'Görseli public/media altına ekleyin veya geliştirme ortamında yükleyin.'
                    : 'Boş bırakırsanız YouTube/Vimeo kapak görseli kullanılır. İsterseniz localden public/media ile özel thumbnail ekleyin.'
                }
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.showOnHome}
                  onChange={(e) => setForm({ ...form, showOnHome: e.target.checked })}
                />
                Show on homepage
              </label>
            </div>

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="mt-5 w-full rounded-xl bg-lime py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
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
