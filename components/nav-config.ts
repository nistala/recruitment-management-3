// app/components/navConfig.ts

import {
  Award,
  Bell,
  Bookmark,
  Briefcase,
  CreditCard,
  DollarSign,
  FileCheck,
  FileText,
  GitBranch,
  HeadphonesIcon,
  Mail,
  Shield,
  TrendingUp,
  UserCheck,
  Building2,
  Calendar,
  GraduationCap,
  Home,
  MapPin,
  Users,
  UserPlus,
  ClipboardList,
  BarChart3,
  BriefcaseIcon,
  ClipboardCheck,
  Building,
  History,
  Settings,
} from "lucide-react";

// ====== DEFAULT NAVIGATION (Always present) ======
export const defaultItems = [
  {
    title: "Registration",
    items: [
      { title: "Employer Registration", href: "/registration/employer-registration", icon: Building2 },
      { title: "Candidate Registration", href: "/registration/candidate-registration", icon: UserPlus },
    ],
  },
];

// ====== ROLE-BASED NAVIGATION ======
export const navConfig: Record<string, any[]> = {
  admin: [
    {
      title: "Dashboards",
      items: [
        { title: "Admin Dashboard", href: "/dashboard/admin", icon: Users },
        { title: "Employer Dashboard", href: "/dashboard/employer", icon: Building2 },
        { title: "Employee Dashboard", href: "/dashboard/employee", icon: Users },
        { title: "Exam Dashboard", href: "/dashboard/exam-center", icon: MapPin },
        { title: "Exam Center Dashboard", href: "/dashboard/exam", icon: ClipboardList },
        { title: "Results & Reports", href: "/exam/results", icon: BarChart3 },
      ],
    },
    {
      title: "Exam Management",
      items: [{ title: "Exam Screening", href: "/exam/calendar", icon: Calendar }],
    },
  ],
  college: [
    { title: "Students Management", items: [{ title: "Students", href: "/college-module/students-info", icon: Users }] },
    {
      title: "Job Management",
      items: [
        { title: "Job Notifications", href: "/college-module/jobs", icon: BriefcaseIcon },
        { title: "Placement Drives", href: "/college-module/drives", icon: Calendar },
      ],
    },
    {
      title: "Exams",
      items: [
        { title: "Mock Exams", href: "/college-module/exams", icon: ClipboardCheck },
        { title: "Results & Reports", href: "/college-module/results", icon: BarChart3 },
      ],
    },
    { title: "Notifications", href: "/college-module/notifications", icon: Bell },
    { title: "College Profile", href: "/college-module/profile", icon: Building },
  ],
  candidate: [
    {
      title: "Jobs",
      items: [
        { title: "All Jobs", href: "/candidate-module/jobs", icon: Briefcase },
        { title: "Job Fairs", href: "/candidate-module/job-fairs", icon: Briefcase },
        { title: "Saved Jobs", href: "/candidate-module/saved", icon: Bookmark },
        { title: "Applications", href: "/candidate-module/applications-history", icon: History },
      ],
    },
    {
      title: "Exams & Tests",
      items: [
        { title: "Exams", href: "/candidate-module/exams", icon: Calendar },
        { title: "Mock Tests", href: "/candidate-module/mock-test", icon: FileText },
      ],
    },
    { title: "Certification", href: "/candidate-module/certification", icon: Award },
    { title: "Profile", href: "/candidate-module/candidate-profile", icon: Users },
  ],
  employer: [
    {
      title: "Job Management",
      items: [
        { title: "Jobs", href: "/employer-module/jobs", icon: Briefcase },
        { title: "Candidates", href: "/employer-module/candidates", icon: Users },
        { title: "Scheduling", href: "/employer-module/scheduling", icon: Calendar },
        { title: "Evaluation", href: "/employer-module/evaluation", icon: FileCheck },
      ],
    },
    { title: "Reports", href: "/employer-module/reports", icon: BarChart3 },
    { title: "Notifications", href: "/employer-module/notifications", icon: Bell },
    {
      title: "Company",
      items: [
        { title: "Company Profile", href: "/employer-module/profile", icon: Settings },
        { title: "Billing", href: "/employer-module/billing", icon: CreditCard },
      ],
    },
  ],
  sales: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/sales-module",
          icon: Home,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Registrations",
          href: "/sales-module/registrations",
          icon: UserCheck,
        },
        {
          title: "Entities",
          href: "/sales-module/entities",
          icon: Users,
        },
        {
          title: "Approvals",
          href: "/sales-module/approvals",
          icon: GitBranch,
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "Reports",
          href: "/sales-module/reports",
          icon: BarChart3,
        },
        {
          title: "Revenue",
          href: "/sales-module/revenue",
          icon: DollarSign,
        },
        {
          title: "Marketing Analytics",
          href: "/sales-module/marketing-analytics",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "Marketing",
      items: [
        {
          title: "Campaigns",
          href: "/sales-module/campaigns",
          icon: Mail,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Audit Logs",
          href: "/sales-module/audit",
          icon: Shield,
        },
        {
          title: "Support",
          href: "/sales-module/support",
          icon: HeadphonesIcon,
        },
        {
          title: "Settings",
          href: "/sales-module/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
