"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Brain, BarChart3, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary px-4 py-1.5 text-sm font-medium">
            Privacy-First. AI-Powered. Microsoft 365 Integrated.
          </Badge>
          
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            360 Feedback that
            <span className="block text-primary">actually works</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            CoMotion 360 syncs with your Microsoft 365 org chart, uses AI to generate role-aware questions, 
            and delivers bias-checked narrative summaries. All with POPIA/GDPR-grade privacy built in.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2 border-border text-foreground">
              Book a Demo
            </Button>
          </div>
        </div>
        
        {/* Feature pills */}
        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {[
            { icon: Shield, label: "POPIA & GDPR Compliant" },
            { icon: Brain, label: "AI-Generated Questions" },
            { icon: BarChart3, label: "Bias-Checked Analytics" },
            { icon: Users, label: "Live Org-Chart Sync" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground shadow-sm"
            >
              <item.icon className="size-4 text-primary" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
