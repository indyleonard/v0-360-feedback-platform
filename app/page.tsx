import { LandingNav } from "@/components/landing/landing-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CTASection } from "@/components/landing/cta-section"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <main>
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="security">
          <CTASection />
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
