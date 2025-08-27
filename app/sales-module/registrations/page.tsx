"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, GraduationCap, Users, Search, Check, X, Eye, Calendar, Mail, Phone, Headphones, ShoppingCart, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

const registrationStats = [
  {
    id: 1,
    title: "Employer Registrations",
    count: 120,
    icon: Building2,
    color: "blue",
    growth: "+12% vs last month",
    lastUpdated: "2h ago",
    highlight: "Top industry: IT Services",
  },
  {
    id: 2,
    title: "College Registrations",
    count: 75,
    icon: GraduationCap,
    color: "green",
    growth: "+8 new this week",
    lastUpdated: "5h ago",
    highlight: "Active region: Hyderabad",
  },
  {
    id: 3,
    title: "Candidate Registrations",
    count: 540,
    icon: Users,
    color: "purple",
    growth: "+45 joined today",
    lastUpdated: "30m ago",
    highlight: "Trending skill: React.js",
  },
  {
    id: 4,
    title: "Exams Conducted",
    count: 32,
    icon: FileText,
    color: "orange",
    growth: "+5 this week",
    lastUpdated: "1h ago",
    highlight: "Most popular: Aptitude Test",
  },
  {
    id: 5,
    title: "Sales Deals Closed",
    count: 18,
    icon: ShoppingCart,
    color: "red",
    growth: "+3 vs last quarter",
    lastUpdated: "3h ago",
    highlight: "Highest plan: Enterprise",
  },
  {
    id: 6,
    title: "Support Tickets",
    count: 48,
    icon: Headphones,
    color: "teal",
    growth: "-4% vs last week",
    lastUpdated: "10m ago",
    highlight: "Avg resolution: 2h",
  },
];

const registrations = {
  employers: [
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "hr@techcorp.com",
      phone: "+91 98765 43210",
      industry: "Technology",
      employees: "500-1000",
      location: "Bangalore",
      registeredDate: "2024-01-15",
      status: "pending",
      documents: ["GST Certificate", "Company Registration"],
    },
    {
      id: 2,
      name: "Global Finance Ltd",
      email: "careers@globalfinance.com",
      phone: "+91 87654 32109",
      industry: "Finance",
      employees: "1000+",
      location: "Mumbai",
      registeredDate: "2024-01-14",
      status: "approved",
      documents: ["GST Certificate", "Company Registration", "Audit Report"],
    },
    {
      id: 3,
      name: "StartupXYZ",
      email: "team@startupxyz.com",
      phone: "+91 76543 21098",
      industry: "Technology",
      employees: "10-50",
      location: "Pune",
      registeredDate: "2024-01-13",
      status: "rejected",
      documents: ["Company Registration"],
    },
  ],
  colleges: [
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      email: "placement@iitd.ac.in",
      phone: "+91 11 2659 1000",
      type: "Engineering",
      students: "8000+",
      location: "New Delhi",
      registeredDate: "2024-01-16",
      status: "pending",
      documents: ["AICTE Approval", "University Affiliation"],
    },
    {
      id: 2,
      name: "St. Xavier's College",
      email: "placements@xaviers.edu",
      phone: "+91 22 2654 3000",
      type: "Arts & Science",
      students: "3000-5000",
      location: "Mumbai",
      registeredDate: "2024-01-15",
      status: "approved",
      documents: ["University Affiliation", "NAAC Certificate"],
    },
  ],
  candidates: [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98765 43210",
      qualification: "B.Tech Computer Science",
      experience: "Fresher",
      location: "Delhi",
      registeredDate: "2024-01-17",
      status: "pending",
      documents: ["Resume", "Degree Certificate"],
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 87654 32109",
      qualification: "MBA Finance",
      experience: "2-3 years",
      location: "Mumbai",
      registeredDate: "2024-01-16",
      status: "approved",
      documents: ["Resume", "Degree Certificate", "Experience Letter"],
    },
  ],
}

export default function RegistrationsManagement() {
  const [selectedTab, setSelectedTab] = useState("employers")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null)

  const handleBulkAction = (action: "approve" | "reject") => {
    console.log(`Bulk ${action} for items:`, selectedItems)
    setSelectedItems([])
  }

  const handleIndividualAction = (id: number, action: "approve" | "reject") => {
    console.log(`${action} registration ${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderRegistrationTable = (data: any[], type: string) => {
    const filteredData = data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      return matchesSearch && matchesStatus
    })

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Search ${type}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedItems.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
            <Button size="sm" onClick={() => handleBulkAction("approve")}>
              <Check className="h-4 w-4 mr-1" />
              Bulk Approve
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleBulkAction("reject")}>
              <X className="h-4 w-4 mr-1" />
              Bulk Reject
            </Button>
          </div>
        )}

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedItems(filteredData.map((item) => item.id))
                      } else {
                        setSelectedItems([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedItems([...selectedItems, item.id])
                        } else {
                          setSelectedItems(selectedItems.filter((id) => id !== item.id))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {item.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {item.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {type === "employers" && (
                        <>
                          <p>{item.industry}</p>
                          <p className="text-muted-foreground">{item.employees} employees</p>
                        </>
                      )}
                      {type === "colleges" && (
                        <>
                          <p>{item.type}</p>
                          <p className="text-muted-foreground">{item.students} students</p>
                        </>
                      )}
                      {type === "candidates" && (
                        <>
                          <p>{item.qualification}</p>
                          <p className="text-muted-foreground">{item.experience}</p>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.registeredDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedRegistration(item)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Registration Details</DialogTitle>
                            <DialogDescription>Review and manage registration for {item.name}</DialogDescription>
                          </DialogHeader>
                          {selectedRegistration && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Name</label>
                                  <p className="text-sm text-muted-foreground">{selectedRegistration.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="text-sm text-muted-foreground">{selectedRegistration.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="text-sm text-muted-foreground">{selectedRegistration.phone}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Location</label>
                                  <p className="text-sm text-muted-foreground">{selectedRegistration.location}</p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Documents</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedRegistration.documents?.map((doc: string, index: number) => (
                                    <Badge key={index} variant="outline">
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Comments</label>
                                <Textarea placeholder="Add comments for approval/rejection..." className="mt-1" />
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  className="flex-1"
                                  onClick={() => handleIndividualAction(selectedRegistration.id, "approve")}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="flex-1"
                                  onClick={() => handleIndividualAction(selectedRegistration.id, "reject")}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {item.status === "pending" && (
                        <>
                          <Button size="sm" onClick={() => handleIndividualAction(item.id, "approve")}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleIndividualAction(item.id, "reject")}
                          >
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

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold">Registrations Management</h1>
        <p className="text-muted-foreground">
          Review and manage registration requests from employers, colleges, and candidates.
        </p>
      </div>

      {/* Summary Cards */}
     <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
      {registrationStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.count}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{stat.growth}</span>
                <span>Last updated {stat.lastUpdated}</span>
              </div>
              <p
                className={`text-xs text-${stat.color}-600 bg-${stat.color}-50 rounded-md px-2 py-1 inline-block`}
              >
                {stat.highlight}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>


      {/* Registration Tables */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="employers" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Employers</TabsTrigger>
          <TabsTrigger value="colleges" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Colleges</TabsTrigger>
          <TabsTrigger value="candidates" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Candidates</TabsTrigger>
        </TabsList>

        <TabsContent value="employers" className="mt-6">
          {renderRegistrationTable(registrations.employers, "employers")}
        </TabsContent>

        <TabsContent value="colleges" className="mt-6">
          {renderRegistrationTable(registrations.colleges, "colleges")}
        </TabsContent>

        <TabsContent value="candidates" className="mt-6">
          {renderRegistrationTable(registrations.candidates, "candidates")}
        </TabsContent>
      </Tabs>
    </div>
  )
}
