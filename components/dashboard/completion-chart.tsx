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
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-card-foreground">Completion by Department</CardTitle>
        <CardDescription className="text-xs">Q1 2026 Leadership 360 Cycle</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="colorEngineering" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#da386d" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#da386d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMarketing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#09172b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#09172b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e6ea" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: "#5c6578", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5c6578", fontSize: 11 }} domain={[0, 100]} unit="%" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e4e6ea",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(9,23,43,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="engineering"
                stroke="#da386d"
                fill="url(#colorEngineering)"
                strokeWidth={2}
                name="Engineering"
              />
              <Area
                type="monotone"
                dataKey="marketing"
                stroke="#09172b"
                fill="url(#colorMarketing)"
                strokeWidth={2}
                name="Marketing"
              />
              <Area
                type="monotone"
                dataKey="operations"
                stroke="#5c6578"
                fill="transparent"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                name="Operations"
              />
              <Area
                type="monotone"
                dataKey="finance"
                stroke="#e85d8a"
                fill="transparent"
                strokeWidth={1.5}
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
