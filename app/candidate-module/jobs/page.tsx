"use client"

import { useState } from "react"
import { Search, MapPin, Clock, DollarSign, Briefcase, Home, GraduationCap, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: true,
    salary: "$120,000 - $150,000",
    experience: "3+ years",
    postedTime: "2 hours ago",
    description:
      "We're looking for a passionate frontend developer to join our growing team. You'll work on cutting-edge web applications using React, TypeScript, and modern development tools.",
    tags: ["React", "TypeScript", "Remote"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    remote: false,
    salary: "$100,000 - $130,000",
    experience: "5+ years",
    postedTime: "5 hours ago",
    description:
      "Lead product strategy and development for our innovative SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.",
    tags: ["Product Strategy", "SaaS", "Leadership"],
  },
  {
    id: 3,
    title: "Junior Data Analyst",
    company: "DataFlow Solutions",
    location: "Austin, TX",
    type: "Full-time",
    remote: true,
    salary: "$60,000 - $75,000",
    experience: "No Experience",
    postedTime: "1 day ago",
    description:
      "Perfect opportunity for recent graduates to start their career in data analytics. You'll work with large datasets and create insights that drive business decisions.",
    tags: ["Python", "SQL", "Entry Level"],
  },
  {
    id: 4,
    title: "UX Designer",
    company: "Design Studio Pro",
    location: "Los Angeles, CA",
    type: "Part-time",
    remote: true,
    salary: "$40 - $60/hour",
    experience: "1+ year",
    postedTime: "3 days ago",
    description:
      "Create beautiful and intuitive user experiences for web and mobile applications. Collaborate with product teams to solve complex design challenges.",
    tags: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech Systems",
    location: "Seattle, WA",
    type: "Full-time",
    remote: false,
    salary: "$110,000 - $140,000",
    experience: "3+ years",
    postedTime: "1 week ago",
    description:
      "Build and maintain scalable cloud infrastructure. Work with containerization, CI/CD pipelines, and monitoring systems to ensure reliable deployments.",
    tags: ["AWS", "Docker", "Kubernetes"],
  },
]

const popularQueries = [
  { label: "Work From Home", icon: Home, filter: { remote: true } },
  { label: "For Graduates", icon: GraduationCap, filter: { experience: "No Experience" } },
  { label: "Fresher Jobs", icon: Star, filter: { experience: "No Experience" } },
  { label: "Full-time", icon: Briefcase, filter: { type: "Full-time" } },
  { label: "Part-time", icon: Clock, filter: { type: "Part-time" } },
  { label: "High Salary", icon: DollarSign, filter: { minSalary: 100000 } },
]

export default function JobSearchInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    datePosted: "all",
    salaryRange: [0, 200000],
    payPeriod: "monthly",
    experience: "all",
    jobType: "all",
    remote: "all",
    location: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesExperience = filters.experience === "all" || job.experience === filters.experience
    const matchesType = filters.jobType === "all" || job.type === filters.jobType
    const matchesRemote =
      filters.remote === "all" ||
      (filters.remote === "remote" && job.remote) ||
      (filters.remote === "onsite" && !job.remote)

    return matchesSearch && matchesExperience && matchesType && matchesRemote
  })

  const handlePopularQuery = (queryFilter: any) => {
    setFilters((prev) => ({ ...prev, ...queryFilter }))
  }

  return (
    <div className="min-h-screen bg-muted">
         <div className="flex items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-md font-semibold text-gray-700 uppercase tracking-wide">
              Latest Job Posts
            </span>
          </div>
        </div>
      <div className="container mx-auto px-4 py-2">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
    
    {/* Filters Sidebar (Left) */}
    <div className="lg:col-span-3">
      <Card className="sticky top-8">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          {/* Date Posted */}
          <div>
            <label className="text-sm font-medium mb-2 block">Date Posted</label>
            <Select
              value={filters.datePosted}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, datePosted: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="3days">Last 3 Days</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Salary Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Salary Range: ${filters.salaryRange[0].toLocaleString()} - $
              {filters.salaryRange[1].toLocaleString()}
            </label>
            <Slider
              value={filters.salaryRange}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, salaryRange: value }))}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
          </div>

          {/* Work Experience */}
          <div>
            <label className="text-sm font-medium mb-2 block">Work Experience</label>
            <Select
              value={filters.experience}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, experience: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="No Experience">No Experience</SelectItem>
                <SelectItem value="1+ year">1+ Year</SelectItem>
                <SelectItem value="3+ years">3+ Years</SelectItem>
                <SelectItem value="5+ years">5+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Job Type</label>
            <Select
              value={filters.jobType}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, jobType: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Remote Options */}
          <div>
            <label className="text-sm font-medium mb-2 block">Work Location</label>
            <Select
              value={filters.remote}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, remote: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Main Content */}
    <div className="lg:col-span-6 space-y-2">
      
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for jobs, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Popular Queries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Searches</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {popularQueries.map((query, index) => {
            const Icon = query.icon
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => handlePopularQuery(query.filter)}
                className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
                <span>{query.label}</span>
              </Button>
            )
          })}
        </CardContent>
      </Card>

      {/* Job Listings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""} Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-serif text-primary mb-2">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{job.company}</span>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.postedTime}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{job.type}</Badge>
                      {job.remote && <Badge variant="outline">Remote</Badge>}
                      <Badge variant="outline">{job.experience}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">{job.salary}</div>
                  </div>
                </div>
              </CardHeader>

              {selectedJob === job.id && (
                <CardContent className="pt-0">
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Job Description</h4>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Button className="bg-primary hover:bg-primary/90">Apply Now</Button>
                      <Button variant="outline">Save Job</Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}

          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>

    {/* Filters Sidebar (Right, optional) */}
    <div className="lg:col-span-3 hidden lg:block">
  <div className="sticky top-8 space-y-6">
    
    {/* Popular Jobs India */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Popular Jobs India</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="cursor-pointer hover:text-primary">Near me</p>
        <p className="cursor-pointer hover:text-primary">Work Experience Engineer</p>
        <p className="cursor-pointer hover:text-primary">Research And Development</p>
        <p className="cursor-pointer hover:text-primary">Manager</p>
        <p className="cursor-pointer hover:text-primary">Frontend Developer</p>
        <p className="cursor-pointer text-sm text-primary/70 hover:text-primary">more queries</p>
      </CardContent>
    </Card>

    {/* Jobs Nearby */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Jobs Nearby</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="cursor-pointer hover:text-primary">Jobs in Maharashtra</p>
        <p className="cursor-pointer hover:text-primary">Jobs in Karnataka</p>
        <p className="cursor-pointer hover:text-primary">Jobs in Tamil Nadu</p>
        <p className="cursor-pointer hover:text-primary">Jobs in Uttar Pradesh</p>
        <p className="cursor-pointer hover:text-primary">Jobs in Gujarat</p>
        <p className="cursor-pointer hover:text-primary">Jobs in Andhra Pradesh</p>
        <p className="cursor-pointer hover:text-primary">Jobs in Bangalore Urban</p>
        <p className="cursor-pointer hover:text-primary">Jobs in Bangalore</p>
      </CardContent>
    </Card>

  </div>
</div>

  </div>
</div>

    </div>
  )
}
