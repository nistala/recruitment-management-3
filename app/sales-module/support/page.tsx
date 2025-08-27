"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Clock, CheckCircle, AlertCircle, Search, Send, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const supportTickets = [
  {
    id: 1,
    ticketNumber: "TKT-2024-001",
    title: "Unable to post job listings",
    description: "Getting error when trying to post new job openings. The form submission fails.",
    submittedBy: "hr@techcorp.com",
    userType: "employer",
    priority: "high",
    status: "open",
    category: "technical",
    assignedTo: "John Smith",
    createdDate: "2024-01-17T10:30:00",
    lastUpdated: "2024-01-17T14:20:00",
    responses: [
      {
        id: 1,
        author: "John Smith",
        authorType: "support",
        message: "Thank you for reporting this issue. I'm looking into the job posting functionality.",
        timestamp: "2024-01-17T11:00:00",
      },
      {
        id: 2,
        author: "hr@techcorp.com",
        authorType: "user",
        message: "The error occurs specifically when uploading the company logo. Error code: IMG_UPLOAD_FAILED",
        timestamp: "2024-01-17T11:30:00",
      },
    ],
  },
  {
    id: 2,
    ticketNumber: "TKT-2024-002",
    title: "Student data export not working",
    description: "Cannot export student placement data. The download button is not responding.",
    submittedBy: "placement@iitd.ac.in",
    userType: "college",
    priority: "medium",
    status: "in_progress",
    category: "feature",
    assignedTo: "Sarah Johnson",
    createdDate: "2024-01-16T15:45:00",
    lastUpdated: "2024-01-17T09:15:00",
    responses: [
      {
        id: 1,
        author: "Sarah Johnson",
        authorType: "support",
        message: "I've identified the issue with the export functionality. Working on a fix.",
        timestamp: "2024-01-17T09:15:00",
      },
    ],
  },
  {
    id: 3,
    ticketNumber: "TKT-2024-003",
    title: "Profile update request",
    description: "Need to update company information and add new office locations.",
    submittedBy: "admin@globalfinance.com",
    userType: "employer",
    priority: "low",
    status: "resolved",
    category: "account",
    assignedTo: "Mike Wilson",
    createdDate: "2024-01-15T11:20:00",
    lastUpdated: "2024-01-16T16:30:00",
    resolvedDate: "2024-01-16T16:30:00",
    responses: [
      {
        id: 1,
        author: "Mike Wilson",
        authorType: "support",
        message: "I've updated your company profile with the new information. Please review and confirm.",
        timestamp: "2024-01-16T14:00:00",
      },
      {
        id: 2,
        author: "admin@globalfinance.com",
        authorType: "user",
        message: "Perfect! Everything looks correct. Thank you for the quick resolution.",
        timestamp: "2024-01-16T16:30:00",
      },
    ],
  },
  {
    id: 4,
    ticketNumber: "TKT-2024-004",
    title: "Payment processing issue",
    description: "Premium subscription payment failed multiple times. Need assistance with billing.",
    submittedBy: "billing@startupxyz.com",
    userType: "employer",
    priority: "high",
    status: "escalated",
    category: "billing",
    assignedTo: "Lisa Chen",
    createdDate: "2024-01-17T08:15:00",
    lastUpdated: "2024-01-17T13:45:00",
    responses: [
      {
        id: 1,
        author: "Lisa Chen",
        authorType: "support",
        message: "I've escalated this to our billing team. They will contact you within 24 hours.",
        timestamp: "2024-01-17T13:45:00",
      },
    ],
  },
]

export default function SupportFeedback() {
  const [selectedTab, setSelectedTab] = useState("tickets")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [newResponse, setNewResponse] = useState("")

  const handleTicketAction = (id: number, action: "assign" | "resolve" | "escalate") => {
    console.log(`${action} ticket ${id}`)
  }

  const handleSendResponse = () => {
    if (newResponse.trim() && selectedTicket) {
      console.log("Sending response:", newResponse)
      setNewResponse("")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "escalated":
        return <Badge className="bg-red-100 text-red-800">Escalated</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "technical":
        return <Badge className="bg-purple-100 text-purple-800">Technical</Badge>
      case "billing":
        return <Badge className="bg-orange-100 text-orange-800">Billing</Badge>
      case "account":
        return <Badge className="bg-blue-100 text-blue-800">Account</Badge>
      case "feature":
        return <Badge className="bg-green-100 text-green-800">Feature</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const openTickets = supportTickets.filter((t) => t.status === "open").length
  const inProgressTickets = supportTickets.filter((t) => t.status === "in_progress").length
  const escalatedTickets = supportTickets.filter((t) => t.status === "escalated").length
  const resolvedTickets = supportTickets.filter((t) => t.status === "resolved").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Support & Feedback</h1>
        <p className="text-muted-foreground">Manage support tickets and feedback from users across the platform.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{openTickets}</p>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressTickets}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{escalatedTickets}</p>
                <p className="text-sm text-muted-foreground">Escalated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resolvedTickets}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
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
                placeholder="Search tickets..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
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
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="feature">Feature</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Support Tickets Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{ticket.ticketNumber}</p>
                    <p className="text-sm text-muted-foreground">{new Date(ticket.createdDate).toLocaleDateString()}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                      <AvatarFallback>{ticket.submittedBy.split("@")[0].slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{ticket.submittedBy}</p>
                      <p className="text-xs text-muted-foreground capitalize">{ticket.userType}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{ticket.title}</p>
                    <p className="text-sm text-muted-foreground max-w-xs truncate">{ticket.description}</p>
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                <TableCell>{getCategoryBadge(ticket.category)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`/ceholder-svg-height-24.png?height=24&width=24`} />
                      <AvatarFallback className="text-xs">
                        {ticket.assignedTo
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{ticket.assignedTo}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelectedTicket(ticket)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Ticket Details - {ticket.ticketNumber}</DialogTitle>
                        <DialogDescription>Manage and respond to support ticket</DialogDescription>
                      </DialogHeader>
                      {selectedTicket && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Title</label>
                              <p className="text-sm text-muted-foreground">{selectedTicket.title}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Status</label>
                              <div className="mt-1">{getStatusBadge(selectedTicket.status)}</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Priority</label>
                              <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Category</label>
                              <div className="mt-1">{getCategoryBadge(selectedTicket.category)}</div>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Conversation</label>
                            <div className="space-y-3 max-h-60 overflow-y-auto border rounded p-3">
                              {selectedTicket.responses?.map((response: any) => (
                                <div
                                  key={response.id}
                                  className={`flex gap-3 ${
                                    response.authorType === "support" ? "flex-row-reverse" : ""
                                  }`}
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                                    <AvatarFallback>
                                      {response.author
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className={`flex-1 ${response.authorType === "support" ? "text-right" : ""}`}>
                                    <div
                                      className={`inline-block p-3 rounded-lg max-w-xs ${
                                        response.authorType === "support" ? "bg-blue-100 text-blue-900" : "bg-gray-100"
                                      }`}
                                    >
                                      <p className="text-sm">{response.message}</p>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {response.author} • {new Date(response.timestamp).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-sm font-medium">Add Response</label>
                            <Textarea
                              placeholder="Type your response..."
                              value={newResponse}
                              onChange={(e) => setNewResponse(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button onClick={handleSendResponse} className="flex-1">
                                <Send className="h-4 w-4 mr-2" />
                                Send Response
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleTicketAction(selectedTicket.id, "resolve")}
                              >
                                Mark Resolved
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleTicketAction(selectedTicket.id, "escalate")}
                              >
                                Escalate
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
