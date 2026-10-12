import { useMemo } from 'react'

import Button from '../components/Button'
import PropertyCarousel from '../components/PropertyCarousel'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { getFeaturedProperties } from '../services/propertyService'

export default function FeaturedProperties() {
  const featured = useMemo(() => getFeaturedProperties(8), [])

  return (
    <section className="section section--soft" id="featured">
      <div className="container">
        <SectionHeading
          eyebrow="Featured"
          title="Featured Properties"
          text="A selection of residences currently represented by Horizon Properties, from lakeside villas to downtown penthouses."
          align="center"
        />
        <PropertyCarousel properties={featured} label="Featured properties" />
        <Reveal className="text-center" style={{ marginTop: '1.5rem' }}>
          <Button to="/properties" variant="outline" icon="arrowRight">
            View all properties
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
