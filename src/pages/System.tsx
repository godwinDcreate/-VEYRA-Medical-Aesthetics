import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'
import { medSpaOptions, type MedSpaId } from '@/config/medspa'
import { SEO } from '@/components/SEO'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Reveal } from '@/components/Reveal'
import { buildPageSeo } from '@/lib/seo'

const SECTIONS = [
  {
    n: '01',
    title: 'Reusable Components',
    body: 'Header, Hero, TreatmentCard, FAQAccordion, BookingForm, AITreatmentGuide, SEO, and more — shared across every tenant.',
  },
  {
    n: '02',
    title: 'Configuration-Driven Content',
    body: 'Brand, services, providers, FAQs, SEO, and CTAs live in MedSpaConfig. Components consume config — they do not hardcode client copy.',
  },
  {
    n: '03',
    title: 'Multi-Tenant Architecture',
    body: 'veyra.ts, aurelia.ts, and nova.ts prove one codebase can power many MedSpas. Switch brands below to see it live.',
  },
  {
    n: '04',
    title: 'SEO Architecture',
    body: 'Per-page titles, descriptions, canonicals, Open Graph, breadcrumbs, sitemap, robots.txt, and semantic HTML.',
  },
  {
    n: '05',
    title: 'GEO Content Structure',
    body: 'Answer-first treatment models, entity-rich local pages, FAQ JSON-LD, and structured relationships between business, location, and services.',
  },
  {
    n: '06',
    title: 'AI-Native Experience',
    body: 'Frontend → secure API → model → knowledge base. aiService.ts abstracts providers. Keys never ship to the browser.',
  },
  {
    n: '07',
    title: 'CMS-Ready Content',
    body: 'Config shape mirrors CMS documents. Swap file configs for Sanity, Contentful, Strapi, WordPress, or Supabase without rewriting UI.',
  },
  {
    n: '08',
    title: 'Performance Optimization',
    body: 'Code splitting, optimized images with dimensions, lazy loading, limited backdrop-filters, reduced-motion support, GPU-friendly transforms.',
  },
  {
    n: '09',
    title: 'Mobile-First Design',
    body: 'Liquid glass adapts: reduced blur, fewer floating effects, tap-friendly CTAs, and readable contrast at every breakpoint.',
  },
  {
    n: '10',
    title: 'Deployment Workflow',
    body: 'Vite build → Vercel. Env vars for site URL and optional AI/booking endpoints. SPA rewrites included.',
  },
]

const FLOW = ['BUILD', 'CONFIGURE', 'OPTIMIZE', 'DEPLOY', 'LEARN', 'IMPROVE', 'REPEAT']

export function System() {
  const { config, medSpaId, setMedSpaId } = useMedSpa()
  const seo = buildPageSeo(config, 'system')

  return (
    <>
      <SEO seo={{ ...seo, noIndex: true }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'System' }]} />

      <section className="section-pad relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className="container-wide">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-accent">For Forever Booked</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            VEYRA Website System
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            One foundation. Unlimited MedSpa experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="glass-medium rounded-full px-4 py-2">Active tenant: {medSpaId}</span>
            <span className="glass-medium rounded-full px-4 py-2">{config.brand.name}</span>
          </div>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="container-wide">
          <div className="glass-strong glass-reflect rounded-[1.75rem] p-6 sm:p-10">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-accent">Preview Website</p>
            <h2 className="mt-2 font-display text-3xl">Choose a MedSpa experience</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              Same components and routes. Different brand, colors, copy, location, and SEO — switched live.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {medSpaOptions.map((opt) => {
                const active = medSpaId === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMedSpaId(opt.id as MedSpaId)}
                    className={`rounded-[1.25rem] p-5 text-left transition duration-300 ${
                      active
                        ? 'glass-strong border-white/55 shadow-lg'
                        : 'glass-light hover:-translate-y-0.5 hover:border-white/45'
                    }`}
                    data-cursor="cta"
                  >
                    <p className="font-display text-2xl tracking-[0.12em]">{opt.label.split(' ')[0]}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{opt.label}</p>
                    <p className="mt-3 text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                      {active ? 'Active' : 'Preview'}
                    </p>
                  </button>
                )
              })}
            </div>
            <Link to="/" className="btn-primary mt-8 inline-flex">
              View live site
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden py-16 text-ivory sm:py-20">
        <div className="container-wide relative overflow-hidden rounded-[1.75rem] bg-espresso px-6 py-12 sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--beige) 35%, transparent), transparent 55%)',
            }}
            aria-hidden
          />
          <h2 className="relative font-display text-3xl sm:text-4xl">How the system compounds</h2>
          <ol className="relative mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-3 sm:gap-4">
                <span className="rounded-full border border-ivory/20 bg-ivory/10 px-4 py-2 text-xs tracking-[0.2em]">
                  {step}
                </span>
                {i < FLOW.length - 1 && (
                  <span className="text-ivory/35" aria-hidden>
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad py-16 sm:py-24">
        <div className="container-wide grid gap-5 md:grid-cols-2">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.04}>
              <article className="glass-light glass-reflect h-full rounded-[1.35rem] p-6 sm:p-7">
                <p className="text-[0.65rem] tracking-[0.24em] text-accent">{s.n}</p>
                <h2 className="mt-2 font-display text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad pb-24">
        <div className="container-wide glass-medium glass-reflect rounded-[1.75rem] p-8 sm:p-12">
          <h2 className="font-display text-3xl">Config path</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Duplicate a tenant file, update branding and SEO, register it — ship another MedSpa experience.
          </p>
          <ul className="mt-8 space-y-3">
            {medSpaOptions.map((opt) => (
              <li
                key={opt.id}
                className="flex items-center justify-between border-b border-white/25 py-3 text-sm"
              >
                <span>{opt.label}</span>
                <span className="text-muted-foreground">src/config/medspas/{opt.id}.ts</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
