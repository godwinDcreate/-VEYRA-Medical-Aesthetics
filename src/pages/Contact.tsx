import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { LocationSection } from '@/components/LocationSection'
import { SocialLinks } from '@/components/SocialLinks'
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

          <div className="glass-light glass-reflect mt-8 rounded-[1.5rem] p-6 sm:p-8">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-secondary">
              Social
            </p>
            <h2 className="mt-2 font-display text-2xl">Connect with {config.brand.shortName}</h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Fictional demo profiles — configured per MedSpa tenant so each clinic can point to its
              own accounts.
            </p>
            <SocialLinks links={config.socialLinks} className="mt-5" />
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
