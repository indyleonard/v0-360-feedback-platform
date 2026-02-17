"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, RefreshCcw, TrendingUp, MessageSquareLock } from "lucide-react"

const stats = [
  {
    title: "Synced Employees",
    value: "1,247",
    change: "Last sync 2 min ago",
    icon: Users,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Active Cycles",
    value: "3",
    change: "2 in nomination, 1 live",
    icon: RefreshCcw,
    iconBg: "bg-accent/8",
    iconColor: "text-accent",
  },
  {
    title: "Avg Completion",
    value: "87%",
    change: "+4% vs last cycle",
    icon: TrendingUp,
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    title: "Signature Tips",
    value: "42",
    change: "31 visible, 11 gated",
    icon: MessageSquareLock,
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
]

export function OverviewStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/60 bg-card shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-card-foreground">{stat.value}</p>
                <p className="mt-1.5 text-[11px] text-muted-foreground">{stat.change}</p>
              </div>
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`size-[18px] ${stat.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
