import Button from '../components/Button'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import TeamPreview from '../sections/TeamPreview'
import { imageUrl } from '../lib/images'
import { stats, values } from '../data/site'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A boutique agency for architectural homes"
        text="Horizon Properties represents a small number of residences each year, and gets to know every one of them properly."
        image="1568605114967-8130f3a36994"
      />

      <section className="section">
        <div className="container story-grid">
          <Reveal className="story-copy">
            <span className="eyebrow">Who We Are</span>
            <h2 className="title-2">
              Eighteen years of quiet, careful representation
            </h2>
            <p className="body-text">
              At Horizon Properties, we connect people with extraordinary homes and smart investments.
              Integrity, transparency, and client satisfaction are at the heart of everything we do.
            </p>
            <p className="body-text">
              We started in Austin in 2007 with three listings and one rule: never recommend a home we
              would not live in ourselves. That rule still governs how we take instructions, how we
              price a residence and how we advise investors on yield.
            </p>
            <p className="body-text">
              Today the team works across Texas, California, Colorado and Nevada, from lakeside villas
              and hillside retreats to downtown penthouses — always with a director personally
              accountable for the outcome.
            </p>
            <Button to="/properties" icon="arrowRight">
              Browse the portfolio
            </Button>
          </Reveal>

          <Reveal className="story-media" delay={140}>
            <img
              src={imageUrl('1560448204-e02f11c3d0e2', 1100)}
              alt="Open-plan living and dining area opening to a landscaped garden"
              width="1100"
              height="880"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Our Values"
            title="What we hold ourselves to"
            text="The three commitments our clients tell us made the difference."
            align="center"
          />
          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal className="value-card" key={value.title} delay={index * 80}>
                <span className="value-card__icon" aria-hidden="true">
                  <Icon name={value.icon} size={20} />
                </span>
                <h3 className="title-4">{value.title}</h3>
                <p className="service-card__text">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container stats-band">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat__value">{stat.value}</span>
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <TeamPreview />

      <CTASection
        title="Come and see a property with us"
        text="No obligation, no pressure — just an honest opinion on the residence and the market."
        label="Arrange a viewing"
      />
    </>
  )
}
