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
  const variants: Record<string, string> = {
    active: "bg-success/10 text-success border-success/20",
    draft: "bg-muted text-muted-foreground border-border",
    completed: "bg-primary/10 text-primary border-primary/20",
    closed: "bg-muted text-muted-foreground border-border",
  }

  return (
    <Badge variant="outline" className={variants[status] || variants.draft}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export function ActiveCyclesTable() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Active Feedback Cycles</CardTitle>
        <CardDescription>Currently running and upcoming cycles</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cycle Name</TableHead>
              <TableHead className="hidden sm:table-cell">Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead className="hidden md:table-cell">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cycles.map((cycle) => (
              <TableRow key={cycle.name}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{cycle.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cycle.participants} participants
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-sm text-muted-foreground">{cycle.department}</span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={cycle.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={cycle.completion} className="h-2 w-16" />
                    <span className="text-xs text-muted-foreground font-mono">
                      {cycle.completion}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{cycle.dueDate}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
