import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useMedSpa } from '@/context/MedSpaContext'

export function Footer() {
  const { config } = useMedSpa()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-8 border-t border-white/25">
      <div className="section-pad container-wide py-16 sm:py-20">
        <div className="glass-light glass-reflect rounded-[1.75rem] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-display text-3xl tracking-[0.14em]">{config.brand.shortName}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Medical Aesthetics
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {config.contact.city}, {config.contact.state}
              </p>
            </div>
            <div className="lg:col-span-3">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-secondary">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {['Treatments', 'About', 'Results', 'FAQs', 'Contact'].map((label, i) => {
                  const hrefs = ['/treatments', '/about', '/results', '/faq', '/contact']
                  return (
                    <li key={label}>
                      <Link to={hrefs[i]} className="hover:text-accent">
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="lg:col-span-5 lg:flex lg:flex-col lg:items-end lg:justify-between">
              <Link to="/book" className="btn-primary group" data-cursor="cta">
                Book a Consultation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <div className="mt-8 flex flex-wrap gap-4 text-sm lg:mt-0 lg:justify-end">
                <Link to="/system" className="text-muted-foreground hover:text-accent">
                  Website System
                </Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-accent">
                  Privacy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-accent">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 px-1">
          <p className="text-xs leading-relaxed text-muted-foreground">{config.brand.disclaimer}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {year} {config.brand.name}. Portfolio demonstration — Build once. Configure. Improve. Repeat.
          </p>
        </div>
      </div>
    </footer>
  )
}
