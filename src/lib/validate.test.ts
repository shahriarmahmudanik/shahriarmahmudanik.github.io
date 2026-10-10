import { describe, expect, it } from 'vitest'
import { isValidEmail, validateContact } from './validate'

describe('isValidEmail', () => {
  it('accepts normal addresses', () => expect(isValidEmail('a@b.co')).toBe(true))
  it('rejects bad ones', () => {
    expect(isValidEmail('nope')).toBe(false)
    expect(isValidEmail('a@b')).toBe(false)
  })
})

describe('validateContact', () => {
  it('returns no errors for valid input', () => {
    expect(validateContact({ name: 'Anik', email: 'a@b.co', message: 'Hello, nice site!' })).toEqual({})
  })
  it('returns an error for each bad field', () => {
    const errors = validateContact({ name: '', email: 'x', message: 'hi' })
    expect(Object.keys(errors)).toEqual(['name', 'email', 'message'])
  })
})
