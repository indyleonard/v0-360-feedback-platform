import { cn } from "@/lib/utils"

export function CoMotionLogo({ className, variant = "default" }: { className?: string; variant?: "default" | "white" | "icon" }) {
  const textColor = variant === "white" ? "text-sidebar-foreground" : "text-foreground"
  
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center size-8 rounded-lg bg-primary", className)}>
        <span className="text-primary-foreground font-bold text-sm tracking-tight">Co</span>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
        <span className="text-primary-foreground font-bold text-sm tracking-tight">Co</span>
      </div>
      <div className="flex flex-col">
        <span className={cn("text-[15px] font-bold leading-none tracking-tight", textColor)}>
          CoMotion
        </span>
        <span className={cn(
          "text-[9px] font-semibold leading-none tracking-[0.15em] uppercase mt-0.5",
          variant === "white" ? "text-sidebar-foreground/50" : "text-muted-foreground"
        )}>
          360 Feedback
        </span>
      </div>
    </div>
  )
}
