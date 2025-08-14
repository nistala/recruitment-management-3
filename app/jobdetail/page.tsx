"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { ChevronDownIcon } from "lucide-react";

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
        mobileAppLink: "https://play.google.com/store/apps/details?id=freejobalert.app",
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
        "Bachelor’s degree in any discipline from a recognized university",
    ],
    salary: {
        payLevel: "Level 10 - Level 18 (7th CPC)",
        startingSalary: "₹56,100 per month + allowances",
        perks: [
            "House Rent Allowance",
            "Travel Allowance",
            "Dearness Allowance",
        ],
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

const AccordionSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Accordion.Item value={title} className="border-b border-gray-200">
    <Accordion.Header>
      <Accordion.Trigger className="flex w-full justify-between items-center py-3 text-lg font-semibold text-blue-700 hover:text-blue-800 transition">
        {title}
        <ChevronDownIcon className="w-5 h-5 transition-transform data-[state=open]:rotate-180" />
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="pb-4 text-gray-700">{children}</Accordion.Content>
  </Accordion.Item>
);

export default function JobDetailPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gray-50 z-10 pb-4">
        <h1 className="text-3xl font-bold text-blue-800">{jobData.title}</h1>
        <p className="text-lg text-gray-700">{jobData.postName}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          <span><strong>Posted:</strong> {jobData.postDate}</span>
          <span><strong>Updated:</strong> {jobData.latestUpdate}</span>
          <span><strong>Total Vacancies:</strong> {jobData.totalVacancy}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultValue="overview" className="mt-8">
        <Tabs.List className="flex gap-4 border-b border-gray-300 pb-2">
          <Tabs.Trigger value="overview" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 data-[state=active]:text-blue-700 border-b-2 border-transparent data-[state=active]:border-blue-600">
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger value="eligibility" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 data-[state=active]:text-blue-700 border-b-2 border-transparent data-[state=active]:border-blue-600">
            Eligibility
          </Tabs.Trigger>
          <Tabs.Trigger value="salary" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 data-[state=active]:text-blue-700 border-b-2 border-transparent data-[state=active]:border-blue-600">
            Salary & Perks
          </Tabs.Trigger>
          <Tabs.Trigger value="links" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 data-[state=active]:text-blue-700 border-b-2 border-transparent data-[state=active]:border-blue-600">
            Important Links
          </Tabs.Trigger>
        </Tabs.List>

        {/* Overview Tab */}
        <Tabs.Content value="overview" className="mt-4">
          <Accordion.Root type="single" collapsible className="w-full bg-white rounded-lg shadow">
            <AccordionSection title="Brief Information">
              <p>{jobData.briefInformation}</p>
            </AccordionSection>
            <AccordionSection title="Notification Overview">
              <p>{jobData.notificationOverview}</p>
              <a href={jobData.organizationDetails.downloadLink} className="text-blue-600 hover:underline mt-2 block">
                Download Official Notification
              </a>
            </AccordionSection>
            <AccordionSection title="Organization Details">
              <ul className="space-y-1">
                <li><strong>Organization:</strong> {jobData.organizationDetails.organization}</li>
                <li><strong>Advertisement No:</strong> {jobData.organizationDetails.advertisementNo}</li>
                <li><strong>Post:</strong> {jobData.organizationDetails.post}</li>
                <li><strong>Website:</strong> <a href={jobData.organizationDetails.website} className="text-blue-600 hover:underline">{jobData.organizationDetails.website}</a></li>
              </ul>
            </AccordionSection>
          </Accordion.Root>
        </Tabs.Content>

        {/* Eligibility Tab */}
        <Tabs.Content value="eligibility" className="mt-4">
          <Accordion.Root type="multiple" className="bg-white rounded-lg shadow">
            <AccordionSection title="Application Fee">
              <ul>
                <li><strong>General:</strong> {jobData.applicationFee.general}</li>
                <li><strong>SC/ST/Female/PwBD:</strong> {jobData.applicationFee.sc_st_female_pwbd}</li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Important Dates">
              <ul>
                <li><strong>Starting Date:</strong> {jobData.importantDates.startingDate}</li>
                <li><strong>Last Date:</strong> {jobData.importantDates.lastDate}</li>
              </ul>
            </AccordionSection>
            <AccordionSection title="Age Limit">
              <ul>
                <li><strong>Minimum Age:</strong> {jobData.ageLimit.minimumAge}</li>
                <li><strong>Maximum Age:</strong> {jobData.ageLimit.maximumAge}</li>
              </ul>
            </AccordionSection>
          </Accordion.Root>
        </Tabs.Content>

        {/* Salary Tab */}
        <Tabs.Content value="salary" className="mt-4">
          <Accordion.Root type="single" collapsible className="bg-white rounded-lg shadow">
            <AccordionSection title="Salary & Perks">
              <ul>
                <li><strong>Pay Level:</strong> {jobData.salary.payLevel}</li>
                <li><strong>Starting Salary:</strong> {jobData.salary.startingSalary}</li>
                <li><strong>Perks:</strong>
                  <ul className="list-disc ml-5">
                    {jobData.salary.perks.map((perk, idx) => (
                      <li key={idx}>{perk}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </AccordionSection>
          </Accordion.Root>
        </Tabs.Content>

        {/* Links Tab */}
        <Tabs.Content value="links" className="mt-4">
          <div className="bg-white p-4 rounded-lg shadow space-y-2">
            <a href={jobData.importantLinks.notificationPDF} className="text-blue-600 hover:underline block">
              Download Notification PDF
            </a>
            <a href={jobData.importantLinks.applyOnline} className="text-blue-600 hover:underline block">
              Apply Online
            </a>
            <a href={jobData.importantLinks.officialWebsite} className="text-blue-600 hover:underline block">
              Official Website
            </a>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
