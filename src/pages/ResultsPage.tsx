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
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {config.results.map((r) => (
              <Reveal key={r.id}>
                <article className="group relative overflow-hidden rounded-[1.5rem]">
                  <div className="grid grid-cols-2 gap-1.5 overflow-hidden rounded-[1.5rem]">
                    <div className="relative">
                      <img
                        src={r.beforeSrc}
                        alt={r.beforeAlt}
                        width={600}
                        height={750}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                      <span className="glass-medium absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em]">
                        Before
                      </span>
                    </div>
                    <div className="relative">
                      <img
                        src={r.afterSrc}
                        alt={r.afterAlt}
                        width={600}
                        height={750}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                      <span className="glass-medium absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em]">
                        After
                      </span>
                    </div>
                  </div>
                  <div className="glass-medium glass-reflect absolute inset-x-4 bottom-4 rounded-2xl p-4 sm:p-5">
                    <h2 className="font-display text-2xl">{r.title}</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">{r.description}</p>
                    <p className="mt-2 text-[0.7rem] text-muted-foreground">Individual results may vary.</p>
                    <Link
                      to={`/treatments/${r.treatmentSlug}`}
                      className="mt-3 inline-block text-sm font-medium hover:text-accent"
                    >
                      Learn about related treatment →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
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
