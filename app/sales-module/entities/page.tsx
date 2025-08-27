"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building2,
  GraduationCap,
  Users,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  UserX,
  UserCheck,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const entities = {
  employers: [
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "hr@techcorp.com",
      industry: "Technology",
      employees: "500-1000",
      location: "Bangalore",
      joinedDate: "2023-06-15",
      status: "active",
      jobsPosted: 45,
      plan: "Premium",
      lastActive: "2024-01-17",
    },
    {
      id: 2,
      name: "Global Finance Ltd",
      email: "careers@globalfinance.com",
      industry: "Finance",
      employees: "1000+",
      location: "Mumbai",
      joinedDate: "2023-08-22",
      status: "active",
      jobsPosted: 78,
      plan: "Enterprise",
      lastActive: "2024-01-16",
    },
    {
      id: 3,
      name: "StartupXYZ",
      email: "team@startupxyz.com",
      industry: "Technology",
      employees: "10-50",
      location: "Pune",
      joinedDate: "2023-12-10",
      status: "inactive",
      jobsPosted: 12,
      plan: "Basic",
      lastActive: "2024-01-10",
    },
  ],
  colleges: [
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      email: "placement@iitd.ac.in",
      type: "Engineering",
      students: "8000+",
      location: "New Delhi",
      joinedDate: "2023-05-20",
      status: "active",
      placements: 1250,
      plan: "Premium",
      lastActive: "2024-01-17",
    },
    {
      id: 2,
      name: "St. Xavier's College",
      email: "placements@xaviers.edu",
      type: "Arts & Science",
      students: "3000-5000",
      location: "Mumbai",
      joinedDate: "2023-07-15",
      status: "active",
      placements: 680,
      plan: "Basic",
      lastActive: "2024-01-16",
    },
  ],
  candidates: [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      qualification: "B.Tech Computer Science",
      experience: "Fresher",
      location: "Delhi",
      joinedDate: "2024-01-10",
      status: "active",
      applications: 15,
      plan: "Free",
      lastActive: "2024-01-17",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      qualification: "MBA Finance",
      experience: "2-3 years",
      location: "Mumbai",
      joinedDate: "2024-01-08",
      status: "active",
      applications: 23,
      plan: "Premium",
      lastActive: "2024-01-16",
    },
  ],
}

export default function EntitiesManagement() {
  const [selectedTab, setSelectedTab] = useState("employers")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEntity, setSelectedEntity] = useState<any>(null)

  const handleEntityAction = (id: number, action: "activate" | "deactivate" | "edit" | "delete") => {
    console.log(`${action} entity ${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>
      case "Premium":
        return <Badge className="bg-blue-100 text-blue-800">Premium</Badge>
      case "Basic":
        return <Badge className="bg-gray-100 text-gray-800">Basic</Badge>
      case "Free":
        return <Badge variant="outline">Free</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

  const renderEntityTable = (data: any[], type: string) => {
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                        <AvatarFallback>
                          {item.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{item.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined {new Date(item.joinedDate).toLocaleDateString()}
                      </p>
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
                    <div className="text-sm">
                      {type === "employers" && (
                        <>
                          <p className="font-medium">{item.jobsPosted} jobs posted</p>
                          <p className="text-muted-foreground">
                            Last active: {new Date(item.lastActive).toLocaleDateString()}
                          </p>
                        </>
                      )}
                      {type === "colleges" && (
                        <>
                          <p className="font-medium">{item.placements} placements</p>
                          <p className="text-muted-foreground">
                            Last active: {new Date(item.lastActive).toLocaleDateString()}
                          </p>
                        </>
                      )}
                      {type === "candidates" && (
                        <>
                          <p className="font-medium">{item.applications} applications</p>
                          <p className="text-muted-foreground">
                            Last active: {new Date(item.lastActive).toLocaleDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(item.plan)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedEntity(item)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEntityAction(item.id, "edit")}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {item.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleEntityAction(item.id, "deactivate")}>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleEntityAction(item.id, "activate")}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleEntityAction(item.id, "delete")}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Entities Management</h1>
        <p className="text-muted-foreground">
          Manage all registered employers, colleges, and candidates in the system.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{entities.employers.length}</p>
                <p className="text-sm text-muted-foreground">Total Employers</p>
                <p className="text-xs text-green-600">
                  {entities.employers.filter((e) => e.status === "active").length} active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{entities.colleges.length}</p>
                <p className="text-sm text-muted-foreground">Total Colleges</p>
                <p className="text-xs text-green-600">
                  {entities.colleges.filter((c) => c.status === "active").length} active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{entities.candidates.length}</p>
                <p className="text-sm text-muted-foreground">Total Candidates</p>
                <p className="text-xs text-green-600">
                  {entities.candidates.filter((c) => c.status === "active").length} active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entity Tables */}
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
          {renderEntityTable(entities.employers, "employers")}
        </TabsContent>

        <TabsContent value="colleges" className="mt-6">
          {renderEntityTable(entities.colleges, "colleges")}
        </TabsContent>

        <TabsContent value="candidates" className="mt-6">
          {renderEntityTable(entities.candidates, "candidates")}
        </TabsContent>
      </Tabs>

      {/* Entity Detail Dialog */}
      <Dialog open={!!selectedEntity} onOpenChange={() => setSelectedEntity(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Entity Details</DialogTitle>
            <DialogDescription>Detailed information about {selectedEntity?.name}</DialogDescription>
          </DialogHeader>
          {selectedEntity && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/placeholder_64px.png?height=64&width=64`} />
                  <AvatarFallback className="text-lg">
                    {selectedEntity.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedEntity.name}</h3>
                  <p className="text-muted-foreground">{selectedEntity.email}</p>
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(selectedEntity.status)}
                    {getPlanBadge(selectedEntity.plan)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <p className="text-sm text-muted-foreground">{selectedEntity.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Joined Date</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedEntity.joinedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Active</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedEntity.lastActive).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Plan</label>
                  <p className="text-sm text-muted-foreground">{selectedEntity.plan}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleEntityAction(selectedEntity.id, "edit")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Entity
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleEntityAction(
                      selectedEntity.id,
                      selectedEntity.status === "active" ? "deactivate" : "activate",
                    )
                  }
                >
                  {selectedEntity.status === "active" ? (
                    <>
                      <UserX className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
