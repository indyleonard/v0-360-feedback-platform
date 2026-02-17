"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CoMotionLogo } from "@/components/comotion-logo"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
]

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <CoMotionLogo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-foreground">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Free Trial
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="w-full bg-primary text-primary-foreground">Start Free Trial</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
