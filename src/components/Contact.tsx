import { useState } from 'react'
import type { FormEvent } from 'react'
import { profile } from '../data/profile'
import { validateContact } from '../lib/validate'
import type { ContactErrors, ContactValues } from '../lib/validate'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to send real messages. Without it the form opens the visitor's email app.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

export function Contact() {
  const [values, setValues] = useState<ContactValues>({ name: '', email: '', message: '' })
  const [trap, setTrap] = useState('') // honeypot: real people never fill this hidden field
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set = (key: keyof ContactValues) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length > 0 || trap) return

    if (!ENDPOINT) {
      const body = encodeURIComponent(`${values.message}\n\n${values.name} (${values.email})`)
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio enquiry')}&body=${body}`
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const field = (key: keyof ContactValues, label: string, type = 'text') => (
    <div className={`field${errors[key] ? ' field--error' : ''}`}>
      <label htmlFor={`c-${key}`}>{label}</label>
      {key === 'message' ? (
        <textarea id="c-message" rows={5} value={values.message} onChange={set(key)} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `e-${key}` : undefined} />
      ) : (
        <input id={`c-${key}`} type={type} value={values[key]} onChange={set(key)} autoComplete={key} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `e-${key}` : undefined} />
      )}
      {errors[key] && <span className="field__error" id={`e-${key}`}>{errors[key]}</span>}
    </div>
  )

  return (
    <section className="section" id="contact">
      <div className="wrap grid-2">
        <div>
          <SectionHeading label="Contact" title="Let's work together." lead="I'm open to junior front-end and web developer roles in the UK, and to freelance projects." />
          <Reveal>
            <ul className="contact-links">
              <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              {profile.links.map((l) => (
                <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a></li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <form className="form" onSubmit={onSubmit} noValidate>
            {field('name', 'Your name')}
            {field('email', 'Email', 'email')}
            {field('message', 'Message')}
            <div className="form__trap" aria-hidden="true">
              <label>Leave empty<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
            </div>
            <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <div aria-live="polite">
              {status === 'sent' && <p className="form__notice form__notice--ok">Thanks! Your message is on its way.</p>}
              {status === 'error' && <p className="form__notice form__notice--err">Something went wrong. Please email me directly instead.</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
