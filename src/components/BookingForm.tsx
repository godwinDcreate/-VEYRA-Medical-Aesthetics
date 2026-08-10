import { useState, type FormEvent } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useMedSpa } from '@/context/MedSpaContext'
import { submitBooking } from '@/services/bookingService'

const TIMES = ['Morning', 'Afternoon', 'Evening', 'Flexible']

export function BookingForm() {
  const { config, medSpaId } = useMedSpa()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    treatmentInterest: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    website: '',
  })

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => {
      const next = { ...e }
      delete next[field]
      return next
    })
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number'
    if (!form.treatmentInterest) next.treatmentInterest = 'Select a treatment interest'
    if (!form.preferredDate) next.preferredDate = 'Select a preferred date'
    if (!form.preferredTime) next.preferredTime = 'Select a preferred time'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setSuccess(null)
    try {
      const result = await submitBooking({ ...form, medSpaId })
      if (result.ok) {
        setSuccess(result.message)
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          treatmentInterest: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          website: '',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (name: string) =>
    `w-full border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent ${
      errors[name] ? 'border-red-700' : 'border-border'
    }`

  if (success) {
    return (
      <div className="border border-border bg-card p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden />
        <h2 className="mt-4 font-display text-2xl">Request received</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{success}</p>
        <button
          type="button"
          className="mt-6 text-sm font-medium underline"
          onClick={() => setSuccess(null)}
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5 border border-border bg-card p-6 sm:p-8">
      {/* Honeypot — leave empty; bots often fill it */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">
            First Name
          </label>
          <input
            id="firstName"
            className={fieldClass('firstName')}
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            autoComplete="given-name"
            required
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-800" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            className={fieldClass('lastName')}
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            autoComplete="family-name"
            required
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-800" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={fieldClass('email')}
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-800" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={fieldClass('phone')}
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            autoComplete="tel"
            required
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-800" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="treatmentInterest" className="mb-1.5 block text-sm font-medium">
          Treatment Interest
        </label>
        <select
          id="treatmentInterest"
          className={fieldClass('treatmentInterest')}
          value={form.treatmentInterest}
          onChange={(e) => update('treatmentInterest', e.target.value)}
          required
        >
          <option value="">Select an option</option>
          {config.treatments.map((t) => (
            <option key={t.slug} value={t.name}>
              {t.name}
            </option>
          ))}
          <option value="Not sure — need guidance">Not sure — need guidance</option>
        </select>
        {errors.treatmentInterest && (
          <p className="mt-1 text-xs text-red-800" role="alert">
            {errors.treatmentInterest}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className="mb-1.5 block text-sm font-medium">
            Preferred Date
          </label>
          <input
            id="preferredDate"
            type="date"
            className={fieldClass('preferredDate')}
            value={form.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
            required
          />
          {errors.preferredDate && (
            <p className="mt-1 text-xs text-red-800" role="alert">
              {errors.preferredDate}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="preferredTime" className="mb-1.5 block text-sm font-medium">
            Preferred Time
          </label>
          <select
            id="preferredTime"
            className={fieldClass('preferredTime')}
            value={form.preferredTime}
            onChange={(e) => update('preferredTime', e.target.value)}
            required
          >
            <option value="">Select a time</option>
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="mt-1 text-xs text-red-800" role="alert">
              {errors.preferredTime}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={fieldClass('message')}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Share anything that helps us prepare for your consultation."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 bg-espresso px-5 py-3 text-sm font-medium text-ivory disabled:opacity-60 sm:w-auto"
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {loading ? 'Sending…' : config.cta.book}
      </button>
      <p className="text-xs text-muted-foreground">
        Demo form — production connects to CRM / GoHighLevel / booking software via a secure API.
      </p>
    </form>
  )
}
