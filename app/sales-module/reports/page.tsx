"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Users, DollarSign, FileText, Target } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

const jobPostingData = [
  { month: "Jan", posts: 120, applications: 2400 },
  { month: "Feb", posts: 150, applications: 3200 },
  { month: "Mar", posts: 180, applications: 4100 },
  { month: "Apr", posts: 200, applications: 4800 },
  { month: "May", posts: 220, applications: 5200 },
  { month: "Jun", posts: 250, applications: 6100 },
]

const collegeStatsData = [
  { college: "IIT Delhi", placements: 1250, students: 8000, participation: 85 },
  { college: "IIT Mumbai", placements: 1180, students: 7500, participation: 82 },
  { college: "NIT Trichy", placements: 890, students: 5200, participation: 78 },
  { college: "BITS Pilani", placements: 750, students: 4800, participation: 75 },
  { college: "VIT Vellore", placements: 680, students: 6200, participation: 72 },
]

const revenueData = [
  { month: "Jan", revenue: 850000, subscriptions: 45 },
  { month: "Feb", revenue: 920000, subscriptions: 52 },
  { month: "Mar", revenue: 1100000, subscriptions: 61 },
  { month: "Apr", revenue: 1250000, subscriptions: 68 },
  { month: "May", revenue: 1180000, subscriptions: 65 },
  { month: "Jun", revenue: 1350000, subscriptions: 74 },
]

const planDistribution = [
  { name: "Free", value: 45, color: "#8884d8" },
  { name: "Basic", value: 30, color: "#82ca9d" },
  { name: "Premium", value: 20, color: "#ffc658" },
  { name: "Enterprise", value: 5, color: "#ff7300" },
]

export default function ReportsAnalytics() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [dateRange, setDateRange] = useState<any>(null)
  const [reportType, setReportType] = useState("monthly")

  const handleExportReport = (type: string) => {
    console.log(`Exporting ${type} report`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and performance reports for your recruitment platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange />
          <Button onClick={() => handleExportReport("comprehensive")}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Total Job Posts</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">28,456</p>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-xs text-green-600">+18% from last month</p>
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
                <p className="text-2xl font-bold">4,567</p>
                <p className="text-sm text-muted-foreground">Placements</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹13.5L</p>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Job Analytics</TabsTrigger>
          <TabsTrigger value="colleges">College Stats</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Posting Trends</CardTitle>
                <CardDescription>Monthly job posts and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={jobPostingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="posts" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="applications" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
                <CardDescription>Current subscription plan breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }:any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Posting Analytics</CardTitle>
                <CardDescription>Detailed job posting statistics by employer and category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={jobPostingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="posts" fill="#8884d8" />
                    <Bar dataKey="applications" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Employers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["TechCorp Solutions", "Global Finance Ltd", "InnovateTech", "DataSystems Inc", "CloudWorks"].map(
                      (employer, index) => (
                        <div key={employer} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span className="text-sm">{employer}</span>
                          </div>
                          <Badge variant="outline">{Math.floor(Math.random() * 50) + 10} jobs</Badge>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Job Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Software Development", "Data Science", "Marketing", "Finance", "Operations"].map(
                      (category, index) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm">{category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${Math.floor(Math.random() * 80) + 20}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {Math.floor(Math.random() * 200) + 50}
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colleges" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>College Performance Statistics</CardTitle>
                <CardDescription>Placement rates and student participation across colleges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collegeStatsData.map((college) => (
                    <div key={college.college} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{college.college}</h4>
                          <p className="text-sm text-muted-foreground">{college.students} total students</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {((college.placements / college.students) * 100).toFixed(1)}% placement rate
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Placements</p>
                          <p className="font-medium">{college.placements}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Participation</p>
                          <p className="font-medium">{college.participation}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Success Rate</p>
                          <p className="font-medium">{Math.floor(Math.random() * 20) + 70}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly revenue and subscription trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "revenue" ? `₹${((value as number) / 100000).toFixed(1)}L` : value,
                        name === "revenue" ? "Revenue" : "Subscriptions",
                      ]}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="subscriptions" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { plan: "Enterprise", revenue: 675000, percentage: 50 },
                      { plan: "Premium", revenue: 405000, percentage: 30 },
                      { plan: "Basic", revenue: 202500, percentage: 15 },
                      { plan: "Other", revenue: 67500, percentage: 5 },
                    ].map((item) => (
                      <div key={item.plan} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <span className="text-sm">{item.plan}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹{(item.revenue / 100000).toFixed(1)}L</p>
                          <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "2024-01-15", amount: 125000, type: "Premium Subscription" },
                      { date: "2024-01-10", amount: 250000, type: "Enterprise Plan" },
                      { date: "2024-01-08", amount: 75000, type: "Basic Plan" },
                      { date: "2024-01-05", amount: 180000, type: "Premium Subscription" },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">{transaction.type}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <p className="text-sm font-medium">₹{(transaction.amount / 1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
