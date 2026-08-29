export type CityKey = "major" | "regional" | "chamber" | "community"

export type Inputs = {
  venue: number
  salary: number
  orchestra: number
  ticket: number
  performances: number
  attendance: number // % of seats sold across the season (0-100)
  subscriberShare: number // % of sold seats that are subscriptions (0-100)
  subDiscount: number // % discount on subscription seats vs single price (0-100)
  touring: number // touring & media income ($/yr)
  donations: number // donations, grants & endowment draw ($/yr)
}

export type Preset = { label: string } & Inputs

// Realistic, illustrative presets for four tiers of orchestra.
export const PRESETS: Record<CityKey, Preset> = {
  major: {
    label: "Major Metropolitan",
    salary: 150000,
    orchestra: 100,
    venue: 2700,
    ticket: 75,
    performances: 150,
    attendance: 78,
    subscriberShare: 45,
    subDiscount: 20,
    touring: 2500000,
    donations: 12000000,
  },
  regional: {
    label: "Regional",
    salary: 65000,
    orchestra: 75,
    venue: 1800,
    ticket: 45,
    performances: 60,
    attendance: 72,
    subscriberShare: 40,
    subDiscount: 18,
    touring: 400000,
    donations: 4500000,
  },
  chamber: {
    label: "Chamber Orchestra",
    salary: 45000,
    orchestra: 25,
    venue: 700,
    ticket: 40,
    performances: 30,
    attendance: 68,
    subscriberShare: 35,
    subDiscount: 15,
    touring: 150000,
    donations: 1300000,
  },
  community: {
    label: "Community",
    salary: 12000,
    orchestra: 40,
    venue: 600,
    ticket: 22,
    performances: 12,
    attendance: 60,
    subscriberShare: 25,
    subDiscount: 12,
    touring: 20000,
    donations: 700000,
  },
}

// --- Real orchestras --------------------------------------------------------
// Figures for actual institutions, drawn from public financial reports, CBAs,
// and venue data. Values not publicly disclosed at this granularity (e.g.
// subscriber mix, exact attendance) are reasonable estimates within the
// typical range for a major orchestra — see `source` on each entry. The cost
// model itself is a simplified teaching tool, not these organizations'
// actual accounting, so totals will approximate but not exactly match
// reported figures.
export type RealOrgKey = "berlinPhil" | "nyPhil" | "chicagoSymphony"

export type RealPreset = Preset & {
  tier: CityKey // which tier's "typical" guidance band to show for comparison
  source: string
  sourceUrl: string
}

export const REAL_PRESETS: Record<RealOrgKey, RealPreset> = {
  berlinPhil: {
    label: "Berlin Philharmonic",
    tier: "major",
    salary: 123000,
    orchestra: 128,
    venue: 2440,
    ticket: 75,
    performances: 110,
    attendance: 90,
    subscriberShare: 40,
    subDiscount: 15,
    touring: 2000000,
    donations: 15600000,
    source:
      "128 musicians, 2,440-seat Philharmonie Grand Hall; tutti players average ~€114,000/yr; ~€14.4M Berlin Senate subsidy (~50% of budget), 2024",
    sourceUrl: "https://www.berliner-philharmoniker.de/en/",
  },
  nyPhil: {
    label: "New York Philharmonic",
    tier: "major",
    salary: 205000,
    orchestra: 106,
    venue: 2200,
    ticket: 88,
    performances: 170,
    attendance: 85,
    subscriberShare: 45,
    subDiscount: 20,
    touring: 3000000,
    donations: 67900000,
    source:
      "$205,000 musician base pay (2024 contract); 2,200-seat David Geffen Hall; $67.9M in contributions, FY2024 (Form 990)",
    sourceUrl: "https://projects.propublica.org/nonprofits/organizations/131664054",
  },
  chicagoSymphony: {
    label: "Chicago Symphony Orchestra",
    tier: "major",
    salary: 175000,
    orchestra: 100,
    venue: 2522,
    ticket: 79,
    performances: 150,
    attendance: 77,
    subscriberShare: 40,
    subDiscount: 15,
    touring: 10300000,
    donations: 46300000,
    source:
      "$23M in ticket sales across ~292,000 tickets at 77% attendance; $46.3M in contributed income, FY2024 (CSO financial report)",
    sourceUrl: "https://cso.org/about/csoa/annual-reports/",
  },
}

// --- Challenge scenarios ---------------------------------------------------
// Each challenge drops the user into an orchestra that is losing money. The
// goal is to reach a sustainable budget (total result >= 0) without pushing the
// average ticket price above `maxTicket`, which would price out the audience.
export type Challenge = {
  id: string
  title: string
  brief: string
  maxTicket: number
  start: Inputs
}

export const CHALLENGES: Challenge[] = [
  {
    id: "community",
    title: "Save the Community Orchestra",
    brief:
      "A beloved small-town orchestra is deep in the red. Keep it playing without turning concerts into a luxury only a few can afford.",
    maxTicket: 45,
    start: {
      salary: 15000,
      orchestra: 40,
      venue: 600,
      ticket: 20,
      performances: 12,
      attendance: 55,
      subscriberShare: 25,
      subDiscount: 12,
      touring: 20000,
      donations: 500000,
    },
  },
  {
    id: "university",
    title: "The University Ensemble",
    brief:
      "A campus orchestra runs on thin margins and student-priced tickets. Balance the books while keeping seats affordable for students.",
    maxTicket: 35,
    start: {
      salary: 10000,
      orchestra: 45,
      venue: 700,
      ticket: 15,
      performances: 16,
      attendance: 50,
      subscriberShare: 20,
      subDiscount: 10,
      touring: 8000,
      donations: 350000,
    },
  },
  {
    id: "metro",
    title: "Metropolitan in the Red",
    brief:
      "A major orchestra with a full roster and a grand hall is spending far more than it earns. Find a sustainable path at big-city scale.",
    maxTicket: 150,
    start: {
      salary: 150000,
      orchestra: 100,
      venue: 2700,
      ticket: 75,
      performances: 150,
      attendance: 65,
      subscriberShare: 45,
      subDiscount: 20,
      touring: 2000000,
      donations: 6000000,
    },
  },
  {
    id: "donor-drop",
    title: "After the Donations Dried Up",
    brief:
      "A regional orchestra just lost its largest donor and attendance is slipping. Rebuild a sustainable budget after the funding shock.",
    maxTicket: 80,
    start: {
      salary: 65000,
      orchestra: 75,
      venue: 1800,
      ticket: 45,
      performances: 60,
      attendance: 65,
      subscriberShare: 40,
      subDiscount: 18,
      touring: 400000,
      donations: 3500000,
    },
  },
]

export type Range = [number, number]

export type Metric =
  | "venue"
  | "salary"
  | "orchestra"
  | "ticket"
  | "performances"
  | "attendance"
  | "subscriberShare"
  | "subDiscount"
  | "touring"
  | "donations"

// Typical [low, high] real-world ranges per orchestra type, used for the
// red guidance bands on the sliders.
export const TYPICAL: Record<CityKey, Partial<Record<Metric, Range>>> = {
  major: {
    venue: [2200, 3000],
    salary: [110000, 175000],
    orchestra: [90, 110],
    ticket: [50, 150],
    performances: [120, 180],
    attendance: [70, 90],
    subscriberShare: [35, 60],
    subDiscount: [15, 30],
    touring: [1000000, 5000000],
    donations: [6000000, 20000000],
  },
  regional: {
    venue: [1200, 2200],
    salary: [40000, 90000],
    orchestra: [60, 85],
    ticket: [30, 70],
    performances: [40, 90],
    attendance: [60, 85],
    subscriberShare: [30, 55],
    subDiscount: [12, 25],
    touring: [100000, 800000],
    donations: [1500000, 5000000],
  },
  chamber: {
    venue: [400, 1000],
    salary: [30000, 60000],
    orchestra: [18, 40],
    ticket: [25, 60],
    performances: [20, 45],
    attendance: [55, 80],
    subscriberShare: [25, 45],
    subDiscount: [10, 20],
    touring: [50000, 300000],
    donations: [400000, 1500000],
  },
  community: {
    venue: [300, 900],
    salary: [10000, 25000],
    orchestra: [30, 60],
    ticket: [12, 35],
    performances: [6, 20],
    attendance: [45, 75],
    subscriberShare: [15, 40],
    subDiscount: [8, 18],
    touring: [0, 60000],
    donations: [80000, 900000],
  },
}

// Slider hard limits.
export const LIMITS: Record<Metric, { min: number; max: number; step: number }> = {
  venue: { min: 200, max: 3500, step: 50 },
  salary: { min: 10000, max: 220000, step: 1000 },
  orchestra: { min: 15, max: 135, step: 1 },
  ticket: { min: 10, max: 200, step: 1 },
  performances: { min: 6, max: 180, step: 1 },
  attendance: { min: 20, max: 100, step: 1 },
  subscriberShare: { min: 0, max: 80, step: 1 },
  subDiscount: { min: 0, max: 50, step: 1 },
  touring: { min: 0, max: 12000000, step: 100000 },
  donations: { min: 0, max: 80000000, step: 250000 },
}

export type CostComponent = { key: string; label: string; value: number; kind: "fixed" | "variable" }
export type RevenueComponent = { key: string; label: string; value: number; kind: "earned" | "contributed" }

export type Model = {
  costs: CostComponent[]
  fixedCost: number
  variableCost: number
  totalCost: number
  // revenue at the chosen attendance level
  revenue: RevenueComponent[]
  ticketRevenue: number
  earnedRevenue: number
  contributedRevenue: number
  totalRevenue: number
  // the operating result at the chosen attendance
  earnedResult: number // earned - cost (the funding gap if negative)
  totalResult: number // total (incl. donations) - cost
  donationShortfall: number // how much contributed income must cover the gap
  donationCoverage: number // donations / shortfall (>=1 means sustainable)
  // break-even on earned income only
  breakEvenPct: number
  effectivePrice: number
  // series for the chart: gain/loss across 0-100% attendance
  series: { pct: number; earned: number; total: number }[]
}

function effectiveTicketPrice(i: Inputs) {
  const subShare = i.subscriberShare / 100
  const subPrice = i.ticket * (1 - i.subDiscount / 100)
  return subShare * subPrice + (1 - subShare) * i.ticket
}

function ticketRevenueAt(i: Inputs, fillFraction: number) {
  const seatsSold = i.venue * i.performances * fillFraction
  return seatsSold * effectiveTicketPrice(i)
}

export function computeModel(i: Inputs): Model {
  // --- Costs ---
  const musicians = i.orchestra * i.salary
  const conductor = i.salary * 3 // music director + artistic leadership premium
  const marketingAdmin = 0.35 * musicians // development, marketing & administrative staff
  const venueFacilities = i.performances * i.venue * 8 // hall & production per seat-concert
  const guestArtists = i.performances * 6000
  const production = i.performances * i.orchestra * 150 // per-service extras & rehearsal

  const costs: CostComponent[] = [
    { key: "musicians", label: "Musician salaries", value: musicians, kind: "fixed" },
    { key: "conductor", label: "Conductor & artistic", value: conductor, kind: "fixed" },
    { key: "marketingAdmin", label: "Marketing & admin", value: marketingAdmin, kind: "fixed" },
    { key: "venueFacilities", label: "Venue & facilities", value: venueFacilities, kind: "variable" },
    { key: "guestArtists", label: "Guest artists", value: guestArtists, kind: "variable" },
    { key: "production", label: "Production & rehearsal", value: production, kind: "variable" },
  ]
  const fixedCost = costs.filter((c) => c.kind === "fixed").reduce((s, c) => s + c.value, 0)
  const variableCost = costs.filter((c) => c.kind === "variable").reduce((s, c) => s + c.value, 0)
  const totalCost = fixedCost + variableCost

  // --- Revenue at chosen attendance ---
  const fill = i.attendance / 100
  const seatsSold = i.venue * i.performances * fill
  const subShare = i.subscriberShare / 100
  const subPrice = i.ticket * (1 - i.subDiscount / 100)
  const subscriptionRevenue = seatsSold * subShare * subPrice
  const singleRevenue = seatsSold * (1 - subShare) * i.ticket
  const ticketRevenue = subscriptionRevenue + singleRevenue

  const revenue: RevenueComponent[] = [
    { key: "single", label: "Single tickets", value: singleRevenue, kind: "earned" },
    { key: "subscriptions", label: "Subscriptions", value: subscriptionRevenue, kind: "earned" },
    { key: "touring", label: "Touring & media", value: i.touring, kind: "earned" },
    { key: "donations", label: "Donations & grants", value: i.donations, kind: "contributed" },
  ]
  const earnedRevenue = ticketRevenue + i.touring
  const contributedRevenue = i.donations
  const totalRevenue = earnedRevenue + contributedRevenue

  const earnedResult = earnedRevenue - totalCost
  const totalResult = totalRevenue - totalCost
  const donationShortfall = Math.max(0, totalCost - earnedRevenue)
  const donationCoverage = donationShortfall > 0 ? i.donations / donationShortfall : Infinity

  // --- Break-even on earned income only ---
  const effectivePrice = effectiveTicketPrice(i)
  const ticketNeeded = totalCost - i.touring
  const seatsForBreakEven = effectivePrice > 0 ? ticketNeeded / effectivePrice : Infinity
  const capacity = i.venue * i.performances
  const breakEvenPct = capacity > 0 ? (seatsForBreakEven / capacity) * 100 : Infinity

  // --- Series across 0-100% attendance ---
  const series = []
  for (let pct = 0; pct <= 100; pct++) {
    const earned = ticketRevenueAt(i, pct / 100) + i.touring - totalCost
    series.push({ pct, earned, total: earned + i.donations })
  }

  return {
    costs,
    fixedCost,
    variableCost,
    totalCost,
    revenue,
    ticketRevenue,
    earnedRevenue,
    contributedRevenue,
    totalRevenue,
    earnedResult,
    totalResult,
    donationShortfall,
    donationCoverage,
    breakEvenPct,
    effectivePrice,
    series,
  }
}

export function fmtMoney(n: number) {
  return (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString()
}

export function fmtCompact(n: number) {
  const abs = Math.abs(n)
  const sign = n < 0 ? "-" : ""
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`
  if (abs >= 1_000) return `${sign}$${Math.round(abs / 1_000)}k`
  return `${sign}$${Math.round(abs)}`
}
