import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Saved properties, persisted in localStorage so favourites survive a reload.
 * Swap the storage helpers for an API call when accounts exist.
 */

const STORAGE_KEY = 'horizon.saved-properties'

const FavoritesContext = createContext(null)

function readStored() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [slugs, setSlugs] = useState(readStored)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
    } catch {
      /* storage unavailable (private mode) — favourites stay in memory */
    }
  }, [slugs])

  const toggle = useCallback((slug) => {
    setSlugs((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    )
  }, [])

  const remove = useCallback((slug) => {
    setSlugs((current) => current.filter((item) => item !== slug))
  }, [])

  const value = useMemo(
    () => ({
      slugs,
      count: slugs.length,
      toggle,
      remove,
      isFavorite: (slug) => slugs.includes(slug),
    }),
    [slugs, toggle, remove],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider')
  return context
}
