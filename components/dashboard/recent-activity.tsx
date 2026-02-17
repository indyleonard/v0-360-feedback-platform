import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Brain, Send, Shield } from "lucide-react"

const activities = [
  {
    icon: CheckCircle2,
    title: "Feedback submitted",
    description: "Sarah M. completed 360 review for James K.",
    time: "2 min ago",
    iconColor: "text-success",
  },
  {
    icon: Brain,
    title: "AI questions generated",
    description: "12 role-aware questions created for Product Manager role",
    time: "15 min ago",
    iconColor: "text-primary",
  },
  {
    icon: Send,
    title: "Reminders sent",
    description: "Automated reminder sent to 23 pending reviewers",
    time: "1 hr ago",
    iconColor: "text-accent",
  },
  {
    icon: Shield,
    title: "Audit log exported",
    description: "POPIA compliance audit report downloaded",
    time: "3 hr ago",
    iconColor: "text-muted-foreground",
  },
  {
    icon: Clock,
    title: "Cycle extended",
    description: "Q1 Leadership 360 deadline moved to 28 Mar",
    time: "5 hr ago",
    iconColor: "text-warning",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5">
                <activity.icon className={`size-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
