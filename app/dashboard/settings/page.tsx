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
  Key,
  Globe,
  Bell,
  Shield,
  Users,
  Palette,
  Database,
  CheckCircle2,
  ExternalLink,
  Mail,
  MessageSquare,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure platform settings, integrations, and preferences.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Microsoft 365 Integration</CardTitle>
                <CardDescription>Azure AD SSO and Microsoft Graph configuration</CardDescription>
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
                    <Label htmlFor="client-id">Client ID</Label>
                    <Input id="client-id" defaultValue="f9e8d7c6-b5a4-3210-fedc-ba9876543210" readOnly className="font-mono text-xs" />
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="mb-3 text-sm font-medium text-foreground">Graph API Permissions</p>
                  <div className="flex flex-wrap gap-2">
                    {["User.Read.All", "Directory.Read.All", "People.Read", "MailboxSettings.Read", "Calendars.Read"].map((perm) => (
                      <Badge key={perm} variant="outline" className="font-mono text-xs">
                        {perm}
                      </Badge>
                    ))}
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

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Backup Destinations</CardTitle>
                <CardDescription>Configure where feedback data is securely backed up</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Database className="size-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Azure Blob Storage</p>
                      <p className="text-xs text-muted-foreground">Daily full backups at 02:00 SAST</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20" variant="outline">Active</Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Database className="size-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">SharePoint Document Library</p>
                      <p className="text-xs text-muted-foreground">Incremental backups every 12 hours</p>
                    </div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20" variant="outline">Active</Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="blob-connection">Blob Storage Connection String</Label>
                  <Input id="blob-connection" type="password" defaultValue="DefaultEndpointsProtocol=https..." className="font-mono text-xs" />
                </div>

                <Button className="w-fit bg-primary text-primary-foreground hover:bg-primary/90">
                  Test Connection
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
              <CardDescription>Configure how and when reminders are sent to participants</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Send via Outlook / SMTP</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="size-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Teams Notifications</p>
                      <p className="text-xs text-muted-foreground">Send via Microsoft Teams bot</p>
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
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Enforce Azure AD SSO</p>
                  <p className="text-xs text-muted-foreground">Require all users to authenticate via Azure AD</p>
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
                  <p className="text-xs text-muted-foreground">Restrict access to specific IP ranges (admin only)</p>
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
