import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceCard } from '@/components/TreatmentCard'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { buildPageSeo } from '@/lib/seo'
import { breadcrumbSchema, webpageSchema } from '@/lib/structuredData'

export function Treatments() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'treatments')
  const jsonLd = [
    webpageSchema(config, seo.title, '/treatments', seo.description),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'Treatments', path: '/treatments' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Treatments' }]} />
      <section className="section-pad pb-10 pt-6 sm:pb-14">
        <div className="container-wide">
          <SectionHeading
            as="h1"
            eyebrow={`${config.contact.city} MedSpa`}
            title="Aesthetic treatments"
            description="Educational overviews of treatment categories commonly discussed during consultation. Suitability is always determined with a qualified provider."
          />
        </div>
      </section>
      <section className="section-pad pb-20">
        <div className="container-wide grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {config.treatments.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.04}>
              <ServiceCard treatment={t} />
            </Reveal>
          ))}
        </div>
        <div className="container-wide mt-12 text-sm text-muted-foreground">
          Looking for local context? Visit our{' '}
          <Link to="/locations/austin" className="text-foreground underline-offset-2 hover:underline">
            Austin location page
          </Link>{' '}
          or{' '}
          <Link to="/faq" className="text-foreground underline-offset-2 hover:underline">
            FAQs
          </Link>
          .
        </div>
      </section>
      <CTASection
        headline={config.cta.finalHeadline}
        primaryLabel={config.cta.book}
        primaryHref="/book"
      />
    </>
  )
}
