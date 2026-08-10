/**
 * Secure AI Treatment Guide endpoint (Vercel Serverless).
 * Keys stay on the server. Frontend never sees them.
 *
 * Set AI_PROVIDER + corresponding API key in Vercel env.
 * Without keys, returns structured educational mock from the knowledge payload.
 */

const DISCLAIMER =
  'This tool provides general educational information and is not a medical diagnosis or substitute for professional medical advice. Treatment decisions should be discussed with a qualified provider.'

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function mockFromKnowledge(body) {
  const q = String(body.query || '').toLowerCase()
  const treatments = Array.isArray(body.treatments) ? body.treatments : []
  const scored = treatments.map((t) => {
    let score = 0
    const blob = `${t.name} ${t.shortDescription} ${t.typicalConcern} ${(t.commonConcerns || []).join(' ')}`.toLowerCase()
    ;['line', 'wrinkle', 'eye', 'botox'].forEach((k) => {
      if (q.includes(k) && (t.slug === 'botox' || t.slug === 'skin-rejuvenation')) score += 3
    })
    ;['bright', 'smooth', 'glow', 'event', 'dull'].forEach((k) => {
      if (q.includes(k) && ['hydrafacial', 'skin-rejuvenation', 'laser-skin-resurfacing'].includes(t.slug))
        score += 3
    })
    ;['volume', 'lip', 'cheek', 'filler'].forEach((k) => {
      if (q.includes(k) && t.slug === 'dermal-fillers') score += 3
    })
    ;['body', 'stubborn'].forEach((k) => {
      if (q.includes(k) && t.slug === 'body-contouring') score += 4
    })
    if (score === 0 && blob.includes('skin')) score = 1
    return { t, score }
  })
  scored.sort((a, b) => b.score - a.score)
  const picks = scored.filter((s) => s.score > 0).slice(0, 3)
  const list = picks.length ? picks : scored.slice(0, 2)
  const suggestions = list.map(({ t }) => ({
    slug: t.slug,
    name: t.name,
    reason: `${t.name} is commonly discussed for concerns related to ${(t.typicalConcern || 'skin quality').toLowerCase()}.`,
  }))
  const names = suggestions.map((s) => s.name).join(', ')
  return {
    summary: `Based on what you've described, you may want to explore ${names} during a consultation at ${body.brandName || 'this MedSpa'} in ${body.city || 'your area'}. Different treatments address different concerns, so a qualified provider can help determine what may be appropriate for you.`,
    suggestions,
    disclaimer: DISCLAIMER,
    source: 'api',
  }
}

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    if (!body.query || String(body.query).trim().length < 3) {
      return res.status(400).json({ error: 'Query required' })
    }

    // Future: call OpenAI / Anthropic / Gemini with body.treatments as grounded knowledge.
    // Example gate — only when server key exists:
    // if (process.env.OPENAI_API_KEY && process.env.AI_PROVIDER === 'openai') { ... }

    const payload = mockFromKnowledge(body)
    return res.status(200).json(payload)
  } catch {
    return res.status(500).json({ error: 'Unable to process request' })
  }
}
