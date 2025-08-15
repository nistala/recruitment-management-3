"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  GraduationCap,
  IndianRupee,
  FileText,
  ExternalLink,
  Download,
  Building2,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const jobData = {
  title: "IAS Recruitment 2025 Notification PDF",
  postName: "Indian Administrative Service (IAS) Recruitment Online Form 2025",
  postDate: "2025-07-10",
  latestUpdate: "2025-08-14",
  totalVacancy: 850,
  briefInformation:
    "The Union Public Service Commission (UPSC) has announced a notification for the recruitment of Indian Administrative Service (IAS) Officers. Eligible candidates who are interested in the vacancy details and have completed all eligibility criteria can read the notification & apply.",
  notificationOverview:
    "UPSC has officially released the recruitment notification for IAS 2025. For all details regarding the recruitment process, eligibility, and application procedure, refer to the official notification. Eligible candidates can download it from the link below.",
  organizationDetails: {
    organization: "UPSC",
    advertisementNo: "02/2025-IAS",
    post: "IAS 2025",
    website: "https://www.upsc.gov.in",
    downloadLink: "https://www.upsc.gov.in/ias-notification-2025",
    mobileAppLink:
      "https://play.google.com/store/apps/details?id=freejobalert.app",
  },
  applicationFee: {
    general: "₹100",
    sc_st_female_pwbd: "No Fee",
  },
  importantDates: {
    startingDate: "2025-08-20",
    lastDate: "2025-09-10",
    prelimsExamDate: "2025-12-01",
    mainsExamDate: "2026-03-15",
  },
  ageLimit: {
    minimumAge: 21,
    maximumAge: 32,
    ageRelaxation: "As per government rules",
  },
  qualification: [
    "Bachelor's degree in any discipline from a recognized university",
  ],
  salary: {
    payLevel: "Level 10 - Level 18 (7th CPC)",
    startingSalary: "₹56,100 per month + allowances",
    perks: ["House Rent Allowance", "Travel Allowance", "Dearness Allowance"],
  },
  selectionProcess: [
    "Preliminary Examination",
    "Main Examination",
    "Interview/Personality Test",
  ],
  howToApply:
    "Eligible candidates can apply online through the UPSC official website between the given dates.",
  importantLinks: {
    notificationPDF:
      "https://www.upsc.gov.in/sites/default/files/IAS-2025-Notification.pdf",
    applyOnline: "https://www.upsconline.nic.in/mainmenu2.php",
    officialWebsite: "https://www.upsc.gov.in",
  },
};

export default function JobDetailsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleApply = () => {
    setShowApplyDialog(false);
    toast({
      title: "Application Submitted!",
      description:
        "Your application for IAS 2025 has been submitted successfully.",
    });
  };

  const handleCancel = () => {
    setShowCancelDialog(false);
    router.push("/dashboard/employer");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isApplicationOpen = () => {
    const today = new Date();
    const startDate = new Date(jobData.importantDates.startingDate);
    const endDate = new Date(jobData.importantDates.lastDate);
    return today >= startDate && today <= endDate;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-2">
        {/* Header with Back Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {jobData.postName}
            </h1>
            <p className="text-gray-600 mt-1">
              Posted on {formatDate(jobData.postDate)} • Last updated{" "}
              {formatDate(jobData.latestUpdate)}
            </p>
          </div>
        </div>

        {/* Status Banner */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Banner */}
          <Card className="border-l-4 border-l-green-500 bg-green-50 flex-1">
            <CardContent className="p-2">
              <div className="flex items-center gap-3">
                {isApplicationOpen() ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">
                        Applications Open
                      </p>
                      <p className="text-sm text-green-600">
                        Apply before{" "}
                        {formatDate(jobData.importantDates.lastDate)}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-800">
                        Applications Opening Soon
                      </p>
                      <p className="text-sm text-orange-600">
                        Applications start from{" "}
                        {formatDate(jobData.importantDates.startingDate)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              asChild
              className="bg-[#00aae7] text-white px-4 py-2 rounded-lg hover:bg-[#00aae7] hover:text-white transition-colors w-full md:w-auto"
            >
              <a
                href={jobData.importantLinks.notificationPDF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Notification
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className=" bg-[#ef4048] text-white px-4 py-2 rounded-lg hover:bg-[#ef4048] hover:text-white transition-colors w-full md:w-auto"
            >
              <a
                href={jobData.importantLinks.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Official Website
              </a>
            </Button>
            <Button
              className=" bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors w-full md:w-auto"
              size="lg"
              onClick={() => setShowApplyDialog(true)}
              disabled={!isApplicationOpen()}
            >
              {isApplicationOpen() ? "Apply Now" : "Applications Not Open"}
            </Button>
          </div>
        </div>

        <div className="grid gap-2 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-2">
            {/* Brief Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <FileText className="h-4 w-4" />
                  Job Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700 leading-relaxed text-sm">
                  {jobData.briefInformation}
                </p>
                <Separator />
                <p className="text-gray-700 leading-relaxed text-sm">
                  {jobData.notificationOverview}
                </p>
              </CardContent>
            </Card>

            {/* Organization Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Building2 className="h-4 w-4" />
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Organization
                    </p>
                    <p className="text-lg font-semibold">
                      {jobData.organizationDetails.organization}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Advertisement No.
                    </p>
                    <p className="text-lg font-semibold">
                      {jobData.organizationDetails.advertisementNo}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Post</p>
                    <p className="text-lg font-semibold">
                      {jobData.organizationDetails.post}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Vacancies
                    </p>
                    <p className="text-lg font-semibold text-blue-600">
                      {jobData.totalVacancy}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <GraduationCap className="h-4 w-4" />
                  Qualification & Selection Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Qualification */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Qualification Required
                  </h3>
                  <ul className="space-y-2">
                    {jobData.qualification.map((qual, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection Process */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 ">
                    Selection Process
                  </h3>
                  <div>
                    {jobData.selectionProcess.map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className=" lg:col-span-2 space-y-2">
            {/* Important Dates */}
            {/* Salary Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <IndianRupee className="h-4 w-4" />
                  Salary & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pay Level</p>
                  <p className="font-semibold">{jobData.salary.payLevel}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Starting Salary
                  </p>
                  <p className="font-semibold text-green-600">
                    {jobData.salary.startingSalary}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Additional Benefits
                  </p>
                  <ul className="space-y-1">
                    {jobData.salary.perks.map((perk, index) => (
                      <li
                        key={index}
                        className="text-sm flex items-center gap-2"
                      >
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <Calendar className="h-4 w-4" />
                  <p className="text-sm"></p>Important Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-1">
                  {/* Application Start */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Application Start
                    </p>
                    <p className="font-semibold text-green-600">
                      {formatDate(jobData.importantDates.startingDate)}
                    </p>
                  </div>

                  {/* Application End */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Application End
                    </p>
                    <p className="font-semibold text-red-600">
                      {formatDate(jobData.importantDates.lastDate)}
                    </p>
                  </div>

                  {/* Prelims Exam */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Prelims Exam
                    </p>
                    <p className="font-semibold">
                      {formatDate(jobData.importantDates.prelimsExamDate)}
                    </p>
                  </div>

                  {/* Mains Exam */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Mains Exam
                    </p>
                    <p className="font-semibold">
                      {formatDate(jobData.importantDates.mainsExamDate)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <User className="h-4 w-4" />
                  Age Limit & Application Fee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* Minimum Age */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Minimum Age
                    </p>
                    <p className="font-semibold">
                      {jobData.ageLimit.minimumAge} years
                    </p>
                  </div>

                  {/* Maximum Age */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Maximum Age
                    </p>
                    <p className="font-semibold">
                      {jobData.ageLimit.maximumAge} years
                    </p>
                  </div>

                  {/* General/OBC Fee */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      General/OBC Fee
                    </p>
                    <p className="font-semibold">
                      {jobData.applicationFee.general}
                    </p>
                  </div>

                  {/* SC/ST/Female/PwBD Fee */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      SC/ST/Female/PwBD Fee
                    </p>
                    <p className="font-semibold text-green-600">
                      {jobData.applicationFee.sc_st_female_pwbd}
                    </p>
                  </div>
                </div>

                {/* Age Relaxation Note */}
                {jobData.ageLimit.ageRelaxation && (
                  <p className="text-sm text-red-600 ">
                    *{jobData.ageLimit.ageRelaxation}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Apply Confirmation Dialog */}
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Application</DialogTitle>
              <DialogDescription>
                Are you sure you want to apply for the IAS 2025 recruitment?
                Please ensure you meet all the eligibility criteria before
                proceeding.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApplyDialog(false)}
              >
                Review Again
              </Button>
              <Button onClick={handleApply}>Confirm & Apply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Application</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel? You will be redirected back to
                the dashboard.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCancelDialog(false)}
              >
                Stay Here
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                Yes, Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
