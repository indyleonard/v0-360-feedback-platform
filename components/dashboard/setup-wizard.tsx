"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Circle,
  Network,
  FileText,
  RefreshCcw,
  Shield,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react"
import Link from "next/link"

const setupSteps = [
  {
    id: "azure-ad",
    title: "Connect Azure AD",
    description: "Link your Microsoft 365 tenant for SSO and org hierarchy sync",
    detail: "Requires Tenant ID, Client ID, and admin consent for Graph API permissions",
    icon: Shield,
    href: "/dashboard/settings",
    completed: true,
  },
  {
    id: "org-sync",
    title: "Sync Org Chart",
    description: "Pull reporting lines, departments, and teams from Microsoft Graph",
    detail: "Populates the employee directory, hierarchy, and reviewer suggestion engine",
    icon: Network,
    href: "/dashboard/org-chart",
    completed: true,
  },
  {
    id: "values",
    title: "Upload Values Manifesto",
    description: "Provide your company values framework to align feedback questions",
    detail: "Used to configure signature link prompts and contextualise AI question generation",
    icon: FileText,
    href: "/dashboard/settings",
    completed: false,
  },
  {
    id: "first-cycle",
    title: "Launch First 360 Cycle",
    description: "Create a cycle, let AI generate questions, approve, and distribute",
    detail: "Employees nominate reviewers, AI suggests additional ones, managers approve, then distribution begins",
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
    <Card className="relative border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss setup wizard"
      >
        <X className="size-4" />
      </button>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-card-foreground">Get Started with CoMotion 360</CardTitle>
            <CardDescription className="mt-0.5">
              {completedCount} of {setupSteps.length} steps complete -- follow this guide to run your first feedback cycle.
            </CardDescription>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-1.5 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(completedCount / setupSteps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {setupSteps.map((step, index) => {
            const isNext = !step.completed && setupSteps.slice(0, index).every((s) => s.completed)
            return (
              <Link key={step.id} href={step.href}>
                <div
                  className={`group relative flex h-full flex-col rounded-lg border p-4 transition-all ${
                    step.completed
                      ? "border-success/20 bg-success/[0.03]"
                      : isNext
                      ? "border-primary/30 bg-primary/[0.03] ring-1 ring-primary/20"
                      : "border-border bg-card/50"
                  } hover:shadow-sm`}
                >
                  <div className="flex items-center gap-2.5">
                    {step.completed ? (
                      <CheckCircle2 className="size-5 text-success shrink-0" />
                    ) : (
                      <Circle className={`size-5 shrink-0 ${isNext ? "text-primary" : "text-muted-foreground/40"}`} />
                    )}
                    <span className={`text-sm font-semibold ${step.completed ? "text-success" : isNext ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  {isNext && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary">
                      <span>Start this step</span>
                      <ArrowRight className="size-3" />
                    </div>
                  )}
                  {step.completed && (
                    <Badge variant="outline" className="mt-3 w-fit border-success/20 bg-success/10 text-success text-[10px]">
                      Complete
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
