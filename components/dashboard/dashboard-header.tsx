"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search people, cycles, reports..."
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4 text-foreground" />
          <Badge className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
            3
          </Badge>
        </Button>
        <div className="hidden items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 sm:flex">
          <div className="size-2 rounded-full bg-success" />
          <span className="text-xs font-medium text-card-foreground">Azure AD Connected</span>
        </div>
      </div>
    </header>
  )
}
