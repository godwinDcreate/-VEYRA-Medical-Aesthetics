import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { medSpaOptions } from '@/config/medspa'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Reveal } from '@/components/Reveal'
import { buildPageSeo } from '@/lib/seo'

const SECTIONS = [
  {
    title: '1. Reusable Components',
    body: 'Header, Hero, TreatmentCard, FAQAccordion, BookingForm, AITreatmentGuide, SEO, and more — shared across every tenant.',
  },
  {
    title: '2. Configuration-Driven Content',
    body: 'Brand, services, providers, FAQs, SEO, and CTAs live in MedSpaConfig. Components consume config — they do not hardcode client copy.',
  },
  {
    title: '3. Multi-Tenant Architecture',
    body: 'veyra.ts, aurelia.ts, and nova.ts prove one codebase can power many MedSpas. Use Preview MedSpa in the header to switch live.',
  },
  {
    title: '4. Theme System',
    body: 'CSS variables mapped from each tenant theme. Change colors once; the entire site updates.',
  },
  {
    title: '5. SEO Architecture',
    body: 'Per-page titles, descriptions, canonicals, Open Graph, breadcrumbs, sitemap, robots.txt, and semantic HTML.',
  },
  {
    title: '6. GEO Strategy',
    body: 'Answer-first treatment models, entity-rich local pages, FAQ JSON-LD, and structured relationships between business, location, and services.',
  },
  {
    title: '7. AI Integration',
    body: 'Frontend → secure API → model → knowledge base. aiService.ts abstracts providers. Keys never ship to the browser.',
  },
  {
    title: '8. CMS Readiness',
    body: 'Config shape mirrors CMS documents. Swap file configs for Sanity, Contentful, Strapi, WordPress, or Supabase without rewriting UI.',
  },
  {
    title: '9. Performance Strategy',
    body: 'Code splitting, optimized images with dimensions, lazy loading, minimal deps, reduced-motion support, fast fonts.',
  },
  {
    title: '10. Deployment Workflow',
    body: 'Vite build → Vercel. Env vars for site URL and optional AI/booking endpoints. SPA rewrites included.',
  },
]

const STEPS = [
  'Duplicate configuration',
  'Update branding',
  'Update services',
  'Update location',
  'Update SEO',
  'Replace imagery/content',
  'Deploy',
]

export function System() {
  const { config, medSpaId } = useMedSpa()
  const seo = buildPageSeo(config, 'system')

  return (
    <>
      <SEO seo={{ ...seo, noIndex: true }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'System' }]} />

      <section className="section-pad relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Developer</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            VEYRA Website System
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Build once. Configure. Improve. Repeat. — A reusable MedSpa website platform for beautiful,
            fast, SEO & GEO optimized sites that get faster to launch with every client.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="border border-border bg-card px-3 py-1.5">Active tenant: {medSpaId}</span>
            <span className="border border-border bg-card px-3 py-1.5">{config.brand.name}</span>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-espresso py-16 text-ivory sm:py-20">
        <div className="container-wide">
          <h2 className="font-display text-3xl sm:text-4xl">How a new MedSpa is created</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step} className="border border-ivory/15 bg-ivory/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-ivory/50">Step {i + 1}</p>
                <p className="mt-3 font-display text-xl">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide grid gap-6 md:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.04}>
              <article className="h-full border-t border-border pt-6">
                <h2 className="font-display text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad pb-20">
        <div className="container-wide border border-border bg-card p-8 sm:p-12">
          <h2 className="font-display text-3xl">Preview tenants</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Switch brands from the header selector. Same components — different config, theme, copy, and SEO.
          </p>
          <ul className="mt-8 space-y-3">
            {medSpaOptions.map((opt) => (
              <li key={opt.id} className="flex items-center justify-between border-b border-border py-3 text-sm">
                <span>{opt.label}</span>
                <span className="text-muted-foreground">{opt.id}.ts</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/" className="bg-espresso px-5 py-3 text-sm font-medium text-ivory">
              View live site
            </Link>
            <a
              href="https://github.com"
              className="border border-border px-5 py-3 text-sm font-medium"
              onClick={(e) => e.preventDefault()}
            >
              Config path: src/config/medspas/
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
