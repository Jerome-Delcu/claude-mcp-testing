import { useCallback, useState } from 'react'

import type { ColumnId, Task } from '@/features/kanban/types'

export function useBoard(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const addTask = useCallback((title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return

    setTasks((current) => [...current, { id: crypto.randomUUID(), title: trimmed, status: 'todo' }])
  }, [])

  const moveTask = useCallback((id: string, status: ColumnId) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)))
  }, [])

  return { tasks, addTask, moveTask }
}
