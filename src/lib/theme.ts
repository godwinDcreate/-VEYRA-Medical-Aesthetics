import type { ThemeTokens } from '@/types/medspa'

/** Maps theme tokens → CSS variables for global branding without per-component colors. */
export function applyTheme(theme: ThemeTokens) {
  const root = document.documentElement
  const map: Record<string, string> = {
    '--background': theme.background,
    '--foreground': theme.foreground,
    '--primary': theme.primary,
    '--secondary': theme.secondary,
    '--accent': theme.accent,
    '--muted': theme.muted,
    '--muted-foreground': theme.mutedForeground,
    '--border': theme.border,
    '--cream': theme.cream,
    '--ivory': theme.ivory,
    '--sage': theme.sage,
    '--beige': theme.beige,
    '--espresso': theme.espresso,
    '--charcoal': theme.charcoal,
    '--card': theme.card,
    '--ring': theme.ring,
  }
  Object.entries(map).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}
