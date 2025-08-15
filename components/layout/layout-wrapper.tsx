"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingChatButton } from "@/components/layout/floating-chat-button";
import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth");

  return (
    <div className="min-h-screen bg-background">
      {!hideLayout && <Header />}
      <main className="max-full px-4 py-6">{children}</main>
      {!hideLayout && <FloatingChatButton />}
      {!hideLayout && <Footer />}
    </div>
  );
}
