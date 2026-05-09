# README.md

````md
# Modern Kanban Board App

A modern and minimal Kanban board web application built with:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- @dnd-kit drag-and-drop
- Local JSON database using Node.js fs/promises

Inspired by Linear, Notion, and Trello.

---

# Features

## Core Features

- Drag and drop tasks between columns
- Reorder tasks within columns
- Create tasks
- Edit tasks
- Delete tasks
- Persistent local JSON database
- Auto-save changes instantly
- Responsive design
- Smooth animations
- Dark mode support
- Optimistic UI updates
- Keyboard accessible drag-and-drop

## Additional Features

- Search tasks
- Filter tasks
- Priority badges
- Due dates
- Toast notifications
- Empty states
- Loading and error states

---

# Tech Stack

- Next.js 15+
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- @dnd-kit
- Lucide Icons
- next-themes
- sonner
- fs/promises

---

# Folder Structure

```bash
kanban-board/
│
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── board/
│   │   ├── board.tsx
│   │   ├── column.tsx
│   │   ├── task-card.tsx
│   │   ├── task-dialog.tsx
│   │   ├── board-header.tsx
│   │   └── empty-state.tsx
│   │
│   ├── theme/
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   │
│   └── ui/
│       └── ...shadcn components
│
├── db/
│   └── tasks.json
│
├── lib/
│   ├── db.ts
│   ├── types.ts
│   ├── utils.ts
│   └── constants.ts
│
├── public/
│
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
````

---

# Data Model

```ts
export type TaskStatus = "todo" | "in-progress" | "completed";

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: Priority;
  dueDate?: string;
  order: number;
  createdAt: string;
};
```

---

# Installation

## 1. Create Next.js App

```bash
npx create-next-app@latest kanban-board
```

Select:

* TypeScript → Yes
* Tailwind → Yes
* App Router → Yes
* ESLint → Yes
* src directory → No
* Turbopack → Yes

---

## 2. Navigate into Project

```bash
cd kanban-board
```

---

## 3. Install Dependencies

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install lucide-react next-themes sonner uuid
npm install class-variance-authority clsx tailwind-merge
npm install date-fns
```

---

## 4. Install shadcn/ui

```bash
npx shadcn@latest init
```

Choose:

* Style → Default
* Base Color → Slate
* CSS Variables → Yes

---

## 5. Install shadcn Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add dropdown-menu
npx shadcn@latest add badge
npx shadcn@latest add toast
npx shadcn@latest add skeleton
npx shadcn@latest add scroll-area
npx shadcn@latest add separator
```

---

# Tailwind Setup

Update `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

---

# Enable Dark Mode

## `components/theme/theme-provider.tsx`

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
```

---

# Setup Root Layout

## `app/layout.tsx`

```tsx
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

# Create Database

## `db/tasks.json`

```json
[
  {
    "id": "1",
    "title": "Design homepage",
    "description": "Create initial homepage wireframe",
    "status": "todo",
    "priority": "high",
    "dueDate": "2026-05-15",
    "order": 0,
    "createdAt": "2026-05-01T10:00:00.000Z"
  },
  {
    "id": "2",
    "title": "Setup authentication",
    "description": "Implement login flow",
    "status": "in-progress",
    "priority": "medium",
    "dueDate": "2026-05-18",
    "order": 0,
    "createdAt": "2026-05-01T11:00:00.000Z"
  },
  {
    "id": "3",
    "title": "Deploy app",
    "description": "Deploy to Vercel",
    "status": "completed",
    "priority": "low",
    "dueDate": "2026-05-20",
    "order": 0,
    "createdAt": "2026-05-01T12:00:00.000Z"
  }
]
```

---

# Database Utilities

## `lib/db.ts`

```ts
import { promises as fs } from "fs";
import path from "path";
import { Task } from "./types";

const dbPath = path.join(process.cwd(), "db/tasks.json");

export async function readTasks(): Promise<Task[]> {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

export async function writeTasks(tasks: Task[]) {
  await fs.writeFile(dbPath, JSON.stringify(tasks, null, 2));
}
```

---

# API Routes

## `app/api/tasks/route.ts`

```ts
import { NextResponse } from "next/server";
import { readTasks, writeTasks } from "@/lib/db";
import { v4 as uuid } from "uuid";

export async function GET() {
  const tasks = await readTasks();
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();

  const tasks = await readTasks();

  const newTask = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    ...body,
  };

  tasks.push(newTask);

  await writeTasks(tasks);

  return NextResponse.json(newTask);
}
```

---

## `app/api/tasks/[id]/route.ts`

```ts
import { NextResponse } from "next/server";
import { readTasks, writeTasks } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const tasks = await readTasks();

  const updated = tasks.map((task) =>
    task.id === params.id
      ? { ...task, ...body }
      : task
  );

  await writeTasks(updated);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const tasks = await readTasks();

  const filtered = tasks.filter(
    (task) => task.id !== params.id
  );

  await writeTasks(filtered);

  return NextResponse.json({ success: true });
}
```

---

# Drag and Drop Setup

Uses:

```bash
@dnd-kit/core
@dnd-kit/sortable
@dnd-kit/utilities
```

Features:

* Cross-column drag
* Keyboard support
* Reordering
* Smooth transitions

---

# Main Kanban Board

## `components/board/board.tsx`

Responsibilities:

* Fetch tasks
* Maintain optimistic state
* Handle drag events
* CRUD interactions
* Filtering/searching

Key hooks:

```tsx
useEffect
useMemo
useState
```

DnD:

```tsx
<DndContext>
  <SortableContext>
```

---

# Task Card

## `components/board/task-card.tsx`

Uses:

* shadcn Card
* Badge
* DropdownMenu

Features:

* Priority badge
* Due date
* Edit action
* Delete action
* Drag handle

---

# Task Dialog

## `components/board/task-dialog.tsx`

Uses:

* Dialog
* Input
* Textarea

Features:

* Create task
* Edit task
* Validation
* Keyboard accessibility

---

# Search and Filters

Add search input in board header:

```tsx
<Input
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

Optional filters:

* Status
* Priority
* Due date

---

# Toast Notifications

Using `sonner`

```tsx
import { toast } from "sonner";

toast.success("Task updated");
toast.error("Failed to save");
```

---

# Responsive Design

Mobile behavior:

* Horizontal scrolling columns
* Touch-friendly drag-and-drop
* Responsive dialogs

Desktop behavior:

* 3-column layout
* Smooth transitions

---

# Animations

Use Tailwind transitions:

```tsx
transition-all duration-200
```

DnD animations come from `@dnd-kit`.

---

# Accessibility

Includes:

* Keyboard drag support
* Focus states
* Screen-reader labels
* Semantic buttons

---

# Running Locally

## Development

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# Production Build

```bash
npm run build
npm start
```

---

# Recommended Improvements

Future enhancements:

* User authentication
* Multi-board support
* Real database (Postgres/Prisma)
* Activity history
* Labels/tags
* Team collaboration
* Real-time sync
* Offline support

---

## Drag Issues on Mobile

Ensure touch events are enabled.

---

# Credits

Inspired by:

* Linear
* Notion
* Trello
