"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Circle,
  Network,
  FileText,
  RefreshCcw,
  Shield,
  ArrowRight,
  X,
} from "lucide-react"
import Link from "next/link"

const setupSteps = [
  {
    id: "azure-ad",
    title: "Connect Azure AD",
    description: "Link your M365 tenant for SSO and Graph API sync",
    icon: Shield,
    href: "/dashboard/settings",
    completed: true,
  },
  {
    id: "org-sync",
    title: "Sync Org Chart",
    description: "Pull reporting lines and teams from Microsoft Graph",
    icon: Network,
    href: "/dashboard/org-chart",
    completed: true,
  },
  {
    id: "values",
    title: "Upload Values",
    description: "Add your values framework for AI question alignment",
    icon: FileText,
    href: "/dashboard/settings",
    completed: false,
  },
  {
    id: "first-cycle",
    title: "Launch First Cycle",
    description: "Create, approve AI questions, and distribute",
    icon: RefreshCcw,
    href: "/dashboard/cycles",
    completed: false,
  },
]

export function SetupWizard() {
  const [dismissed, setDismissed] = useState(false)
  const completedCount = setupSteps.filter((s) => s.completed).length
  const allDone = completedCount === setupSteps.length

  if (dismissed || allDone) return null

  return (
    <Card className="relative border-primary/15 bg-card shadow-sm">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground/50 hover:text-foreground transition-colors"
        aria-label="Dismiss setup wizard"
      >
        <X className="size-3.5" />
      </button>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-sm font-bold text-primary">
              {completedCount}/{setupSteps.length}
            </span>
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-card-foreground">Get Started</CardTitle>
            <CardDescription className="text-xs">
              Complete these steps to run your first feedback cycle
            </CardDescription>
          </div>
        </div>
        <div className="mt-3 h-1 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(completedCount / setupSteps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {setupSteps.map((step, index) => {
            const isNext = !step.completed && setupSteps.slice(0, index).every((s) => s.completed)
            return (
              <Link key={step.id} href={step.href}>
                <div
                  className={`group relative flex h-full flex-col rounded-lg border p-3.5 transition-all ${
                    step.completed
                      ? "border-success/20 bg-success/[0.03]"
                      : isNext
                      ? "border-primary/25 bg-primary/[0.02] ring-1 ring-primary/15"
                      : "border-border/60 bg-muted/30"
                  } hover:shadow-sm`}
                >
                  <div className="flex items-center gap-2">
                    {step.completed ? (
                      <CheckCircle2 className="size-4 text-success shrink-0" />
                    ) : (
                      <Circle className={`size-4 shrink-0 ${isNext ? "text-primary" : "text-muted-foreground/30"}`} />
                    )}
                    <span className={`text-[13px] font-semibold ${step.completed ? "text-success" : isNext ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  {isNext && (
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <span>Start</span>
                      <ArrowRight className="size-3" />
                    </div>
                  )}
                  {step.completed && (
                    <Badge variant="outline" className="mt-2 w-fit border-success/15 bg-success/8 text-success text-[9px] px-1.5 py-0">
                      Done
                    </Badge>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
