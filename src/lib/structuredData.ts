import type { FAQItem, MedSpaConfig, Treatment } from '@/types/medspa'

function socialSameAs(config: MedSpaConfig): string[] {
  const { instagram, facebook, tiktok } = config.socialLinks
  return [instagram, facebook, tiktok].filter(
    (url): url is string => Boolean(url) && url !== '#'
  )
}

export function organizationSchema(config: MedSpaConfig) {
  const sameAs = socialSameAs(config)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.brand.name,
    url: config.seo.siteUrl,
    email: config.contact.email,
    telephone: config.contact.phone,
    description: config.seo.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.addressLine1,
      addressLocality: config.contact.city,
      addressRegion: config.contact.stateCode,
      postalCode: config.contact.zip,
      addressCountry: 'US',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

export function websiteSchema(config: MedSpaConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.brand.name,
    url: config.seo.siteUrl,
    description: config.seo.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.seo.siteUrl}/treatments`,
      'query-input': 'required name=search_term_string',
    },
  }
}

/** LocalBusiness without invented ratings, licenses, or review counts. */
export function localBusinessSchema(config: MedSpaConfig) {
  const sameAs = socialSameAs(config)
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: config.brand.name,
    description: config.seo.defaultDescription,
    url: config.seo.siteUrl,
    telephone: config.contact.phone,
    email: config.contact.email,
    image: config.seo.ogImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.addressLine1,
      addressLocality: config.contact.city,
      addressRegion: config.contact.stateCode,
      postalCode: config.contact.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Approximate Austin downtown — demo only
      latitude: 30.2672,
      longitude: -97.7431,
    },
    openingHoursSpecification: config.contact.hours
      .filter((h) => h.value !== 'Closed')
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.label,
        opens: '09:00',
        closes: h.label.includes('Saturday') ? '16:00' : '18:00',
      })),
    areaServed: config.contact.serviceArea.map((name) => ({
      '@type': 'City',
      name,
    })),
    priceRange: '$$',
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

export function webpageSchema(config: MedSpaConfig, name: string, path: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${config.seo.siteUrl.replace(/\/$/, '')}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: config.brand.name,
      url: config.seo.siteUrl,
    },
  }
}

export function breadcrumbSchema(
  config: MedSpaConfig,
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${config.seo.siteUrl.replace(/\/$/, '')}${item.path}`,
    })),
  }
}

export function serviceSchema(config: MedSpaConfig, treatment: Treatment) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: treatment.name,
    description: treatment.shortDescription,
    provider: {
      '@type': 'MedicalBusiness',
      name: config.brand.name,
    },
    areaServed: {
      '@type': 'City',
      name: config.contact.city,
    },
    url: `${config.seo.siteUrl.replace(/\/$/, '')}/treatments/${treatment.slug}`,
  }
}

export function faqPageSchema(faqs: FAQItem[] | { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function injectJsonLd(id: string, data: object | object[]) {
  const existing = document.getElementById(id)
  if (existing) existing.remove()
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
}
