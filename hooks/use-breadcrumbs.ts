"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbItem {
  href: string;
  label: string;
  isCurrentPage: boolean;
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();

  return useMemo(() => {
    // Centralized mapping for segment → label
    const routeLabels: Record<string, string> = {
      "": "Home",
      "admin": "Admin Dashboard",
      "dashboard": "Dashboard",
      "employee": "Employee Dashboard",
      "employer": "Employer Dashboard",
      "exam": "Exam Dashboard",
      "exam-center": "Exam Center Dashboard",
      "candidate-registration": "Candidate Registration",
      "employer-registration": "Employer Registration",
      "calendar": "Exam Calendar",
      "results": "Results & Reports",
      "job-details": "Job Details",
      "profile": "Profile",
      "add-exam-center": "Add Exam Center",
      "add-exam-schedule": "Add Exam Schedule",

      // Candidate Module
      "candidate-module": "Candidate",
      "jobs": "Jobs",
      "job-fairs": "Job Fairs",
      "saved": "Saved Jobs",
      "applications-history": "Applications History",
      "exams": "Exams",
      "mock-test": "Mock Tests",
      "certification": "Certification",
      "candidate-profile": "Candidate Profile",

      // Employer Module
      "employer-module": "Employer",
      "candidates": "Candidates",
      "scheduling": "Scheduling",
      "evaluation": "Evaluation",
      "reports": "Reports",
      "notifications": "Notifications",
      "billing": "Billing",

      // College Module
      "college-module": "College",
      "students-info": "Students Info",
      "drives": "Drives",

      // Sales Module
      "sales-module": "Sales",
      "registrations": "Registrations",
      "entities": "Entities",
      "approvals": "Approvals",
      "revenue": "Revenue",
      "marketing-analytics": "Marketing Analytics",
      "campaigns": "Campaigns",
      "audit": "Audit",
      "support": "Support",
      "settings": "Settings",
    };

    const pathSegments = pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
      {
        href: "/",
        label: "Home",
        isCurrentPage: pathSegments.length === 0,
      },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      breadcrumbs.push({
        href: currentPath,
        label: routeLabels[segment] || segment, // fallback: show raw segment
        isCurrentPage: isLast,
      });
    });

    return breadcrumbs;
  }, [pathname]);
}
