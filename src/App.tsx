import { KanbanBoard } from '@/features/kanban/kanban-board'

function App() {
  return (
    <main className="min-h-svh bg-muted/40 p-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold">Kanban board</h1>
          <p className="text-sm text-muted-foreground">Add tasks and move them between columns.</p>
        </header>
        <KanbanBoard />
      </div>
    </main>
  )
}

export default App
