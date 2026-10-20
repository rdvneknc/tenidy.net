import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '../lib/firestore'
import { useLanguage } from '../i18n/LanguageContext'

export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getPostBySlug(slug)
      .then((data) => {
        if (!data) setError('not-found')
        else setPost(data)
      })
      .catch(() => setError('not-found'))
  }, [slug])

  if (error) {
    return (
      <section className="container-pad py-20">
        <p className="text-muted">{t.blog.notFound}</p>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-sm text-lime">
          <ArrowLeft className="size-4" />
          {t.blog.back}
        </Link>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="container-pad py-20">
        <p className="text-muted">Loading…</p>
      </section>
    )
  }

  return (
    <article className="border-b border-line">
      <div className="container-pad py-12 md:py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-lime"
        >
          <ArrowLeft className="size-4" />
          {t.blog.back}
        </Link>

        <p className="label-caps mt-8 text-[11px] text-muted">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-4 max-w-2xl text-lg text-white/65">{post.excerpt}</p>
        )}

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt=""
            className="mt-10 aspect-[21/9] w-full rounded-2xl object-cover"
          />
        )}

        <div className="prose-invert mt-10 max-w-3xl whitespace-pre-wrap text-base leading-relaxed text-white/75">
          {post.content}
        </div>
      </div>
    </article>
  )
}
