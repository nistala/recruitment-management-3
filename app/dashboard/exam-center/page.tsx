"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonChart } from "@/components/ui/skeleton"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Search, Filter, MapPin, Users, Clock, CheckCircle, Monitor, Shield, Zap, Phone, AlertTriangle, XCircle, Wifi, WifiOff, Camera, Scan, Battery, Users2, CalendarIcon } from 'lucide-react'

const liveMonitoringData = [
  { center: "Hyderabad Main", online: 450, offline: 5, total: 455, uptime: 98.9 },
  { center: "Bangalore Tech", online: 380, offline: 2, total: 382, uptime: 99.5 },
  { center: "Chennai Regional", online: 295, offline: 8, total: 303, uptime: 97.4 },
]

const omrLogistics = [
  { batch: "Batch A", printed: 500, issued: 480, returned: 475, scanned: 470, scanProgress: 98.9 },
  { batch: "Batch B", printed: 400, issued: 395, returned: 390, scanned: 385, scanProgress: 98.7 },
  { batch: "Batch C", printed: 300, issued: 298, returned: 295, scanned: 290, scanProgress: 98.3 },
]

const securityChecklist = [
  { item: "CCTV Cameras", status: "online", centers: 12, total: 12 },
  { item: "Metal Detectors", status: "online", centers: 11, total: 12 },
  { item: "Biometric Scanners", status: "warning", centers: 10, total: 12 },
  { item: "Backup Power", status: "online", centers: 12, total: 12 },
]

const powerInternetReports = [
  { center: "Hyderabad Main", powerUptime: 99.8, internetUptime: 99.5, lastOutage: "2 days ago" },
  { center: "Bangalore Tech", powerUptime: 98.2, internetUptime: 99.8, lastOutage: "1 week ago" },
  { center: "Chennai Regional", powerUptime: 97.5, internetUptime: 98.9, lastOutage: "3 days ago" },
]

const escalationContacts = [
  { name: "Dr. Rajesh Kumar", designation: "Regional Coordinator", zone: "South", phone: "+91-9876543210", email: "rajesh.kumar@rems.gov.in" },
  { name: "Ms. Priya Sharma", designation: "Technical Lead", zone: "North", phone: "+91-9876543211", email: "priya.sharma@rems.gov.in" },
  { name: "Mr. Anil Reddy", designation: "Security Officer", zone: "Central", phone: "+91-9876543212", email: "anil.reddy@rems.gov.in" },
]

const attendanceData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 87 },
  { month: "May", attendance: 90 },
  { month: "Jun", attendance: 94 },
]

export default function ExamCenterDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500) // Simulate 1.5 seconds loading
    return () => clearTimeout(timer)
  }, [])
  const [activeTab, setActiveTab] = useState("live-monitoring")

  // Simulate loading


  const stats = [
  { 
    title: "Active Centers", 
    value: "12", 
    icon: MapPin, 
    color: "text-blue-600",
    description: "Currently operational"
  },
  { 
    title: "Total Capacity", 
    value: "6,500", 
    icon: Users, 
    color: "text-green-600",
    description: "Max seating"
  },
  { 
    title: "Scheduled Exams", 
    value: "24", 
    icon: Clock, 
    color: "text-orange-600",
    description: "This month"
  },
  { 
    title: "Avg Attendance", 
    value: "89%", 
    icon: CheckCircle, 
    color: "text-purple-600",
    description: "Across exams"
  },
  { 
    title: "Upcoming Exams", 
    value: "8", 
    icon: CalendarIcon, 
    color: "text-indigo-600",
    description: "Next 30 days"
  },
  { 
    title: "Utilization Rate", 
    value: "76%", 
    icon: BarChart, 
    color: "text-teal-600",
    description: "Seats filled"
  },
  { 
    title: "Staff Assigned", 
    value: "145", 
    icon: Users2, 
    color: "text-pink-600",
    description: "Invigilators & support"
  },
  { 
    title: "Issues Reported", 
    value: "12", 
    icon: AlertTriangle, 
    color: "text-red-600",
    description: "Technical/logistics"
  }
];

  const renderStatsCards = () => {
    if (loading) {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )
    } else {
      return (
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-2">
              <CardHeader className="flex flex-row items-center justify-between p-0 mb-1">
                <CardTitle className="text-sm font-medium mr-1 text-[#00aae7]">{stat.title}</CardTitle>
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
      )
    }
  }

  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Exam Center Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage exam center operations</p>
        </div>
        <Button>
          <MapPin className="h-4 w-4 mr-2" />
          Add New Center
        </Button>
      </div>

      {/* Stats Cards */}
      {renderStatsCards()}

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="live-monitoring" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Live Monitoring</TabsTrigger>
          <TabsTrigger value="omr-logistics" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">OMR Logistics</TabsTrigger>
          <TabsTrigger value="security" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Security</TabsTrigger>
          <TabsTrigger value="reports" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Reports</TabsTrigger>
          <TabsTrigger value="contacts" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Contacts</TabsTrigger>
        </TabsList>

        {/* Live Monitoring Tab */}
        <TabsContent value="live-monitoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Live CBT Monitoring
              </CardTitle>
              <CardDescription>Real-time status of candidate systems</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={3} cols={5} />
              ) : (
                <div className="space-y-4">
                  {liveMonitoringData.map((center, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{center.center}</h4>
                        <Badge variant={center.uptime > 99 ? "default" : "secondary"}>
                          {center.uptime}% Uptime
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Online: {center.online}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Offline: {center.offline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Total: {center.total}</span>
                        </div>
                      </div>
                      <Progress value={(center.online / center.total) * 100} className="mt-3" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Attendance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Monthly attendance percentage</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonChart />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* OMR Logistics Tab */}
        <TabsContent value="omr-logistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                OMR Sheet Logistics
              </CardTitle>
              <CardDescription>Track OMR sheet printing, distribution, and scanning</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={3} cols={6} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Batch</TableHead>
                      <TableHead>Printed</TableHead>
                      <TableHead>Issued</TableHead>
                      <TableHead>Returned</TableHead>
                      <TableHead>Scanned</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {omrLogistics.map((batch, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{batch.batch}</TableCell>
                        <TableCell>{batch.printed}</TableCell>
                        <TableCell>{batch.issued}</TableCell>
                        <TableCell>{batch.returned}</TableCell>
                        <TableCell>{batch.scanned}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Progress value={batch.scanProgress} className="w-20" />
                            <span className="text-xs text-muted-foreground">
                              {batch.scanProgress.toFixed(1)}%
                            </span>
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

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Checklist
              </CardTitle>
              <CardDescription>Monitor security systems across all centers</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={4} cols={4} />
              ) : (
                <div className="space-y-4">
                  {securityChecklist.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.status === 'online' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : item.status === 'warning' ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className="font-medium">{item.item}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {item.centers}/{item.total} Centers
                        </span>
                        <Badge variant={
                          item.status === 'online' ? 'default' : 
                          item.status === 'warning' ? 'secondary' : 'destructive'
                        }>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Power & Internet Reports
              </CardTitle>
              <CardDescription>Uptime monitoring and outage reports</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={3} cols={4} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Center</TableHead>
                      <TableHead>Power Uptime</TableHead>
                      <TableHead>Internet Uptime</TableHead>
                      <TableHead>Last Outage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {powerInternetReports.map((report, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{report.center}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={report.powerUptime} className="w-20" />
                            <span className="text-sm">{report.powerUptime}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={report.internetUptime} className="w-20" />
                            <span className="text-sm">{report.internetUptime}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {report.lastOutage}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Escalation Contact Directory
              </CardTitle>
              <CardDescription>Emergency contacts and regional coordinators</CardDescription>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search contacts..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Zones</SelectItem>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={3} cols={5} />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escalationContacts.map((contact, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.designation}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{contact.zone}</Badge>
                        </TableCell>
                        <TableCell>
                          <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                            {contact.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
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
  )
}
