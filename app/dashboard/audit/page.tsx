"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Download,
  Filter,
  Eye,
  Edit3,
  Trash2,
  LogIn,
  UserPlus,
  Send,
  Shield,
  FileText,
  Settings,
  Key,
} from "lucide-react"

const auditEvents = [
  {
    timestamp: "2026-02-17 14:23:01",
    user: "Tjaart Esterhuyse",
    role: "HR Admin",
    action: "Viewed feedback report",
    resource: "Lerato Mokoena - Q1 2026 360",
    ip: "196.xxx.xxx.12",
    type: "read",
    icon: Eye,
  },
  {
    timestamp: "2026-02-17 14:15:32",
    user: "System",
    role: "Automated",
    action: "Sent reminder emails",
    resource: "Q1 2026 Leadership 360 - 23 pending",
    ip: "Internal",
    type: "system",
    icon: Send,
  },
  {
    timestamp: "2026-02-17 13:52:18",
    user: "Tjaart Esterhuyse",
    role: "HR Admin",
    action: "Exported compliance report",
    resource: "POPIA Audit Report - Feb 2026",
    ip: "196.xxx.xxx.12",
    type: "export",
    icon: Download,
  },
  {
    timestamp: "2026-02-17 13:41:09",
    user: "James van der Merwe",
    role: "Manager",
    action: "Submitted feedback",
    resource: "360 Review - David Chen",
    ip: "41.xxx.xxx.88",
    type: "write",
    icon: Edit3,
  },
  {
    timestamp: "2026-02-17 12:30:45",
    user: "Tjaart Esterhuyse",
    role: "HR Admin",
    action: "Updated retention policy",
    resource: "Data Retention - 24 months",
    ip: "196.xxx.xxx.12",
    type: "config",
    icon: Settings,
  },
  {
    timestamp: "2026-02-17 11:15:22",
    user: "Nomsa Dlamini",
    role: "Executive",
    action: "Logged in via Azure AD SSO",
    resource: "Session started",
    ip: "105.xxx.xxx.34",
    type: "auth",
    icon: LogIn,
  },
  {
    timestamp: "2026-02-17 10:48:17",
    user: "System",
    role: "Automated",
    action: "AI questions generated",
    resource: "Product Manager role - 8 questions",
    ip: "Internal",
    type: "system",
    icon: FileText,
  },
  {
    timestamp: "2026-02-17 09:22:55",
    user: "System",
    role: "Automated",
    action: "Org chart synced",
    resource: "Microsoft Graph - 1,247 employees",
    ip: "Internal",
    type: "system",
    icon: UserPlus,
  },
  {
    timestamp: "2026-02-17 02:00:01",
    user: "System",
    role: "Automated",
    action: "Full backup completed",
    resource: "Azure Blob Storage - 2.4 GB",
    ip: "Internal",
    type: "system",
    icon: Shield,
  },
  {
    timestamp: "2026-02-16 23:15:44",
    user: "Tjaart Esterhuyse",
    role: "HR Admin",
    action: "Updated anonymity threshold",
    resource: "Minimum responses: 5",
    ip: "196.xxx.xxx.12",
    type: "config",
    icon: Key,
  },
]

function TypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; className: string }> = {
    read: { label: "Read", className: "bg-primary/10 text-primary border-primary/20" },
    write: { label: "Write", className: "bg-success/10 text-success border-success/20" },
    export: { label: "Export", className: "bg-accent/10 text-accent border-accent/20" },
    auth: { label: "Auth", className: "bg-muted text-muted-foreground border-border" },
    system: { label: "System", className: "bg-secondary text-secondary-foreground border-border" },
    config: { label: "Config", className: "bg-warning/10 text-warning border-warning/20" },
    delete: { label: "Delete", className: "bg-destructive/10 text-destructive border-destructive/20" },
  }
  const c = config[type] || config.system
  return (
    <Badge variant="outline" className={`text-[10px] ${c.className}`}>
      {c.label}
    </Badge>
  )
}

export default function AuditPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = auditEvents.filter((e) => {
    const matchesSearch =
      e.action.toLowerCase().includes(search.toLowerCase()) ||
      e.user.toLowerCase().includes(search.toLowerCase()) ||
      e.resource.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || e.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete audit trail of all platform activity for POPIA/GDPR compliance.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export Audit Log
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-card-foreground">Activity Log</CardTitle>
              <CardDescription>All actions are logged with timestamp, user, and IP address</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="h-8 w-48 pl-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-8 w-32">
                  <Filter className="mr-2 size-3" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="write">Write</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                  <SelectItem value="auth">Auth</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="config">Config</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden md:table-cell">Resource</TableHead>
                <TableHead className="hidden lg:table-cell">IP</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((event, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-xs font-mono text-muted-foreground">{event.timestamp}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.user}</p>
                      <p className="text-xs text-muted-foreground">{event.role}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <event.icon className="size-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{event.action}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{event.resource}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                      {event.ip}
                    </code>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={event.type} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
