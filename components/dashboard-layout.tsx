"use client"

import type React from "react"
import { useState } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { MainFeed } from "@/components/main-feed"
import { TodaysHighlights } from "@/components/todays-highlights"
import { AnalyticsWidget } from "@/components/analytics-widget"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function DashboardLayout() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <Navbar onSearch={handleSearch} />
        <main className="flex-1 overflow-auto pt-16">
          <div className="flex-1 space-y-8 p-8">
            {/* Header */}
            <div className="necessary-card -m-8 p-8 mb-8 border-0 bg-white/40">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-light text-slate-800 tracking-wide mb-3">PORTFOLIO INTELLIGENCE</h1>
                <p className="text-slate-600 text-lg font-light">Daily aggregation of news and updates from your portfolio companies</p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <TodaysHighlights />
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
                <div className="lg:col-span-3">
                  <MainFeed searchQuery={searchQuery} />
                </div>
                <div className="lg:col-span-1">
                  <AnalyticsWidget />
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
