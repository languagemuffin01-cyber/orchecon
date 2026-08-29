"use client"

import { fmtCompact, type Inputs } from "@/lib/orchestra-model"

export type Scenario = {
  id: string
  name: string
  inputs: Inputs
  totalCost: number
  earnedRevenue: number
  totalRevenue: number
  breakEvenPct: number
  totalResult: number
}

export function CompareScenarios({
  scenarios,
  onRemove,
}: {
  scenarios: Scenario[]
  onRemove: (id: string) => void
}) {
  if (scenarios.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Pin scenarios with the button above to compare different orchestra setups side by side.
        </p>
      </div>
    )
  }

  const rows: { label: string; get: (s: Scenario) => string; danger?: (s: Scenario) => boolean }[] = [
    { label: "Orchestra size", get: (s) => `${s.inputs.orchestra}` },
    { label: "Musician salary", get: (s) => fmtCompact(s.inputs.salary) },
    { label: "Venue / performances", get: (s) => `${s.inputs.venue.toLocaleString()} × ${s.inputs.performances}` },
    { label: "Avg. ticket", get: (s) => fmtCompact(s.inputs.ticket) },
    { label: "Attendance", get: (s) => `${s.inputs.attendance}%` },
    { label: "Total cost", get: (s) => fmtCompact(s.totalCost) },
    { label: "Earned revenue", get: (s) => fmtCompact(s.earnedRevenue) },
    {
      label: "Break-even attendance",
      get: (s) => (Number.isFinite(s.breakEvenPct) && s.breakEvenPct <= 100 ? `${s.breakEvenPct.toFixed(0)}%` : "Never"),
      danger: (s) => !(Number.isFinite(s.breakEvenPct) && s.breakEvenPct <= 100),
    },
    {
      label: "Net result (with donations)",
      get: (s) => fmtCompact(s.totalResult),
      danger: (s) => s.totalResult < 0,
    },
  ]

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-left font-medium text-muted-foreground">Metric</th>
            {scenarios.map((s) => (
              <th key={s.id} className="p-3 text-left font-semibold text-foreground">
                <div className="flex items-center justify-between gap-2">
                  <span>{s.name}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(s.id)}
                    className="rounded px-1.5 py-0.5 text-xs font-normal text-muted-foreground hover:bg-muted hover:text-destructive"
                    aria-label={`Remove ${s.name}`}
                  >
                    Remove
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-border last:border-0">
              <td className="p-3 text-muted-foreground">{r.label}</td>
              {scenarios.map((s) => (
                <td
                  key={s.id}
                  className={`p-3 font-medium tabular-nums ${r.danger?.(s) ? "text-destructive" : "text-foreground"}`}
                >
                  {r.get(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
