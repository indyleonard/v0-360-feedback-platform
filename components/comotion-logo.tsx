import { cn } from "@/lib/utils"

export function CoMotionLogo({ className, variant = "default" }: { className?: string; variant?: "default" | "white" | "icon" }) {
  const textColor = variant === "white" ? "text-white" : "text-foreground"
  
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center size-8 rounded-lg bg-primary", className)}>
        <span className="text-primary-foreground font-bold text-sm">Co</span>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
        <span className="text-primary-foreground font-bold text-sm">Co</span>
      </div>
      <div className="flex flex-col">
        <span className={cn("text-lg font-bold leading-none tracking-tight", textColor)}>
          CoMotion
        </span>
        <span className="text-[10px] font-medium text-muted-foreground leading-none tracking-widest uppercase">
          360
        </span>
      </div>
    </div>
  )
}
