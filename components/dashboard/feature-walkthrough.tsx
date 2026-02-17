"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWalkthrough } from "@/components/dashboard/walkthrough-context"
import {
  Shield,
  Network,
  Brain,
  BarChart3,
  MessageSquareLock,
  FileText,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  Lock,
  Users,
  X,
  Timer,
  ClipboardCheck,
  Send,
  TrendingUp,
  Database,
  Calendar,
  Upload,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Slide data ──────────────────────────────────────────────

interface BaseSlide {
  id: string
  category: string
  title: string
  subtitle: string
  description: string
  accent: string
}

interface HeroSlide extends BaseSlide { visual: "hero" }
interface DetailSlide extends BaseSlide { visual: "detail"; icon: LucideIcon; details: string[] }
interface PipelineSlide extends BaseSlide { visual: "pipeline" }
interface DeliverablesSlide extends BaseSlide { visual: "deliverables"; deliverables: { item: string; detail: string; effort: string; icon: LucideIcon }[] }
interface SuccessSlide extends BaseSlide { visual: "success"; criteria: { metric: string; target: string }[] }
interface CTASlide extends BaseSlide { visual: "cta"; nextSteps: { step: string; label: string }[]; contactNote: string }

type Slide = HeroSlide | DetailSlide | PipelineSlide | DeliverablesSlide | SuccessSlide | CTASlide

const slides: Slide[] = [
  {
    id: "welcome",
    category: "Introduction",
    title: "Welcome to CoMotion 360",
    subtitle: "Your privacy-first 360 feedback platform, deeply integrated with Microsoft 365.",
    description: "This walkthrough covers every capability of the platform and ends with exactly what we need from you to go live. Use arrow keys or click through. No calls needed -- this is your full briefing.",
    visual: "hero",
    accent: "primary",
  },
  {
    id: "sso",
    category: "Authentication",
    title: "Azure AD Single Sign-On",
    subtitle: "Your team logs in with their existing Microsoft 365 account. Zero separate credentials.",
    description: "We use OIDC / SAML 2.0 via Azure AD (Entra ID) for authentication. Every employee is automatically recognised from your directory. No user provisioning, no password resets, no IT tickets. Role-based access (Admin, HR, Manager, Employee) is derived from your AD groups.",
    visual: "detail",
    icon: Shield,
    accent: "primary",
    details: [
      "OIDC / SAML 2.0 compliant -- works with Entra ID out of the box",
      "Automatic user provisioning from your Azure AD directory",
      "Role-based access: Admin, HR Manager, Manager, Employee",
      "Session management with secure HTTP-only cookies",
    ],
  },
  {
    id: "org-chart",
    category: "Microsoft 365",
    title: "Live Org Chart Sync",
    subtitle: "Reporting lines, departments, and teams pulled directly from Microsoft Graph API.",
    description: "The org hierarchy is never manually maintained. It syncs from your M365 tenant automatically. When someone moves teams or gets a new manager, the chart updates on the next sync cycle. M365 is the single source of truth. Job descriptions are ingested from the employee profile or your linked SharePoint HR library.",
    visual: "detail",
    icon: Network,
    accent: "chart-5",
    details: [
      "Zero manual org chart maintenance -- M365 is the single source of truth",
      "Automatic hierarchy updates on every sync cycle",
      "Department and team structure mapping from Graph API",
      "Job descriptions ingested from M365 profile or SharePoint HR library",
    ],
  },
  {
    id: "reviewer-suggestions",
    category: "Microsoft 365",
    title: "Interaction-Based Reviewer Suggestions",
    subtitle: "AI suggests reviewers based on who each employee actually works with -- not just the org chart.",
    description: "We read anonymised interaction metadata from Teams (chat/call frequency) and Exchange (email frequency) to identify genuine working relationships. Only the suggestion outcome is shown. Raw frequency data is processed in-memory and immediately discarded -- never stored, never exposed to any user.",
    visual: "detail",
    icon: Users,
    accent: "chart-4",
    details: [
      "Teams chat/call frequency analysis (metadata only -- no message content)",
      "Exchange email frequency analysis (metadata only -- no content)",
      "Raw interaction data processed ephemerally and immediately discarded",
      "Suggestions shown as \"Frequently collaborates\" -- no numbers exposed",
    ],
  },
  {
    id: "feedback-workflow",
    category: "360 Cycle",
    title: "Six-Stage Feedback Pipeline",
    subtitle: "From nomination to report delivery in under 4 weeks -- fully automated.",
    description: "Each 360 cycle follows a rigid, auditable pipeline. Employees nominate reviewers, AI suggests additional ones, the direct manager approves, questionnaires are distributed via email and Teams, automated reminders chase completion, and results are aggregated with configurable visibility rules.",
    visual: "pipeline",
    accent: "primary",
  },
  {
    id: "ai-questions",
    category: "AI-Powered",
    title: "Role-Aware Question Generation",
    subtitle: "Tailored 360 questions based on role, department, seniority, and your company values.",
    description: "The AI reads each employee's job description, department context, seniority level, and your company values manifesto to generate targeted feedback questions. HR reviews and edits every question before it goes live. The AI also runs bias and tone checks on submitted feedback before it enters any report. Azure OpenAI is the default for data residency within your tenant.",
    visual: "detail",
    icon: Brain,
    accent: "chart-4",
    details: [
      "Questions contextualised by role, JD, department, and seniority",
      "Company values manifesto alignment built into every question set",
      "HR can approve, edit, reject, or regenerate any question",
      "Bias and tone detection on all submitted feedback responses",
      "Azure OpenAI preferred -- keeps data within your tenant boundary",
    ],
  },
  {
    id: "reports",
    category: "AI-Powered",
    title: "Narrative Summaries & Benchmarking",
    subtitle: "Not just scores -- themes, strengths, development areas, and contextual benchmarks.",
    description: "The AI produces rich narrative summaries highlighting themes across competencies, flagging contradictions between reviewer categories, and benchmarking against team and department norms. Category-level anonymity gating ensures results only appear when 3+ reviewers have responded in that category -- otherwise the entire category is suppressed.",
    visual: "detail",
    icon: BarChart3,
    accent: "chart-1",
    details: [
      "Narrative summaries: strengths, development areas, sentiment analysis",
      "Contradiction flagging between reviewer categories",
      "Benchmarking against team and department norms",
      "Per-category anonymity threshold: 3+ respondents required",
      "Locked categories excluded from charts and AI narratives entirely",
    ],
  },
  {
    id: "anonymous",
    category: "Always-On",
    title: "Signature Link Feedback",
    subtitle: "A persistent URL in every employee's email signature for always-on anonymous feedback.",
    description: "Each employee gets a unique, permanent link they embed in their email signature. Anyone can submit short, anonymous feedback aligned to your company values at any time. Responses aggregate over time with volume thresholds (default: 5 minimum) to protect anonymity. Until the threshold is met, no data is visible to the employee. AI can optionally summarise trends.",
    visual: "detail",
    icon: MessageSquareLock,
    accent: "warning",
    details: [
      "Unique persistent URL per employee -- embeds in email signatures",
      "1-3 short questions aligned to your company values framework",
      "Configurable volume threshold (default: 5 responses before visible)",
      "Anyone can submit -- internal colleagues or external contacts",
      "Optional AI trend summaries from accumulated feedback",
    ],
  },
  {
    id: "compliance",
    category: "Privacy",
    title: "POPIA / GDPR Compliance",
    subtitle: "South African POPIA compliance is non-negotiable. GDPR aligned for international use.",
    description: "All data is stored and processed within your Microsoft 365 tenant boundary or in a SOC 2 / ISO 27001 compliant environment. Individual feedback is never attributable to a specific reviewer. Data retention is configurable with automated purge. Full audit trail tracks every access. Backups export to your SharePoint library or Azure Blob on schedule.",
    visual: "detail",
    icon: Lock,
    accent: "chart-3",
    details: [
      "POPIA compliant -- your non-negotiable requirement met",
      "GDPR aligned for future international expansion",
      "All data stays within your Azure tenant boundary",
      "SOC 2 / ISO 27001 minimum compliance environment",
      "Full audit trail: who accessed what data and when",
      "Configurable data retention with automated purge schedules",
      "Automated backups to SharePoint or Azure Blob on schedule",
    ],
  },
  {
    id: "deliverables",
    category: "Next Steps",
    title: "What We Need From You",
    subtitle: "Six items. Most take under 5 minutes. Once provided, we configure and you're live.",
    description: "Everything below can be provided through the Settings page once you have access, or sent directly to your implementation contact.",
    visual: "deliverables",
    accent: "success",
    deliverables: [
      { item: "Azure AD Tenant Access", detail: "Tenant ID + app registration permissions for SSO and Graph API sync", effort: "IT Admin, ~10 min", icon: Shield },
      { item: "Company Values Manifesto", detail: "Your values framework -- used for signature link prompts and AI questions", effort: "HR, ~2 min upload", icon: Upload },
      { item: "Job Description Source", detail: "Confirm if JDs are in M365 profiles or SharePoint HR library", effort: "HR, ~2 min", icon: FileText },
      { item: "SharePoint Backup Library", detail: "Designate a document library URL for encrypted backup storage", effort: "IT Admin, ~5 min", icon: Database },
      { item: "Data Retention Preference", detail: "How long to retain feedback data before automated purge", effort: "HR/Legal, ~1 min", icon: Calendar },
      { item: "Question Bank (Optional)", detail: "Existing question themes or banks -- otherwise AI baseline is ready", effort: "Optional", icon: HelpCircle },
    ],
  },
  {
    id: "success",
    category: "Targets",
    title: "How We Measure Success",
    subtitle: "These benchmarks come directly from your project scope document.",
    description: "",
    visual: "success",
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
    subtitle: "Everything you've just seen is built and ready.",
    description: "",
    visual: "cta",
    accent: "primary",
    nextSteps: [
      { step: "1", label: "Provide the 6 deliverables listed on the previous slides" },
      { step: "2", label: "We configure Azure AD SSO and trigger the first org sync" },
      { step: "3", label: "Upload your values manifesto and review AI-generated questions" },
      { step: "4", label: "Launch your first 360 cycle and watch it run itself" },
    ],
    contactNote: "For questions or to schedule a technical deep-dive, contact Timothy directly.",
  },
]

// ─── Micro-illustrations ──────────────────────────────────────

function HeroVisual() {
  const tags = ["Azure AD SSO", "Graph API Sync", "AI Questions", "POPIA/GDPR", "Anonymous Feedback", "Audit Trail"]
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Animated logo mark */}
      <div className="relative">
        <div className="absolute -inset-6 animate-[ping_3s_ease-in-out_infinite] rounded-3xl bg-primary/10" />
        <div className="absolute -inset-3 animate-[pulse_2s_ease-in-out_infinite] rounded-2xl bg-primary/15" />
        <div className="relative flex size-24 items-center justify-center rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-primary tracking-tighter">Co</span>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary/60">360</span>
          </div>
        </div>
      </div>
      {/* Capability tags */}
      <div className="flex max-w-md flex-wrap items-center justify-center gap-2">
        {tags.map((tag, i) => (
          <Badge
            key={tag}
            variant="outline"
            className="animate-[fadeSlideUp_0.5s_ease-out_both] border-primary/20 bg-primary/5 text-primary text-xs"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

function PipelineVisual() {
  const stages = [
    { name: "Nomination", desc: "Employee proposes reviewers", icon: ClipboardCheck, color: "bg-primary text-primary-foreground" },
    { name: "AI Suggestions", desc: "System recommends based on interactions", icon: Brain, color: "bg-accent text-accent-foreground" },
    { name: "Manager Approval", desc: "Direct manager finalises the list", icon: CheckCircle2, color: "bg-chart-4 text-primary-foreground" },
    { name: "Distribution", desc: "Questionnaires via email + Teams", icon: Send, color: "bg-chart-5 text-primary-foreground" },
    { name: "Collection", desc: "Automated reminders chase completion", icon: Timer, color: "bg-warning text-warning-foreground" },
    { name: "Reporting", desc: "AI narratives + benchmarks delivered", icon: TrendingUp, color: "bg-success text-success-foreground" },
  ]
  return (
    <div className="flex flex-col gap-1">
      {stages.map((stage, i) => (
        <div
          key={stage.name}
          className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50 animate-[fadeSlideUp_0.4s_ease-out_both]"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div className="relative flex flex-col items-center">
            <div className={cn("flex size-10 items-center justify-center rounded-xl shadow-sm", stage.color)}>
              <stage.icon className="size-5" />
            </div>
            {i < stages.length - 1 && (
              <div className="mt-1 h-3 w-px bg-border" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground/50">{`0${i + 1}`}</span>
              <p className="text-sm font-semibold text-foreground">{stage.name}</p>
            </div>
            <p className="text-xs text-muted-foreground">{stage.desc}</p>
          </div>
          {i < stages.length - 1 && (
            <ChevronRight className="size-3 text-border" />
          )}
        </div>
      ))}
    </div>
  )
}

function DetailVisual({ slide }: { slide: DetailSlide }) {
  const accentMap: Record<string, string> = {
    primary: "border-primary/30 bg-primary/10 text-primary shadow-primary/5",
    "chart-1": "border-chart-1/30 bg-chart-1/10 text-chart-1 shadow-chart-1/5",
    "chart-2": "border-chart-2/30 bg-chart-2/10 text-chart-2 shadow-chart-2/5",
    "chart-3": "border-chart-3/30 bg-chart-3/10 text-chart-3 shadow-chart-3/5",
    "chart-4": "border-chart-4/30 bg-chart-4/10 text-chart-4 shadow-chart-4/5",
    "chart-5": "border-chart-5/30 bg-chart-5/10 text-chart-5 shadow-chart-5/5",
    warning: "border-warning/30 bg-warning/10 text-warning shadow-warning/5",
    success: "border-success/30 bg-success/10 text-success shadow-success/5",
  }
  const checkMap: Record<string, string> = {
    primary: "text-primary",
    "chart-1": "text-chart-1",
    "chart-2": "text-chart-2",
    "chart-3": "text-chart-3",
    "chart-4": "text-chart-4",
    "chart-5": "text-chart-5",
    warning: "text-warning",
    success: "text-success",
  }
  const iconStyle = accentMap[slide.accent] || accentMap.primary
  const checkStyle = checkMap[slide.accent] || checkMap.primary
  const Icon = slide.icon

  return (
    <div className="flex flex-col gap-5">
      <div className={cn("mx-auto flex size-16 items-center justify-center rounded-2xl border shadow-lg animate-[scaleIn_0.3s_ease-out]", iconStyle)}>
        <Icon className="size-8" />
      </div>
      <div className="flex flex-col gap-2.5">
        {slide.details.map((detail, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-3 shadow-sm animate-[fadeSlideUp_0.4s_ease-out_both]"
            style={{ animationDelay: `${100 + i * 60}ms` }}
          >
            <CheckCircle2 className={cn("mt-0.5 size-4 shrink-0", checkStyle)} />
            <span className="text-sm leading-relaxed text-foreground/80">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DeliverablesVisual({ slide }: { slide: DeliverablesSlide }) {
  return (
    <div className="flex flex-col gap-2.5">
      {slide.deliverables.map((d, i) => (
        <div
          key={i}
          className="group flex gap-3.5 rounded-xl border border-border bg-card p-3.5 shadow-sm transition-all hover:border-success/30 hover:shadow-md animate-[fadeSlideUp_0.4s_ease-out_both]"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success transition-colors group-hover:bg-success group-hover:text-success-foreground">
            <d.icon className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">{d.item}</p>
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{d.detail}</p>
            <span className="mt-1.5 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {d.effort}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function SuccessVisual({ slide }: { slide: SuccessSlide }) {
  return (
    <div className="flex flex-col gap-3">
      {slide.criteria.map((c, i) => (
        <div
          key={i}
          className="flex items-start gap-3.5 rounded-xl border border-success/20 bg-success/[0.03] p-4 animate-[fadeSlideUp_0.4s_ease-out_both]"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle2 className="size-4 text-success" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{c.metric}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{c.target}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CTAVisual({ slide }: { slide: CTASlide }) {
  return (
    <div className="flex flex-col gap-3">
      {slide.nextSteps.map((s, i) => (
        <div
          key={s.step}
          className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/[0.03] p-4 animate-[fadeSlideUp_0.4s_ease-out_both]"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md shadow-primary/20">
            {s.step}
          </div>
          <p className="text-sm font-medium leading-relaxed text-foreground">{s.label}</p>
        </div>
      ))}
      <div className="mt-3 rounded-xl border border-border bg-muted/30 p-4 text-center animate-[fadeSlideUp_0.4s_ease-out_both]" style={{ animationDelay: "400ms" }}>
        <p className="text-sm leading-relaxed text-muted-foreground italic">
          {slide.contactNote}
        </p>
      </div>
    </div>
  )
}

function SlideVisual({ slide }: { slide: Slide }) {
  switch (slide.visual) {
    case "hero": return <HeroVisual />
    case "pipeline": return <PipelineVisual />
    case "detail": return <DetailVisual slide={slide} />
    case "deliverables": return <DeliverablesVisual slide={slide} />
    case "success": return <SuccessVisual slide={slide} />
    case "cta": return <CTAVisual slide={slide} />
  }
}

// ─── Category spine (left rail) ───────────────────────────────

function SlideSpine({ currentSlide }: { currentSlide: number }) {
  const categories = slides.map((s) => s.category)
  const uniqueCategories: { name: string; startIndex: number; count: number }[] = []
  categories.forEach((cat, i) => {
    const last = uniqueCategories[uniqueCategories.length - 1]
    if (last && last.name === cat) {
      last.count++
    } else {
      uniqueCategories.push({ name: cat, startIndex: i, count: 1 })
    }
  })

  return (
    <nav className="hidden w-48 shrink-0 flex-col gap-0.5 py-2 md:flex" aria-label="Tour sections">
      {uniqueCategories.map((group) => {
        const isActive = currentSlide >= group.startIndex && currentSlide < group.startIndex + group.count
        const isPast = currentSlide >= group.startIndex + group.count
        return (
          <div key={group.name + group.startIndex} className="relative flex items-center gap-3 px-5 py-2">
            {/* Active indicator line */}
            <div className={cn(
              "absolute left-0 top-1 bottom-1 w-0.5 rounded-full transition-all duration-300",
              isActive ? "bg-primary" : isPast ? "bg-primary/30" : "bg-border"
            )} />
            <div className={cn(
              "size-1.5 shrink-0 rounded-full transition-colors duration-300",
              isActive ? "bg-primary" : isPast ? "bg-primary/40" : "bg-border"
            )} />
            <span className={cn(
              "text-xs font-medium transition-colors duration-300 truncate",
              isActive ? "text-foreground" : isPast ? "text-muted-foreground" : "text-muted-foreground/50"
            )}>
              {group.name}
            </span>
            {isPast && <CheckCircle2 className="ml-auto size-3 shrink-0 text-primary/40" />}
          </div>
        )
      })}
    </nav>
  )
}

// ─── Main walkthrough component ───────────────────────────────

export function FeatureWalkthrough() {
  const { isOpen, close } = useWalkthrough()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const slide = slides[currentSlide]
  const isFirst = currentSlide === 0
  const isLast = currentSlide === slides.length - 1
  const progress = ((currentSlide + 1) / slides.length) * 100

  const navigateTo = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return
    setDirection(index > currentSlide ? "next" : "prev")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide(index)
      if (contentRef.current) contentRef.current.scrollTop = 0
      setTimeout(() => setIsAnimating(false), 50)
    }, 150)
  }, [currentSlide, isAnimating])

  const goNext = useCallback(() => {
    if (!isLast) navigateTo(currentSlide + 1)
  }, [isLast, currentSlide, navigateTo])

  const goPrev = useCallback(() => {
    if (!isFirst) navigateTo(currentSlide - 1)
  }, [isFirst, currentSlide, navigateTo])

  const handleClose = useCallback(() => {
    close()
    setCurrentSlide(0)
  }, [close])

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext() }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev() }
      if (e.key === "Escape") { handleClose() }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, goNext, goPrev, handleClose])

  if (!isOpen) return null

  const accentText: Record<string, string> = {
    primary: "text-primary",
    "chart-1": "text-chart-1",
    "chart-2": "text-chart-2",
    "chart-3": "text-chart-3",
    "chart-4": "text-chart-4",
    "chart-5": "text-chart-5",
    warning: "text-warning",
    success: "text-success",
  }

  return (
    <>
      {/* CSS for custom animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideContentIn {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideContentOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-12px); }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .slide-enter { animation: slideContentIn 0.3s ease-out both; }
        .slide-exit { animation: slideContentOut 0.15s ease-in both; }
      `}</style>

      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-md"
        style={{ animation: "overlayIn 0.3s ease-out" }}
      >
        {/* Close X */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-card/80 text-muted-foreground border border-border/50 backdrop-blur-sm transition-all hover:bg-card hover:text-foreground hover:scale-105"
          aria-label="Close walkthrough"
        >
          <X className="size-4" />
        </button>

        {/* Main card */}
        <div
          className="relative mx-3 flex w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:mx-6"
          style={{ maxHeight: "min(92vh, 780px)", animation: "cardIn 0.4s ease-out" }}
        >
          {/* Top progress bar */}
          <div className="absolute left-0 right-0 top-0 z-10 h-0.5 bg-muted">
            <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>

          {/* Left spine nav (desktop) */}
          <div className="hidden border-r border-border bg-muted/20 md:flex md:flex-col md:justify-between">
            <SlideSpine currentSlide={currentSlide} />
            <div className="px-5 py-4 border-t border-border">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-muted-foreground">CoMotion 360</span>
                <span className="text-[10px] text-muted-foreground/50">Confidential</span>
              </div>
            </div>
          </div>

          {/* Right content area */}
          <div className="flex flex-1 flex-col min-w-0">
            {/* Mobile top bar */}
            <div className="flex items-center justify-between border-b border-border px-5 pt-5 pb-3 md:px-8 md:pt-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn("text-[10px] font-semibold uppercase tracking-wider", accentText[slide.accent])}>
                  {slide.category}
                </Badge>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Scrollable content */}
            <div ref={contentRef} className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
              <div
                key={slide.id}
                className={cn("mx-auto max-w-lg", isAnimating ? "slide-exit" : "slide-enter")}
              >
                {/* Title section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground md:text-3xl">
                    {slide.title}
                  </h2>
                  <p className={cn("mt-3 text-sm font-medium leading-relaxed md:text-base", accentText[slide.accent])}>
                    {slide.subtitle}
                  </p>
                  {slide.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {slide.description}
                    </p>
                  )}
                </div>

                {/* Visual */}
                <SlideVisual slide={slide} />
              </div>
            </div>

            {/* Bottom navigation */}
            <div className="flex items-center justify-between border-t border-border px-5 py-3 md:px-8 md:py-4">
              {/* Dot indicators (mobile) + slide counter */}
              <div className="flex items-center gap-1 md:hidden">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigateTo(i)}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === currentSlide ? "w-5 bg-primary" : "w-1 bg-border"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <span className="text-[10px] text-muted-foreground">
                  Use arrow keys to navigate
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!isFirst && (
                  <Button variant="ghost" size="sm" onClick={goPrev} className="gap-1 text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="size-4" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                )}
                {isFirst && (
                  <Button variant="ghost" size="sm" onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                    Skip tour
                  </Button>
                )}
                {isLast ? (
                  <Button size="sm" onClick={handleClose} className="gap-2 bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90">
                    Open Dashboard
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button size="sm" onClick={goNext} className="gap-1.5 bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90">
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
