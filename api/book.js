/**
 * Secure booking endpoint stub.
 * Connect to GoHighLevel, CRM, or booking software here.
 * Add rate limiting + CAPTCHA in production.
 */

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    if (body.website) {
      return res.status(200).json({ ok: true, message: 'Thank you.' })
    }
    if (!body.email || !body.firstName || !body.lastName || !body.phone) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' })
    }

    // Production: forward to CRM / GHL / email automation with server credentials.
    return res.status(200).json({
      ok: true,
      message: 'Consultation request received. A team member will follow up shortly.',
    })
  } catch {
    return res.status(500).json({ ok: false, message: 'Unable to submit request' })
  }
}
