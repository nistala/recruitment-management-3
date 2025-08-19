"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  Calendar,
  GraduationCap,
  Home,
  MapPin,
  Users,
  UserPlus,
  ClipboardList,
  BarChart3,
  Menu,
  User,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Registration",
    items: [
      {
        title: "Employer Registration",
        href: "/registration/employer-registration",
        icon: Building2,
      },
      {
        title: "Candidate Registration",
        href: "/registration/candidate-registration",
        icon: UserPlus,
      },
    ],
  },
  {
    title: "Dashboards",
    items: [
      {
        title: "Admin Dashboard",
        href: "/dashboard/admin",
        icon: Users,
      },
      {
        title: "Employee Dashboard",
        href: "/dashboard/employee",
        icon: Users,
      },
      {
        title: "Employer Dashboard",
        href: "/dashboard/employer",
        icon: Building2,
      },
      {
        title: "Exam Dashboard",
        href: "/dashboard/exam",
        icon: ClipboardList,
      },
      {
        title: "Exam Center Dashboard",
        href: "/dashboard/exam-center",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Exam Management",
    items: [
      {
        title: "Exam Calendar",
        href: "/exam/calendar",
        icon: Calendar,
      },
      {
        title: "Results & Reports",
        href: "/exam/results",
        icon: BarChart3,
      },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const renderNavigationItem = (item: any, isMobile = false) => {
    if (item.href) {
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
            isActiveLink(item.href)
              ? "bg-secondary text-secondary-foreground"
              : "text-primary-foreground hover:text-black hover:bg-secondary",
            isMobile && "w-full justify-start"
          )}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <item.icon className="h-4 w-4 " />
          {item.title}
        </Link>
      );
    }

    return (
      <DropdownMenu key={item.title}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium",
              "text-secondary hover:text-foreground hover:bg-accent"
            )}
          >
            {item.title}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {item.items.map((subItem: any) => (
            <DropdownMenuItem key={subItem.href} asChild>
              <Link
                href={subItem.href}
                className={cn(
                  "flex items-center gap-2 w-full",
                  isActiveLink(subItem.href) && "bg-accent"
                )}
              >
                <subItem.icon className="h-4 w-4" />
                {subItem.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderMobileNavigationItem = (item: any) => {
    if (item.href) {
      return renderNavigationItem(item, true);
    }

    return (
      <div key={item.title} className="space-y-2">
        <div className="px-3 py-2 text-sm font-semibold text-foreground">
          {item.title}
        </div>
        <div className="space-y-1 pl-4">
          {item.items.map((subItem: any) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors w-full",
                isActiveLink(subItem.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <subItem.icon className="h-4 w-4" />
              {subItem.title}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary backdrop-blur supports-[backdrop-filter]:bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-muted" />
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-secondary">
                Unemployee
              </h2>
              {/* <p className="text-xs text-secondary ">
                Recruitment & Exam Management
              </p> */}
            </div>
          </Link>

          {/* <div className="hidden md:flex md:flex-1 md:max-w-md md:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs, exams, employers..."
                className="pl-10"
              />
            </div>
          </div> */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => renderNavigationItem(item))}
          </nav>

          {/* Right Side - Profile Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex md:items-center md:space-x-4 text-secondary">
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Bell className="h-6 w-6" />
                </Button>
                {/* Badge Count */}
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  3
                </span>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Unemployee
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                  {navigationItems.map((item) =>
                    renderMobileNavigationItem(item)
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      className="rounded-full bg-secondary text-secondary-foreground"
                      src="/jones.png?height=100&width=100&text=SN"
                      alt="Profile"
                    />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">Sai Kartik Nistala</p>
                    <p className="text-xs text-muted-foreground">
                      snistala@miraclesoft.com
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/auth/login"
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
