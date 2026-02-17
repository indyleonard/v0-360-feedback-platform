"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import { Download, FileText, Brain, AlertTriangle, TrendingUp, Shield } from "lucide-react"

const competencyData = [
  { competency: "Leadership", self: 4.2, peers: 3.8, manager: 4.0, reports: 4.5, benchmark: 4.1 },
  { competency: "Communication", self: 4.5, peers: 4.2, manager: 4.3, reports: 4.1, benchmark: 4.0 },
  { competency: "Technical", self: 3.8, peers: 4.1, manager: 3.9, reports: 4.3, benchmark: 3.9 },
  { competency: "Strategy", self: 4.0, peers: 3.6, manager: 4.2, reports: 3.9, benchmark: 3.8 },
  { competency: "Teamwork", self: 4.3, peers: 4.5, manager: 4.1, reports: 4.6, benchmark: 4.2 },
  { competency: "Innovation", self: 3.9, peers: 3.7, manager: 3.8, reports: 4.0, benchmark: 3.7 },
]

const departmentScores = [
  { department: "Engineering", score: 4.2, participants: 38, completion: 94 },
  { department: "Marketing", score: 4.4, participants: 24, completion: 88 },
  { department: "Operations", score: 3.9, participants: 32, completion: 91 },
  { department: "Finance", score: 4.1, participants: 18, completion: 96 },
  { department: "HR", score: 4.5, participants: 12, completion: 100 },
  { department: "Executive", score: 4.3, participants: 8, completion: 87 },
]

const radarData = [
  { subject: "Leadership", A: 4.2, B: 4.1 },
  { subject: "Communication", A: 4.3, B: 4.0 },
  { subject: "Technical", A: 4.1, B: 3.9 },
  { subject: "Strategy", A: 3.9, B: 3.8 },
  { subject: "Teamwork", A: 4.5, B: 4.2 },
  { subject: "Innovation", A: 3.8, B: 3.7 },
]

const aiNarrative = {
  subject: "Lerato Mokoena",
  role: "Engineering Manager",
  cycle: "Q1 2026 Leadership 360",
  summary: `Lerato demonstrates consistently strong leadership capabilities, particularly in team collaboration (4.5/5) and communication (4.3/5). Direct reports rate her exceptionally well on approachability and mentorship, reflecting her investment in people development.

Areas for continued growth include strategic thinking, where peer feedback suggests opportunities to contribute more actively to cross-departmental planning. Her technical competency remains strong, though the gap between self-assessment (3.8) and direct report ratings (4.3) suggests she may undervalue her technical influence.

Compared to the Engineering Manager benchmark cohort, Lerato exceeds expectations in 4 of 6 competency areas, placing her in the top quartile for her role level.`,
  biasFlags: [
    {
      type: "Halo Effect",
      description: "High correlation across all reviewer dimensions for 2 respondents may indicate generalised positive sentiment rather than specific competency assessment.",
      severity: "low",
    },
  ],
  strengths: ["Team Collaboration", "Communication", "People Development"],
  developmentAreas: ["Strategic Thinking", "Cross-departmental Influence"],
  benchmarkPercentile: 78,
}

export default function ReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated narratives, competency analytics, and bias-checked results.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="q1-2026">
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2026">Q1 2026 Leadership 360</SelectItem>
              <SelectItem value="q4-2025">Q4 2025 All-Staff 360</SelectItem>
              <SelectItem value="eng-2026">Engineering Team Review</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="narrative">
        <TabsList>
          <TabsTrigger value="narrative">AI Narrative</TabsTrigger>
          <TabsTrigger value="competency">Competency View</TabsTrigger>
          <TabsTrigger value="department">Department View</TabsTrigger>
        </TabsList>

        {/* AI Narrative Tab */}
        <TabsContent value="narrative" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-card-foreground flex items-center gap-2">
                        <Brain className="size-5 text-primary" />
                        AI Narrative Summary
                      </CardTitle>
                      <CardDescription>
                        {aiNarrative.subject} - {aiNarrative.role} | {aiNarrative.cycle}
                      </CardDescription>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                      AI Generated
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-card-foreground">
                    {aiNarrative.summary.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-sm leading-relaxed text-card-foreground mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Bias flags */}
                  <div className="mt-6 border-t border-border pt-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                      <Shield className="size-4 text-primary" />
                      Bias Detection
                    </h4>
                    {aiNarrative.biasFlags.map((flag, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-warning/20 bg-warning/5 p-3"
                      >
                        <AlertTriangle className="mt-0.5 size-4 text-warning shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{flag.type}</p>
                          <p className="text-xs text-muted-foreground">{flag.description}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            Severity: {flag.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              {/* Benchmark */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-sm text-card-foreground">Benchmark Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="relative flex size-32 items-center justify-center">
                      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="oklch(0.91 0.006 210)" strokeWidth="8" />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="oklch(0.55 0.14 190)"
                          strokeWidth="8"
                          strokeDasharray={`${(aiNarrative.benchmarkPercentile / 100) * 314} 314`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-card-foreground">{aiNarrative.benchmarkPercentile}th</span>
                        <span className="block text-xs text-muted-foreground">percentile</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    vs Engineering Manager cohort (n=47)
                  </p>
                </CardContent>
              </Card>

              {/* Strengths & Development */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-sm text-card-foreground">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-success">
                      Strengths
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {aiNarrative.strengths.map((s) => (
                        <Badge key={s} className="bg-success/10 text-success border-success/20" variant="outline">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-warning">
                      Development Areas
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {aiNarrative.developmentAreas.map((d) => (
                        <Badge key={d} className="bg-warning/10 text-warning border-warning/20" variant="outline">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Competency View Tab */}
        <TabsContent value="competency" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Competency Scores by Source</CardTitle>
                <CardDescription>Self, peers, manager, and direct reports compared to benchmark</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={competencyData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" domain={[0, 5]} tick={{ fill: "oklch(0.50 0.01 230)", fontSize: 12 }} />
                      <YAxis type="category" dataKey="competency" width={100} tick={{ fill: "oklch(0.50 0.01 230)", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1 0 0)",
                          border: "1px solid oklch(0.91 0.006 210)",
                          borderRadius: "0.5rem",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Bar dataKey="self" fill="oklch(0.55 0.14 190)" name="Self" radius={[0, 2, 2, 0]} />
                      <Bar dataKey="peers" fill="oklch(0.68 0.16 165)" name="Peers" radius={[0, 2, 2, 0]} />
                      <Bar dataKey="manager" fill="oklch(0.45 0.08 230)" name="Manager" radius={[0, 2, 2, 0]} />
                      <Bar dataKey="reports" fill="oklch(0.75 0.12 180)" name="Direct Reports" radius={[0, 2, 2, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Performance vs Benchmark</CardTitle>
                <CardDescription>Current scores overlaid on role benchmark</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid className="stroke-border" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "oklch(0.50 0.01 230)", fontSize: 11 }} />
                      <PolarRadiusAxis domain={[0, 5]} tick={{ fill: "oklch(0.50 0.01 230)", fontSize: 10 }} />
                      <Radar name="Actual" dataKey="A" stroke="oklch(0.55 0.14 190)" fill="oklch(0.55 0.14 190)" fillOpacity={0.3} />
                      <Radar name="Benchmark" dataKey="B" stroke="oklch(0.68 0.16 165)" fill="oklch(0.68 0.16 165)" fillOpacity={0.1} strokeDasharray="4 4" />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1 0 0)",
                          border: "1px solid oklch(0.91 0.006 210)",
                          borderRadius: "0.5rem",
                          fontSize: "12px",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Department View Tab */}
        <TabsContent value="department" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departmentScores.map((dept) => (
              <Card key={dept.department} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-card-foreground">{dept.department}</h3>
                    <Badge variant="outline" className="text-xs">
                      {dept.participants} people
                    </Badge>
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <span className="text-3xl font-bold text-card-foreground">{dept.score}</span>
                      <span className="text-sm text-muted-foreground">/5.0</span>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="size-3" />
                      <span className="text-xs font-medium">+0.3 vs last cycle</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Completion</span>
                      <span className="font-mono">{dept.completion}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${dept.completion}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
