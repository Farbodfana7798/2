import Button from '../components/Button'
import { navigation } from '../data/site'

/** Shown for unknown routes and for a property slug that does not exist. */
export default function NotFound() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <span className="eyebrow eyebrow--on-dark">404</span>
          <h1 className="page-hero__title">We couldn't find that page</h1>
          <p className="page-hero__text">
            The page may have moved, or the residence may no longer be listed. Try the portfolio — or
            ask us directly.
          </p>
          <div className="button-row" style={{ marginTop: '2rem' }}>
            <Button to="/properties" variant="gold" icon="arrowRight">
              Browse properties
            </Button>
            <Button to="/" variant="outlineLight">
              Back to home
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="title-3" style={{ marginBottom: '1.25rem' }}>
            Popular pages
          </h2>
          <div className="button-row">
            {navigation.map((item) => (
              <Button key={item.to} to={item.to} variant="outline" size="sm">
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
