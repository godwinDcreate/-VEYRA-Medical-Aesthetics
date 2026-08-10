import type { Provider } from '@/types/medspa'

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.75rem]">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-[21/12]">
        <img
          src={provider.image.src}
          alt={provider.image.alt}
          width={provider.image.width}
          height={provider.image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
          data-cursor="media"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent"
          aria-hidden
        />
        <div className="glass-medium glass-reflect absolute inset-x-4 bottom-4 max-w-lg rounded-2xl p-5 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:p-6">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-accent">{provider.role}</p>
          <h3 className="mt-1.5 font-display text-2xl text-espresso sm:text-3xl">{provider.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-espresso/80 sm:text-[0.95rem]">
            {provider.bio}
          </p>
          <p className="mt-3 text-xs italic text-muted-foreground">{provider.note}</p>
        </div>
      </div>
    </article>
  )
}
