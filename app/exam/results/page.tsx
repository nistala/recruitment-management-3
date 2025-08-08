"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { Search, Filter, Download, TrendingUp, Award, Users, FileText } from 'lucide-react'
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonChart } from "@/components/ui/skeleton"

const examResults = [
  { id: 1, exam: "Banking Recruitment Exam", date: "2025-07-15", appeared: 1200, passed: 450, percentage: 37.5, status: "Published" },
  { id: 2, exam: "Civil Services Preliminary", date: "2025-07-20", appeared: 800, passed: 320, percentage: 40.0, status: "Published" },
  { id: 3, exam: "Technical Aptitude Test", date: "2025-07-25", appeared: 600, passed: 480, percentage: 80.0, status: "Published" },
  { id: 4, exam: "Management Trainee Exam", date: "2025-08-01", appeared: 400, passed: 0, percentage: 0, status: "Under Review" },
]

const performanceData = [
  { subject: "Quantitative", average: 75 },
  { subject: "Reasoning", average: 68 },
  { subject: "English", average: 72 },
  { subject: "General Knowledge", average: 65 },
  { subject: "Technical", average: 78 },
]

const gradeDistribution = [
  { grade: "A+", count: 120, color: "#10b981" },
  { grade: "A", count: 180, color: "#3b82f6" },
  { grade: "B+", count: 220, color: "#f59e0b" },
  { grade: "B", count: 150, color: "#ef4444" },
  { grade: "C", count: 80, color: "#6b7280" },
]

const monthlyTrends = [
  { month: "Jan", passRate: 35 },
  { month: "Feb", passRate: 42 },
  { month: "Mar", passRate: 38 },
  { month: "Apr", passRate: 45 },
  { month: "May", passRate: 52 },
  { month: "Jun", passRate: 48 },
  { month: "Jul", passRate: 41 },
]

const stats = [
  { title: "Total Exams", value: "156", icon: FileText, color: "text-blue-600" },
  { title: "Results Published", value: "142", icon: Award, color: "text-green-600" },
  { title: "Average Pass Rate", value: "43.2%", icon: TrendingUp, color: "text-orange-600" },
  { title: "Total Candidates", value: "25,678", icon: Users, color: "text-purple-600" },
]

export default function ResultsReports() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500) // Simulate 1.5 seconds loading
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Results & Reports</h1>
          <p className="text-muted-foreground">View examination results and generate reports</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export All Reports
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
        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
            <CardDescription>Average scores across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Overall grade distribution across all exams</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ grade, percent }) => `${grade} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pass Rate Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Pass Rate Trends</CardTitle>
          <CardDescription>Monthly pass rate trends across all examinations</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <SkeletonChart />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="passRate" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Exam Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Examination Results</CardTitle>
          <CardDescription>Detailed results for all conducted examinations</CardDescription>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search exams..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <SkeletonTable rows={5} cols={7} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Appeared</TableHead>
                  <TableHead>Passed</TableHead>
                  <TableHead>Pass Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.exam}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>{result.appeared}</TableCell>
                    <TableCell>{result.passed}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          result.percentage > 50 ? "default" : 
                          result.percentage > 30 ? "secondary" : "destructive"
                        }
                      >
                        {result.percentage}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={result.status === "Published" ? "default" : "secondary"}>
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
