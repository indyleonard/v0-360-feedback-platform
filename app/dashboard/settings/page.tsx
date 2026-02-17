"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  Globe,
  Bell,
  Shield,
  Palette,
  Database,
  CheckCircle2,
  ExternalLink,
  Mail,
  MessageSquare,
  Brain,
  Upload,
  FileText,
  AlertCircle,
} from "lucide-react"

// Required Graph API scopes from the scope doc
const graphPermissions = [
  { scope: "User.Read.All", purpose: "Read employee profiles and org hierarchy", status: "granted" },
  { scope: "Directory.Read.All", purpose: "Read department and team structures", status: "granted" },
  { scope: "People.Read.All", purpose: "Interaction metadata for reviewer suggestions", status: "granted" },
  { scope: "Mail.ReadBasic.All", purpose: "Email frequency metadata (no content access)", status: "granted" },
  { scope: "CallRecords.Read.All", purpose: "Teams call/meeting frequency metadata", status: "granted" },
  { scope: "ChannelMessage.Read.All", purpose: "Teams channel interaction frequency", status: "pending" },
  { scope: "Calendars.Read.All", purpose: "Meeting co-attendance patterns", status: "granted" },
  { scope: "MailboxSettings.Read", purpose: "Employee working hours and timezone", status: "granted" },
]

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure platform integrations, AI provider, company values, and delivery preferences.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Microsoft 365</TabsTrigger>
          <TabsTrigger value="ai">AI / LLM</TabsTrigger>
          <TabsTrigger value="values">Values & JD</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Globe className="size-5 text-primary" />
                  Organisation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="org-name">Organisation Name</Label>
                  <Input id="org-name" defaultValue="CoMotion (Pty) Ltd" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="domain">Primary Domain</Label>
                  <Input id="domain" defaultValue="comotion.us" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en-za">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-za">English (South Africa)</SelectItem>
                      <SelectItem value="en-gb">English (UK)</SelectItem>
                      <SelectItem value="af">Afrikaans</SelectItem>
                      <SelectItem value="zu">isiZulu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="sast">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sast">SAST (UTC+2)</SelectItem>
                      <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                      <SelectItem value="cet">CET (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Data Residency Region</Label>
                  <Select defaultValue="za">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="za">South Africa (johannesburg)</SelectItem>
                      <SelectItem value="eu">Europe (westeurope)</SelectItem>
                      <SelectItem value="uk">UK (uksouth)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Palette className="size-5 text-primary" />
                  Feedback Defaults
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Default Rating Scale</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5-point Likert Scale</SelectItem>
                      <SelectItem value="7">7-point Likert Scale</SelectItem>
                      <SelectItem value="10">10-point Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Self-assessment included</p>
                    <p className="text-xs text-muted-foreground">Include self-assessment in all cycles by default</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">AI-assisted question review</p>
                    <p className="text-xs text-muted-foreground">Require human approval for AI-generated questions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Bias detection on results</p>
                    <p className="text-xs text-muted-foreground">Run AI bias checks on all narrative summaries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Category anonymity threshold</p>
                    <p className="text-xs text-muted-foreground">Minimum respondents per category before results shown</p>
                  </div>
                  <Select defaultValue="3">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Microsoft 365 Integration */}
        <TabsContent value="integrations" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Azure AD / Entra ID Connection</CardTitle>
                <CardDescription>SSO via OIDC / SAML 2.0 and org hierarchy sync</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg border border-success/20 bg-success/5 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-success" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Azure AD Connected</p>
                      <p className="text-xs text-muted-foreground">Tenant: comotion.onmicrosoft.com</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20" variant="outline">Active</Badge>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="tenant-id">Tenant ID</Label>
                    <Input id="tenant-id" defaultValue="a1b2c3d4-e5f6-7890-abcd-ef1234567890" readOnly className="font-mono text-xs" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="client-id">App Registration Client ID</Label>
                    <Input id="client-id" defaultValue="f9e8d7c6-b5a4-3210-fedc-ba9876543210" readOnly className="font-mono text-xs" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="auth-protocol">Authentication Protocol</Label>
                    <Select defaultValue="oidc">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oidc">OpenID Connect (OIDC)</SelectItem>
                        <SelectItem value="saml">SAML 2.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="size-3" />
                    Azure Portal
                  </Button>
                  <Button variant="outline" size="sm">Reconfigure</Button>
                </div>
              </CardContent>
            </Card>

            {/* Graph API Permissions */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Microsoft Graph API Permissions</CardTitle>
                <CardDescription>
                  Required scopes for org sync, interaction metadata, and profile data.
                  Interaction metadata is used for reviewer suggestions only -- never stored or exposed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {graphPermissions.map((perm) => (
                    <div
                      key={perm.scope}
                      className="flex items-center gap-3 rounded-lg border border-border p-2.5"
                    >
                      {perm.status === "granted" ? (
                        <CheckCircle2 className="size-4 text-success shrink-0" />
                      ) : (
                        <AlertCircle className="size-4 text-warning shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <code className="text-xs font-mono font-semibold text-foreground">{perm.scope}</code>
                        <p className="text-[10px] text-muted-foreground">{perm.purpose}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[9px] shrink-0 ${
                          perm.status === "granted"
                            ? "border-success/20 bg-success/10 text-success"
                            : "border-warning/20 bg-warning/10 text-warning"
                        }`}
                      >
                        {perm.status === "granted" ? "Granted" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 gap-2">
                  <ExternalLink className="size-3" />
                  Request Pending Permissions
                </Button>
              </CardContent>
            </Card>

            {/* Backup Destinations */}
            <Card className="border-border bg-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-card-foreground">Backup Destinations</CardTitle>
                <CardDescription>
                  All feedback data backs up to CoMotion{"'"}s Azure tenant. Data ownership remains with CoMotion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <Database className="size-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Azure Blob Storage</p>
                        <p className="text-xs text-muted-foreground">Daily full backups at 02:00 SAST</p>
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20" variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">SharePoint Document Library</p>
                        <p className="text-xs text-muted-foreground">Incremental backups every 12 hours</p>
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20" variant="outline">Active</Badge>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="blob-connection">Blob Storage Connection String</Label>
                    <Input id="blob-connection" type="password" defaultValue="DefaultEndpointsProtocol=https..." className="font-mono text-xs" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="sp-url">SharePoint Library URL</Label>
                    <Input id="sp-url" defaultValue="https://comotion.sharepoint.com/sites/HR/360Backups" className="font-mono text-xs" />
                  </div>
                </div>
                <Button className="mt-4 w-fit bg-primary text-primary-foreground hover:bg-primary/90">
                  Test Connections
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI / LLM Settings */}
        <TabsContent value="ai" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Brain className="size-5 text-primary" />
                  Azure OpenAI Configuration
                </CardTitle>
                <CardDescription>
                  Azure OpenAI is preferred for data residency compliance. All LLM processing stays within your Azure tenant boundary.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg border border-success/20 bg-success/5 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-success" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Azure OpenAI Connected</p>
                      <p className="text-xs text-muted-foreground">southafricanorth.api.cognitive.microsoft.com</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20" variant="outline">Active</Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="aoai-resource">Azure OpenAI Resource Name</Label>
                  <Input id="aoai-resource" defaultValue="comotion-openai-prod" className="font-mono text-xs" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="aoai-deployment">Deployment Name</Label>
                  <Input id="aoai-deployment" defaultValue="gpt-4o" className="font-mono text-xs" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="aoai-version">API Version</Label>
                  <Input id="aoai-version" defaultValue="2025-12-01-preview" className="font-mono text-xs" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="aoai-key">API Key</Label>
                  <Input id="aoai-key" type="password" defaultValue="sk-..." className="font-mono text-xs" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Azure Region</Label>
                  <Select defaultValue="southafricanorth">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="southafricanorth">South Africa North</SelectItem>
                      <SelectItem value="westeurope">West Europe</SelectItem>
                      <SelectItem value="uksouth">UK South</SelectItem>
                      <SelectItem value="eastus">East US</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
                  Test Connection
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">AI Feature Configuration</CardTitle>
                <CardDescription>Control which AI features are enabled and how they behave</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">AI Question Generation</p>
                    <p className="text-xs text-muted-foreground">Generate 360 questions from role, JD, department, and seniority</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">AI Result Interpretation</p>
                    <p className="text-xs text-muted-foreground">Generate narrative summaries of feedback themes and sentiment</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Bias Detection</p>
                    <p className="text-xs text-muted-foreground">Flag halo effects, contradictions, and outliers in feedback</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Benchmarking Commentary</p>
                    <p className="text-xs text-muted-foreground">Contextualise results against team/department/role norms</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Tone & Bias Checks on Submissions</p>
                    <p className="text-xs text-muted-foreground">Review submitted feedback for inappropriate language before inclusion</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Signature Link AI Summarisation</p>
                    <p className="text-xs text-muted-foreground">Summarise trends from accumulated anonymous feedback</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="rounded-lg border border-border bg-muted/50 p-3 mt-2">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Provider-agnostic architecture: While Azure OpenAI is the default for data residency, the LLM layer can be swapped to any OpenAI-compatible endpoint. Contact your administrator to configure a custom provider.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Values & Job Descriptions */}
        <TabsContent value="values" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  Company Values Manifesto
                </CardTitle>
                <CardDescription>
                  Your values framework aligns signature link prompts and contextualises AI-generated questions. Upload or paste your manifesto below.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg border border-warning/20 bg-warning/5 p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="size-5 text-warning" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Values manifesto not yet uploaded</p>
                      <p className="text-xs text-muted-foreground">Required for signature link configuration and AI alignment</p>
                    </div>
                  </div>
                  <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">Pending</Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Values Framework (paste or upload)</Label>
                  <Textarea
                    placeholder="Paste your company values manifesto here...&#10;&#10;Example:&#10;1. Collaborative Excellence - We believe that the best results come from working together...&#10;2. Integrity First - We hold ourselves to the highest ethical standards...&#10;3. Continuous Growth - We are committed to learning and development..."
                    rows={8}
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2">
                    <Upload className="size-4" />
                    Upload PDF
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Values
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Database className="size-5 text-primary" />
                  Job Description Source
                </CardTitle>
                <CardDescription>
                  JDs feed AI question generation and result interpretation. Choose where employee job descriptions are sourced from.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Primary JD Source</Label>
                  <Select defaultValue="m365">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m365">M365 Employee Profile (jobTitle + aboutMe)</SelectItem>
                      <SelectItem value="sharepoint">SharePoint HR Document Library</SelectItem>
                      <SelectItem value="both">Both (M365 primary, SharePoint fallback)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="sp-jd-path">SharePoint JD Library Path</Label>
                  <Input id="sp-jd-path" placeholder="https://comotion.sharepoint.com/sites/HR/JobDescriptions" className="font-mono text-xs" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-refresh JDs on org sync</p>
                    <p className="text-xs text-muted-foreground">Re-fetch job descriptions each time org chart syncs from Graph</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <Label>Question Bank / Themes (optional)</Label>
                  <Textarea
                    placeholder="Optionally provide custom question themes or a bank of preferred questions. If left blank, AI will generate questions from the JD + values framework."
                    rows={4}
                    className="text-sm"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Leave blank to use AI-generated baseline questions
                  </p>
                </div>

                <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
                  Save JD Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Bell className="size-5 text-primary" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure delivery channels and reminder schedules. Teams is the preferred channel per scope requirements.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/[0.03] p-3">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="size-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Teams Notifications</p>
                      <p className="text-xs text-muted-foreground">Primary channel -- adaptive cards</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Fallback via Outlook / SMTP</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="mb-4 text-sm font-medium text-foreground">Reminder Schedule</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <Label>First reminder</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day after open</SelectItem>
                        <SelectItem value="3">3 days after open</SelectItem>
                        <SelectItem value="7">7 days after open</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Follow-up interval</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">Every 2 days</SelectItem>
                        <SelectItem value="3">Every 3 days</SelectItem>
                        <SelectItem value="7">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Escalation after</Label>
                    <Select defaultValue="14">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="21">21 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex flex-col gap-2">
                  <Label>Custom reminder message</Label>
                  <Textarea
                    defaultValue="Hi {name}, you have pending 360 feedback to complete for {subject}. Your input is valuable and helps drive growth. Please submit by {deadline}."
                    rows={3}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    {"Available variables: {name}, {subject}, {deadline}, {cycle_name}, {link}"}
                  </p>
                </div>
              </div>

              <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription>
                SOC 2 / ISO 27001 minimum. All data stored within Microsoft 365 tenant boundary.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Enforce Azure AD SSO</p>
                  <p className="text-xs text-muted-foreground">No separate credentials -- Azure AD is the only auth method</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Multi-factor authentication</p>
                  <p className="text-xs text-muted-foreground">Enforce MFA via Azure AD conditional access policies</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Session timeout</p>
                  <p className="text-xs text-muted-foreground">Automatically log out inactive users</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">IP allowlist</p>
                  <p className="text-xs text-muted-foreground">Restrict admin access to specific IP ranges</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Data export controls</p>
                  <p className="text-xs text-muted-foreground">Restrict bulk data exports to admin role only</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Interaction metadata retention</p>
                  <p className="text-xs text-muted-foreground">Ephemeral processing only -- metadata discarded after suggestion generation</p>
                </div>
                <Badge variant="outline" className="text-xs border-success/20 bg-success/10 text-success">
                  Enforced
                </Badge>
              </div>

              <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
