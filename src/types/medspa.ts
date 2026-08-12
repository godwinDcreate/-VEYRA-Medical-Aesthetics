/**
 * Central MedSpa content model.
 * CMS integration point: map Sanity / Contentful / Strapi documents → MedSpaConfig.
 * One source of truth powers UI, SEO, structured data, and AI knowledge.
 */

export interface ThemeTokens {
  background: string
  foreground: string
  primary: string
  secondary: string
  accent: string
  muted: string
  mutedForeground: string
  border: string
  cream: string
  ivory: string
  sage: string
  beige: string
  espresso: string
  charcoal: string
  card: string
  ring: string
}

export interface BrandConfig {
  name: string
  shortName: string
  tagline: string
  supportingStatement: string
  /** Fictional portfolio note shown in footer / system */
  disclaimer: string
  logoText?: string
}

export interface ContactConfig {
  phone: string
  phoneHref: string
  email: string
  /** Placeholder — fictional demo only */
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  stateCode: string
  zip: string
  hours: { label: string; value: string }[]
  mapEmbedNote: string
  directionsUrl: string
  serviceArea: string[]
}

export interface NavItem {
  label: string
  href: string
}

export interface TreatmentFAQ {
  question: string
  answer: string
}

export interface Treatment {
  slug: string
  name: string
  shortDescription: string
  typicalConcern: string
  overview: string
  commonConcerns: string[]
  whatToExpect: string[]
  consultationProcess: string[]
  whoMayDiscuss: string[]
  considerations: string[]
  appointmentDuration: string
  relatedSlugs: string[]
  faqs: TreatmentFAQ[]
  seoTitle: string
  seoDescription: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export interface Provider {
  id: string
  name: string
  role: string
  bio: string
  /** Explicitly fictional — no real credentials */
  note: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  detail: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

/**
 * Linked before/after pair. Prefer verified, licensed imagery only.
 * When `isPlaceholder` is true (or image srcs are empty), UI shows marked slots —
 * never fabricate outcomes or imply the MedSpa performed the treatment.
 */
export interface ResultItem {
  id: string
  /** Treatment / category label shown in the UI */
  treatment: string
  treatmentSlug: string
  description: string
  beforeImage: string
  afterImage: string
  /**
   * Optional single-image before/after composite sourced from an external gallery.
   * Use this when the public source publishes one labeled comparison image instead
   * of separate before/after files.
   */
  compositeImage?: string
  /** Optional AVIF/WebP for progressive enhancement when real assets exist */
  beforeImageAvif?: string
  beforeImageWebp?: string
  afterImageAvif?: string
  afterImageWebp?: string
  compositeImageAvif?: string
  compositeImageWebp?: string
  /** Responsive srcSet when optimized assets are available */
  beforeImageSrcSet?: string
  afterImageSrcSet?: string
  compositeImageSrcSet?: string
  sizes?: string
  altBefore: string
  altAfter: string
  altComposite?: string
  /** Attribution / licensing — stored in config, not hardcoded in UI copy logic */
  source: string
  sourceUrl?: string
  usageRights: string
  disclaimer: string
  /** Intrinsic dimensions — prevents layout shift & distortion */
  width: number
  height: number
  /** When true, render clearly marked placeholders instead of claiming results */
  isPlaceholder?: boolean
}

export interface WhyItem {
  id: string
  title: string
  description: string
}

export interface SeoDefaults {
  siteUrl: string
  titleTemplate: string
  defaultTitle: string
  defaultDescription: string
  ogImage: string
  twitterHandle?: string
  locale: string
}

export interface PageSeo {
  title: string
  description: string
  path: string
}

export interface HeroContent {
  brandLabel: string
  brandSubLabel: string
  headline: string
  supporting: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

/** Per-tenant social profiles. Use fictional/demo URLs for portfolio brands. */
export interface SocialLinks {
  instagram?: string
  facebook?: string
  tiktok?: string
}

export interface MedSpaConfig {
  id: string
  brand: BrandConfig
  theme: ThemeTokens
  contact: ContactConfig
  navigation: NavItem[]
  hero: HeroContent
  treatments: Treatment[]
  providers: Provider[]
  testimonials: Testimonial[]
  faqs: FAQItem[]
  results: ResultItem[]
  whyItems: WhyItem[]
  seo: SeoDefaults
  pageSeo: Record<string, PageSeo>
  socialLinks: SocialLinks
  cta: {
    book: string
    discuss: string
    explore: string
    finalHeadline: string
  }
}
