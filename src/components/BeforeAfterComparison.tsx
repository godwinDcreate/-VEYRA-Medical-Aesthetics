import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { GripVertical } from 'lucide-react'
import type { ResultItem } from '@/types/medspa'

interface BeforeAfterComparisonProps {
  result: ResultItem
  /** Prefer lazy for below-the-fold galleries */
  loading?: 'lazy' | 'eager'
  className?: string
}

function hasRealImage(src: string | undefined) {
  return Boolean(src)
}

export function BeforeAfterComparison({
  result,
  loading = 'lazy',
  className = '',
}: BeforeAfterComparisonProps) {
  const sliderId = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const hasCompositeImage = hasRealImage(result.compositeImage)

  const showPlaceholders =
    !hasCompositeImage &&
    (result.isPlaceholder || !hasRealImage(result.beforeImage) || !hasRealImage(result.afterImage))

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }, [])

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    draggingRef.current = false
    setDragging(false)
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    trackRef.current?.setPointerCapture(e.pointerId)
    draggingRef.current = true
    setDragging(true)
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault()
      setPosition((p) => Math.max(0, p - step))
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault()
      setPosition((p) => Math.min(100, p + step))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPosition(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPosition(100)
    }
  }

  // Side-by-side composites show one panel at a time — use half-width aspect to avoid stretch.
  const aspect = hasCompositeImage
    ? `${result.width / 2} / ${result.height}`
    : `${result.width} / ${result.height}`

  return (
    <article className={`group ${className}`}>
      {hasCompositeImage ? (
        <div
          ref={trackRef}
          className="before-after relative isolate overflow-hidden rounded-[1.5rem] select-none touch-none"
          style={{ aspectRatio: aspect }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="absolute inset-0">
            <CompositeResultFrame side="after" result={result} loading={loading} />
          </div>
          <div
            className="absolute inset-0 overflow-hidden will-change-[clip-path]"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            aria-hidden
          >
            <CompositeResultFrame side="before" result={result} loading={loading} />
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 z-30 w-px bg-white/75 shadow-[0_0_14px_rgba(255,255,255,0.5)]"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            aria-hidden
          />
          <div
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% before visible`}
            aria-controls={sliderId}
            aria-label={`Compare before and after for ${result.treatment}`}
            className={`pointer-events-auto absolute top-1/2 z-40 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full outline-none transition duration-200 ${
              dragging ? 'scale-105' : 'hover:scale-105'
            } glass-strong glass-reflect`}
            style={{ left: `${position}%` }}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => {
              e.stopPropagation()
              onPointerDown(e)
            }}
          >
            <GripVertical className="size-4 text-espresso/80" aria-hidden />
          </div>
          <span id={sliderId} className="sr-only">
            Drag or use arrow keys to reveal before versus after imagery for {result.treatment}.
          </span>
        </div>
      ) : (
        <div
          ref={trackRef}
          className="before-after relative isolate overflow-hidden rounded-[1.5rem] select-none touch-none"
          style={{ aspectRatio: aspect }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {/* After (base layer — full frame) */}
          <div className="absolute inset-0">
            <ResultFrame
              side="after"
              result={result}
              showPlaceholder={showPlaceholders}
              loading={loading}
            />
          </div>

          {/* Before (clipped overlay) */}
          <div
            className="absolute inset-0 overflow-hidden will-change-[clip-path]"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            aria-hidden
          >
            <ResultFrame
              side="before"
              result={result}
              showPlaceholder={showPlaceholders}
              loading={loading}
            />
          </div>

          {/* Slider control */}
          <div
            className="pointer-events-none absolute inset-y-0 z-30 w-px bg-white/75 shadow-[0_0_14px_rgba(255,255,255,0.5)]"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            aria-hidden
          />
          <div
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% before visible`}
            aria-controls={sliderId}
            aria-label={`Compare before and after for ${result.treatment}`}
            className={`pointer-events-auto absolute top-1/2 z-40 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full outline-none transition duration-200 ${
              dragging ? 'scale-105' : 'hover:scale-105'
            } glass-strong glass-reflect`}
            style={{ left: `${position}%` }}
            onKeyDown={onKeyDown}
            onPointerDown={(e) => {
              e.stopPropagation()
              onPointerDown(e)
            }}
          >
            <GripVertical className="size-4 text-espresso/80" aria-hidden />
          </div>

          <span id={sliderId} className="sr-only">
            Drag or use arrow keys to reveal before versus after imagery for {result.treatment}.
          </span>
        </div>
      )}

      <div className="mt-4 space-y-2 px-0.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl sm:text-2xl">{result.treatment}</h3>
          <Link
            to={`/treatments/${result.treatmentSlug}`}
            className="text-sm font-medium text-muted-foreground transition hover:text-accent"
          >
            Related treatment →
          </Link>
        </div>
        {result.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{result.description}</p>
        ) : null}
        <p className="text-[0.7rem] leading-relaxed text-muted-foreground">{result.disclaimer}</p>
        {(result.source || result.usageRights) && (
          <p className="text-[0.65rem] leading-relaxed text-muted-foreground/80">
            {result.source}
            {result.sourceUrl ? (
              <>
                {' · '}
                <a
                  href={result.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Source
                </a>
              </>
            ) : null}
            {result.usageRights ? ` · ${result.usageRights}` : null}
          </p>
        )}
      </div>
    </article>
  )
}

function ResultFrame({
  side,
  result,
  showPlaceholder,
  loading,
}: {
  side: 'before' | 'after'
  result: ResultItem
  showPlaceholder: boolean
  loading: 'lazy' | 'eager'
}) {
  const src = side === 'before' ? result.beforeImage : result.afterImage
  const alt = side === 'before' ? result.altBefore : result.altAfter
  const avif = side === 'before' ? result.beforeImageAvif : result.afterImageAvif
  const webp = side === 'before' ? result.beforeImageWebp : result.afterImageWebp
  const srcSet = side === 'before' ? result.beforeImageSrcSet : result.afterImageSrcSet

  if (showPlaceholder || !src) {
    const tone =
      side === 'before'
        ? 'from-[#e8e0d4] via-[#ddd3c4] to-[#cfc3b2]'
        : 'from-[#f3eee6] via-[#ebe3d6] to-[#dfe8dc]'
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br ${tone} px-6 text-center`}
        role="img"
        aria-label={alt}
      >
        <span className="glass-medium rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-espresso">
          {side === 'before' ? 'Before' : 'After'} placeholder
        </span>
        <p className="max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
          Replace with a licensed, matching {side} photograph for {result.treatment}.
        </p>
      </div>
    )
  }

  return (
    <picture>
      {avif ? <source type="image/avif" srcSet={avif} sizes={result.sizes} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} sizes={result.sizes} /> : null}
      <img
        src={src}
        srcSet={srcSet}
        sizes={result.sizes ?? '(max-width: 768px) 100vw, 50vw'}
        alt={alt}
        width={result.width}
        height={result.height}
        loading={loading}
        decoding="async"
        draggable={false}
        className="h-full w-full object-contain object-center"
      />
    </picture>
  )
}

function CompositeResultFrame({
  side,
  result,
  loading,
}: {
  side: 'before' | 'after'
  result: ResultItem
  loading: 'lazy' | 'eager'
}) {
  if (!result.compositeImage) return null

  return (
    <picture className="absolute inset-0 block overflow-hidden">
      {result.compositeImageAvif ? (
        <source type="image/avif" srcSet={result.compositeImageAvif} sizes={result.sizes} />
      ) : null}
      {result.compositeImageWebp ? (
        <source type="image/webp" srcSet={result.compositeImageWebp} sizes={result.sizes} />
      ) : null}
      <img
        src={result.compositeImage}
        srcSet={result.compositeImageSrcSet}
        sizes={result.sizes ?? '(max-width: 768px) 100vw, 50vw'}
        alt={side === 'before' ? result.altBefore : result.altAfter}
        width={result.width}
        height={result.height}
        loading={loading}
        decoding="async"
        draggable={false}
        className="absolute top-0 h-full w-auto max-w-none select-none"
        style={{
          left: side === 'before' ? '0' : '-100%',
        }}
      />
    </picture>
  )
}

interface ResultsGalleryProps {
  results: ResultItem[]
  loading?: 'lazy' | 'eager'
}

export function ResultsGallery({ results, loading = 'lazy' }: ResultsGalleryProps) {
  if (results.length === 0) {
    return (
      <div className="glass-light rounded-[1.5rem] p-8 text-sm text-muted-foreground">
        No verified before-and-after pairs are published yet. Add licensed imagery in MedSpa
        configuration when rights are cleared.
      </div>
    )
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
      {results.map((r) => (
        <BeforeAfterComparison key={r.id} result={r} loading={loading} />
      ))}
    </div>
  )
}
