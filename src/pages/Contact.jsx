import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MapPin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { createMessage } from '../lib/firestore'
import Seo from '../components/Seo'

const WHATSAPP = '+372 5354 6911'
const WHATSAPP_LINK = 'https://wa.me/37253546911'

export default function Contact() {
  const { t } = useLanguage()
  const { contact } = t
  const [projectType, setProjectType] = useState(contact.projectTypes[0])
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setEmailCopied(true)
      window.setTimeout(() => setEmailCopied(false), 1800)
    } catch {
      // fallback: select text if clipboard blocked
    }
  }

  useEffect(() => {
    setProjectType(contact.projectTypes[0])
  }, [contact.projectTypes])

  const onSubmit = async (e) => {
    e.preventDefault()
    const formEl = e.currentTarget
    setSending(true)
    setStatus('')
    const data = new FormData(formEl)
    try {
      await createMessage({
        name: data.get('name'),
        email: data.get('email'),
        company: data.get('company') || '',
        projectType,
        message: data.get('message'),
      })
      setStatus('ok')
      formEl.reset()
      setProjectType(contact.projectTypes[0])
    } catch (err) {
      setStatus(err.message || 'error')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="flex min-h-[calc(100dvh-3.5rem)] flex-col border-b border-line bg-[radial-gradient(circle_at_82%_18%,rgba(212,248,103,0.035),transparent_34%)] md:min-h-[calc(100dvh-4rem)]">
      <Seo title={t.seo.contact.title} description={t.seo.contact.description} path="/contact" />
      <div className="container-pad flex flex-1 flex-col py-9 md:py-11">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex h-full flex-col"
          >
            <p className="label-caps mb-3 text-[11px] text-lime">{contact.label}</p>
            <h1 className="max-w-md text-[2rem] leading-[1.05] font-extrabold tracking-tight md:text-4xl lg:text-[2.85rem]">
              {contact.title}{' '}
              <span className="text-lime">{contact.titleAccent}</span>
            </h1>
            <p className="mt-3.5 max-w-md text-[15px] leading-relaxed font-normal text-white/65">
              {contact.subtitle}
            </p>

            <div className="mt-7 border-y border-white/10">
              <div className="flex items-center gap-3.5 border-b border-white/10 py-4">
                <a
                  href={`mailto:${contact.email}`}
                  aria-label={contact.emailLabel}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] transition hover:border-lime/40 hover:text-lime"
                >
                  <Mail className="size-4" strokeWidth={1.7} />
                </a>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium tracking-[0.17em] text-muted uppercase">
                    {contact.emailLabel}
                  </p>
                  <p className="mt-0.5 select-all text-[15px] font-semibold break-all">
                    {contact.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={emailCopied ? 'Copied' : 'Copy email'}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white/50 transition hover:border-lime/40 hover:text-lime"
                >
                  {emailCopied ? (
                    <Check className="size-3.5 text-lime" strokeWidth={2.4} />
                  ) : (
                    <Copy className="size-3.5" strokeWidth={1.8} />
                  )}
                </button>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3.5 py-4"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03]">
                  <MessageCircle className="size-4" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium tracking-[0.17em] text-muted uppercase">
                    {contact.whatsappCta}
                  </p>
                  <p className="mt-0.5 text-[15px] font-semibold">{WHATSAPP}</p>
                </div>
                <ArrowUpRight className="size-4 text-white/35 transition group-hover:text-lime" />
              </a>
            </div>

            <div className="mt-8">
              <div className="mb-3.5 flex items-baseline justify-between gap-3">
                <p className="label-caps text-[10px] text-muted">{contact.hqLabel}</p>
                {contact.hqSubtitle && (
                  <p className="text-[11px] text-white/35">{contact.hqSubtitle}</p>
                )}
              </div>
              <ul className="space-y-2">
                {contact.offices.map((office) => (
                  <li
                    key={office.city}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 transition hover:border-white/18"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/[0.03] text-lime/90">
                      <MapPin className="size-3.5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold tracking-tight">{office.city}</p>
                      <p className="text-xs text-muted">{office.country}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="flex h-full flex-col rounded-2xl border border-white/12 bg-[#111514]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:p-7"
          >
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">{contact.formTitle}</h2>
            <p className="mt-1 text-sm text-muted">{contact.formSubtitle}</p>

            <form onSubmit={onSubmit} className="mt-5 flex min-h-0 flex-1 flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-white/70">{contact.name}</span>
                  <input
                    name="name"
                    required
                    placeholder={contact.namePlaceholder}
                    className="w-full rounded-lg border border-white/15 bg-white/[0.025] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-white/70">
                    {contact.emailField}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={contact.emailPlaceholder}
                    className="w-full rounded-lg border border-white/15 bg-white/[0.025] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-white/70">
                  {contact.companyOptional}
                </span>
                <input
                  name="company"
                  placeholder={contact.companyPlaceholder}
                  className="w-full rounded-lg border border-white/15 bg-white/[0.025] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime"
                />
              </label>

              <fieldset>
                <legend className="mb-2 text-xs font-medium text-white/70">
                  {contact.projectType}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {contact.projectTypes.map((type) => {
                    const active = projectType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setProjectType(type)}
                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                          active
                            ? 'border-lime bg-lime/5 text-lime'
                            : 'border-white/15 text-white/60 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <label className="flex min-h-[9rem] flex-1 flex-col">
                <span className="mb-1.5 block text-xs font-medium text-white/70">{contact.message}</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={contact.messagePlaceholder}
                  className="min-h-[8rem] w-full flex-1 resize-none rounded-lg border border-white/15 bg-white/[0.025] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime"
                />
              </label>

              <div className="mt-auto space-y-3 pt-1">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-95 disabled:opacity-60"
                >
                  {sending ? '…' : contact.send}
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </button>
                {status === 'ok' && (
                  <p className="text-sm text-lime">Thanks — we received your message.</p>
                )}
                {status && status !== 'ok' && (
                  <p className="text-sm text-red-400">{status}</p>
                )}
                <p className="text-[11px] text-muted">{contact.privacy}</p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
