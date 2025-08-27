"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Users, ExternalLink, Plus, Eye, TrendingUp } from "lucide-react"
import { JobListSkeleton } from "@/components/ui/college-skeleton"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "full-time" | "internship" | "contract"
  experience: string
  salary: string
  postedDate: string
  deadline: string
  applications: number
  description: string
  requirements: string[]
  logo: string
  status: "active" | "expired" | "draft"
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "TCS",
    location: "Hyderabad",
    type: "full-time",
    experience: "0-2 years",
    salary: "₹4-7 LPA",
    postedDate: "2025-01-15",
    deadline: "2025-01-30",
    applications: 145,
    description: "We are looking for passionate software engineers to join our development team.",
    requirements: ["B.Tech/BE in CSE/IT", "Strong programming skills", "Good problem-solving abilities"],
    logo: "TC",
    status: "active",
  },
  {
    id: "2",
    title: "Frontend Developer Intern",
    company: "Infosys",
    location: "Bangalore",
    type: "internship",
    experience: "Fresher",
    salary: "₹25,000/month",
    postedDate: "2025-01-12",
    deadline: "2025-01-28",
    applications: 89,
    description: "Join our frontend development team as an intern and work on cutting-edge projects.",
    requirements: ["React.js", "JavaScript", "HTML/CSS", "Good communication skills"],
    logo: "IN",
    status: "active",
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "Wipro",
    location: "Pune",
    type: "full-time",
    experience: "0-1 years",
    salary: "₹5-8 LPA",
    postedDate: "2025-01-10",
    deadline: "2025-01-25",
    applications: 67,
    description: "Analyze data to provide business insights and support decision-making processes.",
    requirements: ["Statistics background", "SQL", "Python/R", "Data visualization tools"],
    logo: "WI",
    status: "active",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Accenture",
    location: "Chennai",
    type: "full-time",
    experience: "1-3 years",
    salary: "₹8-12 LPA",
    postedDate: "2025-01-08",
    deadline: "2025-01-20",
    applications: 34,
    description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
    requirements: ["AWS/Azure", "Docker", "Kubernetes", "CI/CD tools"],
    logo: "AC",
    status: "expired",
  },
]

export default function JobsPage() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = jobs

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((job) => job.type === selectedType)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((job) => job.status === selectedStatus)
    }

    setFilteredJobs(filtered)
  }, [searchTerm, selectedType, selectedStatus, jobs])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", variant: "default" as const, color: "bg-green-100 text-green-800" },
      expired: { label: "Expired", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
      draft: { label: "Draft", variant: "secondary" as const, color: "bg-gray-100 text-gray-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      "full-time": { label: "Full Time", color: "bg-blue-100 text-blue-800" },
      internship: { label: "Internship", color: "bg-orange-100 text-orange-800" },
      contract: { label: "Contract", color: "bg-purple-100 text-purple-800" },
    }

    const config = typeConfig[type as keyof typeof typeConfig]
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return <JobListSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Job Notifications</h1>
          <p className="text-muted-foreground">Manage job opportunities and track student applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/college/jobs/analytics">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Link>
          </Button>
          <Button asChild>
            <Link href="/college/jobs/create">
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder-icon.png?height=48&width=48&text=${job.logo}`} />
                      <AvatarFallback>{job.logo}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-muted-foreground font-medium">{job.company}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.applications} applications
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    {getTypeBadge(job.type)}
                    <Badge variant="outline">{job.experience}</Badge>
                    <Badge variant="outline" className="text-green-700 bg-green-50">
                      {job.salary}
                    </Badge>
                  </div>
                </div>

                <div className="text-right space-y-2 flex-shrink-0">
                  <p className="text-sm text-muted-foreground">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/college/jobs/${job.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/college/jobs/${job.id}/apply`}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Apply
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="h-24 w-24 rounded-full bg-muted mx-auto flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
