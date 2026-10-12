import Icon from './Icon'

/**
 * Filter bar for the properties page. Purely controlled — the page owns the
 * filter state (and mirrors it into the URL query string).
 */
export default function SearchFilters({ filters, options, onChange, onReset, resultCount }) {
  const set = (key) => (event) => onChange(key, event.target.value)

  return (
    <form className="filters" role="search" onSubmit={(event) => event.preventDefault()}>
      <div className="filters__row">
        <div className="field">
          <label className="sr-only" htmlFor="filter-query">
            Search properties
          </label>
          <span className="search-field">
            <Icon name="search" size={18} />
            <input
              id="filter-query"
              className="input"
              type="search"
              name="query"
              placeholder="Search by name, city or type…"
              value={filters.query}
              onChange={set('query')}
            />
          </span>
        </div>

        <div className="field">
          <label className="sr-only" htmlFor="filter-sort">
            Sort results
          </label>
          <select id="filter-sort" className="select" value={filters.sort} onChange={set('sort')}>
            {options.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filters__row filters__row--fields">
        <div className="field">
          <label className="sr-only" htmlFor="filter-location">
            Location
          </label>
          <select
            id="filter-location"
            className="select"
            value={filters.location}
            onChange={set('location')}
          >
            <option value="any">All locations</option>
            {options.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="sr-only" htmlFor="filter-type">
            Property type
          </label>
          <select id="filter-type" className="select" value={filters.type} onChange={set('type')}>
            <option value="any">All types</option>
            {options.types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="sr-only" htmlFor="filter-price">
            Price range
          </label>
          <select
            id="filter-price"
            className="select"
            value={filters.priceRange}
            onChange={set('priceRange')}
          >
            {options.priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="sr-only" htmlFor="filter-beds">
            Minimum bedrooms
          </label>
          <select id="filter-beds" className="select" value={filters.beds} onChange={set('beds')}>
            <option value="any">Any beds</option>
            {options.bedroomOptions.map((count) => (
              <option key={count} value={count}>
                {count}+ beds
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="sr-only" htmlFor="filter-baths">
            Minimum bathrooms
          </label>
          <select id="filter-baths" className="select" value={filters.baths} onChange={set('baths')}>
            <option value="any">Any baths</option>
            {options.bathroomOptions.map((count) => (
              <option key={count} value={count}>
                {count}+ baths
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="filters__reset" onClick={onReset}>
          Reset
        </button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'property' : 'properties'} match your filters.
      </p>
    </form>
  )
}
