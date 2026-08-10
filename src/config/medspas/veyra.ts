import type { MedSpaConfig, ThemeTokens, Treatment } from '@/types/medspa'
import { baseTreatments } from '@/data/treatments'

/**
 * CMS integration point:
 * In production, this file (or an API equivalent) would be populated from
 * Sanity / Contentful / Strapi / WordPress / Supabase.
 * Components never hardcode brand copy — they read MedSpaConfig.
 */

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://veyra-medical-aesthetics.vercel.app'

function brandTreatments(brandName: string, treatments: Treatment[] = baseTreatments): Treatment[] {
  const short = brandName.split(' ')[0]
  return treatments.map((t) => ({
    ...t,
    seoTitle: t.seoTitle.replace('VEYRA Medical Aesthetics', brandName).replace(/VEYRA/g, short),
    seoDescription: t.seoDescription.replace(/VEYRA/g, short),
    overview: t.overview.replace(/At VEYRA/g, `At ${short}`),
    faqs: t.faqs.map((f) => ({
      ...f,
      answer: f.answer
        .replace(
          /VEYRA \(a fictional portfolio MedSpa concept\)/g,
          `${brandName} (a fictional portfolio MedSpa concept)`
        )
        .replace(/VEYRA/g, short),
    })),
  }))
}

export const veyraTheme: ThemeTokens = {
  background: '#F7F3ED',
  foreground: '#1A1612',
  primary: '#1A1612',
  secondary: '#5C534A',
  accent: '#6F7F6B',
  muted: '#EFE8DE',
  mutedForeground: '#6B635A',
  border: '#D9CFC2',
  cream: '#EFE8DE',
  ivory: '#F7F3ED',
  sage: '#6F7F6B',
  beige: '#D4C4B0',
  espresso: '#1A1612',
  charcoal: '#2C2A26',
  card: '#FCFAF7',
  ring: '#6F7F6B',
}

export const veyraConfig: MedSpaConfig = {
  id: 'veyra',
  brand: {
    name: 'VEYRA Medical Aesthetics',
    shortName: 'VEYRA',
    tagline: 'Advanced Treatments. Natural Confidence.',
    supportingStatement: 'Personalized aesthetic care designed around you.',
    disclaimer:
      'VEYRA is a fictional brand created for a developer portfolio and hiring demonstration. All people, testimonials, and business details are demo content.',
    logoText: 'VEYRA',
  },
  theme: veyraTheme,
  contact: {
    phone: '(512) 555-0147',
    phoneHref: 'tel:+15125550147',
    email: 'hello@veyra-demo.example',
    addressLine1: '2400 Demo Boulevard, Suite 200',
    addressLine2: '',
    city: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    zip: '78701',
    hours: [
      { label: 'Monday – Friday', value: '9:00 AM – 6:00 PM' },
      { label: 'Saturday', value: '10:00 AM – 4:00 PM' },
      { label: 'Sunday', value: 'Closed' },
    ],
    mapEmbedNote: 'Map placeholder — fictional demo address in Austin, TX',
    directionsUrl: 'https://maps.google.com/?q=Austin+TX',
    serviceArea: ['Austin', 'Downtown Austin', 'South Congress', 'Domain', 'West Lake Hills'],
  },
  navigation: [
    { label: 'Treatments', href: '/treatments' },
    { label: 'About', href: '/about' },
    { label: 'Results', href: '/results' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Location', href: '/locations/austin' },
  ],
  hero: {
    brandLabel: 'VEYRA',
    brandSubLabel: 'Medical Aesthetics',
    headline: 'Advanced Treatments. Natural Confidence.',
    supporting:
      'Personalized aesthetic care designed to help you look refreshed, confident, and naturally yourself.',
    primaryCta: { label: 'Book a Consultation', href: '/book' },
    secondaryCta: { label: 'Explore Treatments', href: '/treatments' },
    image: {
      src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=75',
      alt: 'Calm premium treatment room with soft natural light and linen textures',
      width: 1600,
      height: 1066,
    },
  },
  treatments: brandTreatments('VEYRA Medical Aesthetics'),
  providers: [
    {
      id: 'maya-bennett',
      name: 'Dr. Maya Bennett',
      role: 'Medical Director',
      bio: 'Leads clinical standards and consultation philosophy for this fictional Austin MedSpa concept — emphasizing education, natural-looking goals, and patient-centered planning.',
      note: 'Fictional demo profile. Not a real physician. No credentials implied.',
      image: {
        src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=75',
        alt: 'Portrait placeholder for fictional medical director Maya Bennett',
        width: 800,
        height: 1000,
      },
    },
    {
      id: 'jordan-ellis',
      name: 'Jordan Ellis, NP',
      role: 'Aesthetic Provider',
      bio: 'Focuses on thoughtful consultations and clear expectation-setting across injectables and skin treatments in this portfolio demonstration.',
      note: 'Fictional demo profile. Not a real nurse practitioner. No credentials implied.',
      image: {
        src: 'https://images.unsplash.com/photo-1594824476968-48df1a824fc5?auto=format&fit=crop&w=800&q=75',
        alt: 'Portrait placeholder for fictional aesthetic provider Jordan Ellis',
        width: 800,
        height: 1000,
      },
    },
  ],
  testimonials: [
    {
      id: 't1',
      quote:
        'The consultation felt unhurried. I left understanding my options without feeling pushed into a treatment.',
      name: 'Alex R.',
      detail: 'Demo testimonial — fictional patient',
    },
    {
      id: 't2',
      quote:
        'I appreciated how clearly they explained what each treatment category could and could not address for my goals.',
      name: 'Sam K.',
      detail: 'Demo testimonial — fictional patient',
    },
    {
      id: 't3',
      quote:
        'The space felt calm and considered. Booking was simple, and follow-up instructions were easy to understand.',
      name: 'Jordan M.',
      detail: 'Demo testimonial — fictional patient',
    },
  ],
  faqs: [
    {
      id: 'f1',
      question: 'How long does a MedSpa consultation take?',
      answer:
        'Most first consultations at this demo clinic concept are designed around 20–45 minutes, depending on your goals and questions. The focus is clarity — not rushing a decision.',
      category: 'Consultation',
    },
    {
      id: 'f2',
      question: 'What should I ask during a MedSpa consultation?',
      answer:
        'Ask about provider qualifications, alternatives to a suggested treatment, expected ranges of change, downtime, costs, and how the clinic measures success for goals like yours.',
      category: 'Consultation',
    },
    {
      id: 'f3',
      question: 'Are treatments appropriate for everyone?',
      answer:
        'No. Suitability depends on medical history, anatomy, skin type, goals, and timing. A qualified provider determines what is appropriate to discuss or perform.',
      category: 'Safety',
    },
    {
      id: 'f4',
      question: 'How should I prepare for my visit?',
      answer:
        'Bring a list of medications and allergies, note prior aesthetic procedures, arrive with clean skin when asked, and prepare photos or goals you want to discuss.',
      category: 'Preparation',
    },
    {
      id: 'f5',
      question: 'Where is VEYRA located?',
      answer:
        'This fictional portfolio MedSpa is set in Austin, Texas, with a demo address on Demo Boulevard. Use the location page for hours and contact placeholders.',
      category: 'Location',
    },
    {
      id: 'f6',
      question: 'Do you guarantee results?',
      answer:
        'No ethical MedSpa should guarantee identical outcomes. Individual results vary. This demo site emphasizes education and realistic expectation-setting.',
      category: 'Expectations',
    },
  ],
  results: [
    {
      id: 'r1',
      title: 'Refreshed expression lines',
      description: 'Demo imagery illustrating a soft, natural-looking refresh conversation — not a clinical claim.',
      treatmentSlug: 'botox',
      beforeAlt: 'Fictional before illustration for expression line discussion',
      afterAlt: 'Fictional after illustration for expression line discussion',
      beforeSrc: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=70',
      afterSrc: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=70',
    },
    {
      id: 'r2',
      title: 'Skin clarity & glow',
      description: 'Demo pair representing skin quality conversations. Individual results may vary.',
      treatmentSlug: 'hydrafacial',
      beforeAlt: 'Fictional before illustration for skin quality discussion',
      afterAlt: 'Fictional after illustration for skin quality discussion',
      beforeSrc: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=70',
      afterSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=70',
    },
  ],
  whyItems: [
    {
      id: 'w1',
      title: 'Personalized Consultations',
      description: 'Plans start with your goals, history, and comfort — not a preset package.',
    },
    {
      id: 'w2',
      title: 'Experienced Care',
      description: 'Fictional care team modeled to show how premium clinics communicate expertise without hype.',
    },
    {
      id: 'w3',
      title: 'Evidence-Informed Treatments',
      description: 'Educational framing that prioritizes what is known, what varies, and what needs clinical judgment.',
    },
    {
      id: 'w4',
      title: 'Natural-Looking Approach',
      description: 'Refresh and balance over dramatic change — always defined with you.',
    },
    {
      id: 'w5',
      title: 'Modern Technology',
      description: 'Thoughtful tools selected for fit, not for marketing theater.',
    },
    {
      id: 'w6',
      title: 'Patient-Centered Experience',
      description: 'Clear communication, calm spaces, and easy next steps from first visit to follow-up.',
    },
  ],
  seo: {
    siteUrl,
    titleTemplate: '%s | VEYRA Medical Aesthetics',
    defaultTitle: 'VEYRA Medical Aesthetics | MedSpa in Austin, TX',
    defaultDescription:
      'VEYRA Medical Aesthetics is a premium MedSpa concept in Austin, Texas offering personalized aesthetic treatments including Botox, dermal fillers, skin rejuvenation, laser treatments, and more.',
    ogImage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=75',
    locale: 'en_US',
  },
  pageSeo: {
    home: {
      title: 'VEYRA Medical Aesthetics | MedSpa in Austin, TX',
      description:
        'VEYRA Medical Aesthetics is a premium MedSpa concept in Austin, Texas offering personalized aesthetic treatments including Botox, dermal fillers, skin rejuvenation, laser treatments, and more.',
      path: '/',
    },
    treatments: {
      title: 'Aesthetic Treatments in Austin | VEYRA',
      description:
        'Explore Botox, dermal fillers, laser resurfacing, Hydrafacial, skin rejuvenation, and body contouring consultations at VEYRA in Austin, TX.',
      path: '/treatments',
    },
    about: {
      title: 'About VEYRA Medical Aesthetics | Austin MedSpa',
      description:
        'Learn about VEYRA’s fictional premium MedSpa philosophy: personalized consultations, natural-looking goals, and thoughtful aesthetic care in Austin.',
      path: '/about',
    },
    providers: {
      title: 'Providers | VEYRA Medical Aesthetics',
      description:
        'Meet the fictional demo care team for VEYRA Medical Aesthetics in Austin — educational profiles for portfolio demonstration only.',
      path: '/providers',
    },
    results: {
      title: 'Results | VEYRA Medical Aesthetics Austin',
      description:
        'View demo before-and-after style imagery from VEYRA. Individual results may vary. Educational portfolio content only.',
      path: '/results',
    },
    faq: {
      title: 'FAQs | VEYRA Medical Aesthetics Austin',
      description:
        'Answers to common questions about MedSpa consultations, preparation, safety, and aesthetic treatments in Austin.',
      path: '/faq',
    },
    contact: {
      title: 'Contact | VEYRA Medical Aesthetics Austin',
      description:
        'Contact VEYRA Medical Aesthetics in Austin, TX. Phone, email, hours, and consultation booking for this portfolio demo clinic.',
      path: '/contact',
    },
    book: {
      title: 'Book a Consultation | VEYRA Austin',
      description:
        'Request a consultation at VEYRA Medical Aesthetics in Austin. Share your goals and preferred timing — demo form for portfolio use.',
      path: '/book',
    },
    location: {
      title: 'MedSpa in Austin, TX | VEYRA Location',
      description:
        'VEYRA Medical Aesthetics — fictional Austin MedSpa location with services, hours, service area, and consultation CTA.',
      path: '/locations/austin',
    },
    privacy: {
      title: 'Privacy Policy | VEYRA',
      description: 'Privacy policy for the VEYRA Medical Aesthetics portfolio demonstration website.',
      path: '/privacy',
    },
    terms: {
      title: 'Terms of Use | VEYRA',
      description: 'Terms of use for the VEYRA Medical Aesthetics portfolio demonstration website.',
      path: '/terms',
    },
    system: {
      title: 'Website System | VEYRA Multi-Tenant Architecture',
      description:
        'Developer overview of the reusable MedSpa website system: config-driven content, themes, SEO, GEO, and AI architecture.',
      path: '/system',
    },
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
  cta: {
    book: 'Book a Consultation',
    discuss: 'Discuss Your Goals',
    explore: 'Explore Treatments',
    finalHeadline: 'Your best treatment plan starts with a conversation.',
  },
}

export default veyraConfig
