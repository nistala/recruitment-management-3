"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Calendar, Upload, Plus, X, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Education {
  id: string
  degree: string
  institution: string
  year: string
  grade: string
}

interface Skill {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-06-15",
    address: "123 Main St, New York, NY 10001",
    bio: "Passionate software developer with 5+ years of experience in full-stack development.",
  })

  // Education State
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      degree: "Bachelor of Computer Science",
      institution: "University of Technology",
      year: "2017",
      grade: "3.8 GPA",
    },
    {
      id: "2",
      degree: "Master of Software Engineering",
      institution: "Tech Institute",
      year: "2019",
      grade: "3.9 GPA",
    },
  ])

  // Skills State
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "JavaScript", level: "Expert" },
    { id: "2", name: "React", level: "Advanced" },
    { id: "3", name: "Node.js", level: "Advanced" },
    { id: "4", name: "Python", level: "Intermediate" },
    { id: "5", name: "TypeScript", level: "Advanced" },
    { id: "6", name: "AWS", level: "Intermediate" },
  ])

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    grade: "",
  })

  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "Beginner" as const,
  })

  const handlePersonalDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Profile Updated",
        description: "Your personal details have been updated successfully.",
      })
    }, 1000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      })
    }, 1000)
  }

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setEducation([
        ...education,
        {
          id: Date.now().toString(),
          ...newEducation,
        },
      ])
      setNewEducation({ degree: "", institution: "", year: "", grade: "" })
      toast({
        title: "Education Added",
        description: "New education entry has been added.",
      })
    }
  }

  const removeEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
    toast({
      title: "Education Removed",
      description: "Education entry has been removed.",
    })
  }

  const addSkill = () => {
    if (newSkill.name && !skills.find((skill) => skill.name.toLowerCase() === newSkill.name.toLowerCase())) {
      setSkills([
        ...skills,
        {
          id: Date.now().toString(),
          ...newSkill,
        },
      ])
      setNewSkill({ name: "", level: "Beginner" })
      toast({
        title: "Skill Added",
        description: "New skill has been added to your profile.",
      })
    }
  }

  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id))
    toast({
      title: "Skill Removed",
      description: "Skill has been removed from your profile.",
    })
  }

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-red-500"
      case "Advanced":
        return "bg-orange-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Beginner":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Profile Management</h1>
          <p className="text-muted-foreground">Manage your personal information and settings</p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96&text=JD" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">
                {personalDetails.firstName} {personalDetails.lastName}
              </h2>
              <p className="text-muted-foreground">{personalDetails.email}</p>
              <p className="mt-2 text-sm">{personalDetails.bio}</p>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Personal Details Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={personalDetails.firstName}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={personalDetails.lastName}
                      onChange={(e) => setPersonalDetails({ ...personalDetails, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={personalDetails.email}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={personalDetails.phone}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={personalDetails.dateOfBirth}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, dateOfBirth: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="address"
                        value={personalDetails.address}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={personalDetails.bio}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      placeholder="e.g., Bachelor of Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input
                      id="institution"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      placeholder="e.g., University of Technology"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade/GPA</Label>
                    <Input
                      id="grade"
                      value={newEducation.grade}
                      onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
                      placeholder="e.g., 3.8 GPA"
                    />
                  </div>
                </div>
                <Button onClick={addEducation} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </CardContent>
            </Card>

            {/* Education List */}
            <div className="space-y-4">
              {education.map((edu) => (
                <Card key={edu.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{edu.year}</span>
                          {edu.grade && <span>{edu.grade}</span>}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Skill</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="skillName">Skill Name</Label>
                    <Input
                      id="skillName"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="e.g., JavaScript"
                    />
                  </div>
                  <div className="w-32 space-y-2">
                    <Label htmlFor="skillLevel">Level</Label>
                    <select
                      id="skillLevel"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addSkill}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Badge variant="secondary" className="flex items-center space-x-2">
                        <span>{skill.name}</span>
                        <div className={`h-2 w-2 rounded-full ${getSkillColor(skill.level)}`} />
                        <span className="text-xs">{skill.level}</span>
                        <button onClick={() => removeSkill(skill.id)} className="ml-1 text-red-500 hover:text-red-700">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Changing Password..." : "Change Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Button variant="outline">Choose File</Button>
                    <p className="mt-2 text-sm text-muted-foreground">Upload your resume (PDF, DOC, DOCX - Max 5MB)</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Current resume: <span className="font-medium">john_doe_resume.pdf</span>
                  <Button variant="link" className="p-0 h-auto ml-2">
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
