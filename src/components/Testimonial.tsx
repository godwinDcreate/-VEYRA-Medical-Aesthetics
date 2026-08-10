import type { Testimonial as TestimonialType } from '@/types/medspa'

export function Testimonial({ item }: { item: TestimonialType }) {
  return (
    <blockquote className="glass-medium glass-reflect flex h-full flex-col rounded-[1.5rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/50 sm:p-8">
      <span className="font-display text-5xl leading-none text-accent/50" aria-hidden>
        “
      </span>
      <p className="mt-2 font-display text-xl leading-snug text-espresso sm:text-2xl">{item.quote}</p>
      <footer className="mt-auto pt-6 text-sm text-muted-foreground">
        <cite className="not-italic font-medium text-foreground">{item.name}</cite>
        <span className="mx-2 text-border">·</span>
        <span>{item.detail}</span>
      </footer>
    </blockquote>
  )
}
