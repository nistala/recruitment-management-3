"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calendar,
  Clock,
  ClipboardList,
  Building,
  Save,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const examSchema = z.object({
  examName: z.string().min(3, "Exam name is required"),
  examType: z.string().min(1, "Select exam type"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.coerce.number().min(30, "Duration must be at least 30 minutes"),
  recruitingAgency: z.string().min(1, "Select recruiting agency"),
  examBoard: z.string().min(1, "Select exam board"),
  description: z.string().optional(),
});

type ExamFormData = z.infer<typeof examSchema>;

export default function ScheduleExamPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      examName: "",
      examType: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      duration: 120,
      recruitingAgency: "",
      examBoard: "",
      description: "",
    },
  });

  const onSubmit = async (data: ExamFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitting exam data:", data);

    const result = {
      success: true,
      message: "Exam scheduled successfully!",
      data: {
        ...data,
        id: `EX${Date.now()}`,
        status: "Scheduled",
        createdAt: new Date().toISOString(),
      },
    };

    setSubmitResult(result);
    toast({ title: "Success!", description: "Exam has been scheduled." });
    setIsSubmitting(false);
  };

  if (submitResult) {
    return (
      <div className="p-4 md:p-6 space-y-2">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/exam">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-primary">
              Exam Scheduled!
            </CardTitle>
            <CardDescription>
              The exam has been successfully created
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Exam Details:</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam ID:</span>
                  <span className="font-medium">{submitResult.data.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Name:</span>
                  <span className="font-medium">
                    {submitResult.data.examName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Type:</span>
                  <span className="font-medium">
                    {submitResult.data.examType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">
                    {submitResult.data.duration} mins
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setSubmitResult(null)} className="flex-1">
                Schedule Another Exam
              </Button>
              <Link href="/dashboard/exams" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-2 space-y-2">
          <div className="flex items-center gap-2">
        {/* <Link href="/dashboard/exam">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link> */}
        <div>
          <h1 className="text-2xl md:text-2xl font-bold">Schedule Exam</h1>
          <p className="text-muted-foreground">Create a new exam schedule</p>
        </div>
      </div>
      <Card className="max-w-full mx-auto pt-4">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
                  <ClipboardList className="h-4 w-4" />
                  Basic Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="examName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Banking Recruitment Exam"
                            {...field}
                          />
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CBT">
                              CBT (Computer Based Test)
                            </SelectItem>
                            <SelectItem value="OMR">
                              OMR (Optical Mark Recognition)
                            </SelectItem>
                            <SelectItem value="Online">Online Test</SelectItem>
                            <SelectItem value="Offline">
                              Offline/Written Exam
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Schedule Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
                  <Calendar className="h-4 w-4" />
                  Schedule Details
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes) *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="120" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Organizing Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
                  <Building className="h-4 w-4" />
                  Organizing Details
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="recruitingAgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recruiting Agency *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select agency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="IBPS">IBPS</SelectItem>
                            <SelectItem value="UPSC">UPSC</SelectItem>
                            <SelectItem value="SSC">SSC</SelectItem>
                            <SelectItem value="RRB">RRB</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="examBoard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Board *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select board" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Banking Board">
                              Banking Board
                            </SelectItem>
                            <SelectItem value="Civil Services Board">
                              Civil Services Board
                            </SelectItem>
                            <SelectItem value="State Education Board">
                              State Education Board
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Extra Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Additional Information
                </h3>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional details about the exam..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Scheduling Exam...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Schedule Exam
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                >
                  Reset Form
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
