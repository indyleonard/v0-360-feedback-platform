import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const cycles = [
  {
    name: "Q1 2026 Leadership 360",
    department: "All Departments",
    status: "active",
    completion: 87,
    participants: 142,
    dueDate: "28 Mar 2026",
  },
  {
    name: "Engineering Team Review",
    department: "Engineering",
    status: "active",
    completion: 64,
    participants: 38,
    dueDate: "15 Apr 2026",
  },
  {
    name: "New Manager Onboarding 360",
    department: "Cross-functional",
    status: "draft",
    completion: 0,
    participants: 12,
    dueDate: "01 May 2026",
  },
]

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-success/10 text-success border-success/20",
    draft: "bg-muted text-muted-foreground border-border",
    completed: "bg-primary/10 text-primary border-primary/20",
  }
  return (
    <Badge variant="outline" className={`text-[11px] font-medium ${styles[status] || styles.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export function ActiveCyclesTable() {
  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-card-foreground">Active Cycles</CardTitle>
        <CardDescription className="text-xs">Running and upcoming feedback cycles</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cycle</TableHead>
              <TableHead className="hidden text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">Dept</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Progress</TableHead>
              <TableHead className="hidden text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:table-cell">Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cycles.map((cycle) => (
              <TableRow key={cycle.name} className="border-border/40 hover:bg-muted/30 cursor-pointer transition-colors">
                <TableCell>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{cycle.name}</p>
                    <p className="text-[11px] text-muted-foreground">{cycle.participants} participants</p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-[13px] text-muted-foreground">{cycle.department}</span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={cycle.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Progress value={cycle.completion} className="h-1.5 w-16" />
                    <span className="text-[11px] font-mono tabular-nums text-muted-foreground">
                      {cycle.completion}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-[13px] text-muted-foreground">{cycle.dueDate}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
