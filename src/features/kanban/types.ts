export const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
] as const

export type ColumnId = (typeof COLUMNS)[number]['id']

export interface Task {
  id: string
  title: string
  status: ColumnId
}
