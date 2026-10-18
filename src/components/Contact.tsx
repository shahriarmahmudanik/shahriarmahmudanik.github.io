import { useState } from 'react'
import type { FormEvent } from 'react'
import { profile } from '../data/profile'
import { validateContact } from '../lib/validate'
import type { ContactErrors, ContactValues } from '../lib/validate'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const icons: Record<string, string> = {
  Email: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.5 2 7.5 6 7.5-6',
  GitHub: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  Instagram: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  Facebook: 'M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8h3.2Z',
  LinkedIn: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.11v5.89h-4v-5.22c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.31h-4V9.75Z',
}

function Icon({ name }: { name: string }) {
  const filled = name !== 'Email'
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"
      fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={icons[name]} />
    </svg>
  )
}

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
          <SectionHeading label="Contact" title="Let's work together." lead="I'm open to junior front-end and web developer roles in the UK, and to freelance projects." />
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
              {status === 'sent' && <p className="form__notice form__notice--ok">Thanks! Your message is on its way.</p>}
              {status === 'error' && <p className="form__notice form__notice--err">Something went wrong. Please email me at <a href={`mailto:${profile.email}`}>{profile.email}</a> instead.</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
