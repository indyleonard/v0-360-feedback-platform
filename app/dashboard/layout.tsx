import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FeatureWalkthrough } from "@/components/dashboard/feature-walkthrough"
import { WalkthroughProvider } from "@/components/dashboard/walkthrough-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalkthroughProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </SidebarInset>
        <FeatureWalkthrough />
      </SidebarProvider>
    </WalkthroughProvider>
  )
}
