import { useState } from 'react'
import type { FormEvent } from 'react'
import { profile } from '../data/profile'
import { validateContact } from '../lib/validate'
import type { ContactErrors, ContactValues } from '../lib/validate'
import { ContactSuccess } from './ContactSuccess'
import { Reveal } from './Reveal'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Web3Forms forwards each submission to my inbox. The access key is public by design (safe in client code);
// set VITE_WEB3FORMS_KEY to override it.
const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ?? '32630133-3dec-4752-bf90-da864964fb18'

export function Contact() {
  const [values, setValues] = useState<ContactValues>({ name: '', email: '', address: '', message: '' })
  const [trap, setTrap] = useState('') // honeypot: real people never fill this hidden field
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sentName, setSentName] = useState('')

  const set = (key: keyof ContactValues) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length > 0 || trap) return

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, access_key: ACCESS_KEY, subject: `Portfolio enquiry from ${values.name}`, from_name: 'Portfolio website' }),
      })
      const data = (await res.json()) as { success?: boolean }
      if (!res.ok || !data.success) throw new Error(String(res.status))
      setSentName(values.name)
      setStatus('sent')
      setValues({ name: '', email: '', address: '', message: '' })
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
        <input id={`c-${key}`} type={type} value={values[key]} onChange={set(key)} autoComplete={key === 'address' ? 'street-address' : key} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `e-${key}` : undefined} />
      )}
      {errors[key] && <span className="field__error" id={`e-${key}`}>{errors[key]}</span>}
    </div>
  )

  return (
    <section className="section" id="contact">
      <div className="wrap grid-2">
        <div>
          <SectionHeading label="Contact" title="Let's work together." lead="Have a project or opportunity in mind? Send me the details and I'll reply promptly." />
          <Reveal>
            <ul className="contact-links">
              <li>
                <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title="Email"><Icon name="Email" /></a>
              </li>
              {profile.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label}><Icon name={l.label} /></a>
                </li>
              ))}
            </ul>
            <p className="contact-email">{profile.email}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          {status === 'sent' ? (
            <ContactSuccess name={sentName} onReset={() => setStatus('idle')} />
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              {field('name', 'Your name')}
              {field('email', 'Email', 'email')}
              {field('address', 'Address (optional)')}
              {field('message', 'Message')}
              <div className="form__trap" aria-hidden="true">
                <label>Leave empty<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
              </div>
              <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <div aria-live="polite">
                {status === 'error' && <p className="form__notice form__notice--err">Something went wrong. Please email me at <a href={`mailto:${profile.email}`}>{profile.email}</a> instead.</p>}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
