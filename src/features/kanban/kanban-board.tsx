import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBoard } from '@/features/kanban/use-board'
import { COLUMNS, type ColumnId, type Task } from '@/features/kanban/types'

const initialTasks: Task[] = [
  { id: '1', title: 'Set up the project', status: 'done' },
  { id: '2', title: 'Build the kanban board', status: 'in-progress' },
  { id: '3', title: 'Write tests', status: 'todo' },
]

export function KanbanBoard() {
  const { tasks, addTask, moveTask } = useBoard(initialTasks)
  const [title, setTitle] = useState('')

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addTask(title)
    setTitle('')
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          aria-label="New task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New task"
          className="h-9 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
        <Button type="submit" disabled={!title.trim()}>
          Add task
        </Button>
      </form>

      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id)

          return (
            <section key={column.id} aria-labelledby={`column-${column.id}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle id={`column-${column.id}`}>
                    {column.title} ({columnTasks.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2">
                    {columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onMove={(status) => moveTask(task.id, status)}
                      />
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          )
        })}
      </div>
    </div>
  )
}

interface TaskCardProps {
  task: Task
  onMove: (status: ColumnId) => void
}

function TaskCard({ task, onMove }: TaskCardProps) {
  const index = COLUMNS.findIndex((column) => column.id === task.status)
  const previous = COLUMNS[index - 1]
  const next = COLUMNS[index + 1]

  return (
    <li className="flex flex-col gap-2 rounded-md border bg-background p-3 text-sm">
      <span>{task.title}</span>
      <div className="flex gap-2">
        {previous && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => onMove(previous.id)}
            aria-label={`Move "${task.title}" to ${previous.title}`}
          >
            ← {previous.title}
          </Button>
        )}
        {next && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => onMove(next.id)}
            aria-label={`Move "${task.title}" to ${next.title}`}
          >
            {next.title} →
          </Button>
        )}
      </div>
    </li>
  )
}
