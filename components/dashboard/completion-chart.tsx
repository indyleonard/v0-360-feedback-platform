"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { week: "W1", engineering: 45, marketing: 52, operations: 38, finance: 40 },
  { week: "W2", engineering: 62, marketing: 68, operations: 55, finance: 58 },
  { week: "W3", engineering: 74, marketing: 78, operations: 66, finance: 72 },
  { week: "W4", engineering: 85, marketing: 82, operations: 74, finance: 80 },
  { week: "W5", engineering: 91, marketing: 88, operations: 82, finance: 86 },
  { week: "W6", engineering: 94, marketing: 92, operations: 87, finance: 91 },
]

export function CompletionChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Completion Rate by Department</CardTitle>
        <CardDescription>Q1 2026 Leadership 360 Cycle</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEngineering" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.14 190)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.14 190)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMarketing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.68 0.16 165)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.68 0.16 165)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="week" className="text-xs" tick={{ fill: "oklch(0.50 0.01 230)" }} />
              <YAxis className="text-xs" tick={{ fill: "oklch(0.50 0.01 230)" }} domain={[0, 100]} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.91 0.006 210)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="engineering"
                stroke="oklch(0.55 0.14 190)"
                fill="url(#colorEngineering)"
                strokeWidth={2}
                name="Engineering"
              />
              <Area
                type="monotone"
                dataKey="marketing"
                stroke="oklch(0.68 0.16 165)"
                fill="url(#colorMarketing)"
                strokeWidth={2}
                name="Marketing"
              />
              <Area
                type="monotone"
                dataKey="operations"
                stroke="oklch(0.45 0.08 230)"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="4 4"
                name="Operations"
              />
              <Area
                type="monotone"
                dataKey="finance"
                stroke="oklch(0.75 0.12 180)"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="4 4"
                name="Finance"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
