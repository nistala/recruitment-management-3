"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Globe, Phone, Mail, Users, Plus, Edit, Trash2, Save, Camera } from "lucide-react"

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)

  const [companyData, setCompanyData] = useState({
    name: "TechCorp Solutions",
    industry: "Technology",
    size: "201-500",
    founded: "2015",
    website: "https://techcorp.com",
    description:
      "Leading technology solutions provider specializing in enterprise software development and digital transformation services.",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    phone: "+1 (555) 123-4567",
    email: "contact@techcorp.com",
    logo: "/placeholder.svg?height=100&width=100",
  })

  const [hrContacts, setHrContacts] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      position: "HR Manager",
      email: "sarah.johnson@techcorp.com",
      phone: "+1 (555) 123-4568",
      department: "Human Resources",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Michael Chen",
      position: "Talent Acquisition Lead",
      email: "michael.chen@techcorp.com",
      phone: "+1 (555) 123-4569",
      department: "Recruitment",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Emily Davis",
      position: "HR Business Partner",
      email: "emily.davis@techcorp.com",
      phone: "+1 (555) 123-4570",
      department: "Human Resources",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media",
    "Real Estate",
    "Non-profit",
  ]

  const companySizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save logic here
  }

  const handleAddContact = (contactData: any) => {
    const newContact = {
      id: Date.now().toString(),
      ...contactData,
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setHrContacts([...hrContacts, newContact])
    setShowAddContact(false)
  }

  const handleDeleteContact = (contactId: string) => {
    setHrContacts(hrContacts.filter((contact) => contact.id !== contactId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and HR contacts</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="company">Company Details</TabsTrigger>
          <TabsTrigger value="contacts">HR Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          {/* Company Logo & Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="relative">
                  <img
                    src={companyData.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="h-24 w-24 rounded-lg object-cover border"
                  />
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyData.name}
                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  {isEditing ? (
                    <Select
                      value={companyData.industry}
                      onValueChange={(value) => setCompanyData({ ...companyData, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input value={companyData.industry} disabled />
                  )}
                </div>

                <div>
                  <Label htmlFor="size">Company Size</Label>
                  {isEditing ? (
                    <Select
                      value={companyData.size}
                      onValueChange={(value) => setCompanyData({ ...companyData, size: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} employees
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input value={`${companyData.size} employees`} disabled />
                  )}
                </div>

                <div>
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    value={companyData.founded}
                    onChange={(e) => setCompanyData({ ...companyData, founded: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Active Jobs</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Globe className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold">3,456</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">HR Contacts ({hrContacts.length})</h3>
              <p className="text-gray-600">Manage your HR team contacts</p>
            </div>
            <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add HR Contact</DialogTitle>
                  <DialogDescription>Add a new HR team member to your company profile</DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target as HTMLFormElement)
                    handleAddContact({
                      name: formData.get("name"),
                      position: formData.get("position"),
                      email: formData.get("email"),
                      phone: formData.get("phone"),
                      department: formData.get("department"),
                    })
                  }}
                >
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input id="position" name="position" required />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select name="department">
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Human Resources">Human Resources</SelectItem>
                          <SelectItem value="Recruitment">Recruitment</SelectItem>
                          <SelectItem value="Talent Acquisition">Talent Acquisition</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="button" variant="outline" onClick={() => setShowAddContact(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Contact</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hrContacts.map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.position}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{contact.email}</span>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{contact.phone}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <Badge variant="secondary">{contact.department}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
