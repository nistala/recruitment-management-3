"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchNotifications } from "@/lib/mock-data"
import type { Notification } from "@/types/job"
import { Bell, Calendar, MapPin, Building, ExternalLink } from "lucide-react"

interface JobNotificationsProps {
  onJobSelect?: (jobId: string) => void
}

export function JobNotifications({ onJobSelect }: JobNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications()
        setNotifications(data)
      } catch (error) {
        console.error("Failed to load notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new":
        return <Bell className="h-4 w-4" />
      case "deadline":
        return <Calendar className="h-4 w-4" />
      case "update":
        return <ExternalLink className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "new":
        return "bg-green-50 border-green-200 text-green-800"
      case "deadline":
        return "bg-red-50 border-red-200 text-red-800"
      case "update":
        return "bg-blue-50 border-blue-200 text-blue-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const NotificationSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="p-4 border border-gray-200 rounded-lg"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-5 w-full" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full h-fit sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <span>Latest Job Notifications</span>
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[600px] overflow-y-auto">
          <AnimatePresence mode="wait">
            {loading ? (
              <NotificationSkeleton />
            ) : notifications.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div
                          className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium border ${getNotificationColor(notification.type)}`}
                        >
                          {getNotificationIcon(notification.type)}
                          <span className="capitalize">{notification.type}</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                      </div>

                      <div>
                        <h3
                          className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer group-hover:text-blue-700"
                          onClick={() => onJobSelect?.(notification.jobId)}
                        >
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors">
                          {notification.message}
                        </p>
                      </div>

                      {notification.organization && (
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{notification.organization}</span>
                          </div>
                          {notification.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{notification.location}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors bg-transparent"
                        onClick={() => onJobSelect?.(notification.jobId)}
                      >
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8 text-gray-500"
              >
                <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No notifications available</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
