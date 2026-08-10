interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as = 'h2',
}: SectionHeadingProps) {
  const Tag = as
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      )}
      <div className={`editorial-rule mb-5 ${align === 'center' ? 'mx-auto' : ''}`} />
      <Tag className="font-display text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  )
}
