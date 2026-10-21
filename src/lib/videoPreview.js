export function parseVideoId(url = '') {
  if (!url) return null

  const yt =
    url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/,
    ) || url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (yt?.[1]) return { provider: 'youtube', id: yt[1] }

  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm?.[1]) return { provider: 'vimeo', id: vm[1] }

  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return { provider: 'file', id: url }

  return null
}

/** Sync cover URL when possible (YouTube). Empty for Vimeo — use fetchVimeoThumbnail. */
export function getVideoThumbnail(url = '') {
  const parsed = parseVideoId(url)
  if (!parsed) return ''
  if (parsed.provider === 'youtube') {
    return `https://i.ytimg.com/vi/${parsed.id}/hqdefault.jpg`
  }
  return ''
}

/** Prefer custom thumbnail; otherwise provider cover. */
export function resolveWorkThumbnail(work) {
  if (work?.thumbnail) return work.thumbnail
  return getVideoThumbnail(work?.videoUrl || '')
}

export async function fetchVimeoThumbnail(url = '') {
  const parsed = parseVideoId(url)
  if (parsed?.provider !== 'vimeo') return ''
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`,
    )
    if (!res.ok) return ''
    const data = await res.json()
    return data.thumbnail_url || ''
  } catch {
    return ''
  }
}

/** Muted autoplay preview for card hover. */
export function getVideoPreview(url = '') {
  const parsed = parseVideoId(url)
  if (!parsed) return null

  if (parsed.provider === 'youtube') {
    const id = parsed.id
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&loop=1&playlist=${id}`,
    }
  }

  if (parsed.provider === 'vimeo') {
    return {
      type: 'iframe',
      src: `https://player.vimeo.com/video/${parsed.id}?autoplay=1&muted=1&background=1&loop=1&autopause=0`,
    }
  }

  return { type: 'file', src: parsed.id }
}

/** Full player embed for lightbox (with controls, sound). */
export function getVideoWatchEmbed(url = '') {
  const parsed = parseVideoId(url)
  if (!parsed) return null

  if (parsed.provider === 'youtube') {
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${parsed.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    }
  }

  if (parsed.provider === 'vimeo') {
    return {
      type: 'iframe',
      src: `https://player.vimeo.com/video/${parsed.id}?autoplay=1&title=0&byline=0&portrait=0`,
    }
  }

  return { type: 'file', src: parsed.id }
}
