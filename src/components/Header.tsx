import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useMedSpa } from '@/context/MedSpaContext'

export function Header() {
  const { config } = useMedSpa()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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
    <header className="pointer-events-none sticky top-0 z-50 section-pad pt-4 sm:pt-5">
      <div className="container-wide flex justify-center">
        <motion.div
          className={`pointer-events-auto glass-nav glass-reflect flex w-full max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-[background,box-shadow,border-color] duration-500 sm:px-4 sm:py-2.5 ${
            scrolled || open ? 'glass-nav-scrolled' : ''
          }`}
          initial={reduce ? false : { y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-full px-3 py-1.5 transition hover:bg-white/25"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-xl tracking-[0.14em] text-espresso sm:text-2xl">
              {config.brand.logoText ?? config.brand.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {config.navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'bg-white/40 text-espresso'
                      : 'text-secondary hover:bg-white/25 hover:text-espresso'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link to="/book" className="btn-primary !px-4 !py-2 text-xs sm:text-sm" data-cursor="cta">
              {config.cta.book}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/book" className="btn-primary !px-3.5 !py-2 text-xs" data-cursor="cta">
              Book
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/25"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="pointer-events-auto absolute inset-x-0 top-full section-pad pt-3 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <nav
              className="glass-strong glass-reflect mx-auto flex max-w-5xl flex-col gap-1 rounded-[1.75rem] p-4"
              aria-label="Mobile"
            >
              {config.navigation.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-base ${
                      isActive ? 'bg-white/45 text-espresso' : 'text-secondary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 justify-center"
              >
                {config.cta.book}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
