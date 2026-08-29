"use client"

const LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#model", label: "Break-Even Model" },
  { href: "#breakdown", label: "Costs & Revenue" },
  { href: "#baumol", label: "Cost Disease" },
  { href: "#learn", label: "What to Learn" },
  { href: "#review", label: "Review" },
]

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <a href="#overview" className="text-sm font-semibold text-foreground">
          The Economics of Orchestras
        </a>
        <ul className="hidden items-center gap-1 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
