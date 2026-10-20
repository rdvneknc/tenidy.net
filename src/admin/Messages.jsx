import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteMessage, listMessages, markMessageRead } from '../lib/firestore'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const data = await listMessages()
    setMessages(data)
  }

  useEffect(() => {
    load().catch(console.error)
  }, [])

  const openMessage = async (msg) => {
    setSelected(msg)
    if (!msg.isRead) {
      const updated = await markMessageRead(msg.id)
      setMessages((list) => list.map((m) => (m.id === msg.id ? updated : m)))
      setSelected(updated)
    }
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await deleteMessage(id)
    setSelected(null)
    await load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
      <p className="mt-1 text-sm text-muted">Inquiries from the contact form.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {messages.map((msg) => (
            <button
              key={msg.id}
              type="button"
              onClick={() => openMessage(msg)}
              className={`flex w-full flex-col border-b border-white/8 px-4 py-3.5 text-left transition hover:bg-white/[0.03] ${
                selected?.id === msg.id ? 'bg-white/[0.04]' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm ${msg.isRead ? 'font-medium text-white/80' : 'font-semibold'}`}>
                  {msg.name}
                </p>
                {!msg.isRead && <span className="size-2 rounded-full bg-lime" />}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted">{msg.email}</p>
              <p className="mt-1 truncate text-sm text-white/55">{msg.message}</p>
              <p className="mt-1 text-[10px] text-muted">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </button>
          ))}
          {!messages.length && (
            <p className="px-4 py-10 text-center text-sm text-muted">No messages yet.</p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111] p-5">
          {selected ? (
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-lime">
                    {selected.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(selected.id)}
                  className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              {(selected.company || selected.projectType) && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {selected.company && (
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-muted">
                      {selected.company}
                    </span>
                  )}
                  {selected.projectType && (
                    <span className="rounded-full border border-lime/30 px-2.5 py-1 text-lime">
                      {selected.projectType}
                    </span>
                  )}
                </div>
              )}
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                {selected.message}
              </p>
              <p className="mt-4 text-xs text-muted">
                {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="py-16 text-center text-sm text-muted">Select a message to read.</p>
          )}
        </div>
      </div>
    </div>
  )
}
