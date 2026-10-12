import Button from '../components/Button'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CTASection from '../components/CTASection'
import { imageUrl } from '../lib/images'
import { services } from '../data/site'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="From first valuation to final handshake"
        text="Six services, one team. Every engagement is scoped and priced in writing before we begin."
        image="1600607687920-4e2a09cf159d"
      />

      <section className="section">
        <div className="container">
          {services.map((service, index) => (
            <Reveal
              as="article"
              className={`service-row${index % 2 === 1 ? ' service-row--flip' : ''}`}
              key={service.id}
            >
              <div className="service-row__media" id={service.id}>
                <img
                  src={imageUrl(service.image, 1100)}
                  alt={service.title}
                  width="1100"
                  height="756"
                  loading="lazy"
                />
              </div>

              <div className="service-row__copy">
                <span className="eyebrow">{String(index + 1).padStart(2, '0')} — Service</span>
                <h2 className="title-3">{service.title}</h2>
                <p className="body-text">{service.summary}</p>
                <p className="body-text">{service.body}</p>
                <ul className="check-list" style={{ gridTemplateColumns: '1fr' }}>
                  {service.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
                <Button to="/contact" variant="outline" icon="arrowRight">
                  Enquire about {service.title.toLowerCase()}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure which service you need?"
        text="Tell us what you are trying to achieve and we will tell you honestly whether we can help."
        label="Book a consultation"
      />
    </>
  )
}
