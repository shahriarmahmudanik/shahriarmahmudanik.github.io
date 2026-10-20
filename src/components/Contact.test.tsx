import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Contact } from './Contact'

describe('Contact form', () => {
  afterEach(cleanup)

  it('shows validation errors for an empty submit', async () => {
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
  })

  it('shows the animated success state after a delivered message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }))
    render(<Contact />)
    await userEvent.type(screen.getByLabelText('Your name'), 'Sam Jones')
    await userEvent.type(screen.getByLabelText('Email'), 'sam@example.com')
    await userEvent.type(screen.getByLabelText('Message'), 'Hello, I would like a website.')
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText('Thanks, Sam!')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /send another message/i }))
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    vi.unstubAllGlobals()
  })
})
