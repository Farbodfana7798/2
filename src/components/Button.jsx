import { Link } from 'react-router-dom'
import Icon from './Icon'

/** Shared button. Renders a router link, an anchor or a real <button>. */

const VARIANTS = {
  primary: 'button--primary',
  gold: 'button--gold',
  outline: 'button--outline',
  outlineLight: 'button--outline-light',
  link: 'button--link',
}

const SIZES = {
  sm: 'button--sm',
  lg: 'button--lg',
}

export default function Button({
  to,
  href,
  variant = 'primary',
  size,
  block = false,
  icon,
  iconLeading,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = [
    'button',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? '',
    block ? 'button--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {iconLeading && <Icon name={iconLeading} size={17} className="button__icon button__icon--lead" />}
      <span>{children}</span>
      {icon && <Icon name={icon} size={17} className="button__icon button__icon--trail" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
