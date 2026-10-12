import Button from './Button'
import Icon from './Icon'
import Reveal from './Reveal'

/** Closing call-to-action band (light surface, dark button). */
export default function CTASection({
  title = 'Ready to Find Your Perfect Property?',
  text = 'Let our experts guide you to the right home or investment.',
  label = 'Get in Touch',
  to = '/contact',
  className = '',
}) {
  return (
    <section className={`section section--tight ${className}`.trim()}>
      <div className="container">
        <Reveal className="cta-band__inner">
          <span className="cta-band__icon" aria-hidden="true">
            <Icon name="key" size={28} />
          </span>
          <div className="cta-band__copy">
            <h2 className="cta-band__title">{title}</h2>
            <p className="cta-band__text">{text}</p>
          </div>
          <Button to={to} icon="arrowRight">
            {label}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
