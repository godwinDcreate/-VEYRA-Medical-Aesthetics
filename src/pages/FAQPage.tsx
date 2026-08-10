import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { FAQAccordion } from '@/components/FAQ'
import { CTASection } from '@/components/CTASection'
import { buildPageSeo } from '@/lib/seo'
import { breadcrumbSchema, faqPageSchema, webpageSchema } from '@/lib/structuredData'

export function FAQPage() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'faq')
  const jsonLd = [
    webpageSchema(config, seo.title, '/faq', seo.description),
    faqPageSchema(config.faqs),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'FAQs', path: '/faq' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-narrow max-w-3xl">
          <SectionHeading
            as="h1"
            eyebrow="Help"
            title="Frequently asked questions"
            description="Answer-first guidance for consultations, preparation, safety, and expectations."
          />
          <div className="mt-10">
            <FAQAccordion items={config.faqs} />
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Exploring a specific treatment? See{' '}
            <Link to="/treatments" className="text-foreground underline-offset-2 hover:underline">
              treatments
            </Link>{' '}
            or our{' '}
            <Link to="/locations/austin" className="text-foreground underline-offset-2 hover:underline">
              Austin location
            </Link>
            .
          </p>
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
