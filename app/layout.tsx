import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";

import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unemployee",
  description: "Comprehensive platform for recruitment and exam management",
  generator: "v1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
