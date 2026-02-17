"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bell, Search, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useWalkthrough } from "@/components/dashboard/walkthrough-context"

export function DashboardHeader() {
  const { open } = useWalkthrough()

  return (
    <header className="sticky top-0 z-30 flex h-[52px] items-center gap-3 border-b border-border/60 bg-card/80 backdrop-blur-md px-4">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <Separator orientation="vertical" className="h-5 bg-border/60" />
      
      <div className="flex flex-1 items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/50" />
          <input
            type="search"
            placeholder="Search people, cycles..."
            className="h-8 w-full rounded-lg border border-border/60 bg-background pl-8 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring/50 transition-shadow"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={open}
          className="hidden h-7 gap-1 px-2 text-muted-foreground hover:text-foreground sm:flex"
        >
          <Play className="size-3" />
          <span className="text-[11px] font-medium">Tour</span>
        </Button>
        <Separator orientation="vertical" className="hidden h-5 bg-border/60 sm:block" />
        <Button variant="ghost" size="icon" className="relative size-8" aria-label="Notifications">
          <Bell className="size-3.5 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
            3
          </span>
        </Button>
        <div className="hidden items-center gap-1.5 rounded-md border border-border/60 bg-background px-2.5 py-1 sm:flex">
          <div className="size-1.5 rounded-full bg-success" />
          <span className="text-[11px] font-medium text-muted-foreground">Azure AD</span>
        </div>
      </div>
    </header>
  )
}
