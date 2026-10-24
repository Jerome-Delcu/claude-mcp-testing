import { render, screen } from '@testing-library/react'

import App from '@/App'

describe('App', () => {
  it('renders the kanban board heading and columns', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Kanban board' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /^To Do/ })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /^In Progress/ })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /^Done/ })).toBeInTheDocument()
  })
})
