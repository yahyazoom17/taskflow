import Link from "next/link";
import {
  GripVertical,
  Plus,
  Search,
  Clock,
  Moon,
  Zap,
  Keyboard,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon } from "@/components/github-icon";

const reviews = [
  {
    name: "Alex Chen",
    role: "Product Designer",
    avatar: "AC",
    content: "TaskFlow has completely transformed how I manage my daily tasks. The drag-and-drop is buttery smooth.",
    rating: 5,
  },
  {
    name: "Sarah Miller",
    role: "Developer",
    avatar: "SM",
    content: "Finally, a task manager that doesn't get in the way. Minimal, fast, and actually beautiful.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Project Manager",
    avatar: "JW",
    content: "The dark mode support is perfect for late-night work sessions. My team loves it.",
    rating: 5,
  },
  {
    name: "Emily Park",
    role: "Freelancer",
    avatar: "EP",
    content: "Simple yet powerful. I've tried dozens of task apps and this is my go-to now.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "Startup Founder",
    avatar: "MB",
    content: "The optimistic UI makes everything feel instant. No more waiting for saves.",
    rating: 5,
  },
  {
    name: "Lisa Johnson",
    role: "Marketing Lead",
    avatar: "LJ",
    content: "Clean design, intuitive UX, and it just works. What more could you ask for?",
    rating: 5,
  },
];

const features = [
  {
    icon: GripVertical,
    title: "Drag & Drop",
    description:
      "Move tasks between columns and reorder within columns using intuitive drag-and-drop.",
  },
  {
    icon: Plus,
    title: "Full CRUD",
    description:
      "Create, edit, and delete tasks through a clean modal dialog with all options.",
  },
  {
    icon: CheckCircle2,
    title: "Persistent Storage",
    description:
      "Tasks are auto-saved to a local JSON file instantly. Your data is always safe.",
  },
  {
    icon: Search,
    title: "Search & Filter",
    description:
      "Find tasks quickly by keyword or filter by priority and status instantly.",
  },
  {
    icon: Zap,
    title: "Priority Badges",
    description:
      "Visual indicators for task urgency with Low, Medium, and High priority labels.",
  },
  {
    icon: Clock,
    title: "Due Dates",
    description:
      "Assign and track deadlines per task with a built-in date picker integration.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "System-aware theme with automatic detection and manual toggle support.",
  },
  {
    icon: ArrowRight,
    title: "Optimistic UI",
    description:
      "Instant updates without waiting for the server. Experience true responsiveness.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Accessible",
    description:
      "Full keyboard support for drag-and-drop. Accessibility is built in.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Works seamlessly across desktop and mobile viewports of all sizes.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="./brand.png"
              alt="TaskFlow"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-lg font-semibold tracking-tight">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/board"
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium bg-[var(--apple-accent)] text-white rounded-md hover:bg-[var(--apple-accent)]/90 transition-colors"
            >
              Open App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--apple-accent)] animate-pulse" />
            Now with Dark Mode Support
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
            Task management,{" "}
            <span className="text-[var(--apple-accent)]">reimagined</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A minimal, beautiful Kanban board that feels instant. Drag, drop, and
            organize your tasks with fluid animations and zero friction.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/board"
              className="inline-flex items-center gap-2 h-12 px-6 text-sm font-medium bg-[var(--apple-accent)] text-white rounded-lg hover:bg-[var(--apple-accent)]/90 transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/yahyazoom17/taskflow"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* Hero Image / Preview */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="relative rounded-2xl border border-border/40 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 z-10" />
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80"
              alt="TaskFlow App Preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-0 overflow-visible">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-[var(--apple-accent)] mb-2">
              Loved by teams everywhere
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              What people are saying
            </h2>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          {/* Gradient fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling reviews */}
          <div className="flex gap-6 flex-nowrap animate-scroll w-max">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 p-6 rounded-2xl bg-muted/30 border border-border/40"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-[var(--apple-accent)] text-[var(--apple-accent)]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  &ldquo;{review.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--apple-accent)]/10 flex items-center justify-center text-sm font-medium text-[var(--apple-accent)]">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with modern web technologies for a fast, responsive, and
              delightful experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-background border border-border/40 hover:border-[var(--apple-accent)]/30 transition-all hover:shadow-lg hover:shadow-[var(--apple-accent)]/5"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--apple-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--apple-accent)]/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-[var(--apple-accent)]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Built with modern tools
          </h2>
          <p className="text-muted-foreground mb-10">
            Powered by the latest technologies for performance and developer
            experience.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { name: "Next.js", logo: "⬛" },
              { name: "React", logo: "⚛️" },
              { name: "TypeScript", logo: "🔷" },
              { name: "Tailwind", logo: "💨" },
              { name: "dnd-kit", logo: "🎯" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-sm font-medium"
              >
                <span>{tech.logo}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Ready to organize your tasks?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start using TaskFlow today. It&apos;s free, fast, and beautiful.
          </p>
          <Link
            href="/board"
            className="inline-flex items-center gap-2 h-12 px-8 text-sm font-medium bg-[var(--apple-accent)] text-white rounded-lg hover:bg-[var(--apple-accent)]/90 transition-all hover:scale-105"
          >
            Open TaskFlow
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskFlow. Built with ❤️ by{" "}
            <a
              href="https://github.com/yahyazoom17"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Yahya
            </a>
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/yahyazoom17/taskflow"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Deploy on Vercel
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}