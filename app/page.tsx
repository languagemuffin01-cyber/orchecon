import { SiteNav } from "@/components/site-nav"
import { OrchestraExplorer } from "@/components/orchestra-explorer"
import { BaumolExplainer } from "@/components/baumol-explainer"
import { ReviewQuestions } from "@/components/review-questions"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-background">
      <SiteNav />

      {/* Overview */}
      <section id="overview" className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <ScrollReveal>
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            A Closer Look
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            The Economics of Orchestras
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Once central pillars of cultural life, orchestras now compete inside a crowded modern
            entertainment market. That change has made their underlying finances harder than ever to
            keep balanced.
          </p>
        </header>

        <div className="flex max-w-3xl flex-col gap-8">
          <article>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Costs and Revenue</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              A large share of an orchestra&apos;s budget is locked into fixed costs &mdash; musician
              and conductor salaries, plus venue expenses &mdash; on top of variable costs like guest
              soloists and extra rehearsal time. Earned income from tickets, subscriptions, and
              touring tends to fall short of total spending, so most ensembles lean on donations and
              grants to close the gap.
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-foreground">The Financial Challenge</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Climbing labor, venue, and marketing costs paired with flat earned revenue produce a
              delicate economic model. Audiences grow slowly while streaming and digital media keep
              pulling attention away.
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-foreground">Why It Happens</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Much of this traces back to Baumol&apos;s cost disease: expenses rise over time even
              when productivity does not, because a symphony still needs the same musicians and the
              same performance length it always has. Costs outpace earned revenue, leaving orchestras
              increasingly reliant on outside funding to stay sustainable.
            </p>
          </article>
        </div>
        </ScrollReveal>
      </section>

      {/* Interactive model */}
      <section id="model" className="border-t border-border bg-muted/30">
        <ScrollReveal className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div>
          <div className="mb-6 max-w-3xl">
            <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">
              Explore the Break-Even Model
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Adjust the inputs to see how venue size, salaries, ticket pricing, subscriptions, and
              donations shape whether a season ends in the black or the red. Switch to{" "}
              <strong className="text-foreground">Can You Save the Orchestra?</strong> to take on a
              struggling orchestra and try to reach a sustainable budget, or pin scenarios to compare
              different orchestras side by side.
            </p>
          </div>
          <OrchestraExplorer />
          </div>
        </ScrollReveal>
      </section>

      {/* Costs & revenue narrative anchor (shares the model section visuals) */}
      <section id="breakdown" className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <ScrollReveal>
        <div className="max-w-3xl">
          <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">
            Reading the Costs and Revenue
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            The donut charts above split the budget into fixed and variable costs and the income into
            earned versus contributed sources. The funding-gap panel then shows the single most
            important number in orchestral finance: how much philanthropy must cover after every
            ticket is sold.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-pretty leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">Fixed costs dominate.</strong> Salaries and artistic
              leadership cannot shrink without changing the art itself.
            </li>
            <li>
              <strong className="text-foreground">Earned income hits a ceiling.</strong> Halls only
              hold so many seats, and prices can only rise so far before audiences fall away.
            </li>
            <li>
              <strong className="text-foreground">Donations fill the rest.</strong> The gap between
              the two is structural, not a sign of mismanagement.
            </li>
          </ul>
        </div>
        </ScrollReveal>
      </section>

      {/* Baumol */}
      <section id="baumol" className="border-t border-border bg-muted/30">
        <ScrollReveal className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div>
          <div className="mb-6 max-w-3xl">
            <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">
              Baumol&apos;s Cost Disease
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Economist William Baumol observed that wages rise across the whole economy as
              productivity improves &mdash; but some work, like a live string quartet, can&apos;t be
              sped up. The performing arts must still pay competitive wages, so their costs climb even
              though their output per musician never changes.
            </p>
          </div>
          <BaumolExplainer />
          </div>
        </ScrollReveal>
      </section>

      {/* What you should learn */}
      <section id="learn" className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <ScrollReveal>
        <div className="max-w-3xl">
          <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">
            What You Should Learn
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            After exploring the model and working through the scenarios, you should be able to:
          </p>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Why orchestras depend on donations",
              body: "Explain why earned income from tickets and touring almost never covers a full budget, and why contributed income is structural rather than optional.",
            },
            {
              title: "Baumol's cost disease",
              body: "Understand why costs rise over time even when productivity stays flat, because a symphony still needs the same musicians and the same performance length.",
            },
            {
              title: "The price–attendance trade-off",
              body: "Describe how raising ticket prices can lift revenue but risks shrinking the audience, and why there is a limit to how far prices can climb.",
            },
            {
              title: "Why balancing the budget is hard",
              body: "Recognize how fixed costs, capped earned revenue, and volatile donations combine to make a sustainable orchestra budget genuinely difficult to reach.",
            },
          ].map((item, i) => (
            <li key={item.title} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </ScrollReveal>
      </section>

      {/* Review questions */}
      <section id="review" className="border-t border-border bg-muted/30">
        <ScrollReveal className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div>
          <div className="mb-6 max-w-3xl">
            <h2 className="text-balance text-2xl font-semibold text-foreground md:text-3xl">
              Check Your Understanding
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Try answering each question before revealing the answer.
            </p>
          </div>
          <div className="max-w-3xl">
            <ReviewQuestions />
          </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground">
          An interactive look at why orchestras depend on more than ticket sales.
        </div>
      </footer>
    </main>
  )
}
