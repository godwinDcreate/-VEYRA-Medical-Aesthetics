import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Treatment } from '@/types/medspa'

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group flex h-full flex-col border-t border-border pt-6">
      <p className="text-xs uppercase tracking-[0.16em] text-accent">{treatment.typicalConcern}</p>
      <h3 className="mt-2 font-display text-2xl sm:text-[1.75rem]">
        <Link to={`/treatments/${treatment.slug}`} className="hover:text-accent transition-colors">
          {treatment.name}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {treatment.shortDescription}
      </p>
      <Link
        to={`/treatments/${treatment.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-espresso transition group-hover:gap-2.5"
      >
        Learn More
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </article>
  )
}

export function TreatmentGrid({ treatments }: { treatments: Treatment[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
      className="block overflow-hidden border border-border bg-card transition hover:border-espresso/25"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={treatment.image.src}
          alt={treatment.image.alt}
          width={treatment.image.width}
          height={treatment.image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl">{treatment.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{treatment.shortDescription}</p>
      </div>
    </Link>
  )
}
