import { Link } from 'react-router-dom'
import { useMedSpa } from '@/context/MedSpaContext'

export function Footer() {
  const { config } = useMedSpa()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="section-pad container-wide py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-display text-2xl tracking-[0.08em]">{config.brand.shortName}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{config.brand.tagline}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/treatments" className="hover:text-accent">
                  Treatments
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-accent">
                  Results
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-accent">
                  Book
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">Visit</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/locations/austin" className="hover:text-accent">
                  {config.contact.city}, {config.contact.stateCode}
                </Link>
              </li>
              <li>
                <a href={config.contact.phoneHref} className="hover:text-accent">
                  {config.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${config.contact.email}`} className="hover:text-accent">
                  {config.contact.email}
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">System</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/system" className="hover:text-accent">
                  Website System
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-accent">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">{config.brand.disclaimer}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            © {year} {config.brand.name}. Portfolio demonstration — Build once. Configure. Improve. Repeat.
          </p>
        </div>
      </div>
    </footer>
  )
}
