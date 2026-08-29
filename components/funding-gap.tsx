"use client"

import { fmtCompact, fmtMoney, type Model } from "@/lib/orchestra-model"

export function FundingGap({ model, attendance }: { model: Model; attendance: number }) {
  const max = Math.max(model.totalCost, model.totalRevenue, model.earnedRevenue, 1)
  const sustainable = model.totalResult >= 0

  const Bar = ({ label, value, className }: { label: string; value: number; className: string }) => (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums text-foreground">{fmtCompact(value)}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  )

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-medium text-foreground">The Funding Gap</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        At <strong className="text-foreground">{attendance}%</strong> average attendance, here is how earned income
        stacks up against the budget.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <Bar label="Total cost" value={model.totalCost} className="bg-foreground" />
        <Bar label="Earned revenue (tickets + touring)" value={model.earnedRevenue} className="bg-muted-foreground" />
        <Bar label="Earned + donations & grants" value={model.totalRevenue} className="bg-destructive/60" />
      </div>

      <div className="mt-5 rounded-md bg-muted p-4">
        {model.donationShortfall > 0 ? (
          <>
            <p className="text-sm text-muted-foreground">
              Ticket and touring income leaves a gap of{" "}
              <strong className="text-destructive">{fmtMoney(model.donationShortfall)}</strong> that must be filled by
              donations and grants.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Contributed income of <strong className="text-foreground">{fmtMoney(model.contributedRevenue)}</strong>{" "}
              covers{" "}
              <strong className={model.donationCoverage >= 1 ? "text-foreground" : "text-destructive"}>
                {Math.round(model.donationCoverage * 100)}%
              </strong>{" "}
              of that gap &mdash;{" "}
              {sustainable ? (
                <span className="text-foreground">the season balances.</span>
              ) : (
                <span className="text-destructive">
                  still short {fmtMoney(model.totalCost - model.totalRevenue)}.
                </span>
              )}
            </p>
          </>
        ) : (
          <p className="text-sm text-foreground">
            Earned income alone covers the budget &mdash; a rare position for a live orchestra.
          </p>
        )}
      </div>
    </div>
  )
}
