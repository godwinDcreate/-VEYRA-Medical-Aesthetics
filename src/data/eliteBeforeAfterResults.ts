import type { ResultItem } from '@/types/medspa'

const SOURCE_URL = 'https://elitemedicalspa.com/before-and-after-images/'
const SOURCE_LABEL = 'Elite Medical Spa public before-and-after gallery'
const USAGE_RIGHTS =
  'Publicly accessible third-party gallery asset. Confirm licensing and permission before production reuse.'
const DISCLAIMER =
  'Sourced from a public external gallery for portfolio demonstration only. This is not a VEYRA patient result, and individual results vary.'

export const eliteBeforeAfterResults: ResultItem[] = [
  {
    id: 'elite-tox-xeomin-crowsfeet',
    treatment: 'Expression Lines',
    treatmentSlug: 'botox',
    description:
      "External composite before/after showing Xeomin treatment to the forehead and crow's feet.",
    beforeImage: '',
    afterImage: '',
    compositeImage:
      'https://elitemedicalspa.com/wp-content/uploads/2025/08/Leanne-Lorenz-Xeomin-to-Forehead-and-Crowsfeet.png',
    altBefore: 'Before view included inside sourced Xeomin composite image',
    altAfter: 'After view included inside sourced Xeomin composite image',
    altComposite: "Xeomin before-and-after composite for forehead lines and crow's feet",
    source: SOURCE_LABEL,
    sourceUrl: SOURCE_URL,
    usageRights: USAGE_RIGHTS,
    disclaimer: DISCLAIMER,
    width: 1170,
    height: 925,
    isPlaceholder: false,
  },
  {
    id: 'elite-hydrafacial',
    treatment: 'Skin Rejuvenation',
    treatmentSlug: 'hydrafacial',
    description:
      'External composite before/after from a HydraFacial gallery example focused on skin glow and surface clarity.',
    beforeImage: '',
    afterImage: '',
    compositeImage: 'https://elitemedicalspa.com/wp-content/uploads/2025/07/Hydra-Facials.webp',
    compositeImageWebp: 'https://elitemedicalspa.com/wp-content/uploads/2025/07/Hydra-Facials.webp',
    altBefore: 'Before view included inside sourced HydraFacial composite image',
    altAfter: 'After view included inside sourced HydraFacial composite image',
    altComposite: 'HydraFacial before-and-after composite showing refreshed skin texture and glow',
    source: SOURCE_LABEL,
    sourceUrl: SOURCE_URL,
    usageRights: USAGE_RIGHTS,
    disclaimer: DISCLAIMER,
    width: 1200,
    height: 948,
    isPlaceholder: false,
  },
  {
    id: 'elite-lips-juvederm',
    treatment: 'Dermal Fillers',
    treatmentSlug: 'dermal-fillers',
    description:
      'External composite before/after showing Juvederm lip filler results from the source gallery.',
    beforeImage: '',
    afterImage: '',
    compositeImage:
      'https://elitemedicalspa.com/wp-content/uploads/2025/08/Leanne-Lorenz-Juvederm-to-Lips-2.png',
    altBefore: 'Before view included inside sourced Juvederm lip-filler composite image',
    altAfter: 'After view included inside sourced Juvederm lip-filler composite image',
    altComposite: 'Juvederm lip filler before-and-after composite',
    source: SOURCE_LABEL,
    sourceUrl: SOURCE_URL,
    usageRights: USAGE_RIGHTS,
    disclaimer: DISCLAIMER,
    width: 1170,
    height: 925,
    isPlaceholder: false,
  },
]

export default eliteBeforeAfterResults
