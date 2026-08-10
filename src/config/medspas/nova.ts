import type { MedSpaConfig, ThemeTokens } from '@/types/medspa'
import { baseTreatments } from '@/data/treatments'
import { veyraConfig } from './veyra'

/** Brighter clinical modern — distinct third tenant for the multi-site demo. */
export const novaTheme: ThemeTokens = {
  background: '#F6F5F2',
  foreground: '#12151A',
  primary: '#12151A',
  secondary: '#3D4550',
  accent: '#5B7C8A',
  muted: '#E9E7E1',
  mutedForeground: '#5A616A',
  border: '#CFCBC3',
  cream: '#E9E7E1',
  ivory: '#F6F5F2',
  sage: '#6A7F78',
  beige: '#C9C2B6',
  espresso: '#12151A',
  charcoal: '#1C2229',
  card: '#FBFAF8',
  ring: '#5B7C8A',
}

export const novaConfig: MedSpaConfig = {
  ...veyraConfig,
  id: 'nova',
  brand: {
    name: 'NOVA Medical Spa',
    shortName: 'NOVA',
    tagline: 'Modern aesthetics. Honest guidance.',
    supportingStatement: 'Clear education and contemporary care for Austin patients exploring aesthetic options.',
    disclaimer:
      'NOVA is a fictional brand created for multi-tenant demonstration. All content is demo-only.',
    logoText: 'NOVA',
  },
  theme: novaTheme,
  contact: {
    ...veyraConfig.contact,
    phone: '(512) 555-0164',
    phoneHref: 'tel:+15125550164',
    email: 'hello@nova-demo.example',
    addressLine1: '880 Innovation Drive, Suite 310',
    zip: '78758',
    serviceArea: ['North Austin', 'Domain', 'Round Rock', 'Cedar Park'],
  },
  hero: {
    brandLabel: 'NOVA',
    brandSubLabel: 'Medical Spa',
    headline: 'Modern aesthetics. Honest guidance.',
    supporting:
      'A contemporary Austin MedSpa concept built to show how one website system can power many clinics.',
    primaryCta: { label: 'Book a Consultation', href: '/book' },
    secondaryCta: { label: 'Explore Treatments', href: '/treatments' },
    image: {
      src: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1600&q=75',
      alt: 'Contemporary clinic waiting area with clean lines and soft daylight',
      width: 1600,
      height: 1066,
    },
  },
  treatments: baseTreatments.map((t) => ({
    ...t,
    seoTitle: `${t.name} in Austin | NOVA Medical Spa`,
    seoDescription: t.seoDescription.replace(/VEYRA/g, 'NOVA'),
    overview: t.overview.replace(/VEYRA/g, 'NOVA'),
    faqs: t.faqs.map((f) => ({
      ...f,
      answer: f.answer.replace(/VEYRA/g, 'NOVA'),
    })),
  })),
  providers: [
    {
      id: 'priya-shah',
      name: 'Priya Shah, MD',
      role: 'Medical Director',
      bio: 'Fictional medical director for NOVA — demonstrates tenant-specific team content in the shared UI system.',
      note: 'Fictional demo profile. Not a real physician.',
      image: {
        src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=75',
        alt: 'Portrait placeholder for fictional medical director Priya Shah',
        width: 800,
        height: 1000,
      },
    },
    {
      id: 'morgan-lee',
      name: 'Morgan Lee, RN',
      role: 'Aesthetic Nurse',
      bio: 'Fictional aesthetic nurse profile for the NOVA tenant configuration.',
      note: 'Fictional demo profile. Not a real nurse.',
      image: {
        src: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=75',
        alt: 'Portrait placeholder for fictional aesthetic nurse Morgan Lee',
        width: 800,
        height: 1000,
      },
    },
  ],
  testimonials: [
    {
      id: 'n1',
      quote: 'Straight answers, modern space, and a consult that respected my timeline.',
      name: 'Casey L.',
      detail: 'Demo testimonial — fictional',
    },
    {
      id: 'n2',
      quote: 'I used the treatment guide to prepare questions — then the provider helped me prioritize.',
      name: 'Avery S.',
      detail: 'Demo testimonial — fictional',
    },
  ],
  faqs: veyraConfig.faqs.map((f) => ({
    ...f,
    answer: f.answer.replace(/VEYRA/g, 'NOVA'),
  })),
  seo: {
    ...veyraConfig.seo,
    titleTemplate: '%s | NOVA Medical Spa',
    defaultTitle: 'NOVA Medical Spa | MedSpa in Austin, TX',
    defaultDescription:
      'NOVA Medical Spa is a fictional contemporary MedSpa concept in Austin offering personalized aesthetic consultations and treatments.',
    ogImage: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=75',
  },
  pageSeo: Object.fromEntries(
    Object.entries(veyraConfig.pageSeo).map(([key, value]) => [
      key,
      {
        ...value,
        title: value.title.replace(/VEYRA Medical Aesthetics/g, 'NOVA Medical Spa').replace(/VEYRA/g, 'NOVA'),
        description: value.description.replace(/VEYRA/g, 'NOVA'),
      },
    ])
  ),
  cta: {
    book: 'Book a Consultation',
    discuss: 'Discuss Your Goals',
    explore: 'Explore Treatments',
    finalHeadline: 'Start with clarity. Build your plan from there.',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/nova.medspa.demo',
    facebook: 'https://www.facebook.com/nova.medspa.demo',
    tiktok: 'https://www.tiktok.com/@nova.medspa.demo',
  },
  results: veyraConfig.results.map((r) => ({
    ...r,
    disclaimer: r.disclaimer.replace(/VEYRA/g, 'NOVA'),
  })),
}

export default novaConfig
