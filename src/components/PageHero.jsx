import { imageUrl } from '../lib/images'

/** Dark band that opens every inner page, so the transparent header stays legible. */
export default function PageHero({ eyebrow, title, text, image, children, className = '' }) {
  return (
    <section className={`page-hero${image ? ' page-hero--image' : ''} ${className}`.trim()}>
      {image && (
        <div className="page-hero__bg" aria-hidden="true">
          <img src={imageUrl(image, 1600)} alt="" width="1600" height="900" />
        </div>
      )}
      <div className="container page-hero__inner">
        {eyebrow && <span className="eyebrow eyebrow--on-dark">{eyebrow}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {text && <p className="page-hero__text">{text}</p>}
        {children}
      </div>
    </section>
  )
}
