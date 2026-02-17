import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Send, Brain, Download } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "New Cycle",
    description: "Launch a feedback cycle",
    icon: Plus,
    href: "/dashboard/cycles",
    highlight: true,
  },
  {
    title: "Send Reminders",
    description: "Nudge pending reviewers",
    icon: Send,
    href: "/dashboard/cycles",
    highlight: false,
  },
  {
    title: "AI Questions",
    description: "Generate role-aware questions",
    icon: Brain,
    href: "/dashboard/questions",
    highlight: false,
  },
  {
    title: "Export Reports",
    description: "Download PDF / Excel",
    icon: Download,
    href: "/dashboard/reports",
    highlight: false,
  },
]

export function QuickActions() {
  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-card-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <div className={`group flex items-center gap-3 rounded-lg p-3 transition-all ${
              action.highlight
                ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                : "border border-border/60 bg-card hover:border-primary/30 hover:bg-muted/50"
            }`}>
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
                action.highlight
                  ? "bg-primary-foreground/20"
                  : "bg-primary/8"
              }`}>
                <action.icon className={`size-4 ${
                  action.highlight ? "text-primary-foreground" : "text-primary"
                }`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${
                  action.highlight ? "text-primary-foreground" : "text-card-foreground"
                }`}>{action.title}</p>
                <p className={`text-[11px] ${
                  action.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
