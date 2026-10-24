import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const stack = ['Vite', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'axios']

function App() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>claude-mcp-testing</CardTitle>
          <CardDescription>Production-ready frontend starter template.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <li key={item} className="rounded-md bg-secondary px-2 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <a href="https://ui.shadcn.com/docs/components" target="_blank" rel="noreferrer">
              Browse components
            </a>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default App
