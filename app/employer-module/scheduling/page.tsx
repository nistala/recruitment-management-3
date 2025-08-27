"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Users, Plus, Edit, Trash2, FileText, Video, MapPin } from "lucide-react"

export default function SchedulingPage() {
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [exams, setExams] = useState<any[]>([])
  const [interviews, setInterviews] = useState<any[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setExams([
        {
          id: 1,
          title: "Frontend Developer Assessment",
          jobTitle: "Senior Frontend Developer",
          date: "2024-12-28",
          time: "10:00 AM",
          duration: "2 hours",
          candidates: 15,
          type: "online",
          status: "scheduled",
        },
        {
          id: 2,
          title: "Backend Developer Test",
          jobTitle: "Backend Developer",
          date: "2024-12-30",
          time: "2:00 PM",
          duration: "3 hours",
          candidates: 8,
          type: "online",
          status: "scheduled",
        },
        {
          id: 3,
          title: "UI/UX Design Challenge",
          jobTitle: "UI/UX Designer",
          date: "2025-01-02",
          time: "11:00 AM",
          duration: "4 hours",
          candidates: 12,
          type: "online",
          status: "draft",
        },
      ])

      setInterviews([
        {
          id: 1,
          candidateName: "Sarah Johnson",
          jobTitle: "Frontend Developer",
          date: "2024-12-27",
          time: "3:00 PM",
          duration: "45 minutes",
          type: "video",
          interviewer: "John Smith",
          status: "scheduled",
        },
        {
          id: 2,
          candidateName: "Michael Chen",
          jobTitle: "Backend Developer",
          date: "2024-12-29",
          time: "10:30 AM",
          duration: "1 hour",
          type: "in-person",
          interviewer: "Jane Doe",
          location: "Conference Room A",
          status: "scheduled",
        },
        {
          id: 3,
          candidateName: "Emily Davis",
          jobTitle: "UI/UX Designer",
          date: "2025-01-03",
          time: "2:30 PM",
          duration: "45 minutes",
          type: "video",
          interviewer: "Bob Wilson",
          status: "pending",
        },
      ])
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                    <div className="flex space-x-4">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="h-80 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Scheduling & Exams</h1>
          <p className="text-gray-600">Manage exams and interview schedules</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Interview
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="exams" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="exams">Exams ({exams.length})</TabsTrigger>
              <TabsTrigger value="interviews">Interviews ({interviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="exams" className="space-y-4">
              {exams.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{exam.title}</h3>
                            <p className="text-gray-600">{exam.jobTitle}</p>
                          </div>
                          <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{exam.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{exam.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{exam.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{exam.candidates} candidates</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{exam.type === "online" ? "Online" : "In-person"}</Badge>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4">
              {interviews.map((interview) => (
                <Card key={interview.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{interview.candidateName}</h3>
                            <p className="text-gray-600">{interview.jobTitle}</p>
                          </div>
                          <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{interview.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{interview.duration}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Interviewer: {interview.interviewer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {interview.type === "video" ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            <span>{interview.type === "video" ? "Video Call" : interview.location || "In-person"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4" />
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
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendar</CardTitle>
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
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Exams</span>
                <span className="font-semibold">{exams.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Interviews</span>
                <span className="font-semibold">{interviews.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold">
                  {exams.filter((e) => e.status === "scheduled").length +
                    interviews.filter((i) => i.status === "scheduled").length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
