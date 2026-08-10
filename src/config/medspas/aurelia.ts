import type { MedSpaConfig, ThemeTokens } from '@/types/medspa'
import { baseTreatments } from '@/data/treatments'
import { veyraConfig } from './veyra'

/** Cooler, gallery-like aesthetic — still premium MedSpa, distinct from VEYRA. */
export const aureliaTheme: ThemeTokens = {
  background: '#F4F1EC',
  foreground: '#1E2420',
  primary: '#1E2420',
  secondary: '#4A5550',
  accent: '#8A6F5C',
  muted: '#E8E2D8',
  mutedForeground: '#5C675F',
  border: '#D2C9BC',
  cream: '#E8E2D8',
  ivory: '#F4F1EC',
  sage: '#7D8B82',
  beige: '#C8B8A6',
  espresso: '#1E2420',
  charcoal: '#2A322E',
  card: '#FAF8F4',
  ring: '#8A6F5C',
}

function remapTreatments(brand: string, short: string): MedSpaConfig['treatments'] {
  return baseTreatments.map((t) => ({
    ...t,
    seoTitle: `${t.name} in Austin | ${brand}`,
    seoDescription: t.seoDescription.replace(/VEYRA/g, short),
    overview: t.overview.replace(/VEYRA/g, short),
    faqs: t.faqs.map((f) => ({
      ...f,
      answer: f.answer.replace(/VEYRA/g, short),
    })),
  }))
}

export const aureliaConfig: MedSpaConfig = {
  ...veyraConfig,
  id: 'aurelia',
  brand: {
    name: 'AURELIA Aesthetics',
    shortName: 'AURELIA',
    tagline: 'Quiet luxury. Precise care.',
    supportingStatement: 'Refined aesthetic medicine with a calm, gallery-like presence.',
    disclaimer:
      'AURELIA is a fictional brand created for multi-tenant demonstration. All content is demo-only.',
    logoText: 'AURELIA',
  },
  theme: aureliaTheme,
  contact: {
    ...veyraConfig.contact,
    phone: '(512) 555-0192',
    phoneHref: 'tel:+15125550192',
    email: 'hello@aurelia-demo.example',
    addressLine1: '1100 Gallery Lane, Suite 140',
    zip: '78704',
  },
  hero: {
    brandLabel: 'AURELIA',
    brandSubLabel: 'Aesthetics',
    headline: 'Quiet luxury. Precise care.',
    supporting:
      'A composed Austin MedSpa concept for people who want clarity, craft, and natural-looking results conversations.',
    primaryCta: { label: 'Book a Consultation', href: '/book' },
    secondaryCta: { label: 'View Treatments', href: '/treatments' },
    image: {
      src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1600&q=75',
      alt: 'Minimal spa interior with warm stone and soft daylight',
      width: 1600,
      height: 1066,
    },
  },
  treatments: remapTreatments('AURELIA Aesthetics', 'AURELIA'),
  providers: [
    {
      id: 'elena-ward',
      name: 'Elena Ward, MD',
      role: 'Clinical Lead',
      bio: 'Fictional clinical lead for the AURELIA demo brand — modeled to show config-swappable provider content.',
      note: 'Fictional demo profile. Not a real physician.',
      image: {
        src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=75',
        alt: 'Portrait placeholder for fictional provider Elena Ward',
        width: 800,
        height: 1000,
      },
    },
    {
      id: 'chris-nguyen',
      name: 'Chris Nguyen, PA-C',
      role: 'Aesthetic Provider',
      bio: 'Fictional provider profile demonstrating how multi-tenant configs swap team content without new components.',
      note: 'Fictional demo profile. Not a real clinician.',
      image: {
        src: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=75',
        alt: 'Portrait placeholder for fictional provider Chris Nguyen',
        width: 800,
        height: 1000,
      },
    },
  ],
  testimonials: [
    {
      id: 'a1',
      quote: 'Everything felt edited and intentional — from the consult questions to the follow-up notes.',
      name: 'Taylor P.',
      detail: 'Demo testimonial — fictional',
    },
    {
      id: 'a2',
      quote: 'I liked that they explained tradeoffs instead of selling a single “best” treatment.',
      name: 'Riley C.',
      detail: 'Demo testimonial — fictional',
    },
  ],
  faqs: veyraConfig.faqs.map((f) => ({
    ...f,
    answer: f.answer.replace(/VEYRA/g, 'AURELIA'),
  })),
  seo: {
    ...veyraConfig.seo,
    titleTemplate: '%s | AURELIA Aesthetics',
    defaultTitle: 'AURELIA Aesthetics | MedSpa in Austin, TX',
    defaultDescription:
      'AURELIA Aesthetics is a fictional premium MedSpa concept in Austin offering personalized aesthetic consultations and treatments.',
    ogImage: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=75',
  },
  pageSeo: Object.fromEntries(
    Object.entries(veyraConfig.pageSeo).map(([key, value]) => [
      key,
      {
        ...value,
        title: value.title.replace(/VEYRA Medical Aesthetics/g, 'AURELIA Aesthetics').replace(/VEYRA/g, 'AURELIA'),
        description: value.description.replace(/VEYRA/g, 'AURELIA'),
      },
    ])
  ),
  cta: {
    book: 'Book a Consultation',
    discuss: 'Start a Conversation',
    explore: 'View Treatments',
    finalHeadline: 'Precision begins with a thoughtful consult.',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/aurelia.aesthetics.demo',
    facebook: 'https://www.facebook.com/aurelia.aesthetics.demo',
    tiktok: 'https://www.tiktok.com/@aurelia.aesthetics.demo',
  },
  results: veyraConfig.results.map((r) => ({
    ...r,
    disclaimer: r.disclaimer.replace(/VEYRA/g, 'AURELIA'),
  })),
}

export default aureliaConfig
