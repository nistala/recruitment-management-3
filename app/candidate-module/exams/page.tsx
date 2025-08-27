"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, MapPin, Trophy, CheckCircle, XCircle, AlertCircle } from "lucide-react"
// import { ExamListSkeleton } from "@/components/ui/skeleton-loader"

interface Exam {
  id: string
  title: string
  type: string
  date: string
  time: string
  duration: string
  location: string
  status: "upcoming" | "completed" | "missed"
  score?: number
  maxScore?: number
  result?: "pass" | "fail" | "pending"
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExams([
        {
          id: "1",
          title: "Software Engineering Assessment",
          type: "Technical",
          date: "2024-01-15",
          time: "10:00 AM",
          duration: "2 hours",
          location: "Online",
          status: "upcoming",
        },
        {
          id: "2",
          title: "Data Structures & Algorithms",
          type: "Technical",
          date: "2024-01-18",
          time: "2:00 PM",
          duration: "1.5 hours",
          location: "Test Center A",
          status: "upcoming",
        },
        {
          id: "3",
          title: "System Design Interview",
          type: "Technical",
          date: "2024-01-10",
          time: "11:00 AM",
          duration: "1 hour",
          location: "Online",
          status: "completed",
          score: 85,
          maxScore: 100,
          result: "pass",
        },
        {
          id: "4",
          title: "Frontend Development Test",
          type: "Technical",
          date: "2024-01-08",
          time: "3:00 PM",
          duration: "2 hours",
          location: "Test Center B",
          status: "completed",
          score: 92,
          maxScore: 100,
          result: "pass",
        },
        {
          id: "5",
          title: "Database Management",
          type: "Technical",
          date: "2024-01-05",
          time: "9:00 AM",
          duration: "1.5 hours",
          location: "Online",
          status: "completed",
          score: 68,
          maxScore: 100,
          result: "fail",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const upcomingExams = exams.filter((exam) => exam.status === "upcoming")
  const completedExams = exams.filter((exam) => exam.status === "completed")

  const getStatusIcon = (status: string, result?: string) => {
    if (status === "upcoming") return <AlertCircle className="h-5 w-5 text-blue-500" />
    if (result === "pass") return <CheckCircle className="h-5 w-5 text-green-500" />
    if (result === "fail") return <XCircle className="h-5 w-5 text-red-500" />
    return <Clock className="h-5 w-5 text-yellow-500" />
  }

  const getStatusBadge = (status: string, result?: string) => {
    if (status === "upcoming") return <Badge variant="outline">Upcoming</Badge>
    if (result === "pass") return <Badge className="bg-green-500">Passed</Badge>
    if (result === "fail") return <Badge variant="destructive">Failed</Badge>
    return <Badge variant="secondary">Pending</Badge>
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        {/* <ExamListSkeleton /> */}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Exams & Results</h1>
          <p className="text-muted-foreground">Track your exam schedule and results</p>
        </div>
        <Button>Schedule Mock Test</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-blue-100 p-2">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingExams.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-2">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Passed</p>
                <p className="text-2xl font-bold">{completedExams.filter((e) => e.result === "pass").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(completedExams.reduce((acc, exam) => acc + (exam.score || 0), 0) / completedExams.length)}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
              <TabsTrigger value="results">Results History</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingExams.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No upcoming exams</h3>
                    <p className="text-muted-foreground">Schedule a mock test to get started</p>
                  </CardContent>
                </Card>
              ) : (
                upcomingExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(exam.status)}
                            <h3 className="text-lg font-semibold">{exam.title}</h3>
                            {getStatusBadge(exam.status)}
                          </div>

                          <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{exam.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                {exam.time} ({exam.duration})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{exam.location}</span>
                            </div>
                            <Badge variant="outline">{exam.type}</Badge>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button size="sm">Join Exam</Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {completedExams.map((exam) => (
                <Card key={exam.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(exam.status, exam.result)}
                          <h3 className="text-lg font-semibold">{exam.title}</h3>
                          {getStatusBadge(exam.status, exam.result)}
                        </div>

                        <div className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{exam.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{exam.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{exam.location}</span>
                          </div>
                          <Badge variant="outline">{exam.type}</Badge>
                        </div>

                        {exam.score !== undefined && (
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold">
                              {exam.score}/{exam.maxScore}
                            </div>
                            <div className="text-lg font-semibold text-muted-foreground">
                              ({Math.round((exam.score / (exam.maxScore || 100)) * 100)}%)
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          Retake
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Calendar Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exam Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-transparent" variant="outline">
                Schedule Mock Test
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                View All Results
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
