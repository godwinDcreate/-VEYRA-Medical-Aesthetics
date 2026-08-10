import { useMedSpa } from '@/context/MedSpaContext'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SectionHeading } from '@/components/SectionHeading'
import { buildPageSeo } from '@/lib/seo'

export function Privacy() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'privacy')

  return (
    <>
      <SEO seo={{ ...seo, noIndex: true }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-narrow max-w-3xl prose-like">
          <SectionHeading as="h1" title="Privacy Policy" description="Portfolio demonstration policy." />
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              This website is a fictional portfolio project. Do not submit real personal health information.
              Demo forms are not connected to a production patient database unless you configure a secure
              backend.
            </p>
            <p>
              In a production MedSpa deployment, this page would describe data collection, processors (CRM,
              analytics, booking), retention, and patient rights under applicable law.
            </p>
            <p>Contact placeholder: {config.contact.email}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export function Terms() {
  const { config } = useMedSpa()
  const seo = buildPageSeo(config, 'terms')

  return (
    <>
      <SEO seo={{ ...seo, noIndex: true }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <section className="section-pad py-10 sm:py-16">
        <div className="container-narrow max-w-3xl">
          <SectionHeading as="h1" title="Terms of Use" description="Portfolio demonstration terms." />
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              {config.brand.name} is a fictional brand. Content is educational and demo-oriented. It is not
              medical advice and does not create a patient-provider relationship.
            </p>
            <p>
              Treatment pages describe general categories only. Decisions about care must be made with a
              qualified provider.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
