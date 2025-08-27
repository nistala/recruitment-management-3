"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Trophy, Bell, MapPin, Clock } from "lucide-react"
import CandidateSkeleton from "@/components/ui/candidate-skeleton"

interface DashboardData {
  candidate: {
    name: string
    avatar: string
  }
  stats: {
    jobsApplied: number
    examsScheduled: number
    results: number
    notifications: number
  }
  recentJobs: Array<{
    id: string
    title: string
    company: string
    location: string
    type: string
    postedAt: string
  }>
  upcomingExams: Array<{
    id: string
    title: string
    date: string
    time: string
    location: string
  }>
  notifications: Array<{
    id: string
    title: string
    message: string
    time: string
    read: boolean
  }>
}

export default function CandidateDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        candidate: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40&text=JD",
        },
        stats: {
          jobsApplied: 12,
          examsScheduled: 3,
          results: 8,
          notifications: 5,
        },
        recentJobs: [
          {
            id: "1",
            title: "Software Engineer",
            company: "Tech Corp",
            location: "New York",
            type: "Full-time",
            postedAt: "2 days ago",
          },
          {
            id: "2",
            title: "Frontend Developer",
            company: "StartupXYZ",
            location: "Remote",
            type: "Contract",
            postedAt: "1 week ago",
          },
          {
            id: "3",
            title: "Data Analyst",
            company: "DataCorp",
            location: "San Francisco",
            type: "Full-time",
            postedAt: "3 days ago",
          },
        ],
        upcomingExams: [
          {
            id: "1",
            title: "Software Engineering Assessment",
            date: "2024-01-15",
            time: "10:00 AM",
            location: "Online",
          },
          {
            id: "2",
            title: "Technical Interview",
            date: "2024-01-18",
            time: "2:00 PM",
            location: "Tech Corp Office",
          },
        ],
        notifications: [
          {
            id: "1",
            title: "Application Update",
            message: "Your application for Software Engineer has been shortlisted",
            time: "2 hours ago",
            read: false,
          },
          {
            id: "2",
            title: "New Job Match",
            message: "We found 3 new jobs matching your profile",
            time: "1 day ago",
            read: false,
          },
          {
            id: "3",
            title: "Exam Reminder",
            message: "Your exam is scheduled for tomorrow at 10:00 AM",
            time: "2 days ago",
            read: true,
          },
        ],
      })
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return <CandidateSkeleton />
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={data.candidate.avatar || "/placeholder.svg"}
              alt={data.candidate.name}
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {data.candidate.name}!</h1>
              <p className="text-blue-100">Ready to take the next step in your career?</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-blue-100 p-2">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jobs Applied</p>
                <p className="text-2xl font-bold">{data.stats.jobsApplied}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-2">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Exams Scheduled</p>
                <p className="text-2xl font-bold">{data.stats.examsScheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Results</p>
                <p className="text-2xl font-bold">{data.stats.results}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-red-100 p-2">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                <p className="text-2xl font-bold">{data.stats.notifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Job Opportunities</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentJobs.map((job) => (
              <div key={job.id} className="flex items-start justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job.location}</span>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{job.postedAt}</p>
                  <Button size="sm" className="mt-2">
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Exams</CardTitle>
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.upcomingExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <h4 className="font-medium">{exam.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{exam.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{exam.location}</p>
                </div>
                <Button size="sm" variant="outline">
                  Details
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Notifications Panel */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Notifications</CardTitle>
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.notifications.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 rounded-lg p-4 ${
                !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : "border"
              }`}
            >
              <div className="rounded-full bg-blue-100 p-2">
                <Bell className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
