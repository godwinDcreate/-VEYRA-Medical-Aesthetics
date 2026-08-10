/**
 * AI Treatment Guide service abstraction.
 *
 * Architecture (production):
 * User → Frontend → Secure API (/api/ai-guide) → AI provider → Knowledge base → Response
 *
 * NEVER put API keys in the React frontend.
 * Set OPENAI_API_KEY / ANTHROPIC_API_KEY / GEMINI_API_KEY only on the server.
 */

import type { Treatment } from '@/types/medspa'

export interface AIGuideRequest {
  query: string
  treatments: Pick<
    Treatment,
    'slug' | 'name' | 'shortDescription' | 'typicalConcern' | 'commonConcerns'
  >[]
  brandName: string
  city: string
}

export interface AIGuideSuggestion {
  slug: string
  name: string
  reason: string
}

export interface AIGuideResponse {
  summary: string
  suggestions: AIGuideSuggestion[]
  disclaimer: string
  source: 'api' | 'mock'
}

export const MEDICAL_DISCLAIMER =
  'This tool provides general educational information and is not a medical diagnosis or substitute for professional medical advice. Treatment decisions should be discussed with a qualified provider.'

type ProviderName = 'openai' | 'anthropic' | 'gemini' | 'mock'

/**
 * Provider selector — UI never imports OpenAI/Anthropic SDKs directly.
 * Swap implementation behind this interface without touching components.
 */
export function getConfiguredProvider(): ProviderName {
  const fromEnv = import.meta.env.VITE_AI_PROVIDER as ProviderName | undefined
  if (fromEnv === 'openai' || fromEnv === 'anthropic' || fromEnv === 'gemini') {
    return fromEnv
  }
  return 'mock'
}

function mockGuide(request: AIGuideRequest): AIGuideResponse {
  const q = request.query.toLowerCase()
  const scored = request.treatments.map((t) => {
    let score = 0
    const hay = `${t.name} ${t.shortDescription} ${t.typicalConcern} ${t.commonConcerns.join(' ')}`.toLowerCase()
    const keywords = [
      ['fine line', 'botox', 'wrinkle', 'crow', 'forehead', 'expression'],
      ['volume', 'filler', 'lip', 'cheek', 'contour face'],
      ['laser', 'texture', 'scar', 'sun', 'resurfacing'],
      ['hydra', 'glow', 'dull', 'event', 'facial', 'bright'],
      ['rejuvenation', 'skin quality', 'tone', 'aging'],
      ['body', 'stubborn', 'contour body', 'sculpt'],
    ]
    for (const group of keywords) {
      if (group.some((k) => q.includes(k) && hay.includes(group[0].split(' ')[0]))) {
        score += 2
      }
    }
    ;['line', 'wrinkle', 'eye', 'botox'].forEach((k) => {
      if (q.includes(k) && (t.slug === 'botox' || t.slug === 'skin-rejuvenation')) score += 3
    })
    ;['bright', 'smooth', 'glow', 'event', 'dull'].forEach((k) => {
      if (q.includes(k) && (t.slug === 'hydrafacial' || t.slug === 'skin-rejuvenation' || t.slug === 'laser-skin-resurfacing'))
        score += 3
    })
    ;['volume', 'lip', 'cheek', 'filler'].forEach((k) => {
      if (q.includes(k) && t.slug === 'dermal-fillers') score += 3
    })
    ;['laser', 'texture', 'tone'].forEach((k) => {
      if (q.includes(k) && (t.slug === 'laser-skin-resurfacing' || t.slug === 'skin-rejuvenation'))
        score += 2
    })
    ;['body', 'stubborn', 'stomach', 'thigh'].forEach((k) => {
      if (q.includes(k) && t.slug === 'body-contouring') score += 4
    })
    if (score === 0 && (t.slug === 'skin-rejuvenation' || t.slug === 'hydrafacial')) score = 1
    return { t, score }
  })

  scored.sort((a, b) => b.score - a.score)
  const top = scored.filter((s) => s.score > 0).slice(0, 3)
  const picks = top.length ? top : scored.slice(0, 2)

  const suggestions: AIGuideSuggestion[] = picks.map(({ t }) => ({
    slug: t.slug,
    name: t.name,
    reason: `${t.name} is commonly discussed for concerns related to ${t.typicalConcern.toLowerCase()}. ${t.shortDescription}`,
  }))

  const names = suggestions.map((s) => s.name).join(', ')
  const summary = `Based on what you've described, you may want to explore ${names} during a consultation at ${request.brandName} in ${request.city}. Different treatments address different concerns, so a qualified provider can help determine what may be appropriate for you.`

  return {
    summary,
    suggestions,
    disclaimer: MEDICAL_DISCLAIMER,
    source: 'mock',
  }
}

/**
 * Calls secure backend when configured; otherwise uses structured mock matching knowledge base.
 */
export async function requestTreatmentGuide(
  request: AIGuideRequest,
  signal?: AbortSignal
): Promise<AIGuideResponse> {
  const endpoint = import.meta.env.VITE_AI_API_URL || '/api/ai-guide'

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    })
    if (res.ok) {
      const data = (await res.json()) as AIGuideResponse
      return {
        ...data,
        disclaimer: data.disclaimer || MEDICAL_DISCLAIMER,
        source: 'api',
      }
    }
  } catch {
    // Fall through to mock — expected in local demo without API
  }

  // Simulate thoughtful latency for premium UX
  await new Promise((r) => setTimeout(r, 550))
  return mockGuide(request)
}
