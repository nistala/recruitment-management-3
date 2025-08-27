"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Building, Phone, Mail, MapPin, Globe, Award, Users, Calendar, Edit, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const collegeSchema = z.object({
  collegeName: z.string().min(2, "College name is required"),
  establishedYear: z.string().min(4, "Establishment year is required"),
  address: z.string().min(10, "Complete address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Valid pincode is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  website: z.string().url("Valid website URL is required"),
  accreditation: z.string().min(2, "Accreditation details are required"),
  description: z.string().min(50, "Description should be at least 50 characters"),
})

const officerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  department: z.string().min(2, "Department is required"),
  experience: z.string().min(1, "Experience is required"),
})

type CollegeFormData = z.infer<typeof collegeSchema>
type OfficerFormData = z.infer<typeof officerSchema>

const collegeData = {
  collegeName: "Tech Engineering College",
  establishedYear: "1985",
  address: "123, Education Street, Knowledge Park",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500001",
  phone: "+91 40 2345 6789",
  email: "info@techcollege.edu",
  website: "https://www.techcollege.edu",
  accreditation: "NAAC A+ Grade, NBA Accredited",
  description:
    "Tech Engineering College is a premier institution offering undergraduate and postgraduate programs in engineering and technology. With a strong focus on industry collaboration and research, we prepare students for successful careers in the rapidly evolving technology landscape.",
  logo: "TC",
}

const officerData = {
  name: "Dr. Priya Sharma",
  designation: "Chief Placement Officer",
  email: "priya.sharma@techcollege.edu",
  phone: "+91 9876543210",
  department: "Training & Placement Cell",
  experience: "8 years",
  avatar: "PS",
}

export default function CollegeProfilePage() {
  const [isEditingCollege, setIsEditingCollege] = useState(false)
  const [isEditingOfficer, setIsEditingOfficer] = useState(false)
  const { toast } = useToast()

  const collegeForm = useForm<CollegeFormData>({
    resolver: zodResolver(collegeSchema),
    defaultValues: collegeData,
  })

  const officerForm = useForm<OfficerFormData>({
    resolver: zodResolver(officerSchema),
    defaultValues: officerData,
  })

  const onCollegeSubmit = (data: CollegeFormData) => {
    console.log("College Profile Updated:", data)
    toast({
      title: "College Profile Updated!",
      description: "College information has been updated successfully.",
    })
    setIsEditingCollege(false)
  }

  const onOfficerSubmit = (data: OfficerFormData) => {
    console.log("Officer Profile Updated:", data)
    toast({
      title: "Officer Profile Updated!",
      description: "Placement officer information has been updated successfully.",
    })
    setIsEditingOfficer(false)
  }

  const stats = [
    { label: "Total Students", value: "2,847", icon: Users, color: "text-blue-600" },
    { label: "Years of Excellence", value: "39", icon: Award, color: "text-green-600" },
    { label: "Placement Rate", value: "85%", icon: Building, color: "text-purple-600" },
    { label: "Industry Partners", value: "150+", icon: Globe, color: "text-orange-600" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">College Profile</h1>
          <p className="text-muted-foreground">Manage college information and placement officer details</p>
        </div>
      </div>

      <Tabs defaultValue="college" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="college" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">College Information</TabsTrigger>
          <TabsTrigger value="officer" className=" flex items-centerrounded-md px-3 py-2 transition
               data-[state=active]:bg-primary 
               data-[state=active]:text-primary-foreground
               data-[state=inactive]:text-balck-foreground
               hover:bg-muted/30 hover:text-foreground">Placement Officer</TabsTrigger>
        </TabsList>

        <TabsContent value="college" className="space-y-6">
          {/* College Overview */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={`/placeholder-80x80.png?height=80&width=80&text=${collegeData.logo}`} />
                  <AvatarFallback className="text-2xl">{collegeData.logo}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-blue-900">{collegeData.collegeName}</CardTitle>
                  <CardDescription className="text-blue-700">
                    Established {collegeData.establishedYear} • {collegeData.accreditation}
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-2 text-sm text-blue-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {collegeData.city}, {collegeData.state}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <a href={collegeData.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto bg-transparent"
                  onClick={() => setIsEditingCollege(!isEditingCollege)}
                >
                  {isEditingCollege ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* College Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>College Details</CardTitle>
              <CardDescription>Update college information and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...collegeForm}>
                <form onSubmit={collegeForm.handleSubmit(onCollegeSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={collegeForm.control}
                      name="collegeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>College Name *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="establishedYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Established Year *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={collegeForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Textarea {...field} disabled={!isEditingCollege} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={collegeForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={collegeForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={collegeForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={collegeForm.control}
                      name="accreditation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accreditation *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingCollege} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={collegeForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Description *</FormLabel>
                        <FormControl>
                          <Textarea {...field} disabled={!isEditingCollege} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isEditingCollege && (
                    <div className="flex gap-4">
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditingCollege(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="officer" className="space-y-6">
          {/* Officer Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`/placeholder-icon.png?height=64&width=64&text=${officerData.avatar}`} />
                    <AvatarFallback>{officerData.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{officerData.name}</CardTitle>
                    <CardDescription>{officerData.designation}</CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {officerData.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {officerData.experience} experience
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsEditingOfficer(!isEditingOfficer)}>
                  {isEditingOfficer ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Officer Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Officer Information</CardTitle>
              <CardDescription>Update placement officer contact details and information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...officerForm}>
                <form onSubmit={officerForm.handleSubmit(onOfficerSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={officerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingOfficer} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={officerForm.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingOfficer} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={officerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" disabled={!isEditingOfficer} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={officerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingOfficer} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={officerForm.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingOfficer} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={officerForm.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience *</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={!isEditingOfficer} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {isEditingOfficer && (
                    <div className="flex gap-4">
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditingOfficer(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Quick Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Contact</CardTitle>
              <CardDescription>Direct contact information for placement queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{officerData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{officerData.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
