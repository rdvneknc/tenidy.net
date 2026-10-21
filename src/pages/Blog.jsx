import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { listPosts } from '../lib/firestore'
import { useLanguage } from '../i18n/LanguageContext'

export default function Blog() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPosts({ publishedOnly: true })
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="border-b border-line">
      <div className="container-pad py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <p className="label-caps mb-3 text-[11px] text-muted">{t.blog.label}</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t.blog.title}</h1>
          <p className="mt-3 text-base text-white/65">{t.blog.subtitle}</p>
        </motion.div>

        {loading ? (
          <p className="mt-12 text-sm text-muted">Loading…</p>
        ) : posts.length ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-line">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted">
                        ekiworks
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-[10px] tracking-[0.16em] text-muted uppercase">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold transition group-hover:text-lime">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-1.5 line-clamp-2 text-sm text-white/55">{post.excerpt}</p>
                  )}
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-muted">{t.blog.empty}</p>
        )}
      </div>
    </section>
  )
}
