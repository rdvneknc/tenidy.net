import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import Feedback from '../components/Feedback'
import CTA from '../components/CTA'
import Seo from '../components/Seo'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  return (
    <>
      <Seo title={t.seo.home.title} description={t.seo.home.description} path="/" />
      <Hero />
      <Portfolio />
      <Services />
      <Feedback />
      <CTA />
    </>
  )
}
