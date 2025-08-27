"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, Award, Download, Calendar } from "lucide-react"
import { ReportsSkeleton } from "@/components/ui/college-skeleton"

const performanceData = [
  { batch: "2021", avgScore: 78, students: 245 },
  { batch: "2022", avgScore: 82, students: 267 },
  { batch: "2023", avgScore: 75, students: 289 },
  { batch: "2024", avgScore: 86, students: 312 },
  { batch: "2025", avgScore: 89, students: 298 },
]

const subjectWiseData = [
  { subject: "Programming", score: 85, maxScore: 100 },
  { subject: "Database", score: 78, maxScore: 100 },
  { subject: "Algorithms", score: 72, maxScore: 100 },
  { subject: "System Design", score: 68, maxScore: 100 },
  { subject: "Aptitude", score: 82, maxScore: 100 },
  { subject: "Communication", score: 88, maxScore: 100 },
]

const placementTrendData = [
  { month: "Aug", placed: 45, interviewed: 78, applied: 156 },
  { month: "Sep", placed: 67, interviewed: 89, applied: 189 },
  { month: "Oct", placed: 89, interviewed: 134, applied: 234 },
  { month: "Nov", placed: 123, interviewed: 167, applied: 289 },
  { month: "Dec", placed: 156, interviewed: 198, applied: 345 },
  { month: "Jan", placed: 189, interviewed: 234, applied: 398 },
]

const courseDistribution = [
  { name: "Computer Science", value: 435, color: "#0088FE" },
  { name: "Information Technology", value: 298, color: "#00C49F" },
  { name: "Electronics & Communication", value: 234, color: "#FFBB28" },
  { name: "Mechanical Engineering", value: 189, color: "#FF8042" },
  { name: "Civil Engineering", value: 156, color: "#8884D8" },
]

export default function ResultsPage() {
  const [loading, setLoading] = useState(true)
  const [selectedBatch, setSelectedBatch] = useState("2025")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <ReportsSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Results & Reports</h1>
          <p className="text-muted-foreground">Comprehensive analytics and performance insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">Batch 2021</SelectItem>
              <SelectItem value="2022">Batch 2022</SelectItem>
              <SelectItem value="2023">Batch 2023</SelectItem>
              <SelectItem value="2024">Batch 2024</SelectItem>
              <SelectItem value="2025">Batch 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Average</p>
                <p className="text-2xl font-bold">84.2%</p>
                <p className="text-xs text-green-600">+5.2% from last batch</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Students Evaluated</p>
                <p className="text-2xl font-bold">1,412</p>
                <p className="text-xs text-blue-600">Across all batches</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Performers</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-orange-600">Score &gt; 90%</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Placement Rate</p>
                <p className="text-2xl font-bold">78.5%</p>
                <p className="text-xs text-purple-600">Current batch</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
          <TabsTrigger value="placement">Placement Trends</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch-wise Performance Comparison</CardTitle>
              <CardDescription>Average scores and student strength across different batches</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgScore: {
                    label: "Average Score",
                    color: "hsl(var(--chart-1))",
                  },
                  students: {
                    label: "Number of Students",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="batch" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="avgScore" fill="var(--color-avgScore)" name="Average Score (%)" />
                    <Bar yAxisId="right" dataKey="students" fill="var(--color-students)" name="Students Count" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance Analysis</CardTitle>
              <CardDescription>Performance breakdown across different subject areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectWiseData.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {subject.score}/{subject.maxScore}
                        </span>
                        <Badge
                          variant={subject.score >= 80 ? "default" : subject.score >= 60 ? "secondary" : "destructive"}
                        >
                          {subject.score}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={subject.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="placement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Placement Trends Over Time</CardTitle>
              <CardDescription>Monthly placement statistics and application trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  placed: {
                    label: "Placed",
                    color: "hsl(var(--chart-1))",
                  },
                  interviewed: {
                    label: "Interviewed",
                    color: "hsl(var(--chart-2))",
                  },
                  applied: {
                    label: "Applied",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="applied"
                      stroke="var(--color-applied)"
                      name="Applications"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="interviewed"
                      stroke="var(--color-interviewed)"
                      name="Interviews"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="placed"
                      stroke="var(--color-placed)"
                      name="Placements"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course-wise Student Distribution</CardTitle>
              <CardDescription>Student enrollment across different engineering courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <ChartContainer
                  config={{
                    value: {
                      label: "Students",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={courseDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }:any) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {courseDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="space-y-4">
                  {courseDistribution.map((course) => (
                    <div key={course.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: course.color }} />
                        <span className="font-medium">{course.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{course.value}</div>
                        <div className="text-sm text-muted-foreground">students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
