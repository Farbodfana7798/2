import { useMemo } from 'react'

import Button from '../components/Button'
import PageHero from '../components/PageHero'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import CTASection from '../components/CTASection'
import { useFavorites } from '../context/FavoritesContext'
import { getAllProperties } from '../services/propertyService'

export default function Favorites() {
  const { slugs } = useFavorites()

  const saved = useMemo(
    () => getAllProperties().filter((property) => slugs.includes(property.slug)),
    [slugs],
  )

  return (
    <>
      <PageHero
        eyebrow="Saved"
        title="Your saved properties"
        text="Residences you have shortlisted. Your list stays on this device until you clear it."
      />

      <section className="section">
        <div className="container">
          {saved.length > 0 ? (
            <>
              <div className="results-bar">
                <p>
                  <strong>{saved.length}</strong> {saved.length === 1 ? 'residence' : 'residences'} saved
                </p>
                <p>Speak to an advisor to arrange viewings back to back.</p>
              </div>
              <div className="property-grid">
                {saved.map((property, index) => (
                  <Reveal key={property.slug} delay={(index % 3) * 70}>
                    <PropertyCard property={property} variant="stacked" />
                  </Reveal>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h2 className="title-3">You have not saved any properties yet</h2>
              <p className="body-text">
                Tap the heart on any residence to shortlist it. Your saved list appears here, on every
                page.
              </p>
              <Button to="/properties" icon="arrowRight">
                Browse properties
              </Button>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Shortlisted something?"
        text="Send us your list and we will arrange the viewings around your week."
        label="Arrange viewings"
      />
    </>
  )
}
