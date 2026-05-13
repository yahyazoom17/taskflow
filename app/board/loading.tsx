export default function BoardLoading() {
  return (
    <div className="flex flex-col h-full">
      {/* Header skeleton */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-muted rounded animate-pulse" />
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
              <div className="space-y-1.5">
                <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-12 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-48 bg-muted rounded-md animate-pulse" />
              <div className="h-9 w-9 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Board skeleton */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, colIndex) => (
              <div key={colIndex} className="flex flex-col min-h-0 rounded-xl">
                <div className="flex items-center justify-between px-1 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${colIndex === 0 ? "bg-muted-foreground/60" : colIndex === 1 ? "bg-[var(--apple-accent)]" : "bg-emerald-500"}`} />
                    <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-6 bg-muted rounded animate-pulse" />
                  </div>
                  <div className="h-7 w-7 bg-muted rounded-md animate-pulse" />
                </div>
                <div className="flex-1 flex flex-col gap-2 min-h-[120px] px-0.5">
                  {[...Array(3)].map((_, taskIndex) => (
                    <div key={taskIndex} className="rounded-lg border border-border/40 bg-card p-3.5 space-y-2">
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 w-48 bg-muted rounded animate-pulse mx-auto" />
        </div>
      </footer>
    </div>
  );
}