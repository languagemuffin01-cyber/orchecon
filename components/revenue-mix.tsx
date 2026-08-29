"use client"

import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { fmtCompact, fmtMoney, type Model } from "@/lib/orchestra-model"
import { ChartBox } from "@/components/chart-box"

const COLORS: Record<string, string> = {
  single: "var(--chart-3)",
  subscriptions: "var(--chart-5)",
  touring: "var(--chart-1)",
  donations: "var(--destructive)",
}

export function RevenueMix({ model }: { model: Model }) {
  const data = model.revenue.map((r) => ({ ...r, color: COLORS[r.key] ?? "var(--muted-foreground)" }))
  const earnedPct = (model.earnedRevenue / model.totalRevenue) * 100
  const contributedPct = 100 - earnedPct

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-medium text-foreground">Where the Money Comes From</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Income mix at the current attendance &mdash; ticket sales rarely cover the whole budget.
      </p>

      <div className="mt-4 grid items-center gap-4 sm:grid-cols-[160px_1fr]">
        <div className="relative h-[160px] w-full">
          <ChartBox className="h-full w-full">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={1}
                stroke="var(--card)"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name) => [fmtMoney(value), name as string]}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--popover-foreground)",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ChartBox>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Total</span>
            <span className="text-sm font-semibold text-foreground">{fmtCompact(model.totalRevenue)}</span>
          </div>
        </div>

        <ul className="flex flex-col gap-1.5">
          {data.map((d) => (
            <li key={d.key} className="flex items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} aria-hidden />
                {d.label}
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70">{d.kind}</span>
              </span>
              <span className="font-medium tabular-nums text-foreground">{fmtCompact(d.value)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <div className="flex h-2 w-full overflow-hidden rounded-full">
          <div className="h-full bg-foreground" style={{ width: `${earnedPct}%` }} />
          <div className="h-full bg-destructive/60" style={{ width: `${contributedPct}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">{earnedPct.toFixed(0)}%</strong> earned
          </span>
          <span>
            <strong className="text-foreground">{contributedPct.toFixed(0)}%</strong> contributed
          </span>
        </div>
      </div>
    </div>
  )
}
