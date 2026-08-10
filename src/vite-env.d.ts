/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_AI_API_URL?: string
  readonly VITE_AI_PROVIDER?: string
  readonly VITE_BOOKING_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
