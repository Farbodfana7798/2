import Icon from './Icon'
import { imageSrcSet, imageUrl } from '../lib/images'
import { socials } from '../data/site'

export default function TeamCard({ agent, showBio = false }) {
  return (
    <article className="team-card">
      <div className="team-card__media">
        <img
          src={imageUrl(agent.photo, 700)}
          srcSet={imageSrcSet(agent.photo, [400, 700, 1000])}
          sizes="(max-width: 767px) 46vw, 25vw"
          alt={`${agent.name}, ${agent.role}`}
          width="700"
          height="933"
          loading="lazy"
        />
        <div className="team-card__socials">
          {socials.slice(0, 3).map((social) => (
            <a
              key={social.label}
              className="team-card__social"
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${agent.name} on ${social.label}`}
            >
              <Icon name={social.icon} size={16} filled />
            </a>
          ))}
          <a className="team-card__social" href={`mailto:${agent.email}`} aria-label={`Email ${agent.name}`}>
            <Icon name="mail" size={16} />
          </a>
        </div>
      </div>
      <div>
        <h3 className="team-card__name">{agent.name}</h3>
        <p className="team-card__role">{agent.role}</p>
        {showBio && <p className="team-card__bio">{agent.bio}</p>}
      </div>
    </article>
  )
}
