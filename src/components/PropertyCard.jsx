import { Link } from 'react-router-dom'

import Icon from './Icon'
import SaveButton from './SaveButton'
import { imageSrcSet, imageUrl } from '../lib/images'
import { formatNumber, formatPrice } from '../lib/format'

/**
 * Reusable property card.
 *
 * variant="overlay"  photography-first card with the details over the image
 *                    (used in the featured carousel)
 * variant="stacked"  image with the details below it (used in filter grids)
 */
export default function PropertyCard({
  property,
  variant = 'stacked',
  sizes,
  priority = false,
  className = '',
}) {
  const href = `/properties/${property.slug}`
  const cover = property.images[0]
  const overlay = variant === 'overlay'
  const imageSizes =
    sizes ?? (overlay ? '(max-width: 767px) 72vw, 366px' : '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw')

  return (
    <article className={`pcard pcard--${overlay ? 'overlay' : 'stacked'} ${className}`.trim()}>
      <div className="pcard__media">
        <Link
          className="pcard__media-link"
          to={href}
          tabIndex={overlay ? undefined : -1}
          aria-hidden={overlay ? undefined : 'true'}
        >
          <img
            className="pcard__img"
            src={imageUrl(cover.id, 800)}
            srcSet={imageSrcSet(cover.id)}
            sizes={imageSizes}
            alt={cover.alt}
            width="800"
            height="1000"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
          />
          <span className="pcard__scrim" />
          <span className="pcard__tags">
            <span className="badge badge--dark">{property.type}</span>
          </span>

          {overlay && (
            <div className="pcard__body">
              <div>
                <h3 className="pcard__name">{property.name}</h3>
                <span className="pcard__location">
                  <Icon name="pin" size={14} />
                  {property.location}
                </span>
              </div>
              <span className="pcard__price">{formatPrice(property.price)}</span>
            </div>
          )}
        </Link>

        <SaveButton slug={property.slug} name={property.name} />
      </div>

      {!overlay && (
        <div className="pcard__details">
          <div className="pcard__head">
            <div>
              <h3 className="pcard__name">
                <Link to={href}>{property.name}</Link>
              </h3>
              <span className="pcard__location">
                <Icon name="pin" size={14} />
                {property.location}
              </span>
            </div>
            <span className="pcard__price">{formatPrice(property.price)}</span>
          </div>
          <div className="pcard__meta">
            <span>
              <Icon name="bed" size={15} />
              {property.beds} bed
            </span>
            <span>
              <Icon name="bath" size={15} />
              {property.baths} bath
            </span>
            <span>
              <Icon name="ruler" size={15} />
              {formatNumber(property.sqft)} sq ft
            </span>
          </div>
        </div>
      )}
    </article>
  )
}
