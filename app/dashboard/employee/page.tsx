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
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonChart,
} from "@/components/ui/skeleton";

const employerData = [
  { name: "Tech Corp", type: "Private", employees: 250, status: "Active" },
  { name: "Govt Dept", type: "Government", employees: 500, status: "Active" },
  {
    name: "Edu Institute",
    type: "Educational",
    employees: 150,
    status: "Pending",
  },
];

const candidateDistribution = [
  { name: "Government Colleges", value: 65, color: "#8884d8" },
  { name: "Private Colleges", value: 35, color: "#82ca9d" },
];

const examData = [
  {
    name: "Banking Exam",
    candidates: 70,
    date: "2025-08-15",
    status: "Scheduled",
  },
  {
    name: "Civil Services",
    candidates: 50,
    date: "2025-08-20",
    status: "Active",
  },
  {
    name: "Technical Test",
    candidates: 30,
    date: "2025-08-25",
    status: "Completed",
  },
];

const stats = [
  {
    title: "Total Employers",
    value: "56",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "Registered Candidates",
    value: "150",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Active Exams",
    value: "89",
    icon: ClipboardList,
    color: "text-orange-600",
  },
  {
    title: "Universities",
    value: "156",
    icon: GraduationCap,
    color: "text-purple-600",
  },
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="candidates" fill="#8884d8" />
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
              <Input placeholder="Search employers..." className="pl-8" />
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
                  <TableHead className="text-primary font-bold">
                    Employees
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
                    <TableCell>{employer.employees}</TableCell>
                    <TableCell className="px-2 py-1">
                      <Badge
                        variant={
                          employer.status === "Active" ? "default" : "secondary"
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
              <Input placeholder="Search exam name..." className="pl-8" />
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
                    Exam Name
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
                    <TableCell className="px-2 py-1">
                      {exam.candidates}
                    </TableCell>
                    <TableCell className="px-2 py-1">{exam.date}</TableCell>
                    <TableCell className="px-2 py-1">
                      <Badge
                        variant={
                          exam.status === "Active"
                            ? "default"
                            : exam.status === "Completed"
                            ? "muted"
                            : "outline"
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
