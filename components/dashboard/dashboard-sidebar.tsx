"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { CoMotionLogo } from "@/components/comotion-logo"
import {
  LayoutDashboard,
  RefreshCcw,
  Network,
  BarChart3,
  MessageSquareLock,
  Brain,
  Shield,
  Settings,
  FileText,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mainNav = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Feedback Cycles", href: "/dashboard/cycles", icon: RefreshCcw },
  { title: "Org Chart", href: "/dashboard/org-chart", icon: Network },
  { title: "AI Questions", href: "/dashboard/questions", icon: Brain },
  { title: "Anonymous Feedback", href: "/dashboard/anonymous", icon: MessageSquareLock },
]

const analyticsNav = [
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { title: "People", href: "/dashboard/people", icon: Users },
]

const adminNav = [
  { title: "Compliance", href: "/dashboard/compliance", icon: Shield },
  { title: "Audit Log", href: "/dashboard/audit", icon: FileText },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4 pb-3">
        <Link href="/dashboard">
          <CoMotionLogo variant="white" />
        </Link>
      </SidebarHeader>

      <SidebarSeparator className="bg-sidebar-border/50" />

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/30 text-[10px] font-semibold tracking-[0.12em] uppercase px-2">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="h-9 gap-2.5 rounded-lg text-[13px] font-medium transition-colors data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/30 text-[10px] font-semibold tracking-[0.12em] uppercase px-2">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="h-9 gap-2.5 rounded-lg text-[13px] font-medium transition-colors data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/30 text-[10px] font-semibold tracking-[0.12em] uppercase px-2">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="h-9 gap-2.5 rounded-lg text-[13px] font-medium transition-colors data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarSeparator className="bg-sidebar-border/50 mb-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help & Support" className="h-9 gap-2.5 rounded-lg text-[13px] font-medium">
              <HelpCircle className="size-4" />
              <span>Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-1 flex items-center gap-2.5 rounded-lg bg-sidebar-accent/80 p-2.5">
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
              TE
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-[13px] font-medium text-sidebar-foreground">
              Tjaart Esterhuyse
            </span>
            <span className="truncate text-[10px] text-sidebar-foreground/40">
              HR Admin
            </span>
          </div>
          <button className="text-sidebar-foreground/30 hover:text-sidebar-foreground transition-colors" aria-label="Sign out">
            <LogOut className="size-3.5" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
