"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Edit, MoreVertical, UserPlus, Download, Mail, Phone } from "lucide-react"
import { StudentListSkeleton } from "@/components/ui/college-skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  rollNo: string
  batch: string
  course: string
  cgpa: number
  placementStatus: "placed" | "seeking" | "not-eligible" | "interview-scheduled"
  avatar: string
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Priya Singh",
    email: "priya.singh@college.edu",
    phone: "+91 9876543210",
    rollNo: "CSE2025001",
    batch: "2025",
    course: "Computer Science",
    cgpa: 9.2,
    placementStatus: "placed",
    avatar: "PS",
  },
  {
    id: "2",
    name: "Amit Kumar",
    email: "amit.kumar@college.edu",
    phone: "+91 9876543211",
    rollNo: "IT2025002",
    batch: "2025",
    course: "Information Technology",
    cgpa: 8.8,
    placementStatus: "interview-scheduled",
    avatar: "AK",
  },
  {
    id: "3",
    name: "Sneha Reddy",
    email: "sneha.reddy@college.edu",
    phone: "+91 9876543212",
    rollNo: "ECE2024003",
    batch: "2024",
    course: "Electronics & Communication",
    cgpa: 8.5,
    placementStatus: "seeking",
    avatar: "SR",
  },
  {
    id: "4",
    name: "Rohit Sharma",
    email: "rohit.sharma@college.edu",
    phone: "+91 9876543213",
    rollNo: "CSE2025004",
    batch: "2025",
    course: "Computer Science",
    cgpa: 8.9,
    placementStatus: "placed",
    avatar: "RS",
  },
  {
    id: "5",
    name: "Anita Patel",
    email: "anita.patel@college.edu",
    phone: "+91 9876543214",
    rollNo: "ME2024005",
    batch: "2024",
    course: "Mechanical Engineering",
    cgpa: 7.8,
    placementStatus: "not-eligible",
    avatar: "AP",
  },
]

export default function StudentsPage() {
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBatch, setSelectedBatch] = useState<string>("all")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = students

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedBatch !== "all") {
      filtered = filtered.filter((student) => student.batch === selectedBatch)
    }

    if (selectedCourse !== "all") {
      filtered = filtered.filter((student) => student.course === selectedCourse)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((student) => student.placementStatus === selectedStatus)
    }

    setFilteredStudents(filtered)
  }, [searchTerm, selectedBatch, selectedCourse, selectedStatus, students])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      placed: { label: "Placed", variant: "default" as const, color: "bg-green-100 text-green-800" },
      seeking: { label: "Seeking", variant: "secondary" as const, color: "bg-blue-100 text-blue-800" },
      "interview-scheduled": {
        label: "Interview",
        variant: "outline" as const,
        color: "bg-orange-100 text-orange-800",
      },
      "not-eligible": { label: "Not Eligible", variant: "destructive" as const, color: "bg-gray-100 text-gray-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const uniqueBatches = [...new Set(students.map((s) => s.batch))]
  const uniqueCourses = [...new Set(students.map((s) => s.course))]

  if (loading) {
    return <StudentListSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Students Management</h1>
          <p className="text-muted-foreground">Manage student records and track their placement status</p>
        </div>
        <Button asChild>
          <Link href="/college/students/add">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, email, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {uniqueBatches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {uniqueCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="placed">Placed</SelectItem>
                <SelectItem value="seeking">Seeking</SelectItem>
                <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="not-eligible">Not Eligible</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students List ({filteredStudents.length})</CardTitle>
          <CardDescription>Complete list of students with their academic and placement details</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/placeholder-40x40.png?height=40&width=40&text=${student.avatar}`} />
                          <AvatarFallback>{student.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{student.rollNo}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.batch}</Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${student.cgpa >= 8.5 ? "text-green-600" : student.cgpa >= 7.5 ? "text-orange-600" : "text-gray-600"}`}
                      >
                        {student.cgpa.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(student.placementStatus)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/college/students/${student.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/college/students/${student.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
