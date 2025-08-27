"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Trophy, Play, BookOpen, Target, Award, TrendingUp } from "lucide-react"

interface MockTest {
  id: string
  title: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: number
  questions: number
  attempts: number
  bestScore?: number
  averageScore: number
  totalAttempts: number
}

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  time: string
  isCurrentUser?: boolean
}

export default function MockTestsPage() {
  const [mockTests, setMockTests] = useState<MockTest[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMockTests([
        {
          id: "1",
          title: "JavaScript Fundamentals",
          category: "Programming",
          difficulty: "Easy",
          duration: 30,
          questions: 20,
          attempts: 2,
          bestScore: 85,
          averageScore: 78,
          totalAttempts: 1250,
        },
        {
          id: "2",
          title: "React Advanced Concepts",
          category: "Frontend",
          difficulty: "Hard",
          duration: 45,
          questions: 25,
          attempts: 1,
          bestScore: 72,
          averageScore: 65,
          totalAttempts: 890,
        },
        {
          id: "3",
          title: "Data Structures & Algorithms",
          category: "Computer Science",
          difficulty: "Medium",
          duration: 60,
          questions: 30,
          attempts: 0,
          averageScore: 70,
          totalAttempts: 2100,
        },
        {
          id: "4",
          title: "System Design Basics",
          category: "Architecture",
          difficulty: "Medium",
          duration: 40,
          questions: 15,
          attempts: 1,
          bestScore: 90,
          averageScore: 68,
          totalAttempts: 650,
        },
        {
          id: "5",
          title: "Database Management",
          category: "Backend",
          difficulty: "Easy",
          duration: 35,
          questions: 22,
          attempts: 3,
          bestScore: 95,
          averageScore: 82,
          totalAttempts: 1800,
        },
      ])

      setLeaderboard([
        { rank: 1, name: "Alice Johnson", score: 98, time: "25:30" },
        { rank: 2, name: "Bob Smith", score: 95, time: "28:15" },
        { rank: 3, name: "Carol Davis", score: 92, time: "30:45" },
        { rank: 4, name: "You", score: 90, time: "32:20", isCurrentUser: true },
        { rank: 5, name: "David Wilson", score: 88, time: "35:10" },
        { rank: 6, name: "Eva Brown", score: 85, time: "38:30" },
        { rank: 7, name: "Frank Miller", score: 82, time: "40:15" },
        { rank: 8, name: "Grace Lee", score: 80, time: "42:45" },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Mock Test Papers</h1>
          <p className="text-muted-foreground">Practice with job-specific mock tests</p>
        </div>
        <Button>Create Custom Test</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-blue-100 p-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests Taken</p>
                <p className="text-2xl font-bold">{mockTests.reduce((acc, test) => acc + test.attempts, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-2">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    mockTests.filter((test) => test.bestScore).reduce((acc, test) => acc + (test.bestScore || 0), 0) /
                      mockTests.filter((test) => test.bestScore).length,
                  )}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Best Score</p>
                <p className="text-2xl font-bold">{Math.max(...mockTests.map((test) => test.bestScore || 0))}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-purple-100 p-2">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold">#4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="available" className="space-y-4">
            <TabsList>
              <TabsTrigger value="available">Available Tests</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4">
              {mockTests.map((test) => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold">{test.title}</h3>
                          <Badge variant="outline" className={getDifficultyTextColor(test.difficulty)}>
                            {test.difficulty}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Badge variant="secondary">{test.category}</Badge>
                        </div>

                        <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{test.duration} minutes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{test.questions} questions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{test.totalAttempts} attempts</span>
                          </div>
                        </div>

                        {test.attempts > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Best Score: {test.bestScore}%</span>
                              <span>Attempts: {test.attempts}</span>
                            </div>
                            <Progress value={test.bestScore} className="h-2" />
                          </div>
                        )}

                        <div className="text-sm text-muted-foreground">Average Score: {test.averageScore}%</div>
                      </div>

                      <div className="flex flex-col space-y-2 lg:ml-6">
                        <Button className="w-full lg:w-auto">
                          <Play className="mr-2 h-4 w-4" />
                          {test.attempts > 0 ? "Retake" : "Start Test"}
                        </Button>
                        <Button variant="outline" className="w-full lg:w-auto bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {mockTests
                .filter((test) => test.attempts > 0)
                .map((test) => (
                  <Card key={test.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{test.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Best: {test.bestScore}%</span>
                            <span>Attempts: {test.attempts}</span>
                          </div>
                          <Progress value={test.bestScore} className="h-2 w-48" />
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Report
                          </Button>
                          <Button size="sm">Retake</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center space-x-4 rounded-lg p-3 ${
                  entry.isCurrentUser ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    entry.rank <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {entry.rank <= 3 ? <Award className="h-4 w-4" /> : entry.rank}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${entry.isCurrentUser ? "text-blue-600" : ""}`}>{entry.name}</p>
                  <p className="text-sm text-muted-foreground">{entry.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{entry.score}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
