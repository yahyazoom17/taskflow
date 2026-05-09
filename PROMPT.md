Build a modern Kanban board web app using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

Requirements:

- Use a clean and minimal UI inspired by Linear/Notion/Trello.
- Create 3 default columns:
  - Todo
  - In Progress
  - Completed

Core Features:

- Drag-and-drop tasks between columns
- Create new tasks
- Edit tasks
- Delete tasks
- Persist all data in a local JSON file
- Auto-save changes immediately
- Responsive design for desktop and mobile
- Smooth animations and transitions
- Dark mode support using shadcn/ui theme system

Tech Stack:

- Next.js latest version with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Use `@dnd-kit` for drag-and-drop
- Use server actions or API routes for CRUD operations
- Use a local `db/tasks.json` file as the database
- Read/write JSON using Node.js `fs/promises`

Data Model:

```ts
type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  createdAt: string;
};
```

Project Structure:

- `/app`
- `/components`
- `/components/ui`
- `/lib`
- `/db/tasks.json`

UI Requirements:

- Kanban columns should be cards with headers
- Tasks should appear as draggable cards
- Add task button inside each column
- Modal or drawer for editing task details
- Show task counts in column headers
- Empty state UI for empty columns
- Use shadcn Card, Button, Dialog, Input, Textarea, DropdownMenu components

Behavior:

- Dragging a task updates its status automatically
- Reordering tasks within the same column should persist
- All CRUD operations should update the JSON file
- Handle loading and error states gracefully

Additional Features:

- Search/filter tasks
- Priority badges
- Due dates
- Toast notifications
- Keyboard accessibility
- Optimistic UI updates

Generate:

1. Full folder structure
2. Installation commands
3. All required dependencies
4. Complete source code
5. API routes or server actions
6. Example `tasks.json`
7. Reusable components
8. Tailwind/shadcn setup steps
9. Instructions to run locally

Code quality:

- Use reusable components
- Use proper TypeScript types
- Keep code modular and production-ready
- Follow modern Next.js best practices
- Avoid unnecessary complexity
- Add comments where useful

Make the app fully functional end-to-end.
