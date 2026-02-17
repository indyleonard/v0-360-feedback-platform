import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Send, Brain, Download } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "New Feedback Cycle",
    description: "Launch a new 360 feedback cycle",
    icon: Plus,
    href: "/dashboard/cycles",
    variant: "default" as const,
  },
  {
    title: "Send Reminders",
    description: "Nudge pending reviewers",
    icon: Send,
    href: "/dashboard/cycles",
    variant: "outline" as const,
  },
  {
    title: "Generate AI Questions",
    description: "Create role-aware questions",
    icon: Brain,
    href: "/dashboard/questions",
    variant: "outline" as const,
  },
  {
    title: "Export Reports",
    description: "Download PDF or Excel reports",
    icon: Download,
    href: "/dashboard/reports",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {actions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Button
              variant={action.variant}
              className="h-auto w-full justify-start gap-3 p-3 text-left"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                <action.icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
