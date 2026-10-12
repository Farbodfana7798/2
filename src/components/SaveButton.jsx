import Icon from './Icon'
import { useFavorites } from '../context/FavoritesContext'

/** Heart toggle shown on property cards and detail pages. */
export default function SaveButton({ slug, name, className = '', size = 17, variant = 'icon' }) {
  const { isFavorite, toggle } = useFavorites()
  const saved = isFavorite(slug)

  return (
    <button
      type="button"
      className={`pcard__save${saved ? ' is-saved' : ''} ${className}`.trim()}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved properties` : `Save ${name} to your list`}
      title={saved ? 'Remove from saved' : 'Save property'}
      data-testid={`save-${slug}`}
      data-variant={variant}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle(slug)
      }}
    >
      <Icon name="heart" size={size} filled={saved} />
    </button>
  )
}
