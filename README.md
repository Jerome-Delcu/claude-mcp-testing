# claude-mcp-testing

Production-ready frontend starter: **Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui + axios**.

## Stack

| Concern       | Tooling                                                               |
| ------------- | --------------------------------------------------------------------- |
| Build / dev   | [Vite](https://vite.dev)                                              |
| UI            | React 19, TypeScript (strict)                                         |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`    |
| Components    | [shadcn/ui](https://ui.shadcn.com) (new-york, neutral, CSS variables) |
| HTTP          | [axios](https://axios-http.com) with a shared, typed client           |
| Lint / format | ESLint (flat config, typescript-eslint, react-hooks), Prettier        |
| Testing       | Vitest, Testing Library, jsdom, v8 coverage                           |
| CI            | GitHub Actions (lint, format, typecheck, test, build)                 |

## Getting started

Requires Node.js 22+ (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then edit as needed
npm run dev
```

## Scripts

| Script              | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server                           |
| `npm run build`     | Typecheck and build for production             |
| `npm run preview`   | Preview the production build                   |
| `npm run lint`      | Run ESLint (`lint:fix` to autofix)             |
| `npm run format`    | Format with Prettier (`format:check`)          |
| `npm run typecheck` | Run the TypeScript compiler                    |
| `npm test`          | Run tests once (`test:watch`, `test:coverage`) |

## Project structure

```
src/
  components/ui/   shadcn/ui components (generated, owned by this repo)
  config/          runtime config read from import.meta.env
  features/        feature modules (components, hooks, api per feature)
  hooks/           shared React hooks
  lib/             shared utilities (cn, api-client)
  test/            test setup
```

Import from `src` using the `@/` alias, e.g. `import { Button } from '@/components/ui/button'`.

## Environment variables

| Variable            | Description                       | Default |
| ------------------- | --------------------------------- | ------- |
| `VITE_API_BASE_URL` | Base URL for the axios API client | `/api`  |

## API client

`src/lib/api-client.ts` exports a configured axios instance:

```ts
import { apiClient } from '@/lib/api-client'

const { data } = await apiClient.get<User[]>('/users')
```

- Adds `Authorization: Bearer <token>` when `access_token` is in `localStorage`.
- Normalizes failures into `ApiError` (`message`, `status`, `data`).

## Adding shadcn/ui components

```bash
npx shadcn@latest add dialog
```

Components are written to `src/components/ui`, based on `components.json`.
