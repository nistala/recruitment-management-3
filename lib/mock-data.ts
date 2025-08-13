import type { Job, JobNotification, Notification } from "@/types/job"

export const mockJobs: Job[] = [
  // Government Jobs
  {
    id: "1",
    title: "Software Engineer - Grade II",
    organization: "Ministry of Technology",
    category: "government",
    location: "New Delhi",
    salary: "₹50,000 - ₹80,000",
    description: "Develop and maintain government digital services and applications.",
    requirements: ["B.Tech in Computer Science", "2+ years experience", "Knowledge of Java/Python"],
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    isNew: true,
  },
  {
    id: "2",
    title: "Data Analyst",
    organization: "Central Statistics Office",
    category: "government",
    location: "Mumbai",
    salary: "₹40,000 - ₹60,000",
    description: "Analyze government data and prepare statistical reports.",
    requirements: ["Masters in Statistics/Mathematics", "Excel proficiency", "SQL knowledge"],
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
  },
  {
    id: "3",
    title: "Administrative Officer",
    organization: "State Government",
    category: "government",
    location: "Bangalore",
    salary: "₹35,000 - ₹55,000",
    description: "Handle administrative tasks and public service delivery.",
    requirements: ["Graduate degree", "Good communication skills", "Computer literacy"],
    postedDate: "2024-01-12",
    deadline: "2024-02-12",
  },

  // Private Jobs
  {
    id: "4",
    title: "Full Stack Developer",
    organization: "TechCorp Solutions",
    category: "private",
    location: "Hyderabad",
    salary: "₹60,000 - ₹1,20,000",
    description: "Build modern web applications using React and Node.js.",
    requirements: ["3+ years experience", "React, Node.js expertise", "MongoDB knowledge"],
    postedDate: "2024-01-14",
    deadline: "2024-02-14",
    isNew: true,
  },
  {
    id: "5",
    title: "Marketing Manager",
    organization: "Digital Marketing Inc",
    category: "private",
    location: "Chennai",
    salary: "₹45,000 - ₹75,000",
    description: "Lead digital marketing campaigns and strategy development.",
    requirements: ["MBA in Marketing", "4+ years experience", "Digital marketing expertise"],
    postedDate: "2024-01-11",
    deadline: "2024-02-11",
  },
  {
    id: "6",
    title: "UI/UX Designer",
    organization: "Creative Studios",
    category: "private",
    location: "Pune",
    salary: "₹40,000 - ₹70,000",
    description: "Design user interfaces and experiences for mobile and web applications.",
    requirements: ["Design degree", "Figma/Adobe XD", "Portfolio required"],
    postedDate: "2024-01-13",
    deadline: "2024-02-13",
  },

  // Job Fair
  {
    id: "7",
    title: "Campus Recruitment Drive",
    organization: "Multiple Companies",
    category: "job-fair",
    location: "Delhi University",
    description: "Multiple companies recruiting fresh graduates across various domains.",
    requirements: ["Final year students", "All branches welcome", "Resume required"],
    postedDate: "2024-01-16",
    deadline: "2024-01-25",
    isNew: true,
  },
  {
    id: "8",
    title: "IT Job Fair 2024",
    organization: "Tech Consortium",
    category: "job-fair",
    location: "Bangalore Convention Center",
    description: "Exclusive IT job fair with 50+ companies participating.",
    requirements: ["IT background", "0-5 years experience", "Technical skills"],
    postedDate: "2024-01-09",
    deadline: "2024-01-30",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Software Engineer - Grade II",
    message: "New government position available at Ministry of Technology",
    type: "new",
    date: "2024-01-15",
    jobId: "1",
    organization: "Ministry of Technology",
    location: "New Delhi",
  },
  {
    id: "2",
    title: "Campus Recruitment Drive",
    message: "Registration deadline approaching - only 3 days left!",
    type: "deadline",
    date: "2024-01-16",
    jobId: "7",
    organization: "Multiple Companies",
    location: "Delhi University",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    message: "High salary package available at TechCorp Solutions",
    type: "new",
    date: "2024-01-14",
    jobId: "4",
    organization: "TechCorp Solutions",
    location: "Hyderabad",
  },
  {
    id: "4",
    title: "IT Job Fair 2024",
    message: "50+ companies participating in exclusive IT recruitment event",
    type: "update",
    date: "2024-01-09",
    jobId: "8",
    organization: "Tech Consortium",
    location: "Bangalore Convention Center",
  },
  {
    id: "5",
    title: "Data Analyst Position",
    message: "Central Statistics Office seeking qualified candidates",
    type: "new",
    date: "2024-01-10",
    jobId: "2",
    organization: "Central Statistics Office",
    location: "Mumbai",
  },
]

export const mockJobNotifications: JobNotification[] = [
  {
    id: "1",
    message: "New Software Engineer position at Ministry of Technology - Apply now!",
    type: "new-job",
    timestamp: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    message: "Campus Recruitment Drive registration closes in 3 days",
    type: "deadline",
    timestamp: "2024-01-16T09:00:00Z",
  },
  {
    id: "3",
    message: "Full Stack Developer role at TechCorp - High salary package!",
    type: "new-job",
    timestamp: "2024-01-14T14:30:00Z",
  },
  {
    id: "4",
    message: "IT Job Fair 2024 - 50+ companies participating",
    type: "update",
    timestamp: "2024-01-09T11:15:00Z",
  },
]

export const getJobsByCategory = (category: string): Job[] => {
  return mockJobs.filter((job) => job.category === category)
}

export const searchJobs = (query: string): Job[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.organization.toLowerCase().includes(lowercaseQuery) ||
      job.category.toLowerCase().includes(lowercaseQuery) ||
      job.location.toLowerCase().includes(lowercaseQuery),
  )
}

export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find((job) => job.id === id)
}

// Simulate API delay
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API functions
export const fetchJobsByCategory = async (category: string): Promise<Job[]> => {
  await delay(800) // Simulate network delay
  return getJobsByCategory(category)
}

export const fetchAllJobs = async (): Promise<Job[]> => {
  await delay(600)
  return mockJobs
}

export const fetchNotifications = async (): Promise<Notification[]> => {
  await delay(400)
  return mockNotifications
}

export const fetchJobById = async (id: string): Promise<Job | null> => {
  await delay(500)
  const job = getJobById(id)
  return job || null
}

// Keep the old function for backward compatibility
export const fetchJobNotifications = async (): Promise<JobNotification[]> => {
  await delay(400)
  return mockJobNotifications
}
