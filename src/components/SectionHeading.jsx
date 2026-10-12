import Reveal from './Reveal'

/** Eyebrow + title + optional intro, with an optional action slot on the right. */
export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  actions,
  as: Tag = 'h2',
  className = '',
}) {
  return (
    <Reveal
      className={`section-head${align === 'center' ? ' section-head--center' : ''} ${className}`.trim()}
    >
      <div className="section-head__copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Tag className="title-2">{title}</Tag>
        {text && <p className="lead">{text}</p>}
      </div>
      {actions && <div className="section-head__actions">{actions}</div>}
    </Reveal>
  )
}
