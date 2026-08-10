import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '@/types/medspa'

export function FAQAccordion({ items }: { items: FAQItem[] | { id?: string; question: string; answer: string }[] }) {
  const baseId = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`
        const isOpen = open === index
        return (
          <div key={item.id ?? item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="font-display text-lg sm:text-xl">{item.question}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-accent transition ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function FAQ({ items, title = 'Frequently asked questions' }: { items: FAQItem[]; title?: string }) {
  return (
    <div>
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-8">
        <FAQAccordion items={items} />
      </div>
    </div>
  )
}
