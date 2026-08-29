"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { fmtCompact, fmtMoney, type Model } from "@/lib/orchestra-model"
import { ChartBox } from "@/components/chart-box"

export function BreakEvenChart({ model, attendance }: { model: Model; attendance: number }) {
  const { series, breakEvenPct } = model

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-foreground">Annual Gain / Loss vs. Attendance</h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-foreground" aria-hidden /> Earned only
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-destructive" aria-hidden /> With donations
          </span>
        </div>
      </div>
      <ChartBox className="h-[400px] w-full">
          <LineChart data={series} margin={{ top: 8, right: 16, bottom: 16, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="pct"
              type="number"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 12 }}
              label={{
                value: "Average Attendance",
                position: "insideBottom",
                offset: -8,
                fontSize: 12,
                fill: "var(--muted-foreground)",
              }}
            />
            <YAxis
              tickFormatter={fmtCompact}
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 12 }}
              width={64}
            />
            <Tooltip
              formatter={(value: number, name) => [fmtMoney(value), name as string]}
              labelFormatter={(label) => `Attendance: ${label}%`}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--popover-foreground)",
                fontSize: "12px",
              }}
            />
            <ReferenceLine y={0} stroke="var(--muted-foreground)" strokeWidth={1.5} />
            <ReferenceLine
              x={attendance}
              stroke="var(--muted-foreground)"
              strokeDasharray="4 4"
              label={{ value: "now", position: "top", fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Line
              type="monotone"
              dataKey="earned"
              name="Earned only"
              stroke="var(--foreground)"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="With donations"
              stroke="var(--destructive)"
              strokeWidth={2.5}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
      </ChartBox>
      <p className="mt-3 text-xs text-muted-foreground">
        {Number.isFinite(breakEvenPct) && breakEvenPct <= 100 ? (
          <>
            Ticket and touring income alone breaks even at{" "}
            <strong className="text-foreground">{breakEvenPct.toFixed(0)}%</strong> attendance. The green line shows how
            donations lift the result above zero.
          </>
        ) : (
          <>
            Even a sold-out season cannot break even on earned income alone &mdash; donations (green line) are essential.
          </>
        )}
      </p>
    </div>
  )
}
