import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { ProviderCard } from '@/components/ProviderCard'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { buildPageSeo } from '@/lib/seo'
import { breadcrumbSchema, webpageSchema } from '@/lib/structuredData'

export function Providers() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'providers')
  const jsonLd = [
    webpageSchema(config, seo.title, '/providers', seo.description),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'Providers', path: '/providers' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Providers' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-wide">
          <SectionHeading
            as="h1"
            eyebrow="Care team"
            title="Providers"
            description="Fictional demo profiles created for this portfolio. Do not interpret as real credentials."
          />
          <div className="mt-14 space-y-16">
            {config.providers.map((p) => (
              <Reveal key={p.id}>
                <ProviderCard provider={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        headline="Questions about your goals?"
        primaryLabel={config.cta.book}
        primaryHref="/book"
      />
    </>
  )
}
