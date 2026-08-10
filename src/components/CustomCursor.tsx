import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Desktop-only subtle glass cursor.
 * Disabled on touch / coarse pointers and when prefers-reduced-motion.
 */
export function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [mode, setMode] = useState<'default' | 'cta' | 'media'>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reduce) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
      const el = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [data-cursor], [role="button"], input, textarea, select, img'
      ) as HTMLElement | null
      if (!el) {
        setMode('default')
        return
      }
      if (
        el.matches('img, [data-cursor="media"]') ||
        el.classList.contains('cursor-media')
      ) {
        setMode('media')
      } else if (
        el.matches('a, button, [role="button"], [data-cursor="cta"]') ||
        el.classList.contains('btn-primary') ||
        el.classList.contains('btn-glass')
      ) {
        setMode('cta')
      } else {
        setMode('default')
      }
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce])

  if (!enabled) return null

  const scale = mode === 'cta' ? 3.2 : mode === 'media' ? 4.2 : 1

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{
        width: 12,
        height: 12,
        marginLeft: -6,
        marginTop: -6,
        borderRadius: '50%',
        background: mode === 'default' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.16)',
        border: '1px solid rgba(255,255,255,0.45)',
        backdropFilter: mode === 'default' ? undefined : 'blur(8px)',
        boxShadow: '0 4px 16px rgba(26,22,18,0.08)',
        opacity: visible ? 1 : 0,
        willChange: 'transform',
      }}
      animate={{
        x: pos.x,
        y: pos.y,
        scale,
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.35 }}
    />
  )
}
