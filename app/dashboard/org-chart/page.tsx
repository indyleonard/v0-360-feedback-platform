"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  RefreshCcw,
  Search,
  ChevronDown,
  ChevronRight,
  Users,
  Sparkles,
  CheckCircle2,
  Network,
  Plus,
  X,
} from "lucide-react"

interface OrgNode {
  id: string
  name: string
  role: string
  department: string
  initials: string
  jobDescSource?: string
  children?: OrgNode[]
}

const orgData: OrgNode = {
  id: "1",
  name: "Nomsa Dlamini",
  role: "CEO",
  department: "Executive",
  initials: "ND",
  jobDescSource: "M365 Profile",
  children: [
    {
      id: "2",
      name: "James van der Merwe",
      role: "VP Engineering",
      department: "Engineering",
      initials: "JM",
      jobDescSource: "M365 Profile",
      children: [
        {
          id: "5",
          name: "Lerato Mokoena",
          role: "Engineering Manager",
          department: "Engineering",
          initials: "LM",
          jobDescSource: "SharePoint HR",
          children: [
            { id: "9", name: "David Chen", role: "Senior Engineer", department: "Engineering", initials: "DC", jobDescSource: "M365 Profile" },
            { id: "10", name: "Priya Naidoo", role: "Senior Engineer", department: "Engineering", initials: "PN", jobDescSource: "M365 Profile" },
            { id: "11", name: "Thabo Sithole", role: "Software Engineer", department: "Engineering", initials: "TS", jobDescSource: "M365 Profile" },
          ],
        },
        {
          id: "6",
          name: "Sarah Williams",
          role: "Engineering Manager",
          department: "Engineering",
          initials: "SW",
          jobDescSource: "SharePoint HR",
          children: [
            { id: "12", name: "Amir Patel", role: "Senior Engineer", department: "Engineering", initials: "AP", jobDescSource: "M365 Profile" },
            { id: "13", name: "Zanele Khumalo", role: "Software Engineer", department: "Engineering", initials: "ZK", jobDescSource: "M365 Profile" },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Pieter Botha",
      role: "VP Marketing",
      department: "Marketing",
      initials: "PB",
      jobDescSource: "M365 Profile",
      children: [
        {
          id: "7",
          name: "Fatima Osman",
          role: "Marketing Manager",
          department: "Marketing",
          initials: "FO",
          jobDescSource: "SharePoint HR",
        },
      ],
    },
    {
      id: "4",
      name: "Lindiwe Mthembu",
      role: "VP Operations",
      department: "Operations",
      initials: "LT",
      jobDescSource: "M365 Profile",
      children: [
        {
          id: "8",
          name: "Ravi Govender",
          role: "Operations Manager",
          department: "Operations",
          initials: "RG",
          jobDescSource: "SharePoint HR",
        },
      ],
    },
  ],
}

// Privacy-safe reviewer suggestions -- NO raw interaction scores or frequencies
const reviewerSuggestions = [
  {
    employee: "Lerato Mokoena",
    initials: "LM",
    role: "Engineering Manager",
    suggestedReviewers: [
      { name: "James van der Merwe", initials: "JM", relationship: "Direct manager", type: "Manager" as const },
      { name: "Sarah Williams", initials: "SW", relationship: "Peer manager, frequently collaborates", type: "Peer" as const },
      { name: "David Chen", initials: "DC", relationship: "Direct report", type: "Direct Report" as const },
      { name: "Priya Naidoo", initials: "PN", relationship: "Direct report", type: "Direct Report" as const },
      { name: "Fatima Osman", initials: "FO", relationship: "Cross-functional partner", type: "Cross-functional" as const },
    ],
  },
]

const relationshipColors: Record<string, string> = {
  Manager: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  Peer: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "Direct Report": "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "Cross-functional": "bg-chart-5/10 text-chart-5 border-chart-5/20",
}

function OrgTreeNode({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
      <div className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex size-5 items-center justify-center rounded text-muted-foreground hover:text-foreground"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </button>
        ) : (
          <div className="size-5" />
        )}

        <Avatar className="size-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            {node.initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{node.name}</p>
          <p className="text-xs text-muted-foreground">{node.role}</p>
        </div>

        <Badge variant="outline" className="hidden text-xs sm:flex">
          {node.department}
        </Badge>

        {node.jobDescSource && (
          <span className="hidden text-[10px] text-muted-foreground/60 lg:block">
            JD: {node.jobDescSource}
          </span>
        )}
      </div>

      {expanded && hasChildren && (
        <div className="mt-1">
          {node.children!.map((child) => (
            <OrgTreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrgChartPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Org Chart</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live org structure synced via Microsoft Graph. Job descriptions feed AI question generation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-success/20 bg-success/5 px-3 py-1.5">
            <div className="size-2 rounded-full bg-success" />
            <span className="text-xs font-medium text-foreground">Synced 2 min ago</span>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCcw className="size-4" />
            Sync Now
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Org Tree */}
        <div className="lg:col-span-3">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-card-foreground flex items-center gap-2">
                    <Network className="size-5 text-primary" />
                    Organisation Structure
                  </CardTitle>
                  <CardDescription>1,247 employees across 8 departments</CardDescription>
                </div>
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="h-8 pl-9 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <OrgTreeNode node={orgData} />
            </CardContent>
          </Card>
        </div>

        {/* AI Reviewer Suggestions (privacy-safe) */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                AI Reviewer Suggestions
              </CardTitle>
              <CardDescription>
                Based on org proximity and collaboration patterns. Interaction metadata is used for suggestions only and is never stored or exposed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviewerSuggestions.map((suggestion) => (
                <div key={suggestion.employee}>
                  <div className="mb-4 flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {suggestion.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{suggestion.employee}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {suggestion.suggestedReviewers.map((reviewer) => (
                      <div
                        key={reviewer.name}
                        className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                      >
                        <Avatar className="size-7">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {reviewer.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{reviewer.name}</p>
                          <p className="text-xs text-muted-foreground">{reviewer.relationship}</p>
                        </div>
                        <Badge variant="outline" className={`text-[10px] shrink-0 ${relationshipColors[reviewer.type]}`}>
                          {reviewer.type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="size-7 p-0" aria-label="Accept reviewer">
                            <CheckCircle2 className="size-4 text-success" />
                          </Button>
                          <Button size="sm" variant="ghost" className="size-7 p-0" aria-label="Dismiss reviewer">
                            <X className="size-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      5 suggested reviewers based on collaboration signals
                    </span>
                    <Button variant="outline" size="sm" className="text-xs">
                      View All
                    </Button>
                  </div>

                  {/* Privacy notice */}
                  <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3">
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Suggestions are derived from anonymised interaction metadata (meeting frequency, email volume) from Teams and Exchange. 
                      This metadata is processed in-memory for suggestion generation only and is never stored long-term or exposed to users.
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
