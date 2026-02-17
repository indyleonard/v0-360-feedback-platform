import { Card, CardContent } from "@/components/ui/card"
import { Users, RefreshCcw, TrendingUp, MessageSquare } from "lucide-react"

const stats = [
  {
    title: "Total Employees",
    value: "1,247",
    change: "+23 this month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Active Cycles",
    value: "3",
    change: "2 closing soon",
    icon: RefreshCcw,
    trend: "neutral",
  },
  {
    title: "Avg Completion",
    value: "87%",
    change: "+4% vs last cycle",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Anonymous Tips",
    value: "42",
    change: "12 this week",
    icon: MessageSquare,
    trend: "neutral",
  },
]

export function OverviewStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="size-4 text-primary" />
              </div>
            </div>
            <div className="mt-3">
              <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
