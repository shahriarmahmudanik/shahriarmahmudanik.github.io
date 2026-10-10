import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.stubGlobal('scrollTo', vi.fn())
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) })))

describe('App routes', () => {
  it('renders a project detail page', () => {
    render(<MemoryRouter initialEntries={['/projects/agency-website']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1, name: 'Agency Website' })).toBeInTheDocument()
  })
  it('renders the 404 page', () => {
    render(<MemoryRouter initialEntries={['/nope']}><App /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})
