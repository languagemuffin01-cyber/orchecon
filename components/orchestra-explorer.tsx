"use client"

import { useMemo, useState } from "react"
import {
  CHALLENGES,
  computeModel,
  fmtCompact,
  fmtMoney,
  LIMITS,
  PRESETS,
  REAL_PRESETS,
  TYPICAL,
  type Challenge,
  type CityKey,
  type Inputs,
  type Metric,
  type Preset,
  type RealOrgKey,
  type RealPreset,
} from "@/lib/orchestra-model"
import { RangeSlider } from "@/components/range-slider"
import { BreakEvenChart } from "@/components/break-even-chart"
import { CostBreakdown } from "@/components/cost-breakdown"
import { RevenueMix } from "@/components/revenue-mix"
import { FundingGap } from "@/components/funding-gap"
import { CompareScenarios, type Scenario } from "@/components/compare-scenarios"
import { ChallengePanel } from "@/components/challenge-panel"

type Mode = "explore" | "challenge"
type PresetKey = CityKey | RealOrgKey

function rangeText(r: [number, number] | undefined, fmt: (n: number) => string) {
  if (!r) return ""
  return `${fmt(r[0])} – ${fmt(r[1])}`
}

function isRealOrg(key: PresetKey): key is RealOrgKey {
  return key in REAL_PRESETS
}

function presetFor(key: PresetKey): Preset | RealPreset {
  return isRealOrg(key) ? REAL_PRESETS[key] : PRESETS[key]
}

export function OrchestraExplorer() {
  const [mode, setMode] = useState<Mode>("explore")
  const [hasClickedChallenge, setHasClickedChallenge] = useState(false)
  const [city, setCity] = useState<PresetKey>("major")
  const [inputs, setInputs] = useState<Inputs>(() => {
    const { label, ...rest } = PRESETS.major
    return rest
  })
  const [scenarios, setScenarios] = useState<Scenario[]>([])

  const [challenge, setChallenge] = useState<Challenge>(CHALLENGES[0])
  const startingResult = useMemo(
    () => computeModel(challenge.start).totalResult,
    [challenge],
  )

  const model = useMemo(() => computeModel(inputs), [inputs])
  const typical = mode === "explore" ? TYPICAL[isRealOrg(city) ? REAL_PRESETS[city].tier : city] : {}
  const isProfitable = model.totalResult >= 0
  const statusLabel = isProfitable ? "Operating surplus" : "Operating deficit"

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  function applyPreset(key: PresetKey) {
    setCity(key)
    if (isRealOrg(key)) {
      const { label, tier, source, sourceUrl, ...rest } = REAL_PRESETS[key]
      setInputs(rest)
    } else {
      const { label, ...rest } = PRESETS[key]
      setInputs(rest)
    }
  }

  function startChallenge(ch: Challenge) {
    setChallenge(ch)
    setInputs({ ...ch.start })
  }

  function switchMode(next: Mode) {
    setMode(next)
    if (next === "challenge") {
      setInputs({ ...challenge.start })
      setHasClickedChallenge(true)
    } else {
      applyPreset(city)
    }
  }

  function pinScenario() {
    if (scenarios.length >= 3) return
    const m = model
    const name =
      mode === "challenge" ? challenge.title : `${presetFor(city).label} ${scenarios.length + 1}`
    setScenarios((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        inputs: { ...inputs },
        totalCost: m.totalCost,
        earnedRevenue: m.earnedRevenue,
        totalRevenue: m.totalRevenue,
        breakEvenPct: m.breakEvenPct,
        totalResult: m.totalResult,
      },
    ])
  }

  function removeScenario(id: string) {
    setScenarios((prev) => prev.filter((s) => s.id !== id))
  }

  const slider = (
    metric: Metric,
    label: string,
    display: (n: number) => string,
    typicalFmt: (n: number) => string = display,
  ) => (
    <RangeSlider
      id={metric}
      label={label}
      value={inputs[metric]}
      min={LIMITS[metric].min}
      max={LIMITS[metric].max}
      step={LIMITS[metric].step}
      display={display(inputs[metric])}
      typical={typical[metric]}
      typicalDisplay={rangeText(typical[metric], typicalFmt)}
      onChange={(v) => set(metric, v)}
    />
  )

  return (
    <div
      className={`flex flex-col gap-6 rounded-xl border p-3 transition-colors duration-500 sm:p-4 ${
        isProfitable
          ? "border-green-500/40 bg-green-500/[0.03]"
          : "border-red-500/40 bg-red-500/[0.03]"
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-colors duration-500 ${
          isProfitable
            ? "border-green-500/30 bg-green-500/10"
            : "border-red-500/30 bg-red-500/10"
        }`}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Current season status</p>
          <p className={`mt-1 text-sm font-semibold ${isProfitable ? "text-green-500" : "text-red-500"}`}>
            {statusLabel}
          </p>
        </div>
        <p className={`text-lg font-semibold tabular-nums ${isProfitable ? "text-green-500" : "text-red-500"}`}>
          {model.totalResult >= 0 ? "+" : ""}{fmtMoney(model.totalResult)}
        </p>
      </div>

      {/* Mode toggle */}
      <div className="inline-flex w-fit rounded-lg border border-border bg-card p-1">
        {(["explore", "challenge"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            } ${m === "challenge" && !hasClickedChallenge ? "animate-glow-yellow" : ""}`}
          >
            {m === "explore" ? "Free Explore" : "Can You Save the Orchestra?"}
          </button>
        ))}
      </div>

      {/* Controls + right column */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5">
          {mode === "explore" ? (
            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-medium text-foreground">
                Orchestra Type
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => applyPreset(e.target.value as PresetKey)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                <optgroup label="Illustrative Tiers">
                  {(Object.keys(PRESETS) as CityKey[]).map((key) => (
                    <option key={key} value={key}>
                      {PRESETS[key].label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Real Orchestras (public data)">
                  {(Object.keys(REAL_PRESETS) as RealOrgKey[]).map((key) => (
                    <option key={key} value={key}>
                      {REAL_PRESETS[key].label}
                    </option>
                  ))}
                </optgroup>
              </select>
              {isRealOrg(city) && (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Source:</span>{" "}
                  {REAL_PRESETS[city].source}. Figures not publicly broken out (subscriber mix,
                  exact touring split) are estimated. Note too that this model only itemizes core
                  artistic costs &mdash; it omits benefits, capital reserves, and education programs
                  that real budgets carry, so the result below will look healthier than this
                  organization&apos;s actual reported bottom line.
                </p>
              )}
            </div>
          ) : (
            <div>
              <label htmlFor="challenge" className="mb-2 block text-sm font-medium text-foreground">
                Choose a Scenario
              </label>
              <select
                id="challenge"
                value={challenge.id}
                onChange={(e) => {
                  const next = CHALLENGES.find((c) => c.id === e.target.value)
                  if (next) startChallenge(next)
                }}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                {CHALLENGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Operations</p>
          {slider("venue", "Venue Size (seats)", (n) => n.toLocaleString())}
          {slider("salary", "Musician's Salary ($/yr)", fmtMoney, fmtCompact)}
          {slider("orchestra", "Orchestra Size", (n) => String(n))}
          {slider("performances", "Performances / Year", (n) => String(n))}
          {slider("attendance", "Avg. Attendance (%)", (n) => `${n}%`)}

          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Revenue &amp; funding</p>
          {slider("ticket", "Avg. Ticket Price ($)", fmtMoney)}
          {slider("subscriberShare", "Subscriber Share (%)", (n) => `${n}%`)}
          {slider("subDiscount", "Subscription Discount (%)", (n) => `${n}%`)}
          {slider("touring", "Touring & Media ($/yr)", fmtCompact)}
          {slider("donations", "Donations & Grants ($/yr)", fmtCompact)}

          <button
            type="button"
            onClick={pinScenario}
            disabled={scenarios.length >= 3}
            className="mt-1 rounded-md border border-border bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {scenarios.length >= 3 ? "Compare limit reached (3)" : "Pin scenario to compare"}
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {mode === "challenge" && (
            <ChallengePanel
              challenge={challenge}
              model={model}
              ticket={inputs.ticket}
              startingResult={startingResult}
              onReset={() => startChallenge(challenge)}
            />
          )}
          <BreakEvenChart model={model} attendance={inputs.attendance} />
        </div>
      </div>

      {/* Cost + revenue breakdowns */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CostBreakdown model={model} />
        <RevenueMix model={model} />
      </div>

      {/* Funding gap */}
      <FundingGap model={model} attendance={inputs.attendance} />

      {/* Compare */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-foreground">Saved scenarios</h3>
        <CompareScenarios scenarios={scenarios} onRemove={removeScenario} />
      </div>
    </div>
  )
}
