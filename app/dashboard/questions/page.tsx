"use client"

import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Brain,
  Sparkles,
  CheckCircle2,
  Edit3,
  Trash2,
  Plus,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from "lucide-react"

const questionSets = [
  {
    role: "Engineering Manager",
    competencies: ["Technical Leadership", "People Development", "Strategic Thinking", "Communication"],
    status: "approved",
    questions: [
      {
        id: 1,
        text: "How effectively does this person translate complex technical challenges into clear, actionable guidance for their team?",
        competency: "Technical Leadership",
        type: "Likert Scale",
        biasFlag: false,
        approved: true,
      },
      {
        id: 2,
        text: "To what extent does this person actively invest in the professional growth and career development of their direct reports?",
        competency: "People Development",
        type: "Likert Scale",
        biasFlag: false,
        approved: true,
      },
      {
        id: 3,
        text: "How well does this person balance short-term delivery pressures with long-term technical vision and architecture decisions?",
        competency: "Strategic Thinking",
        type: "Likert Scale",
        biasFlag: false,
        approved: true,
      },
      {
        id: 4,
        text: "Describe a situation where this person's communication significantly impacted team alignment or project outcomes.",
        competency: "Communication",
        type: "Open Text",
        biasFlag: false,
        approved: true,
      },
    ],
  },
  {
    role: "Product Manager",
    competencies: ["Product Strategy", "Stakeholder Management", "Data-Driven Decision Making", "Cross-functional Collaboration"],
    status: "review",
    questions: [
      {
        id: 5,
        text: "How effectively does this person articulate product vision and ensure team alignment around strategic priorities?",
        competency: "Product Strategy",
        type: "Likert Scale",
        biasFlag: false,
        approved: false,
      },
      {
        id: 6,
        text: "Rate this person's ability to manage competing stakeholder expectations while maintaining product integrity.",
        competency: "Stakeholder Management",
        type: "Likert Scale",
        biasFlag: true,
        approved: false,
      },
      {
        id: 7,
        text: "How consistently does this person use quantitative data and user research to inform product decisions?",
        competency: "Data-Driven Decision Making",
        type: "Likert Scale",
        biasFlag: false,
        approved: false,
      },
      {
        id: 8,
        text: "What is one area where this person's cross-functional collaboration could be strengthened?",
        competency: "Cross-functional Collaboration",
        type: "Open Text",
        biasFlag: false,
        approved: false,
      },
    ],
  },
  {
    role: "Senior Software Engineer",
    competencies: ["Code Quality", "Mentorship", "System Design", "Initiative"],
    status: "generating",
    questions: [],
  },
]

function BiasWarning() {
  return (
    <div className="flex items-center gap-2 rounded-md bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning-foreground">
      <AlertTriangle className="size-3 text-warning" />
      Potential bias detected. Consider rephrasing.
    </div>
  )
}

export default function QuestionsPage() {
  const [selectedRole, setSelectedRole] = useState("Engineering Manager")
  const currentSet = questionSets.find((s) => s.role === selectedRole) || questionSets[0]

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Question Builder</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated, role-aware feedback questions with human review and bias detection.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {questionSets.map((set) => (
                <SelectItem key={set.role} value={set.role}>
                  {set.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Brain className="size-4" />
            Generate Questions
          </Button>
        </div>
      </div>

      {/* Role competencies overview */}
      <Card className="mb-6 border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">{currentSet.role}</CardTitle>
              <CardDescription>
                {currentSet.questions.length} questions across {currentSet.competencies.length} competencies
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className={
                currentSet.status === "approved"
                  ? "bg-success/10 text-success border-success/20"
                  : currentSet.status === "review"
                  ? "bg-warning/10 text-warning border-warning/20"
                  : "bg-primary/10 text-primary border-primary/20"
              }
            >
              {currentSet.status === "approved"
                ? "Approved"
                : currentSet.status === "review"
                ? "Pending Review"
                : "Generating..."}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentSet.competencies.map((comp) => (
              <Badge key={comp} variant="secondary" className="bg-secondary text-secondary-foreground">
                {comp}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      {currentSet.status === "generating" ? (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-8 text-primary animate-pulse" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-card-foreground">
              Generating Questions...
            </h3>
            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
              AI is analysing the Senior Software Engineer role profile and competency framework to generate targeted questions.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {currentSet.questions.map((question, index) => (
            <Card key={question.id} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {question.competency}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-border bg-muted text-muted-foreground">
                        {question.type}
                      </Badge>
                      {question.approved && (
                        <CheckCircle2 className="size-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-card-foreground">
                      {question.text}
                    </p>
                    {question.biasFlag && <BiasWarning />}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Approve question">
                      <ThumbsUp className="size-4 text-success" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Reject question">
                      <ThumbsDown className="size-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Edit question">
                      <Edit3 className="size-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Regenerate question">
                      <RotateCcw className="size-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Delete question">
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add custom question */}
          <Card className="border-dashed border-2 border-border bg-background">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Plus className="size-4" />
                  <span className="text-sm font-medium">Add Custom Question</span>
                </div>
                <Textarea
                  placeholder="Type your custom feedback question here..."
                  rows={2}
                  className="text-sm"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">AI bias check:</span>
                    <Switch defaultChecked />
                  </div>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Add Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
