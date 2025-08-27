"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Upload, Download, Eye, Plus, Calendar, Building, ExternalLink, Trash2, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId: string
  description: string
  skills: string[]
  fileUrl?: string
  verificationUrl?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: "certification" | "award" | "recognition" | "milestone"
  issuer: string
  badge?: string
}

export default function CertificatesPage() {
  const { toast } = useToast()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  const [newCertificate, setNewCertificate] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    description: "",
    skills: "",
    verificationUrl: "",
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCertificates([
        {
          id: "1",
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          issueDate: "2023-08-15",
          expiryDate: "2026-08-15",
          credentialId: "AWS-CSA-2023-001234",
          description: "Validates expertise in designing distributed systems on AWS",
          skills: ["AWS", "Cloud Architecture", "System Design"],
          fileUrl: "/certificates/aws-cert.pdf",
          verificationUrl: "https://aws.amazon.com/verification/AWS-CSA-2023-001234",
        },
        {
          id: "2",
          name: "React Developer Certification",
          issuer: "Meta",
          issueDate: "2023-06-20",
          credentialId: "META-REACT-2023-567890",
          description: "Demonstrates proficiency in React development and best practices",
          skills: ["React", "JavaScript", "Frontend Development"],
          fileUrl: "/certificates/react-cert.pdf",
          verificationUrl: "https://developers.facebook.com/certification/567890",
        },
        {
          id: "3",
          name: "Google Cloud Professional Developer",
          issuer: "Google Cloud",
          issueDate: "2023-04-10",
          expiryDate: "2025-04-10",
          credentialId: "GCP-PD-2023-112233",
          description: "Validates skills in developing applications on Google Cloud Platform",
          skills: ["Google Cloud", "Kubernetes", "DevOps"],
          fileUrl: "/certificates/gcp-cert.pdf",
        },
        {
          id: "4",
          name: "Certified Scrum Master",
          issuer: "Scrum Alliance",
          issueDate: "2023-02-28",
          expiryDate: "2025-02-28",
          credentialId: "CSM-2023-445566",
          description: "Demonstrates understanding of Scrum framework and agile practices",
          skills: ["Scrum", "Agile", "Project Management"],
          fileUrl: "/certificates/csm-cert.pdf",
        },
      ])

      setAchievements([
        {
          id: "1",
          title: "Top Performer Q4 2023",
          description: "Recognized for outstanding performance and contribution to team success",
          date: "2023-12-31",
          type: "award",
          issuer: "TechCorp Inc.",
          badge: "🏆",
        },
        {
          id: "2",
          title: "Hackathon Winner",
          description: "First place in company-wide hackathon for innovative AI solution",
          date: "2023-11-15",
          type: "recognition",
          issuer: "TechCorp Inc.",
          badge: "🥇",
        },
        {
          id: "3",
          title: "5 Years of Service",
          description: "Completed 5 years of dedicated service",
          date: "2023-09-01",
          type: "milestone",
          issuer: "TechCorp Inc.",
          badge: "🎖️",
        },
        {
          id: "4",
          title: "Innovation Award",
          description: "Awarded for developing a solution that improved system efficiency by 40%",
          date: "2023-07-20",
          type: "award",
          issuer: "TechCorp Inc.",
          badge: "💡",
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault()

    const certificate: Certificate = {
      id: Date.now().toString(),
      name: newCertificate.name,
      issuer: newCertificate.issuer,
      issueDate: newCertificate.issueDate,
      expiryDate: newCertificate.expiryDate || undefined,
      credentialId: newCertificate.credentialId,
      description: newCertificate.description,
      skills: newCertificate.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      verificationUrl: newCertificate.verificationUrl || undefined,
    }

    setCertificates([certificate, ...certificates])
    setNewCertificate({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      description: "",
      skills: "",
      verificationUrl: "",
    })
    setShowAddForm(false)

    toast({
      title: "Certificate Added",
      description: "Your certificate has been added successfully.",
    })
  }

  const removeCertificate = (id: string) => {
    setCertificates(certificates.filter((cert) => cert.id !== id))
    toast({
      title: "Certificate Removed",
      description: "Certificate has been removed from your profile.",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "award":
        return "🏆"
      case "recognition":
        return "🌟"
      case "milestone":
        return "🎖️"
      case "certification":
        return "📜"
      default:
        return "🏅"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "award":
        return "bg-yellow-500"
      case "recognition":
        return "bg-blue-500"
      case "milestone":
        return "bg-green-500"
      case "certification":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Certificates & Achievements</h1>
          <p className="text-muted-foreground">Showcase your certifications and accomplishments</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-blue-100 p-2">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Certificates</p>
                <p className="text-2xl font-bold">{certificates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-green-100 p-2">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Certs</p>
                <p className="text-2xl font-bold">
                  {certificates.filter((cert) => !cert.expiryDate || new Date(cert.expiryDate) > new Date()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold">{achievements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-purple-100 p-2">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issuers</p>
                <p className="text-2xl font-bold">{new Set(certificates.map((cert) => cert.issuer)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Certificate Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Certificate</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCertificate} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="certName">Certificate Name *</Label>
                  <Input
                    id="certName"
                    value={newCertificate.name}
                    onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuing Organization *</Label>
                  <Input
                    id="issuer"
                    value={newCertificate.issuer}
                    onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                    placeholder="e.g., Amazon Web Services"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={newCertificate.issueDate}
                    onChange={(e) => setNewCertificate({ ...newCertificate, issueDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newCertificate.expiryDate}
                    onChange={(e) => setNewCertificate({ ...newCertificate, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="credentialId">Credential ID *</Label>
                  <Input
                    id="credentialId"
                    value={newCertificate.credentialId}
                    onChange={(e) => setNewCertificate({ ...newCertificate, credentialId: e.target.value })}
                    placeholder="e.g., AWS-CSA-2023-001234"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verificationUrl">Verification URL</Label>
                  <Input
                    id="verificationUrl"
                    type="url"
                    value={newCertificate.verificationUrl}
                    onChange={(e) => setNewCertificate({ ...newCertificate, verificationUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCertificate.description}
                  onChange={(e) => setNewCertificate({ ...newCertificate, description: e.target.value })}
                  placeholder="Brief description of the certification..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={newCertificate.skills}
                  onChange={(e) => setNewCertificate({ ...newCertificate, skills: e.target.value })}
                  placeholder="e.g., AWS, Cloud Architecture, System Design"
                />
              </div>

              <div className="space-y-2">
                <Label>Certificate File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Button type="button" variant="outline">
                      Choose File
                    </Button>
                    <p className="mt-2 text-sm text-muted-foreground">Upload certificate (PDF, JPG, PNG - Max 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">Add Certificate</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificates">Certificates ({certificates.length})</TabsTrigger>
          <TabsTrigger value="achievements">Achievements ({achievements.length})</TabsTrigger>
        </TabsList>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => {
              const isExpired = certificate.expiryDate && new Date(certificate.expiryDate) < new Date()
              const isExpiringSoon =
                certificate.expiryDate &&
                new Date(certificate.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) &&
                !isExpired

              return (
                <Card key={certificate.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{certificate.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{certificate.issuer}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCertificate(certificate.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                      </div>
                      {certificate.expiryDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className={isExpired ? "text-red-600" : isExpiringSoon ? "text-yellow-600" : ""}>
                            Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>ID: {certificate.credentialId}</span>
                      </div>
                    </div>

                    {certificate.description && (
                      <p className="text-sm text-muted-foreground">{certificate.description}</p>
                    )}

                    {certificate.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {certificate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {(isExpired || isExpiringSoon) && (
                      <div className="flex items-center space-x-2">
                        {isExpired && <Badge variant="destructive">Expired</Badge>}
                        {isExpiringSoon && (
                          <Badge variant="outline" className="text-yellow-600">
                            Expiring Soon
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {certificate.fileUrl && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                      {certificate.verificationUrl && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Verify
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {certificates.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No certificates added</h3>
                <p className="text-muted-foreground">Add your first certificate to showcase your skills</p>
                <Button className="mt-4" onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certificate
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${getTypeColor(achievement.type)}`}
                    >
                      {achievement.badge || getTypeIcon(achievement.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                        <Badge variant="outline" className="capitalize">
                          {achievement.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Building className="h-4 w-4" />
                          <span>{achievement.issuer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {achievements.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No achievements recorded</h3>
                <p className="text-muted-foreground">Your achievements and recognitions will appear here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
