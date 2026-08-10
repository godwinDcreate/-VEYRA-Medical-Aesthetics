import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { HeroContent } from '@/types/medspa'

export function Hero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion()

  return (
    <section className="section-pad relative overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12 lg:pt-16">
      <div className="container-wide grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:pb-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-5xl tracking-[0.12em] text-espresso sm:text-6xl lg:text-7xl">
              {content.brandLabel}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
              {content.brandSubLabel}
            </p>
            <h1 className="mt-8 font-display text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
              {content.headline}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.supporting}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={content.primaryCta.href}
                className="inline-flex items-center gap-2 bg-espresso px-5 py-3 text-sm font-medium tracking-wide text-ivory transition hover:bg-charcoal"
              >
                {content.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to={content.secondaryCta.href}
                className="inline-flex items-center border border-border bg-card/60 px-5 py-3 text-sm font-medium tracking-wide text-espresso transition hover:border-espresso/30"
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative lg:col-span-6"
          initial={reduce ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] lg:aspect-[4/5]">
            <img
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
