/**
 * Booking submission abstraction.
 * Demo mocks success. Production: GoHighLevel, CRM, booking software, or email automation.
 * Protect with rate limiting, CAPTCHA, and server-side validation.
 */

export interface BookingPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  treatmentInterest: string
  preferredDate: string
  preferredTime: string
  message: string
  medSpaId: string
  website: string // honeypot
}

export interface BookingResult {
  ok: boolean
  message: string
}

export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  if (payload.website) {
    return { ok: true, message: 'Thank you.' }
  }

  const endpoint = import.meta.env.VITE_BOOKING_API_URL || '/api/book'

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const data = (await res.json()) as BookingResult
      return data
    }
  } catch {
    // Demo fallback
  }

  await new Promise((r) => setTimeout(r, 800))
  return {
    ok: true,
    message:
      'Thank you — your consultation request has been received (demo). In production this would sync to your CRM or booking system.',
  }
}
