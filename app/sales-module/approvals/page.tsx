"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Check, X, Eye, Search, AlertCircle, FileText, Building2, GraduationCap, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const approvalWorkflows = [
  {
    id: 1,
    type: "employer",
    title: "TechCorp Solutions Registration",
    description: "New employer registration requiring approval",
    submittedBy: "hr@techcorp.com",
    submittedDate: "2024-01-17T10:30:00",
    priority: "high",
    status: "pending",
    category: "registration",
    documents: ["GST Certificate", "Company Registration", "PAN Card"],
    details: {
      companyName: "TechCorp Solutions",
      industry: "Technology",
      employees: "500-1000",
      location: "Bangalore",
    },
  },
  {
    id: 2,
    type: "college",
    title: "St. Xavier's College Profile Update",
    description: "College requesting profile information update",
    submittedBy: "admin@xaviers.edu",
    submittedDate: "2024-01-17T09:15:00",
    priority: "medium",
    status: "pending",
    category: "profile_update",
    documents: ["Updated Affiliation Certificate"],
    details: {
      collegeName: "St. Xavier's College",
      type: "Arts & Science",
      students: "3000-5000",
      location: "Mumbai",
    },
  },
  {
    id: 3,
    type: "job_posting",
    title: "Senior Software Engineer Position",
    description: "Job posting requiring content review",
    submittedBy: "Microsoft India",
    submittedDate: "2024-01-17T08:45:00",
    priority: "low",
    status: "pending",
    category: "job_posting",
    documents: ["Job Description", "Requirements"],
    details: {
      position: "Senior Software Engineer",
      company: "Microsoft India",
      salary: "₹15-25 LPA",
      location: "Hyderabad",
    },
  },
  {
    id: 4,
    type: "employer",
    title: "Global Finance Ltd Registration",
    description: "Employer registration approved",
    submittedBy: "careers@globalfinance.com",
    submittedDate: "2024-01-16T14:20:00",
    priority: "high",
    status: "approved",
    category: "registration",
    approvedBy: "Admin User",
    approvedDate: "2024-01-17T11:00:00",
    comments: "All documents verified. Registration approved.",
  },
]

const statusHistory = [
  {
    id: 1,
    workflowId: 1,
    status: "submitted",
    timestamp: "2024-01-17T10:30:00",
    user: "System",
    comments: "Registration submitted for review",
  },
  {
    id: 2,
    workflowId: 1,
    status: "under_review",
    timestamp: "2024-01-17T11:00:00",
    user: "Admin User",
    comments: "Started document verification process",
  },
]

export default function ApprovalWorkflows() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [comments, setComments] = useState("")

  const handleApproval = (id: number, action: "approve" | "reject") => {
    console.log(`${action} workflow ${id} with comments: ${comments}`)
    setComments("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "employer":
        return <Building2 className="h-4 w-4" />
      case "college":
        return <GraduationCap className="h-4 w-4" />
      case "candidate":
        return <Users className="h-4 w-4" />
      case "job_posting":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredWorkflows = approvalWorkflows.filter((workflow) => {
    const matchesSearch =
      workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workflow.status === statusFilter
    const matchesPriority = priorityFilter === "all" || workflow.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || workflow.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const pendingCount = approvalWorkflows.filter((w) => w.status === "pending").length
  const approvedCount = approvalWorkflows.filter((w) => w.status === "approved").length
  const rejectedCount = approvalWorkflows.filter((w) => w.status === "rejected").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Approval Workflows</h1>
        <p className="text-muted-foreground">Manage and track approval workflows across the platform.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{approvedCount}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{rejectedCount}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {approvalWorkflows.filter((w) => w.priority === "high" && w.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">High Priority</p>
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
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="registration">Registration</SelectItem>
                <SelectItem value="profile_update">Profile Update</SelectItem>
                <SelectItem value="job_posting">Job Posting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workflows Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{workflow.title}</p>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(workflow.type)}
                    <span className="capitalize">{workflow.type.replace("_", " ")}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{workflow.submittedBy}</p>
                    <p className="text-xs text-muted-foreground">{workflow.category}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{new Date(workflow.submittedDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(workflow.submittedDate).toLocaleTimeString()}
                  </p>
                </TableCell>
                <TableCell>{getPriorityBadge(workflow.priority)}</TableCell>
                <TableCell>{getStatusBadge(workflow.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedWorkflow(workflow)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Workflow Details</DialogTitle>
                          <DialogDescription>Review and manage approval workflow</DialogDescription>
                        </DialogHeader>
                        {selectedWorkflow && (
                          <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="details">Details</TabsTrigger>
                              <TabsTrigger value="history">History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Title</label>
                                  <p className="text-sm text-muted-foreground">{selectedWorkflow.title}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Type</label>
                                  <p className="text-sm text-muted-foreground capitalize">
                                    {selectedWorkflow.type.replace("_", " ")}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Submitted By</label>
                                  <p className="text-sm text-muted-foreground">{selectedWorkflow.submittedBy}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Priority</label>
                                  <div className="mt-1">{getPriorityBadge(selectedWorkflow.priority)}</div>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <p className="text-sm text-muted-foreground">{selectedWorkflow.description}</p>
                              </div>

                              {selectedWorkflow.documents && (
                                <div>
                                  <label className="text-sm font-medium">Documents</label>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedWorkflow.documents.map((doc: string, index: number) => (
                                      <Badge key={index} variant="outline">
                                        {doc}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {selectedWorkflow.details && (
                                <div>
                                  <label className="text-sm font-medium">Additional Details</label>
                                  <div className="grid grid-cols-2 gap-2 mt-1 p-3 bg-gray-50 rounded">
                                    {Object.entries(selectedWorkflow.details).map(([key, value]) => (
                                      <div key={key}>
                                        <span className="text-xs text-muted-foreground capitalize">
                                          {key.replace(/([A-Z])/g, " $1").trim()}:
                                        </span>
                                        <p className="text-sm">{value as string}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {selectedWorkflow.status === "pending" && (
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm font-medium">Comments</label>
                                    <Textarea
                                      placeholder="Add comments for approval/rejection..."
                                      value={comments}
                                      onChange={(e) => setComments(e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      className="flex-1"
                                      onClick={() => handleApproval(selectedWorkflow.id, "approve")}
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      className="flex-1"
                                      onClick={() => handleApproval(selectedWorkflow.id, "reject")}
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {selectedWorkflow.status !== "pending" && (
                                <div className="p-3 bg-gray-50 rounded">
                                  <p className="text-sm font-medium">
                                    {selectedWorkflow.status === "approved" ? "Approved" : "Rejected"} by{" "}
                                    {selectedWorkflow.approvedBy}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {selectedWorkflow.approvedDate &&
                                      new Date(selectedWorkflow.approvedDate).toLocaleString()}
                                  </p>
                                  {selectedWorkflow.comments && (
                                    <p className="text-sm mt-2">{selectedWorkflow.comments}</p>
                                  )}
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="history" className="space-y-4">
                              <div className="space-y-3">
                                {statusHistory
                                  .filter((h) => h.workflowId === selectedWorkflow.id)
                                  .map((history) => (
                                    <div key={history.id} className="flex gap-3 p-3 border rounded">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                                      <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <p className="text-sm font-medium capitalize">
                                              {history.status.replace("_", " ")}
                                            </p>
                                            <p className="text-xs text-muted-foreground">by {history.user}</p>
                                          </div>
                                          <p className="text-xs text-muted-foreground">
                                            {new Date(history.timestamp).toLocaleString()}
                                          </p>
                                        </div>
                                        {history.comments && (
                                          <p className="text-sm text-muted-foreground mt-1">{history.comments}</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>

                    {workflow.status === "pending" && (
                      <>
                        <Button size="sm" onClick={() => handleApproval(workflow.id, "approve")}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleApproval(workflow.id, "reject")}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
