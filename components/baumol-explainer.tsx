"use client"

import { useMemo, useState } from "react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartBox } from "@/components/chart-box"

const START_YEAR = 1970
const END_YEAR = 2025
const BASE = 100

export function BaumolExplainer() {
  // Annual real wage growth in the broader economy, driven by productivity gains.
  const [productivityGrowth, setProductivityGrowth] = useState(1.8)

  const data = useMemo(() => {
    const rows = []
    for (let year = START_YEAR; year <= END_YEAR; year++) {
      const t = year - START_YEAR
      // Economy-wide output per worker compounds with productivity growth.
      const productivity = BASE * Math.pow(1 + productivityGrowth / 100, t)
      // A symphony needs the same players and the same minutes as in 1970:
      // output per musician is essentially flat.
      const orchestraOutput = BASE
      // To retain musicians, their pay must track economy-wide wages, which
      // rise with productivity even though orchestra output does not. So unit
      // cost per concert rises in step with the wider economy.
      const costPerConcert = BASE * Math.pow(1 + productivityGrowth / 100, t)
      rows.push({
        year,
        productivity: Math.round(productivity),
        orchestraOutput,
        costPerConcert: Math.round(costPerConcert),
      })
    }
    return rows
  }, [productivityGrowth])

  const last = data[data.length - 1]

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5">
        <div>
          <h3 className="text-sm font-medium text-foreground">Productivity vs. a Symphony</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            In most industries, technology lets each worker produce more over time, so wages can rise without raising
            prices. A live performance of Beethoven&apos;s Fifth still takes the same musicians and the same 35 minutes
            it always has &mdash; output per musician stays flat.
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="growth" className="text-sm font-medium text-foreground">
              Economy productivity growth
            </label>
            <span className="text-sm font-semibold tabular-nums text-foreground">{productivityGrowth.toFixed(1)}%</span>
          </div>
          <input
            id="growth"
            type="range"
            min={0}
            max={4}
            step={0.1}
            value={productivityGrowth}
            onChange={(e) => setProductivityGrowth(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <p className="mt-1 text-xs text-muted-foreground">Annual real gain in output per worker.</p>
        </div>

        <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
          By {END_YEAR}, the wider economy is{" "}
          <strong className="text-foreground">{(last.productivity / BASE).toFixed(1)}×</strong> more productive, yet the
          real cost of putting on a concert has climbed to{" "}
          <strong className="text-destructive">{(last.costPerConcert / BASE).toFixed(1)}×</strong> its 1970 level. That
          widening wedge is Baumol&apos;s cost disease.
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-medium text-foreground">
          Indexed to 100 in {START_YEAR}
        </h3>
          <ChartBox className="h-[360px] w-full">
              <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
              <defs>
                <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="year"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 12 }}
                ticks={[1970, 1985, 2000, 2015, 2025]}
              />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} width={44} />
              <Tooltip
                labelFormatter={(label) => `Year: ${label}`}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--popover-foreground)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Area
                type="monotone"
                dataKey="costPerConcert"
                name="Cost per concert"
                stroke="var(--destructive)"
                strokeWidth={2.5}
                fill="url(#costFill)"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="productivity"
                name="Economy productivity"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="orchestraOutput"
                name="Output per musician"
                stroke="var(--foreground)"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ChartBox>
        <p className="mt-3 text-xs text-muted-foreground">
          Output per musician (flat) cannot keep pace with economy-wide productivity, but musician pay must &mdash; so
          the real cost of every concert keeps rising.
        </p>
      </div>
    </div>
  )
}
