import Icon from './Icon'
import { imageUrl } from '../lib/images'

const telHref = (phone) => `tel:+1${phone.replace(/\D/g, '')}`

/** Agent summary with direct contact links. */
export default function AgentCard({ agent, className = '' }) {
  return (
    <div className={`agent-card ${className}`.trim()}>
      <span className="agent-card__photo">
        <img src={imageUrl(agent.photo, 200)} alt={agent.name} width="64" height="64" loading="lazy" />
      </span>
      <div>
        <p className="agent-card__name">{agent.name}</p>
        <p className="agent-card__role">{agent.role}</p>
        <p className="agent-card__contact">
          <a href={telHref(agent.phone)}>{agent.phone}</a>
          <span aria-hidden="true"> · </span>
          <a href={`mailto:${agent.email}`}>{agent.email}</a>
        </p>
      </div>
    </div>
  )
}
