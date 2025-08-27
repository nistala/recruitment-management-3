import type { Metadata } from "next"
import { Calendar, BookOpen, Briefcase, Award, TrendingUp, Clock, Users, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personalized dashboard for tracking applications, exams, and career progress.",
}

const dashboardStats = [
  {
    title: "Applications Submitted",
    value: "12",
    change: "+3 this month",
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    title: "Exams Registered",
    value: "5",
    change: "+2 this month",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    title: "Interview Calls",
    value: "3",
    change: "+1 this week",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Success Rate",
    value: "75%",
    change: "+5% improvement",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const recentApplications = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    company: "Ministry of Electronics & IT",
    appliedDate: "2024-01-20",
    status: "Under Review",
    deadline: "2024-02-15",
  },
  {
    id: 2,
    jobTitle: "Data Analyst",
    company: "Indian Railways",
    appliedDate: "2024-01-18",
    status: "Interview Scheduled",
    deadline: "2024-02-20",
  },
  {
    id: 3,
    jobTitle: "Civil Engineer",
    company: "Public Works Department",
    appliedDate: "2024-01-15",
    status: "Application Submitted",
    deadline: "2024-02-25",
  },
]

const upcomingExams = [
  {
    id: 1,
    name: "UPSC Civil Services Prelims",
    date: "2024-06-15",
    timeLeft: "145 days",
    preparation: 65,
    status: "Registered",
  },
  {
    id: 2,
    name: "SSC CGL Tier-1",
    date: "2024-07-20",
    timeLeft: "180 days",
    preparation: 45,
    status: "Registered",
  },
  {
    id: 3,
    name: "IBPS PO Prelims",
    date: "2024-08-10",
    timeLeft: "201 days",
    preparation: 30,
    status: "Registration Pending",
  },
]

const studyProgress = [
  {
    subject: "General Knowledge",
    progress: 85,
    testsCompleted: 12,
    totalTests: 15,
  },
  {
    subject: "Quantitative Aptitude",
    progress: 70,
    testsCompleted: 14,
    totalTests: 20,
  },
  {
    subject: "English Language",
    progress: 60,
    testsCompleted: 9,
    totalTests: 15,
  },
  {
    subject: "Reasoning Ability",
    progress: 75,
    testsCompleted: 18,
    totalTests: 24,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Sai Kartik Nistala!</h1>
          <p className="text-muted-foreground">Here's your career progress and upcoming activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="rounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Overview</TabsTrigger>
            <TabsTrigger value="applications" className="rounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Applications</TabsTrigger>
            <TabsTrigger value="exams" className="rounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Exams</TabsTrigger>
            <TabsTrigger value="study" className="rounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Study Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Applications */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Recent Applications
                  </CardTitle>
                  <CardDescription>Your latest job applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{app.jobTitle}</div>
                        <div className="text-sm text-muted-foreground">{app.company}</div>
                        <div className="text-xs text-muted-foreground">Applied: {app.appliedDate}</div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            app.status === "Interview Scheduled"
                              ? "default"
                              : app.status === "Under Review"
                                ? "secondary"
                                : "outline"
                          }
                          className="mb-1"
                        >
                          {app.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">Due: {app.deadline}</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Applications
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Exams */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Upcoming Exams
                  </CardTitle>
                  <CardDescription>Exams you're registered for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingExams.map((exam) => (
                    <div key={exam.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{exam.name}</div>
                        <Badge variant={exam.status === "Registered" ? "default" : "outline"}>{exam.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>{exam.date}</span>
                        <span>{exam.timeLeft} left</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Preparation Progress</span>
                          <span>{exam.preparation}%</span>
                        </div>
                        <Progress value={exam.preparation} className="h-2" />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Exams
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                    <Briefcase className="h-6 w-6 mb-2" />
                    <span className="text-sm">Browse Jobs</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                    <BookOpen className="h-6 w-6 mb-2" />
                    <span className="text-sm">Take Practice Test</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span className="text-sm">Schedule Interview</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                    <Award className="h-6 w-6 mb-2" />
                    <span className="text-sm">Check Results</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Track all your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-lg">{app.jobTitle}</div>
                        <div className="text-muted-foreground">{app.company}</div>
                        <div className="text-sm text-muted-foreground">Applied: {app.appliedDate}</div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge
                          variant={
                            app.status === "Interview Scheduled"
                              ? "default"
                              : app.status === "Under Review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {app.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">Deadline: {app.deadline}</div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Registered Exams</CardTitle>
                <CardDescription>Manage your exam registrations and preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingExams.map((exam) => (
                    <div key={exam.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-medium text-lg">{exam.name}</div>
                          <div className="text-muted-foreground">Exam Date: {exam.date}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant={exam.status === "Registered" ? "default" : "outline"}>{exam.status}</Badge>
                          <div className="text-sm text-muted-foreground mt-1">{exam.timeLeft} remaining</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Preparation Progress</span>
                          <span>{exam.preparation}%</span>
                        </div>
                        <Progress value={exam.preparation} className="h-3" />
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Study Materials
                        </Button>
                        <Button size="sm" variant="outline">
                          <Target className="mr-2 h-4 w-4" />
                          Practice Tests
                        </Button>
                        <Button size="sm">
                          <Clock className="mr-2 h-4 w-4" />
                          Mock Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study" className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Study Progress</CardTitle>
                <CardDescription>Track your preparation across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studyProgress.map((subject, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{subject.subject}</div>
                        <div className="text-sm text-muted-foreground">
                          {subject.testsCompleted}/{subject.totalTests} tests completed
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-3" />
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Continue Study
                        </Button>
                        <Button size="sm" variant="outline">
                          Take Test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}