import { OverviewStats } from "@/components/dashboard/overview-stats"
import { SetupWizard } from "@/components/dashboard/setup-wizard"
import { PipelineSummary } from "@/components/dashboard/pipeline-summary"
import { ActiveCyclesTable } from "@/components/dashboard/active-cycles-table"
import { CompletionChart } from "@/components/dashboard/completion-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          CoMotion 360 feedback platform overview. All data synced from Microsoft 365.
        </p>
      </div>

      {/* Onboarding Setup Wizard */}
      <div className="mb-6">
        <SetupWizard />
      </div>

      <OverviewStats />

      {/* Pipeline + Quick Actions */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PipelineSummary />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Chart + Activity */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CompletionChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Active Cycles Table */}
      <div className="mt-6">
        <ActiveCyclesTable />
      </div>
    </div>
  )
}
