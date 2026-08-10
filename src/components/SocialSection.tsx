import { SocialLinks } from '@/components/SocialLinks'
import { useMedSpa } from '@/context/MedSpaContext'

/** Subtle homepage cluster — connect without competing with primary CTAs. */
export function SocialSection() {
  const { config } = useMedSpa()
  const { socialLinks, brand } = config
  const hasLinks = Boolean(socialLinks.instagram || socialLinks.facebook || socialLinks.tiktok)
  if (!hasLinks) return null

  return (
    <section className="section-pad relative py-12 sm:py-16">
      <div className="container-wide">
        <div className="glass-light glass-reflect mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[1.5rem] px-6 py-8 text-center sm:px-10">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-secondary">
            Connect
          </p>
          <h2 className="font-display text-2xl sm:text-3xl">Follow {brand.shortName}</h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Demo social profiles for this fictional MedSpa brand — swap URLs in configuration for
            each clinic.
          </p>
          <SocialLinks links={socialLinks} variant="default" />
        </div>
      </div>
    </section>
  )
}
