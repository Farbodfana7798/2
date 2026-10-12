/**
 * Scroll-scrubbed video engine.
 *
 * Maps scroll position onto a video *timeline* position: the film is never
 * played, only seeked (`video.currentTime`). Scrolling forward walks through the
 * scene, scrolling back walks it in reverse, and when the user stops the picture
 * stops on that exact frame. Nothing here ever calls `play()`, so the video
 * cannot drift on its own.
 *
 * Why it is built this way
 * ------------------------
 * - Scroll handlers stay trivial: they only "wake" the loop. Layout reads and
 *   the resulting writes happen inside the same requestAnimationFrame callback,
 *   so the browser never paints a half-updated frame and no layout is forced
 *   inside an event storm.
 * - The time that gets written is interpolated towards the target time
 *   (`shown += (target - shown) * SMOOTHING`) instead of jumping straight to it.
 *   That removes the harsh stepping of raw `scroll -> currentTime = x`, while a
 *   high smoothing factor keeps the picture visibly glued to the scrollbar.
 * - `SEEK_EPSILON` suppresses pointless seeks: a new currentTime is only written
 *   when the picture would move by at least half a source frame, so a slow,
 *   long scroll does not fire hundreds of redundant seeks per second.
 * - The loop stops the moment it has settled, so an idle hero costs nothing.
 *
 * The playback medium matters as much as this code: seeking is only cheap when
 * the file has short keyframe intervals. The shipped hero files are H.264 /
 * yuv420p, a keyframe every 10 frames, no B-frames, no audio track and the moov
 * atom first:
 *
 *   ffmpeg -i source.mp4 -an -vf scale=1600:-2 \
 *     -c:v libx264 -preset slow -crf 20 -profile:v high -pix_fmt yuv420p \
 *     -g 10 -keyint_min 10 -sc_threshold 0 -bf 0 -movflags +faststart hero.mp4
 *
 * so any random seek is answered by decoding at most ten frames. A WebM/VP9
 * alternative is deliberately *not* shipped: seeking it means software-decoding
 * a whole keyframe interval per scrub step, which costs more than it saves and
 * would make the interaction less smooth, while H.264 is supported everywhere.
 * Keep those flags if the footage is ever replaced (and keep the resolution
 * sane — 1600x900 desktop, 960x540 mobile is plenty once the film is cropped by
 * `object-fit: cover`).
 */

const SMOOTHING = 0.18
/** Remaining time (s) considered "settled" — the loop then snaps and stops. */
const SETTLE_EPSILON = 0.004
/** Half a source frame at 30fps: finer than the video's own grid, no skips. */
const SEEK_EPSILON = 1 / 60
/** Keeping the written time just short of `duration` avoids an `ended` state. */
const TAIL = 0.001

const clamp = (value, min, max) => (value < min ? min : value > max ? max : value)
const isFiniteDuration = (value) => typeof value === 'number' && Number.isFinite(value) && value > 0

/**
 * @param {object} options
 * @param {HTMLElement} options.section  the tall scroll runway
 * @param {HTMLElement} options.sticky   the pinned 100vh viewport inside it
 * @param {HTMLVideoElement} options.video
 * @param {(progress: number) => void} [options.onProgress] called with 0..1
 * @returns {{ start(): void, enable(): void, wake(): void, destroy(): void }}
 */
export function createScrollScrub({ section, sticky, video, onProgress }) {
  let duration = 0
  let travel = 1
  let targetTime = 0
  let shownTime = 0
  let lastSeekTime = Number.NaN
  let lastProgress = -1
  let frameId = 0
  let running = false
  let enabled = false
  let destroyed = false

  /** Distance the user can scroll while the viewport stays pinned. */
  function measure() {
    if (destroyed) return
    const runway = section.getBoundingClientRect().height
    const viewport = sticky.getBoundingClientRect().height
    travel = Math.max(1, runway - viewport)
  }

  function seek(time) {
    lastSeekTime = time
    video.currentTime = clamp(time, 0, Math.max(0, duration - TAIL))
  }

  function frame() {
    const progress = clamp(-section.getBoundingClientRect().top / travel, 0, 1)

    if (enabled) {
      targetTime = progress * duration
      const delta = targetTime - shownTime

      if (Math.abs(delta) > SETTLE_EPSILON) {
        shownTime += delta * SMOOTHING
      } else {
        // Close enough to the scroll position: land on it exactly and idle.
        shownTime = targetTime
        running = false
      }

      if (!(Math.abs(shownTime - lastSeekTime) < SEEK_EPSILON)) seek(shownTime)
    } else {
      running = false
    }

    if (Math.abs(progress - lastProgress) > 0.0002) {
      lastProgress = progress
      onProgress?.(progress)
    }

    if (running) frameId = requestAnimationFrame(frame)
  }

  function wake() {
    if (destroyed || running) return
    running = true
    frameId = requestAnimationFrame(frame)
  }

  const onResize = () => {
    measure()
    wake()
  }

  window.addEventListener('scroll', wake, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('orientationchange', onResize, { passive: true })

  const observer =
    typeof ResizeObserver === 'function' ? new ResizeObserver(onResize) : null
  observer?.observe(section)
  observer?.observe(sticky)

  return {
    /** Measure, publish the starting progress and draw the first frame. */
    start() {
      measure()
      wake()
    },

    /** Video data has arrived: start mapping scroll position onto the timeline. */
    enable() {
      if (enabled || destroyed || !isFiniteDuration(video.duration)) return
      duration = video.duration
      enabled = true
      shownTime = clamp(shownTime, 0, duration)
      lastSeekTime = Number.NaN
      wake()
    },

    wake,

    destroy() {
      destroyed = true
      running = false
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', wake)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      observer?.disconnect()
    },
  }
}
