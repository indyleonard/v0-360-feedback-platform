"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CoMotionLogo } from "@/components/comotion-logo"
import { Shield, CheckCircle2, MessageSquareLock } from "lucide-react"
import { useParams } from "next/navigation"

// Company values-aligned questions (configurable by admin)
const feedbackQuestions = [
  {
    id: 1,
    question: "How well does this person embody our value of 'Collaborative Excellence' in their daily work?",
    type: "rating" as const,
    options: [
      { value: "1", label: "Rarely" },
      { value: "2", label: "Sometimes" },
      { value: "3", label: "Often" },
      { value: "4", label: "Consistently" },
      { value: "5", label: "Exceptionally" },
    ],
  },
  {
    id: 2,
    question: "What is one thing this person does exceptionally well?",
    type: "text" as const,
  },
  {
    id: 3,
    question: "What is one area where this person could grow or improve?",
    type: "text" as const,
  },
]

export default function SignatureLinkPage() {
  const params = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md border-border bg-card">
          <CardContent className="flex flex-col items-center py-12 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-success/10 mb-4">
              <CheckCircle2 className="size-8 text-success" />
            </div>
            <h2 className="text-xl font-bold text-card-foreground">Thank you for your feedback</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your response has been recorded anonymously. No identifying information has been collected.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2.5">
              <Shield className="size-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Protected by POPIA-compliant anonymity controls
              </span>
            </div>
            <div className="mt-8">
              <CoMotionLogo />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CoMotionLogo />
          </div>
          <h1 className="text-xl font-bold text-foreground">Anonymous Feedback</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Share feedback confidentially. Your identity is never recorded.
          </p>
        </div>

        {/* Privacy Banner */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/[0.03] p-4">
          <MessageSquareLock className="size-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Your anonymity is protected</p>
            <ul className="mt-1.5 text-xs text-muted-foreground leading-relaxed list-disc list-inside">
              <li>No login required -- no identity recorded</li>
              <li>Feedback is only visible after 5+ responses are collected</li>
              <li>Timestamps and metadata are stripped from submissions</li>
              <li>AI anonymisation removes identifying language patterns</li>
            </ul>
          </div>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit}>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                {feedbackQuestions.map((q) => (
                  <div key={q.id} className="flex flex-col gap-3">
                    <Label className="text-sm font-medium text-card-foreground leading-relaxed">
                      {q.id}. {q.question}
                    </Label>

                    {q.type === "rating" && q.options && (
                      <RadioGroup
                        value={answers[q.id] || ""}
                        onValueChange={(val) =>
                          setAnswers((prev) => ({ ...prev, [q.id]: val }))
                        }
                      >
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt) => (
                            <label
                              key={opt.value}
                              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                                answers[q.id] === opt.value
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border bg-background text-foreground hover:border-primary/40"
                              }`}
                            >
                              <RadioGroupItem value={opt.value} className="sr-only" />
                              <span className="font-mono text-xs text-muted-foreground">{opt.value}</span>
                              <span>{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      </RadioGroup>
                    )}

                    {q.type === "text" && (
                      <Textarea
                        placeholder="Type your response here..."
                        rows={3}
                        className="text-sm"
                        value={answers[q.id] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex flex-col items-center gap-3">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={Object.keys(answers).length < feedbackQuestions.length}
            >
              Submit Anonymous Feedback
            </Button>
            <p className="text-[10px] text-muted-foreground text-center max-w-xs">
              By submitting, you acknowledge this feedback is anonymous and aligned with CoMotion{"'"}s company values framework. POPIA and GDPR compliant.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
