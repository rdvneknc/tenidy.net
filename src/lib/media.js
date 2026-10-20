/** Resolve thumbnail / cover paths stored in the project (public/media/…). */
export function mediaSrc(url) {
  if (!url) return ''
  return url
}

export function isLocalMediaDev() {
  return import.meta.env.DEV
}

/**
 * Saves an image into public/media via Vite dev middleware.
 * Only works during `npm run dev` — on live, add files under public/media locally, then deploy.
 */
export async function uploadLocalImage(file) {
  if (!isLocalMediaDev()) {
    throw new Error(
      'Canlıda dosya yüklenemez. Görseli bilgisayarında public/media klasörüne ekleyip yolu yaz (/media/dosya.jpg), sonra deploy et.',
    )
  }

  const bytes = new Uint8Array(await file.arrayBuffer())
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }

  const res = await fetch('/api/local-media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: file.name,
      data: btoa(binary),
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Upload failed')
  return data.url
}
