"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CoMotionLogo } from "@/components/comotion-logo"
import { useWalkthrough } from "@/components/dashboard/walkthrough-context"
import {
  Shield,
  Network,
  RefreshCcw,
  Brain,
  BarChart3,
  MessageSquareLock,
  FileText,
  Settings,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Users,
  Zap,
  Globe,
  Mail,
  Eye,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: "welcome",
    category: "Introduction",
    title: "Welcome to CoMotion 360",
    subtitle: "Your privacy-first 360 feedback platform, deeply integrated with Microsoft 365.",
    description:
      "This walkthrough covers every feature of the platform and ends with exactly what we need from you to go live. No calls needed -- this is your full briefing.",
    visual: "hero",
    icon: Sparkles,
    accent: "primary",
  },
  {
    id: "sso",
    category: "Authentication",
    title: "Azure AD Single Sign-On",
    subtitle: "Zero separate credentials. Your team logs in with their existing Microsoft 365 account.",
    description:
      "We use OIDC / SAML 2.0 via Azure AD (Entra ID) for authentication. Every employee is automatically recognised. No user provisioning, no password resets, no IT tickets.",
    visual: "sso",
    icon: Shield,
    accent: "primary",
    details: [
      "OIDC / SAML 2.0 compliant authentication",
      "Automatic user provisioning from Azure AD directory",
      "Role-based access: Admin, HR Manager, Manager, Employee",
      "Session management with secure HTTP-only cookies",
    ],
  },
  {
    id: "org-chart",
    category: "Microsoft 365 Integration",
    title: "Live Org Chart Sync",
    subtitle: "Reporting lines, departments, and team structures pulled directly from Microsoft Graph.",
    description:
      "The org hierarchy is never manually maintained. It syncs from your M365 tenant automatically. When someone moves teams or gets a new manager, the chart updates on the next sync. M365 is the single source of truth.",
    visual: "org",
    icon: Network,
    accent: "chart-2",
    details: [
      "Zero manual org chart maintenance",
      "Automatic hierarchy updates on every sync cycle",
      "Department and team structure mapping",
      "Job descriptions ingested from M365 profile or SharePoint HR library",
    ],
  },
  {
    id: "reviewer-suggestions",
    category: "Microsoft 365 Integration",
    title: "Interaction-Based Reviewer Suggestions",
    subtitle: "AI suggests reviewers based on who each employee actually works with -- not just the org chart.",
    description:
      "We read anonymised interaction metadata from Teams (chat/call frequency) and Exchange (email frequency) to identify genuine working relationships. Only the suggestion outcome is shown -- raw frequency data is never stored or exposed to any user. It is processed in-memory and discarded.",
    visual: "reviewers",
    icon: Users,
    accent: "chart-4",
    details: [
      "Teams chat/call frequency analysis (metadata only, no content)",
      "Exchange email frequency analysis (metadata only, no content)",
      "Raw interaction data processed ephemerally -- never stored",
      "Suggestions show as 'Frequently collaborates' -- no numbers exposed",
    ],
  },
  {
    id: "feedback-workflow",
    category: "360 Feedback Cycle",
    title: "Six-Stage Feedback Pipeline",
    subtitle: "From nomination to report delivery in under 4 weeks -- fully automated.",
    description:
      "Each 360 cycle follows a rigid, auditable pipeline. Employees nominate their reviewers, AI suggests additional ones based on interaction data, the direct manager approves the final list, questionnaires are distributed via email and Teams, automated reminders chase completion, and results are aggregated with configurable visibility rules.",
    visual: "pipeline",
    icon: RefreshCcw,
    accent: "primary",
    details: [
      "1. Nomination -- Employee proposes reviewers (peers, reports, cross-functional)",
      "2. AI Suggestions -- System adds interaction-based recommendations",
      "3. Manager Approval -- Direct manager reviews and finalises the list",
      "4. Distribution -- Questionnaires sent via email and Teams notification",
      "5. Collection -- Automated reminders at configurable intervals",
      "6. Reporting -- Aggregated results with visibility rules and AI narrative",
    ],
  },
  {
    id: "ai-questions",
    category: "AI-Powered",
    title: "Role-Aware AI Question Generation",
    subtitle: "Tailored 360 questions based on role, department, seniority, and your company values.",
    description:
      "The AI reads the employee's job description (from their M365 profile or your SharePoint HR library), their department context, seniority level, and your company values manifesto to generate targeted feedback questions. HR reviews and edits every question before it goes live. The AI also runs bias and tone checks on submitted feedback before it enters any report.",
    visual: "ai",
    icon: Brain,
    accent: "chart-2",
    details: [
      "Questions contextualised by role, JD, department, and seniority",
      "Company values manifesto alignment built in",
      "HR can approve, edit, reject, or regenerate any question",
      "Bias and tone detection on submitted feedback responses",
      "Azure OpenAI preferred for data residency within your tenant",
    ],
  },
  {
    id: "reports",
    category: "AI-Powered",
    title: "AI Narrative Summaries & Benchmarking",
    subtitle: "Not just scores -- themes, strengths, development areas, and contextual benchmarks.",
    description:
      "The AI produces rich narrative summaries of feedback results, highlighting themes across competencies, flagging contradictions between reviewer categories, and benchmarking scores against team and department norms. Category-level anonymity gating ensures results only show when 3+ reviewers have responded in that category -- otherwise the category is suppressed entirely.",
    visual: "reports",
    icon: BarChart3,
    accent: "chart-1",
    details: [
      "Narrative summaries: strengths, development areas, sentiment analysis",
      "Contradiction flagging between reviewer categories",
      "Benchmarking against team and department norms",
      "Per-category anonymity threshold (3+ respondents required)",
      "Locked categories excluded from charts and AI narratives",
    ],
  },
  {
    id: "anonymous",
    category: "Always-On Feedback",
    title: "Signature Link: Anonymous Instant Feedback",
    subtitle: "A persistent URL in every employee's email signature for always-on anonymous feedback.",
    description:
      "Each employee gets a unique, persistent link (e.g. /feedback/nd-7x9k) that they embed in their email signature. Anyone -- internal or external -- can submit short, anonymous feedback aligned to your company values at any time. Responses are aggregated over time with volume thresholds (configurable, default 5) to protect anonymity. Until the threshold is met, no data is visible to the employee.",
    visual: "signature",
    icon: MessageSquareLock,
    accent: "warning",
    details: [
      "Unique persistent URL per employee for email signatures",
      "1-3 short questions aligned to company values framework",
      "Configurable volume threshold (default: 5 responses before visible)",
      "Anyone can submit -- internal staff or external contacts",
      "Optional AI trend summaries from accumulated feedback",
    ],
  },
  {
    id: "compliance",
    category: "Privacy & Security",
    title: "POPIA / GDPR Compliance Built In",
    subtitle: "South African POPIA compliance is non-negotiable. GDPR alignment for future international use.",
    description:
      "All data is stored and processed within your Microsoft 365 tenant boundary or in a SOC 2 / ISO 27001 compliant cloud environment. Individual feedback responses are never attributable to a specific reviewer. Data retention is configurable with automated purge schedules. A full audit trail tracks every data access event. Backups export automatically to your designated SharePoint library or Azure Blob storage.",
    visual: "compliance",
    icon: Lock,
    accent: "chart-3",
    details: [
      "POPIA compliant -- non-negotiable requirement met",
      "GDPR aligned for future international expansion",
      "All data within your Azure tenant boundary",
      "SOC 2 / ISO 27001 minimum compliance",
      "Full audit trail: who accessed what data and when",
      "Configurable data retention with automated purge",
      "Automated backups to SharePoint or Azure Blob on schedule",
    ],
  },
  {
    id: "deliverables",
    category: "Next Steps",
    title: "What We Need From You",
    subtitle: "Six items. Once we have these, we configure and you're live.",
    description:
      "Everything below can be provided through the platform's Settings page once you have access, or sent directly to your implementation contact. Most items take under 5 minutes.",
    visual: "deliverables",
    icon: FileText,
    accent: "success",
    deliverables: [
      {
        item: "Azure AD Tenant Access",
        detail: "Tenant ID + app registration permissions so we can configure SSO and Graph API sync",
        effort: "IT Admin, ~10 min",
      },
      {
        item: "Company Values Manifesto",
        detail: "Your values framework document -- used to align signature link prompts and AI question generation",
        effort: "HR, ~2 min upload",
      },
      {
        item: "Job Description Source",
        detail: "Confirm if JDs live in M365 employee profiles or a SharePoint HR library (provide the library URL if SharePoint)",
        effort: "HR, ~2 min",
      },
      {
        item: "SharePoint Backup Library",
        detail: "Designate a SharePoint document library URL where encrypted backups will be stored",
        effort: "IT Admin, ~5 min",
      },
      {
        item: "Data Retention Preference",
        detail: "How long feedback data should be retained before automated purge (12, 24, 36 months, or custom)",
        effort: "HR/Legal, ~1 min decision",
      },
      {
        item: "Question Bank (Optional)",
        detail: "Any existing question themes or banks you'd like to seed -- otherwise the AI-generated baseline works perfectly",
        effort: "HR, optional",
      },
    ],
  },
  {
    id: "success",
    category: "Success Criteria",
    title: "How We Measure Success",
    subtitle: "These are the benchmarks we're targeting together.",
    description: "Aligned directly from your project scope document.",
    visual: "success",
    icon: CheckCircle2,
    accent: "success",
    criteria: [
      { metric: "Zero manual org chart maintenance", target: "M365 is the single source of truth" },
      { metric: "360 cycle turnaround", target: "Nomination to report delivery in under 4 weeks" },
      { metric: "Signature link adoption", target: "Active use within 30 days of launch" },
      { metric: "AI summary usefulness", target: "Rated useful by >80% of managers in pilot" },
      { metric: "POPIA compliance", target: "Confirmed by your legal team" },
    ],
  },
  {
    id: "cta",
    category: "Ready",
    title: "Let's Get Started",
    subtitle: "Everything you've just seen is built and ready. Here's what happens next.",
    description: "",
    visual: "cta",
    icon: Zap,
    accent: "primary",
    nextSteps: [
      { step: "1", label: "Provide the 6 deliverables above (most take under 5 minutes)" },
      { step: "2", label: "We configure Azure AD SSO and trigger the first org sync" },
      { step: "3", label: "You upload your values manifesto and review AI-generated questions" },
      { step: "4", label: "Launch your first 360 cycle and watch it run itself" },
    ],
    contactNote: "For questions or to schedule a technical deep-dive, contact Timothy directly.",
  },
]

function SlideVisual({ slide }: { slide: (typeof slides)[number] }) {
  const accentMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    "chart-1": "bg-chart-1/10 text-chart-1 border-chart-1/20",
    "chart-2": "bg-chart-2/10 text-chart-2 border-chart-2/20",
    "chart-3": "bg-chart-3/10 text-chart-3 border-chart-3/20",
    "chart-4": "bg-chart-4/10 text-chart-4 border-chart-4/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    success: "bg-success/10 text-success border-success/20",
  }

  const iconBg = accentMap[slide.accent] || accentMap.primary

  if (slide.visual === "hero") {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-2xl" />
          <div className="relative flex size-28 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
            <CoMotionLogo className="scale-150" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["Azure AD SSO", "Graph API Sync", "AI Questions", "POPIA Compliant", "Anonymous Feedback"].map((tag) => (
            <Badge key={tag} variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  if (slide.visual === "pipeline") {
    const stages = [
      { name: "Nomination", icon: Users, color: "bg-chart-1" },
      { name: "AI Suggest", icon: Brain, color: "bg-chart-2" },
      { name: "Manager OK", icon: CheckCircle2, color: "bg-chart-4" },
      { name: "Distribute", icon: Mail, color: "bg-primary" },
      { name: "Collect", icon: RefreshCcw, color: "bg-warning" },
      { name: "Report", icon: BarChart3, color: "bg-success" },
    ]
    return (
      <div className="flex flex-col gap-3">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-3">
            <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg text-card", stage.color)}>
              <stage.icon className="size-4" />
            </div>
            <div className="h-px flex-1 bg-border" />
            <span className="shrink-0 text-sm font-medium text-foreground">{stage.name}</span>
            {i < stages.length - 1 && (
              <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    )
  }

  if (slide.visual === "deliverables" && "deliverables" in slide) {
    return (
      <div className="flex flex-col gap-2.5">
        {slide.deliverables!.map((d, i) => (
          <div key={i} className="flex gap-3 rounded-lg border border-border bg-card p-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-success/10">
              <span className="text-xs font-bold text-success">{i + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{d.item}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{d.detail}</p>
              <Badge variant="outline" className="mt-1.5 border-border text-[10px] text-muted-foreground">
                {d.effort}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (slide.visual === "success" && "criteria" in slide) {
    return (
      <div className="flex flex-col gap-3">
        {slide.criteria!.map((c, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg border border-success/20 bg-success/[0.03] p-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
            <div>
              <p className="text-sm font-semibold text-foreground">{c.metric}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.target}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (slide.visual === "cta" && "nextSteps" in slide) {
    return (
      <div className="flex flex-col gap-3">
        {slide.nextSteps!.map((s) => (
          <div key={s.step} className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/[0.03] p-3.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {s.step}
            </div>
            <p className="text-sm font-medium text-foreground">{s.label}</p>
          </div>
        ))}
        {"contactNote" in slide && slide.contactNote && (
          <div className="mt-2 rounded-lg border border-border bg-muted/30 p-3.5 text-center">
            <p className="text-xs leading-relaxed text-muted-foreground italic">
              {slide.contactNote}
            </p>
          </div>
        )}
      </div>
    )
  }

  // Default: show details list with icon
  return (
    <div className="flex flex-col gap-4">
      <div className={cn("mx-auto flex size-16 items-center justify-center rounded-2xl border", iconBg)}>
        <slide.icon className="size-8" />
      </div>
      {"details" in slide && slide.details && (
        <div className="flex flex-col gap-2">
          {slide.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">{detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function FeatureWalkthrough() {
  const { isOpen, close } = useWalkthrough()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slide = slides[currentSlide]
  const isFirst = currentSlide === 0
  const isLast = currentSlide === slides.length - 1
  const progress = ((currentSlide + 1) / slides.length) * 100

  const goNext = useCallback(() => {
    if (!isLast) setCurrentSlide((prev) => prev + 1)
  }, [isLast])

  const goPrev = useCallback(() => {
    if (!isFirst) setCurrentSlide((prev) => prev - 1)
  }, [isFirst])

  const handleClose = useCallback(() => {
    close()
    setCurrentSlide(0)
  }, [close])

  useEffect(() => {
    if (!isOpen) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goNext()
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrev()
      }
      if (e.key === "Escape") {
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, goNext, goPrev, handleClose])

  if (!isOpen) return null

  const accentTextMap: Record<string, string> = {
    primary: "text-primary",
    "chart-1": "text-chart-1",
    "chart-2": "text-chart-2",
    "chart-3": "text-chart-3",
    "chart-4": "text-chart-4",
    warning: "text-warning",
    success: "text-success",
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
        aria-label="Close walkthrough"
      >
        <X className="size-5" />
      </button>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl" style={{ maxHeight: "min(92vh, 820px)" }}>
        {/* Progress bar */}
        <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Top bar with slide counter and category */}
        <div className="flex items-center justify-between border-b border-border px-6 pt-4 pb-3">
          <Badge variant="outline" className={cn("text-xs font-medium", accentTextMap[slide.accent])}>
            {slide.category}
          </Badge>
          <span className="font-mono text-xs text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Content area - scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-lg">
            {/* Title block */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground">
                {slide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-primary font-medium">
                {slide.subtitle}
              </p>
              {slide.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {slide.description}
                </p>
              )}
            </div>

            {/* Visual content */}
            <SlideVisual slide={slide} />
          </div>
        </div>

        {/* Navigation footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          {/* Dot indicators */}
          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentSlide ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/30"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button variant="ghost" size="sm" onClick={goPrev} className="gap-1.5 text-muted-foreground">
                <ChevronLeft className="size-4" />
                Back
              </Button>
            )}
            {isFirst && (
              <Button variant="ghost" size="sm" onClick={handleClose} className="text-muted-foreground">
                Skip tour
              </Button>
            )}
            {isLast ? (
              <Button size="sm" onClick={handleClose} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Open Dashboard
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button size="sm" onClick={goNext} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                Next
                <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="border-t border-border bg-muted/30 px-6 py-1.5 text-center">
          <span className="text-[10px] text-muted-foreground">
            Use arrow keys or spacebar to navigate
          </span>
        </div>
      </div>
    </div>
  )
}
