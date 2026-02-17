"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stages = [
  { name: "Nomination", count: 8, color: "bg-primary" },
  { name: "AI Suggest", count: 5, color: "bg-chart-4" },
  { name: "Approval", count: 12, color: "bg-accent" },
  { name: "Live", count: 117, color: "bg-success" },
  { name: "Complete", count: 1180, color: "bg-chart-3" },
]

const total = stages.reduce((acc, s) => acc + s.count, 0)

export function PipelineSummary() {
  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-card-foreground">Feedback Pipeline</CardTitle>
            <CardDescription className="text-xs">Employee progress across workflow stages</CardDescription>
          </div>
          <Link
            href="/dashboard/cycles"
            className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {/* Visual bar */}
        <div className="mb-5 flex h-2.5 overflow-hidden rounded-full bg-muted">
          {stages.map((stage) => {
            const pct = (stage.count / total) * 100
            if (pct < 0.5) return null
            return (
              <div
                key={stage.name}
                className={`${stage.color} first:rounded-l-full last:rounded-r-full transition-all duration-500`}
                style={{ width: `${pct}%` }}
                title={`${stage.name}: ${stage.count}`}
              />
            )
          })}
        </div>

        {/* Stage counts */}
        <div className="grid grid-cols-5 gap-1">
          {stages.map((stage) => (
            <div key={stage.name} className="flex flex-col items-center gap-1 rounded-lg py-2 transition-colors hover:bg-muted/50">
              <div className="flex items-center gap-1.5">
                <div className={`size-1.5 rounded-full ${stage.color}`} />
                <span className="text-base font-bold tabular-nums text-card-foreground">{stage.count}</span>
              </div>
              <p className="text-[10px] font-medium text-muted-foreground leading-tight text-center">
                {stage.name}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
