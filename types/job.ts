export interface Job {
  id: string
  title: string
  organization: string
  category: "government" | "private" | "job-fair"
  location: string
  salary?: string
  description: string
  requirements: string[]
  postedDate: string
  deadline: string
  isNew?: boolean
}

export interface JobNotification {
  id: string
  message: string
  type: "new-job" | "deadline" | "update"
  timestamp: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "new" | "deadline" | "update"
  date: string
  jobId: string
  organization?: string
  location?: string
}

export interface JobCategory {
  id: string
  name: string
  count: number
  jobs: Job[]
}
