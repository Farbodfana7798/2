import { useEffect, useRef, useState } from 'react'

/**
 * Fade-and-rise entrance. Content is revealed once as it enters the viewport.
 * Falls back to visible when IntersectionObserver is unavailable, and motion is
 * neutralised by the `prefers-reduced-motion` rule in base.css.
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={['reveal', visible ? 'is-visible' : '', className].filter(Boolean).join(' ')}
      style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
