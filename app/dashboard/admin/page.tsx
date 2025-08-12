"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, ClipboardList, MapPin, TrendingUp, Calendar, Award,ShoppingCart,Library } from 'lucide-react'
import Link from "next/link"
import { useState, useEffect } from "react"
import { SkeletonCard,SkeletonChart } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Recharts imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500) // Simulate loading
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      title: "Total Employers",
      value: "56",
      change: "+12%",
      description: "Employers registered on the platform",
      icon: Building2,
      color: "#232527",
    },
    {
      title: "Candidates (Reg.)",
      value: "150",
      change: "+8%",
      description: "Candidates eligible for upcoming or ongoing exams",
      icon: Users,
      color: "#232527", // green-500
    },
    {
      title: "Active Exams",
      value: "89",
      change: "+15%",
      description: "Exams currently open for participation",
      icon: ClipboardList,
      color: "#0d416b", // amber-500
    },
    {
      title: "Exam Centers",
      value: "156",
      change: "+5%",
      description: "Approved locations available for conducting exams",
      icon: MapPin,
      color: "#0d416b", // violet-500
    },
    {
      title: "Scheduled Exams",
      value: "47",
      change: "+9%",
      description: "Exams scheduled to start within the next 30 days",
      icon: Calendar,
      color: " #00aae7", // pink-500
    },
    {
      title: "Results Published",
      value: "102",
      change: "+4%",
      description: "Exams whose results are available for candidates",
      icon: Award,
      color: " #00aae7", // red-500
    },
  ]

  const quickActions = [
    {
      title: "Register New Employer",
      description: "Add a new employer to the system to enable them to post job openings",
      href: "/registration/employer",
      icon: Building2,
    },
    {
      title: "Register Candidate",
      description: "Register a new candidate for the examination",
      href: "/registration/candidate",
      icon: Users,
    },
    {
      title: "Schedule Exam",
      description: "Create and schedule new examinations",
      href: "/exam/calendar",
      icon: Calendar,
    },
    {
      title: "View Reports",
      description: "Access detailed analytics and reports",
      href: "/exam/results",
      icon: TrendingUp,
    },
    {
    title: "Sales",
    description: "Manage and track sales activities and performance",
    href: "/sales",
    icon: ShoppingCart,  // assuming you have an icon named ShoppingCart or similar
  },
  {
    title: "Colleges",
    description: "Manage college information and affiliations",
    href: "/colleges",
    icon: Library,  // assuming you have an icon named AcademicCap or similar
  },
   
  ]

  // Chart data preparation
  const chartData = stats.map((stat) => ({
    name: stat.title,
    value: parseInt(stat.value.replace(/,/g, "")),
    fill: stat.color,
  }))

  return (
    <div className="p-2 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive platform for managing recruitment processes and examinations
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-2">
              <CardHeader className="flex flex-row items-center justify-between p-0 mb-1">
                <CardTitle className="text-md font-medium mr-1 text-[#00aae7]">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-8" style={{ color: stat.color }} />
              </CardHeader>
              <CardContent className="p-0 m-0 mt-0">
                <div className="text-xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Chart */}
      {loading?(
         <SkeletonChart />
        ) : (
        <Card className="p-4">
           <CardHeader className="p-0 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-lg">Statistics Overview</CardTitle>
              <CardDescription>
                Visual representation of key metrics based on the selected time range
              </CardDescription>
            </div>
            <Select >
              <SelectTrigger className="w-[180px] mt-2 sm:mt-0">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 1 Week</SelectItem>
                <SelectItem value="month">Last 1 Month</SelectItem>
                <SelectItem value="halfyear">Last 6 Months</SelectItem>
                <SelectItem value="year">Last 1 Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 10, right: 60, left: 0, bottom: 2 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        {loading ? (
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Card key={action.title} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <action.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </div>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={action.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
