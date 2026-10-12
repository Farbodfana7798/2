/**
 * Image helpers.
 *
 * Property photography is served from Unsplash's image CDN so the demo ships with
 * consistent, high-end architectural imagery and no binary assets in the repo.
 * Only the photo id is stored in the data layer, so swapping in your own CDN or
 * a local `/public/images` folder later means changing this file alone.
 */

const CDN = 'https://images.unsplash.com/photo-'

export function imageUrl(id, width = 1200, quality = 78) {
  return `${CDN}${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

const DEFAULT_WIDTHS = [480, 800, 1200, 1600]

export function imageSrcSet(id, widths = DEFAULT_WIDTHS, quality = 78) {
  return widths.map((w) => `${imageUrl(id, w, quality)} ${w}w`).join(', ')
}
