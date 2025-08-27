"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, Star, Send, Download, Eye, Edit } from "lucide-react"

export default function ExamEvaluationPage() {
  const [selectedExam, setSelectedExam] = useState("")
  const [evaluationMode, setEvaluationMode] = useState("pending")

  const exams = [
    {
      id: "1",
      title: "Software Developer Assessment",
      date: "2024-01-15",
      candidates: 45,
      evaluated: 30,
      pending: 15,
      type: "Mixed",
    },
    {
      id: "2",
      title: "Data Analyst Screening",
      date: "2024-01-12",
      candidates: 28,
      evaluated: 28,
      pending: 0,
      type: "MCQ",
    },
    {
      id: "3",
      title: "UI/UX Designer Test",
      date: "2024-01-10",
      candidates: 22,
      evaluated: 15,
      pending: 7,
      type: "Subjective",
    },
  ]

  const pendingEvaluations = [
    {
      id: "1",
      candidateName: "John Smith",
      examTitle: "Software Developer Assessment",
      submittedAt: "2024-01-15 14:30",
      mcqScore: 85,
      subjectiveAnswers: 3,
      totalMarks: 100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      candidateName: "Sarah Johnson",
      examTitle: "UI/UX Designer Test",
      submittedAt: "2024-01-15 16:45",
      mcqScore: 0,
      subjectiveAnswers: 5,
      totalMarks: 100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      candidateName: "Mike Chen",
      examTitle: "Software Developer Assessment",
      submittedAt: "2024-01-15 13:20",
      mcqScore: 78,
      subjectiveAnswers: 3,
      totalMarks: 100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const completedEvaluations = [
    {
      id: "1",
      candidateName: "Alice Brown",
      examTitle: "Data Analyst Screening",
      finalScore: 92,
      evaluatedAt: "2024-01-14 10:30",
      status: "Published",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      candidateName: "David Wilson",
      examTitle: "Software Developer Assessment",
      finalScore: 88,
      evaluatedAt: "2024-01-14 15:20",
      status: "Published",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Evaluation</h1>
          <p className="text-gray-600">Review and evaluate candidate exam submissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Select exam to evaluate" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((exam) => (
                <SelectItem key={exam.id} value={exam.id}>
                  {exam.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Exam Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                  <p className="text-sm text-gray-600">{exam.date}</p>
                </div>
                <Badge variant={exam.type === "MCQ" ? "default" : exam.type === "Subjective" ? "secondary" : "outline"}>
                  {exam.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Candidates</span>
                  <span className="font-medium">{exam.candidates}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Evaluated</span>
                  <span className="font-medium text-green-600">{exam.evaluated}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending</span>
                  <span className="font-medium text-orange-600">{exam.pending}</span>
                </div>
                <Progress value={(exam.evaluated / exam.candidates) * 100} className="h-2" />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => setSelectedExam(exam.id)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evaluation Tabs */}
      <Tabs value={evaluationMode} onValueChange={setEvaluationMode}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Pending Evaluation</TabsTrigger>
          <TabsTrigger value="completed" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Completed</TabsTrigger>
          <TabsTrigger value="published" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Published Results</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold">Pending Evaluations ({pendingEvaluations.length})</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Auto-evaluate MCQs
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {pendingEvaluations.map((evaluation) => (
              <Card key={evaluation.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={evaluation.avatar || "/placeholder.svg"}
                        alt={evaluation.candidateName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{evaluation.candidateName}</h4>
                        <p className="text-sm text-gray-600">{evaluation.examTitle}</p>
                        <p className="text-xs text-gray-500">Submitted: {evaluation.submittedAt}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex gap-4 text-sm">
                        {evaluation.mcqScore > 0 && (
                          <div className="text-center">
                            <p className="font-medium text-green-600">{evaluation.mcqScore}%</p>
                            <p className="text-gray-500">MCQ Score</p>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="font-medium">{evaluation.subjectiveAnswers}</p>
                          <p className="text-gray-500">Subjective</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">/{evaluation.totalMarks}</p>
                          <p className="text-gray-500">Total Marks</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Evaluate: {evaluation.candidateName}</DialogTitle>
                              <DialogDescription>Review and score the subjective answers</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              {/* MCQ Results */}
                              {evaluation.mcqScore > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2">MCQ Results (Auto-graded)</h4>
                                  <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-green-800">Score: {evaluation.mcqScore}% (17/20 correct)</p>
                                  </div>
                                </div>
                              )}

                              {/* Subjective Questions */}
                              <div className="space-y-4">
                                <h4 className="font-semibold">Subjective Questions</h4>

                                {Array.from({ length: evaluation.subjectiveAnswers }).map((_, index) => (
                                  <Card key={index}>
                                    <CardContent className="p-4">
                                      <div className="space-y-3">
                                        <div>
                                          <h5 className="font-medium">Question {index + 1}</h5>
                                          <p className="text-sm text-gray-600 mt-1">
                                            Explain the difference between REST and GraphQL APIs, including their
                                            advantages and use cases.
                                          </p>
                                        </div>

                                        <div>
                                          <h6 className="font-medium text-sm">Candidate's Answer:</h6>
                                          <div className="bg-gray-50 p-3 rounded mt-1">
                                            <p className="text-sm">
                                              REST (Representational State Transfer) is an architectural style that uses
                                              standard HTTP methods... GraphQL is a query language and runtime that
                                              allows clients to request specific data...
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                          <div className="flex items-center gap-2">
                                            <label className="text-sm font-medium">Score:</label>
                                            <Input type="number" min="0" max="10" className="w-20" placeholder="0-10" />
                                            <span className="text-sm text-gray-500">/ 10</span>
                                          </div>
                                          <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                              <Star
                                                key={star}
                                                className="h-4 w-4 text-gray-300 hover:text-yellow-400 cursor-pointer"
                                              />
                                            ))}
                                          </div>
                                        </div>

                                        <Textarea
                                          placeholder="Add feedback for this answer..."
                                          className="text-sm"
                                          rows={2}
                                        />
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>

                              {/* Overall Feedback */}
                              <div>
                                <h4 className="font-semibold mb-2">Overall Feedback</h4>
                                <Textarea placeholder="Provide overall feedback for the candidate..." rows={3} />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline">Save Draft</Button>
                              <Button>Submit Evaluation</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-semibold">Completed Evaluations ({completedEvaluations.length})</h3>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Publish Selected Results
            </Button>
          </div>

          <div className="space-y-4">
            {completedEvaluations.map((evaluation) => (
              <Card key={evaluation.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={evaluation.avatar || "/placeholder.svg"}
                        alt={evaluation.candidateName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{evaluation.candidateName}</h4>
                        <p className="text-sm text-gray-600">{evaluation.examTitle}</p>
                        <p className="text-xs text-gray-500">Evaluated: {evaluation.evaluatedAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{evaluation.finalScore}</p>
                        <p className="text-sm text-gray-500">Final Score</p>
                      </div>
                      <Badge variant={evaluation.status === "Published" ? "default" : "secondary"}>
                        {evaluation.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published">
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All Results Published</h3>
            <p className="text-gray-600">Candidates have been notified of their exam results.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
