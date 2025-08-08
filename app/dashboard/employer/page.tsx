"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Search, Filter, Plus, Building2, Users, CheckCircle, Clock } from 'lucide-react'
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonChart } from "@/components/ui/skeleton"

const jobNotifications = [
  { id: 1, title: "Software Engineer", department: "IT", applications: 245, deadline: "2025-08-20", status: "Active" },
  { id: 2, title: "Data Analyst", department: "Analytics", applications: 189, deadline: "2025-08-25", status: "Active" },
  { id: 3, title: "Project Manager", department: "Operations", applications: 156, deadline: "2025-08-30", status: "Draft" },
]

const candidateStatus = [
  { name: "Applied", count: 1200 },
  { name: "Qualified", count: 800 },
  { name: "Joined", count: 450 },
  { name: "Merit Listed", count: 200 },
]

const applicationTrends = [
  { month: "Jan", applications: 400 },
  { month: "Feb", applications: 300 },
  { month: "Mar", applications: 500 },
  { month: "Apr", applications: 450 },
  { month: "May", applications: 600 },
  { month: "Jun", applications: 750 },
]

const stats = [
  { title: "Active Job Posts", value: "24", icon: Building2, color: "text-blue-600" },
  { title: "Total Applications", value: "3,456", icon: Users, color: "text-green-600" },
  { title: "Qualified Candidates", value: "892", icon: CheckCircle, color: "text-orange-600" },
  { title: "Pending Reviews", value: "156", icon: Clock, color: "text-purple-600" },
]

export default function EmployerDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500) // Simulate 1.5 seconds loading
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage job postings and candidate applications</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-2">
              <CardHeader className="flex flex-row items-center justify-between p-0 mb-1">
                <CardTitle className="text-sm font-medium mr-1">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent className="p-0 m-0 mt-0">
                <div className="text-xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Application Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Monthly application statistics</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={applicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Candidate Status */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Status Overview</CardTitle>
            <CardDescription>Current status of all applications</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={candidateStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Job Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Job Notifications</CardTitle>
          <CardDescription>Manage your job postings and filter candidates</CardDescription>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search job postings..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by caste" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="obc">OBC</SelectItem>
                <SelectItem value="sc">SC</SelectItem>
                <SelectItem value="st">ST</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="telangana">Telangana</SelectItem>
                <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <SkeletonTable rows={5} cols={6} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-8">Job Title</TableHead>
                  <TableHead className="px-8">Department</TableHead>
                  <TableHead className="px-8">Applications</TableHead>
                  <TableHead className="px-8">Deadline</TableHead>
                  <TableHead className="px-8">Status</TableHead>
                  <TableHead className="px-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobNotifications.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium px-8">{job.title}</TableCell>
                    <TableCell className="px-8">{job.department}</TableCell>
                    <TableCell className="px-8">{job.applications}</TableCell>
                    <TableCell className="px-8">{job.deadline}</TableCell>
                    <TableCell className="px-8">
                      <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Candidates</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Candidate List for Registered Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Latest candidate applications for your job postings</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <SkeletonTable rows={2} cols={7} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Job Applied</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Ravi Kumar</TableCell>
                  <TableCell>Software Engineer</TableCell>
                  <TableCell>B.Tech CSE</TableCell>
                  <TableCell>3 years</TableCell>
                  <TableCell>2025-08-06</TableCell>
                  <TableCell>
                    <Badge variant="outline">Under Review</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">Schedule Interview</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Priya Sharma</TableCell>
                  <TableCell>Data Analyst</TableCell>
                  <TableCell>M.Sc Statistics</TableCell>
                  <TableCell>2 years</TableCell>
                  <TableCell>2025-08-05</TableCell>
                  <TableCell>
                    <Badge variant="default">Qualified</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">Send Offer</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}