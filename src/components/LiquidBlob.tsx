import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface LiquidBlobProps {
  size?: number | string
  className?: string
  color?: 'cream' | 'sage' | 'champagne' | 'ivory' | 'warm'
  blur?: number
  opacity?: number
  animation?: 'float' | 'drift' | 'float-slow' | 'none'
  style?: CSSProperties
  interactive?: boolean
  mouseX?: number
  mouseY?: number
  parallaxStrength?: number
}

const COLORS: Record<NonNullable<LiquidBlobProps['color']>, string> = {
  cream: 'rgba(239, 232, 222, 0.55)',
  sage: 'rgba(111, 127, 107, 0.22)',
  champagne: 'rgba(212, 196, 176, 0.45)',
  ivory: 'rgba(252, 250, 247, 0.6)',
  warm: 'rgba(232, 214, 196, 0.4)',
}

const ANIMATION_CLASS: Record<NonNullable<LiquidBlobProps['animation']>, string> = {
  float: 'liquid-float',
  drift: 'liquid-drift',
  'float-slow': 'liquid-float-slow',
  none: '',
}

export function LiquidBlob({
  size = 420,
  className = '',
  color = 'cream',
  blur = 60,
  opacity = 1,
  animation = 'float',
  style,
  interactive = false,
  mouseX = 0,
  mouseY = 0,
  parallaxStrength = 12,
}: LiquidBlobProps) {
  const reduce = useReducedMotion()
  const dim = typeof size === 'number' ? `${size}px` : size

  const parallax = interactive && !reduce
    ? {
        x: mouseX * parallaxStrength,
        y: mouseY * parallaxStrength,
      }
    : undefined

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${ANIMATION_CLASS[animation]} ${className}`}
      style={{
        width: dim,
        height: dim,
        opacity,
        borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%',
        background: COLORS[color],
        filter: `blur(${blur}px)`,
        willChange: reduce ? undefined : 'transform',
        ...style,
      }}
      animate={parallax}
      transition={{ type: 'spring', stiffness: 40, damping: 25, mass: 0.8 }}
    />
  )
}

export function GlassOrb({
  size = 180,
  className = '',
  mouseX = 0,
  mouseY = 0,
  strength = 18,
}: {
  size?: number
  className?: string
  mouseX?: number
  mouseY?: number
  strength?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      className={`glass-orb glass-light pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '46% 54% 52% 48% / 50% 46% 54% 50%',
        willChange: reduce ? undefined : 'transform',
      }}
      animate={
        reduce
          ? undefined
          : {
              x: mouseX * strength,
              y: mouseY * strength,
            }
      }
      transition={{ type: 'spring', stiffness: 35, damping: 22 }}
    >
      <span
        className="absolute inset-[18%] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.55), transparent 55%)',
          borderRadius: 'inherit',
        }}
      />
    </motion.div>
  )
}
