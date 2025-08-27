"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Users, Calendar, Bell, Plus, Eye, ClockIcon, Building2 } from "lucide-react"
import { EmployerDashboardSkeleton } from "@/components/ui/employer-skeleton"
import Link from "next/link"

export default function EmployerDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <EmployerDashboardSkeleton />
  }

  const stats = [
    { title: "Active Jobs", value: "12", icon: Briefcase, color: "text-blue-600" },
    { title: "Pending Applications", value: "248", icon: Users, color: "text-green-600" },
    { title: "Scheduled Exams", value: "8", icon: Calendar, color: "text-purple-600" },
    { title: "Notifications", value: "15", icon: Bell, color: "text-orange-600" },
  ]

  const shortcuts = [
    {
      title: "Post New Job",
      description: "Create and publish a new job posting",
      icon: Plus,
      href: "/employer/jobs/create",
      color: "bg-blue-500",
    },
    {
      title: "View Candidates",
      description: "Browse and manage candidate applications",
      icon: Eye,
      href: "/employer/candidates",
      color: "bg-green-500",
    },
    {
      title: "Schedule Exam",
      description: "Set up exams and interviews",
      icon: ClockIcon,
      href: "/employer/scheduling",
      color: "bg-purple-500",
    },
  ]

  const recentApplications = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Frontend Developer",
      appliedAt: "2 hours ago",
      status: "new",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Backend Developer",
      appliedAt: "4 hours ago",
      status: "reviewed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "UI/UX Designer",
      appliedAt: "1 day ago",
      status: "shortlisted",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "David Wilson",
      position: "Data Analyst",
      appliedAt: "2 days ago",
      status: "interviewed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const upcomingExams = [
    {
      id: 1,
      title: "Frontend Developer Assessment",
      date: "Dec 28, 2024",
      time: "10:00 AM",
      candidates: 15,
    },
    {
      id: 2,
      title: "Backend Developer Test",
      date: "Dec 30, 2024",
      time: "2:00 PM",
      candidates: 8,
    },
    {
      id: 3,
      title: "UI/UX Design Challenge",
      date: "Jan 2, 2025",
      time: "11:00 AM",
      candidates: 12,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "reviewed":
        return "bg-yellow-100 text-yellow-800"
      case "shortlisted":
        return "bg-green-100 text-green-800"
      case "interviewed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, TechCorp Inc.</h1>
              <p className="text-blue-100">Manage your recruitment process efficiently</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Shortcut Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {shortcuts.map((shortcut, index) => (
          <Link key={index} href={shortcut.href}>
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-12 w-12 ${shortcut.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <shortcut.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{shortcut.title}</h3>
                    <p className="text-sm text-gray-600">{shortcut.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <Link href="/employer/candidates">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                <Avatar>
                  <AvatarImage src={application.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {application.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{application.name}</p>
                  <p className="text-sm text-gray-600">{application.position}</p>
                  <p className="text-xs text-gray-500">{application.appliedAt}</p>
                </div>
                <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Exams</CardTitle>
            <Link href="/employer/scheduling">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="p-3 rounded-lg border hover:bg-gray-50">
                <h4 className="font-medium">{exam.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm text-gray-600">
                    <p>
                      {exam.date} at {exam.time}
                    </p>
                  </div>
                  <Badge variant="secondary">{exam.candidates} candidates</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
