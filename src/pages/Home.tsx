import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Hero } from '@/components/Hero'
import { SectionHeading } from '@/components/SectionHeading'
import { TreatmentGrid } from '@/components/TreatmentCard'
import { AITreatmentGuide } from '@/components/AITreatmentGuide'
import { ProviderCard } from '@/components/ProviderCard'
import { Testimonial } from '@/components/Testimonial'
import { FAQAccordion } from '@/components/FAQ'
import { LocationSection } from '@/components/LocationSection'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { buildPageSeo } from '@/lib/seo'
import {
  breadcrumbSchema,
  faqPageSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from '@/lib/structuredData'

export function Home() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'home')
  const jsonLd = [
    organizationSchema(config),
    websiteSchema(config),
    localBusinessSchema(config),
    breadcrumbSchema(config, [{ name: 'Home', path: '/' }]),
    faqPageSchema(config.faqs.slice(0, 4)),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Hero content={config.hero} />

      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="Philosophy"
                title="Thoughtful aesthetics. Personalized care."
                description="Treatments are selected around individual goals and a thorough consultation — never a one-size menu."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.08}>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                At {config.brand.shortName}, every plan begins with listening. We discuss what you hope to
                improve, what “natural” means for you, and which treatment categories — if any — are worth
                exploring with a qualified provider in {config.contact.city}.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {config.brand.supportingStatement} Education first. Pressure never.
              </p>
              <Link to="/about" className="mt-6 inline-block text-sm font-medium tracking-wide underline-offset-4 hover:underline">
                About {config.brand.shortName}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Treatments"
              title="Featured treatments"
              description={`Aesthetic options commonly discussed at our ${config.contact.city} MedSpa concept.`}
            />
          </Reveal>
          <div className="mt-12">
            <TreatmentGrid treatments={config.treatments} />
          </div>
          <div className="mt-10">
            <Link to="/treatments" className="text-sm font-medium tracking-wide hover:text-accent">
              View all treatments →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide">
          <AITreatmentGuide />
        </div>
      </section>

      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading eyebrow="Why us" title={`Why ${config.brand.shortName}`} />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {config.whyItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-display text-xl sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-card/50 py-16 sm:py-24">
        <div className="container-wide space-y-14">
          <Reveal>
            <SectionHeading
              eyebrow="Providers"
              title="Meet the care team"
              description="Fictional demo profiles for portfolio demonstration only."
            />
          </Reveal>
          {config.providers.map((p) => (
            <Reveal key={p.id}>
              <ProviderCard provider={p} />
            </Reveal>
          ))}
          <Link to="/providers" className="inline-block text-sm font-medium hover:text-accent">
            View providers →
          </Link>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Results"
              title="A natural-looking refresh"
              description="Demo imagery only. Individual results may vary."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {config.results.map((r) => (
              <Reveal key={r.id}>
                <article>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Before</p>
                      <img
                        src={r.beforeSrc}
                        alt={r.beforeAlt}
                        width={600}
                        height={750}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">After</p>
                      <img
                        src={r.afterSrc}
                        alt={r.afterAlt}
                        width={600}
                        height={750}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                  <Link
                    to={`/treatments/${r.treatmentSlug}`}
                    className="mt-3 inline-block text-sm font-medium hover:text-accent"
                  >
                    Related treatment →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">Individual results may vary. Demo content only.</p>
          <Link to="/results" className="mt-4 inline-block text-sm font-medium hover:text-accent">
            View results →
          </Link>
        </div>
      </section>

      <section className="section-pad bg-muted/30 py-16 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading eyebrow="Voices" title="What patients say" description="Fictional demo testimonials." />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {config.testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <Testimonial item={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading eyebrow="FAQ" title="Common questions" />
              <div className="mt-8">
                <FAQAccordion items={config.faqs.slice(0, 4)} />
              </div>
              <Link to="/faq" className="mt-6 inline-block text-sm font-medium hover:text-accent">
                View all FAQs →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <LocationSection />
          </Reveal>
        </div>
      </section>

      <CTASection
        headline={config.cta.finalHeadline}
        description="Share your goals. Leave with clarity."
        primaryLabel="Book Your Consultation"
        primaryHref="/book"
        secondaryLabel={config.cta.explore}
        secondaryHref="/treatments"
      />
    </>
  )
}
