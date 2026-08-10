import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'

export function LocationSection() {
  const { config } = useMedSpa()
  const { contact } = config

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1600&q=70')",
        }}
        role="img"
        aria-label={`Atmospheric view suggesting ${contact.city}, ${contact.state}`}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(120deg, rgba(247,243,237,0.88) 0%, rgba(247,243,237,0.55) 45%, rgba(26,22,18,0.25) 100%)',
        }}
        aria-hidden
      />
      <div className="relative grid min-h-[360px] items-center p-6 sm:min-h-[420px] sm:p-10 lg:p-12">
        <div className="glass-strong glass-reflect max-w-md rounded-[1.5rem] p-6 sm:p-8">
          <p className="font-display text-2xl tracking-[0.12em] text-espresso sm:text-3xl">
            {config.brand.shortName}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Medical Aesthetics
          </p>
          <p className="mt-5 text-lg text-espresso">
            {contact.city}, {contact.state}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{contact.addressLine1}</p>
          <ul className="mt-5 space-y-1.5 text-sm text-muted-foreground">
            {contact.hours.slice(0, 2).map((h) => (
              <li key={h.label}>
                <span className="text-foreground">{h.label}</span>
                <span className="mx-2">·</span>
                {h.value}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-5 !py-2.5"
              data-cursor="cta"
            >
              Get Directions
            </a>
            <Link to="/book" className="btn-glass !px-5 !py-2.5" data-cursor="cta">
              Book Consultation
            </Link>
          </div>
          <p className="mt-4 text-[0.7rem] text-muted-foreground">{contact.mapEmbedNote}</p>
        </div>
      </div>
    </div>
  )
}
