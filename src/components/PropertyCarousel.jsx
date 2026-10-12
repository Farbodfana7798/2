import { useCallback, useEffect, useRef, useState } from 'react'

import Icon from './Icon'
import PropertyCard from './PropertyCard'

/**
 * Scroll-snapping carousel with pointer drag, arrow controls and keyboard support.
 * Native touch scrolling is left to the browser (scroll-snap handles the rest).
 */
export default function PropertyCarousel({
  properties,
  variant = 'overlay',
  label = 'Property carousel',
}) {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })
  const [dragging, setDragging] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateBounds = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    setAtStart(track.scrollLeft <= 2)
    setAtEnd(track.scrollLeft >= max - 2)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    updateBounds()
    track.addEventListener('scroll', updateBounds, { passive: true })
    window.addEventListener('resize', updateBounds)
    return () => {
      track.removeEventListener('scroll', updateBounds)
      window.removeEventListener('resize', updateBounds)
    }
  }, [updateBounds])

  const stepSize = () => {
    const track = trackRef.current
    if (!track) return 320
    const item = track.querySelector('.carousel__item')
    if (!item) return track.clientWidth * 0.8
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 20
    return item.getBoundingClientRect().width + gap
  }

  const scrollByStep = (direction) => {
    trackRef.current?.scrollBy({ left: direction * stepSize(), behavior: 'smooth' })
  }

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    }
    setDragging(true)
    // Keep receiving pointermove once the cursor leaves the track.
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId)
    } catch {
      /* pointer capture unsupported for this event — dragging still works */
    }
  }

  const handlePointerMove = (event) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    const delta = event.clientX - drag.current.startX
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta))
    track.scrollLeft = drag.current.startScroll - delta
  }

  const handlePointerUp = (event) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    drag.current.active = false
    setDragging(false)
    try {
      event?.currentTarget?.releasePointerCapture?.(event.pointerId)
    } catch {
      /* ignore — capture was never taken */
    }
    // Re-enabling scroll-snap lets the browser settle on the nearest card.
    const index = Math.round(track.scrollLeft / stepSize())
    track.scrollTo({ left: index * stepSize(), behavior: 'smooth' })
  }

  const handleClickCapture = (event) => {
    if (drag.current.moved > 6) {
      event.preventDefault()
      event.stopPropagation()
    }
    drag.current.moved = 0
  }

  const handleKeyDown = (event) => {
    if (event.target !== trackRef.current) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByStep(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByStep(-1)
    }
  }

  if (!properties?.length) return null

  return (
    <div className="carousel">
      <div
        ref={trackRef}
        className={`carousel__track${dragging ? ' is-dragging' : ''}`}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClickCapture={handleClickCapture}
        onKeyDown={handleKeyDown}
      >
        {properties.map((property, index) => (
          <div className="carousel__item" key={property.slug}>
            <PropertyCard property={property} variant={variant} priority={index < 3} />
          </div>
        ))}
      </div>

      <div className="carousel__controls">
        <button
          type="button"
          className="icon-btn"
          onClick={() => scrollByStep(-1)}
          disabled={atStart}
          aria-label="Previous properties"
        >
          <Icon name="arrowLeft" size={18} />
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={() => scrollByStep(1)}
          disabled={atEnd}
          aria-label="Next properties"
        >
          <Icon name="arrowRight" size={18} />
        </button>
      </div>
    </div>
  )
}
