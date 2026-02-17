import { OverviewStats } from "@/components/dashboard/overview-stats"
import { ActiveCyclesTable } from "@/components/dashboard/active-cycles-table"
import { CompletionChart } from "@/components/dashboard/completion-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your 360 feedback cycles, completion rates, and team insights.
        </p>
      </div>

      <OverviewStats />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CompletionChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActiveCyclesTable />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
