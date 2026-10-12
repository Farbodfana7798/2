import { Link } from 'react-router-dom'

import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { imageUrl } from '../lib/images'
import { services } from '../data/site'

export default function ServicesPreview() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="How we work with you"
          text="Buying, selling or investing — every engagement is led by a director and priced in writing."
          actions={
            <Link className="button button--outline" to="/services">
              All services
              <Icon name="arrowRight" size={17} className="button__icon button__icon--trail" />
            </Link>
          }
        />

        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal as="article" className="service-card" delay={index * 70} key={service.id}>
              <div className="service-card__media">
                <img
                  src={imageUrl(service.image, 800)}
                  alt={service.title}
                  width="800"
                  height="533"
                  loading="lazy"
                />
              </div>
              <div className="service-card__body">
                <span className="service-card__index">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="title-4">{service.title}</h3>
                <p className="service-card__text">{service.summary}</p>
                <Link className="service-card__link" to={`/services#${service.id}`}>
                  Explore
                  <Icon name="arrowRight" size={15} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
