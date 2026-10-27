import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section className="container-pad flex min-h-[50vh] flex-col justify-center border-b border-line py-20">
      <Seo title="404" description={t.seo.home.description} path="/404" noindex />
      <p className="label-caps text-[11px] text-lime">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-white/60">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-lime transition hover:brightness-110"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
    </section>
  )
}
