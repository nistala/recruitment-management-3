"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Download, Check, Star, Calendar, DollarSign, TrendingUp, Crown, Building } from "lucide-react"

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("professional")
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 49,
      period: "month",
      description: "Perfect for small businesses",
      icon: Building,
      features: [
        "Up to 5 job postings",
        "Basic candidate management",
        "Email support",
        "Standard templates",
        "Basic analytics",
      ],
      limits: {
        jobs: 5,
        candidates: 100,
        storage: "5GB",
      },
    },
    {
      id: "professional",
      name: "Professional",
      price: 99,
      period: "month",
      description: "Most popular for growing companies",
      icon: Star,
      popular: true,
      features: [
        "Up to 25 job postings",
        "Advanced candidate management",
        "Priority support",
        "Custom templates",
        "Advanced analytics",
        "Interview scheduling",
        "Team collaboration",
      ],
      limits: {
        jobs: 25,
        candidates: 1000,
        storage: "50GB",
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 199,
      period: "month",
      description: "For large organizations",
      icon: Crown,
      features: [
        "Unlimited job postings",
        "Full candidate management suite",
        "24/7 dedicated support",
        "Custom branding",
        "Advanced reporting",
        "API access",
        "Single sign-on (SSO)",
        "Custom integrations",
      ],
      limits: {
        jobs: "Unlimited",
        candidates: "Unlimited",
        storage: "Unlimited",
      },
    },
  ]

  const billingHistory = [
    {
      id: "1",
      date: "2024-01-01",
      description: "Professional Plan - January 2024",
      amount: 99.0,
      status: "Paid",
      invoice: "INV-2024-001",
    },
    {
      id: "2",
      date: "2023-12-01",
      description: "Professional Plan - December 2023",
      amount: 99.0,
      status: "Paid",
      invoice: "INV-2023-012",
    },
    {
      id: "3",
      date: "2023-11-01",
      description: "Professional Plan - November 2023",
      amount: 99.0,
      status: "Paid",
      invoice: "INV-2023-011",
    },
    {
      id: "4",
      date: "2023-10-01",
      description: "Starter Plan - October 2023",
      amount: 49.0,
      status: "Paid",
      invoice: "INV-2023-010",
    },
    {
      id: "5",
      date: "2024-02-01",
      description: "Professional Plan - February 2024",
      amount: 99.0,
      status: "Pending",
      invoice: "INV-2024-002",
    },
  ]

  const usageStats = {
    jobsUsed: 18,
    jobsLimit: 25,
    candidatesUsed: 742,
    candidatesLimit: 1000,
    storageUsed: 32,
    storageLimit: 50,
  }

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId)
    setShowUpgradeDialog(true)
  }

  const handlePayment = () => {
    // Payment processing logic
    setShowUpgradeDialog(false)
    setCurrentPlan(selectedPlan)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600">Manage your subscription and billing information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Update Payment Method
          </Button>
        </div>
      </div>

      {/* Current Plan & Usage */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Plan</CardTitle>
              <Badge variant="default">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Professional Plan</h3>
                  <p className="text-gray-600">$99/month • Renews on Feb 1, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$99</p>
                <p className="text-sm text-gray-600">per month</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Job Postings</span>
                  <span>
                    {usageStats.jobsUsed} / {usageStats.jobsLimit}
                  </span>
                </div>
                <Progress value={(usageStats.jobsUsed / usageStats.jobsLimit) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Candidate Database</span>
                  <span>
                    {usageStats.candidatesUsed} / {usageStats.candidatesLimit}
                  </span>
                </div>
                <Progress value={(usageStats.candidatesUsed / usageStats.candidatesLimit) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Storage Used</span>
                  <span>
                    {usageStats.storageUsed}GB / {usageStats.storageLimit}GB
                  </span>
                </div>
                <Progress value={(usageStats.storageUsed / usageStats.storageLimit) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm">This Month</span>
              </div>
              <span className="font-semibold">$99.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Total Spent</span>
              </div>
              <span className="font-semibold">$1,188.00</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Next Billing</span>
              </div>
              <span className="font-semibold">Feb 1</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Plans and History */}
      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-gray-100 rounded-full w-fit">
                    <plan.icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Job Postings:</span>
                        <span className="font-medium">{plan.limits.jobs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Candidates:</span>
                        <span className="font-medium">{plan.limits.candidates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage:</span>
                        <span className="font-medium">{plan.limits.storage}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={currentPlan === plan.id ? "outline" : "default"}
                    onClick={() => currentPlan !== plan.id && handleUpgrade(plan.id)}
                    disabled={currentPlan === plan.id}
                  >
                    {currentPlan === plan.id ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Billing History</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{bill.description}</h4>
                          <p className="text-sm text-gray-600">
                            {bill.date} • {bill.invoice}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">${bill.amount.toFixed(2)}</p>
                        <Badge
                          variant={
                            bill.status === "Paid" ? "default" : bill.status === "Pending" ? "secondary" : "destructive"
                          }
                        >
                          {bill.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade Plan</DialogTitle>
            <DialogDescription>
              Complete your payment to upgrade to the {plans.find((p) => p.id === selectedPlan)?.name} plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedPlan && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{plans.find((p) => p.id === selectedPlan)?.name} Plan</span>
                  <span className="font-bold">${plans.find((p) => p.id === selectedPlan)?.price}/month</span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div>
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment}>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay ${plans.find((p) => p.id === selectedPlan)?.price}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
