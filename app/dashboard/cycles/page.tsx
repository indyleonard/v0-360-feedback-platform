"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Send,
  Calendar,
  Users,
  Clock,
  MoreHorizontal,
  Brain,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Sparkles,
  BarChart3,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// The 6-stage pipeline from the scope doc
const pipelineStages = [
  { id: "nomination", label: "Nomination", icon: Users, description: "Employee self-nominates reviewers" },
  { id: "ai-suggestions", label: "AI Suggestions", icon: Sparkles, description: "System suggests reviewers from interaction metadata" },
  { id: "manager-approval", label: "Manager Approval", icon: UserCheck, description: "Manager reviews and approves reviewer list" },
  { id: "distribution", label: "Distribution", icon: Send, description: "Questionnaires sent via Teams and email" },
  { id: "collection", label: "Collection", icon: Clock, description: "Automated reminders for pending reviewers" },
  { id: "reporting", label: "Reporting", icon: BarChart3, description: "Results aggregated and delivered" },
]

const cycles = [
  {
    id: 1,
    name: "Q1 2026 Leadership 360",
    description: "Annual leadership assessment for all director-level and above",
    department: "All Departments",
    status: "active" as const,
    currentStage: 4, // distribution (0-indexed)
    completion: 87,
    participants: 142,
    reviewers: 568,
    startDate: "01 Feb 2026",
    dueDate: "28 Mar 2026",
    remindersEnabled: true,
    aiQuestions: true,
    stageBreakdown: [
      { stage: "Nomination", count: 0, total: 142 },
      { stage: "AI Suggestions", count: 0, total: 142 },
      { stage: "Manager Approval", count: 0, total: 142 },
      { stage: "Distribution", count: 18, total: 142 },
      { stage: "Collection", count: 124, total: 142 },
      { stage: "Reporting", count: 0, total: 142 },
    ],
    sampleParticipants: [
      { name: "Lerato Mokoena", initials: "LM", stage: "Collection", completion: 75 },
      { name: "James van der Merwe", initials: "JM", stage: "Collection", completion: 100 },
      { name: "David Chen", initials: "DC", stage: "Distribution", completion: 0 },
      { name: "Priya Naidoo", initials: "PN", stage: "Collection", completion: 60 },
    ],
  },
  {
    id: 2,
    name: "Engineering Team Review",
    description: "Quarterly peer feedback for engineering department",
    department: "Engineering",
    status: "active" as const,
    currentStage: 2, // manager-approval
    completion: 0,
    participants: 38,
    reviewers: 152,
    startDate: "15 Feb 2026",
    dueDate: "15 Apr 2026",
    remindersEnabled: true,
    aiQuestions: true,
    stageBreakdown: [
      { stage: "Nomination", count: 0, total: 38 },
      { stage: "AI Suggestions", count: 0, total: 38 },
      { stage: "Manager Approval", count: 26, total: 38 },
      { stage: "Distribution", count: 12, total: 38 },
      { stage: "Collection", count: 0, total: 38 },
      { stage: "Reporting", count: 0, total: 38 },
    ],
    sampleParticipants: [
      { name: "Sarah Williams", initials: "SW", stage: "Manager Approval", completion: 0 },
      { name: "Thabo Sithole", initials: "TS", stage: "Distribution", completion: 0 },
    ],
  },
  {
    id: 3,
    name: "New Manager Onboarding 360",
    description: "90-day check-in feedback for newly promoted managers",
    department: "Cross-functional",
    status: "draft" as const,
    currentStage: 0,
    completion: 0,
    participants: 12,
    reviewers: 0,
    startDate: "01 May 2026",
    dueDate: "30 Jun 2026",
    remindersEnabled: false,
    aiQuestions: false,
    stageBreakdown: [
      { stage: "Nomination", count: 12, total: 12 },
      { stage: "AI Suggestions", count: 0, total: 12 },
      { stage: "Manager Approval", count: 0, total: 12 },
      { stage: "Distribution", count: 0, total: 12 },
      { stage: "Collection", count: 0, total: 12 },
      { stage: "Reporting", count: 0, total: 12 },
    ],
    sampleParticipants: [],
  },
  {
    id: 4,
    name: "Q4 2025 All-Staff 360",
    description: "Company-wide 360 feedback cycle",
    department: "All Departments",
    status: "completed" as const,
    currentStage: 5,
    completion: 94,
    participants: 1180,
    reviewers: 4720,
    startDate: "01 Oct 2025",
    dueDate: "15 Dec 2025",
    remindersEnabled: true,
    aiQuestions: true,
    stageBreakdown: [
      { stage: "Nomination", count: 0, total: 1180 },
      { stage: "AI Suggestions", count: 0, total: 1180 },
      { stage: "Manager Approval", count: 0, total: 1180 },
      { stage: "Distribution", count: 0, total: 1180 },
      { stage: "Collection", count: 0, total: 1180 },
      { stage: "Reporting", count: 1180, total: 1180 },
    ],
    sampleParticipants: [],
  },
]

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    active: "bg-success/10 text-success border-success/20",
    draft: "bg-muted text-muted-foreground border-border",
    completed: "bg-primary/10 text-primary border-primary/20",
  }
  return (
    <Badge variant="outline" className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

function PipelineStepper({ currentStage, stageBreakdown }: { currentStage: number; stageBreakdown: typeof cycles[0]["stageBreakdown"] }) {
  return (
    <div className="mt-4">
      {/* Stage dots/connector */}
      <div className="flex items-center">
        {pipelineStages.map((stage, index) => {
          const isComplete = index < currentStage
          const isCurrent = index === currentStage
          const count = stageBreakdown[index]?.count || 0
          return (
            <div key={stage.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex size-8 items-center justify-center rounded-full border-2 transition-colors ${
                    isComplete
                      ? "border-success bg-success/10"
                      : isCurrent
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : (
                    <stage.icon className={`size-3.5 ${isCurrent ? "text-primary" : "text-muted-foreground/50"}`} />
                  )}
                </div>
                <span className={`text-[10px] font-medium leading-tight text-center max-w-16 ${
                  isComplete ? "text-success" : isCurrent ? "text-primary" : "text-muted-foreground/60"
                }`}>
                  {stage.label}
                </span>
                {count > 0 && (
                  <Badge variant="outline" className="text-[9px] px-1 py-0 h-4">
                    {count}
                  </Badge>
                )}
              </div>
              {index < pipelineStages.length - 1 && (
                <div className={`mx-1 h-px flex-1 ${index < currentStage ? "bg-success" : "bg-border"}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function CyclesPage() {
  const [showNewCycle, setShowNewCycle] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")
  const [expandedCycle, setExpandedCycle] = useState<number | null>(1)

  const filtered =
    selectedTab === "all"
      ? cycles
      : cycles.filter((c) => c.status === selectedTab)

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feedback Cycles</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track each cycle through the 6-stage pipeline: nomination, AI suggestions, approval, distribution, collection, reporting.
          </p>
        </div>
        <Button
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowNewCycle(true)}
        >
          <Plus className="size-4" />
          New Cycle
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Cycles</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="flex flex-col gap-4">
            {filtered.map((cycle) => (
              <Card key={cycle.id} className="border-border bg-card overflow-hidden">
                <CardContent className="p-0">
                  {/* Main row */}
                  <button
                    className="flex w-full flex-col gap-4 p-6 text-left lg:flex-row lg:items-center lg:justify-between"
                    onClick={() => setExpandedCycle(expandedCycle === cycle.id ? null : cycle.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {cycle.name}
                        </h3>
                        <StatusBadge status={cycle.status} />
                        {cycle.aiQuestions && (
                          <Badge variant="outline" className="gap-1 border-primary/20 bg-primary/5 text-primary">
                            <Brain className="size-3" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {cycle.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="size-3" />
                          {cycle.participants} participants
                          {cycle.reviewers > 0 && `, ${cycle.reviewers} reviewers`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {cycle.startDate} - {cycle.dueDate}
                        </span>
                        {cycle.remindersEnabled && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            Auto-reminders on
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {cycle.status === "active" && (
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Progress value={cycle.completion} className="h-2 w-24" />
                            <span className="text-sm font-mono font-medium text-card-foreground">
                              {cycle.completion}%
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">Completion</p>
                        </div>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Cycle actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Send className="mr-2 size-4" />
                            Send Reminders
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Brain className="mr-2 size-4" />
                            Generate AI Questions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 size-4" />
                            Close Cycle
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <AlertCircle className="mr-2 size-4" />
                            Delete Cycle
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </button>

                  {/* Expanded Pipeline View */}
                  {expandedCycle === cycle.id && (
                    <div className="border-t border-border bg-muted/30 px-6 py-5">
                      <PipelineStepper currentStage={cycle.currentStage} stageBreakdown={cycle.stageBreakdown} />

                      {/* Participant cards */}
                      {cycle.sampleParticipants.length > 0 && (
                        <div className="mt-5">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Participant Status
                          </p>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                            {cycle.sampleParticipants.map((p) => (
                              <div
                                key={p.name}
                                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                              >
                                <Avatar className="size-8">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                                    {p.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-muted-foreground">{p.stage}</span>
                                    {p.completion > 0 && (
                                      <span className="text-[10px] font-mono text-primary">{p.completion}%</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* New Cycle Dialog */}
      <Dialog open={showNewCycle} onOpenChange={setShowNewCycle}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Feedback Cycle</DialogTitle>
            <DialogDescription>
              Set up a new 360 feedback cycle. Employees will begin the nomination phase once launched.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cycle-name">Cycle Name</Label>
              <Input id="cycle-name" placeholder="e.g., Q2 2026 Leadership 360" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cycle-desc">Description</Label>
              <Textarea
                id="cycle-desc"
                placeholder="Describe the purpose and scope of this cycle..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="end-date">Due Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="cross">Cross-functional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pipeline preview */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Workflow Pipeline
              </p>
              <div className="flex items-center gap-1">
                {pipelineStages.map((stage, i) => (
                  <div key={stage.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex size-6 items-center justify-center rounded-full border border-border bg-background">
                        <stage.icon className="size-3 text-muted-foreground" />
                      </div>
                      <span className="text-[9px] text-muted-foreground text-center leading-tight max-w-14">
                        {stage.label}
                      </span>
                    </div>
                    {i < pipelineStages.length - 1 && (
                      <ArrowRight className="mx-0.5 size-3 text-muted-foreground/30 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">AI Question Generation</p>
                <p className="text-xs text-muted-foreground">
                  Generate role-aware questions from job descriptions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Automated Reminders</p>
                <p className="text-xs text-muted-foreground">
                  Send reminders via Teams and email to pending reviewers
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCycle(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowNewCycle(false)}
            >
              Create Cycle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
