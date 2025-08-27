"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Bell, Search, MapPin, Clock, Briefcase, Plus, Settings, Trash2, ExternalLink } from "lucide-react"

interface SavedJob {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  savedDate: string
  isActive: boolean
}

interface JobAlert {
  id: string
  name: string
  keywords: string[]
  location: string
  jobType: string
  salaryMin: string
  salaryMax: string
  emailNotifications: boolean
  pushNotifications: boolean
  frequency: "daily" | "weekly" | "instant"
  isActive: boolean
}

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSavedJobs([
        {
          id: "1",
          title: "Senior React Developer",
          company: "TechFlow Inc.",
          location: "New York, NY",
          type: "Full-time",
          salary: "$130,000 - $160,000",
          description: "We are looking for an experienced React developer to join our team...",
          savedDate: "2024-01-12",
          isActive: true,
        },
        {
          id: "2",
          title: "Full Stack Engineer",
          company: "Innovation Labs",
          location: "Remote",
          type: "Full-time",
          salary: "$120,000 - $150,000",
          description: "Join our dynamic team as a Full Stack Engineer working with modern technologies...",
          savedDate: "2024-01-10",
          isActive: true,
        },
        {
          id: "3",
          title: "Frontend Developer",
          company: "Creative Studio",
          location: "San Francisco, CA",
          type: "Contract",
          salary: "$85 - $110/hour",
          description: "Create beautiful and intuitive user interfaces for our clients...",
          savedDate: "2024-01-08",
          isActive: false,
        },
        {
          id: "4",
          title: "Software Engineer",
          company: "StartupXYZ",
          location: "Austin, TX",
          type: "Full-time",
          salary: "$100,000 - $130,000",
          description: "Help us build the next generation of software solutions...",
          savedDate: "2024-01-05",
          isActive: true,
        },
      ])

      setJobAlerts([
        {
          id: "1",
          name: "React Developer Jobs",
          keywords: ["React", "JavaScript", "Frontend"],
          location: "New York",
          jobType: "Full-time",
          salaryMin: "100000",
          salaryMax: "150000",
          emailNotifications: true,
          pushNotifications: false,
          frequency: "daily",
          isActive: true,
        },
        {
          id: "2",
          name: "Remote Software Jobs",
          keywords: ["Software Engineer", "Full Stack", "Remote"],
          location: "Remote",
          jobType: "Full-time",
          salaryMin: "120000",
          salaryMax: "180000",
          emailNotifications: true,
          pushNotifications: true,
          frequency: "instant",
          isActive: true,
        },
        {
          id: "3",
          name: "Contract Opportunities",
          keywords: ["Contract", "Freelance", "Consultant"],
          location: "Any",
          jobType: "Contract",
          salaryMin: "80",
          salaryMax: "150",
          emailNotifications: false,
          pushNotifications: true,
          frequency: "weekly",
          isActive: false,
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const removeSavedJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId))
  }

  const toggleJobAlert = (alertId: string) => {
    setJobAlerts(jobAlerts.map((alert) => (alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const removeJobAlert = (alertId: string) => {
    setJobAlerts(jobAlerts.filter((alert) => alert.id !== alertId))
  }

  const filteredSavedJobs = savedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
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
          <h1 className="text-3xl font-bold">Saved Jobs & Alerts</h1>
          <p className="text-muted-foreground">Manage your saved jobs and job alerts</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Job Alert
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
          <TabsTrigger value="alerts">Job Alerts ({jobAlerts.filter((a) => a.isActive).length})</TabsTrigger>
        </TabsList>

        {/* Saved Jobs Tab */}
        <TabsContent value="saved" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search saved jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Saved Jobs List */}
          <div className="space-y-4">
            {filteredSavedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-5 w-5 text-red-500 fill-current" />
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        {!job.isActive && <Badge variant="secondary">Expired</Badge>}
                      </div>

                      <p className="text-lg text-muted-foreground">{job.company}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Saved: {new Date(job.savedDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground">{job.description}</p>

                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-green-600">{job.salary}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:ml-6">
                      <Button className="w-full lg:w-auto" disabled={!job.isActive}>
                        {job.isActive ? "Apply Now" : "No Longer Available"}
                      </Button>
                      <Button variant="outline" className="w-full lg:w-auto bg-transparent">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full lg:w-auto text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => removeSavedJob(job.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSavedJobs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No saved jobs found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search criteria" : "Start saving jobs to see them here"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Job Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            {jobAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">{alert.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Switch checked={alert.isActive} onCheckedChange={() => toggleJobAlert(alert.id)} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeJobAlert(alert.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">Keywords</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {alert.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <p className="text-sm text-muted-foreground mt-1">{alert.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Job Type</Label>
                      <p className="text-sm text-muted-foreground mt-1">{alert.jobType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Salary Range</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${alert.salaryMin} - ${alert.salaryMax}
                        {alert.jobType === "Contract" ? "/hour" : "/year"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Email: {alert.emailNotifications ? "On" : "Off"}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Push: {alert.pushNotifications ? "On" : "Off"}</span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {alert.frequency}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {jobAlerts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No job alerts set up</h3>
                <p className="text-muted-foreground">Create job alerts to get notified about new opportunities</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Alert
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
