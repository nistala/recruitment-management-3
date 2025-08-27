"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Eye,
  Download,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  Users,
} from "lucide-react"
import { CandidateListSkeleton } from "@/components/ui/employer-skeleton"
import Link from "next/link"

export default function CandidatesPage() {
  const [loading, setLoading] = useState(true)
  const [candidates, setCandidates] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setCandidates([
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          phone: "+1 (555) 123-4567",
          position: "Frontend Developer",
          location: "New York, NY",
          experience: "5 years",
          education: "BS Computer Science",
          skills: ["React", "TypeScript", "Node.js", "CSS"],
          status: "new",
          appliedDate: "2024-12-20",
          score: 85,
          avatar: "/placeholder.svg?height=40&width=40",
          resume: "sarah_johnson_resume.pdf",
        },
        {
          id: 2,
          name: "Michael Chen",
          email: "michael.chen@email.com",
          phone: "+1 (555) 234-5678",
          position: "Backend Developer",
          location: "San Francisco, CA",
          experience: "7 years",
          education: "MS Software Engineering",
          skills: ["Python", "Django", "PostgreSQL", "AWS"],
          status: "reviewed",
          appliedDate: "2024-12-18",
          score: 92,
          avatar: "/placeholder.svg?height=40&width=40",
          resume: "michael_chen_resume.pdf",
        },
        {
          id: 3,
          name: "Emily Davis",
          email: "emily.davis@email.com",
          phone: "+1 (555) 345-6789",
          position: "UI/UX Designer",
          location: "Remote",
          experience: "4 years",
          education: "BA Graphic Design",
          skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
          status: "shortlisted",
          appliedDate: "2024-12-15",
          score: 88,
          avatar: "/placeholder.svg?height=40&width=40",
          resume: "emily_davis_resume.pdf",
        },
        {
          id: 4,
          name: "David Wilson",
          email: "david.wilson@email.com",
          phone: "+1 (555) 456-7890",
          position: "Data Analyst",
          location: "Chicago, IL",
          experience: "3 years",
          education: "MS Data Science",
          skills: ["Python", "SQL", "Tableau", "R"],
          status: "interviewed",
          appliedDate: "2024-12-12",
          score: 90,
          avatar: "/placeholder.svg?height=40&width=40",
          resume: "david_wilson_resume.pdf",
        },
        {
          id: 5,
          name: "Lisa Anderson",
          email: "lisa.anderson@email.com",
          phone: "+1 (555) 567-8901",
          position: "DevOps Engineer",
          location: "Austin, TX",
          experience: "6 years",
          education: "BS Information Technology",
          skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
          status: "rejected",
          appliedDate: "2024-12-10",
          score: 75,
          avatar: "/placeholder.svg?height=40&width=40",
          resume: "lisa_anderson_resume.pdf",
        },
      ])
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesJob = selectedJob === "all" || candidate.position.toLowerCase().includes(selectedJob.toLowerCase())
    const matchesStatus = selectedStatus === "all" || candidate.status === selectedStatus

    return matchesSearch && matchesJob && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <CandidateListSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Candidate Management</h1>
          <p className="text-gray-600">Review and manage job applications</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search candidates by name, position, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="frontend">Frontend Developer</SelectItem>
                <SelectItem value="backend">Backend Developer</SelectItem>
                <SelectItem value="designer">UI/UX Designer</SelectItem>
                <SelectItem value="analyst">Data Analyst</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No candidates found matching your criteria</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.position}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className={`text-lg font-bold ${getScoreColor(candidate.score)}`}>
                              {candidate.score}%
                            </div>
                            <div className="text-xs text-gray-500">Match Score</div>
                          </div>
                          <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{candidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{candidate.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          <span>{candidate.experience}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <GraduationCap className="h-4 w-4" />
                        <span>{candidate.education}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Applied on {candidate.appliedDate}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                          <Link href={`/employer/candidates/${candidate.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                          </Link>
                          <Button size="sm">
                            <Star className="h-4 w-4 mr-1" />
                            Shortlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
