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
  Mail,
  MessageSquare,
  Calendar,
  Sparkles,
  CheckCircle2,
  Network,
} from "lucide-react"

interface OrgNode {
  id: string
  name: string
  role: string
  department: string
  email: string
  initials: string
  interactionScore: number
  children?: OrgNode[]
}

const orgData: OrgNode = {
  id: "1",
  name: "Nomsa Dlamini",
  role: "CEO",
  department: "Executive",
  email: "nomsa@company.co.za",
  initials: "ND",
  interactionScore: 0,
  children: [
    {
      id: "2",
      name: "James van der Merwe",
      role: "VP Engineering",
      department: "Engineering",
      email: "james@company.co.za",
      initials: "JM",
      interactionScore: 92,
      children: [
        {
          id: "5",
          name: "Lerato Mokoena",
          role: "Engineering Manager",
          department: "Engineering",
          email: "lerato@company.co.za",
          initials: "LM",
          interactionScore: 88,
          children: [
            { id: "9", name: "David Chen", role: "Senior Engineer", department: "Engineering", email: "david@company.co.za", initials: "DC", interactionScore: 76 },
            { id: "10", name: "Priya Naidoo", role: "Senior Engineer", department: "Engineering", email: "priya@company.co.za", initials: "PN", interactionScore: 81 },
            { id: "11", name: "Thabo Sithole", role: "Software Engineer", department: "Engineering", email: "thabo@company.co.za", initials: "TS", interactionScore: 65 },
          ],
        },
        {
          id: "6",
          name: "Sarah Williams",
          role: "Engineering Manager",
          department: "Engineering",
          email: "sarah@company.co.za",
          initials: "SW",
          interactionScore: 85,
          children: [
            { id: "12", name: "Amir Patel", role: "Senior Engineer", department: "Engineering", email: "amir@company.co.za", initials: "AP", interactionScore: 72 },
            { id: "13", name: "Zanele Khumalo", role: "Software Engineer", department: "Engineering", email: "zanele@company.co.za", initials: "ZK", interactionScore: 68 },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Pieter Botha",
      role: "VP Marketing",
      department: "Marketing",
      email: "pieter@company.co.za",
      initials: "PB",
      interactionScore: 78,
      children: [
        {
          id: "7",
          name: "Fatima Osman",
          role: "Marketing Manager",
          department: "Marketing",
          email: "fatima@company.co.za",
          initials: "FO",
          interactionScore: 84,
        },
      ],
    },
    {
      id: "4",
      name: "Lindiwe Mthembu",
      role: "VP Operations",
      department: "Operations",
      email: "lindiwe@company.co.za",
      initials: "LT",
      interactionScore: 71,
      children: [
        {
          id: "8",
          name: "Ravi Govender",
          role: "Operations Manager",
          department: "Operations",
          email: "ravi@company.co.za",
          initials: "RG",
          interactionScore: 79,
        },
      ],
    },
  ],
}

// Reviewer suggestions based on interaction metadata
const reviewerSuggestions = [
  {
    employee: "Lerato Mokoena",
    initials: "LM",
    role: "Engineering Manager",
    suggestedReviewers: [
      { name: "James van der Merwe", initials: "JM", reason: "Direct manager, 42 meetings last quarter", score: 92, source: "Teams" },
      { name: "Sarah Williams", initials: "SW", reason: "Peer manager, 28 shared threads", score: 85, source: "Outlook" },
      { name: "David Chen", initials: "DC", reason: "Direct report, daily standups", score: 88, source: "Teams" },
      { name: "Priya Naidoo", initials: "PN", reason: "Direct report, 15 code review interactions", score: 81, source: "Teams" },
      { name: "Fatima Osman", initials: "FO", reason: "Cross-functional partner, 8 project collaborations", score: 67, source: "Outlook" },
    ],
  },
]

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

        {node.interactionScore > 0 && (
          <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            <MessageSquare className="size-3" />
            <span className="font-mono">{node.interactionScore}</span>
          </div>
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
            Live org structure synced via Microsoft Graph. Interaction scores from Teams & Outlook.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5">
            <div className="size-2 rounded-full bg-success" />
            <span className="text-xs font-medium text-card-foreground">Last sync: 2 min ago</span>
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

        {/* Reviewer Suggestions */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                AI Reviewer Suggestions
              </CardTitle>
              <CardDescription>
                Based on interaction metadata from Microsoft 365
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

                  <div className="flex flex-col gap-3">
                    {suggestion.suggestedReviewers.map((reviewer) => (
                      <div
                        key={reviewer.name}
                        className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                      >
                        <Avatar className="size-7 mt-0.5">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {reviewer.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">{reviewer.name}</p>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-mono text-primary font-semibold">
                                {reviewer.score}%
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{reviewer.reason}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                              {reviewer.source === "Teams" ? (
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="size-2.5" />
                                  Teams
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Mail className="size-2.5" />
                                  Outlook
                                </span>
                              )}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="size-7 p-0 shrink-0" aria-label="Select reviewer">
                          <CheckCircle2 className="size-4 text-success" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      5 of 12 suggested reviewers shown
                    </span>
                    <Button variant="outline" size="sm" className="text-xs">
                      View All Suggestions
                    </Button>
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
