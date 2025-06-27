"use client"

import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { SidebarInset } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-black">
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto bg-black pt-24">{children}</main>
      </SidebarInset>
    </div>
  )
}
