import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useMedSpa } from '@/context/MedSpaContext'
import { medSpaOptions, type MedSpaId } from '@/config/medspa'

export function Header() {
  const { config, medSpaId, setMedSpaId } = useMedSpa()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="section-pad">
        <div className="container-wide flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          <Link to="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl tracking-[0.08em] text-espresso sm:text-[1.65rem]">
              {config.brand.logoText ?? config.brand.shortName}
            </span>
            <span className="mt-0.5 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              {config.brand.name.includes('Medical') ? 'Medical Aesthetics' : 'Aesthetics'}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {config.navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors ${
                    isActive ? 'text-espresso' : 'text-secondary hover:text-espresso'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <label className="sr-only" htmlFor="preview-medspa">
              Preview MedSpa
            </label>
            <select
              id="preview-medspa"
              value={medSpaId}
              onChange={(e) => setMedSpaId(e.target.value as MedSpaId)}
              className="max-w-[10.5rem] truncate border border-border bg-card px-2 py-1.5 text-xs text-secondary"
              title="Preview MedSpa"
            >
              {medSpaOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Link
              to="/book"
              className="inline-flex items-center bg-espresso px-4 py-2.5 text-sm font-medium tracking-wide text-ivory transition hover:bg-charcoal"
            >
              {config.cta.book}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/book"
              className="inline-flex items-center bg-espresso px-3 py-2 text-xs font-medium tracking-wide text-ivory"
            >
              Book
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center border border-border"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background lg:hidden"
        >
          <nav className="section-pad flex flex-col gap-1 py-4" aria-label="Mobile">
            {config.navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-1 py-3 text-base ${isActive ? 'text-espresso' : 'text-secondary'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 bg-espresso px-4 py-3 text-center text-sm font-medium text-ivory"
            >
              {config.cta.book}
            </Link>
            <div className="mt-4 border-t border-border pt-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                Preview MedSpa
              </p>
              <select
                value={medSpaId}
                onChange={(e) => setMedSpaId(e.target.value as MedSpaId)}
                className="w-full border border-border bg-card px-3 py-2 text-sm"
              >
                {medSpaOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
