"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { Home } from "lucide-react"

export function BreadcrumbNav() {
  const breadcrumbs = useBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <div className="max-w-7xl  px-2 py-4 pl-10">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {breadcrumb.isCurrentPage ? (
                  <BreadcrumbPage className="flex items-center gap-1.5">
                    {index === 0 && <Home className="h-4 w-4" />}
                    <span className="font-medium">{breadcrumb.label}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={breadcrumb.href}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    {index === 0 && <Home className="h-4 w-4" />}
                    <span>{breadcrumb.label}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
