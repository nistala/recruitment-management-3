"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, Users, Briefcase, Target, CalendarIcon, FileText, Filter } from "lucide-react"
import { format } from "date-fns"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [selectedJob, setSelectedJob] = useState("all")

  // Sample data
  const overviewStats = [
    {
      title: "Total Applications",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Jobs",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      title: "Shortlisted",
      value: "342",
      change: "+8.2%",
      trend: "up",
      icon: Target,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "27.4%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const applicationTrends = [
    { month: "Jan", applications: 120, shortlisted: 35, selected: 12 },
    { month: "Feb", applications: 145, shortlisted: 42, selected: 15 },
    { month: "Mar", applications: 180, shortlisted: 55, selected: 18 },
    { month: "Apr", applications: 165, shortlisted: 48, selected: 16 },
    { month: "May", applications: 200, shortlisted: 62, selected: 22 },
    { month: "Jun", applications: 185, shortlisted: 58, selected: 20 },
  ]

  const jobPerformance = [
    {
      jobTitle: "Senior Software Engineer",
      applications: 245,
      shortlisted: 68,
      selected: 12,
      successRate: 17.6,
      status: "Active",
    },
    {
      jobTitle: "Product Manager",
      applications: 189,
      shortlisted: 45,
      selected: 8,
      successRate: 17.8,
      status: "Active",
    },
    {
      jobTitle: "UI/UX Designer",
      applications: 156,
      shortlisted: 38,
      selected: 6,
      successRate: 15.8,
      status: "Closed",
    },
    {
      jobTitle: "Data Analyst",
      applications: 134,
      shortlisted: 32,
      selected: 5,
      successRate: 15.6,
      status: "Active",
    },
    {
      jobTitle: "DevOps Engineer",
      applications: 98,
      shortlisted: 28,
      selected: 4,
      successRate: 14.3,
      status: "Active",
    },
  ]

  const skillsDistribution = [
    { name: "JavaScript", value: 35, color: "#8884d8" },
    { name: "Python", value: 28, color: "#82ca9d" },
    { name: "React", value: 22, color: "#ffc658" },
    { name: "Node.js", value: 18, color: "#ff7300" },
    { name: "Others", value: 15, color: "#00ff88" },
  ]

  const locationStats = [
    { location: "New York", applications: 342, percentage: 27.4 },
    { location: "San Francisco", applications: 298, percentage: 23.9 },
    { location: "Los Angeles", applications: 234, percentage: 18.8 },
    { location: "Chicago", applications: 187, percentage: 15.0 },
    { location: "Others", applications: 186, percentage: 14.9 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your recruitment performance</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="software">Software Engineer</SelectItem>
              <SelectItem value="product">Product Manager</SelectItem>
              <SelectItem value="design">UI/UX Designer</SelectItem>
            </SelectContent>
          </Select>

          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Overview</TabsTrigger>
          <TabsTrigger value="jobs" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Job Performance</TabsTrigger>
          <TabsTrigger value="candidates" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Candidate Analytics</TabsTrigger>
          <TabsTrigger value="trends" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Application Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={applicationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="shortlisted" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="selected" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Skills Distribution */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Skills in Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillsDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }:any) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {skillsDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Applications by Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {locationStats.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">{location.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={location.percentage} className="w-20 h-2" />
                      <span className="text-sm text-gray-600 w-12">{location.applications}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Job Performance Analysis</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Jobs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobPerformance.map((job, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{job.jobTitle}</h4>
                          <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Applications</p>
                            <p className="font-semibold text-lg">{job.applications}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Shortlisted</p>
                            <p className="font-semibold text-lg text-blue-600">{job.shortlisted}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Selected</p>
                            <p className="font-semibold text-lg text-green-600">{job.selected}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Success Rate</p>
                            <p className="font-semibold text-lg">{job.successRate}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span>{job.successRate}%</span>
                      </div>
                      <Progress value={job.successRate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#8884d8" />
                      <Bar dataKey="shortlisted" fill="#82ca9d" />
                      <Bar dataKey="selected" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Candidate Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average Experience</span>
                  <span className="font-semibold">4.2 years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Test Score</span>
                  <span className="font-semibold">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Interview Pass Rate</span>
                  <span className="font-semibold">65.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Offer Acceptance Rate</span>
                  <span className="font-semibold">82.1%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={applicationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
