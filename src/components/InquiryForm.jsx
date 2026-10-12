import { useState } from 'react'

import Icon from './Icon'
import { submitInquiry } from '../services/propertyService'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Groups consecutive half-width fields into rows. */
function toRows(fields) {
  const rows = []
  let pending = []
  fields.forEach((field) => {
    if (field.width === 'half') {
      pending.push(field)
      if (pending.length === 2) {
        rows.push(pending)
        pending = []
      }
    } else {
      if (pending.length) {
        rows.push(pending)
        pending = []
      }
      rows.push([field])
    }
  })
  if (pending.length) rows.push(pending)
  return rows
}

/**
 * Shared inquiry form, used for "contact agent", "schedule a viewing", the
 * newsletter and the contact page. Validates on the client and hands the payload
 * to the property service.
 */
export default function InquiryForm({
  fields,
  submitLabel = 'Send message',
  source = 'website',
  note,
  idPrefix = 'field',
  successMessage = 'Thank you — a member of the team will be in touch within one working day.',
}) {
  /** Selects start on their first option so the control stays controlled. */
  function initialValues() {
    return Object.fromEntries(
      fields.map((field) => [
        field.name,
        field.type === 'select'
          ? field.options?.[0]?.value ?? field.options?.[0] ?? ''
          : '',
      ]),
    )
  }

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const update = (name) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current))
  }

  const validate = () => {
    const next = {}
    fields.forEach((field) => {
      const value = (values[field.name] ?? '').trim()
      if (field.required && !value) {
        next[field.name] = `${field.label} is required.`
      } else if (field.type === 'email' && value && !EMAIL_PATTERN.test(value)) {
        next[field.name] = 'Enter a valid email address.'
      }
    })
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    setStatus('sending')
    try {
      await submitInquiry({ ...values, source })
      setStatus('done')
      setValues(initialValues())
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="form__success" role="status">
        <Icon name="check" size={18} />
        <div>
          <p>{successMessage}</p>
          <button type="button" className="button button--link" onClick={() => setStatus('idle')}>
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {toRows(fields).map((row, rowIndex) => {
        const controls = row.map((field) => {
          // Prefixed so two forms on one page never share DOM ids.
          const id = `${idPrefix}-${field.name}`
          const invalid = Boolean(errors[field.name])
          const common = {
            id,
            name: field.name,
            value: values[field.name],
            onChange: update(field.name),
            'aria-invalid': invalid || undefined,
            'aria-describedby': invalid ? `${id}-error` : undefined,
          }

          return (
            <div className="field" key={field.name}>
              <label htmlFor={id}>{field.label}</label>

              {field.type === 'textarea' ? (
                <textarea
                  {...common}
                  className="textarea"
                  rows={field.rows ?? 4}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select {...common} className="select" required={field.required}>
                  {(field.options ?? []).map((option) => (
                    <option key={option.value ?? option} value={option.value ?? option}>
                      {option.label ?? option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  className="input"
                  type={field.type ?? 'text'}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required={field.required}
                />
              )}

              {invalid && (
                <span className="field__error" id={`${id}-error`}>
                  {errors[field.name]}
                </span>
              )}
            </div>
          )
        })

        return row.length === 2 ? (
          <div className="form__row" key={`row-${rowIndex}`}>
            {controls}
          </div>
        ) : (
          controls
        )
      })}

      <div className="field">
        <button type="submit" className="button button--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : submitLabel}
        </button>
      </div>

      <p className="form__note" role="status" aria-live="polite">
        {status === 'error' ? 'Something went wrong. Please try again.' : note}
      </p>
    </form>
  )
}
