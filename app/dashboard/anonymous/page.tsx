"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MessageSquareLock,
  Shield,
  AlertTriangle,
  Eye,
  EyeOff,
  TrendingUp,
  Clock,
  Users,
  Settings,
  Link as LinkIcon,
  Copy,
  ExternalLink,
} from "lucide-react"

const anonymousFeedback = [
  {
    id: 1,
    recipient: "Lerato Mokoena",
    recipientRole: "Engineering Manager",
    totalFeedback: 8,
    threshold: 5,
    thresholdMet: true,
    recentCount: 3,
    lastReceived: "2 hours ago",
    sentiment: "positive",
    link: "fb.comotion.us/anon/lm-8p1",
  },
  {
    id: 2,
    recipient: "James van der Merwe",
    recipientRole: "VP Engineering",
    totalFeedback: 12,
    threshold: 5,
    thresholdMet: true,
    recentCount: 5,
    lastReceived: "1 day ago",
    sentiment: "mixed",
    link: "fb.comotion.us/anon/jm-3k2",
  },
  {
    id: 3,
    recipient: "Thabo Sithole",
    recipientRole: "Software Engineer",
    totalFeedback: 2,
    threshold: 5,
    thresholdMet: false,
    recentCount: 2,
    lastReceived: "3 days ago",
    sentiment: "neutral",
    link: "fb.comotion.us/anon/ts-9w5",
  },
  {
    id: 4,
    recipient: "Fatima Osman",
    recipientRole: "Marketing Manager",
    totalFeedback: 6,
    threshold: 5,
    thresholdMet: true,
    recentCount: 1,
    lastReceived: "5 days ago",
    sentiment: "positive",
    link: "fb.comotion.us/anon/fo-6j3",
  },
  {
    id: 5,
    recipient: "David Chen",
    recipientRole: "Senior Engineer",
    totalFeedback: 3,
    threshold: 5,
    thresholdMet: false,
    recentCount: 1,
    lastReceived: "1 week ago",
    sentiment: "neutral",
    link: "fb.comotion.us/anon/dc-1r8",
  },
]

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const config: Record<string, { label: string; className: string }> = {
    positive: { label: "Positive", className: "bg-success/10 text-success border-success/20" },
    mixed: { label: "Mixed", className: "bg-warning/10 text-warning border-warning/20" },
    neutral: { label: "Neutral", className: "bg-muted text-muted-foreground border-border" },
  }
  const c = config[sentiment] || config.neutral
  return (
    <Badge variant="outline" className={c.className}>
      {c.label}
    </Badge>
  )
}

export default function AnonymousFeedbackPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Anonymous Feedback</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Always-on anonymous feedback links with volume thresholds to protect anonymity.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="size-4" />
          Configure Thresholds
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquareLock className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">42</p>
                <p className="text-xs text-muted-foreground">Total anonymous tips</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-success/10">
                <Shield className="size-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">31</p>
                <p className="text-xs text-muted-foreground">Threshold met (viewable)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-warning/10">
                <EyeOff className="size-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">11</p>
                <p className="text-xs text-muted-foreground">Below threshold (hidden)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anonymity threshold config */}
      <Card className="mb-8 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Shield className="size-5 text-primary" />
            Anonymity Protection Settings
          </CardTitle>
          <CardDescription>
            Feedback is only visible to recipients once the volume threshold is met, 
            preventing identification of individual respondents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium">Minimum feedback count before visibility</Label>
              <div className="flex items-center gap-4">
                <Slider defaultValue={[5]} min={3} max={15} step={1} className="flex-1" />
                <span className="text-sm font-mono font-semibold text-foreground w-8 text-center">5</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Recipients cannot see any anonymous feedback until at least this many responses are collected.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Strip identifying metadata</p>
                  <p className="text-xs text-muted-foreground">Remove timestamps and department info from feedback</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">AI content anonymisation</p>
                  <p className="text-xs text-muted-foreground">Use AI to detect and mask identifying language</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback list */}
      <div className="flex flex-col gap-4">
        {anonymousFeedback.map((item) => (
          <Card key={item.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-card-foreground">{item.recipient}</h3>
                    <span className="text-xs text-muted-foreground">{item.recipientRole}</span>
                    <SentimentBadge sentiment={item.sentiment} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquareLock className="size-3" />
                      {item.totalFeedback} total feedback items
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      Last received: {item.lastReceived}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      {item.recentCount} this week
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <LinkIcon className="size-3 text-muted-foreground" />
                    <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                      {item.link}
                    </code>
                    <Button variant="ghost" size="icon" className="size-5" aria-label="Copy link">
                      <Copy className="size-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.thresholdMet ? (
                    <div className="flex items-center gap-2">
                      <Eye className="size-4 text-success" />
                      <span className="text-xs font-medium text-success">Visible</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <EyeOff className="size-4 text-warning" />
                      <span className="text-xs font-medium text-warning">
                        {item.threshold - item.totalFeedback} more needed
                      </span>
                    </div>
                  )}
                  <Button variant="outline" size="sm" disabled={!item.thresholdMet}>
                    View Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
