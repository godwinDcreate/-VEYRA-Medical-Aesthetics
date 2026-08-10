import { useEffect } from 'react'
import { applySeo, type SeoPayload } from '@/lib/seo'
import { injectJsonLd } from '@/lib/structuredData'

interface SEOProps {
  seo: SeoPayload
  jsonLd?: object | object[]
  jsonLdId?: string
}

/** SPA head manager — unique titles, descriptions, canonical, OG, JSON-LD per page. */
export function SEO({ seo, jsonLd, jsonLdId = 'page-jsonld' }: SEOProps) {
  useEffect(() => {
    applySeo(seo)
    if (jsonLd) injectJsonLd(jsonLdId, jsonLd)
    return () => {
      const el = document.getElementById(jsonLdId)
      if (el) el.remove()
    }
  }, [seo, jsonLd, jsonLdId])

  return null
}
