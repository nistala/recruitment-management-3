"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Trophy, Play, Plus, Target, BarChart3 } from "lucide-react"
//import { ExamListSkeleton } from "@/components/ui/college-skeleton"
import Link from "next/link"

interface Exam {
  id: string
  title: string
  jobRole: string
  duration: number // in minutes
  questions: number
  difficulty: "easy" | "medium" | "hard"
  participants: number
  avgScore: number
  status: "active" | "draft" | "completed"
  createdDate: string
  category: string
}

const mockExams: Exam[] = [
  {
    id: "1",
    title: "Software Engineering Fundamentals",
    jobRole: "Software Engineer",
    duration: 60,
    questions: 50,
    difficulty: "medium",
    participants: 234,
    avgScore: 72,
    status: "active",
    createdDate: "2025-01-15",
    category: "Technical",
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    jobRole: "SDE/Backend Developer",
    duration: 90,
    questions: 40,
    difficulty: "hard",
    participants: 156,
    avgScore: 65,
    status: "active",
    createdDate: "2025-01-12",
    category: "Technical",
  },
  {
    id: "3",
    title: "Frontend Development Basics",
    jobRole: "Frontend Developer",
    duration: 45,
    questions: 35,
    difficulty: "easy",
    participants: 189,
    avgScore: 78,
    status: "active",
    createdDate: "2025-01-10",
    category: "Technical",
  },
  {
    id: "4",
    title: "Database Management Systems",
    jobRole: "Database Administrator",
    duration: 75,
    questions: 45,
    difficulty: "medium",
    participants: 98,
    avgScore: 68,
    status: "completed",
    createdDate: "2025-01-08",
    category: "Technical",
  },
  {
    id: "5",
    title: "Aptitude & Reasoning",
    jobRole: "General",
    duration: 60,
    questions: 60,
    difficulty: "medium",
    participants: 345,
    avgScore: 75,
    status: "active",
    createdDate: "2025-01-05",
    category: "Aptitude",
  },
  {
    id: "6",
    title: "English Communication",
    jobRole: "General",
    duration: 30,
    questions: 25,
    difficulty: "easy",
    participants: 278,
    avgScore: 82,
    status: "active",
    createdDate: "2025-01-03",
    category: "Communication",
  },
]

export default function ExamsPage() {
  const [loading, setLoading] = useState(true)
  const [exams, setExams] = useState<Exam[]>(mockExams)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      easy: { label: "Easy", color: "bg-green-100 text-green-800" },
      medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
      hard: { label: "Hard", color: "bg-red-100 text-red-800" },
    }

    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig]
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Active", color: "bg-green-100 text-green-800" },
      draft: { label: "Draft", color: "bg-gray-100 text-gray-800" },
      completed: { label: "Completed", color: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge variant="outline" className={config.color}>
        {config.label}
      </Badge>
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technical":
        return <Target className="h-4 w-4" />
      case "Aptitude":
        return <BarChart3 className="h-4 w-4" />
      case "Communication":
        return <Users className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  if (loading) {
    // return <ExamListSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Mock Exam Papers</h1>
          <p className="text-muted-foreground">Practice tests organized by job roles and skill categories</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/college/exams/leaderboard">
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/college/exams/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
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
                <p className="text-sm text-muted-foreground">Total Exams</p>
                <p className="text-2xl font-bold">{exams.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Exams</p>
                <p className="text-2xl font-bold">{exams.filter((e) => e.status === "active").length}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold">{exams.reduce((sum, exam) => sum + exam.participants, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(exams.reduce((sum, exam) => sum + exam.avgScore, 0) / exams.length)}%
                </p>
              </div>
              <Trophy className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      {getCategoryIcon(exam.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold line-clamp-1">{exam.title}</h3>
                      <p className="text-sm text-muted-foreground">{exam.jobRole}</p>
                    </div>
                  </div>
                  {getStatusBadge(exam.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {exam.duration} min
                    </span>
                    <span>{exam.questions} questions</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {exam.participants} participants
                    </span>
                    {getDifficultyBadge(exam.difficulty)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Score</span>
                    <span className="font-medium">{exam.avgScore}%</span>
                  </div>
                  <Progress value={exam.avgScore} className="h-2" />
                </div>

                <div className="flex gap-2">
                  {exam.status === "active" ? (
                    <Button className="flex-1" asChild>
                      <Link href={`/college/exams/${exam.id}/attempt`}>
                        <Play className="h-4 w-4 mr-2" />
                        Start Exam
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1 bg-transparent" asChild>
                      <Link href={`/college/exams/${exam.id}`}>View Results</Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
