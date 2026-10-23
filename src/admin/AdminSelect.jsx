import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

/**
 * Custom select for dark admin UI — avoids native <select> white popup on Windows.
 */
export default function AdminSelect({
  value,
  onChange,
  options,
  className = '',
  placeholder = 'Select…',
  'aria-label': ariaLabel,
}) {
  const [open, setOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState(null)
  const rootRef = useRef(null)
  const menuRef = useRef(null)
  const listId = useId()
  const selected = options.find((o) => o.value === value)

  useLayoutEffect(() => {
    if (!open || !rootRef.current) {
      setMenuStyle(null)
      return undefined
    }

    const place = () => {
      const rect = rootRef.current.getBoundingClientRect()
      const menuH = Math.min(224, options.length * 36 + 8)
      const spaceBelow = window.innerHeight - rect.bottom
      const openUp = spaceBelow < menuH + 8 && rect.top > spaceBelow
      setMenuStyle({
        position: 'fixed',
        left: rect.left,
        width: Math.max(rect.width, 140),
        zIndex: 200,
        ...(openUp
          ? { bottom: window.innerHeight - rect.top + 4, top: 'auto' }
          : { top: rect.bottom + 4, bottom: 'auto' }),
      })
    }

    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open, options.length])

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (rootRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return
      setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-left text-sm outline-none transition hover:border-white/25 focus:border-lime"
      >
        <span className={`truncate ${selected ? 'text-white' : 'text-white/45'}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-white/45 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open &&
        menuStyle &&
        createPortal(
          <ul
            ref={menuRef}
            id={listId}
            role="listbox"
            style={menuStyle}
            className="max-h-56 overflow-auto rounded-lg border border-white/15 bg-[#161616] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
          >
            {options.map((opt) => {
              const active = opt.value === value
              return (
                <li key={String(opt.value)} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setOpen(false)
                    }}
                    className={`block w-full px-3 py-2 text-left text-sm transition ${
                      active
                        ? 'bg-lime/15 text-lime'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              )
            })}
          </ul>,
          document.body,
        )}
    </div>
  )
}
