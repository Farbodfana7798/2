import { useEffect, useRef, useState } from 'react'

import Button from '../components/Button'
import { imageSrcSet, imageUrl } from '../lib/images'
import { createScrollScrub } from '../lib/scrollScrub'

/**
 * Hero — scroll-scrubbed walkthrough film.
 *
 * The section is a tall runway (300vh) whose inner viewport is pinned with
 * `position: sticky`. Scrolling that runway scrubs the film: 0% of the scroll
 * maps to the first frame, 100% to the last, in both directions, and the video
 * is never played — see `lib/scrollScrub.js` for the animation mechanics.
 *
 * Only the video timeline is driven from scroll. Nothing here re-renders while
 * the user scrolls: the copy fade and the timeline writes go straight to the DOM
 * through refs, and the `mode` state changes at most twice per page load.
 */

/* The photograph the hero used before the film — shown if the film cannot load. */
const FALLBACK_IMAGE = '1613490493576-7fde63acd811'

/**
 * Two encodes per breakpoint, both tuned for seeking (short keyframe interval,
 * no audio — see `lib/scrollScrub.js`). H.264 is listed first because it is
 * hardware-decoded everywhere; the WebM/VP9 file is the fallback for browsers
 * built without H.264 (some Linux Chromium builds), which would otherwise show
 * the photograph instead of the film.
 */
const SOURCES = {
  desktop: {
    mp4: '/videos/hero-desktop.mp4',
    webm: '/videos/hero-desktop.webm',
    poster: '/images/hero-poster-desktop.jpg',
  },
  mobile: {
    mp4: '/videos/hero-mobile.mp4',
    webm: '/videos/hero-mobile.webm',
    poster: '/images/hero-poster-mobile.jpg',
  },
}

/* Copy has faded out completely by this much of the timeline, drifting up as it goes. */
const COPY_FADE_END = 0.22
const COPY_FADE_SHIFT = 36

/* A file that never arrives at all (dead connection) must not hold the hero
   hostage. Slow-but-progressing loads are left alone: the poster frame and the
   hairline indicator already cover them. */
const STALL_TIMEOUT = 20000

const matches = (query) =>
  typeof window !== 'undefined' && window.matchMedia(query).matches

export default function Hero() {
  const [reduced] = useState(() => matches('(prefers-reduced-motion: reduce)'))
  const [sources] = useState(() =>
    matches('(max-width: 767px)') ? SOURCES.mobile : SOURCES.desktop,
  )

  /* 'static'  reduced motion — still frame, no runway, film never downloaded
     'loading' poster frame + hairline progress, scrubbing disabled
     'ready'   film revealed and scrubbed by scroll
     'error'   film failed — fall back to the photograph */
  const [mode, setMode] = useState(reduced ? 'static' : 'loading')

  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const copyRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (reduced) return undefined

    const video = videoRef.current
    const section = sectionRef.current
    const stage = stageRef.current
    const copy = copyRef.current
    if (!video || !section || !stage || !copy) return undefined

    // React does not reliably set the muted *property*, and some mobile browsers
    // will then refuse to paint frames of a video that is only being seeked.
    video.muted = true
    video.pause()

    const scrub = createScrollScrub({
      section,
      sticky: stage,
      video,
      onProgress: (progress) => {
        const faded = Math.min(progress / COPY_FADE_END, 1)
        copy.style.opacity = String(1 - faded)
        copy.style.transform = `translate3d(0, ${(-faded * COPY_FADE_SHIFT).toFixed(2)}px, 0)`
        // Once it is invisible the copy must leave the tab order and stop
        // catching clicks over the film.
        copy.style.visibility = faded >= 1 ? 'hidden' : 'visible'
      },
    })
    scrub.start()

    let settled = false

    const onCanPlay = () => {
      if (settled) return
      settled = true
      scrub.enable()
      setMode('ready')
    }

    const onFailed = () => {
      if (settled) return
      settled = true
      scrub.destroy()
      setMode('error')
    }

    const onBufferProgress = () => {
      const { buffered } = video
      if (!buffered.length || !fillRef.current) return
      const loaded = buffered.end(buffered.length - 1)
      const total = video.duration || 1
      fillRef.current.style.transform = `scaleX(${Math.min(loaded / total, 1)})`
    }

    // With a <source> chain the browser reports a broken file on the candidate
    // that failed, so the last source is the one that proves nothing worked.
    const lastSource = video.querySelector('source:last-of-type')

    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('error', onFailed)
    video.addEventListener('progress', onBufferProgress)
    lastSource?.addEventListener('error', onFailed)
    onBufferProgress()

    const stallTimer = window.setTimeout(() => {
      if (video.readyState < 1 && !video.buffered.length) onFailed()
    }, STALL_TIMEOUT)

    return () => {
      window.clearTimeout(stallTimer)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('error', onFailed)
      video.removeEventListener('progress', onBufferProgress)
      lastSource?.removeEventListener('error', onFailed)
      scrub.destroy()
    }
  }, [reduced])

  const failed = mode === 'error'

  return (
    <section className={`hero${reduced ? ' hero--static' : ''}`} ref={sectionRef}>
      <div
        className={`hero__stage${reduced ? ' hero__stage--static' : ''}`}
        ref={stageRef}
      >
        <div className="hero__media">
          {failed ? (
            <img
              src={imageUrl(FALLBACK_IMAGE, 1800, 80)}
              srcSet={imageSrcSet(FALLBACK_IMAGE, [1200, 1800, 2400], 80)}
              sizes="100vw"
              alt="Modern villa with an infinity pool and lit interiors at dusk"
              width="1800"
              height="1100"
              loading="eager"
              decoding="async"
            />
          ) : (
            <>
              <img
                className="hero__poster"
                src={sources.poster}
                alt={
                  reduced
                    ? 'A luxury villa, photographed at the start of the walkthrough film'
                    : ''
                }
                width="1600"
                height="900"
                loading="eager"
                decoding="async"
              />
              {!reduced && (
                /* No `src` attribute: the browser walks the source list and takes
                   the first format it can decode. */
                <video
                  ref={videoRef}
                  className={`hero__video${mode === 'ready' ? ' is-ready' : ''}`}
                  preload="auto"
                  muted
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <source src={sources.mp4} type="video/mp4" />
                  <source src={sources.webm} type="video/webm" />
                </video>
              )}
            </>
          )}
        </div>

        <span className="hero__overlay" aria-hidden="true" />
        <span className="hero__scrim" aria-hidden="true" />

        <div className="container hero__inner" ref={copyRef}>
          <h1 className="hero__title">
            <span>Discover Exceptional </span>
            <span>Homes &amp; Investments</span>
          </h1>
          <p className="hero__text">
            Premium properties in prime locations. Find your dream home or the perfect investment
            with confidence.
          </p>
          <div className="hero__actions">
            <Button to="/properties" variant="gold" size="lg" icon="arrowRight">
              Explore Properties
            </Button>
            <Button to="/contact" variant="outlineLight" size="lg">
              Speak to an Advisor
            </Button>
          </div>
        </div>

        {mode === 'loading' && (
          <span className="hero__loader" aria-hidden="true">
            <span className="hero__loader-fill" ref={fillRef} />
          </span>
        )}

        <span className="hero__fade" aria-hidden="true" />
      </div>
    </section>
  )
}
