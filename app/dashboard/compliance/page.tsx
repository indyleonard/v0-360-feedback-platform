"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Database,
  FileText,
  Download,
  RefreshCcw,
  Cloud,
  Key,
  Eye,
  Clock,
} from "lucide-react"

const complianceChecks = [
  { name: "Data encryption at rest", status: "pass", category: "Security", detail: "AES-256 encryption on all stored data" },
  { name: "Data encryption in transit", status: "pass", category: "Security", detail: "TLS 1.3 enforced for all connections" },
  { name: "Azure AD SSO configured", status: "pass", category: "Access Control", detail: "Single sign-on via Azure Active Directory" },
  { name: "Audit logging enabled", status: "pass", category: "Audit", detail: "Full audit trail for all data access and modifications" },
  { name: "POPIA consent records", status: "pass", category: "POPIA", detail: "Electronic consent captured for all data subjects" },
  { name: "GDPR data portability", status: "pass", category: "GDPR", detail: "Export functionality available for all personal data" },
  { name: "Right to erasure", status: "pass", category: "GDPR", detail: "Automated data deletion workflows configured" },
  { name: "Data retention policy", status: "pass", category: "Governance", detail: "24-month retention period with automated purge" },
  { name: "Backup verification", status: "pass", category: "Backup", detail: "Daily backups to Azure Blob Storage verified" },
  { name: "SharePoint backup sync", status: "warning", category: "Backup", detail: "Last sync 48 hours ago - exceeds 24hr threshold" },
  { name: "Anonymity threshold enforcement", status: "pass", category: "Privacy", detail: "Minimum 5 responses before visibility" },
  { name: "Cross-border transfer assessment", status: "pass", category: "POPIA", detail: "Data residency in South Africa confirmed" },
]

const backupHistory = [
  { date: "17 Feb 2026, 02:00", type: "Full", destination: "Azure Blob", size: "2.4 GB", status: "success" },
  { date: "16 Feb 2026, 02:00", type: "Full", destination: "Azure Blob", size: "2.3 GB", status: "success" },
  { date: "16 Feb 2026, 14:00", type: "Incremental", destination: "SharePoint", size: "148 MB", status: "success" },
  { date: "15 Feb 2026, 02:00", type: "Full", destination: "Azure Blob", size: "2.3 GB", status: "success" },
  { date: "14 Feb 2026, 02:00", type: "Full", destination: "Azure Blob", size: "2.2 GB", status: "success" },
]

export default function CompliancePage() {
  const passCount = complianceChecks.filter((c) => c.status === "pass").length
  const totalChecks = complianceChecks.length
  const complianceScore = Math.round((passCount / totalChecks) * 100)

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance & Privacy</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            POPIA/GDPR compliance status, data handling controls, and backup management.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export Compliance Report
        </Button>
      </div>

      {/* Compliance Score Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card sm:col-span-1">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="relative flex size-24 items-center justify-center">
              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="6"
                  strokeDasharray={`${(complianceScore / 100) * 251} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-2xl font-bold text-card-foreground">{complianceScore}%</span>
            </div>
            <p className="mt-2 text-sm font-medium text-card-foreground">Compliance Score</p>
            <p className="text-xs text-muted-foreground">{passCount}/{totalChecks} checks passing</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card sm:col-span-3">
          <CardHeader>
            <CardTitle className="text-card-foreground">Compliance Checks</CardTitle>
            <CardDescription>Real-time compliance monitoring across POPIA, GDPR, and security controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {complianceChecks.map((check) => (
                <div
                  key={check.name}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  {check.status === "pass" ? (
                    <CheckCircle2 className="mt-0.5 size-4 text-success shrink-0" />
                  ) : (
                    <AlertTriangle className="mt-0.5 size-4 text-warning shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{check.name}</p>
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                        {check.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Handling & Retention */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Database className="size-5 text-primary" />
              Data Retention Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">Feedback data retention period</Label>
              <Select defaultValue="24">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Automated data purge</p>
                <p className="text-xs text-muted-foreground">Automatically delete data past retention period</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Pre-deletion notification</p>
                <p className="text-xs text-muted-foreground">Notify admins 30 days before data deletion</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Right to erasure requests</p>
                <p className="text-xs text-muted-foreground">Process individual data deletion requests</p>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 size-3" />
                View Requests (0)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Cloud className="size-5 text-primary" />
              Backup & Recovery
            </CardTitle>
            <CardDescription>Secure backups to SharePoint and Azure Blob Storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Backup History</span>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCcw className="size-3" />
                Backup Now
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {backupHistory.map((backup, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-success" />
                    <div>
                      <p className="text-xs font-medium text-foreground">{backup.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {backup.type} - {backup.destination}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{backup.size}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
