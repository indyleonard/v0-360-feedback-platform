"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-primary py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Ready to transform your feedback culture?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80 leading-relaxed">
          Join organisations across South Africa and beyond using CoMotion 360 
          for privacy-first, AI-powered 360 feedback.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8">
              Get Started Free
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
