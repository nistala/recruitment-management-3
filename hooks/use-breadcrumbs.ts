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
    // Route label mappings (only define what you actually support)
     const routeLabels: Record<string, string> = {
    "": "Home",
    "admin": "Admin Dashboard",
    "dashboard": "Dashboard",
    "employee": "Employee Dashboard",
    "employer": "Employer Dashboard",
    "exam": "Exam Dashboard",
    "exam-center": "Exam Center Dashboard",
    "candidate-registration": "Candidate Registration",  //here it as the does not have two segments route exist
    "employer-registration": "Employer Registration",  //here it as the does not have two segments route exist
    "calendar": "Exam Calendar",
    "results": "Results & Reports",
    "job-details": "Job Details",
    "profile": "Profile",
    "add-exam-center": "Add Exam Center",   //here it as the two segments route exist
    "add-exam-schedule": "Add Exam Schedule",  //here it as the two segments route exist
    };

    // Split pathname into segments
    const pathSegments = pathname.split("/").filter(Boolean);

    // Always start with Home
    const breadcrumbs: BreadcrumbItem[] = [
      {
        href: "/",
        label: "Home",
        isCurrentPage: pathSegments.length === 0,
      },
    ];

    // Build breadcrumbs, but only for segments that exist in routeLabels
   const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment && routeLabels[lastSegment]) {
      breadcrumbs.push({
        href: pathname, // full path for the last segment
        label: routeLabels[lastSegment],
        isCurrentPage: true,
      });
    }

    return breadcrumbs;
  }, [pathname]);
}
