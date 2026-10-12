import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import PageHero from '../components/PageHero'
import SearchFilters from '../components/SearchFilters'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import CTASection from '../components/CTASection'
import { getAllProperties, getFilterOptions, searchProperties } from '../services/propertyService'

/** Filter key -> URL query parameter. */
const PARAM = {
  query: 'q',
  location: 'location',
  type: 'type',
  priceRange: 'price',
  beds: 'beds',
  baths: 'baths',
  sort: 'sort',
}

const DEFAULTS = {
  query: '',
  location: 'any',
  type: 'any',
  priceRange: 'any',
  beds: 'any',
  baths: 'any',
  sort: 'featured',
}

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams()
  const options = useMemo(() => getFilterOptions(), [])
  const total = useMemo(() => getAllProperties().length, [])

  const paramsKey = searchParams.toString()
  const filters = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(PARAM).map(([key, param]) => [key, searchParams.get(param) ?? DEFAULTS[key]]),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paramsKey],
  )

  const results = useMemo(() => searchProperties(filters), [filters])

  const handleChange = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === DEFAULTS[key]) next.delete(PARAM[key])
    else next.set(PARAM[key], value)
    setSearchParams(next, { replace: true })
  }

  const handleReset = () => setSearchParams(new URLSearchParams(), { replace: true })

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Find your next address"
        text="Ten residences currently represented by Horizon Properties. Filter by location, type, price and size."
        image="1512917774080-9991f1c4c750"
      />

      <div className="container filters-overlap">
        <SearchFilters
          filters={filters}
          options={options}
          onChange={handleChange}
          onReset={handleReset}
          resultCount={results.length}
        />
      </div>

      <section className="section">
        <div className="container">
          <div className="results-bar">
            <p>
              Showing <strong>{results.length}</strong> of {total} residences
            </p>
            <p>Every listing is visited and photographed by a director.</p>
          </div>

          {results.length > 0 ? (
            <div className="property-grid">
              {results.map((property, index) => (
                <Reveal key={property.slug} delay={(index % 3) * 70}>
                  <PropertyCard property={property} variant="stacked" />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2 className="title-3">No properties match those filters</h2>
              <p className="body-text">
                Try widening the price range or clearing the location filter — or tell us what you
                are looking for and we will search off-market.
              </p>
              <div className="button-row">
                <Button onClick={handleReset}>Clear filters</Button>
                <Button to="/contact" variant="outline">
                  Tell us what you need
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Not seeing the right home?"
        text="Register your requirements and we will bring suitable properties to you first — including off-market listings."
        label="Register interest"
      />
    </>
  )
}
