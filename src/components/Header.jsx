import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import Icon from './Icon'
import Button from './Button'
import { useFavorites } from '../context/FavoritesContext'
import { contact, navigation } from '../data/site'

/**
 * Fixed header: transparent over the dark hero at the top of every page, then
 * solid with a blur once the page scrolls.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useFavorites()
  const location = useLocation()
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <>
      <header className={`header ${scrolled ? 'is-solid' : 'is-transparent'}`}>
        <div className="container container--wide header__inner">
          <Link to="/" className="brand" aria-label="Horizon Properties — home">
            <Icon name="roof" size={26} className="brand__mark" />
            <span className="brand__text">Horizon Properties</span>
          </Link>

          <nav className="header__nav" aria-label="Main">
            <ul className="header__nav-list">
              {navigation.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <a className="header__phone" href={contact.phoneHref}>
              <Icon name="phone" size={16} />
              <span>{contact.phone}</span>
            </a>

            <Link
              to="/favorites"
              className="header__saved"
              aria-label={`Saved properties${count ? `: ${count}` : ''}`}
            >
              <Icon name="heart" size={18} />
              {count > 0 && <span className="header__saved-count">{count}</span>}
            </Link>

            <button
              type="button"
              className="header__burger"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="burger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        ref={panelRef}
        className={`mobile-nav${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="mobile-nav__list">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `mobile-nav__link${isActive ? ' is-active' : ''}`}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {item.label}
                  <Icon name="arrowUpRight" size={18} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-nav__footer">
          <Button href={contact.phoneHref} variant="gold" iconLeading="phone" tabIndex={menuOpen ? 0 : -1}>
            {contact.phone}
          </Button>
          <Button
            to="/favorites"
            variant="outlineLight"
            iconLeading="heart"
            tabIndex={menuOpen ? 0 : -1}
          >
            Saved properties
          </Button>
          <p className="mobile-nav__meta">
            {contact.address}
            <br />
            {contact.city}
          </p>
        </div>
      </div>
    </>
  )
}
