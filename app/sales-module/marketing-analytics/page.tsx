"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  Eye,
  MousePointer,
  Users,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  Filter,
  Target,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const campaignPerformance = [
  { month: "Jan", emailsSent: 12500, opens: 3750, clicks: 750, conversions: 125 },
  { month: "Feb", emailsSent: 15000, opens: 4800, clicks: 960, conversions: 180 },
  { month: "Mar", emailsSent: 13200, opens: 4224, clicks: 845, conversions: 152 },
  { month: "Apr", emailsSent: 18500, opens: 5920, clicks: 1295, conversions: 259 },
  { month: "May", emailsSent: 16800, opens: 5376, clicks: 1075, conversions: 201 },
  { month: "Jun", emailsSent: 21000, opens: 6720, clicks: 1470, conversions: 315 },
]

const audienceSegments = [
  { name: "Employers", value: 45, color: "#8884d8", count: 2250 },
  { name: "Colleges", value: 25, color: "#82ca9d", count: 1250 },
  { name: "Candidates", value: 30, color: "#ffc658", count: 1500 },
]

const recentCampaigns = [
  {
    id: "CAMP001",
    name: "Summer Hiring Drive 2024",
    type: "Email",
    audience: "Employers",
    sent: 2500,
    opens: 875,
    clicks: 175,
    conversions: 35,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "CAMP002",
    name: "College Partnership Program",
    type: "SMS",
    audience: "Colleges",
    sent: 1200,
    opens: 1080,
    clicks: 324,
    conversions: 48,
    status: "active",
    date: "2024-01-14",
  },
  {
    id: "CAMP003",
    name: "New Feature Announcement",
    type: "Email",
    audience: "All Users",
    sent: 5000,
    opens: 1750,
    clicks: 350,
    conversions: 70,
    status: "completed",
    date: "2024-01-13",
  },
  {
    id: "CAMP004",
    name: "Mock Test Promotion",
    type: "Email",
    audience: "Candidates",
    sent: 3200,
    opens: 1152,
    clicks: 256,
    conversions: 64,
    status: "scheduled",
    date: "2024-01-20",
  },
]

const channelPerformance = [
  { channel: "Email", campaigns: 45, opens: 32.5, clicks: 4.2, conversions: 2.1 },
  { channel: "SMS", campaigns: 28, opens: 89.2, clicks: 12.8, conversions: 3.8 },
  { channel: "Push", campaigns: 15, opens: 67.3, clicks: 8.9, conversions: 1.9 },
  { channel: "In-App", campaigns: 22, opens: 78.4, clicks: 15.6, conversions: 5.2 },
]

export default function MarketingAnalyticsPage() {
  const [dateRange, setDateRange] = useState("6months")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCampaigns = recentCampaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing Analytics</h1>
          <p className="text-muted-foreground">Track campaign performance and audience engagement</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18.2%
              </span>
              from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.4%
              </span>
              from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -0.8%
              </span>
              from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.5%
              </span>
              from last period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Overview</TabsTrigger>
          <TabsTrigger value="campaigns" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Campaigns</TabsTrigger>
          <TabsTrigger value="audience" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Audience</TabsTrigger>
          <TabsTrigger value="channels" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Trend</CardTitle>
                <CardDescription>Email campaigns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="opens" stroke="#8884d8" name="Opens" />
                    <Line type="monotone" dataKey="clicks" stroke="#82ca9d" name="Clicks" />
                    <Line type="monotone" dataKey="conversions" stroke="#ffc658" name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Distribution</CardTitle>
                <CardDescription>Campaign reach by audience segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={audienceSegments}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }:any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {audienceSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Campaign Volume</CardTitle>
              <CardDescription>Emails sent and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="emailsSent"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                    name="Emails Sent"
                  />
                  <Area
                    type="monotone"
                    dataKey="opens"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                    name="Opens"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Latest marketing campaign performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="space-y-4">
                {filteredCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {campaign.id} • {campaign.type} • {campaign.audience}
                        </p>
                      </div>
                      <Badge
                        variant={
                          campaign.status === "completed"
                            ? "default"
                            : campaign.status === "active"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sent</p>
                        <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Opens</p>
                        <p className="font-medium">
                          {campaign.opens.toLocaleString()} ({((campaign.opens / campaign.sent) * 100).toFixed(1)}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-medium">
                          {campaign.clicks.toLocaleString()} ({((campaign.clicks / campaign.sent) * 100).toFixed(1)}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversions</p>
                        <p className="font-medium">
                          {campaign.conversions.toLocaleString()} (
                          {((campaign.conversions / campaign.sent) * 100).toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Open Rate</span>
                        <span>{((campaign.opens / campaign.sent) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(campaign.opens / campaign.sent) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {audienceSegments.map((segment) => (
              <Card key={segment.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {segment.name}
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{segment.count.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground mb-4">Active subscribers</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engagement Rate</span>
                      <span>{(Math.random() * 20 + 15).toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.random() * 20 + 15} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>Subscriber growth by segment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="opens" fill="#8884d8" name="Engaged Users" />
                  <Bar dataKey="clicks" fill="#82ca9d" name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Performance metrics by marketing channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelPerformance.map((channel) => (
                  <div key={channel.channel} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{channel.channel}</h3>
                      <Badge variant="outline">{channel.campaigns} campaigns</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Open Rate</p>
                        <p className="font-medium">{channel.opens}%</p>
                        <Progress value={channel.opens} className="h-2 mt-1" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Click Rate</p>
                        <p className="font-medium">{channel.clicks}%</p>
                        <Progress value={channel.clicks} className="h-2 mt-1" />
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversion Rate</p>
                        <p className="font-medium">{channel.conversions}%</p>
                        <Progress value={channel.conversions} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
