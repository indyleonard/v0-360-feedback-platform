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
      <SidebarHeader className="p-4">
        <Link href="/dashboard">
          <CoMotionLogo variant="white" />
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
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
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
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
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
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

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help & Support">
              <HelpCircle className="size-4" />
              <span>Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              TE
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-sidebar-foreground">
              Tjaart Esterhuyse
            </span>
            <span className="truncate text-xs text-sidebar-foreground/60">
              HR Admin
            </span>
          </div>
          <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground" aria-label="Sign out">
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
