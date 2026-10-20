import { useEffect, useState } from 'react'
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { createMessage } from '../lib/firestore'

const WHATSAPP = '+372 5354 6911'
const WHATSAPP_LINK = 'https://wa.me/37253546911'

export default function Contact() {
  const { t } = useLanguage()
  const { contact } = t
  const [projectType, setProjectType] = useState(contact.projectTypes[0])
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

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
      <div className="container-pad flex flex-1 flex-col justify-between py-9 md:py-11">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
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
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3.5 border-b border-white/10 py-4"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03]">
                  <Mail className="size-4" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium tracking-[0.17em] text-muted uppercase">
                    {contact.emailLabel}
                  </p>
                  <p className="mt-0.5 truncate text-[15px] font-semibold">{contact.email}</p>
                </div>
                <ArrowUpRight className="size-4 text-white/35 transition group-hover:text-lime" />
              </a>

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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="rounded-2xl border border-white/12 bg-[#111514]/90 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:p-7"
          >
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">{contact.formTitle}</h2>
            <p className="mt-1 text-sm text-muted">{contact.formSubtitle}</p>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
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

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-white/70">{contact.message}</span>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder={contact.messagePlaceholder}
                  className="w-full resize-y rounded-lg border border-white/15 bg-white/[0.025] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-lime"
                />
              </label>

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
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-8 border-t border-white/10 pt-6 md:mt-10"
        >
          <p className="label-caps mb-4 text-[10px] text-muted">{contact.hqLabel}</p>

          <div className="grid gap-0 sm:grid-cols-3">
            {contact.offices.map((office, i) => (
              <div
                key={office.city}
                className={`flex items-center gap-3 py-3 sm:px-6 sm:py-1 ${
                  i > 0 ? 'border-t border-white/10 sm:border-t-0 sm:border-l' : ''
                } ${i === 0 ? 'sm:pl-0' : ''}`}
              >
                <MapPin className="size-4 shrink-0 text-white/70" strokeWidth={1.6} />
                <div>
                  <p className="text-sm font-semibold">{office.city}</p>
                  <p className="text-xs text-muted">{office.country}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
