"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Search, Download, User, FileText, Settings, Trash2, Edit, UserPlus, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-01-17T14:30:00",
    user: "Admin User",
    userRole: "admin",
    action: "approve_registration",
    actionType: "approval",
    target: "TechCorp Solutions",
    targetType: "employer",
    details: "Approved employer registration after document verification",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "medium",
  },
  {
    id: 2,
    timestamp: "2024-01-17T13:45:00",
    user: "Sales Manager",
    userRole: "sales",
    action: "create_campaign",
    actionType: "create",
    target: "New Year Job Fair 2024",
    targetType: "campaign",
    details: "Created new email campaign targeting employers",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    severity: "low",
  },
  {
    id: 3,
    timestamp: "2024-01-17T12:20:00",
    user: "System",
    userRole: "system",
    action: "delete_user",
    actionType: "delete",
    target: "inactive.user@example.com",
    targetType: "candidate",
    details: "Automatically deleted inactive user account after 90 days",
    ipAddress: "system",
    userAgent: "System Process",
    severity: "high",
  },
  {
    id: 4,
    timestamp: "2024-01-17T11:15:00",
    user: "Support Agent",
    userRole: "support",
    action: "update_profile",
    actionType: "update",
    target: "IIT Delhi",
    targetType: "college",
    details: "Updated college profile information and contact details",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "low",
  },
  {
    id: 5,
    timestamp: "2024-01-17T10:30:00",
    user: "Admin User",
    userRole: "admin",
    action: "reject_registration",
    actionType: "approval",
    target: "Fake Company Ltd",
    targetType: "employer",
    details: "Rejected employer registration due to invalid documents",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "medium",
  },
  {
    id: 6,
    timestamp: "2024-01-17T09:45:00",
    user: "Data Manager",
    userRole: "admin",
    action: "export_data",
    actionType: "export",
    target: "User Analytics Report",
    targetType: "report",
    details: "Exported comprehensive user analytics report for Q4 2023",
    ipAddress: "192.168.1.103",
    userAgent: "Mozilla/5.0 (Ubuntu; Linux x86_64) AppleWebKit/537.36",
    severity: "medium",
  },
  {
    id: 7,
    timestamp: "2024-01-17T08:30:00",
    user: "Security Admin",
    userRole: "admin",
    action: "change_permissions",
    actionType: "security",
    target: "sales.manager@company.com",
    targetType: "user",
    details: "Updated user permissions and role assignments",
    ipAddress: "192.168.1.104",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "high",
  },
]

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [dateRange, setDateRange] = useState("today")

  const handleExportLogs = () => {
    console.log("Exporting audit logs...")
  }

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "create":
        return <UserPlus className="h-4 w-4 text-green-600" />
      case "update":
        return <Edit className="h-4 w-4 text-blue-600" />
      case "delete":
        return <Trash2 className="h-4 w-4 text-red-600" />
      case "approval":
        return <Shield className="h-4 w-4 text-purple-600" />
      case "export":
        return <Download className="h-4 w-4 text-orange-600" />
      case "security":
        return <Settings className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>
      case "sales":
        return <Badge className="bg-blue-100 text-blue-800">Sales</Badge>
      case "support":
        return <Badge className="bg-green-100 text-green-800">Support</Badge>
      case "system":
        return <Badge className="bg-gray-100 text-gray-800">System</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || log.userRole === roleFilter
    const matchesAction = actionFilter === "all" || log.actionType === actionFilter
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter

    return matchesSearch && matchesRole && matchesAction && matchesSeverity
  })

  const totalLogs = auditLogs.length
  const highSeverityLogs = auditLogs.filter((log) => log.severity === "high").length
  const adminActions = auditLogs.filter((log) => log.userRole === "admin").length
  const systemActions = auditLogs.filter((log) => log.userRole === "system").length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">Track and monitor all system activities for security and compliance.</p>
        </div>
        <Button onClick={handleExportLogs}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalLogs}</p>
                <p className="text-sm text-muted-foreground">Total Activities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{highSeverityLogs}</p>
                <p className="text-sm text-muted-foreground">High Severity</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{adminActions}</p>
                <p className="text-sm text-muted-foreground">Admin Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Settings className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{systemActions}</p>
                <p className="text-sm text-muted-foreground">System Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="export">Export</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{new Date(log.timestamp).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                      <AvatarFallback>
                        {log.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{log.user}</p>
                      <div className="mt-1">{getRoleBadge(log.userRole)}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getActionIcon(log.actionType)}
                    <div>
                      <p className="text-sm font-medium capitalize">{log.action.replace("_", " ")}</p>
                      <p className="text-xs text-muted-foreground capitalize">{log.actionType}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-medium">{log.target}</p>
                    <p className="text-xs text-muted-foreground capitalize">{log.targetType}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground max-w-xs truncate">{log.details}</p>
                </TableCell>
                <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm font-mono">{log.ipAddress}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-32">{log.userAgent.split(" ")[0]}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No audit logs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find relevant logs.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
