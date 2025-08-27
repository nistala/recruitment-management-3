"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, MessageSquare, Plus, Send, Eye, Edit, Trash2, Calendar, TrendingUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const campaigns = [
  {
    id: 1,
    name: "New Year Job Fair 2024",
    type: "email",
    status: "sent",
    audience: "employers",
    recipients: 1250,
    sent: 1250,
    opened: 875,
    clicked: 234,
    responses: 45,
    createdDate: "2024-01-15",
    sentDate: "2024-01-16",
    subject: "Join Our Exclusive New Year Job Fair - Premium Opportunities Await!",
  },
  {
    id: 2,
    name: "College Partnership Drive",
    type: "sms",
    status: "scheduled",
    audience: "colleges",
    recipients: 450,
    sent: 0,
    opened: 0,
    clicked: 0,
    responses: 0,
    createdDate: "2024-01-17",
    scheduledDate: "2024-01-20",
    subject: "Expand Your Placement Opportunities - Partner With Us Today!",
  },
  {
    id: 3,
    name: "Premium Features Launch",
    type: "email",
    status: "draft",
    audience: "all",
    recipients: 0,
    sent: 0,
    opened: 0,
    clicked: 0,
    responses: 0,
    createdDate: "2024-01-17",
    subject: "Introducing Premium Features - Boost Your Recruitment Success",
  },
  {
    id: 4,
    name: "Student Skill Assessment",
    type: "email",
    status: "sent",
    audience: "candidates",
    recipients: 8500,
    sent: 8500,
    opened: 6200,
    clicked: 1850,
    responses: 420,
    createdDate: "2024-01-10",
    sentDate: "2024-01-12",
    subject: "Free Skill Assessment - Boost Your Career Prospects",
  },
]

const audienceOptions = [
  { value: "all", label: "All Users", count: 10200 },
  { value: "employers", label: "Employers", count: 1250 },
  { value: "colleges", label: "Colleges", count: 450 },
  { value: "candidates", label: "Candidates", count: 8500 },
  { value: "premium", label: "Premium Users", count: 320 },
  { value: "inactive", label: "Inactive Users", count: 1200 },
]

export default function MarketingCampaigns() {
  const [selectedTab, setSelectedTab] = useState("campaigns")
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "email",
    audience: "all",
    subject: "",
    content: "",
    scheduledDate: "",
  })

  const handleCreateCampaign = () => {
    console.log("Creating campaign:", newCampaign)
    setIsCreateDialogOpen(false)
    setNewCampaign({
      name: "",
      type: "email",
      audience: "all",
      subject: "",
      content: "",
      scheduledDate: "",
    })
  }

  const handleCampaignAction = (id: number, action: "send" | "edit" | "delete" | "duplicate") => {
    console.log(`${action} campaign ${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case "sending":
        return <Badge className="bg-yellow-100 text-yellow-800">Sending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAudienceBadge = (audience: string) => {
    const option = audienceOptions.find((opt) => opt.value === audience)
    return <Badge variant="outline">{option?.label || audience}</Badge>
  }

  const calculateOpenRate = (opened: number, sent: number) => {
    return sent > 0 ? ((opened / sent) * 100).toFixed(1) : "0"
  }

  const calculateClickRate = (clicked: number, opened: number) => {
    return opened > 0 ? ((clicked / opened) * 100).toFixed(1) : "0"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Marketing & Campaigns</h1>
          <p className="text-muted-foreground">
            Create and manage promotional campaigns across email and SMS channels.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>Design and schedule your marketing campaign</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input
                    id="campaign-name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <Select
                    value={newCampaign.type}
                    onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Select
                  value={newCampaign.audience}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} ({option.count.toLocaleString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  placeholder="Enter subject line"
                />
              </div>

              <div>
                <Label htmlFor="content">Campaign Content</Label>
                <Textarea
                  id="content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  placeholder="Enter your campaign message..."
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="scheduled-date">Schedule Date (Optional)</Label>
                <Input
                  id="scheduled-date"
                  type="datetime-local"
                  value={newCampaign.scheduledDate}
                  onChange={(e) => setNewCampaign({ ...newCampaign, scheduledDate: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateCampaign} className="flex-1">
                  Create Campaign
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaigns.length}</p>
                <p className="text-sm text-muted-foreground">Total Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Send className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaigns.filter((c) => c.status === "sent").length}</p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaigns.filter((c) => c.status === "scheduled").length}</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaigns.reduce((acc, c) => acc + c.opened, 0).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Opens</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(campaign.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {campaign.type === "email" ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                        <span className="capitalize">{campaign.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getAudienceBadge(campaign.audience)}</TableCell>
                    <TableCell>
                      <p className="font-medium">{campaign.recipients.toLocaleString()}</p>
                      {campaign.sent > 0 && (
                        <p className="text-xs text-muted-foreground">Sent: {campaign.sent.toLocaleString()}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      {campaign.sent > 0 ? (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Opens:</span>
                            <span>{calculateOpenRate(campaign.opened, campaign.sent)}%</span>
                          </div>
                          <Progress
                            value={Number.parseFloat(calculateOpenRate(campaign.opened, campaign.sent))}
                            className="h-1"
                          />
                          <div className="flex justify-between text-xs">
                            <span>Clicks:</span>
                            <span>{calculateClickRate(campaign.clicked, campaign.opened)}%</span>
                          </div>
                          <Progress
                            value={Number.parseFloat(calculateClickRate(campaign.clicked, campaign.opened))}
                            className="h-1"
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not sent</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedCampaign(campaign)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Campaign Details</DialogTitle>
                              <DialogDescription>View campaign performance and details</DialogDescription>
                            </DialogHeader>
                            {selectedCampaign && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Campaign Name</label>
                                    <p className="text-sm text-muted-foreground">{selectedCampaign.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Type</label>
                                    <p className="text-sm text-muted-foreground capitalize">{selectedCampaign.type}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Audience</label>
                                    <div className="mt-1">{getAudienceBadge(selectedCampaign.audience)}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="mt-1">{getStatusBadge(selectedCampaign.status)}</div>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Subject Line</label>
                                  <p className="text-sm text-muted-foreground">{selectedCampaign.subject}</p>
                                </div>

                                {selectedCampaign.sent > 0 && (
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="text-center">
                                          <p className="text-2xl font-bold">{selectedCampaign.opened}</p>
                                          <p className="text-sm text-muted-foreground">Opens</p>
                                          <p className="text-xs text-green-600">
                                            {calculateOpenRate(selectedCampaign.opened, selectedCampaign.sent)}% rate
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="text-center">
                                          <p className="text-2xl font-bold">{selectedCampaign.clicked}</p>
                                          <p className="text-sm text-muted-foreground">Clicks</p>
                                          <p className="text-xs text-blue-600">
                                            {calculateClickRate(selectedCampaign.clicked, selectedCampaign.opened)}%
                                            rate
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button size="sm" variant="outline" onClick={() => handleCampaignAction(campaign.id, "edit")}>
                          <Edit className="h-4 w-4" />
                        </Button>

                        {campaign.status === "draft" && (
                          <Button size="sm" onClick={() => handleCampaignAction(campaign.id, "send")}>
                            <Send className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCampaignAction(campaign.id, "delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Overview</CardTitle>
                <CardDescription>Overall campaign metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Recipients</span>
                    <span className="font-medium">
                      {campaigns.reduce((acc, c) => acc + c.recipients, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Sent</span>
                    <span className="font-medium">
                      {campaigns.reduce((acc, c) => acc + c.sent, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Open Rate</span>
                    <span className="font-medium">
                      {(
                        campaigns.reduce((acc, c) => acc + Number.parseFloat(calculateOpenRate(c.opened, c.sent)), 0) /
                        campaigns.filter((c) => c.sent > 0).length
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Responses</span>
                    <span className="font-medium">{campaigns.reduce((acc, c) => acc + c.responses, 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Breakdown</CardTitle>
                <CardDescription>Campaign distribution by audience type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {audienceOptions.map((audience) => {
                    const campaignCount = campaigns.filter((c) => c.audience === audience.value).length
                    return (
                      <div key={audience.value} className="flex items-center justify-between">
                        <span className="text-sm">{audience.label}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{campaignCount} campaigns</Badge>
                          <span className="text-xs text-muted-foreground">{audience.count.toLocaleString()} users</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
