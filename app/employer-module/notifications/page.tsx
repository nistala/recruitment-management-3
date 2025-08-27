"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Briefcase, Users, Settings, Check, Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setNotifications([
  {
    id: 1,
    type: "job",
    title: "New Application Received",
    message: "Sarah Johnson applied for Frontend Developer position",
    time: "2 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    type: "candidate",
    title: "Candidate Shortlisted",
    message: "Michael Chen has been shortlisted for Backend Developer role",
    time: "1 hour ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    type: "system",
    title: "Payment Reminder",
    message: "Your premium plan expires in 3 days",
    time: "3 hours ago",
    read: true,
    avatar: null,
  },
  {
    id: 4,
    type: "job",
    title: "Job Post Approved",
    message: "Your UI/UX Designer job posting has been approved and is now live",
    time: "1 day ago",
    read: true,
    avatar: null,
  },
  {
    id: 5,
    type: "candidate",
    title: "Interview Scheduled",
    message: "Interview scheduled with Emily Davis for tomorrow at 2:00 PM",
    time: "2 days ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    type: "system",
    title: "Security Alert",
    message: "New login detected from a different device",
    time: "2 days ago",
    read: false,
    avatar: null,
  },
  {
    id: 7,
    type: "job",
    title: "Application Withdrawn",
    message: "David Miller has withdrawn his application for Marketing Manager",
    time: "3 days ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    type: "candidate",
    title: "Profile Updated",
    message: "Anna Smith updated her candidate profile",
    time: "3 days ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    type: "system",
    title: "Plan Upgraded",
    message: "Your account has been upgraded to Enterprise plan",
    time: "4 days ago",
    read: true,
    avatar: null,
  },
  {
    id: 10,
    type: "job",
    title: "Job Post Expired",
    message: "Your Data Analyst job posting has expired",
    time: "5 days ago",
    read: true,
    avatar: null,
  },
  {
    id: 11,
    type: "candidate",
    title: "Offer Accepted",
    message: "John Doe has accepted your job offer",
    time: "6 days ago",
    read: false,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 12,
    type: "job",
    title: "New Job Recommendation",
    message: "Recommended posting: Cloud Engineer role",
    time: "1 week ago",
    read: true,
    avatar: null,
  },
  {
    id: 13,
    type: "system",
    title: "Maintenance Notice",
    message: "Scheduled downtime tomorrow between 1 AM - 3 AM",
    time: "1 week ago",
    read: false,
    avatar: null,
  },
  {
    id: 14,
    type: "candidate",
    title: "Candidate Rejected",
    message: "Interview feedback submitted: Jane Lee was not shortlisted",
    time: "8 days ago",
    read: true,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 15,
    type: "job",
    title: "Job Draft Saved",
    message: "Your draft for Senior Architect position has been saved",
    time: "9 days ago",
    read: true,
    avatar: null,
  },
]
)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-5 w-5 text-blue-600" />
      case "candidate":
        return <Users className="h-5 w-5 text-green-600" />
      case "system":
        return <Settings className="h-5 w-5 text-orange-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const filterNotifications = (type: string) => {
    if (type === "all") return notifications
    return notifications.filter((notif) => notif.type === type)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-600">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline" onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}>
          <Check className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="job" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Job-related ({filterNotifications("job").length})</TabsTrigger>
          <TabsTrigger value="candidate" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Candidate-related ({filterNotifications("candidate").length})</TabsTrigger>
          <TabsTrigger value="system" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">System ({filterNotifications("system").length})</TabsTrigger>
        </TabsList>

        {["all", "job", "candidate", "system"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-0">
                {filterNotifications(tab).length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No notifications in this category</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filterNotifications(tab).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {notification.avatar ? (
                              <Avatar>
                                <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{notification.title.split(" ")[0][0]}</AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                              </div>

                              <div className="flex items-center space-x-2">
                                {!notification.read && (
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    New
                                  </Badge>
                                )}
                                <div className="flex space-x-1">
                                  {!notification.read && (
                                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
