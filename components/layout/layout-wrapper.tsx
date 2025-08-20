"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingChatButton } from "@/components/layout/floating-chat-button";
import { usePathname } from "next/navigation";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav"
export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth");

  return (
    <div className="min-h-screen bg-background">
      {!hideLayout && <Header />}
      {!hideLayout && <BreadcrumbNav/>}
      <main className="max-full m-8 mt-0 mb-0">{children}</main>
      {!hideLayout && <FloatingChatButton />}
      {!hideLayout && <Footer />}
    </div>
  );
}
