import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Brain, Send, Shield } from "lucide-react"

const activities = [
  {
    icon: CheckCircle2,
    title: "Feedback submitted",
    description: "Sarah M. completed review for James K.",
    time: "2m",
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  {
    icon: Brain,
    title: "AI questions generated",
    description: "12 questions for Product Manager",
    time: "15m",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: Send,
    title: "Reminders sent",
    description: "23 pending reviewers nudged",
    time: "1h",
    iconColor: "text-accent",
    iconBg: "bg-accent/8",
  },
  {
    icon: Shield,
    title: "Audit exported",
    description: "POPIA compliance report",
    time: "3h",
    iconColor: "text-muted-foreground",
    iconBg: "bg-muted",
  },
  {
    icon: Clock,
    title: "Deadline extended",
    description: "Q1 Leadership 360 to 28 Mar",
    time: "5h",
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-card-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md ${activity.iconBg}`}>
                <activity.icon className={`size-3.5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground leading-tight">{activity.title}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{activity.description}</p>
              </div>
              <span className="shrink-0 text-[11px] font-mono tabular-nums text-muted-foreground/60">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
