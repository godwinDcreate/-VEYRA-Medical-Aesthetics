import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MedSpaProvider } from '@/context/MedSpaContext'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'

const Treatments = lazy(() =>
  import('@/pages/Treatments').then((m) => ({ default: m.Treatments }))
)
const TreatmentDetail = lazy(() =>
  import('@/pages/TreatmentDetail').then((m) => ({ default: m.TreatmentDetail }))
)
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Providers = lazy(() => import('@/pages/Providers').then((m) => ({ default: m.Providers })))
const ResultsPage = lazy(() =>
  import('@/pages/ResultsPage').then((m) => ({ default: m.ResultsPage }))
)
const FAQPage = lazy(() => import('@/pages/FAQPage').then((m) => ({ default: m.FAQPage })))
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })))
const Book = lazy(() => import('@/pages/Book').then((m) => ({ default: m.Book })))
const LocationPage = lazy(() =>
  import('@/pages/LocationPage').then((m) => ({ default: m.LocationPage }))
)
const System = lazy(() => import('@/pages/System').then((m) => ({ default: m.System })))
const Privacy = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Privacy })))
const Terms = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Terms })))

function PageLoader() {
  return (
    <div className="section-pad py-24 text-center text-sm text-muted-foreground" role="status">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <MedSpaProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="treatments" element={<Treatments />} />
              <Route path="treatments/:slug" element={<TreatmentDetail />} />
              <Route path="about" element={<About />} />
              <Route path="providers" element={<Providers />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="book" element={<Book />} />
              <Route path="locations/austin" element={<LocationPage />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="system" element={<System />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MedSpaProvider>
  )
}
