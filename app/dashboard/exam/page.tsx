"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
} from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Search,
  FileCheck,
  Clock,
  Filter,
  CalendarIcon,
  Plus,
  ClipboardList,
  MapPin,
  Users,
  Award,
  TrendingUp,
  TrendingDown,
  Building2,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import Link from "next/link";

const examSchema = z.object({
  examName: z.string().min(2, "Exam name is required"),
  examType: z.string().min(1, "Please select exam type"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.coerce.number().min(1, "Duration is required"),
  recruitingAgency: z.string().min(1, "Please select recruiting agency"),
  examBoard: z.string().min(1, "Please select exam board"),
  description: z.string().optional(),
});

type ExamFormData = z.infer<typeof examSchema>;

// Mock data
const examSchedule = [
  // Government Exams
  {
    id: 1,
    name: "Banking Recruitment Exam",
    type: "CBT",
    startDate: "2025-08-15",
    endDate: "2025-08-15",
    startTime: "10:00",
    endTime: "12:00",
    duration: 120,
    agency: "IBPS",
    board: "Banking Board",
    status: "Scheduled",
    candidates: 1200,
  },
  {
    id: 2,
    name: "Civil Services Preliminary",
    type: "OMR",
    startDate: "2025-08-20",
    endDate: "2025-08-20",
    startTime: "14:00",
    endTime: "17:00",
    duration: 180,
    agency: "UPSC",
    board: "Civil Services Board",
    status: "Ongoing",
    candidates: 800,
  },

  // Extra for 2025-08-15
  {
    id: 3,
    name: "Railway Aptitude Test",
    type: "CBT",
    startDate: "2025-08-15",
    endDate: "2025-08-15",
    startTime: "14:00",
    endTime: "16:00",
    duration: 120,
    agency: "RRB",
    board: "Railway Recruitment Board",
    status: "Scheduled",
    candidates: 950,
  },
  {
    id: 4,
    name: "SSC Junior Engineer Exam",
    type: "OMR",
    startDate: "2025-08-15",
    endDate: "2025-08-15",
    startTime: "09:00",
    endTime: "11:00",
    duration: 120,
    agency: "SSC",
    board: "Staff Selection Commission",
    status: "Completed",
    candidates: 1500,
  },

  // Extra for 2025-08-20
  {
    id: 5,
    name: "Teacher Eligibility Test",
    type: "OMR",
    startDate: "2025-08-20",
    endDate: "2025-08-20",
    startTime: "09:00",
    endTime: "12:00",
    duration: 180,
    agency: "NCTE",
    board: "Education Board",
    status: "Scheduled",
    candidates: 2100,
  },
  {
    id: 6,
    name: "Police Constable Recruitment",
    type: "CBT",
    startDate: "2025-08-20",
    endDate: "2025-08-20",
    startTime: "16:00",
    endTime: "18:00",
    duration: 120,
    agency: "State Police Board",
    board: "Police Recruitment Cell",
    status: "Completed",
    candidates: 1750,
  },

  // Private Sector Exams
  {
    id: 7,
    name: "Tata Consultancy Services Ninja Hiring Test",
    type: "CBT",
    startDate: "2025-08-15",
    endDate: "2025-08-15",
    startTime: "18:00",
    endTime: "20:00",
    duration: 120,
    agency: "TCS",
    board: "Private",
    status: "Scheduled",
    candidates: 500,
  },
  {
    id: 8,
    name: "Infosys Off-Campus Drive Aptitude Test",
    type: "CBT",
    startDate: "2025-08-22",
    endDate: "2025-08-22",
    startTime: "10:00",
    endTime: "11:30",
    duration: 90,
    agency: "Infosys",
    board: "Private",
    status: "Scheduled",
    candidates: 650,
  },
  {
    id: 9,
    name: "Wipro Elite National Talent Hunt",
    type: "CBT",
    startDate: "2025-08-22",
    endDate: "2025-08-22",
    startTime: "14:00",
    endTime: "16:00",
    duration: 120,
    agency: "Wipro",
    board: "Private",
    status: "Completed",
    candidates: 720,
  },
  {
    id: 10,
    name: "HCL Graduate Hiring Assessment",
    type: "CBT",
    startDate: "2025-08-25",
    endDate: "2025-08-25",
    startTime: "09:00",
    endTime: "10:30",
    duration: 90,
    agency: "HCL Technologies",
    board: "Private",
    status: "Completed",
    candidates: 400,
  },
];

const examCenters = [
  {
    id: 1,
    name: "Ion Digital Zone",
    code: "IDZ001",
    location: "Hyderabad, Telangana",
    capacity: 500,
    assignedExams: 3,
    completedExams: 4,
    status: "Active",
  },
  {
    id: 2,
    name: "SVS Technology And Solutions",
    code: "SVS002",
    location: "Bangalore, Karnataka",
    capacity: 400,
    assignedExams: 2,
    completedExams: 5,
    status: "Active",
  },
  {
    id: 3,
    name: "Arowana Digital Zone",
    code: "ADZ003",
    location: "Chennai, Tamil Nadu",
    capacity: 300,
    assignedExams: 1,
    completedExams: 2,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Utakal Regional Center",
    code: "URC004",
    location: "Bhubaneswar, Odisha",
    capacity: 200,
    assignedExams: 1,
    completedExams: 2,
    status: "Inactive",
  },
  {
    id: 5,
    name: "TechZone Exam Center",
    code: "TZEC005",
    location: "Vizag, Andhra Pradesh",
    capacity: 300,
    assignedExams: 1,
    completedExams: 2,
    status: "Inactive",
  },
];

const appliedCandidates = [
  {
    id: 1,
    name: "Ravi Kumar",
    applicationId: "APP001",
    examName: "Banking Recruitment",
    examDate: "2025-08-15",
    center: "Hyderabad Main",
    status: "Scheduled",
  },
  {
    id: 2,
    name: "Priya Sharma",
    applicationId: "APP002",
    examName: "Civil Services",
    examDate: "2025-08-20",
    center: "Bangalore Tech",
    status: "Applied",
  },
  {
    id: 3,
    name: "Anil Reddy",
    applicationId: "APP003",
    examName: "Banking Recruitment",
    examDate: "2025-08-15",
    center: "Chennai Regional",
    status: "Attended",
  },
  {
    id: 3,
    name: "Hema Naidu",
    applicationId: "APP004",
    examName: "Civil Services",
    examDate: "2025-08-20",
    center: "Hyderabad Main",
    status: "Applied",
  },
  {
    id: 2,
    name: "Ayush Singh",
    applicationId: "APP005",
    examName: "Banking Recruitment",
    examDate: "2025-08-20",
    center: "Bangalore Tech",
    status: "Applied",
  },
];

const examResults = [
  {
    id: 1,
    candidateName: "Ravi Kumar",
    score: 85,
    result: "Pass",
    rank: 45,
    examName: "Banking Recruitment",
    examDate: "2025-07-15",
  },
  {
    id: 2,
    candidateName: "Priya Sharma",
    score: 92,
    result: "Pass",
    rank: 12,
    examName: "Civil Services",
    examDate: "2025-07-20",
  },
  {
    id: 3,
    candidateName: "Anil Reddy",
    score: 78,
    result: "Pass",
    rank: 89,
    examName: "Technical Test",
    examDate: "2025-07-25",
  },
  {
    id: 4,
    candidateName: "Sanjeeb Naidu",
    score: 74,
    result: "Pass",
    rank: 76,
    examName: "Banking Recruitment",
    examDate: "2025-07-25",
  },
  {
    id: 3,
    candidateName: "Rajesh Yadav",
    score: 40,
    result: "Fail",
    rank: 120,
    examName: "Defence Services",
    examDate: "2025-07-25",
  },
];

const employers = [
  {
    id: 1,
    name: "State Bank of India",
    type: "Government",
    exams: ["Banking Recruitment", "Clerk Exam"],
    uploadDate: "2025-07-01",
  },
  {
    id: 2,
    name: "HDFC Bank",
    type: "Private",
    exams: ["Management Trainee"],
    uploadDate: "2025-07-05",
  },
  {
    id: 3,
    name: "UPSC",
    type: "Government",
    exams: ["Civil Services"],
    uploadDate: "2025-07-10",
  },
  {
    id: 2,
    name: "Infosys",
    type: "Private",
    exams: ["Software Engineer"],
    uploadDate: "2025-07-05",
  },
  {
    id: 2,
    name: "Digital Solutions Pvt Ltd",
    type: "Private",
    exams: ["SEO Specialist", "Content Writer"],
    uploadDate: "2025-07-05",
  },
];

const recruitingAgencies = [
  {
    id: 1,
    name: "IBPS",
    contact: "contact@ibps.in",
    exams: ["Banking Recruitment"],
    region: "National",
  },
  {
    id: 2,
    name: "UPSC",
    contact: "info@upsc.gov.in",
    exams: ["Civil Services"],
    region: "National",
  },
  {
    id: 3,
    name: "SSC",
    contact: "ssc@gov.in",
    exams: ["Staff Selection"],
    region: "National",
  },
  {
    id: 4,
    name: "Railway Recruitment Board",
    contact: "rrb@gov.in",
    exams: ["Driver Recruitment", "Technical Staff"],
    region: "National",
  },
  {
    id:5,
    name: "Defence Recruitment Agency",
    contact: "drdo@gov.in",
    exams: ["Defence Services", "Technical Staff"],
    region: "National",
  },
];

const examBoards = [
  {
    id: 1,
    name: "Banking Board",
    type: "National",
    activeExams: 5,
    contact: "admin@bankingboard.in",
  },
  {
    id: 2,
    name: "Civil Services Board",
    type: "National",
    activeExams: 3,
    contact: "admin@civilboard.gov.in",
  },
  {
    id: 3,
    name: "State Education Board",
    type: "State",
    activeExams: 8,
    contact: "admin@stateboard.edu.in",
  },
  {
    id: 4,
    name: "IGNOU Board of Examinations",
    type: "State",
    activeExams: 8,
    contact: "igno@govt.edu.in",
  },{
    id: 5,
    name: "Telangana State Board",
    type: "State",
    activeExams: 8,
    contact: "tg@stateboard.edu.in",
  },
];

const screeningEmployers = [
  {
    id: 1,
    name: "TCS",
    examDetails: "Technical Screening",
    candidatesScreened: 450,
    examDate: "2025-08-10",
    cutoff: 75,
  },
  {
    id: 2,
    name: "Infosys",
    examDetails: "Aptitude Test",
    candidatesScreened: 380,
    examDate: "2025-08-12",
    cutoff: 45,
  },
  {
    id: 3,
    name: "Wipro",
    examDetails: "Coding Assessment",
    candidatesScreened: 320,
    examDate: "2025-08-14",
    cutoff: 70,
  },
  {
    id: 4,
    name: "ISRO",
    examDetails: "Coding Assessment",
    candidatesScreened: 340,
    examDate: "2025-08-14",
    cutoff: 65,
  },
  {
    id: 5,
    name: "Digital Solutions Pvt Ltd",
    examDetails: "Group Discussion",
    candidatesScreened: 320,
    examDate: "2025-08-14",
    cutoff: 60,
  },
];

export default function ExamDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("schedule");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data: ExamFormData) => {
    console.log("Exam Scheduled:", data);
    toast({
      title: "Exam Scheduled Successfully!",
      description: `${data.examName} has been scheduled.`,
    });
    setIsDialogOpen(false);
    form.reset();
  };

  const stats = [
     {
      title: "Enrolled Candidates",
      value: "8,456",
      change: "+15%",
      trend: "up",
      icon: Users,
      color: "text-orange-600",
      description: "Applied",
    },
      {
      title: "Exam Centers",
      value: "12",
      change: "+2",
      trend: "up",
      icon: MapPin,
      color: "text-green-600",
      description: "Active centers",
    },
    {
      title: "Scheduled Exams",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: ClipboardList,
      color: "text-blue-600",
      description: "This month",
    },
    {
      title: "Upcoming Exams",
      value: "6",
      change: "+1%",
      trend: "up",
      icon: CalendarIcon,
      color: "text-blue-600",
      description: "Next 30 days",
    },
    {
      title: "Admit Cards Issued",
      value: "4,120",
      change: "+8%",
      trend: "up",
      icon: FileCheck,
      color: "text-teal-600",
      description: "All time",
    },
    {
      title: "Results Published",
      value: "18",
      change: "-2%",
      trend: "down",
      icon: Award,
      color: "text-purple-600",
      description: "This week",
    },
  ];

  const renderStatsCards = () => {
    if (loading) {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4  ">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-2">
            <CardHeader className="flex flex-row items-center justify-between p-0 mb-1">
              <CardTitle className="text-sm font-medium mr-1 text-[#00aae7]">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent className="flex flex-row p-0 m-0 mt-0 justify-between ">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div
                  className={`flex items-center gap-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Exam Center Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage exam center operations
          </p>
        </div>
        <Button>
         <Link href="/dashboard/exam-center/add-exam-center" className="flex items-center gap-2">
          <MapPin className="h-4 w-4 mr-2" />
          Add New Center
          </Link>
        </Button>
      </div>

      {/* Enhanced Stats Cards */}
      {renderStatsCards()}

      {/* Main Dashboard Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-2"
      >
        <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger
            value="employers"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Employers
          </TabsTrigger>
                 <TabsTrigger
            value="candidates"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Candidates
          </TabsTrigger>
             <TabsTrigger
            value="agencies"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Departments
          </TabsTrigger>
          <TabsTrigger
            value="boards"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Boards
          </TabsTrigger>
          <TabsTrigger
            value="centers"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Centers
          </TabsTrigger>
           <TabsTrigger
            value="exam-types"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Exam Types
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Schedule
          </TabsTrigger>
          <TabsTrigger
            value="screening"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Screening
          </TabsTrigger>

          <TabsTrigger
            value="results"
            className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
          >
            Results
          </TabsTrigger>
        </TabsList>

        {/* Schedule Exam Tab */}
        <TabsContent value="schedule" className="space-y-2">
          {/* <div className="grid gap-2 lg:grid-cols-3">
            
            <Card className="lg:col-span-2 shadow-md border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-primary">
                  Exam Schedule Calendar
                </CardTitle>
                <CardDescription className="text-gray-500">
                  View and manage scheduled examinations
                </CardDescription>
              </CardHeader>
              <CardContent className="[&_.rdp-weekdays]:grid [&_.rdp-weekdays]:grid-cols-7 flex justify-center text-center">
                {loading ? (
                  <Skeleton className="h-[100px] w-[70vh] rounded-md" />
                ) : (
                  <div className="w-full h-full border-t p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="w-full rounded-lg border shadow-sm"
                      modifiers={{
                        hasExam: examSchedule.map((e) => new Date(e.startDate)),
                      }}
                      modifiersStyles={{
                        hasExam: {
                          backgroundColor: "#b7b2b3",
                          borderRadius: "6px",
                        },
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

          
            <Card className="shadow-md border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-primary">
                  {selectedDate ? selectedDate.toDateString() : "Select a Date"}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {selectedDate
                    ? "Scheduled exams for this date"
                    : "Choose a date to view exams"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ) : selectedDate ? (
                  <div className="space-y-4">
                    {examSchedule
                      .filter(
                        (exam) =>
                          new Date(exam.startDate).toDateString() ===
                          selectedDate.toDateString()
                      )
                      .map((exam) => (
                        <div
                          key={exam.id}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
                        >
                          <h4 className="font-medium text-primary">
                            {exam.name}
                          </h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>
                              🕒 {exam.startTime} - {exam.endTime}
                            </div>
                            <div>💻 Type: {exam.type}</div>
                            <div>👥 Candidates: {exam.candidates}</div>
                          </div>
                          <Badge variant="outline" className="mt-2">
                            {exam.status}
                          </Badge>
                        </div>
                      ))}
                    {examSchedule.filter(
                      (exam) =>
                        new Date(exam.startDate).toDateString() ===
                        selectedDate.toDateString()
                    ).length === 0 && (
                      <p className="text-gray-500 italic">
                        No exams scheduled for this date
                      </p>
                    )}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div> */}

          {/* Scheduled Exams List */}
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Exams</CardTitle>
              <CardDescription>
                Manage all scheduled examinations
              </CardDescription>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search exams..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="CBT">CBT</SelectItem>
                    <SelectItem value="OMR">OMR</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={8} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Exam Name</TableHead>
                      <TableHead className="text-primary font-bold">Department</TableHead>
                      <TableHead className="text-primary font-bold">Board</TableHead>
                      <TableHead className="text-primary font-bold">Type</TableHead>
                      <TableHead className="text-primary font-bold">Date & Time</TableHead>
                      <TableHead className="text-primary font-bold">Duration</TableHead>
                      <TableHead className="text-primary font-bold">Status</TableHead>
                      <TableHead className="text-primary font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examSchedule.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium px-2 py-1">
                          {exam.name}
                        </TableCell>
                        <TableCell  className="px-2 py-1">{exam.agency}</TableCell>
                        <TableCell  className="px-2 py-1">{exam.board}</TableCell>
                        <TableCell  className="px-2 py-1">
                          <Badge variant="outline">{exam.type}</Badge>
                        </TableCell>
                        <TableCell  className="px-2 py-1">
                          <div className="text-sm">
                            <div>{exam.startDate}</div>
                            <div className="text-muted-foreground">
                              {exam.startTime} - {exam.endTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell  className="px-2 py-1">
                          {exam.duration} min
                        </TableCell>
                        <TableCell  className="px-2 py-1">

<Badge
                        variant={
                          exam.status === "Ongoing"
                            ? "default"
                            : exam.status === "Completed"
                            ? "outline" // use outline but we’ll override with yellow
                            : "destructive"
                        }
                        className={
                          exam.status === "Ongoing"
                            ? "hover:bg-primary hover:text-primary-foreground"
                            : exam.status === "Completed"
                            ? "bg-yellow-500 text-black hover:bg-yellow-600 hover:text-black"
                            : "bg-destructive text-white hover:bg-destructive hover:text-white"
                        }
                      >
                        {exam.status}
                      </Badge>
                        </TableCell>
                        <TableCell  className="px-2 py-1">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Center List Tab */}
        <TabsContent value="centers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Centers</CardTitle>
              <CardDescription>
                Manage exam center locations and capacity
              </CardDescription>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search centers..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={6} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Center Name</TableHead>
                      <TableHead className="text-primary font-bold">Code</TableHead>
                      <TableHead className="text-primary font-bold">Location</TableHead>
                      <TableHead className="text-primary font-bold">Capacity</TableHead>
                      <TableHead className="text-primary font-bold">Assigned Exams</TableHead>
                      <TableHead className="text-primary font-bold">Completed Exams</TableHead>
                      <TableHead className="text-primary font-bold">Status</TableHead>
                      <TableHead className="text-primary font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examCenters.map((center) => (
                      <TableRow key={center.id}>
                        <TableCell className="font-medium px-2 py-1">
                          {center.name}
                        </TableCell>
                        <TableCell  className="px-2 py-1">{center.code}</TableCell>
                        <TableCell  className="px-2 py-1">{center.location}</TableCell>
                        <TableCell  className="px-2 py-1">{center.capacity}</TableCell>
                        <TableCell  className="px-2 py-1">{center.assignedExams}</TableCell>
                        <TableCell  className="px-2 py-1">{center.completedExams}</TableCell>
                        <TableCell  className="px-2 py-1">
                          <Badge
                            variant={
                              center.status === "Active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {center.status}
                          </Badge>
                        </TableCell>
                        <TableCell  className="px-2 py-1">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applied Candidates Tab */}
        <TabsContent value="candidates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Applied Candidates</CardTitle>
              <CardDescription>
                View candidates who have applied for exams
              </CardDescription>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search candidates..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="attended">Attended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={6} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Candidate Name</TableHead>
                      <TableHead className="text-primary font-bold">Application ID</TableHead>
                      <TableHead className="text-primary font-bold">Exam Name</TableHead>
                      <TableHead className="text-primary font-bold">Exam Date</TableHead>
                      <TableHead className="text-primary font-bold">Center Assigned</TableHead>
                      <TableHead className="text-primary font-bold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appliedCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell className="font-medium px-2 py-1 ">
                          {candidate.name}
                        </TableCell >
                        <TableCell  className="px-2 py-1">{candidate.applicationId}</TableCell>
                        <TableCell  className="px-2 py-1">{candidate.examName}</TableCell>
                        <TableCell  className="px-2 py-1">{candidate.examDate}</TableCell>
                        <TableCell  className="px-2 py-1">{candidate.center}</TableCell>
                        <TableCell  className="px-2 py-1">
                          <Badge
                            variant={
                              candidate.status === "Attended"
                                ? "default"
                                : candidate.status === "Scheduled"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {candidate.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Results</CardTitle>
              <CardDescription>
                View and manage examination results
              </CardDescription>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search results..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="pass">Pass</SelectItem>
                    <SelectItem value="fail">Fail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={7} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Candidate Name</TableHead>
                      <TableHead className="text-primary font-bold">Score</TableHead>
                      <TableHead className="text-primary font-bold">Result</TableHead>
                      <TableHead className="text-primary font-bold">Rank</TableHead>
                      <TableHead className="text-primary font-bold">Exam Name</TableHead>
                      <TableHead className="text-primary font-bold">Exam Date</TableHead>
                      <TableHead className="text-primary font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium px-2 py-1">
                          {result.candidateName}
                        </TableCell>
                        <TableCell>{result.score}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              result.result === "Pass"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {result.result}
                          </Badge>
                        </TableCell>
                        <TableCell  className="px-2 py-1">{result.rank}</TableCell>
                        <TableCell  className="px-2 py-1">{result.examName}</TableCell>
                        <TableCell  className="px-2 py-1">{result.examDate}</TableCell>
                        <TableCell  className="px-2 py-1">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              Re-evaluate
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employers Tab */}
        <TabsContent value="employers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employer List</CardTitle>
              <CardDescription>
                Employers who uploaded or created exams
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={5} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Employer Name</TableHead>
                      <TableHead className="text-primary font-bold">Company Type</TableHead>
                      <TableHead className="text-primary font-bold">Exam Names</TableHead>
                      <TableHead className="text-primary font-bold">Upload Date</TableHead>
                      <TableHead className="text-primary font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employers.map((employer) => (
                      <TableRow key={employer.id}>
                        <TableCell className="font-medium px-2 py-1">
                          {employer.name}
                        </TableCell>
                        <TableCell  className="px-2 py-1">
                          <Badge variant="outline">{employer.type}</Badge>
                        </TableCell>
                        <TableCell  className="px-2 py-1">{employer.exams.join(", ")}</TableCell>
                        <TableCell  className="px-2 py-1">{employer.uploadDate}</TableCell>
                        <TableCell  className="px-2 py-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exam Types Tab */}
        <TabsContent value="exam-types" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Types & Duration</CardTitle>
              <CardDescription>
                Configure exam types and default durations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={4} cols={4} />
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        CBT (Computer Based Test)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Default Duration:</span>
                          <span className="font-medium">120 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Setting:</span>
                          <span className="font-medium">Fixed</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        OMR (Optical Mark Recognition)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Default Duration:</span>
                          <span className="font-medium">180 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Setting:</span>
                          <span className="font-medium">Fixed</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Online Test</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Default Duration:</span>
                          <span className="font-medium">90 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Setting:</span>
                          <span className="font-medium">Flexible</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Offline/Written</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Default Duration:</span>
                          <span className="font-medium">180 minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Setting:</span>
                          <span className="font-medium">Fixed</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recruiting Agencies Tab */}
        <TabsContent value="agencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recruiting Agencies</CardTitle>
              <CardDescription>
                List of all recruiting agencies involved
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={4} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Agency Name</TableHead>
                      <TableHead className="text-primary font-bold">Contact Info</TableHead>
                      <TableHead className="text-primary font-bold">Associated Exams</TableHead>
                      <TableHead className="text-primary font-bold">Region</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recruitingAgencies.map((agency) => (
                      <TableRow key={agency.id}>
                        <TableCell className="font-medium px-2 py-1">
                          {agency.name}
                        </TableCell >
                        <TableCell  className="px-2 py-1">{agency.contact}</TableCell>
                        <TableCell  className="px-2 py-1">{agency.exams.join(", ")}</TableCell>
                        <TableCell  className="px-2 py-1">
                          <Badge variant="outline">{agency.region}</Badge>
                        </TableCell >
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exam Boards Tab */}
        <TabsContent value="boards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Boards</CardTitle>
              <CardDescription>
                Display exam boards and their details
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row justify-center">
              {loading ? (
                <SkeletonTable rows={5} cols={4} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Board Name</TableHead>
                      <TableHead className="text-primary font-bold">Type</TableHead>
                      <TableHead className="text-primary font-bold">Active Exams</TableHead>
                      <TableHead className="text-primary font-bold">Admin Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examBoards.map((board) => (
                      <TableRow key={board.id}>
                        <TableCell className="font-medium px-2 py-1">
                          {board.name}
                        </TableCell>
                        <TableCell  className="px-2 py-1">{board.type}</TableCell>
                        <TableCell  className="px-2 py-1">
                          {board.activeExams}
                        </TableCell>
                        <TableCell  className="px-2 py-1">{board.contact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Screening Exams Tab */}
        <TabsContent value="screening" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employers with Screening Exams</CardTitle>
              <CardDescription>
                Employers conducting screening examinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={5} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary font-bold">Employer Name</TableHead>
                      <TableHead className="text-primary font-bold">Screening Exam Details</TableHead>
                      <TableHead className="text-primary font-bold">Candidates Screened</TableHead>
                      <TableHead className="text-primary font-bold">Exam Date</TableHead>
                      <TableHead className="text-primary font-bold">Cutoff</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {screeningEmployers.map((employer) => (
                      <TableRow key={employer.id}>
                        <TableCell className="font-medium px-2 py-1">
                          {employer.name}
                        </TableCell>
                        <TableCell  className="px-2 py-1">{employer.examDetails}</TableCell>
                        <TableCell className="px-2 py-1">{employer.candidatesScreened}</TableCell>
                        <TableCell  className="px-2 py-1">{employer.examDate}</TableCell>
                        <TableCell  className="px-2 py-1">
                          <Badge variant="outline">{employer.cutoff}%</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
