/**
 * Property service — the only module that reads the catalogue.
 *
 * Today it resolves against the local data module. To move to a database or an
 * HTTP API, replace the bodies below with `fetch` calls: every consumer already
 * treats the return values as plain data, and `submitInquiry` is already async.
 */

import { properties, PROPERTY_LOCATIONS, PROPERTY_TYPES } from '../data/properties'
import { PRICE_RANGES, SORT_OPTIONS } from '../lib/format'

export function getFilterOptions() {
  return {
    locations: PROPERTY_LOCATIONS,
    types: PROPERTY_TYPES,
    priceRanges: PRICE_RANGES,
    sortOptions: SORT_OPTIONS,
    bedroomOptions: [1, 2, 3, 4, 5],
    bathroomOptions: [1, 2, 3, 4, 5],
  }
}

export function getAllProperties() {
  return properties
}

export function getFeaturedProperties(limit = 6) {
  const featured = properties.filter((property) => property.featured)
  return (featured.length ? featured : properties).slice(0, limit)
}

export function getPropertyBySlug(slug) {
  return properties.find((property) => property.slug === slug) ?? null
}

export function getSimilarProperties(property, limit = 3) {
  if (!property) return []
  const sameCity = properties.filter(
    (candidate) => candidate.slug !== property.slug && candidate.city === property.city,
  )
  const sameType = properties.filter(
    (candidate) =>
      candidate.slug !== property.slug &&
      candidate.type === property.type &&
      candidate.city !== property.city,
  )
  const fallback = properties.filter((candidate) => candidate.slug !== property.slug)
  const merged = [...sameCity, ...sameType, ...fallback]
  return merged.filter((item, index) => merged.indexOf(item) === index).slice(0, limit)
}

/**
 * Filtering + sorting for the properties page.
 * `filters.location` matches the state, `filters.query` matches name, city or type.
 */
export function searchProperties(filters = {}) {
  const {
    query = '',
    location = 'any',
    type = 'any',
    priceRange = 'any',
    beds = 'any',
    baths = 'any',
    sort = 'featured',
  } = filters

  const range = PRICE_RANGES.find((option) => option.value === priceRange) ?? PRICE_RANGES[0]
  const term = query.trim().toLowerCase()

  const results = properties.filter((property) => {
    if (term) {
      const haystack = [
        property.name,
        property.city,
        property.state,
        property.type,
        property.location,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(term)) return false
    }
    if (location !== 'any' && property.state !== location) return false
    if (type !== 'any' && property.type !== type) return false
    if (property.price < range.min || property.price >= range.max) return false
    if (beds !== 'any' && property.beds < Number(beds)) return false
    if (baths !== 'any' && property.baths < Number(baths)) return false
    return true
  })

  const sorted = [...results]
  switch (sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'beds-desc':
      sorted.sort((a, b) => b.beds - a.beds)
      break
    case 'sqft-desc':
      sorted.sort((a, b) => b.sqft - a.sqft)
      break
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
  }
  return sorted
}

/**
 * Inquiry submission (contact agent, schedule a viewing, newsletter).
 *
 * No email or CRM provider is configured for this project yet, so the call is
 * resolved locally after validating the payload. Wire the real provider here —
 * e.g. `POST /api/inquiries` — and the UI needs no changes.
 */
export async function submitInquiry(payload) {
  if (!payload || !payload.email) {
    throw new Error('An email address is required.')
  }
  return { ok: true, receivedAt: new Date().toISOString() }
}
