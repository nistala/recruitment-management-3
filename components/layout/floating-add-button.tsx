"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingAddButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-8 rounded-full bg-primary text-white hover:bg-primary shadow-lg"
      onClick={() => alert("Add new item")}
    >
      <Plus className="h-10 w-10" />
    </Button>
  )
}
