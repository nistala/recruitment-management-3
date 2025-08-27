"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Building, Plus, Eye, MoreVertical, Clock, TrendingUp } from "lucide-react"
import { DriveListSkeleton } from "@/components/ui/college-skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Drive {
  id: string
  companyName: string
  position: string
  date: string
  time: string
  venue: string
  eligibleCourses: string[]
  minCgpa: number
  maxBacklogs: number
  package: string
  registrations: number
  maxSeats: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  logo: string
  description: string
}

const mockDrives: Drive[] = [
  {
    id: "1",
    companyName: "Tata Consultancy Services",
    position: "Assistant System Engineer",
    date: "2025-01-25",
    time: "09:00 AM",
    venue: "Main Auditorium",
    eligibleCourses: ["CSE", "IT", "ECE"],
    minCgpa: 7.0,
    maxBacklogs: 0,
    package: "₹3.5-4.5 LPA",
    registrations: 234,
    maxSeats: 300,
    status: "upcoming",
    logo: "TCS",
    description: "Campus recruitment drive for freshers in software development roles.",
  },
  {
    id: "2",
    companyName: "Infosys Limited",
    position: "System Engineer",
    date: "2025-01-28",
    time: "10:00 AM",
    venue: "Conference Hall A",
    eligibleCourses: ["CSE", "IT"],
    minCgpa: 6.5,
    maxBacklogs: 1,
    package: "₹4.0-5.0 LPA",
    registrations: 189,
    maxSeats: 250,
    status: "upcoming",
    logo: "INF",
    description: "Join our software development team and work on cutting-edge technologies.",
  },
  {
    id: "3",
    companyName: "Wipro Technologies",
    position: "Project Engineer",
    date: "2025-01-30",
    time: "02:00 PM",
    venue: "Seminar Hall B",
    eligibleCourses: ["CSE", "IT", "ECE", "ME"],
    minCgpa: 6.0,
    maxBacklogs: 2,
    package: "₹3.8-4.8 LPA",
    registrations: 156,
    maxSeats: 200,
    status: "upcoming",
    logo: "WIP",
    description: "Opportunity to work on diverse projects across multiple domains.",
  },
  {
    id: "4",
    companyName: "Accenture",
    position: "Associate Software Engineer",
    date: "2025-01-20",
    time: "11:00 AM",
    venue: "Main Auditorium",
    eligibleCourses: ["CSE", "IT"],
    minCgpa: 7.5,
    maxBacklogs: 0,
    package: "₹5.0-6.5 LPA",
    registrations: 145,
    maxSeats: 180,
    status: "completed",
    logo: "ACC",
    description: "Selected candidates will work on innovative digital transformation projects.",
  },
  {
    id: "5",
    companyName: "HCL Technologies",
    position: "Graduate Engineer Trainee",
    date: "2025-01-15",
    time: "09:30 AM",
    venue: "Conference Hall B",
    eligibleCourses: ["CSE", "IT", "ECE"],
    minCgpa: 6.8,
    maxBacklogs: 1,
    package: "₹4.2-5.2 LPA",
    registrations: 167,
    maxSeats: 220,
    status: "completed",
    logo: "HCL",
    description: "Comprehensive training program followed by exciting project assignments.",
  },
]

export default function DrivesPage() {
  const [loading, setLoading] = useState(true)
  const [drives, setDrives] = useState<Drive[]>(mockDrives)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: "Upcoming", color: "bg-blue-100 text-blue-800" },
      ongoing: { label: "Ongoing", color: "bg-green-100 text-green-800" },
      completed: { label: "Completed", color: "bg-gray-100 text-gray-800" },
      cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const getRegistrationStatus = (registrations: number, maxSeats: number) => {
    const percentage = (registrations / maxSeats) * 100
    if (percentage >= 90) return { color: "text-red-600", status: "High" }
    if (percentage >= 70) return { color: "text-orange-600", status: "Medium" }
    return { color: "text-green-600", status: "Good" }
  }

  const upcomingDrives = drives.filter((d) => d.status === "upcoming")
  const completedDrives = drives.filter((d) => d.status === "completed")

  if (loading) {
    return <DriveListSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Placement Drives</h1>
          <p className="text-muted-foreground">Organize and manage campus recruitment drives</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/college/drives/reports">
              <TrendingUp className="h-4 w-4 mr-2" />
              Reports
            </Link>
          </Button>
          <Button asChild>
            <Link href="/college/drives/schedule">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Drive
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Drives</p>
                <p className="text-2xl font-bold">{drives.length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingDrives.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Registrations</p>
                <p className="text-2xl font-bold">{drives.reduce((sum, drive) => sum + drive.registrations, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Package</p>
                <p className="text-2xl font-bold">₹4.5L</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Drives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Drives ({upcomingDrives.length})
          </CardTitle>
          <CardDescription>Scheduled placement drives for the current semester</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingDrives.map((drive) => {
            const regStatus = getRegistrationStatus(drive.registrations, drive.maxSeats)
            return (
              <div key={drive.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`/placeholder-icon.png?height=64&width=64&text=${drive.logo}`} />
                      <AvatarFallback>{drive.logo}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{drive.companyName}</h3>
                      <p className="text-muted-foreground">{drive.position}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(drive.date).toLocaleDateString()} at {drive.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {drive.venue}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {drive.package}
                        </Badge>
                        <Badge variant="outline">Min CGPA: {drive.minCgpa}</Badge>
                        {drive.maxBacklogs === 0 && (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            No Backlogs
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    {getStatusBadge(drive.status)}
                    <div className="space-y-1">
                      <p className={`text-sm font-medium ${regStatus.color}`}>
                        {drive.registrations}/{drive.maxSeats} registered
                      </p>
                      <p className="text-xs text-muted-foreground">Availability: {regStatus.status}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/college/drives/${drive.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          View Registrations
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-muted-foreground mb-2">{drive.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Eligible:</span>
                    {drive.eligibleCourses.map((course) => (
                      <Badge key={course} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Recent Drives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Drives ({completedDrives.length})
          </CardTitle>
          <CardDescription>Recently completed placement drives and their outcomes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {completedDrives.map((drive) => (
            <div key={drive.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder-icon.png?height=48&width=48&text=${drive.logo}`} />
                    <AvatarFallback>{drive.logo}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{drive.companyName}</h3>
                    <p className="text-sm text-muted-foreground">{drive.position}</p>
                    <p className="text-xs text-muted-foreground">
                      Conducted on {new Date(drive.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  {getStatusBadge(drive.status)}
                  <p className="text-sm font-medium">{drive.registrations} registrations</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/college/drives/${drive.id}/results`}>View Results</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
