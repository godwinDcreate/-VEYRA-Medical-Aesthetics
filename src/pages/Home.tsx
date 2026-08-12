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
import { LiquidBlob } from '@/components/LiquidBlob'
import { ResultsGallery } from '@/components/BeforeAfterComparison'
import { SocialSection } from '@/components/SocialSection'
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

      <section className="section-pad relative py-16 sm:py-24">
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
              <div className="glass-light glass-reflect rounded-[1.5rem] p-6 sm:p-8">
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  At {config.brand.shortName}, every plan begins with listening. We discuss what you hope to
                  improve, what “natural” means for you, and which treatment categories — if any — are worth
                  exploring with a qualified provider in {config.contact.city}.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {config.brand.supportingStatement} Education first. Pressure never.
                </p>
                <Link
                  to="/about"
                  className="mt-6 inline-block text-sm font-medium tracking-wide text-espresso underline-offset-4 hover:underline"
                >
                  About {config.brand.shortName}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden py-16 sm:py-24">
        <LiquidBlob
          size={420}
          color="sage"
          blur={90}
          opacity={0.35}
          animation="drift"
          className="right-[-8%] top-[10%] hidden md:block"
        />
        <div className="container-wide relative">
          <Reveal>
            <SectionHeading
              eyebrow="Treatments"
              title="Featured treatments"
              description={`Aesthetic options commonly discussed at our ${config.contact.city} MedSpa concept.`}
            />
          </Reveal>
          <div className="mt-12">
            <TreatmentGrid treatments={config.treatments.slice(0, 3)} />
          </div>
          <div className="mt-10">
            <Link to="/treatments" className="btn-glass">
              View all treatments →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad relative py-16 sm:py-24">
        <div className="container-wide">
          <AITreatmentGuide />
        </div>
      </section>

      <section className="section-pad relative py-16 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading eyebrow="Why us" title={`Why ${config.brand.shortName}`} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {config.whyItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <div className="glass-light glass-reflect h-full rounded-[1.35rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/45">
                  <h3 className="font-display text-xl sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative py-16 sm:py-24">
        <div className="container-wide space-y-10">
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

      <section className="section-pad relative overflow-hidden py-16 sm:py-24">
        <LiquidBlob
          size={380}
          color="champagne"
          blur={80}
          opacity={0.45}
          animation="float"
          className="left-[-10%] bottom-[5%] hidden lg:block"
        />
        <div className="container-wide relative">
          <Reveal>
            <SectionHeading
              eyebrow="Results"
              title="A natural-looking refresh"
              description="Real VEYRA patient before-and-after results. Individual results vary."
            />
          </Reveal>
          <div className="mt-12">
            <ResultsGallery results={config.results.slice(0, 3)} />
          </div>
          <Link to="/results" className="mt-8 inline-block text-sm font-medium hover:text-accent">
            View results →
          </Link>
        </div>
      </section>

      <section className="section-pad relative py-16 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading eyebrow="Voices" title="What patients say" description="Fictional demo testimonials." />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {config.testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <Testimonial item={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative py-16 sm:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="glass-light glass-reflect rounded-[1.5rem] p-6 sm:p-8">
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

      {/* GEO answer-first cluster */}
      <section className="section-pad relative pb-8 pt-4 sm:pb-12">
        <div className="container-wide">
          <Reveal>
            <div className="glass-medium glass-reflect rounded-[1.5rem] p-6 sm:p-10">
              <h2 className="font-display text-2xl sm:text-3xl">Questions people ask about MedSpas</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {config.faqs.slice(0, 6).map((f) => (
                  <div key={f.id}>
                    <h3 className="text-sm font-medium text-espresso">{f.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SocialSection />

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
