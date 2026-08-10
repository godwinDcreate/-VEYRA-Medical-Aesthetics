import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from 'lucide-react'
import { useMedSpa } from '@/context/MedSpaContext'

export function LocationSection() {
  const { config } = useMedSpa()
  const { contact } = config

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Location</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">
          {contact.city}, {contact.state}
        </h2>
        <ul className="mt-8 space-y-5 text-sm sm:text-base">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <div>
              <p>{contact.addressLine1}</p>
              <p className="text-muted-foreground">
                {contact.city}, {contact.stateCode} {contact.zip}
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <a href={contact.phoneHref} className="hover:text-accent">
              {contact.phone}
            </a>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <ul className="space-y-1">
              {contact.hours.map((h) => (
                <li key={h.label}>
                  <span className="text-foreground">{h.label}:</span>{' '}
                  <span className="text-muted-foreground">{h.value}</span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-espresso px-5 py-3 text-sm font-medium text-ivory"
          >
            Get Directions
          </a>
          <Link to="/locations/austin" className="inline-flex border border-border px-5 py-3 text-sm font-medium">
            Location details
          </Link>
        </div>
      </div>
      <div
        className="flex min-h-[280px] items-center justify-center border border-dashed border-border bg-muted/50 p-8 text-center"
        role="img"
        aria-label={contact.mapEmbedNote}
      >
        <div>
          <p className="font-display text-2xl">Map placeholder</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{contact.mapEmbedNote}</p>
        </div>
      </div>
    </div>
  )
}
