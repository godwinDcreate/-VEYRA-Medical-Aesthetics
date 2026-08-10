import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { CTASection } from '@/components/CTASection'
import { Reveal } from '@/components/Reveal'
import { buildPageSeo } from '@/lib/seo'
import { breadcrumbSchema, webpageSchema } from '@/lib/structuredData'

export function About() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'about')
  const jsonLd = [
    webpageSchema(config, seo.title, '/about', seo.description),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              as="h1"
              eyebrow="About"
              title={config.brand.name}
              description={config.brand.tagline}
            />
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                {config.brand.shortName} is a premium medical aesthetics concept based in{' '}
                {config.contact.city}, {config.contact.state}. This website is a portfolio demonstration —
                fictional brand, fictional team, demo content throughout.
              </p>
              <p>
                The experience is designed around personalized consultations, natural-looking goals, and
                clear education before any treatment decision. Explore{' '}
                <Link to="/treatments" className="text-foreground underline-offset-2 hover:underline">
                  treatments
                </Link>
                , meet{' '}
                <Link to="/providers" className="text-foreground underline-offset-2 hover:underline">
                  providers
                </Link>
                , or{' '}
                <Link to="/book" className="text-foreground underline-offset-2 hover:underline">
                  book a consultation
                </Link>
                .
              </p>
            </div>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <img
              src={config.hero.image.src}
              alt={config.hero.image.alt}
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
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
