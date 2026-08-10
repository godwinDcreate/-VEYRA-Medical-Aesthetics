import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Treatment } from '@/types/medspa'

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] transition-transform duration-500 hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
        <img
          src={treatment.image.src}
          alt={treatment.image.alt}
          width={treatment.image.width}
          height={treatment.image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
          data-cursor="media"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/55 via-espresso/10 to-transparent"
          aria-hidden
        />
        <div className="glass-medium glass-reflect absolute inset-x-3 bottom-3 rounded-2xl p-4 transition duration-500 group-hover:border-white/50 sm:inset-x-4 sm:bottom-4 sm:p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-accent">{treatment.typicalConcern}</p>
          <h3 className="mt-1.5 font-display text-2xl text-espresso sm:text-[1.7rem]">
            <Link to={`/treatments/${treatment.slug}`} className="hover:text-charcoal">
              {treatment.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-espresso/75">
            {treatment.shortDescription}
          </p>
          <Link
            to={`/treatments/${treatment.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-espresso transition-all duration-300 group-hover:gap-2.5"
            data-cursor="cta"
          >
            Explore Treatment
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function TreatmentGrid({ treatments }: { treatments: Treatment[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {treatments.map((t) => (
        <TreatmentCard key={t.slug} treatment={t} />
      ))}
    </div>
  )
}

export function ServiceCard({ treatment }: { treatment: Treatment }) {
  return (
    <Link
      to={`/treatments/${treatment.slug}`}
      className="group glass-light glass-reflect block overflow-hidden rounded-[1.5rem] transition duration-500 hover:-translate-y-1 hover:border-white/50"
      data-cursor="cta"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={treatment.image.src}
          alt={treatment.image.alt}
          width={treatment.image.width}
          height={treatment.image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl sm:text-2xl">{treatment.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{treatment.shortDescription}</p>
      </div>
    </Link>
  )
}
