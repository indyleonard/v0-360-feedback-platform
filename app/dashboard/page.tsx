"use client"

import { useState, useCallback, useRef } from "react"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { SetupWizard } from "@/components/dashboard/setup-wizard"
import { PipelineSummary } from "@/components/dashboard/pipeline-summary"
import { ActiveCyclesTable } from "@/components/dashboard/active-cycles-table"
import { CompletionChart } from "@/components/dashboard/completion-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Button } from "@/components/ui/button"
import { GripVertical, RotateCcw, Lock, Unlock } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Module registry ─────────────────────────────────────────

interface DashboardModule {
  id: string
  label: string
  size: "full" | "two-thirds" | "third"
  component: React.ComponentType
}

const MODULE_REGISTRY: DashboardModule[] = [
  { id: "pipeline", label: "Feedback Pipeline", size: "two-thirds", component: PipelineSummary },
  { id: "quick-actions", label: "Quick Actions", size: "third", component: QuickActions },
  { id: "chart", label: "Completion Chart", size: "two-thirds", component: CompletionChart },
  { id: "activity", label: "Recent Activity", size: "third", component: RecentActivity },
  { id: "cycles", label: "Active Cycles", size: "full", component: ActiveCyclesTable },
]

const DEFAULT_ORDER = MODULE_REGISTRY.map((m) => m.id)

function getStoredOrder(): string[] {
  if (typeof window === "undefined") return DEFAULT_ORDER
  try {
    const stored = localStorage.getItem("comotion-dash-order")
    if (stored) {
      const parsed = JSON.parse(stored) as string[]
      // Validate all IDs still exist
      if (parsed.every((id) => DEFAULT_ORDER.includes(id)) && parsed.length === DEFAULT_ORDER.length) {
        return parsed
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_ORDER
}

function getStoredHidden(): string[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("comotion-dash-hidden")
    if (stored) return JSON.parse(stored) as string[]
  } catch {
    // ignore
  }
  return []
}

// ─── Drag & drop module wrapper ──────────────────────────────

function DraggableModule({
  mod,
  isEditing,
  isHidden,
  isDragOver,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onToggleVisibility,
}: {
  mod: DashboardModule
  isEditing: boolean
  isHidden: boolean
  isDragOver: boolean
  onDragStart: () => void
  onDragOver: (e: React.DragEvent) => void
  onDragEnd: () => void
  onDrop: () => void
  onToggleVisibility: () => void
}) {
  const Component = mod.component

  const sizeClasses = {
    full: "lg:col-span-3",
    "two-thirds": "lg:col-span-2",
    third: "lg:col-span-1",
  }

  return (
    <div
      draggable={isEditing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      className={cn(
        "relative transition-all duration-200",
        sizeClasses[mod.size],
        isEditing && "cursor-grab active:cursor-grabbing",
        isEditing && "rounded-xl ring-1 ring-border ring-dashed",
        isDragOver && isEditing && "ring-2 ring-primary ring-solid bg-primary/[0.02]",
        isHidden && "opacity-30 pointer-events-none",
      )}
    >
      {/* Edit overlay controls */}
      {isEditing && (
        <div className="absolute -top-2.5 left-3 z-10 flex items-center gap-1">
          <div className="flex items-center gap-1 rounded-md border border-border bg-card px-1.5 py-0.5 shadow-sm">
            <GripVertical className="size-3 text-muted-foreground" />
            <span className="text-[10px] font-semibold text-muted-foreground select-none">{mod.label}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleVisibility() }}
            className={cn(
              "flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-colors shadow-sm",
              isHidden
                ? "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
            )}
          >
            {isHidden ? <Lock className="size-2.5" /> : <Unlock className="size-2.5" />}
            {isHidden ? "Hidden" : "Visible"}
          </button>
        </div>
      )}

      {!isHidden && <Component />}
      {isHidden && isEditing && (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">Module hidden</p>
        </div>
      )}
    </div>
  )
}

// ─── Dashboard page ──────────────────────────────────────────

export default function DashboardPage() {
  const [moduleOrder, setModuleOrder] = useState<string[]>(getStoredOrder)
  const [hiddenModules, setHiddenModules] = useState<string[]>(getStoredHidden)
  const [isEditing, setIsEditing] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dropIndex, setDropIndex] = useState<number | null>(null)
  const dragCounter = useRef(0)

  const saveOrder = useCallback((order: string[]) => {
    setModuleOrder(order)
    localStorage.setItem("comotion-dash-order", JSON.stringify(order))
  }, [])

  const saveHidden = useCallback((hidden: string[]) => {
    setHiddenModules(hidden)
    localStorage.setItem("comotion-dash-hidden", JSON.stringify(hidden))
  }, [])

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDropIndex(index)
  }, [])

  const handleDrop = useCallback((targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return
    const newOrder = [...moduleOrder]
    const [moved] = newOrder.splice(dragIndex, 1)
    newOrder.splice(targetIndex, 0, moved)
    saveOrder(newOrder)
    setDragIndex(null)
    setDropIndex(null)
  }, [dragIndex, moduleOrder, saveOrder])

  const handleDragEnd = useCallback(() => {
    setDragIndex(null)
    setDropIndex(null)
  }, [])

  const toggleVisibility = useCallback((id: string) => {
    const next = hiddenModules.includes(id)
      ? hiddenModules.filter((h) => h !== id)
      : [...hiddenModules, id]
    saveHidden(next)
  }, [hiddenModules, saveHidden])

  const resetLayout = useCallback(() => {
    saveOrder(DEFAULT_ORDER)
    saveHidden([])
  }, [saveOrder, saveHidden])

  const orderedModules = moduleOrder
    .map((id) => MODULE_REGISTRY.find((m) => m.id === id))
    .filter(Boolean) as DashboardModule[]

  // In view mode, filter out hidden modules
  const visibleModules = isEditing
    ? orderedModules
    : orderedModules.filter((m) => !hiddenModules.includes(m.id))

  return (
    <div className="p-5 lg:p-6">
      {/* Page header */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            360 feedback overview. Data synced from Microsoft 365.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetLayout}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              Reset
            </Button>
          )}
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "text-xs font-medium",
              isEditing && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isEditing ? "Done" : "Customise"}
          </Button>
        </div>
      </div>

      {/* Setup wizard (not part of modular grid) */}
      <div className="mb-5">
        <SetupWizard />
      </div>

      {/* KPI Stats (always pinned) */}
      <OverviewStats />

      {/* Modular grid */}
      <div className={cn(
        "mt-5 grid gap-4 lg:grid-cols-3",
        isEditing && "pt-3"
      )}>
        {visibleModules.map((mod, index) => (
          <DraggableModule
            key={mod.id}
            mod={mod}
            isEditing={isEditing}
            isHidden={hiddenModules.includes(mod.id)}
            isDragOver={dropIndex === index && dragIndex !== index}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop(index)}
            onToggleVisibility={() => toggleVisibility(mod.id)}
          />
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-3">
          <p className="text-[11px] text-muted-foreground">
            Drag modules to reorder. Toggle visibility to show/hide sections. Your layout is saved automatically.
          </p>
        </div>
      )}
    </div>
  )
}
