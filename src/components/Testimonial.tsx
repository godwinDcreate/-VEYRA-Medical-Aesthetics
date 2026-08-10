import type { Testimonial as TestimonialType } from '@/types/medspa'

export function Testimonial({ item }: { item: TestimonialType }) {
  return (
    <blockquote className="border-l border-accent/50 pl-5 sm:pl-6">
      <p className="font-display text-xl leading-snug text-espresso sm:text-2xl">“{item.quote}”</p>
      <footer className="mt-4 text-sm text-muted-foreground">
        <cite className="not-italic font-medium text-foreground">{item.name}</cite>
        <span className="mx-2">·</span>
        <span>{item.detail}</span>
      </footer>
    </blockquote>
  )
}
