import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getMedSpaConfig, type MedSpaId } from '@/config/medspa'
import type { MedSpaConfig } from '@/types/medspa'
import { applyTheme } from '@/lib/theme'

const STORAGE_KEY = 'veyra-preview-medspa'

interface MedSpaContextValue {
  config: MedSpaConfig
  medSpaId: MedSpaId
  setMedSpaId: (id: MedSpaId) => void
}

const MedSpaContext = createContext<MedSpaContextValue | null>(null)

function readStoredId(): MedSpaId {
  if (typeof window === 'undefined') return 'veyra'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'veyra' || stored === 'aurelia' || stored === 'nova') return stored
  return 'veyra'
}

export function MedSpaProvider({ children }: { children: ReactNode }) {
  const [medSpaId, setMedSpaIdState] = useState<MedSpaId>('veyra')

  useEffect(() => {
    setMedSpaIdState(readStoredId())
  }, [])

  const config = useMemo(() => getMedSpaConfig(medSpaId), [medSpaId])

  useEffect(() => {
    applyTheme(config.theme)
    document.documentElement.dataset.tenant = config.id
  }, [config])

  const setMedSpaId = useCallback((id: MedSpaId) => {
    setMedSpaIdState(id)
    window.localStorage.setItem(STORAGE_KEY, id)
  }, [])

  const value = useMemo(
    () => ({ config, medSpaId, setMedSpaId }),
    [config, medSpaId, setMedSpaId]
  )

  return <MedSpaContext.Provider value={value}>{children}</MedSpaContext.Provider>
}

export function useMedSpa() {
  const ctx = useContext(MedSpaContext)
  if (!ctx) throw new Error('useMedSpa must be used within MedSpaProvider')
  return ctx
}
