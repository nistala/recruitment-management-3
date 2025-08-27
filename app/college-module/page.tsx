"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BriefcaseIcon,
  ClipboardCheck,
  Bell,
  GraduationCap,
  Award,
  Calendar,
  TrendingUp,
  UserPlus,
  FileText,
  Target,
} from "lucide-react"
// import { CollegeDashboardSkeleton } from "@/components/ui/college-skeleton"
import Link from "next/link"

export default function CollegePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Placements",
      value: "156",
      change: "+8%",
      icon: BriefcaseIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Upcoming Exams",
      value: "23",
      change: "+15%",
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Notifications",
      value: "45",
      change: "+5%",
      icon: Bell,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const quickActions = [
    {
      title: "Add Student",
      description: "Register new student",
      href: "/college/students/add",
      icon: UserPlus,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "View Reports",
      description: "Student performance reports",
      href: "/college/results",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Post Job",
      description: "Add job notification",
      href: "/college/jobs/create",
      icon: BriefcaseIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Schedule Drive",
      description: "Organize placement drive",
      href: "/college/drives/schedule",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Create Exam",
      description: "Set up mock test",
      href: "/college/exams/create",
      icon: Target,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Analytics",
      description: "View detailed insights",
      href: "/college/results/batch",
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "placement",
      title: "New Placement Drive Scheduled",
      description: "TCS Campus Drive - 25th January 2025",
      time: "2 hours ago",
      avatar: "TC",
    },
    {
      id: 2,
      type: "exam",
      title: "Mock Test Results Published",
      description: "Software Engineering - Batch 2025",
      time: "4 hours ago",
      avatar: "SE",
    },
    {
      id: 3,
      type: "student",
      title: "Student Application Submitted",
      description: "Rahul Sharma applied for Java Developer position",
      time: "6 hours ago",
      avatar: "RS",
    },
    {
      id: 4,
      type: "job",
      title: "New Job Notification Posted",
      description: "Frontend Developer - Infosys",
      time: "8 hours ago",
      avatar: "IN",
    },
  ]

  const topPerformers = [
    { name: "Priya Singh", score: 96, batch: "2025", course: "CSE" },
    { name: "Amit Kumar", score: 94, batch: "2025", course: "IT" },
    { name: "Sneha Reddy", score: 92, batch: "2024", course: "ECE" },
    { name: "Rohit Sharma", score: 91, batch: "2025", course: "CSE" },
  ]

  if (loading) {
    // return <CollegeDashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-lg bg-blue-600 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-blue-900">Welcome to Tech College Portal</CardTitle>
              <CardDescription className="text-blue-700">
                Manage students, placements, and examinations efficiently
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 justify-start bg-transparent"
                  asChild
                >
                  <Link href={action.href}>
                    <div className={`h-10 w-10 rounded-lg ${action.bgColor} flex items-center justify-center mr-3`}>
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder-40x40.png?height=40&width=40&text=${activity.avatar}`} />
                  <AvatarFallback>{activity.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>Highest scoring students this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.name} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {student.course} • Batch {student.batch}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{student.score}%</p>
                  <Progress value={student.score} className="w-16 h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Placement Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Placement Statistics
            </CardTitle>
            <CardDescription>Current placement status overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Placed Students</span>
                <span className="font-medium">1,245 / 2,000 (62%)</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Interview Scheduled</span>
                <span className="font-medium">450 students</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Applications Sent</span>
                <span className="font-medium">800 applications</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹8.5L</div>
                <div className="text-xs text-muted-foreground">Avg. Package</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">₹25L</div>
                <div className="text-xs text-muted-foreground">Highest Package</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
