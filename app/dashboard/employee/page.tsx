"use client";

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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Search,
  Filter,
  Download,
  Users,
  Building2,
  GraduationCap,
  ClipboardList,
  Briefcase,
  FileText,
  CalendarIcon,
  BadgeCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonChart,
} from "@/components/ui/skeleton";
import { hover } from "framer-motion";

const employerData = [
  { name: "Tech Corp",department:'IT', type: "Private",location:'Bangalore', employees: 250, status: "Released" },
  { name: "Govt Dept",department:'Civil Services',location:"Hyderabad", type: "Government", employees: 500, status: "Released" },
  {
    name: "Manufactuiring Inc",
    department:'Manufacturing',
    location:"Chennai",
    type: "Private",
    employees: 150,
    status: "Pending",
  },
];

const candidateDistribution = [
  { name: "Government", value: 55, color: " #2368a0" },
  { name: "Private ", value: 35, color: " #ef4048" },
  { name: "Job Fair ", value: 10, color: " #40ef40ff" },
];

const examData = [
  {
    name: "Banking Exam",
    examKey: "BE",
    candidates: 70,
    exam_type:"Preliminary",
    date: "2025-08-15",
    status: "Scheduled",
  },
  {
    name: "Civil Services",
    examKey: "CS",
    candidates: 50,
    exam_type:"Preliminary",
    date: "2025-08-20",
    status: "Applied",
  },
  {
    name: "Technical Test",
    examKey: "TT",
    exam_type:"Tier-1",
    candidates: 30,
    date: "2025-08-25",
    status: "Completed",
  },
  {
    name: "Railway Recruitment",
    candidates: 120,
    exam_type:"Mains",
    examKey: "RR",
    date: "2025-08-30",
    status: "Scheduled",
  },
  {
    name: "Teacher Eligibility Test",
    candidates: 95,
    exam_type:"Mains",
    examKey: "TET",
    date: "2025-09-05",
    status: "Applied",
  },
  {
    name: "Police Constable Exam",
    examKey: "PCE",
    exam_type:"Preliminary",
    candidates: 150,
    date: "2025-09-10",
    status: "Scheduled",
  },
  {
    name: "Software Developer Engineer",
    examKey: "SDE",
    exam_type:"Tier-2",
    candidates: 40,
    date: "2025-09-15",
    status: "Applied",
  },
  {
    name: "Medical Entrance Test",
    examKey: "NEET",
    exam_type:"Tier-2",
    candidates: 85,
    date: "2025-09-20",
    status: "Completed",
  },
];

const stats = [
  {
    title: "Employees",
    value: "120",
    icon: Building2,
    color: "text-blue-600",
    description: "Company-wide",
  },
    {
    title: "Active Employees",
    value: "89",
    icon: ClipboardList,
    color: "text-orange-600",
    description: "Currently working",
  },
  {
    title: "Registered Candidates",
    value: "150",
    icon: Users,
    color: "text-green-600",
    description: "Job applicants",
  },
    {
    title: "Interviews Scheduled",
    value: "32",
    icon: CalendarIcon,
    color: "text-teal-600",
    description: "This month"
  },
  // {
  //   title: "Universities",
  //   value: "156",
  //   icon: GraduationCap,
  //   color: "text-purple-600",
  //   description: "Partner institutions",
  // },
  // {
  //   title: "Departments",
  //   value: "12",
  //   icon: Briefcase,
  //   color: "text-indigo-600",
  //   description: "Across organization",
  // },
  {
    title: "Selceted Candidates",
    value: "24",
    icon: GraduationCap,
    color: "text-red-600",
    description: "Shortlisted for interviews",
  },

  {
    title: "Offers Released",
    value: "18",
    icon: BadgeCheck,
    color: "text-yellow-600",
    description: "Awaiting acceptance"
  }
];

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate 1.5 seconds loading
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground">
            Manage employers, candidates, and examinations
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-2">
              <CardHeader className="flex flex-row items-center justify-between p-0 mb-1">
                <CardTitle className="text-md font-medium mr-1 text-[#00aae7]">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent className="p-0 m-0 mt-0">
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Candidate Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Distribution</CardTitle>
            <CardDescription>Government vs Private Colleges</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={candidateDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {candidateDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Exam Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Statistics</CardTitle>
            <CardDescription>
              Candidate registrations by exam type
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonChart />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={examData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="examKey" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name, props) => [value, "Candidates"]}
                    labelFormatter={(label, payload) => {
                      const exam = examData.find(
                        (item) => item.examKey === label
                      );
                      return exam ? exam.name : label;
                    }}
                  />
                  <Bar dataKey="candidates" fill="#00aae7" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Registered Employers List */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Employers</CardTitle>
          <CardDescription>
            List of all registered employers in the system
          </CardDescription>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search companies..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <SkeletonTable rows={5} cols={5} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-primary font-bold">
                    Company Name
                  </TableHead>
                  <TableHead className="text-primary font-bold">Type</TableHead>
                  <TableHead className="text-primary font-bold">Department</TableHead>
                  <TableHead className="text-primary font-bold">Location</TableHead>

                  <TableHead className="text-primary font-bold">
                    Selected Employees
                  </TableHead>
                  <TableHead className="text-primary font-bold">
                    Status
                  </TableHead>
                  <TableHead className="text-primary font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employerData.map((employer, index) => (
                  <TableRow key={index} className="h-8">
                    <TableCell className="font-medium px-2 py-1">
                      {employer.name}
                    </TableCell>
                    <TableCell className="px-2 py-1">{employer.type}</TableCell>
                    <TableCell className="px-2 py-1">{employer.department}</TableCell>
                    <TableCell className="px-2 py-1">{employer.location}</TableCell>
                    <TableCell>{employer.employees}</TableCell>
                    <TableCell className="px-2 py-1">
                      <Badge
                        variant={
                          employer.status === "Released"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          employer.status === "Released"
                            ? "hover:bg-primary hover:text-primary-foreground"
                            : "hover:bg-destructive hover:text-destructive-foreground"
                        }
                      >
                        {employer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <Button variant="outline" size="sm">
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

      {/* Exam List */}
      <Card>
        <CardHeader>
          <CardTitle>Exam Schedule & Merit List</CardTitle>
          <CardDescription>Upcoming and completed examinations</CardDescription>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search exam title..." className="pl-8" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="private">Last one Week</SelectItem>
                <SelectItem value="government">Last one Month</SelectItem>
                <SelectItem value="educational">Last one Year</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="private">Completed</SelectItem>
                <SelectItem value="government">Active</SelectItem>
                <SelectItem value="educational">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <SkeletonTable rows={5} cols={5} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-primary font-bold">
                    Exam Title
                  </TableHead>
                   <TableHead className="text-primary font-bold">
                    Exam Type
                  </TableHead>
                  <TableHead className="text-primary font-bold">
                    Candidates
                  </TableHead>
                  <TableHead className="text-primary font-bold">Date</TableHead>
                  <TableHead className="text-primary font-bold">
                    Status
                  </TableHead>
                  <TableHead className="text-primary font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examData.map((exam, index) => (
                  <TableRow key={index} className="h-8">
                    {" "}
                    {/* Adjust height here */}
                    <TableCell className="font-medium px-2 py-1">
                      {exam.name}
                    </TableCell>
                     <TableCell className="font-medium px-2 py-1">
                      {exam.exam_type}
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      {exam.candidates}
                    </TableCell>
                    <TableCell className="px-2 py-1">{exam.date}</TableCell>
                    <TableCell className="px-2 py-1">
                      <Badge
                        variant={
                          exam.status === "Applied"
                            ? "default"
                            : exam.status === "Completed"
                            ? "outline" // use outline but we’ll override with yellow
                            : "outline"
                        }
                        className={
                          exam.status === "Applied"
                            ? "hover:bg-primary hover:text-primary-foreground"
                            : exam.status === "Completed"
                            ? "bg-yellow-500 text-black hover:bg-yellow-600 hover:text-black"
                            : "hover:bg-muted hover:text-muted-foreground"
                        }
                      >
                        {exam.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-2 py-1">
                      <Button variant="outline" size="sm">
                        {exam.status === "Completed"
                          ? "View Results"
                          : "Manage"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
