"use client"

import { fmtMoney, type Challenge, type Model } from "@/lib/orchestra-model"

export function ChallengePanel({
  challenge,
  model,
  ticket,
  startingResult,
  onReset,
}: {
  challenge: Challenge
  model: Model
  ticket: number
  startingResult: number
  onReset: () => void
}) {
  const result = model.totalResult
  const sustainable = result >= 0
  const ticketOk = ticket <= challenge.maxTicket
  const solved = sustainable && ticketOk

  const statusLabel = solved
    ? "Sustainable budget achieved"
    : sustainable && !ticketOk
      ? "Balanced — but tickets are too expensive"
      : "Still losing money"

  return (
    <div
      className={`rounded-lg border p-5 ${
        solved ? "border-success/50 bg-success/10" : "border-destructive/40 bg-destructive/5"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Challenge
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{challenge.title}</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          Reset challenge
        </button>
      </div>

      <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
        {challenge.brief}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat
          label="Starting shortfall"
          value={fmtMoney(startingResult)}
          tone="muted"
        />
        <Stat
          label="Current result"
          value={fmtMoney(result)}
          tone={sustainable ? "good" : "bad"}
        />
        <Stat
          label={`Ticket cap ${fmtMoney(challenge.maxTicket)}`}
          value={`${fmtMoney(ticket)} avg`}
          tone={ticketOk ? "good" : "bad"}
        />
      </div>

      <div
        className={`mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
          solved
            ? "bg-success/20 text-success-foreground"
            : "bg-destructive/10 text-destructive"
        }`}
        role="status"
        aria-live="polite"
      >
        <span
          className={`inline-block h-2 w-2 rounded-full ${solved ? "bg-success" : "bg-destructive"}`}
          aria-hidden="true"
        />
        {solved
          ? "Solved! You reached a sustainable budget while keeping tickets affordable."
          : statusLabel}
      </div>

      {!solved && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Tip: raise attendance and donations, trim expenses, or adjust the subscription mix. Raising
          the ticket price helps revenue but is capped at {fmtMoney(challenge.maxTicket)}.
        </p>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "good" | "bad" | "muted"
}) {
  const color =
    tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "text-foreground"
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-base font-semibold tabular-nums ${color}`}>{value}</p>
    </div>
  )
}
