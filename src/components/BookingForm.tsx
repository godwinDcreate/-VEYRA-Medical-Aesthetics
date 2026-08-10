import { useState, type FormEvent } from 'react'
import { Loader2, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useMedSpa } from '@/context/MedSpaContext'
import { submitBooking } from '@/services/bookingService'

const TIMES = ['Morning', 'Afternoon', 'Evening', 'Flexible']
const STEPS = [
  { id: 1, label: '01', title: 'Tell us about yourself.' },
  { id: 2, label: '02', title: 'What are you interested in?' },
  { id: 3, label: '03', title: 'When would you like to visit?' },
  { id: 4, label: '04', title: "Let's confirm your consultation." },
]

export function BookingForm() {
  const { config, medSpaId } = useMedSpa()
  const reduce = useReducedMotion()
  const [step, setStep] = useState(1)
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

  function validateStep(s: number) {
    const next: Record<string, string> = {}
    if (s === 1) {
      if (!form.firstName.trim()) next.firstName = 'First name is required'
      if (!form.lastName.trim()) next.lastName = 'Last name is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
      if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number'
    }
    if (s === 2) {
      if (!form.treatmentInterest) next.treatmentInterest = 'Select a treatment interest'
    }
    if (s === 3) {
      if (!form.preferredDate) next.preferredDate = 'Select a preferred date'
      if (!form.preferredTime) next.preferredTime = 'Select a preferred time'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function nextStep() {
    if (!validateStep(step)) return
    setStep((s) => Math.min(4, s + 1))
  }

  function prevStep() {
    setStep((s) => Math.max(1, s - 1))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validateStep(4) || !validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setStep(1)
      return
    }
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
        setStep(1)
      }
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (name: string) =>
    `field-glass ${errors[name] ? '!border-red-700/60' : ''}`

  if (success) {
    return (
      <div className="glass-strong glass-reflect rounded-[1.75rem] p-8 text-center sm:p-12" role="status">
        <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden />
        <h2 className="mt-4 font-display text-2xl sm:text-3xl">Request received</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{success}</p>
        <button type="button" className="btn-glass mt-6" onClick={() => setSuccess(null)}>
          Submit another request
        </button>
      </div>
    )
  }

  const current = STEPS[step - 1]

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass-strong glass-reflect relative overflow-hidden rounded-[1.75rem] p-6 sm:rounded-[2rem] sm:p-10"
    >
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

      <div className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Progress">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 sm:gap-3">
            <span
              className={`text-xs tracking-[0.2em] ${
                step === s.id ? 'text-espresso' : step > s.id ? 'text-accent' : 'text-muted-foreground/50'
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="h-px w-4 bg-border/70 sm:w-8" aria-hidden />
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-[0.65rem] uppercase tracking-[0.24em] text-accent">Step {current.label}</p>
      <h2 className="mt-2 font-display text-2xl sm:text-3xl">{current.title}</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="mt-8 space-y-5"
          initial={reduce ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -12 }}
          transition={{ duration: 0.28 }}
        >
          {step === 1 && (
            <>
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
            </>
          )}

          {step === 2 && (
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
              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Anything else we should know? (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={fieldClass('message')}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Share goals, concerns, or questions for your consultation."
                />
              </div>
            </div>
          )}

          {step === 3 && (
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
          )}

          {step === 4 && (
            <div className="glass-light space-y-3 rounded-2xl p-5 text-sm">
              <p>
                <span className="text-muted-foreground">Name</span>
                <br />
                <span className="font-medium">
                  {form.firstName} {form.lastName}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Contact</span>
                <br />
                <span className="font-medium">
                  {form.email} · {form.phone}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Interest</span>
                <br />
                <span className="font-medium">{form.treatmentInterest}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Preferred visit</span>
                <br />
                <span className="font-medium">
                  {form.preferredDate} · {form.preferredTime}
                </span>
              </p>
              {form.message && (
                <p>
                  <span className="text-muted-foreground">Note</span>
                  <br />
                  <span className="font-medium">{form.message}</span>
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 1 ? (
          <button type="button" className="btn-ghost !px-4" onClick={prevStep}>
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button type="button" className="btn-primary" onClick={nextStep} data-cursor="cta">
            Continue
            <ArrowRight className="size-4" aria-hidden />
          </button>
        ) : (
          <button type="submit" disabled={loading} className="btn-primary" data-cursor="cta">
            {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {loading ? 'Sending…' : config.cta.book}
          </button>
        )}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Luxury consultation request — production connects to CRM / booking software via a secure API.
      </p>
    </form>
  )
}
