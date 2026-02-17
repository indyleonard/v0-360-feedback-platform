"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Download, Link as LinkIcon, ExternalLink, Copy } from "lucide-react"

const people = [
  { name: "Nomsa Dlamini", initials: "ND", role: "CEO", department: "Executive", cyclesCompleted: 4, avgScore: 4.6, anonLink: "fb.co/anon-nd-7x9", status: "active" },
  { name: "James van der Merwe", initials: "JM", role: "VP Engineering", department: "Engineering", cyclesCompleted: 4, avgScore: 4.3, anonLink: "fb.co/anon-jm-3k2", status: "active" },
  { name: "Lerato Mokoena", initials: "LM", role: "Engineering Manager", department: "Engineering", cyclesCompleted: 3, avgScore: 4.5, anonLink: "fb.co/anon-lm-8p1", status: "active" },
  { name: "Sarah Williams", initials: "SW", role: "Engineering Manager", department: "Engineering", cyclesCompleted: 4, avgScore: 4.1, anonLink: "fb.co/anon-sw-5n4", status: "active" },
  { name: "Pieter Botha", initials: "PB", role: "VP Marketing", department: "Marketing", cyclesCompleted: 4, avgScore: 4.4, anonLink: "fb.co/anon-pb-2m7", status: "active" },
  { name: "Fatima Osman", initials: "FO", role: "Marketing Manager", department: "Marketing", cyclesCompleted: 3, avgScore: 4.7, anonLink: "fb.co/anon-fo-6j3", status: "active" },
  { name: "David Chen", initials: "DC", role: "Senior Engineer", department: "Engineering", cyclesCompleted: 2, avgScore: 4.2, anonLink: "fb.co/anon-dc-1r8", status: "active" },
  { name: "Priya Naidoo", initials: "PN", role: "Senior Engineer", department: "Engineering", cyclesCompleted: 3, avgScore: 4.8, anonLink: "fb.co/anon-pn-4t6", status: "active" },
  { name: "Thabo Sithole", initials: "TS", role: "Software Engineer", department: "Engineering", cyclesCompleted: 1, avgScore: 0, anonLink: "fb.co/anon-ts-9w5", status: "new" },
  { name: "Ravi Govender", initials: "RG", role: "Operations Manager", department: "Operations", cyclesCompleted: 4, avgScore: 4.0, anonLink: "fb.co/anon-rg-7h2", status: "active" },
]

export default function PeoplePage() {
  const [search, setSearch] = useState("")
  const [dept, setDept] = useState("all")

  const filtered = people.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase())
    const matchesDept = dept === "all" || p.department.toLowerCase() === dept.toLowerCase()
    return matchesSearch && matchesDept
  })

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">People</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage employees, view feedback history, and access anonymous feedback links.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export
        </Button>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-card-foreground">All Employees</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search people..."
                  className="h-8 w-48 pl-9 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger className="h-8 w-40">
                  <Filter className="mr-2 size-3" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="executive">Executive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden sm:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">Cycles</TableHead>
                <TableHead className="hidden md:table-cell">Avg Score</TableHead>
                <TableHead>Anonymous Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((person) => (
                <TableRow key={person.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {person.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-xs">{person.department}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{person.cyclesCompleted}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {person.avgScore > 0 ? (
                      <span className="text-sm font-mono font-medium text-foreground">
                        {person.avgScore.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">No data</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                        {person.anonLink}
                      </code>
                      <Button variant="ghost" size="icon" className="size-6" aria-label="Copy anonymous feedback link">
                        <Copy className="size-3" />
                      </Button>
                    </div>
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
