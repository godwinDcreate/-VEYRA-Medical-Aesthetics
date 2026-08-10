import type { Provider } from '@/types/medspa'

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <article className="grid gap-5 sm:grid-cols-[minmax(0,0.9fr)_1.2fr] sm:gap-8">
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={provider.image.src}
          alt={provider.image.alt}
          width={provider.image.width}
          height={provider.image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">{provider.role}</p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl">{provider.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{provider.bio}</p>
        <p className="mt-4 text-xs italic text-muted-foreground">{provider.note}</p>
      </div>
    </article>
  )
}
