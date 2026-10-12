import { useEffect } from 'react'

import Button from './Button'
import Icon from './Icon'
import { useFavorites } from '../context/FavoritesContext'

/** Sticky contact bar for the property detail page on small screens. */
export default function MobileCTA({ property }) {
  const { isFavorite, toggle } = useFavorites()
  const saved = isFavorite(property.slug)

  useEffect(() => {
    document.body.classList.add('has-mobile-cta')
    return () => document.body.classList.remove('has-mobile-cta')
  }, [])

  return (
    <div className="mobile-cta">
      <Button href="#contact-agent" block icon="arrowRight">
        Contact agent
      </Button>
      <button
        type="button"
        className={`button button--outline mobile-cta__save${saved ? ' is-saved' : ''}`}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${property.name} from saved` : `Save ${property.name}`}
        onClick={() => toggle(property.slug)}
      >
        <Icon name="heart" size={18} filled={saved} />
      </button>
    </div>
  )
}
