"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, User, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { navConfig, defaultItems } from "@/components/nav-config"; // 🔹 Move your big navConfig to separate file

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigationItems, setNavigationItems] = useState<any[]>(defaultItems);
  const [user, setUser] = useState<any>(null);

  // Role & user handling
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUser = localStorage.getItem("userData"); // can store {name, email, avatar}
    
    if (!storedRole) {
      router.push("/auth/login"); // 🔹 force login if no role
      return;
    }

    // Set user for profile menu
    if (storedUser) setUser(JSON.parse(storedUser));

    // Role-based navigation
    setNavigationItems([...defaultItems, ...(navConfig[storedRole] || [])]);

    // 🔹 Protect routes
    const roleRoutes: Record<string, string> = {
      admin: "/dashboard/admin",
      college: "/college-module",
      candidate: "/candidate-module",
      employer: "/employer-module",
      sales: "/sales-module",
    };

    const baseRoute = roleRoutes[storedRole];
    if (baseRoute && !pathname.startsWith(baseRoute) && !pathname.startsWith("/registration")) {
      router.replace(baseRoute); // redirect to role home if outside allowed routes
    }
  }, [pathname, router]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // ================= NAVIGATION RENDER HELPERS =================
 const renderNavigationItem = (item: any, isMobile = false) => {
  // if item has sub-items → dropdown
  if (item.items) {
    return (
      <DropdownMenu key={item.title}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 text-sm font-medium">
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
  }

  // if item is direct link
  if (item.href) {
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-white text-sm font-medium rounded-md ",
          isActiveLink(item.href)
            ? "bg-secondary text-secondary-foreground"
            : "text-primary-foreground hover:text-black hover:bg-secondary",
          isMobile && "w-full justify-start"
        )}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        <item.icon className="h-4 w-4" />
        {item.title}
      </Link>
    );
  }

  return null;
};


  const renderMobileNavigationItem = (item: any) => {
    if (item.href) return renderNavigationItem(item, true);
    return (
      <div key={item.title} className="space-y-2 text-primary">
        <div className="px-3 py-2 text-sm font-semibold text-foreground">{item.title}</div>
        <div className="space-y-1 pl-4">
          {item.items?.map((subItem: any) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm text-white font-medium rounded-md w-full",
                isActiveLink(subItem.href)
                  ? "bg-primary text-primary"
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
    <header className="sticky top-0 z-50 w-full border-b bg-primary backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-muted" />
            <h2 className="hidden sm:block text-lg font-semibold text-secondary">Unemployee</h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1 text-white">
            {navigationItems.map((item) => renderNavigationItem(item))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="h-5 w-5" />
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
                  {navigationItems.map((item) => renderMobileNavigationItem(item))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Profile Menu → Only if logged in */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/jones.png"} alt="Profile" />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center gap-2 p-2">
                    <div className="flex flex-col">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" /> My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    asChild
                    onClick={() => {
                      localStorage.clear();
                      router.push("/auth/login");
                    }}
                  >
                    <Link href="#">
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
