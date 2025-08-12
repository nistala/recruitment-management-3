"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users } from "lucide-react"
export default function HomePage() {
  const [loading, setLoading] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === jobNotifications.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500) // Simulate loading
    return () => clearTimeout(timer)
  }, [])

  const jobNotifications = [
  {
    id: 1,
    title: "SBI Clerk Recruitment 2024 - 8000+ Vacancies",
    organization: "State Bank of India",
    location: "Pan India",
    deadline: "15 Dec 2024",
    type: "Banking",
    isNew: true,
    applicants: "2.5L+",
  },
  {
    id: 2,
    title: "IBPS PO Notification 2024 - 4000 Posts",
    organization: "IBPS",
    location: "All India",
    deadline: "20 Dec 2024",
    type: "Banking",
    isHot: true,
    applicants: "1.8L+",
  },
  {
    id: 3,
    title: "SSC CGL 2024 - Combined Graduate Level",
    organization: "Staff Selection Commission",
    location: "Various States",
    deadline: "25 Dec 2024",
    type: "Government",
    isNew: true,
    applicants: "5.2L+",
  },
  {
    id: 4,
    title: "Railway Group D Recruitment - 50000 Posts",
    organization: "Indian Railways",
    location: "Pan India",
    deadline: "30 Dec 2024",
    type: "Railway",
    isHot: true,
    applicants: "8.5L+",
  },
  {
    id: 5,
    title: "UPSC Civil Services 2024 - IAS/IPS/IFS",
    organization: "UPSC",
    location: "All India",
    deadline: "10 Jan 2025",
    type: "Civil Services",
    isNew: true,
    applicants: "12L+",
  },
]

const jobData= [
  {
    "id": 1,
    "jobType": "Government",
    "jobList": [
      {
        "jobTitle": "Junior Engineer (Civil)",
        "organization": "Public Works Department",
        "location": "Delhi, India",
        "salary": "₹35,000 - ₹45,000",
        "isNew": true,
        "isHot": false,
        "type": "Full-Time"
      },
      {
        "jobTitle": "Assistant Section Officer",
        "organization": "Ministry of Finance",
        "location": "Mumbai, India",
        "salary": "₹40,000 - ₹50,000",
        "isNew": false,
        "isHot": true,
        "type": "Full-Time"
      },
      {
        "jobTitle": "Railway Station Master",
        "organization": "Indian Railways",
        "location": "Pan India",
        "salary": "₹35,000 - ₹45,000",
        "isNew": true,
        "isHot": true,
        "type": "Full-Time"
      },
      {
        "jobTitle": "Primary School Teacher",
        "organization": "Delhi Govt Education Dept",
        "location": "Delhi, India",
        "salary": "₹25,000 - ₹35,000",
        "isNew": false,
        "isHot": false,
        "type": "Contract"
      }
    ]
  },
  {
    "id": 2,
    "jobType": "Private",
    "jobList": [
      {
        "jobTitle": "Software Engineer",
        "company": "Tech Solutions",
        "location": "New York, NY",
        "salary": "$80,000 - $100,000",
        "isNew": true,
        "isHot": false,
        "type": "Full-Time"
      },
      {
        "jobTitle": "Data Analyst",
        "company": "Data Insights",
        "location": "San Francisco, CA",
        "salary": "$70,000 - $90,000",
        "isNew": false,
        "isHot": true,
        "type": "Contract"
      },
      {
        "jobTitle": "UI/UX Designer",
        "company": "Creative Minds Studio",
        "location": "Austin, TX",
        "salary": "$65,000 - $85,000",
        "isNew": true,
        "isHot": true,
        "type": "Full-Time"
      },
      {
        "jobTitle": "Digital Marketing Specialist",
        "company": "BrandBoost",
        "location": "Chicago, IL",
        "salary": "$50,000 - $70,000",
        "isNew": false,
        "isHot": false,
        "type": "Part-Time"
      }
    ]
  },
  {
    "id": 3,
    "jobType": "JobFair",
    "jobList": [
      {
        "id": 1,
        "name": "National Government Job Fair 2024",
        "date": "2024-03-15",
        "time": "10:00 AM - 6:00 PM",
        "type": "Physical",
        "location": "Pragati Maidan, New Delhi",
        "participants": 150,
        "expectedVisitors": "10,000+",
        "registrationFee": "Free",
        "status": "Registration Open",
        "description": "Largest government job fair featuring central and state government organizations."
      },
      {
        "id": 2,
        "name": "Banking & Finance Career Fair",
        "date": "2024-03-22",
        "time": "11:00 AM - 5:00 PM",
        "type": "Virtual",
        "location": "Online Platform",
        "participants": 85,
        "expectedVisitors": "5,000+",
        "registrationFee": "Free",
        "status": "Registration Open",
        "description": "Connect with leading banks and financial institutions for various positions."
      },
      {
        "id": 3,
        "name": "Engineering Jobs Expo",
        "date": "2024-04-05",
        "time": "9:00 AM - 7:00 PM",
        "type": "Hybrid",
        "location": "HITEX, Hyderabad + Virtual",
        "participants": 200,
        "expectedVisitors": "15,000+",
        "registrationFee": "₹100",
        "status": "Registration Open",
        "description": "Premier engineering job fair for civil, mechanical, electrical, and IT engineers."
      },
      {
        "id": 4,
        "name": "Healthcare Professionals Meet",
        "date": "2024-04-12",
        "time": "10:00 AM - 4:00 PM",
        "type": "Physical",
        "location": "AIIMS Convention Center, Delhi",
        "participants": 60,
        "expectedVisitors": "3,000+",
        "registrationFee": "Free",
        "status": "Registration Open",
        "description": "Exclusive job fair for doctors, nurses, and healthcare professionals."
      },
      {
        "id": 5,
        "name": "Tech Startups Career Carnival",
        "date": "2024-04-20",
        "time": "12:00 PM - 8:00 PM",
        "type": "Hybrid",
        "location": "Bangalore International Exhibition Centre + Virtual",
        "participants": 120,
        "expectedVisitors": "8,000+",
        "registrationFee": "₹50",
        "status": "Registration Open",
        "description": "Meet innovative startups and tech companies hiring across multiple domains."
      }
    ]
  }
]


  return (
    <div className="p-2 space-y-4">
      {/* <div>
        <h1 className="text-2xl font-bold">Recruitment & Exam Management System</h1>
        <p className="text-muted-foreground">
          Comprehensive platform for managing recruitment processes and examinations
        </p>
      </div> */}
       
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Latest Job Notifications
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden h-32">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {jobNotifications.map((job, index) => (
              <div key={job.id} className="w-full flex-shrink-0">
                <Card className="p-4 mx-2 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg leading-tight">{job.title}</h3>
                        {job.isNew && <Badge className="bg-green-500 text-white text-xs animate-bounce">NEW</Badge>}
                        {job.isHot && <Badge className="bg-red-500 text-white text-xs animate-pulse">HOT</Badge>}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className="font-medium text-blue-600">{job.organization}</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{job.applicants} Applied</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-red-600">
                          <Clock className="w-3 h-3" />
                          <span>Deadline: {job.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-3">
          {jobNotifications.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <div className="flex w-full mt-8 gap-4">
          {/* Job Type - 20% */}
          {/* <div className="w-1/5 bg-white/80 rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-3">Job Types</h2>
            <ul className="space-y-2">
              {[...new Set(jobNotifications.map(j => j.type))].map(type => (
                <li key={type}>
                  <Badge variant="outline" className="text-xs">{type}</Badge>
                </li>
              ))}
            </ul>
          </div> */}

          <div className="w-1/5 bg-white/80 rounded-lg shadow p-4">
      <h2 className="font-bold text-lg mb-3">Job Types</h2>
      <Accordion type="single" collapsible className="w-full">
        {jobData.map((category) => (
          <AccordionItem key={category.id} value={category.jobType}>
            <AccordionTrigger className="font-medium">
              {category.jobType}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {category.jobList.map((job: any, index: number) => (
                  <li
                    key={index}
                    className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-md cursor-pointer"
                  >
                    <span className="text-sm">{job.jobTitle || job.name}</span>
                    {job.isNew && (
                      <Badge className="text-xs" variant="secondary">
                        New
                      </Badge>
                    )}
                    {job.isHot && (
                      <Badge className="text-xs bg-red-500 text-white">
                        Hot
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>

          {/* Job List Details - 50% */}
          <div className="w-1/2 bg-white/80 rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-3">Job List Details</h2>
            <ul className="space-y-4">
              {jobNotifications.map(job => (
                <li key={job.id}>
                  <Card className="p-3 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{job.title}</h3>
                        <div className="text-sm text-gray-600">{job.organization} - {job.location}</div>
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs">{job.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>Deadline: {job.deadline}</span>
                      <Users className="w-3 h-3 ml-2" />
                      <span>{job.applicants} Applied</span>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Notification - 30% */}
          <div className="w-3/10 bg-white/80 rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-3">Job Notification</h2>
            <Card className="p-4 border-l-4 border-red-500">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-gray-800 text-lg">{jobNotifications[currentIndex].title}</h3>
                <div className="text-sm text-gray-600">{jobNotifications[currentIndex].organization} - {jobNotifications[currentIndex].location}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Deadline: {jobNotifications[currentIndex].deadline}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Users className="w-3 h-3" />
                  <span>{jobNotifications[currentIndex].applicants} Applied</span>
                </div>
                <Badge variant="outline" className="text-xs">{jobNotifications[currentIndex].type}</Badge>
                {jobNotifications[currentIndex].isNew && <Badge className="bg-green-500 text-white text-xs animate-bounce">NEW</Badge>}
                {jobNotifications[currentIndex].isHot && <Badge className="bg-red-500 text-white text-xs animate-pulse">HOT</Badge>}
              </div>
            </Card>
          </div>
        </div>
      
    </div>
    </div>
  )
}
