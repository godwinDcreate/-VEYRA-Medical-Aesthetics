import { Link, Navigate, useParams } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FAQAccordion } from '@/components/FAQ'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { buildTreatmentSeo } from '@/lib/seo'
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
  webpageSchema,
} from '@/lib/structuredData'

/** Reusable treatment detail template — all treatment routes share this structure. */
export function TreatmentDetail() {
  const { slug } = useParams()
  const { config } = useMedSpa()
  const treatment = config.treatments.find((t) => t.slug === slug)

  if (!treatment) return <Navigate to="/treatments" replace />

  const seo = buildTreatmentSeo(config, treatment.slug)!
  const related = config.treatments.filter((t) => treatment.relatedSlugs.includes(t.slug))
  const jsonLd = [
    webpageSchema(config, seo.title, `/treatments/${treatment.slug}`, seo.description),
    serviceSchema(config, treatment),
    faqPageSchema(treatment.faqs),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'Treatments', path: '/treatments' },
      { name: treatment.name, path: `/treatments/${treatment.slug}` },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: treatment.name },
        ]}
      />

      <section className="section-pad pb-12 pt-6 lg:pb-16">
        <div className="container-wide grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {config.contact.city}, {config.contact.state}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              {treatment.name} in {config.contact.city}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {treatment.shortDescription}
            </p>
            <Link
              to="/book"
              className="mt-8 inline-flex bg-espresso px-5 py-3 text-sm font-medium text-ivory"
            >
              {config.cta.discuss}
            </Link>
          </div>
          <div className="lg:col-span-6">
            <img
              src={treatment.image.src}
              alt={treatment.image.alt}
              width={treatment.image.width}
              height={treatment.image.height}
              className="aspect-[16/11] w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="section-pad py-14 sm:py-20">
        <div className="container-narrow max-w-3xl space-y-14">
          <Reveal>
            <h2 className="font-display text-3xl">What is {treatment.name}?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{treatment.overview}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl">What concerns is it commonly used for?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {treatment.commonConcerns.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl">What should you expect?</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
              {treatment.whatToExpect.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong className="font-medium text-foreground">Appointment timing: </strong>
              {treatment.appointmentDuration}
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl">How does a consultation work?</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
              {treatment.consultationProcess.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl">Who may want to discuss this treatment?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {treatment.whoMayDiscuss.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl">What should you consider before treatment?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {treatment.considerations.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl">Where is {treatment.name} available?</h2>
            <p className="mt-4 text-muted-foreground">
              {treatment.name} consultations are offered at {config.brand.name} in{' '}
              {config.contact.city}, {config.contact.state}.{' '}
              <Link to="/locations/austin" className="text-foreground underline-offset-2 hover:underline">
                View location details
              </Link>{' '}
              or{' '}
              <Link to="/book" className="text-foreground underline-offset-2 hover:underline">
                book a consultation
              </Link>
              .
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mb-6 font-display text-3xl">Frequently asked questions</h2>
            <FAQAccordion items={treatment.faqs} />
          </Reveal>

          {related.length > 0 && (
            <Reveal>
              <h2 className="font-display text-3xl">Related treatments</h2>
              <ul className="mt-4 space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/treatments/${r.slug}`} className="text-foreground hover:text-accent">
                      {r.name}
                    </Link>
                    <span className="text-muted-foreground"> — {r.typicalConcern}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      <CTASection
        headline="Ready to discuss your goals?"
        description="A consultation is the right place for personalized guidance — this page is educational only."
        primaryLabel={config.cta.discuss}
        primaryHref="/book"
        secondaryLabel="All treatments"
        secondaryHref="/treatments"
      />
    </>
  )
}
