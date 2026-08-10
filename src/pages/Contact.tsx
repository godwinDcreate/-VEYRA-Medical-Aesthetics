import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { LocationSection } from '@/components/LocationSection'
import { CTASection } from '@/components/CTASection'
import { buildPageSeo } from '@/lib/seo'
import { breadcrumbSchema, localBusinessSchema, webpageSchema } from '@/lib/structuredData'

export function Contact() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'contact')
  const jsonLd = [
    webpageSchema(config, seo.title, '/contact', seo.description),
    localBusinessSchema(config),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-wide">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Get in touch"
            description="Placeholder contact details for this portfolio MedSpa demonstration."
          />
          <div className="mt-12">
            <LocationSection />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer to schedule directly?{' '}
            <Link to="/book" className="text-foreground underline-offset-2 hover:underline">
              Book a consultation
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
