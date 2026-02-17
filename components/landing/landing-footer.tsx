import { CoMotionLogo } from "@/components/comotion-logo"

const footerLinks = {
  Product: ["Features", "Integrations", "Pricing", "Changelog"],
  Company: ["About", "Careers", "Blog", "Contact"],
  Legal: ["Privacy Policy", "POPIA Compliance", "GDPR", "Terms of Service"],
  Support: ["Documentation", "Help Centre", "Status", "API"],
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <CoMotionLogo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Privacy-first 360 feedback for modern organisations. Built in South Africa, trusted globally.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} CoMotion (Pty) Ltd. All rights reserved. POPIA & GDPR compliant.
          </p>
        </div>
      </div>
    </footer>
  )
}
