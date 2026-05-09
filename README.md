# TaskFlow - Modern Kanban Board App

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