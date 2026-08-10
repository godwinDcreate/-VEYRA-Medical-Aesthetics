import type { MedSpaConfig, PageSeo } from '@/types/medspa'

export interface SeoPayload {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogType?: string
  noIndex?: boolean
}

export function buildPageSeo(
  config: MedSpaConfig,
  pageKey: string,
  overrides?: Partial<PageSeo>
): SeoPayload {
  const page = config.pageSeo[pageKey]
  const title = overrides?.title ?? page?.title ?? config.seo.defaultTitle
  const description =
    overrides?.description ?? page?.description ?? config.seo.defaultDescription
  const path = overrides?.path ?? page?.path ?? '/'
  const canonical = `${config.seo.siteUrl.replace(/\/$/, '')}${path}`

  return {
    title,
    description,
    canonical,
    ogImage: config.seo.ogImage,
    ogType: 'website',
  }
}

export function buildTreatmentSeo(config: MedSpaConfig, slug: string): SeoPayload | null {
  const treatment = config.treatments.find((t) => t.slug === slug)
  if (!treatment) return null
  return {
    title: treatment.seoTitle,
    description: treatment.seoDescription,
    canonical: `${config.seo.siteUrl.replace(/\/$/, '')}/treatments/${treatment.slug}`,
    ogImage: treatment.image.src,
    ogType: 'article',
  }
}

export function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function applySeo(payload: SeoPayload) {
  document.title = payload.title
  upsertMeta('name', 'description', payload.description)
  upsertLink('canonical', payload.canonical)

  upsertMeta('property', 'og:title', payload.title)
  upsertMeta('property', 'og:description', payload.description)
  upsertMeta('property', 'og:url', payload.canonical)
  upsertMeta('property', 'og:image', payload.ogImage)
  upsertMeta('property', 'og:type', payload.ogType ?? 'website')

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', payload.title)
  upsertMeta('name', 'twitter:description', payload.description)
  upsertMeta('name', 'twitter:image', payload.ogImage)

  if (payload.noIndex) {
    upsertMeta('name', 'robots', 'noindex, nofollow')
  } else {
    upsertMeta('name', 'robots', 'index, follow')
  }
}
