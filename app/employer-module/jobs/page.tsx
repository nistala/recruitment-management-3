"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Eye, Edit, Trash2, Users, MapPin, Calendar, DollarSign, Briefcase } from "lucide-react"
import { JobListSkeleton } from "@/components/ui/employer-skeleton"
import Link from "next/link"

export default function JobManagementPage() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setJobs([
        {
          id: 1,
          title: "Senior Frontend Developer",
          department: "Engineering",
          location: "New York, NY",
          type: "Full-time",
          salary: "$80,000 - $120,000",
          status: "active",
          applications: 45,
          postedDate: "2024-12-15",
          deadline: "2025-01-15",
        },
        {
          id: 2,
          title: "Backend Developer",
          department: "Engineering",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$90,000 - $130,000",
          status: "active",
          applications: 32,
          postedDate: "2024-12-10",
          deadline: "2025-01-10",
        },
        {
          id: 3,
          title: "UI/UX Designer",
          department: "Design",
          location: "Remote",
          type: "Contract",
          salary: "$60,000 - $80,000",
          status: "draft",
          applications: 0,
          postedDate: "2024-12-20",
          deadline: "2025-01-20",
        },
        {
          id: 4,
          title: "Data Analyst",
          department: "Analytics",
          location: "Chicago, IL",
          type: "Full-time",
          salary: "$70,000 - $95,000",
          status: "closed",
          applications: 28,
          postedDate: "2024-11-15",
          deadline: "2024-12-15",
        },
        {
          id: 5,
          title: "DevOps Engineer",
          department: "Engineering",
          location: "Austin, TX",
          type: "Full-time",
          salary: "$95,000 - $140,000",
          status: "active",
          applications: 18,
          postedDate: "2024-12-18",
          deadline: "2025-01-18",
        },
      ])
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filterJobs = (status: string) => {
    const filtered = jobs.filter(
      (job) =>
        (status === "all" || job.status === status) &&
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.department.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    return filtered
  }

  const jobCounts = {
    all: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    draft: jobs.filter((j) => j.status === "draft").length,
    closed: jobs.filter((j) => j.status === "closed").length,
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <JobListSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Job Management</h1>
          <p className="text-gray-600">Create, manage, and track your job postings</p>
        </div>
        <Link href="/employer/jobs/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs by title or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Jobs ({jobCounts.all})</TabsTrigger>
          <TabsTrigger value="active">Active ({jobCounts.active})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({jobCounts.draft})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({jobCounts.closed})</TabsTrigger>
        </TabsList>

        {["all", "active", "draft", "closed"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="space-y-4">
              {filterJobs(tab).length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-500">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No jobs found in this category</p>
                      {tab === "all" && (
                        <Link href="/employer/jobs/create">
                          <Button className="mt-4">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Your First Job
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filterJobs(tab).map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{job.title}</h3>
                              <p className="text-gray-600">{job.department}</p>
                            </div>
                            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {job.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {job.applications} applications
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">Posted: {job.postedDate}</Badge>
                            <Badge variant="outline">Deadline: {job.deadline}</Badge>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-4">
                          <Link href={`/employer/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/employer/jobs/${job.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
