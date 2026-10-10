import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'

describe('Contact form', () => {
  it('shows validation errors for an empty submit', async () => {
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
  })
})
