import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { BookingForm } from '@/components/BookingForm'
import { buildPageSeo } from '@/lib/seo'
import { breadcrumbSchema, webpageSchema } from '@/lib/structuredData'

export function Book() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'book')
  const jsonLd = [
    webpageSchema(config, seo.title, '/book', seo.description),
    breadcrumbSchema(config, [
      { name: 'Home', path: '/' },
      { name: 'Book', path: '/book' },
    ]),
  ]

  return (
    <>
      <SEO seo={seo} jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Book' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              as="h1"
              eyebrow="Consultation"
              title="Book a consultation"
              description="Share your goals and preferred timing. A member of the care team (in a real deployment) would follow up to confirm."
            />
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li>• Unhurried conversation about your goals</li>
              <li>• Educational guidance — not pressure</li>
              <li>• Clear next steps if you choose to proceed</li>
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  )
}
