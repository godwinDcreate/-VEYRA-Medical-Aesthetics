import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { LocationSection } from '@/components/LocationSection'
import { FAQAccordion } from '@/components/FAQ'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { buildPageSeo } from '@/lib/seo'
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  webpageSchema,
} from '@/lib/structuredData'

export function LocationPage() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'location')
  const localFaqs = [
    {
      id: 'loc1',
      question: `Where can I find a MedSpa in ${config.contact.city}?`,
      answer: `${config.brand.name} is a fictional premium MedSpa concept located in ${config.contact.city}, ${config.contact.state}. Use the contact details on this page for demo phone, hours, and directions.`,
    },
    {
      id: 'loc2',
      question: `What aesthetic treatments are available in ${config.contact.city}?`,
      answer: `This clinic concept discusses Botox, dermal fillers, laser skin resurfacing, Hydrafacial, skin rejuvenation, and body contouring during consultation.`,
    },
    {
      id: 'loc3',
      question: 'What areas do you serve?',
      answer: `Service area placeholders include ${config.contact.serviceArea.join(', ')}.`,
    },
  ]
  const jsonLd = [
    webpageSchema(config, seo.title, '/locations/austin', seo.description),
    localBusinessSchema(config),
    faqPageSchema(localFaqs),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations/austin' },
      { name: 'Austin', path: '/locations/austin' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations/austin' },
          { label: 'Austin' },
        ]}
      />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-wide">
          <SectionHeading
            as="h1"
            eyebrow="Local"
            title={`MedSpa in ${config.contact.city}, ${config.contact.stateCode}`}
            description={`${config.brand.name} — personalized aesthetic consultations in Austin. Fictional portfolio location.`}
          />

          <div className="mt-12">
            <LocationSection />
          </div>

          <Reveal className="mt-16">
            <h2 className="font-display text-3xl">Services in Austin</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {config.treatments.map((t) => (
                <li key={t.slug}>
                  <Link to={`/treatments/${t.slug}`} className="text-foreground hover:text-accent">
                    {t.name} in Austin
                  </Link>
                  <span className="text-muted-foreground"> — {t.typicalConcern}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-16">
            <h2 className="font-display text-3xl">Service area</h2>
            <p className="mt-4 text-muted-foreground">
              {config.brand.shortName} welcomes patients from {config.contact.serviceArea.join(', ')}, and
              surrounding communities.
            </p>
          </Reveal>

          <Reveal className="mt-16 max-w-3xl">
            <h2 className="mb-6 font-display text-3xl">Austin location FAQs</h2>
            <FAQAccordion items={localFaqs} />
          </Reveal>
        </div>
      </section>
      <CTASection
        headline="Visit us in Austin — or start with a conversation."
        primaryLabel={config.cta.book}
        primaryHref="/book"
        secondaryLabel="Contact"
        secondaryHref="/contact"
      />
    </>
  )
}
