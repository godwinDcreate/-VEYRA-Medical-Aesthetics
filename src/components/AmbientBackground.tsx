import { LiquidBlob } from './LiquidBlob'

/** Soft layered ambient atmosphere — limited blur count for performance */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 85% -10%, color-mix(in srgb, var(--beige) 32%, transparent), transparent 55%),
            radial-gradient(ellipse 70% 50% at -5% 40%, color-mix(in srgb, var(--sage) 10%, transparent), transparent 50%),
            radial-gradient(ellipse 55% 40% at 50% 100%, color-mix(in srgb, var(--cream) 55%, transparent), transparent 60%),
            var(--background)
          `,
        }}
      />
      <LiquidBlob
        size={520}
        color="champagne"
        blur={80}
        opacity={0.7}
        animation="float-slow"
        className="left-[-12%] top-[-8%]"
      />
      <LiquidBlob
        size={440}
        color="sage"
        blur={90}
        opacity={0.55}
        animation="drift"
        className="right-[-10%] top-[28%]"
      />
      <LiquidBlob
        size={380}
        color="warm"
        blur={70}
        opacity={0.5}
        animation="float"
        className="bottom-[8%] left-[20%]"
      />
      <div className="noise-overlay" />
    </div>
  )
}
