// Small pure functions are the easiest code to test: input in, answer out, no React needed.

export interface ContactValues {
  name: string
  email: string
  address: string // optional
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!isValidEmail(values.email)) errors.email = 'Please enter a valid email address.'
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.'
  return errors
}
