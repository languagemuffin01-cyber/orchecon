"use client"

import type { Range } from "@/lib/orchestra-model"

export function RangeSlider({
  id,
  label,
  value,
  min,
  max,
  step,
  display,
  typical,
  typicalDisplay,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  typical?: Range
  typicalDisplay?: string
  onChange: (v: number) => void
}) {
  const span = max - min
  let bandStyle: React.CSSProperties | undefined
  if (typical) {
    const lowPct = (Math.max(typical[0], min) - min) / span
    const highPct = (Math.min(typical[1], max) - min) / span
    bandStyle = {
      left: `${lowPct * 100}%`,
      width: `${Math.max(0, highPct - lowPct) * 100}%`,
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span className="text-sm font-semibold tabular-nums text-foreground">{display}</span>
      </div>
      <div className="relative flex h-5 items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-muted" />
        {bandStyle && <div className="absolute h-1.5 rounded-full bg-destructive/60" style={bandStyle} />}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full appearance-none bg-transparent accent-foreground"
        />
      </div>
      {typicalDisplay && (
        <p className="mt-1 text-xs text-muted-foreground">
          <span className="font-medium text-destructive">Typical:</span> {typicalDisplay}
        </p>
      )}
    </div>
  )
}
