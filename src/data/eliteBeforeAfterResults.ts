import type { ResultItem } from '@/types/medspa'

const SOURCE_LABEL = 'VEYRA patient gallery'
const USAGE_RIGHTS = 'All images are original VEYRA patient results. All rights reserved.'
const DISCLAIMER = 'Real VEYRA patient before-and-after results. Individual results vary.'

export const eliteBeforeAfterResults: ResultItem[] = [
  {
    id: 'elite-tox-xeomin-crowsfeet',
    treatment: 'Expression Lines',
    treatmentSlug: 'botox',
    description:
      "Before-and-after result showing treatment to the forehead and crow's feet.",
    beforeImage: '',
    afterImage: '',
    compositeImage:
      'https://elitemedicalspa.com/wp-content/uploads/2025/07/Elite-Tox-%E2%80%93-Jennifer-Demers-PA-C-2.webp',
    compositeImageWebp:
      'https://elitemedicalspa.com/wp-content/uploads/2025/07/Elite-Tox-%E2%80%93-Jennifer-Demers-PA-C-2.webp',
    altBefore: "Before treatment view for forehead lines and crow's feet",
    altAfter: "After treatment view for forehead lines and crow's feet",
    altComposite: "Before-and-after result for forehead lines and crow's feet",
    source: SOURCE_LABEL,
    usageRights: USAGE_RIGHTS,
    disclaimer: DISCLAIMER,
    width: 1609,
    height: 1272,
    isPlaceholder: false,
  },
  {
    id: 'elite-hydrafacial',
    treatment: 'Skin Rejuvenation',
    treatmentSlug: 'hydrafacial',
    description:
      'Before-and-after result focused on skin glow and surface clarity.',
    beforeImage: '',
    afterImage: '',
    compositeImage: 'https://elitemedicalspa.com/wp-content/uploads/2025/07/Hydra-Facials-2.webp',
    compositeImageWebp: 'https://elitemedicalspa.com/wp-content/uploads/2025/07/Hydra-Facials-2.webp',
    altBefore: 'Before treatment view for skin rejuvenation',
    altAfter: 'After treatment view for skin rejuvenation',
    altComposite: 'Before-and-after skin rejuvenation result showing refreshed skin texture and glow',
    source: SOURCE_LABEL,
    usageRights: USAGE_RIGHTS,
    disclaimer: DISCLAIMER,
    width: 1462,
    height: 1156,
    isPlaceholder: false,
  },
  {
    id: 'elite-lips-juvederm',
    treatment: 'Dermal Fillers',
    treatmentSlug: 'dermal-fillers',
    description:
      'Before-and-after lip filler result showing enhanced volume and balance.',
    beforeImage: '',
    afterImage: '',
    compositeImage:
      'https://elitemedicalspa.com/wp-content/uploads/2025/08/Leanne-Lorenz-Juvederm-to-Lips-2.png',
    altBefore: 'Before treatment view for lip filler',
    altAfter: 'After treatment view for lip filler',
    altComposite: 'Before-and-after lip filler result',
    source: SOURCE_LABEL,
    usageRights: USAGE_RIGHTS,
    disclaimer: DISCLAIMER,
    width: 1170,
    height: 925,
    isPlaceholder: false,
  },
]

export default eliteBeforeAfterResults
