import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"
import {Footer} from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recruitment & Exam Management System",
  description: "Comprehensive platform for recruitment and exam management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <Header />
          <Toaster />
          {/* Main content area */}
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
