"use client"

import { Badge } from "@/components/ui/badge"

const steps = [
  {
    step: "01",
    title: "Connect Microsoft 365",
    description:
      "One-click Azure AD SSO setup. We sync your org chart, departments, and reporting lines via Microsoft Graph in real time.",
  },
  {
    step: "02",
    title: "AI generates role-aware questions",
    description:
      "Our AI analyses role profiles and competency frameworks to generate targeted, unbiased feedback questions. HR reviews and approves before distribution.",
  },
  {
    step: "03",
    title: "Smart reviewer suggestions",
    description:
      "Interaction metadata from Teams and Outlook suggests the most relevant reviewers. No more guesswork about who should provide feedback.",
  },
  {
    step: "04",
    title: "AI-powered narrative results",
    description:
      "Results are synthesised into clear, bias-checked narratives with benchmarking against role cohorts and actionable development insights.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
            How It Works
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From setup to insights in four steps
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 h-full w-px bg-border lg:left-1/2" />

            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`relative mb-12 flex items-start gap-8 last:mb-0 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Step number circle */}
                <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card text-primary shadow-sm lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                  <span className="text-sm font-bold">{step.step}</span>
                </div>

                {/* Content */}
                <div
                  className={`ml-8 rounded-xl border border-border bg-card p-6 shadow-sm lg:ml-0 lg:w-5/12 ${
                    index % 2 === 0 ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-card-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
