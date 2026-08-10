/**
 * Multi-tenant registry.
 * Build once → configure per client → deploy.
 *
 * Production pattern:
 * - Resolve tenant from hostname / env / CMS
 * - Load matching MedSpaConfig
 * - Apply theme tokens + content
 */

import type { MedSpaConfig } from '@/types/medspa'
import { veyraConfig } from './medspas/veyra'
import { aureliaConfig } from './medspas/aurelia'
import { novaConfig } from './medspas/nova'

export const medSpaRegistry: Record<string, MedSpaConfig> = {
  veyra: veyraConfig,
  aurelia: aureliaConfig,
  nova: novaConfig,
}

export const medSpaOptions = [
  { id: 'veyra', label: 'VEYRA Medical Aesthetics' },
  { id: 'aurelia', label: 'AURELIA Aesthetics' },
  { id: 'nova', label: 'NOVA Medical Spa' },
] as const

export type MedSpaId = keyof typeof medSpaRegistry

export const DEFAULT_MEDSPA_ID: MedSpaId = 'veyra'

export function getMedSpaConfig(id: string = DEFAULT_MEDSPA_ID): MedSpaConfig {
  return medSpaRegistry[id] ?? medSpaRegistry[DEFAULT_MEDSPA_ID]
}

/** Active tenant for SSR/build tooling defaults */
export const medSpaConfig = veyraConfig

export default medSpaConfig
