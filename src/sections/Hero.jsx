import Button from '../components/Button'
import { imageSrcSet, imageUrl } from '../lib/images'

const HERO_IMAGE = '1613490493576-7fde63acd811'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <img
          src={imageUrl(HERO_IMAGE, 1800, 80)}
          srcSet={imageSrcSet(HERO_IMAGE, [1200, 1800, 2400], 80)}
          sizes="100vw"
          alt="Modern villa with an infinity pool and lit interiors at dusk"
          width="1800"
          height="1100"
          loading="eager"
          decoding="async"
        />
      </div>
      <span className="hero__overlay" aria-hidden="true" />
      <span className="hero__fade" aria-hidden="true" />

      <div className="container hero__inner">
        <h1 className="hero__title">
          <span>Discover Exceptional </span>
          <span>Homes &amp; Investments</span>
        </h1>
        <p className="hero__text">
          Premium properties in prime locations. Find your dream home or the perfect investment with
          confidence.
        </p>
        <div className="hero__actions">
          <Button to="/properties" variant="gold" size="lg" icon="arrowRight">
            Explore Properties
          </Button>
          <Button to="/contact" variant="outlineLight" size="lg">
            Speak to an Advisor
          </Button>
        </div>
      </div>
    </section>
  )
}
