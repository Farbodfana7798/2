/** Formatting helpers shared by cards, filters and detail pages. */

/** 2350000 -> "$2.35 Million" (marketing style used on cards and hero stats). */
export function formatPrice(value) {
  if (value >= 1000000) {
    const millions = value / 1000000
    const digits = Number.isInteger(millions * 100) ? 2 : 2
    return `$${millions.toFixed(digits).replace(/\.00$/, '')} Million`
  }
  if (value >= 1000) return `$${Math.round(value / 1000)}K`
  return `$${value}`
}

/** 2350000 -> "$2,350,000" */
export function formatFullPrice(value) {
  return `$${value.toLocaleString('en-US')}`
}

export function formatNumber(value) {
  return value.toLocaleString('en-US')
}

/** Filter labels for the price ranges offered on the properties page. */
export const PRICE_RANGES = [
  { value: 'any', label: 'Any price', min: 0, max: Infinity },
  { value: '0-2', label: 'Under $2M', min: 0, max: 2000000 },
  { value: '2-4', label: '$2M – $4M', min: 2000000, max: 4000000 },
  { value: '4-6', label: '$4M – $6M', min: 4000000, max: 6000000 },
  { value: '6+', label: '$6M+', min: 6000000, max: Infinity },
]

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'beds-desc', label: 'Most bedrooms' },
  { value: 'sqft-desc', label: 'Largest first' },
]
