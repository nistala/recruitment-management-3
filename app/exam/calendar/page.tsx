"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon, Plus, Clock, MapPin, Users } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Skeleton, SkeletonCard, SkeletonTable } from "@/components/ui/skeleton"

const examSchema = z.object({
  examName: z.string().min(2, "Exam name is required"),
  examType: z.string().min(1, "Please select exam type"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  center: z.string().min(1, "Please select exam center"),
  maxCandidates: z.coerce.number().min(1, "Maximum candidates is required"),
  description: z.string().optional(),
})

type ExamFormData = z.infer<typeof examSchema>

const scheduledExams = [
  { id: 1, name: "Banking Recruitment Exam", date: "2025-08-15", time: "10:00 AM", type: "CBT", candidates: 450, center: "Hyderabad Main" },
  { id: 2, name: "Civil Services Preliminary", date: "2025-08-20", time: "2:00 PM", type: "OMR", candidates: 380, center: "Bangalore Tech" },
  { id: 3, name: "Technical Aptitude Test", date: "2025-08-25", time: "9:00 AM", type: "Online", candidates: 320, center: "Chennai Regional" },
]

const examCenters = [
  { value: "hyderabad-main", label: "Hyderabad Main Center" },
  { value: "bangalore-tech", label: "Bangalore Tech Center" },
  { value: "chennai-regional", label: "Chennai Regional Center" },
]

export default function ExamCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500) // Simulate 1.5 seconds loading
    return () => clearTimeout(timer)
  }, [])

  const form = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
  })

  const onSubmit = (data: ExamFormData) => {
    console.log("Exam Scheduled:", data)
    toast({
      title: "Exam Scheduled Successfully!",
      description: `${data.examName} has been scheduled for ${data.date}`,
    })
    setIsDialogOpen(false)
    form.reset()
  }

  const getExamsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return scheduledExams.filter(exam => exam.date === dateString)
  }

  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Exam Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage examination dates</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Exam</DialogTitle>
              <DialogDescription>
                Fill in the details to schedule a new examination
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="examName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Banking Recruitment Exam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="examType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CBT">CBT (Computer Based Test)</SelectItem>
                            <SelectItem value="OMR">OMR (Optical Mark Recognition)</SelectItem>
                            <SelectItem value="Online">Online Test</SelectItem>
                            <SelectItem value="Written">Written Exam</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration *</FormLabel>
                        <FormControl>
                          <Input placeholder="2 hours" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="center"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Center *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select exam center" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {examCenters.map((center) => (
                              <SelectItem key={center.value} value={center.value}>
                                {center.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxCandidates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Candidates *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional details about the exam..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Exam</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Calendar */}
        <Card className="md:col-span-2">
          <CardHeader className="text-center">
            <CardTitle>Exam Schedule Calendar</CardTitle>
            <CardDescription>Click on a date to view scheduled exams</CardDescription>
          </CardHeader>
          <CardContent className="[&_.rdp-weekdays]:grid [&_.rdp-weekdays]:grid-cols-7 flex justify-center text-center">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-[280px] w-full rounded-md" />
              </div>
            ) : (
              <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? selectedDate.toDateString() : "Select a Date"}
            </CardTitle>
            <CardDescription>
              {selectedDate ? "Scheduled exams for this date" : "Choose a date to view exams"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              selectedDate && (
                <div className="space-y-4">
                  {getExamsForDate(selectedDate).length > 0 ? (
                    getExamsForDate(selectedDate).map((exam) => (
                      <div key={exam.id} className="p-3 border rounded-lg space-y-2">
                        <h4 className="font-medium">{exam.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {exam.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {exam.center}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {exam.candidates} candidates
                        </div>
                        <Badge variant="outline">{exam.type}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No exams scheduled for this date</p>
                  )}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* Batch Management */}
      <Card>
        <CardHeader>
          <CardTitle>Batch-wise Exam Management</CardTitle>
          <CardDescription>Manage examination batches and candidate allocation</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Morning Batch</CardTitle>
                  <CardDescription>9:00 AM - 12:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Capacity:</span>
                      <span className="text-sm font-medium">500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Allocated:</span>
                      <span className="text-sm font-medium">450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Available:</span>
                      <span className="text-sm font-medium text-green-600">50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Afternoon Batch</CardTitle>
                  <CardDescription>2:00 PM - 5:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Capacity:</span>
                      <span className="text-sm font-medium">500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Allocated:</span>
                      <span className="text-sm font-medium">380</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Available:</span>
                      <span className="text-sm font-medium text-green-600">120</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Evening Batch</CardTitle>
                  <CardDescription>6:00 PM - 9:00 PM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Capacity:</span>
                      <span className="text-sm font-medium">300</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Allocated:</span>
                      <span className="text-sm font-medium">280</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Available:</span>
                      <span className="text-sm font-medium text-orange-600">20</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}