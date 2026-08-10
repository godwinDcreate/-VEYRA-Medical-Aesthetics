import type { SocialLinks as SocialLinksConfig } from '@/types/medspa'

type SocialPlatform = keyof SocialLinksConfig

const PLATFORMS: {
  key: SocialPlatform
  label: string
  Icon: typeof InstagramIcon
}[] = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'tiktok', label: 'TikTok', Icon: TikTokIcon },
]

type Variant = 'default' | 'compact' | 'footer'

interface SocialLinksProps {
  links: SocialLinksConfig
  variant?: Variant
  className?: string
  /** Visible heading; omit for icon-only clusters with aria-label on the nav */
  label?: string
}

export function SocialLinks({
  links,
  variant = 'default',
  className = '',
  label,
}: SocialLinksProps) {
  const items = PLATFORMS.filter(({ key }) => Boolean(links[key]))
  if (items.length === 0) return null

  const iconSize = variant === 'compact' ? 'size-4' : 'size-[1.15rem]'
  const btnClass =
    variant === 'footer'
      ? 'glass-light inline-flex size-10 items-center justify-center rounded-full text-espresso transition hover:-translate-y-0.5 hover:border-white/45'
      : variant === 'compact'
        ? 'inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/15 text-espresso transition hover:bg-white/30'
        : 'glass-medium inline-flex size-11 items-center justify-center rounded-full text-espresso transition hover:-translate-y-0.5 hover:border-white/50'

  return (
    <nav
      aria-label={label ?? 'Social media'}
      className={className}
    >
      {label ? (
        <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-secondary">
          {label}
        </p>
      ) : null}
      <ul className="flex flex-wrap items-center gap-2.5">
        {items.map(({ key, label: platformLabel, Icon }) => {
          const href = links[key]!
          return (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={btnClass}
                aria-label={`${platformLabel} (opens in a new tab)`}
                data-cursor="cta"
              >
                <Icon className={iconSize} aria-hidden />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.5 8.5V7.2c0-.7.5-1.2 1.2-1.2H17V3.5h-2.1C12.3 3.5 11 5 11 7.4v1.1H9v2.7h2V20.5h3.5v-9.3h2.3l.4-2.7h-2.7z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 4.2c.6 1.7 2 3 3.8 3.4v2.5c-1.4-.1-2.7-.5-3.8-1.3v5.6c0 3.2-2.6 5.8-5.8 5.8S5 17.6 5 14.4s2.6-5.8 5.8-5.8c.3 0 .6 0 .9.1v2.7a3.1 3.1 0 0 0-.9-.1 3.1 3.1 0 1 0 3.1 3.1V4.2h2.7z" />
    </svg>
  )
}
