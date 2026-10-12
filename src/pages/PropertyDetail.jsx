import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import AgentCard from '../components/AgentCard'
import Button from '../components/Button'
import Gallery from '../components/Gallery'
import Icon from '../components/Icon'
import InquiryForm from '../components/InquiryForm'
import MobileCTA from '../components/MobileCTA'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import SaveButton from '../components/SaveButton'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import { formatNumber, formatPrice } from '../lib/format'
import { getAgentById } from '../data/site'
import { getPropertyBySlug, getSimilarProperties } from '../services/propertyService'
import NotFound from './NotFound'

const viewingFields = [
  { name: 'name', label: 'Full name', required: true, width: 'half', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, width: 'half', autoComplete: 'email' },
  { name: 'date', label: 'Preferred date', type: 'date', required: true, width: 'half' },
  { name: 'time', label: 'Preferred time', type: 'time', required: true, width: 'half' },
  {
    name: 'message',
    label: 'Notes (optional)',
    type: 'textarea',
    placeholder: 'Anything we should know before the viewing?',
  },
]

const agentFields = [
  { name: 'name', label: 'Full name', required: true, width: 'half', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, width: 'half', autoComplete: 'email' },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', width: 'half', autoComplete: 'tel' },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'I would like to arrange a viewing…',
  },
]

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)
  const similar = useMemo(() => getSimilarProperties(property, 3), [property])

  if (!property) {
    return <NotFound />
  }

  const agent = getAgentById(property.agentId)
  const specs = [
    { icon: 'bed', value: `${property.beds}`, label: 'Bedrooms' },
    { icon: 'bath', value: `${property.baths}`, label: 'Bathrooms' },
    { icon: 'ruler', value: `${formatNumber(property.sqft)} sq ft`, label: 'Internal area' },
    { icon: 'layers', value: property.lot, label: 'Plot' },
    { icon: 'calendar', value: `${property.year}`, label: 'Built' },
    { icon: 'building', value: property.type, label: 'Property type' },
  ]

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/properties">Properties</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{property.name}</span>
          </nav>

          <div className="detail-hero__head">
            <div>
              <span className="eyebrow eyebrow--on-dark">
                {property.type} · {property.status}
              </span>
              <h1 className="detail-hero__title">{property.name}</h1>
              <p className="detail-hero__location">
                <Icon name="pin" size={15} />
                {property.location}
              </p>
            </div>
            <p className="detail-hero__price">
              <span>Guide price</span>
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="detail-hero__meta">
            <span>
              <Icon name="bed" size={16} />
              {property.beds} bedrooms
            </span>
            <span>
              <Icon name="bath" size={16} />
              {property.baths} bathrooms
            </span>
            <span>
              <Icon name="ruler" size={16} />
              {formatNumber(property.sqft)} sq ft
            </span>
            <span>
              <Icon name="calendar" size={16} />
              Built {property.year}
            </span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container detail-layout">
          <div>
            <Gallery images={property.images} name={property.name} />

            <div className="detail-block" style={{ marginTop: '2.5rem' }}>
              <h2 className="detail-block__title">About this property</h2>
              <p className="body-text">{property.description}</p>

              <h3 className="title-4" style={{ marginTop: '1.75rem' }}>
                Key features
              </h3>
              <ul className="check-list" style={{ marginTop: '0.9rem' }}>
                {property.highlights.map((highlight) => (
                  <li key={highlight}>
                    <Icon name="check" size={16} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2 className="detail-block__title">Amenities</h2>
              <div className="amenities">
                {property.amenities.map((amenity) => (
                  <span className="chip" key={amenity}>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-block">
              <h2 className="detail-block__title">Schedule a viewing</h2>
              <p className="body-text" style={{ marginBottom: '1.25rem' }}>
                Viewings are accompanied by the listing agent and can usually be arranged within 48
                hours.
              </p>
              <InquiryForm
                fields={viewingFields}
                idPrefix="viewing"
                submitLabel="Request viewing"
                source={`viewing:${property.slug}`}
                successMessage="Your viewing request has been received — we will confirm the time by email shortly."
              />
            </div>
          </div>

          <aside className="detail-side">
            <div className="panel" id="contact-agent">
              <div className="panel__head">
                <h2 className="panel__title">Interested in this residence?</h2>
              </div>
              <AgentCard agent={agent} />
              <div style={{ marginTop: '1.25rem' }}>
                <InquiryForm
                  fields={agentFields}
                  idPrefix="agent"
                  submitLabel="Contact agent"
                  source={`agent:${property.slug}`}
                  successMessage={`${agent.name} has received your enquiry and will reply within one working day.`}
                />
              </div>
            </div>

            <div className="panel panel--soft">
              <div className="panel__head">
                <h2 className="panel__title">Save this home</h2>
                <SaveButton slug={property.slug} name={property.name} />
              </div>
              <p className="form__note">
                Add {property.name} to your list and compare it with other residences later.
              </p>
              <Button to="/favorites" variant="outline" block icon="arrowRight" style={{ marginTop: '1rem' }}>
                View saved properties
              </Button>
            </div>

            <div className="panel">
              <h2 className="panel__title">Property details</h2>
              <div className="specs">
                {specs.map((spec) => (
                  <div className="spec" key={spec.label}>
                    <Icon name={spec.icon} size={20} />
                    <div>
                      <div className="spec__value">{spec.value}</div>
                      <div className="spec__label">{spec.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <SectionHeading
              eyebrow="Similar"
              title="Properties you may also like"
              text="Hand-picked by the agent representing this residence."
              align="center"
            />
            <div className="property-grid">
              {similar.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70}>
                  <PropertyCard property={item} variant="stacked" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <MobileCTA property={property} />
    </>
  )
}
