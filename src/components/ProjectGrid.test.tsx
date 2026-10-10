import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ProjectGrid } from './ProjectGrid'
import { projects } from '../data/projects'

describe('ProjectGrid', () => {
  it('filters projects by type', async () => {
    render(<MemoryRouter><ProjectGrid projects={projects} /></MemoryRouter>)
    expect(screen.getByText('Database Project')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Web' }))
    expect(await screen.findByText('Agency Website')).toBeInTheDocument()
    await screen.findByRole('button', { name: 'Web', pressed: true })
    await new Promise((r) => setTimeout(r, 600))
    expect(screen.queryByText('Database Project')).not.toBeInTheDocument()
  })
})
