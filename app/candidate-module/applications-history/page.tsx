"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react"

interface Application {
  id: string
  jobTitle: string
  company: string
  location: string
  appliedDate: string
  status: "applied" | "shortlisted" | "interview" | "rejected" | "selected" | "withdrawn"
  salary: string
  jobType: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all") // Updated default value to 'all'

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApplications([
        {
          id: "1",
          jobTitle: "Senior Software Engineer",
          company: "Tech Innovations Inc.",
          location: "New York, NY",
          appliedDate: "2024-01-10",
          status: "shortlisted",
          salary: "$120,000 - $150,000",
          jobType: "Full-time",
        },
        {
          id: "2",
          jobTitle: "Frontend Developer",
          company: "Creative Solutions",
          location: "Remote",
          appliedDate: "2024-01-08",
          status: "interview",
          salary: "$80 - $100/hour",
          jobType: "Contract",
        },
        {
          id: "3",
          jobTitle: "Full Stack Developer",
          company: "StartupXYZ",
          location: "San Francisco, CA",
          appliedDate: "2024-01-05",
          status: "rejected",
          salary: "$100,000 - $130,000",
          jobType: "Full-time",
        },
        {
          id: "4",
          jobTitle: "React Developer",
          company: "WebCorp",
          location: "Austin, TX",
          appliedDate: "2024-01-03",
          status: "selected",
          salary: "$95,000 - $120,000",
          jobType: "Full-time",
        },
        {
          id: "5",
          jobTitle: "Software Engineer Intern",
          company: "BigTech Corp",
          location: "Seattle, WA",
          appliedDate: "2024-01-01",
          status: "applied",
          salary: "$25/hour",
          jobType: "Internship",
        },
        {
          id: "6",
          jobTitle: "Backend Developer",
          company: "DataSystems Ltd",
          location: "Chicago, IL",
          appliedDate: "2023-12-28",
          status: "withdrawn",
          salary: "$110,000 - $140,000",
          jobType: "Full-time",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "shortlisted":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "interview":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "selected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "withdrawn":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return <Badge variant="outline">Applied</Badge>
      case "shortlisted":
        return <Badge className="bg-yellow-500">Shortlisted</Badge>
      case "interview":
        return <Badge className="bg-purple-500">Interview</Badge>
      case "selected":
        return <Badge className="bg-green-500">Selected</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "withdrawn":
        return <Badge variant="secondary">Withdrawn</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusCount = (status: string) => {
    return applications.filter((app) => app.status === status).length
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="flex space-x-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Application History</h1>
          <p className="text-muted-foreground">Track your job applications and their status</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-blue-100 p-2">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applied</p>
                <p className="text-2xl font-bold">{applications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shortlisted</p>
                <p className="text-2xl font-bold">{getStatusCount("shortlisted")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-purple-100 p-2">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Interviews</p>
                <p className="text-2xl font-bold">{getStatusCount("interview")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Selected</p>
                <p className="text-2xl font-bold">{getStatusCount("selected")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="selected">Selected</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredApplications.length} of {applications.length} applications
        </p>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(application.status)}
                    <h3 className="text-xl font-semibold">{application.jobTitle}</h3>
                    {getStatusBadge(application.status)}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{application.company}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{application.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline">{application.jobType}</Badge>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-green-600">{application.salary}</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 lg:ml-6">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Job Posting
                  </Button>
                  {application.status === "applied" && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      Withdraw
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No applications found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
