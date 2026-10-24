import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { KanbanBoard } from '@/features/kanban/kanban-board'

function column(name: RegExp) {
  return screen.getByRole('region', { name })
}

describe('KanbanBoard', () => {
  it('renders the three columns with seeded tasks in the right place', () => {
    render(<KanbanBoard />)

    expect(within(column(/^To Do/)).getByText('Write tests')).toBeInTheDocument()
    expect(within(column(/^In Progress/)).getByText('Build the kanban board')).toBeInTheDocument()
    expect(within(column(/^Done/)).getByText('Set up the project')).toBeInTheDocument()
  })

  it('shows the task count in each column heading', () => {
    render(<KanbanBoard />)

    expect(column(/^To Do/)).toHaveAccessibleName('To Do (1)')
    expect(column(/^In Progress/)).toHaveAccessibleName('In Progress (1)')
    expect(column(/^Done/)).toHaveAccessibleName('Done (1)')
  })

  it('adds a new task to To Do and clears the input', async () => {
    const user = userEvent.setup()
    render(<KanbanBoard />)

    await user.type(screen.getByLabelText('New task title'), '  Ship it  ')
    await user.click(screen.getByRole('button', { name: 'Add task' }))

    expect(within(column(/^To Do/)).getByText('Ship it')).toBeInTheDocument()
    expect(screen.getByLabelText('New task title')).toHaveValue('')
  })

  it('disables Add task when the title is blank', async () => {
    const user = userEvent.setup()
    render(<KanbanBoard />)

    const button = screen.getByRole('button', { name: 'Add task' })
    expect(button).toBeDisabled()

    await user.type(screen.getByLabelText('New task title'), '   ')
    expect(button).toBeDisabled()
  })

  it('moves a task forward and back between columns', async () => {
    const user = userEvent.setup()
    render(<KanbanBoard />)

    await user.click(screen.getByRole('button', { name: 'Move "Write tests" to In Progress' }))
    expect(within(column(/^In Progress/)).getByText('Write tests')).toBeInTheDocument()
    expect(within(column(/^To Do/)).queryByText('Write tests')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Move "Write tests" to To Do' }))
    expect(within(column(/^To Do/)).getByText('Write tests')).toBeInTheDocument()
  })

  it('does not offer a move back from To Do or forward from Done', () => {
    render(<KanbanBoard />)

    expect(
      screen.queryByRole('button', { name: /Move "Write tests" to .* To Do/ }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Move "Set up the project" to Done/ }),
    ).not.toBeInTheDocument()
  })
})
