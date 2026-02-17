"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stages = [
  { name: "Nomination", count: 8, color: "bg-chart-1" },
  { name: "AI Suggestions", count: 5, color: "bg-chart-2" },
  { name: "Manager Approval", count: 12, color: "bg-chart-4" },
  { name: "Live", count: 117, color: "bg-success" },
  { name: "Completed", count: 1180, color: "bg-chart-3" },
]

const total = stages.reduce((acc, s) => acc + s.count, 0)

export function PipelineSummary() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">Feedback Pipeline</CardTitle>
            <CardDescription>Employee progress across the 360 workflow stages</CardDescription>
          </div>
          <Link
            href="/dashboard/cycles"
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View cycles
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {/* Visual pipeline bar */}
        <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-muted">
          {stages.map((stage) => {
            const pct = (stage.count / total) * 100
            if (pct < 0.5) return null
            return (
              <div
                key={stage.name}
                className={`${stage.color} transition-all duration-500`}
                style={{ width: `${pct}%` }}
                title={`${stage.name}: ${stage.count}`}
              />
            )
          })}
        </div>

        {/* Stage breakdown */}
        <div className="grid grid-cols-5 gap-2">
          {stages.map((stage) => (
            <div key={stage.name} className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <div className={`size-2 rounded-full ${stage.color}`} />
                <span className="text-lg font-bold text-card-foreground">{stage.count}</span>
              </div>
              <p className="mt-0.5 text-[10px] font-medium text-muted-foreground leading-tight">
                {stage.name}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
