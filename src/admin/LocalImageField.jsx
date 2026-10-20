import { useState } from 'react'
import { isLocalMediaDev, mediaSrc, uploadLocalImage } from '../lib/media'

export default function LocalImageField({
  label = 'Image',
  value,
  onChange,
  warningText = 'Görseli unutmayın — localden public/media klasörüne ekleyin veya aşağıdaki yüklemeyi kullanın.',
}) {
  const [uploading, setUploading] = useState(false)
  const [localError, setLocalError] = useState('')
  const canUpload = isLocalMediaDev()

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    setLocalError('')
    try {
      const url = await uploadLocalImage(file)
      onChange(url)
    } catch (err) {
      setLocalError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="mb-1.5 block text-xs text-white/70">{label}</span>
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="field w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-lime"
          placeholder="/media/ornek.jpg"
        />
      </label>

      <p className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-3 py-2 text-[12px] leading-relaxed text-amber-200/90">
        {warningText}
        {!canUpload && (
          <>
            {' '}
            Canlı panelde dosya seçilemez; görseli lokal projede ekleyip yolu buraya yazın, sonra deploy edin.
          </>
        )}
      </p>

      {canUpload && (
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/70 hover:border-lime hover:text-lime">
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
          {uploading ? 'Yükleniyor…' : 'Localden görsel seç (public/media)'}
        </label>
      )}

      {localError && <p className="text-sm text-red-400">{localError}</p>}

      {value ? (
        <img src={mediaSrc(value)} alt="" className="h-28 w-full rounded-lg object-cover" />
      ) : null}
    </div>
  )
}
