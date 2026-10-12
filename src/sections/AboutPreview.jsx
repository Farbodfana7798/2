import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { imageUrl } from '../lib/images'
import { stats } from '../data/site'

const MAIN_IMAGE = '1600585154340-be6161a56a0c'
const SIDE_IMAGE = '1600607687939-ce8a6c25118c'

export default function AboutPreview() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <Reveal className="about-copy">
          <span className="eyebrow">About Us</span>
          <h2 className="title-2">Who We Are</h2>
          <p className="body-text">
            At Horizon Properties, we connect people with extraordinary homes and smart investments.
            Integrity, transparency, and client satisfaction are at the heart of everything we do.
          </p>
          <Button to="/about" icon="arrowRight">
            Learn More
          </Button>

          <div className="about-stats">
            {stats.slice(0, 3).map((stat) => (
              <div className="stat" key={stat.label}>
                <span className="stat__value">{stat.value}</span>
                <span className="stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="about-composition" delay={140}>
          <div className="about-composition__frame about-composition__main">
            <img
              src={imageUrl(MAIN_IMAGE, 900)}
              alt="Modern home with a pool and landscaped grounds"
              width="900"
              height="1125"
              loading="lazy"
            />
          </div>
          <div className="about-composition__frame about-composition__side">
            <img
              src={imageUrl(SIDE_IMAGE, 600)}
              alt="Contemporary living space with full-height glazing"
              width="600"
              height="800"
              loading="lazy"
            />
          </div>
          <Link to="/properties" className="icon-btn about-composition__arrow" aria-label="Browse the portfolio">
            <Icon name="arrowUpRight" size={20} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
