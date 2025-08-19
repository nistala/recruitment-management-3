"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { User } from 'lucide-react'

const candidateSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  middle_name: z.string().optional(),
  phone_no: z.string().regex(/^\+91[6-9]\d{9}$/, "Invalid phone number format (+919876543210)"),
  email: z.string().email("Invalid email format"),
  gender: z.string().min(1, "Please select gender"),
  state: z.string().min(1, "Please select state"),
  district: z.string().min(1, "Please select district"),
  mandal: z.string().min(1, "Please select mandal"),
  city: z.string().min(1, "Please select city"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
  aadhar_card_number: z.string().regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
  pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  employment_no: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  mother_name: z.string().min(2, "Mother's name is required"),
  guardian_name: z.string().min(2, "Guardian's name is required"),
  father_name: z.string().min(2, "Father's name is required"),
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  marital_status: z.string().min(1, "Please select marital status"),
  religion: z.string().min(1, "Please select religion"),
  caste: z.string().min(1, "Please select caste"),
  sub_caste: z.string().min(1, "Please select sub caste"),
  education_type: z.string().min(1, "Please select education type"),
  university_or_board: z.string().min(2, "University/Board name is required"),
  school_or_college: z.string().min(2, "School/College name is required"),
  course_name: z.string().min(2, "Course name is required"),
  specialization: z.string().min(2, "Specialization is required"),
  start_year: z.coerce.number().min(1980, "Invalid start year"),
  end_year: z.coerce.number().min(1980, "Invalid end year"),
  cgpa: z.coerce.number().min(0).max(10, "CGPA must be between 0 and 10"),
  percentage: z.coerce.number().min(0).max(100, "Percentage must be between 0 and 100"),
  education_location: z.string().min(2, "Education location is required"),
  certificate: z.instanceof(File).optional(),
  resume: z.instanceof(File).optional(),
  aadhaar: z.instanceof(File).optional(),
})

type CandidateFormData = z.infer<typeof candidateSchema>

export default function CandidateRegistration() {
  const { toast } = useToast()

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      phone_no: "",
      email: "",
      gender: "",
      state: "",
      district: "",
      mandal: "",
      city: "",
      pincode: "",
      aadhar_card_number: "",
      pan_number: "",
      employment_no: "",
      mother_name: "",
      guardian_name: "",
      father_name: "",
      experience: 0,
      marital_status: "",
      religion: "",
      caste: "",
      sub_caste: "",
      education_type: "",
      university_or_board: "",
      school_or_college: "",
      course_name: "",
      specialization: "",
      start_year: 0,
      end_year: 0,
      cgpa: 0,
      percentage: 0,
      education_location: "",
      certificate: undefined,
      resume: undefined,
      aadhaar: undefined,
    },
  })

  const onSubmit = (data: CandidateFormData) => {
    console.log("Candidate Registration Data:", data)
    toast({
      title: "Registration Successful!",
      description: "Candidate has been registered successfully.",
    })
  }

  return (
    <div className="p-2">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Candidate Registration</h1>
        </div>
        <p className="text-muted-foreground">
          Please fill in all the required information to register as a candidate.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Personal Information Section */}
          <Card>
            <CardHeader>
              <CardTitle id="personal-info " className="text-primary">Personal Information</CardTitle>
              <CardDescription>Basic personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Ravi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Prasad" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Kumar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender <span className="text-red-600">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                          <SelectItem value="O">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="+919876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ravi.kumar@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience (Years) <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marital_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status <span className="text-red-600">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Identity & Family Information Section */}
          <Card>
            <CardHeader>
              <CardTitle id="identity-info" className="text-primary">Identity & Family Information</CardTitle>
              <CardDescription>Identity documents and family details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-4">Identity Documents</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="aadhar_card_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aadhar Card Number <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="123456789012" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pan_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="ABCDE1234F" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="employment_no"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment No.</FormLabel>
                          <FormControl>
                            <Input placeholder="XYZ0106201201" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-lg font-medium mb-4">Family Details</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="father_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Name <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Ramesh Kumar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mother_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother's Name <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Savitri Devi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="guardian_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guardian's Name <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Ramesh Kumar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-lg font-medium mb-4">Category Information</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="religion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Religion <span className="text-red-600">*</span></FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select religion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Hindu">Hindu</SelectItem>
                              <SelectItem value="Muslim">Muslim</SelectItem>
                              <SelectItem value="Christian">Christian</SelectItem>
                              <SelectItem value="Sikh">Sikh</SelectItem>
                              <SelectItem value="Buddhist">Buddhist</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="caste"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caste <span className="text-red-600">*</span></FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select caste" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="General">General</SelectItem>
                              <SelectItem value="OBC">OBC</SelectItem>
                              <SelectItem value="SC">SC</SelectItem>
                              <SelectItem value="ST">ST</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sub_caste"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub Caste <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Y" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information Section */}
          <Card>
            <CardHeader>
              <CardTitle id="address-info" className="text-primary">Address Information</CardTitle>
              <CardDescription>Current residential address details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State <span className="text-red-600">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Telangana">Telangana</SelectItem>
                          <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Hyderabad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mandal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mandal <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Serilingampally" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Hyderabad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="500032" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Education Information Section */}
          <Card>
            <CardHeader>
              <CardTitle id="education-info" className="text-primary">Education Information</CardTitle>
              <CardDescription>Educational qualifications and academic details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="education_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Type <span className="text-red-600">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select education type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10th">10th</SelectItem>
                          <SelectItem value="12th">12th</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                          <SelectItem value="Graduation">Graduation</SelectItem>
                          <SelectItem value="Post Graduation">Post Graduation</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="B.Tech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="university_or_board"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University/Board <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Osmania University" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="school_or_college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School/College <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="CBIT Hyderabad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="education_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Location <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Hyderabad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Year <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2015" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Year <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2019" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cgpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CGPA <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="8.75" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Percentage <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="87.50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
  <CardHeader>
    <CardTitle id="documents-info" className="text-primary">Documents Upload</CardTitle>
    <CardDescription>Upload required documents below</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4 md:grid-cols-3">
      {/* Certificate Upload */}
      <FormField
        control={form.control}
        name="certificate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Certificate *</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                  className="file:cursor-pointer file:rounded file:border-0 file:bg-primary file:px-2  file:text-white hover:file:bg-primary"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Resume Upload */}
      <FormField
        control={form.control}
        name="resume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resume *</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                  className="file:cursor-pointer file:rounded file:border-0 file:bg-primary file:px-2  file:text-white hover:file:bg-primary"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Aadhaar Upload */}
      <FormField
        control={form.control}
        name="aadhaar"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Aadhaar *</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="file:cursor-pointer file:rounded file:border-0 file:bg-primary file:px-2  file:text-white hover:file:bg-primary"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </CardContent>
</Card>


          {/* Submit Button */}
          <div className="flex justify-end pb-2">
            <Button type="submit" size="lg" className="min-w-[200px]">
              Register Candidate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
