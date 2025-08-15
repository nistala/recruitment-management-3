"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users } from "lucide-react";
import { he } from "date-fns/locale";
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [currentGovIndex, setCurrentGovIndex] = useState(0);
  const [currentPrivateIndex, setCurrentPrivateIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<any[]>([]);

  const jobNotificationsData = [
    // Govt jobs
    { title: "BSF 1121 Head Constable Online Form 2025" },
    { title: "Bank of Maharashtra 500 Generalist Officer Online Form 2025" },
    { title: "Indian Navy 1266 Skilled Tradesman Online Form 2025" },
    { title: "BHEL 515 Artisan Online Form 2025" },
    { title: "IB 4987 Security Assistant Online Form 2025" },
    { title: "SBI 6589 Junior Associate (CLERK) Online Form 2025" },
    { title: "BSF 3588 Constable Tradesman Online Form 2025" },
    { title: "RRB 434 Paramedical Staff Online Form 2025" },
    { title: "AAI 976 Junior Executive Online Form 2025" },
    { title: "UPSC Civil Services Exam 2025" },
    { title: "SSC CGL 2025 Online Registration" },
    { title: "DRDO Scientist Recruitment 2025" },
    { title: "ISRO Technician Vacancy 2025" },
    { title: "Indian Railways 1287 Junior Engineer Recruitment 2025" },
    { title: "LIC 2143 Assistant Administrative Officer Online Form 2025" },
    { title: "NHAI 320 Civil Engineer Recruitment 2025" },
    { title: "CSIR 478 Technical Assistant Online Form 2025" },

    // Private sector (software-focused)
    { title: "TCS 1500 Software Engineer Fresher Hiring 2025" },
    { title: "Infosys 1200 Full Stack Developer Recruitment 2025" },
    { title: "Wipro 980 Cloud Engineer Hiring 2025" },
    { title: "HCL 850 Data Engineer Online Application 2025" },
    { title: "Tech Mahindra 720 AI/ML Engineer Recruitment 2025" },
    { title: "Capgemini 600 Backend Developer Hiring 2025" },
    { title: "Accenture 950 DevOps Engineer Online Registration 2025" },
    { title: "Cognizant 1100 Java Developer Recruitment 2025" },
    { title: "Mindtree 540 UI/UX Developer Online Form 2025" },
    { title: "LTIMindtree 800 Software Test Engineer Recruitment 2025" },
    { title: "Persistent Systems 430 Mobile App Developer Hiring 2025" },
    { title: "Zensar Technologies 390 Python Developer Online Form 2025" },
  ];
  const jobNotifications = [
    {
      id: 1,
      title: "SBI Clerk Recruitment 2024 - 8000+ Vacancies",
      organization: "State Bank of India",
      location: "Pan India",
      deadline: "15 Dec 2024",
      type: "Banking",
      sector: "Government",
      salaryRange: "₹26,000 - ₹40,000",
      experienceLevel: "Fresher",
      qualification: "Graduate",
      mode: "Online",
      isNew: true,
      applicants: "2.5L+",
    },
    {
      id: 2,
      title: "IBPS PO Notification 2024 - 4000 Posts",
      organization: "IBPS",
      location: "All India",
      deadline: "20 Dec 2024",
      type: "Banking",
      sector: "Government",
      salaryRange: "₹37,000 - ₹52,000",
      experienceLevel: "Fresher",
      qualification: "Graduate",
      mode: "Online",
      isHot: true,
      applicants: "1.8L+",
    },
    {
      id: 3,
      title: "SSC CGL 2024 - Combined Graduate Level",
      organization: "Staff Selection Commission",
      location: "Various States",
      deadline: "25 Dec 2024",
      type: "Government",
      sector: "Government",
      salaryRange: "₹35,000 - ₹65,000",
      experienceLevel: "Fresher/Experienced",
      qualification: "Graduate",
      mode: "Online",
      isNew: true,
      applicants: "5.2L+",
    },
    {
      id: 4,
      title: "Railway Group D Recruitment - 50000 Posts",
      organization: "Indian Railways",
      location: "Pan India",
      deadline: "30 Dec 2024",
      type: "Railway",
      sector: "Government",
      salaryRange: "₹21,000 - ₹35,000",
      experienceLevel: "Fresher",
      qualification: "10th Pass",
      mode: "Offline",
      isHot: true,
      applicants: "8.5L+",
    },
    {
      id: 5,
      title: "UPSC Civil Services 2024 - IAS/IPS/IFS",
      organization: "UPSC",
      location: "All India",
      deadline: "10 Jan 2025",
      type: "Civil Services",
      sector: "Government",
      salaryRange: "₹56,100 - ₹2,50,000",
      experienceLevel: "Fresher/Experienced",
      qualification: "Graduate",
      mode: "Online",
      isNew: true,
      applicants: "12L+",
    },
    {
      id: 6,
      title: "TCS NQT 2025 - Software Engineer Fresher Hiring",
      organization: "Tata Consultancy Services",
      location: "Pan India",
      deadline: "05 Jan 2025",
      type: "IT & Software",
      sector: "Private",
      salaryRange: "₹3.5 LPA - ₹6 LPA",
      experienceLevel: "Fresher",
      qualification: "B.Tech/B.E/MCA",
      mode: "Online",
      isNew: true,
      applicants: "90K+",
    },
    {
      id: 7,
      title: "Infosys Specialist Programmer Recruitment 2025",
      organization: "Infosys Ltd",
      location: "Bangalore, Pune, Hyderabad",
      deadline: "12 Jan 2025",
      type: "IT & Software",
      sector: "Private",
      salaryRange: "₹8 LPA - ₹12 LPA",
      experienceLevel: "Experienced",
      qualification: "B.Tech/B.E/MCA",
      mode: "Online",
      isHot: true,
      applicants: "45K+",
    },
    {
      id: 8,
      title: "Wipro Cloud Engineer Hiring 2025",
      organization: "Wipro Technologies",
      location: "Noida, Chennai, Pune",
      deadline: "18 Jan 2025",
      type: "IT & Software",
      sector: "Private",
      salaryRange: "₹5 LPA - ₹9 LPA",
      experienceLevel: "Experienced",
      qualification: "B.Tech/B.E",
      mode: "Online",
      applicants: "38K+",
    },
    {
      id: 9,
      title: "Capgemini Full Stack Developer Recruitment 2025",
      organization: "Capgemini India",
      location: "Bangalore, Mumbai",
      deadline: "22 Jan 2025",
      type: "IT & Software",
      sector: "Private",
      salaryRange: "₹6 LPA - ₹11 LPA",
      experienceLevel: "Experienced",
      qualification: "B.Tech/B.E/MCA",
      mode: "Online",
      isNew: true,
      applicants: "26K+",
    },
    {
      id: 10,
      title: "Indian Navy 2025 Tradesman Recruitment",
      organization: "Indian Navy",
      location: "Pan India",
      deadline: "15 Jan 2025",
      type: "Defence",
      sector: "Government",
      salaryRange: "₹18,000 - ₹56,900",
      experienceLevel: "Fresher",
      qualification: "10th Pass/ITI",
      mode: "Offline",
      applicants: "3.2L+",
    },
  ];
  const jobData = [
    {
      id: 1,
      jobType: "Government",
      subJobCategories: [
        {
          categoryName: "UPSC & Civil Services",
          jobList: [
            {
              jobTitle: "Indian Administrative Service (IAS) Officer",
              organization: "Union Public Service Commission",
              location: "Pan India",
              salary: "₹56,100 - ₹2,50,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Indian Police Service (IPS) Officer",
              organization: "Union Public Service Commission",
              location: "Pan India",
              salary: "₹56,100 - ₹2,25,000",
              isNew: false,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Indian Foreign Service (IFS) Officer",
              organization: "Union Public Service Commission",
              location: "Pan India / Foreign Missions",
              salary: "₹56,100 - ₹2,25,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Defence - Army",
          jobList: [
            {
              jobTitle: "Lieutenant",
              organization: "Indian Army",
              location: "Pan India",
              salary: "₹56,100 - ₹1,77,500",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Junior Commissioned Officer (JCO)",
              organization: "Indian Army",
              location: "Pan India",
              salary: "₹35,000 - ₹65,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Soldier General Duty",
              organization: "Indian Army",
              location: "Pan India",
              salary: "₹21,700 - ₹40,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },
        {
          categoryName: "Defence - Navy",
          jobList: [
            {
              jobTitle: "Sub Lieutenant",
              organization: "Indian Navy",
              location: "Pan India",
              salary: "₹56,100 - ₹1,77,500",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Sailor (SSR)",
              organization: "Indian Navy",
              location: "Pan India",
              salary: "₹21,700 - ₹35,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Naval Architect",
              organization: "Indian Navy",
              location: "Pan India",
              salary: "₹40,000 - ₹60,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },
        {
          categoryName: "Defence - Air Force",
          jobList: [
            {
              jobTitle: "Flying Officer",
              organization: "Indian Air Force",
              location: "Pan India",
              salary: "₹56,100 - ₹1,77,500",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Airman (Group X)",
              organization: "Indian Air Force",
              location: "Pan India",
              salary: "₹33,100 - ₹45,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Airman (Group Y)",
              organization: "Indian Air Force",
              location: "Pan India",
              salary: "₹26,900 - ₹35,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "State Public Service Commissions (Groups)",
          jobList: [
            {
              jobTitle: "Group 1 Officer",
              organization: "APPSC / TSPSC",
              location: "Andhra Pradesh / Telangana",
              salary: "₹56,100 - ₹1,77,500",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Group 2 Executive Officer",
              organization: "TNPSC / KPSC / MPSC",
              location: "State Capitals",
              salary: "₹36,000 - ₹65,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Group 4 Clerk",
              organization: "Various State PSCs",
              location: "District Headquarters",
              salary: "₹22,000 - ₹35,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Railways",
          jobList: [
            {
              jobTitle: "Station Master",
              organization: "Indian Railways",
              location: "Pan India",
              salary: "₹35,400 - ₹50,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Junior Engineer",
              organization: "Indian Railways",
              location: "Pan India",
              salary: "₹35,400 - ₹50,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Ticket Collector",
              organization: "Indian Railways",
              location: "Pan India",
              salary: "₹21,700 - ₹32,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Banking & Finance (Govt)",
          jobList: [
            {
              jobTitle: "Probationary Officer",
              organization: "State Bank of India",
              location: "Pan India",
              salary: "₹41,960 - ₹60,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Clerk",
              organization: "Reserve Bank of India",
              location: "Pan India",
              salary: "₹28,000 - ₹40,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Specialist Officer",
              organization: "Punjab National Bank",
              location: "Pan India",
              salary: "₹48,000 - ₹65,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Police & Paramilitary",
          jobList: [
            {
              jobTitle: "Sub Inspector",
              organization: "State Police Department",
              location: "State Capitals",
              salary: "₹35,000 - ₹50,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Constable",
              organization: "Central Reserve Police Force",
              location: "Pan India",
              salary: "₹21,700 - ₹30,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Head Constable",
              organization: "Border Security Force",
              location: "Border Areas",
              salary: "₹25,500 - ₹35,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Public Sector Undertakings (PSUs)",
          jobList: [
            {
              jobTitle: "Graduate Engineer Trainee",
              organization: "BHEL",
              location: "Pan India",
              salary: "₹50,000 - ₹1,60,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Management Trainee",
              organization: "ONGC",
              location: "Pan India",
              salary: "₹60,000 - ₹1,80,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Technician",
              organization: "NTPC",
              location: "Pan India",
              salary: "₹25,000 - ₹40,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Education",
          jobList: [
            {
              jobTitle: "Primary School Teacher",
              organization: "Delhi Govt Education Dept",
              location: "Delhi, India",
              salary: "₹25,000 - ₹35,000",
              isNew: false,
              isHot: false,
              type: "Contract",
            },
            {
              jobTitle: "High School Science Teacher",
              organization: "Karnataka Education Board",
              location: "Bengaluru, India",
              salary: "₹30,000 - ₹40,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "College Lecturer (Mathematics)",
              organization: "Andhra Pradesh State University",
              location: "Vijayawada, India",
              salary: "₹45,000 - ₹55,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Healthcare",
          jobList: [
            {
              jobTitle: "Staff Nurse",
              organization: "AIIMS",
              location: "Delhi, India",
              salary: "₹44,900 - ₹60,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Medical Officer",
              organization: "State Health Department",
              location: "State Capitals",
              salary: "₹56,100 - ₹1,77,500",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Pharmacist",
              organization: "ESIC Hospitals",
              location: "Pan India",
              salary: "₹29,200 - ₹40,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Judiciary",
          jobList: [
            {
              jobTitle: "Civil Judge",
              organization: "State High Court",
              location: "State Capitals",
              salary: "₹27,700 - ₹44,770",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Public Prosecutor",
              organization: "Law Department",
              location: "District Courts",
              salary: "₹56,100 - ₹1,77,500",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Court Clerk",
              organization: "Judiciary Services",
              location: "District Headquarters",
              salary: "₹22,000 - ₹30,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Agriculture",
          jobList: [
            {
              jobTitle: "Agricultural Officer",
              organization: "State Agriculture Dept",
              location: "State Headquarters",
              salary: "₹35,000 - ₹55,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Horticulture Officer",
              organization: "State Agriculture Dept",
              location: "District Headquarters",
              salary: "₹30,000 - ₹45,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Farm Assistant",
              organization: "Krishi Vigyan Kendra",
              location: "Rural Areas",
              salary: "₹18,000 - ₹25,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Environment",
          jobList: [
            {
              jobTitle: "Environmental Scientist",
              organization: "Central Pollution Control Board",
              location: "Delhi, India",
              salary: "₹56,100 - ₹1,77,500",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Forest Range Officer",
              organization: "State Forest Dept",
              location: "Forested Areas",
              salary: "₹35,000 - ₹55,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Wildlife Guard",
              organization: "Wildlife Protection Dept",
              location: "National Parks",
              salary: "₹18,000 - ₹25,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Science & Research",
          jobList: [
            {
              jobTitle: "Scientist-B",
              organization: "ISRO",
              location: "Bengaluru, India",
              salary: "₹56,100 - ₹1,77,500",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Research Fellow",
              organization: "CSIR",
              location: "Pan India",
              salary: "₹31,000 - ₹45,000",
              isNew: false,
              isHot: false,
              type: "Contract",
            },
            {
              jobTitle: "Lab Technician",
              organization: "DRDO",
              location: "Pan India",
              salary: "₹25,000 - ₹35,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Social Welfare",
          jobList: [
            {
              jobTitle: "Child Development Project Officer",
              organization: "Women & Child Welfare Dept",
              location: "District Headquarters",
              salary: "₹35,000 - ₹50,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Welfare Officer",
              organization: "Social Justice Dept",
              location: "State Headquarters",
              salary: "₹30,000 - ₹45,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Community Coordinator",
              organization: "Rural Development Dept",
              location: "Rural Areas",
              salary: "₹20,000 - ₹30,000",
              isNew: true,
              isHot: false,
              type: "Contract",
            },
          ],
        },

        {
          categoryName: "Sports",
          jobList: [
            {
              jobTitle: "Sports Coach",
              organization: "Sports Authority of India",
              location: "Pan India",
              salary: "₹35,000 - ₹50,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Fitness Trainer",
              organization: "State Sports Dept",
              location: "State Capitals",
              salary: "₹25,000 - ₹35,000",
              isNew: false,
              isHot: false,
              type: "Contract",
            },
            {
              jobTitle: "Physiotherapist",
              organization: "National Sports Teams",
              location: "Pan India",
              salary: "₹40,000 - ₹55,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },

        {
          categoryName: "Municipal Services",
          jobList: [
            {
              jobTitle: "Sanitary Inspector",
              organization: "Municipal Corporation",
              location: "Urban Areas",
              salary: "₹25,000 - ₹35,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Junior Engineer (Civil)",
              organization: "Municipal Corporation",
              location: "Urban Areas",
              salary: "₹30,000 - ₹45,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Clerk",
              organization: "Municipal Corporation",
              location: "Urban Areas",
              salary: "₹20,000 - ₹28,000",
              isNew: true,
              isHot: false,
              type: "Contract",
            },
          ],
        },

        {
          categoryName: "Transport & Aviation",
          jobList: [
            {
              jobTitle: "Commercial Pilot",
              organization: "Air India",
              location: "Pan India",
              salary: "₹1,50,000 - ₹3,00,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Driver",
              organization: "State Transport Corporation",
              location: "State Capitals",
              salary: "₹18,000 - ₹25,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Air Traffic Controller",
              organization: "Airport Authority of India",
              location: "Major Airports",
              salary: "₹56,100 - ₹1,77,500",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      jobType: "Private",
      subJobCategories: [
        {
          categoryName: "Information Technology",
          jobList: [
            {
              jobTitle: "Software Engineer",
              company: "Tech Solutions",
              location: "New York, NY",
              salary: "$80,000 - $100,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Full Stack Developer",
              company: "CodeCrafters Inc.",
              location: "Seattle, WA",
              salary: "$85,000 - $110,000",
              isNew: false,
              isHot: true,
              type: "Full-Time",
            },
          ],
        },
        {
          categoryName: "Data & Analytics",
          jobList: [
            {
              jobTitle: "Data Analyst",
              company: "Data Insights",
              location: "San Francisco, CA",
              salary: "$70,000 - $90,000",
              isNew: false,
              isHot: true,
              type: "Contract",
            },
            {
              jobTitle: "Data Scientist",
              company: "AI Innovations",
              location: "Boston, MA",
              salary: "$95,000 - $130,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
          ],
        },
        {
          categoryName: "Design & Creative",
          jobList: [
            {
              jobTitle: "UI/UX Designer",
              company: "Creative Minds Studio",
              location: "Austin, TX",
              salary: "$65,000 - $85,000",
              isNew: true,
              isHot: true,
              type: "Full-Time",
            },
            {
              jobTitle: "Graphic Designer",
              company: "VisualWorks",
              location: "Los Angeles, CA",
              salary: "$55,000 - $75,000",
              isNew: false,
              isHot: false,
              type: "Contract",
            },
          ],
        },
        {
          categoryName: "Marketing & Sales",
          jobList: [
            {
              jobTitle: "Digital Marketing Specialist",
              company: "BrandBoost",
              location: "Chicago, IL",
              salary: "$50,000 - $70,000",
              isNew: false,
              isHot: false,
              type: "Part-Time",
            },
            {
              jobTitle: "Sales Executive",
              company: "GlobalReach Corp",
              location: "Dallas, TX",
              salary: "$60,000 - $80,000 + Commission",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },
        {
          categoryName: "Finance & Consulting",
          jobList: [
            {
              jobTitle: "Financial Analyst",
              company: "MoneyMatters Consulting",
              location: "New York, NY",
              salary: "$75,000 - $95,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Business Consultant",
              company: "GrowthPartners",
              location: "San Diego, CA",
              salary: "$85,000 - $105,000",
              isNew: false,
              isHot: true,
              type: "Full-Time",
            },
          ],
        },
        {
          categoryName: "Human Resources",
          jobList: [
            {
              jobTitle: "HR Manager",
              company: "PeopleFirst Solutions",
              location: "Houston, TX",
              salary: "$70,000 - $90,000",
              isNew: false,
              isHot: false,
              type: "Full-Time",
            },
            {
              jobTitle: "Recruitment Specialist",
              company: "TalentBridge",
              location: "Denver, CO",
              salary: "$60,000 - $80,000",
              isNew: true,
              isHot: false,
              type: "Full-Time",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      jobType: "Job Fairs",
      jobList: [
        {
          id: 1,
          name: "National Government Job Fair 2024",
          date: "2024-03-15",
          time: "10:00 AM - 6:00 PM",
          type: "Physical",
          location: "Pragati Maidan, New Delhi",
          participants: 150,
          expectedVisitors: "10,000+",
          registrationFee: "Free",
          status: "Registration Open",
          description:
            "Largest government job fair featuring central and state government organizations.",
        },
        {
          id: 2,
          name: "Banking & Finance Career Fair",
          date: "2024-03-22",
          time: "11:00 AM - 5:00 PM",
          type: "Virtual",
          location: "Online Platform",
          participants: 85,
          expectedVisitors: "5,000+",
          registrationFee: "Free",
          status: "Registration Open",
          description:
            "Connect with leading banks and financial institutions for various positions.",
        },
        {
          id: 3,
          name: "Engineering Jobs Expo",
          date: "2024-04-05",
          time: "9:00 AM - 7:00 PM",
          type: "Hybrid",
          location: "HITEX, Hyderabad + Virtual",
          participants: 200,
          expectedVisitors: "15,000+",
          registrationFee: "₹100",
          status: "Registration Open",
          description:
            "Premier engineering job fair for civil, mechanical, electrical, and IT engineers.",
        },
        {
          id: 4,
          name: "Healthcare Professionals Meet",
          date: "2024-04-12",
          time: "10:00 AM - 4:00 PM",
          type: "Physical",
          location: "AIIMS Convention Center, Delhi",
          participants: 60,
          expectedVisitors: "3,000+",
          registrationFee: "Free",
          status: "Registration Open",
          description:
            "Exclusive job fair for doctors, nurses, and healthcare professionals.",
        },
        {
          id: 5,
          name: "Tech Startups Career Carnival",
          date: "2024-04-20",
          time: "12:00 PM - 8:00 PM",
          type: "Hybrid",
          location: "Bangalore International Exhibition Centre + Virtual",
          participants: 120,
          expectedVisitors: "8,000+",
          registrationFee: "₹50",
          status: "Registration Open",
          description:
            "Meet innovative startups and tech companies hiring across multiple domains.",
        },
      ],
    },
  ];

  const governmentJobs = jobNotifications.filter(
    (job) => job.sector === "Government"
  );
  const privateJobs = jobNotifications.filter(
    (job) => job.sector === "Private"
  );

  // Auto-slide Government jobs
  useEffect(() => {
    const govInterval = setInterval(() => {
      setCurrentGovIndex((prev) => (prev + 1) % governmentJobs.length);
    }, 3000); // 3 sec interval
    return () => clearInterval(govInterval);
  }, [governmentJobs.length]);

  // Auto-slide Private jobs
  useEffect(() => {
    const privateInterval = setInterval(() => {
      setCurrentPrivateIndex((prev) => (prev + 1) % privateJobs.length);
    }, 3000);
    return () => clearInterval(privateInterval);
  }, [privateJobs.length]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (jobData.length > 0) {
      const firstCategory: any = jobData[0];
      let allJobs: any[] = [];

      if (firstCategory.subJobCategories?.length > 0) {
        allJobs = firstCategory.subJobCategories.flatMap(
          (sub: any) => sub.jobList || []
        );
      } else if (firstCategory.jobList?.length > 0) {
        allJobs = firstCategory.jobList;
      }

      setDisplayedJobs((prev) => {
        const same =
          prev.length === allJobs.length &&
          prev.every((job, i) => job.id === allJobs[i].id);
        return same ? prev : allJobs;
      });
    }
  }, []);

  const handleSearch = () => {
    const filtered = jobNotifications.filter((job) => {
      const matchesType = filterType
        ? job.sector === filterType || job.type === filterType
        : true;
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.organization.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });

    console.log("Search Results:", filtered);
    // You can update a state to display filtered jobs below
  };

  const handleSubClick = (sub: any) => {
    setSelectedSub(sub.categoryName);

    if (sub.jobList && sub.jobList.length > 0) {
      setDisplayedJobs(sub.jobList);
    } else {
      setDisplayedJobs([]);
    }

    // This will log AFTER the state is updated
    setTimeout(() => {
      console.log("Updated displayedJobs:", sub.jobList);
    }, 0);
  };

  const handleJobClick = (job: any, category: any) => {
    setSelectedSub(job.categoryName || job.name);
    setSelectedJobs([job]); // If it's directly a job list, not subcategories
  };

  return (
    <div className="p-2 space-y-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Latest Job Notifications
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Government Slider */}
          <div className="relative overflow-hidden h-34">
            <h2 className="text-lg font-bold mb-2">Government Notifications</h2>
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentGovIndex * 100}%)`,
              }}
            >
              {governmentJobs.map((job) => (
                <div key={job.id} className="w-full flex-shrink-0">
                  {/* Your Government job card UI here */}
                  <Card className="p-4 mx-2 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-primary bg-white/80 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                            {job.title}
                          </h3>
                          {job.isNew && (
                            <Badge className="bg-green-500 text-white text-xs animate-bounce">
                              NEW
                            </Badge>
                          )}
                          {job.isHot && (
                            <Badge className="bg-red-500 text-white text-xs animate-pulse">
                              Trending
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="font-medium text-blue-600">
                            {job.organization}
                          </span>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{job.applicants} Applied</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-sm">
                            {job.type}
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-red-600">
                            <Clock className="w-3 h-3" />
                            <span>Deadline: {job.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Private Slider */}
          <div className="relative overflow-hidden h-34">
            <h2 className="text-lg font-bold mb-2">Private Notifications</h2>
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentPrivateIndex * 100}%)`,
              }}
            >
              {privateJobs.map((job) => (
                <div key={job.id} className="w-full flex-shrink-0">
                  {/* Your Private job card UI here */}
                  <Card className="p-4 mx-2 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-primary bg-white/80 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                            {job.title}
                          </h3>
                          {job.isNew && (
                            <Badge className="bg-green-500 text-white text-xs animate-bounce">
                              NEW
                            </Badge>
                          )}
                          {job.isHot && (
                            <Badge className="bg-red-500 text-white text-xs animate-pulse">
                              Trending
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="font-medium text-blue-600">
                            {job.organization}
                          </span>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{job.applicants} Applied</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-sm">
                            {job.type}
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-red-600">
                            <Clock className="w-3 h-3" />
                            <span>Deadline: {job.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow flex flex-col gap-4">
          {/* Application Description */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[#2368a0] tracking-wide">
              Find Your Next Career Opportunity
            </h3>
            <p className="text-gray-600 text-md md:text-base leading-relaxed mt-2">
              Welcome to{" "}
              <span className="font-semibold text-[#00aae7]">JobConnect</span>,
              your hub for the latest Government and Private jobs. Search,
              filter, and apply — all in one place.
            </p>
          </div>

          {/* Search Row */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Filter Dropdown */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-48 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">All Types</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Banking">Banking</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Defence">Defence</option>
              <option value="Railway">Railway</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-primary focus:outline-none"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors w-full md:w-auto"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex w-full mt-4 gap-4 justify-space-around ">
          {/* Job Type - 20% */}
          <div className="w-1/3 bg-white/80 rounded-xl shadow-lg overflow-hidden">
            <h2 className="bg-primary text-white font-bold px-4 py-3 uppercase text-sm tracking-wide">
              Job Types
            </h2>
            <div className="h-[70vh] overflow-y-auto">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue={jobData[0]?.jobType}
              >
                {jobData.map((category) => (
                  <AccordionItem key={category.id} value={category.jobType}>
                    <AccordionTrigger
                      className={`text-sm pl-4 pr-2 py-3 flex items-center justify-between transition-colors
          ${
            selectedSub === category.jobType
              ? "bg-[#8c8c8c] text-[#8c8c8c]"
              : "hover:bg-gray-100"
          } font-bold`}
                    >
                      {category.jobType.toUpperCase()}
                    </AccordionTrigger>

                    <AccordionContent>
                      <ul>
                        {/* If subcategories exist */}
                        {category.subJobCategories
                          ? category.subJobCategories.map((sub, index) => (
                              <li
                                key={index}
                                onClick={() => handleSubClick(sub)}
                                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors
          ${
            selectedSub === sub.categoryName
              ? "bg-[#00aae7] text-white"
              : "hover:bg-gray-100"
          }`}
                              >
                                <span className="text-xs pl-5 pr-2 sm:text-sm">
                                  {sub.categoryName}
                                </span>
                              </li>
                            ))
                          : category.jobList?.map((job: any, index: number) => (
                              <li
                                key={index}
                                onClick={() => handleJobClick(job, category)}
                                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors
          ${
            selectedSub === (job.categoryName || job.name)
              ? "bg-[#00aae7] text-white"
              : "hover:bg-gray-100"
          }`}
                              >
                                <span className="text-xs pl-5 pr-2 sm:text-sm">
                                  {job.categoryName || job.name}
                                </span>
                              </li>
                            ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Job List Details - 50% */}
          <div className="w-full bg-white/90 rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <h2 className="bg-primary text-white font-bold px-4 py-3 uppercase text-sm tracking-wide">
              Job List Details
            </h2>
            <div style={{ height: "70vh", overflowY: "scroll" }}>
              {jobData.map((category) => {
                return (
                  <div key={category.id} className="divide-y">
                    {displayedJobs.length > 0 ? (
                      displayedJobs.map((job, idx) => (
                        <div
                          key={idx}
                          className="p-2 flex flex-col gap-2 hover:bg-gray-50 transition-colors"
                        >
                          {/* Top Row */}
                          <div className="flex flex-wrap justify-between items-center gap-2">
                            <div>
                              <h4 className="font-semibold text-gray-800 text-sm sm:text-base ">
                                <span className="text-xs sm:text-sm mr-2">
                                  {job.jobTitle || job.name}
                                </span>
                                
                                {job.isNew && (
                                  <Badge
                                    className="text-[10px] p-l-2 bg-[#00aae7] text-white "
                                    variant="secondary"
                                  >
                                    New
                                  </Badge>
                                )}
                                {job.isHot && (
                                  <Badge className="text-[10px] p-l-2 bg-red-500 text-white animate-pulse">
                                    Trending
                                  </Badge>
                                )}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600">
                                {(job.organization || job.company) && (
                                  <>
                                    {job.organization || job.company}
                                    {job.location ? ` — ${job.location}` : ""}
                                  </>
                                )}
                                {!job.organization &&
                                  !job.company &&
                                  job.location && <>{job.location}</>}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center">
                              {job.type && (
                                <Badge variant="outline" className="text-xs">
                                  {job.type}
                                </Badge>
                              )}
                              {category.jobType && (
                                <button
                                  className="bg-[#2368a0] text-white text-xs px-3 py-1 rounded hover:bg-[#174a6a] transition-colors"
                                  onClick={() => {
                                    // Navigate to `/jobs/[jobType]/[jobTitle or name]`
                                    window.location.href = `/jobdetail`;
                                  }}
                                >
                                  View Details
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                            {job.registrationFee && (
                              <span className="text-sm text-[#ef4048] font-medium">
                                {job.registrationFee}
                              </span>
                            )}
                            {job.deadline && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>Deadline: {job.deadline}</span>
                              </div>
                            )}
                            {job.date && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>Date: {job.date}</span>
                              </div>
                            )}
                            {job.applicants && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{job.applicants} Applied</span>
                              </div>
                            )}
                            {job.expectedVisitors && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{job.expectedVisitors} Visitors</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No Job List in this Category
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Job Notification - 30% */}
          <div className="w-1/2 bg-white/90 rounded-xl shadow-lg overflow-hidden">
            <h2 className="bg-primary text-white font-bold px-4 py-3 uppercase text-sm tracking-wide">
              Job Notifications
            </h2>
            <ul
              className="list-disc list-inside space-y-2 p-3 marker:text-red-500"
              style={{ height: "70vh", overflowY: "scroll" }}
            >
              {jobNotificationsData.map((job, idx) => (
                <li
                  key={idx}
                  className="text-[#00aae7] hover:underline cursor-pointer text-sm"
                >
                  {job.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
