"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Building2 } from 'lucide-react'

const employerSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  company_website: z.string().url("Please enter a valid website URL"),
  department_name: z.string().min(2, "Department name is required"),
  department_code: z.string().min(2, "Department code is required"),
  department_type: z.string().min(1, "Please select department type"),
  company_type: z.string().min(1, "Please select company type"),
  industry_type: z.string().min(1, "Please select industry type"),
  registration_number: z.string().min(5, "Registration number is required"),
  number_of_branches: z.coerce.number().min(1, "Number of branches must be at least 1"),
  pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  gst_number: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, "Invalid GST format"),
  iso_certified: z.boolean(),
  no_of_employees: z.coerce.number().min(1, "Number of employees is required"),
  date_of_registered: z.string().min(1, "Registration date is required"),
  annual_revenue: z.string().min(1, "Annual revenue is required"),
  official_email: z.string().email("Invalid email format"),
  official_mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  landline_number: z.string().optional(),
  contact_person_name: z.string().min(2, "Contact person name is required"),
  contact_person_designation: z.string().min(2, "Designation is required"),
  contact_person_email: z.string().email("Invalid email format"),
  contact_person_mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  year_founded: z.coerce.number().min(1800, "Invalid year").max(new Date().getFullYear(), "Year cannot be in future"),
  head_office_address: z.string().min(10, "Address must be at least 10 characters"),
  about_company: z.string().min(50, "Company description must be at least 50 characters"),
  state: z.string().min(1, "Please select state"),
  district: z.string().min(1, "Please select district"),
  mandal: z.string().min(1, "Please select mandal"),
  city: z.string().min(1, "Please select city"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
})

type EmployerFormData = z.infer<typeof employerSchema>

export default function EmployerRegistration() {
  const { toast } = useToast()

  const form = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      iso_certified: false,
      company_name: "",
      company_website: "",
      department_name: "",
      department_code: "",
      department_type: "",
      company_type: "",
      industry_type: "",
      registration_number: "",
      number_of_branches: 0,
      pan_number: "",
      gst_number: "",
      no_of_employees: 0,
      date_of_registered: "",
      annual_revenue: "",
      official_email: "",
      official_mobile: "",
      landline_number: "",
      contact_person_name: "",
      contact_person_designation: "",
      contact_person_email: "",
      contact_person_mobile: "",
      year_founded: 0,
      head_office_address: "",
      about_company: "",
      state: "",
      district: "",
      mandal: "",
      city: "",
      pincode: "",
    },
  })

  const onSubmit = (data: EmployerFormData) => {
    console.log("Employer Registration Data:", data)
    toast({
      title: "Registration Successful!",
      description: "Employer has been registered successfully.",
    })
  }

  return (
    <div className="p-2">
      <div className="mb-4">
        <div className="flex items-center gap-2 ">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Employer Registration</h1>
        </div>
        <p className="text-muted-foreground">
          Please fill in all the required information to register your organization.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information Section */}
          <Card>
            <CardHeader>
              <CardTitle id="company-info">Company Information</CardTitle>
              <CardDescription>Basic information about your company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Example Pvt Ltd" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Private Limited">Private Limited</SelectItem>
                          <SelectItem value="Public Limited">Public Limited</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year_founded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Founded *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2005" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="no_of_employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Employees *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="250" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number_of_branches"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Branches *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annual_revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Revenue *</FormLabel>
                      <FormControl>
                        <Input placeholder="50Cr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="about_company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Company *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="We are a leading IT solutions provider offering cutting-edge software solutions..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Department Details Section */}
          <Card>
            <CardHeader>
              <CardTitle id="department-info">Department Details</CardTitle>
              <CardDescription>Information about the specific department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="department_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Finance Department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="FIN01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Type *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="State Govt">State Government</SelectItem>
                          <SelectItem value="Central Govt">Central Government</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Semi-Govt">Semi-Government</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Registration & Legal Section */}
          <Card>
            <CardHeader>
              <CardTitle id="legal-info">Registration & Legal Information</CardTitle>
              <CardDescription>Legal registration details and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="registration_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="REG1234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date_of_registered"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Registration *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                      <FormLabel>PAN Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="ABCDE1234F" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gst_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="22ABCDE1234F1Z5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="iso_certified"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>ISO Certified</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information Section */}
          <Card>
            <CardHeader>
              <CardTitle id="contact-info">Contact Information</CardTitle>
              <CardDescription>Official contact details and contact person information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Official Contact Details</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="official_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Official Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="info@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="official_mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Official Mobile *</FormLabel>
                          <FormControl>
                            <Input placeholder="9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="landline_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Landline Number</FormLabel>
                          <FormControl>
                            <Input placeholder="040-12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-4">Contact Person Details</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="contact_person_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Sai Kartik Nistala" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact_person_designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person Designation *</FormLabel>
                          <FormControl>
                            <Input placeholder="HR Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact_person_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="snistala@miraclesoft.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact_person_mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person Mobile *</FormLabel>
                          <FormControl>
                            <Input placeholder="9876543211" {...field} />
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
              <CardTitle id="address-info">Address Information</CardTitle>
              <CardDescription>Head office address and location details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="head_office_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Head Office Address *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123, Main Street, Hyderabad, Telangana" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State *</FormLabel>
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
                        <FormLabel>District *</FormLabel>
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
                        <FormLabel>Mandal *</FormLabel>
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
                        <FormLabel>City *</FormLabel>
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
                        <FormLabel>Pincode *</FormLabel>
                        <FormControl>
                          <Input placeholder="500032" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button type="submit" size="lg" className="min-w-[200px]">
              Register Employer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
