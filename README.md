# TaskFlow

A modern, minimal Kanban board web application for managing tasks with drag-and-drop, built with Next.js 15+ and React 19.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Live Demo:** [taskflow-nine-rust.vercel.app](https://taskflow-nine-rust.vercel.app)

---

## Features

- **Drag & Drop** — Move tasks between columns and reorder within columns using `@dnd-kit`
- **Full CRUD** — Create, edit, and delete tasks via a clean modal dialog
- **Persistent Storage** — Tasks are auto-saved to a local JSON file instantly
- **Search & Filter** — Find tasks quickly by keyword or filter by priority/status
- **Priority Badges** — Visual indicators for task urgency (Low, Medium, High)
- **Due Dates** — Assign and track deadlines per task
- **Dark Mode** — System-aware theme with a manual toggle
- **Toast Notifications** — Feedback on every action via `sonner`
- **Optimistic UI** — Instant updates without waiting for the server
- **Keyboard Accessible** — Full keyboard support for drag-and-drop
- **Responsive Design** — Works across desktop and mobile viewports

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui + Radix UI |
| Drag & Drop | @dnd-kit/core, @dnd-kit/sortable |
| Icons | Lucide React |
| Theming | next-themes |
| Notifications | Sonner |
| Database | Local JSON file (`db/tasks.json`) via Node.js `fs/promises` |

---

## Project Structure

```
taskflow/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET all tasks, POST new task
│   │       └── [id]/
│   │           └── route.ts      # PATCH, DELETE task by id
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── board/
│   │   ├── board.tsx             # Root board with DnD context
│   │   ├── column.tsx            # Kanban column (droppable)
│   │   ├── task-card.tsx         # Draggable task card
│   │   ├── task-dialog.tsx       # Create / edit modal
│   │   ├── board-header.tsx      # Search, filter, and controls
│   │   └── empty-state.tsx       # Placeholder for empty columns
│   ├── theme/
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── ui/                       # shadcn/ui components
│
├── db/
│   └── tasks.json                # Persistent task store
│
├── lib/
│   ├── db.ts                     # File-based DB read/write helpers
│   ├── types.ts                  # Shared TypeScript types
│   ├── utils.ts                  # Utility functions
│   └── constants.ts              # Column definitions, priorities
│
├── public/
├── Dockerfile
├── .dockerignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+
- **npm** 9+

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/yahyazoom17/taskflow.git
cd taskflow

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Docker

A multi-stage `Dockerfile` is included for containerised deployments.

### Build and Run

```bash
# Build the image
docker build -t taskflow .

# Run the container
docker run -p 3000:3000 taskflow
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Persisting Task Data

The task database lives at `db/tasks.json` inside the container. To preserve data across container restarts, mount a named volume:

```bash
docker run -p 3000:3000 -v taskflow_db:/app/db taskflow
```

### Docker Compose (optional)

```yaml
services:
  taskflow:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - taskflow_db:/app/db
    restart: unless-stopped

volumes:
  taskflow_db:
```

---

## API Reference

The app exposes a minimal REST API under `/api/tasks`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Fetch all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/[id]` | Update a task (status, content, priority, etc.) |
| `DELETE` | `/api/tasks/[id]` | Delete a task by ID |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Deployment

### Vercel (Recommended)

This project is optimised for Vercel. Push to your GitHub repo and import the project at [vercel.com/new](https://vercel.com/new).

> **Note:** Vercel runs serverless functions, so the file-system database (`db/tasks.json`) will reset on each deployment. For persistent storage in production, consider migrating to a database like [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [PlanetScale](https://planetscale.com), or [Supabase](https://supabase.com).

### Docker / Self-hosted

See the [Docker](#docker) section above. Mount a volume to `db/` to ensure task data persists across deploys.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

*Inspired by [Linear](https://linear.app), [Notion](https://notion.so), and [Trello](https://trello.com).*
