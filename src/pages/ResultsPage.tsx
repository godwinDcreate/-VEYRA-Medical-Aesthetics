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
            description="Sourced before-and-after examples from a public external gallery. These are reference images for presentation only, not VEYRA patient outcomes. Individual results may vary."
          />
          <Reveal className="mt-12">
            <ResultsGallery results={config.results} />
          </Reveal>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            These comparisons do not claim that {config.brand.shortName} performed the treatments.
            Source and usage-rights notes stay attached to each card so external gallery assets remain
            clearly attributed.
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
