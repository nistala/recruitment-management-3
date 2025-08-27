"use client";
import { Calendar, MapPin, Users, Building, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { JobFairRegistrationForm } from "@/components/forms/job-fair-registration-form";
import { useState } from "react";

export default function JobFairs() {
  const [selectedFair, setSelectedFair] = useState<any>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

//   const handleRegisterNow = (fair: any) => {
//     setSelectedFair(fair);
//     setShowRegistrationForm(true);
//   };

  const handleCloseForm = () => {
    setShowRegistrationForm(false);
    setSelectedFair(null);
  };

  const upcomingFairs = [
    {
      id: 1,
      name: "National Government Job Fair 2024",
      date: "2024-03-15",
      time: "10:00 AM - 6:00 PM",
      type: "Physical",
      location: "Pragati Maidan, New Delhi",
      participants: 150,
      expectedVisitors: "10,000+",
      registrationFee: "Free",
      status: "Registration Open",
      description:
        "Largest government job fair featuring central and state government organizations.",
    },
    {
      id: 2,
      name: "Banking & Finance Career Fair",
      date: "2024-03-22",
      time: "11:00 AM - 5:00 PM",
      type: "Virtual",
      location: "Online Platform",
      participants: 85,
      expectedVisitors: "5,000+",
      registrationFee: "Free",
      status: "Registration Open",
      description:
        "Connect with leading banks and financial institutions for various positions.",
    },
    {
      id: 3,
      name: "Engineering Jobs Expo",
      date: "2024-04-05",
      time: "9:00 AM - 7:00 PM",
      type: "Hybrid",
      location: "HITEX, Hyderabad + Virtual",
      participants: 200,
      expectedVisitors: "15,000+",
      registrationFee: "₹100",
      status: "Registration Open",
      description:
        "Premier engineering job fair for civil, mechanical, electrical, and IT engineers.",
    },
    {
      id: 4,
      name: "Healthcare Professionals Meet",
      date: "2024-04-12",
      time: "10:00 AM - 4:00 PM",
      type: "Physical",
      location: "AIIMS Convention Center, Delhi",
      participants: 60,
      expectedVisitors: "3,000+",
      registrationFee: "Free",
      status: "Registration Open",
      description:
        "Exclusive job fair for doctors, nurses, and healthcare professionals.",
    },
  ];

  const pastFairs = [
    {
      id: 1,
      name: "Railway Recruitment Fair 2024",
      date: "2024-01-20",
      participants: 120,
      visitors: "8,500",
      jobsOffered: 2500,
      hires: 1200,
      successRate: "48%",
    },
    {
      id: 2,
      name: "Defense Services Career Fair",
      date: "2024-01-15",
      participants: 45,
      visitors: "4,200",
      jobsOffered: 800,
      hires: 350,
      successRate: "42%",
    },
    {
      id: 3,
      name: "Teaching Jobs Expo",
      date: "2024-01-10",
      participants: 90,
      visitors: "6,800",
      jobsOffered: 1500,
      hires: 750,
      successRate: "50%",
    },
  ];

  const participatingOrganizations = [
    {
      name: "Ministry of Railways",
      logo: "/placeholder.svg?height=60&width=60",
      jobs: 500,
    },
    {
      name: "State Bank of India",
      logo: "/placeholder.svg?height=60&width=60",
      jobs: 200,
    },
    { name: "ONGC", logo: "/placeholder.svg?height=60&width=60", jobs: 150 },
    { name: "ISRO", logo: "/placeholder.svg?height=60&width=60", jobs: 100 },
    { name: "DRDO", logo: "/placeholder.svg?height=60&width=60", jobs: 80 },
    { name: "BHEL", logo: "/placeholder.svg?height=60&width=60", jobs: 120 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Job Fairs & Career Events
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect directly with employers and explore career opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <Tabs defaultValue="upcoming" className="w-full ">
            <TabsList className="grid w-full grid-cols-3 ">
              <TabsTrigger
                value="upcoming"
                className="rounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground"
              >
                Upcoming Fairs
              </TabsTrigger>
              <TabsTrigger value="past" className="rounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Past Events</TabsTrigger>
              <TabsTrigger value="organizations" className="rounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">
                Participating Organizations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Upcoming Job Fairs
                </h2>
                <p className="text-muted-foreground">
                  Register now to secure your spot at these career events
                </p>
              </div>

              <div className="grid gap-6">
                {upcomingFairs.map((fair) => (
                  <Card key={fair.id} className="dashboard-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {fair.name}
                          </CardTitle>
                          <CardDescription className="text-base mb-3">
                            {fair.description}
                          </CardDescription>
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge
                              variant={
                                fair.type === "Virtual"
                                  ? "secondary"
                                  : fair.type === "Physical"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {fair.type === "Virtual" && (
                                <Video className="mr-1 h-3 w-3" />
                              )}
                              {fair.type}
                            </Badge>
                            <Badge className="status-badge status-active">
                              {fair.status}
                            </Badge>
                            <Badge variant="outline">
                              {fair.registrationFee}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {fair.participants}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Employers
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3 mb-6">
                        <div>
                          <div className="text-sm font-medium text-foreground mb-1">
                            Date & Time
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {fair.date}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {fair.time}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground mb-1">
                            Location
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {fair.location}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground mb-1">
                            Expected Visitors
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {fair.expectedVisitors}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Registration Fee:{" "}
                          <span className="font-medium text-foreground">
                            {fair.registrationFee}
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm" className= "bg-ring text-foreground hover:bg-muted-foreground/80">
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="bg-primary"
                            //onClick={() => handleRegisterNow(fair)}
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Past Job Fairs
                </h2>
                <p className="text-muted-foreground">
                  Success stories and statistics from recent events
                </p>
              </div>

              <div className="grid gap-6">
                {pastFairs.map((fair) => (
                  <Card key={fair.id} className="dashboard-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{fair.name}</CardTitle>
                          <CardDescription>
                            Event Date: {fair.date}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-5">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {fair.participants}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Employers
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {fair.visitors}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Visitors
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {fair.jobsOffered}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Jobs Offered
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {fair.hires}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Hires Made
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {fair.successRate}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Success Rate
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="organizations" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Participating Organizations
                </h2>
                <p className="text-muted-foreground">
                  Top employers actively recruiting through our job fairs
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {participatingOrganizations.map((org, index) => (
                  <Card key={index} className="dashboard-card text-center">
                    <CardHeader>
                      <div className="mx-auto mb-4">
                        <img
                          src={org.logo || "/placeholder.svg"}
                          alt={org.name}
                          className="h-16 w-16 rounded-lg object-cover mx-auto"
                        />
                      </div>
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            {org.jobs}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Open Positions
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          <Building className="mr-2 h-4 w-4" />
                          View Jobs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Want to participate as an employer?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join our job fairs to connect with talented candidates and
                  grow your team
                </p>
                <Button size="lg" className="btn-primary">
                  Register as Employer
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Job Fair Registration Form Modal */}
      {/* {selectedFair && (
        <JobFairRegistrationForm
          isOpen={showRegistrationForm}
          onClose={handleCloseForm}
          fairDetails={selectedFair}
        />
      )} */}
    </div>
  );
}