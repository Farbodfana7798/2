import { useEffect, useRef, useState } from 'react'

import Icon from './Icon'
import { imageSrcSet, imageUrl } from '../lib/images'

/** Property gallery: large image, thumbnails and a full-screen viewer. */
export default function Gallery({ images, name }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)
  const current = images[index]

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') setIndex((value) => (value + 1) % images.length)
      if (event.key === 'ArrowLeft') setIndex((value) => (value - 1 + images.length) % images.length)
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, images.length])

  const step = (direction) => setIndex((value) => (value + direction + images.length) % images.length)

  return (
    <div className="gallery">
      <figure className="gallery__main">
        <img
          src={imageUrl(current.id, 1400)}
          srcSet={imageSrcSet(current.id, [800, 1200, 1600])}
          sizes="(max-width: 1023px) 100vw, 60vw"
          alt={`${name} — ${current.alt}`}
          width="1400"
          height="875"
        />
        <button type="button" className="gallery__expand" onClick={() => setOpen(true)}>
          <Icon name="expand" size={16} />
          View gallery
        </button>
      </figure>

      <div className="gallery__thumbs" role="group" aria-label={`${name} photos`}>
        {images.map((image, position) => (
          <button
            key={image.id}
            type="button"
            className={`gallery__thumb${position === index ? ' is-active' : ''}`}
            onClick={() => setIndex(position)}
            aria-label={`Show photo ${position + 1} of ${images.length}`}
            aria-current={position === index}
          >
            <img src={imageUrl(image.id, 320)} alt="" width="320" height="320" loading="lazy" />
          </button>
        ))}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} image viewer`}>
          <div className="lightbox__bar">
            <span>
              {index + 1} / {images.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="icon-btn icon-btn--light"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          <div className="lightbox__stage">
            <img src={imageUrl(current.id, 1600)} alt={`${name} — ${current.alt}`} />
            <button
              type="button"
              className="icon-btn icon-btn--light lightbox__nav lightbox__nav--prev"
              onClick={() => step(-1)}
              aria-label="Previous photo"
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--light lightbox__nav lightbox__nav--next"
              onClick={() => step(1)}
              aria-label="Next photo"
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
