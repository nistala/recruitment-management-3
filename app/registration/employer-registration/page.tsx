"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Building2 } from "lucide-react";

const employerSchema = z.object({
  company_cin: z.string().superRefine((cin, ctx) => {
    const currentYear = new Date().getFullYear();
    if (cin.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CIN should be Empty",
      });
    } else if (cin.length > 21)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "CIN should not exceed 21 characters",
      });

    // Section 1
    const section1 = cin.charAt(0);
    if (!["L", "U"].includes(section1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Must start with 'L' (Listed) or 'U' (Unlisted) OR should be lowercase",
      });
    }
    // Section 2: Industry Code
    const section2 = cin.slice(1, 6); // characters 2–6 (index 1–5)

    if (!/^[A-Z]{5}$/.test(section2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Section 2: No letters or symbols",
      });
    } else if (!/^\d{5}$/.test(section2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Section 2: Must be exactly 5 digits",
      });
    }

    // Section 3
    const section3 = cin.slice(6, 8);
    const validStates = [
      "AP",
      "AR",
      "AS",
      "BR",
      "CG",
      "CH",
      "DD",
      "DL",
      "GA",
      "GJ",
      "HR",
      "HP",
      "JK",
      "JH",
      "KA",
      "KL",
      "LA",
      "LD",
      "MH",
      "ML",
      "MN",
      "MP",
      "MZ",
      "NL",
      "OD",
      "PB",
      "PY",
      "RJ",
      "SK",
      "TN",
      "TS",
      "TR",
      "UP",
      "UK",
      "WB",
    ];
    if (!validStates.includes(section3)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Section 3: Invalid state code '${section3}'`,
      });
    }

    // Section 4
    const section4 = cin.slice(8, 12);
    const year = parseInt(section4, 10);
    if (!/^\d{4}$/.test(section4) || year < 1900 || year > currentYear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Section 4: Year '${section4}' must be between 1900 and ${currentYear}`,
      });
    }

    // Section 5
    const section5 = cin.slice(12, 15);
    const validCompanyTypes = [
      "PTC",
      "PLC",
      "FTC",
      "GOI",
      "SGC",
      "OPC",
      "NPL",
      "GAP",
      "NCT",
      "SEC",
    ];
    if (!validCompanyTypes.includes(section5)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Section 5: Invalid company type code '${section5}'`,
      });
    }

    // Section 6
    const section6 = cin.slice(15);
    if (!/^\d{6}$/.test(section6)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Section 6: Must be 6 digits for ROC registration number",
      });
    }
  }),
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  company_website: z.string().url("Please enter a valid website URL"),
  department_name: z.string().min(2, "Department name is required"),
  department_code: z.string().min(2, "Department code is required"),
  department_type: z.string().min(1, "Please select department type"),
  company_type: z.string().min(1, "Please select company type"),
  industry_type: z.string().min(1, "Please select industry type"),
  number_of_branches: z.coerce
    .number()
    .min(1, "Number of branches must be at least 1"),
  pan_number: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  gst_number: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
      "Invalid GST format"
    ),
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
  contact_person_mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  year_founded: z.coerce
    .number()
    .min(1800, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in future"),
  head_office_address: z
    .string()
    .min(10, "Address must be at least 10 characters"),
  about_company: z
    .string()
    .min(50, "Company description must be at least 50 characters"),
  state: z.string().min(1, "Please select state"),
  district: z.string().min(1, "Please select district"),
  mandal: z.string().min(1, "Please select mandal"),
  city: z.string().min(1, "Please select city"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
});

type EmployerFormData = z.infer<typeof employerSchema>;

export default function EmployerRegistration() {
  const { toast } = useToast();

  const form = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
    mode: "onBlur", // errors show after first blur
    reValidateMode: "onChange",
    defaultValues: {
      iso_certified: false,
      company_cin: "",
      company_name: "",
      company_website: "",
      department_name: "",
      department_code: "",
      department_type: "",
      company_type: "",
      industry_type: "",
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
  });

  const onSubmit = (data: EmployerFormData) => {
    console.log("Employer Registration Data:", data);
    toast({
      title: "Registration Successful!",
      description: "Employer has been registered successfully.",
    });
  };

  return (
    <div className="p-2">
      <div className="mb-4">
        <div className="flex items-center gap-2 ">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Employer Registration</h1>
        </div>
        <p className="text-muted-foreground">
          Please fill in all the required information to register your
          organization.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Company Information Section */}
          <Card>
            <CardHeader>
              <CardTitle id="company-info" className="text-primary">Company Information</CardTitle>
              <CardDescription>
                Information about your company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="company_cin"
                  render={({ field }) => {
                    const isTouched = form.formState.touchedFields.company_cin;
                    const isDirty = form.formState.dirtyFields.company_cin;
                    const errorMessage =
                      form.formState.errors.company_cin?.message;

                    return (
                      <FormItem>
                        <FormLabel>
                          Corporate Identification Number (CIN)<span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="U00000DL2020PTC000001"
                            {...field}
                            className={
                              errorMessage && (isTouched || isDirty)
                                ? "border-red-500"
                                : ""
                            }
                          />
                        </FormControl>
                        {(isTouched || isDirty) && errorMessage && (
                          <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      Company Name <span className="text-red-600">*</span>
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
                      <FormLabel>Company Website <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          {...field}
                        />
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
                      <FormLabel>Company Type <span className="text-red-600">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Private Limited">
                            Private Limited
                          </SelectItem>
                          <SelectItem value="Public Limited">
                            Public Limited
                          </SelectItem>
                          <SelectItem value="Partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="Sole Proprietorship">
                            Sole Proprietorship
                          </SelectItem>
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
                      <FormLabel>Industry Type <span className="text-red-600">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Information Technology">
                            Information Technology
                          </SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">
                            Manufacturing
                          </SelectItem>
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
                      <FormLabel>Year Founded <span className="text-red-600">*</span></FormLabel>
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
                      <FormLabel>Number of Employees <span className="text-red-600">*</span></FormLabel>
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
                      <FormLabel>Number of Branches <span className="text-red-600">*</span></FormLabel>
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
                      <FormLabel>Annual Revenue <span className="text-red-600">*</span></FormLabel>
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
                      <FormLabel>About Company <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="We offer modern technology solutions for businesses...."
                          {...field}
                        />
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
              <CardTitle id="department-info" className="text-primary">Department Details</CardTitle>
              <CardDescription>
                Information about the specific department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="department_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Name <span className="text-red-600">*</span></FormLabel>
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
                      <FormLabel>Department Code <span className="text-red-600">*</span></FormLabel>
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
                      <FormLabel>Department Type <span className="text-red-600">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="State Govt">
                            State Government
                          </SelectItem>
                          <SelectItem value="Central Govt">
                            Central Government
                          </SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Semi-Govt">
                            Semi-Government
                          </SelectItem>
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
              <CardTitle id="legal-info" className="text-primary">
                Registration & Legal Information
              </CardTitle>
              <CardDescription>
                Legal registration details and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="date_of_registered"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Registration <span className="text-red-600">*</span></FormLabel>
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
                  name="gst_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Number <span className="text-red-600">*</span></FormLabel>
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
                        <FormLabel>ISO Certified </FormLabel>
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
              <CardTitle id="contact-info" className="text-primary">Contact Information</CardTitle>
              <CardDescription>
                Official contact details and contact person information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">
                    Official Contact Details
                  </h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="official_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Official Email <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="info@example.com"
                              {...field}
                            />
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
                          <FormLabel>Official Mobile <span className="text-red-600">*</span></FormLabel>
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
                  <h4 className="text-sm font-medium mb-4">
                    Contact Person Details
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="contact_person_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person Name <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Sai Kartik Nistala"
                              {...field}
                            />
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
                          <FormLabel>Contact Person Designation <span className="text-red-600">*</span></FormLabel>
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
                          <FormLabel>Contact Person Email <span className="text-red-600">*</span></FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="snistala@miraclesoft.com"
                              {...field}
                            />
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
                          <FormLabel>Contact Person Mobile <span className="text-red-600">*</span></FormLabel>
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
              <CardTitle id="address-info" className="text-primary">Address Information</CardTitle>
              <CardDescription>
                Head office address and location details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="head_office_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Head Office Address <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="123, Main Street, Hyderabad, Telangana"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State <span className="text-red-600">*</span></FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Telangana">Telangana</SelectItem>
                            <SelectItem value="Andhra Pradesh">
                              Andhra Pradesh
                            </SelectItem>
                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                            <SelectItem value="Tamil Nadu">
                              Tamil Nadu
                            </SelectItem>
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
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pb-2">
            <Button type="submit" size="lg" className="min-w-[200px]">
              Register Employer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
