import { useState } from 'react'
import { Link } from 'react-router-dom'

import Icon from './Icon'
import { brand, contact, navigation, socials } from '../data/site'
import { submitInquiry } from '../services/propertyService'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubscribe(event) {
    event.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    try {
      await submitInquiry({ email, source: 'newsletter' })
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="brand" aria-label={`${brand.name} — home`}>
              <Icon name="roof" size={26} className="brand__mark" />
              <span className="brand__text">{brand.name}</span>
            </Link>
            <p className="footer__about">
              A boutique agency for architectural homes and considered investments, working across
              Texas, California and the West.
            </p>
            <ul className="footer__socials">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    className="footer__social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size={17} filled />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer__title">Navigation</h2>
            <ul className="footer__list">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__title">Contact</h2>
            <ul className="footer__list">
              <li className="footer__contact-item">
                <Icon name="phone" size={16} />
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li className="footer__contact-item">
                <Icon name="mail" size={16} />
                <a href={contact.emailHref}>{contact.email}</a>
              </li>
              <li className="footer__contact-item">
                <Icon name="pin" size={16} />
                <span>
                  {contact.address}
                  <br />
                  {contact.city}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer__title">Newsletter</h2>
            <p className="footer__newsletter-text">
              New listings and market notes, sent twice a month. No noise.
            </p>
            <form className="footer__form" onSubmit={handleSubscribe} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                className="footer__input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (status !== 'idle') setStatus('idle')
                }}
                required
              />
              <button type="submit" className="footer__submit" aria-label="Subscribe">
                <Icon name="arrowRight" size={18} />
              </button>
            </form>
            <p className="footer__note" role="status" aria-live="polite">
              {status === 'done' && 'Thank you — please confirm via the email we just sent.'}
              {status === 'error' && 'Something went wrong. Please try again.'}
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <ul className="footer__legal">
            <li>
              <Link to="/contact">Privacy</Link>
            </li>
            <li>
              <Link to="/contact">Terms</Link>
            </li>
            <li>
              <a href={contact.emailHref}>Careers</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
