"use client"

import { useState } from "react"

type Question = {
  q: string
  a: string
}

const QUESTIONS: Question[] = [
  {
    q: "Why can't ticket sales alone cover an orchestra's budget?",
    a: "Fixed costs like musician and conductor salaries don't shrink with a smaller audience, and venues only hold so many seats at a price people will pay. Earned income has a ceiling that fixed costs routinely exceed, so contributed income isn't optional — it's structural.",
  },
  {
    q: "What is Baumol's cost disease, and why does it hit orchestras especially hard?",
    a: "Wages rise economy-wide as productivity improves, but a string quartet still takes the same four musicians and the same amount of time it did a century ago — output per musician never grows. To keep paying competitive wages, orchestras' costs climb even though their output doesn't.",
  },
  {
    q: "If ticket revenue falls short, why not just raise prices?",
    a: "Raising prices lifts revenue per seat, but it also shrinks the audience willing to pay — and a symphony hall's capacity is fixed either way. Push prices too far and you price out the people the orchestra exists to reach, without closing the gap.",
  },
  {
    q: "What's the difference between fixed and variable costs in the model, and why does it matter?",
    a: "Fixed costs (musician salaries, conductor, marketing & admin) don't change with how many concerts are performed. Variable costs (venue & facilities, guest artists, production) scale with the number of performances. Because fixed costs dominate, cutting a few concerts barely moves the budget — the real cost is baked in before a single ticket sells.",
  },
  {
    q: "In \"Can You Save the Orchestra?\", why is there a maximum ticket price instead of letting you raise it freely?",
    a: "Without a cap, every challenge could be \"solved\" by just charging more per seat — which isn't a real solution, it's pricing out the audience. The cap forces you to find sustainability through attendance, donations, or cost control instead.",
  },
  {
    q: "The Berlin Philharmonic, New York Philharmonic, and Chicago Symphony have very different budgets — what do they have in common?",
    a: "All three lean heavily on contributed income rather than ticket sales alone — Berlin through a direct public subsidy, New York and Chicago through private donations and grants. Even the world's most prestigious orchestras don't break even on box office revenue.",
  },
]

export function ReviewQuestions() {
  const [open, setOpen] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })
  }

  return (
    <ul className="flex flex-col gap-3">
      {QUESTIONS.map((item, i) => {
        const isOpen = open.has(i)
        return (
          <li key={item.q} className="rounded-lg border border-border bg-card">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-foreground">
                {i + 1}. {item.q}
              </span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen && (
              <p className="text-pretty px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}
