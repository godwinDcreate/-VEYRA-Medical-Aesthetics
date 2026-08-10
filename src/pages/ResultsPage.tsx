import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
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
            description="Clearly fictional demo imagery. Individual results may vary. Not clinical claims."
          />
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {config.results.map((r) => (
              <Reveal key={r.id}>
                <article>
                  <div className="grid grid-cols-2 gap-3">
                    <figure>
                      <figcaption className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                        Before
                      </figcaption>
                      <img
                        src={r.beforeSrc}
                        alt={r.beforeAlt}
                        width={600}
                        height={750}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </figure>
                    <figure>
                      <figcaption className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                        After
                      </figcaption>
                      <img
                        src={r.afterSrc}
                        alt={r.afterAlt}
                        width={600}
                        height={750}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </figure>
                  </div>
                  <h2 className="mt-5 font-display text-2xl">{r.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                  <Link
                    to={`/treatments/${r.treatmentSlug}`}
                    className="mt-3 inline-block text-sm font-medium hover:text-accent"
                  >
                    Learn about related treatment →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-xs text-muted-foreground">Individual results may vary.</p>
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
