import { useCallback, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { HeroContent } from '@/types/medspa'
import { useMedSpa } from '@/context/MedSpaContext'
import { GlassOrb, LiquidBlob } from './LiquidBlob'

export function Hero({ content }: { content: HeroContent }) {
  const reduce = useReducedMotion()
  const { config } = useMedSpa()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (reduce) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMouse({ x, y })
    },
    [reduce]
  )

  return (
    <section
      className="section-pad relative overflow-hidden pb-20 pt-6 sm:pb-28 sm:pt-10 lg:pt-14"
      onMouseMove={onMove}
    >
      <LiquidBlob
        size={480}
        color="cream"
        blur={70}
        opacity={0.65}
        animation="float-slow"
        interactive
        mouseX={mouse.x}
        mouseY={mouse.y}
        parallaxStrength={10}
        className="left-[8%] top-[-5%] hidden sm:block"
      />
      <LiquidBlob
        size={360}
        color="sage"
        blur={80}
        opacity={0.4}
        animation="drift"
        interactive
        mouseX={mouse.x}
        mouseY={mouse.y}
        parallaxStrength={8}
        className="right-[5%] top-[35%] hidden md:block"
      />

      <div className="container-wide relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative z-10 lg:col-span-5 lg:pb-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-xs">
              {config.brand.name.toUpperCase()}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.12] text-balance text-espresso sm:text-5xl lg:text-[3.35rem]">
              {content.headline.includes('.') ? (
                <>
                  {content.headline.split('.')[0]}.
                  <br />
                  {content.headline.split('.').slice(1).join('.').trim()}
                </>
              ) : (
                content.headline
              )}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.supporting}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to={content.primaryCta.href} className="btn-primary group" data-cursor="cta">
                {content.primaryCta.label}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link to={content.secondaryCta.href} className="btn-glass" data-cursor="cta">
                {content.secondaryCta.label}
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 lg:col-span-7"
          initial={reduce ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="relative">
            <GlassOrb
              size={140}
              className="-left-6 top-10 hidden lg:block"
              mouseX={mouse.x}
              mouseY={mouse.y}
              strength={14}
            />
            <GlassOrb
              size={90}
              className="-right-2 bottom-24 hidden sm:block"
              mouseX={mouse.x}
              mouseY={mouse.y}
              strength={20}
            />

            <div className="glass-light relative overflow-hidden rounded-[1.75rem] p-1.5 sm:rounded-[2rem] sm:p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] sm:aspect-[5/6] sm:rounded-[1.6rem] lg:aspect-[4/5]">
                <img
                  src={content.image.src}
                  alt={content.image.alt}
                  width={content.image.width}
                  height={content.image.height}
                  fetchPriority="high"
                  decoding="async"
                  className="cursor-media h-full w-full object-cover"
                  data-cursor="media"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-white/10"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 glass-light opacity-30 mix-blend-soft-light"
                  aria-hidden
                />
              </div>
            </div>

            <motion.aside
              className="glass-medium glass-reflect absolute -bottom-4 left-4 max-w-[16.5rem] rounded-2xl p-4 sm:left-6 sm:max-w-[18rem] sm:p-5 lg:-left-4 lg:bottom-10"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: [0, -6, 0],
                    }
              }
              transition={
                reduce
                  ? { duration: 0.5 }
                  : {
                      opacity: { duration: 0.6, delay: 0.35 },
                      y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                    }
              }
            >
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.26em] text-accent">
                Personalized Care
              </p>
              <p className="mt-2 text-sm leading-relaxed text-espresso/90">
                Thoughtful treatments designed around your individual goals.
              </p>
            </motion.aside>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
