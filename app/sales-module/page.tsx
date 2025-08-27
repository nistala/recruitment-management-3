"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Building2,
  GraduationCap,
  DollarSign,
  Clock,
  TrendingUp,
  FileCheck,
  BarChart3,
  Mail,
  ArrowRight,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    title: "Total Employers",
    value: "2,847",
    change: "+12%",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Colleges",
    value: "1,234",
    change: "+8%",
    icon: GraduationCap,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Total Candidates",
    value: "45,678",
    change: "+23%",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Monthly Revenue",
    value: "₹12.5L",
    change: "+15%",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Pending Approvals",
    value: "127",
    change: "-5%",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

const shortcuts = [
  {
    title: "Pending Approvals",
    description: "Review and approve registrations",
    icon: FileCheck,
    href: "/admin/approvals",
    count: 127,
    urgent: true,
  },
  {
    title: "Generate Reports",
    description: "Create analytics and performance reports",
    icon: BarChart3,
    href: "/admin/reports",
    count: null,
    urgent: false,
  },
  {
    title: "Marketing Campaigns",
    description: "Create and manage promotional campaigns",
    icon: Mail,
    href: "/admin/campaigns",
    count: 3,
    urgent: false,
  },
]

const recentActivities = [
  {
    type: "approval",
    message: "TechCorp India registration approved",
    time: "2 minutes ago",
    status: "approved",
  },
  {
    type: "registration",
    message: "New college registration from IIT Delhi",
    time: "15 minutes ago",
    status: "pending",
  },
  {
    type: "payment",
    message: "Premium plan purchased by Microsoft",
    time: "1 hour ago",
    status: "completed",
  },
  {
    type: "support",
    message: "Support ticket #1234 resolved",
    time: "2 hours ago",
    status: "resolved",
  },
]

const monthlyTargets = [
  { name: "New Registrations", current: 847, target: 1000, percentage: 84.7 },
  { name: "Revenue Target", current: 1250000, target: 1500000, percentage: 83.3 },
  { name: "Approval Rate", current: 94, target: 95, percentage: 98.9 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Sales Admin!</h1>
            <p className="text-blue-100">Here's what's happening with your recruitment platform today.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Today's Date</p>
            <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"}>{stat.change}</Badge>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shortcut Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortcuts.map((shortcut) => (
              <Card key={shortcut.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <shortcut.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{shortcut.title}</h3>
                        <p className="text-sm text-muted-foreground">{shortcut.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {shortcut.count && (
                        <Badge variant={shortcut.urgent ? "destructive" : "secondary"}>{shortcut.count}</Badge>
                      )}
                      {shortcut.urgent && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    </div>
                  </div>
                  <Button asChild className="w-full mt-4 bg-transparent" variant="outline">
                    <Link href={shortcut.href}>
                      Open <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Monthly Targets */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Targets
              </CardTitle>
              <CardDescription>Track your progress this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyTargets.map((target) => (
                <div key={target.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{target.name}</span>
                    <span className="font-medium">{target.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={target.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {target.name === "Revenue Target" ? `₹${(target.current / 100000).toFixed(1)}L` : target.current}
                    </span>
                    <span>
                      {target.name === "Revenue Target" ? `₹${(target.target / 100000).toFixed(1)}L` : target.target}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest system activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.status === "approved" || activity.status === "completed" || activity.status === "resolved"
                      ? "bg-green-500"
                      : activity.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge
                  variant={
                    activity.status === "approved" || activity.status === "completed" || activity.status === "resolved"
                      ? "default"
                      : activity.status === "pending"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            View All Activities
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
