import { render, screen } from '@testing-library/react'

import App from '@/App'

describe('App', () => {
  it('renders the project title and stack', () => {
    render(<App />)

    expect(screen.getByText('claude-mcp-testing')).toBeInTheDocument()
    expect(screen.getByText('shadcn/ui')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /browse components/i })).toBeInTheDocument()
  })
})
