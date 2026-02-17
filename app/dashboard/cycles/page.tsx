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
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const allCycles = [
  {
    id: 1,
    name: "Q1 2026 Leadership 360",
    description: "Annual leadership assessment for all director-level and above",
    department: "All Departments",
    status: "active",
    completion: 87,
    participants: 142,
    reviewers: 568,
    startDate: "01 Feb 2026",
    dueDate: "28 Mar 2026",
    remindersEnabled: true,
    aiQuestions: true,
  },
  {
    id: 2,
    name: "Engineering Team Review",
    description: "Quarterly peer feedback for engineering department",
    department: "Engineering",
    status: "active",
    completion: 64,
    participants: 38,
    reviewers: 152,
    startDate: "15 Feb 2026",
    dueDate: "15 Apr 2026",
    remindersEnabled: true,
    aiQuestions: true,
  },
  {
    id: 3,
    name: "New Manager Onboarding 360",
    description: "90-day check-in feedback for newly promoted managers",
    department: "Cross-functional",
    status: "draft",
    completion: 0,
    participants: 12,
    reviewers: 48,
    startDate: "01 May 2026",
    dueDate: "30 Jun 2026",
    remindersEnabled: false,
    aiQuestions: false,
  },
  {
    id: 4,
    name: "Q4 2025 All-Staff 360",
    description: "Company-wide 360 feedback cycle",
    department: "All Departments",
    status: "completed",
    completion: 94,
    participants: 1180,
    reviewers: 4720,
    startDate: "01 Oct 2025",
    dueDate: "15 Dec 2025",
    remindersEnabled: true,
    aiQuestions: true,
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

export default function CyclesPage() {
  const [showNewCycle, setShowNewCycle] = useState(false)
  const [selectedTab, setSelectedTab] = useState("all")

  const filtered =
    selectedTab === "all"
      ? allCycles
      : allCycles.filter((c) => c.status === selectedTab)

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feedback Cycles</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, manage, and monitor your 360 feedback cycles.
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
          <div className="grid gap-4">
            {filtered.map((cycle) => (
              <Card key={cycle.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
                          {cycle.participants} participants, {cycle.reviewers} reviewers
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {cycle.startDate} - {cycle.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {cycle.remindersEnabled ? "Auto-reminders on" : "Reminders off"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Progress value={cycle.completion} className="h-2 w-24" />
                          <span className="text-sm font-mono font-medium text-card-foreground">
                            {cycle.completion}%
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Completion</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Cycle actions">
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
                  </div>
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
              Set up a new 360 feedback cycle. AI will generate role-aware questions after creation.
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
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">AI Question Generation</p>
                <p className="text-xs text-muted-foreground">
                  Automatically generate role-aware questions using AI
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
