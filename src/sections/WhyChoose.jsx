import Button from '../components/Button'
import Reveal from '../components/Reveal'
import { imageUrl } from '../lib/images'
import { whyChoose } from '../data/site'

const IMAGE = '1600121848594-d8644e57abab'

export default function WhyChoose() {
  return (
    <section className="section section--ivory" id="why-horizon">
      <div className="container why-grid">
        <Reveal>
          <span className="eyebrow">Why Horizon</span>
          <h2 className="title-2" style={{ marginTop: '0.85rem' }}>
            Representation that holds up to scrutiny
          </h2>
          <p className="body-text" style={{ marginTop: '1rem' }}>
            Eighteen years of advice across Texas and the West Coast, and a practice built on saying
            the difficult thing early.
          </p>

          <ul className="why-list" style={{ marginTop: '2rem' }}>
            {whyChoose.map((item, index) => (
              <li className="why-item" key={item.title}>
                <span className="why-item__index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="title-4">{item.title}</h3>
                  <p className="why-item__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Button to="/contact" variant="outline" icon="arrowRight" style={{ marginTop: '2rem' }}>
            Talk to an advisor
          </Button>
        </Reveal>

        <Reveal className="why-media" delay={140}>
          <img
            src={imageUrl(IMAGE, 1000)}
            alt="Bedroom opening onto a terrace with countryside views"
            width="1000"
            height="1250"
            loading="lazy"
          />
          <div className="why-badge">
            <span className="why-badge__value">1,240</span>
            <span className="why-badge__label">Homes placed since 2007</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
