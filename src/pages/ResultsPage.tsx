import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { ResultsGallery } from '@/components/BeforeAfterComparison'
import { buildPageSeo } from '@/lib/seo'
import { breadcrumbSchema, webpageSchema } from '@/lib/structuredData'

export function ResultsPage() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'results')
  const jsonLd = [
    webpageSchema(config, seo.title, '/results', seo.description),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'Results', path: '/results' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Results' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-wide">
          <SectionHeading
            as="h1"
            eyebrow="Gallery"
            title="Results"
            description="Real VEYRA patient before-and-after results. Individual results vary."
          />
          <Reveal className="mt-12">
            <ResultsGallery results={config.results} />
          </Reveal>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            These before-and-after comparisons feature original {config.brand.shortName} patient
            results. All gallery imagery is owned by {config.brand.shortName} and reserved for
            brand use.
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
