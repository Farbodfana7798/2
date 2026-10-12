import { Link } from 'react-router-dom'

import Button from '../components/Button'
import Icon from '../components/Icon'
import InquiryForm from '../components/InquiryForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { contact, services } from '../data/site'

const contactFields = [
  { name: 'name', label: 'Full name', required: true, width: 'half', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, width: 'half', autoComplete: 'email' },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', width: 'half', autoComplete: 'tel' },
  {
    name: 'interest',
    label: 'How can we help?',
    type: 'select',
    width: 'half',
    options: [
      { value: 'buying', label: 'Buying a home' },
      { value: 'selling', label: 'Selling a home' },
      { value: 'investment', label: 'Property investment' },
      { value: 'valuation', label: 'Valuation' },
      { value: 'relocation', label: 'Relocation' },
      { value: 'other', label: 'Something else' },
    ],
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'Tell us about the property, budget or timing you have in mind…',
  },
]

const details = [
  { icon: 'phone', label: 'Telephone', value: contact.phone, href: contact.phoneHref },
  { icon: 'mail', label: 'Email', value: contact.email, href: contact.emailHref },
  { icon: 'pin', label: 'Office', value: `${contact.address}, ${contact.city}` },
  { icon: 'clock', label: 'Opening hours', value: contact.hours },
]

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's find your next address"
        text="Tell us what you are looking for and a director will reply personally — usually the same working day."
        image="1571003123894-1f0594d2b5d9"
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <span className="eyebrow">Office</span>
            <h2 className="title-2" style={{ marginTop: '0.85rem', marginBottom: '1.5rem' }}>
              Visit or call us
            </h2>

            <div className="info-list">
              {details.map((detail) => (
                <div className="info-item" key={detail.label}>
                  <span className="info-item__icon" aria-hidden="true">
                    <Icon name={detail.icon} size={19} />
                  </span>
                  <div>
                    <div className="info-item__label">{detail.label}</div>
                    <div className="info-item__value">
                      {detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="panel panel--soft" style={{ marginTop: '2rem' }}>
              <h3 className="title-4">Prefer to speak now?</h3>
              <p className="service-card__text" style={{ margin: '0.6rem 0 1.25rem' }}>
                Lines are open {contact.hours.toLowerCase()}.
              </p>
              <div className="button-row">
                <Button href={contact.phoneHref} iconLeading="phone">
                  {contact.phone}
                </Button>
                <Button href={contact.emailHref} variant="outline">
                  Email the team
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal className="panel" delay={120}>
            <h2 className="panel__title">Send us a message</h2>
            <p className="form__note" style={{ marginBottom: '1.25rem' }}>
              We reply to every enquiry, and we never pass your details on.
            </p>
            <InquiryForm
              fields={contactFields}
              idPrefix="contact"
              submitLabel="Send message"
              source="contact-page"
              successMessage="Thank you — your message is with the team. We reply within one working day."
            />
            <p className="form__note" style={{ marginTop: '1.25rem' }}>
              Looking for something specific? See our {services.length} services, or browse the{' '}
              <Link className="text-gold" to="/properties">
                current portfolio
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
